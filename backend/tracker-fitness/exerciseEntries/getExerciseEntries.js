class GetExerciseEntries {
  constructor(db) {
    this.DB = db;
  }

  // SK is `${workoutEntryID}-${exerciseEntryID}` and workoutEntryID starts with
  // the dateStamp, so one partition serves a session, a day, or a date range.
  // Results are grouped by session and in the order exercises were done.
  async getExerciseEntries(user, queryStringParameters) {
    try {
      var exerciseEntries;
      if (queryStringParameters?.workoutEntryID) {
        exerciseEntries = await this.getEntriesWithPrefix(
          user.email,
          `${queryStringParameters.workoutEntryID}-`,
        );
      } else if (queryStringParameters?.dateStamp) {
        exerciseEntries = await this.getEntriesWithPrefix(
          user.email,
          `${queryStringParameters.dateStamp}-`,
        );
      } else if (
        queryStringParameters?.startDate &&
        queryStringParameters?.endDate
      ) {
        exerciseEntries = await this.getEntriesForMultipleDays(
          user.email,
          queryStringParameters.startDate,
          queryStringParameters.endDate,
        );
      } else {
        throw new Error("Missing queryStringParameters");
      }

      return {
        statusCode: 200,
        body: JSON.stringify(this.sortBySessionAndPosition(exerciseEntries)),
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

  sortBySessionAndPosition(exerciseEntries) {
    return [...exerciseEntries].sort((a, b) => {
      if (a.workoutEntryID !== b.workoutEntryID) {
        return a.workoutEntryID < b.workoutEntryID ? -1 : 1;
      }
      return (a.position ?? 0) - (b.position ?? 0);
    });
  }

  async getEntriesWithPrefix(user, prefix) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-exerciseEntry`,
      ":sk": prefix,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items ?? [];
  }

  async getEntriesForMultipleDays(user, startDate, endDate) {
    // The end bound needs a suffix to include entries logged on endDate itself.
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-exerciseEntry`,
      ":startDate": `${startDate}`,
      ":endDate": `${endDate}-~`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items ?? [];
  }
}
module.exports = GetExerciseEntries;
