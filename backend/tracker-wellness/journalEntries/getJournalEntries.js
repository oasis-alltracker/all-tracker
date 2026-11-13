// Old diary writing lives in the journal attribute of wellness and sleep reports.
// It is returned alongside journal entries, read-only, so existing users keep it.
const LEGACY_SOURCES = [
  { pkSuffix: "wellnessReport", entryType: "wellness_report" },
  { pkSuffix: "sleepReport", entryType: "sleep_report" },
];

class GetJournalEntries {
  constructor(db) {
    this.DB = db;
  }

  async getJournalEntries(user, queryStringParameters) {
    try {
      var journalEntries;
      if (queryStringParameters?.dateStamp) {
        journalEntries = await this.getEntriesForOneDay(
          user.email,
          queryStringParameters.dateStamp,
        );
      } else if (
        queryStringParameters?.startDate &&
        queryStringParameters?.endDate
      ) {
        journalEntries = await this.getEntriesForMultipleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }

      return {
        statusCode: 200,
        body: JSON.stringify(journalEntries),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      return {
        statusCode: 500,
        body: JSON.stringify("Request failed"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }
  }

  async getEntriesForOneDay(user, dateStamp) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    return this.getEntriesWithLegacy(user, expression, {
      ":sk": `${dateStamp}-`,
    });
  }

  async getEntriesForMultipleDays(user, startDate, endDate) {
    // SK is `${dateStamp}-${ID}`, so the end bound needs a suffix to
    // include entries written on endDate itself.
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    return this.getEntriesWithLegacy(user, expression, {
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}-~`,
    });
  }

  async getEntriesWithLegacy(user, expression, rangeValues) {
    const [journalEntries, ...legacyReports] = await Promise.all([
      this.queryPartition(`${user}-journalEntry`, expression, rangeValues),
      ...LEGACY_SOURCES.map((source) =>
        this.queryPartition(
          `${user}-${source.pkSuffix}`,
          expression,
          rangeValues,
        ),
      ),
    ]);

    const legacyEntries = legacyReports.flatMap((reports, i) =>
      reports
        .filter(
          (report) =>
            typeof report.journal === "string" && report.journal.trim() !== "",
        )
        .map((report) => ({
          PK: report.PK,
          SK: report.SK,
          entryType: LEGACY_SOURCES[i].entryType,
          title: report.title ?? null,
          bodyText: report.journal,
          isLegacy: true,
        })),
    );

    return [...journalEntries, ...legacyEntries].sort((a, b) =>
      a.SK < b.SK ? -1 : a.SK > b.SK ? 1 : 0,
    );
  }

  async queryPartition(pk, expression, rangeValues) {
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": pk,
      ...rangeValues,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items ?? [];
  }
}
module.exports = GetJournalEntries;
