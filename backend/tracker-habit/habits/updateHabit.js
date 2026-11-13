const { SEASONS } = require("../../userInfo/seasons/createSeason");
const {
  currentStatus,
  currentChapterStart,
} = require("../../utils/habitHistory");
const { countCompletions } = require("../../utils/habitCompletions");

// Fields an edit can set. Anything else in the body is ignored.
const ALLOWED_FIELDS = ["name", "isPositive", "threshold", "pngURL"];
const STATUSES = ["active", "closed"];

class UpdateHabit {
  constructor(db) {
    this.DB = db;
  }

  // A body with status closes or reopens the habit: { status, season, dateStamp }.
  // Any other body is an edit of the allowed fields.
  async updateHabit(user, habitID, body) {
    const isStatusChange = body?.status !== undefined;
    const editFields = ALLOWED_FIELDS.filter(
      (field) => body?.[field] !== undefined,
    );

    if (
      isStatusChange
        ? !STATUSES.includes(body.status) ||
          !SEASONS.includes(body.season) ||
          !/^\d{8}$/.test(body.dateStamp) ||
          editFields.length > 0
        : editFields.length === 0
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify("Invalid habit update"),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    }

    try {
      if (isStatusChange) {
        await this.changeStatus(user.email, habitID, body);
      } else {
        await this.update(user.email, habitID, body, editFields);
      }

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      };
    } catch (e) {
      console.log(e);
      if (e?.name === "ConditionalCheckFailedException") {
        return {
          statusCode: 400,
          body: JSON.stringify("Habit not found or already " + body.status),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        };
      }
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

  async update(email, habitID, habit, fields) {
    const key = { PK: `${email}-habit`, SK: habitID };
    const expression =
      "SET " + fields.map((field) => `#${field} = :${field}`).join(", ");
    const names = {};
    const values = {};
    fields.forEach((field) => {
      names[`#${field}`] = field;
      values[`:${field}`] = habit[field];
    });
    await this.DB.updateItem(expression, key, names, values);
  }

  // Sets status and appends the event to history in one write. The condition
  // makes a repeated close (or reopen) fail instead of adding a duplicate event.
  async changeStatus(email, habitID, change) {
    const key = { PK: `${email}-habit`, SK: habitID };
    const event = {
      status: change.status,
      season: change.season,
      dateStamp: change.dateStamp,
    };

    if (change.status === "closed") {
      const habit = await this.getHabit(email, habitID);
      if (!habit || currentStatus(habit) !== "active") {
        const error = new Error("Habit not found or already closed");
        error.name = "ConditionalCheckFailedException";
        throw error;
      }
      // Snapshot of this chapter's completions, kept on the close event.
      const chapterStart = currentChapterStart(habit);
      const statuses = await this.getHabitStatuses(
        email,
        habitID,
        chapterStart,
        change.dateStamp,
      );
      const seasons = await this.getSeasons(email);
      Object.assign(
        event,
        countCompletions(
          habit,
          statuses,
          seasons,
          chapterStart,
          change.dateStamp,
        ),
      );
    }

    const expression =
      "SET #status = :status, #history = list_append(if_not_exists(#history, :emptyList), :event)";
    const names = {
      "#status": "status",
      "#history": "history",
    };
    const values = {
      ":status": change.status,
      ":event": [event],
      ":emptyList": [],
    };
    var condition;
    if (change.status === "closed") {
      condition =
        "attribute_exists(PK) AND (attribute_not_exists(#status) OR #status = :active)";
      values[":active"] = "active";
    } else {
      condition = "attribute_exists(PK) AND #status = :closed";
      values[":closed"] = "closed";
    }
    await this.DB.updateItem(expression, key, names, values, condition);
  }

  async getHabit(email, habitID) {
    const response = await this.DB.getItem({
      PK: `${email}-habit`,
      SK: habitID,
    });
    return response?.Item;
  }

  async getHabitStatuses(email, habitID, startDate, endDate) {
    const expression = "#pk = :pk AND #sk BETWEEN :startDate AND :endDate";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
      "#habitID": "habitID",
    };
    const values = {
      ":pk": `${email}-habitStatus`,
      ":startDate": startDate ?? "0",
      ":endDate": `${endDate}-~`,
      ":habitID": habitID,
    };
    return this.DB.queryAllItems(
      expression,
      names,
      values,
      "#habitID = :habitID",
    );
  }

  async getSeasons(email) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${email}-season`,
    };
    return this.DB.queryAllItems(expression, names, values);
  }
}
module.exports = UpdateHabit;
module.exports.ALLOWED_FIELDS = ALLOWED_FIELDS;
