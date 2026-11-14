const DeleteUser = require("../../userInfo/user/deleteUser");
const DbUtils = require("../../utils/databaseManager");

const email = "test@example.com";

// A fake DynamoDB document client with real paging: each query returns at
// most pageSize items plus a LastEvaluatedKey while more remain. Partitions
// are keyed by PK; batchWrite records every delete.
function fakeDynamoDB(partitions, pageSize = 2) {
  const deleted = [];
  return {
    deleted,
    query: jest.fn((params, callback) => {
      const items = partitions[params.ExpressionAttributeValues[":pk"]] ?? [];
      const start = params.ExclusiveStartKey?.index ?? 0;
      const page = items.slice(start, start + pageSize);
      const more = start + pageSize < items.length;
      callback(null, {
        Items: page,
        LastEvaluatedKey: more ? { index: start + pageSize } : undefined,
      });
    }),
    batchWrite: jest.fn((params, callback) => {
      for (const request of Object.values(params.RequestItems)[0]) {
        deleted.push(request.DeleteRequest.Key);
      }
      callback(null, {});
    }),
  };
}

const rows = (count, prefix) =>
  Array.from({ length: count }, (_, i) => ({ SK: `${prefix}-${i}` }));

describe("deleteUser", () => {
  it("deletes every item in a partition that spans several pages", async () => {
    const habitStatuses = rows(7, "20261113-habit");
    const dynamo = fakeDynamoDB({ [`${email}-habitStatus`]: habitStatuses });

    await new DeleteUser(new DbUtils(dynamo, "table")).deleteUserAndData(
      email,
    );

    const deletedStatuses = dynamo.deleted.filter(
      (key) => key.PK === `${email}-habitStatus`,
    );
    expect(deletedStatuses.map((key) => key.SK)).toEqual(
      habitStatuses.map((row) => row.SK),
    );
    // 7 items at 2 per page: 4 queries for this partition alone.
    const habitStatusQueries = dynamo.query.mock.calls.filter(
      ([params]) =>
        params.ExpressionAttributeValues[":pk"] === `${email}-habitStatus`,
    );
    expect(habitStatusQueries).toHaveLength(4);
  });

  it.each([
    ["workoutEntry", "workout entries (previously deleted from the wrong partition)"],
    ["season", "seasons"],
    ["journalEntry", "journal entries"],
    ["reflectiveMeal", "reflective meals"],
    ["foodEntry", "food entries"],
  ])("deletes %s rows: %s", async (pkSuffix) => {
    const items = rows(3, "20261113-x");
    const dynamo = fakeDynamoDB({ [`${email}-${pkSuffix}`]: items });

    await new DeleteUser(new DbUtils(dynamo, "table")).deleteUserAndData(
      email,
    );

    expect(
      dynamo.deleted
        .filter((key) => key.PK === `${email}-${pkSuffix}`)
        .map((key) => key.SK),
    ).toEqual(items.map((row) => row.SK));
  });

  it("deletes the user, otp and temp password rows", async () => {
    const dynamo = fakeDynamoDB({});

    await new DeleteUser(new DbUtils(dynamo, "table")).deleteUserAndData(
      email,
    );

    expect(dynamo.deleted).toEqual(
      expect.arrayContaining([
        { PK: email, SK: email },
        { PK: email, SK: "otp" },
        { PK: email, SK: "tempPassword" },
      ]),
    );
  });
});
