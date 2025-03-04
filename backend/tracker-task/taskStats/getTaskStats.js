class GetTaskStats {
  constructor(db) {
    this.DB = db;
  }

  async getTaskStats(user, day) {
    var response = [];
    var sunday = day.toString();
    var saturday = sunday;
    var year = sunday.substring(0, 4);
    var month = sunday.substring(4, 6);
    var day = sunday.substring(6, 8);
    var daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    try {
      for (var i = 0; i < 7; i++) {
        var currentDay = parseInt(day) + i;
        var currentMonth = parseInt(month);
        var currentYear = parseInt(year);
        if (currentDay > daysInMonth) {
          currentDay = currentDay - daysInMonth;
          if (parseInt(month) + 1 > 12) {
            currentMonth = 1;
            currentYear = parseInt(year) + 1;
          } else {
            currentMonth = parseInt(month) + 1;
          }
        }
        if (currentDay <= 9) {
          currentDay = "0" + currentDay;
        }
        if (currentMonth <= 9) {
          currentMonth = "0" + currentMonth;
        }
        var dateSK = parseInt(`${currentYear}${currentMonth}${currentDay}`);
        const completeToDos = await this.getTodosForDay(
          user.email,
          dateSK.toString(),
          true
        );
        const incompleteToDos = await this.getTodosForDay(
          user.email,
          dateSK.toString(),
          false
        );

        var completionCount = completeToDos.length;
        var taskCount = completeToDos.length + incompleteToDos.length;

        response.push({
          completionCount: completionCount,
          taskCount: taskCount,
        });
        saturday = dateSK.toString();
      }

      const incompleteNoDueDateToDos = await this.getNoDueDateToDos(
        user.email,
        false
      );
      const completeNoDuDateToDosThisWeekCount =
        await this.getCompleteNoDueDateToDosThisWeekCount(
          user.email,
          sunday,
          saturday
        );

      response[0].taskCount +=
        incompleteNoDueDateToDos.length + completeNoDuDateToDosThisWeekCount;
      response[0].completionCount += completeNoDuDateToDosThisWeekCount;

      var tasks = await this.getTasks(user.email);
      for (var task of tasks) {
        for (var completionDate of task.completionList) {
          if (completionDate >= dateSK && completionDate < dateSK + 7) {
            response[completionDate - dateSK].completionCount += 1;
            response[completionDate - dateSK].taskCount += 1;
          }
        }
        if (task.nextDueDate >= dateSK && task.nextDueDate < dateSK + 7) {
          response[task.nextDueDate - dateSK].taskCount += 1;
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(response),
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

  async getTasks(user) {
    const expression = "#pk = :pk";
    const names = {
      "#pk": "PK",
    };
    const values = {
      ":pk": `${user}-task`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
  async getTodosForDay(user, dateStamp, isComplete) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk) ";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-toDo`,
      ":sk": `${isComplete}-${dateStamp}`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }
  async getNoDueDateToDos(user, isComplete) {
    const expression = "#pk = :pk AND begins_with(#sk, :sk)";
    const names = {
      "#pk": "PK",
      "#sk": "SK",
    };
    const values = {
      ":pk": `${user}-toDo`,
      ":sk": `${isComplete}-noDueDate`,
    };

    const response = await this.DB.queryItem(expression, names, values);
    return response?.Items;
  }

  async getCompleteNoDueDateToDosThisWeekCount(user, sunday, saturday) {
    var count = 0;
    const completeToDosNoDueDate = await this.getNoDueDateToDos(user, true);

    for (var toDo of completeToDosNoDueDate) {
      if (toDo.completionDate) {
        if (toDo.completionDate >= sunday && toDo.completionDate <= saturday) {
          count++;
        }
      }
    }
    return count;
  }
}
module.exports = GetTaskStats;
