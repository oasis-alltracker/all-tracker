const clientSecret = process.env.NOTION_CLIENT_SECRET;
const clientId = process.env.NOTION_CLIENT_ID;

const tableName = process.env.ALL_TRACKER_TABLE_NAME;
const DynamoDB = require("aws-sdk/clients/dynamodb");
const DbUtils = require("../../utils/databaseManager");

const DB = new DynamoDB.DocumentClient();
const dbService = new DbUtils(DB, tableName);

const { Client } = require("@notionhq/client");

const fetch = require("node-fetch");

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const records = event.Records;
  requests = [];

  records.forEach((record) => {
    requests.push(JSON.parse(record.body));
  });

  try {
    for (const request of requests) {
      await integrate(request.user, request.code);
    }
  } catch (e) {
    console.log(e);
    throw new Error("Something went wrong sending a confirmation email.");
  }
};

async function integrate(user, code) {
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://api.notion.com/v1/oauth/token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${encoded}`,
    },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "https://www.ecommerce-fakeshop.ca",
    }),
  });
  await new Promise((r) => setTimeout(r, 20000));

  const integrationMetadata = await response.json();
  console.log(integrationMetadata.access_token);
  console.log(integrationMetadata.duplicated_template_id);

  if (
    !integrationMetadata.access_token ||
    !integrationMetadata.duplicated_template_id
  ) {
    console.log("Integration failed.");
    callback(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }
  await saveDatabaseID(
    user.email,
    integrationMetadata.access_token,
    "notion-token",
  );
  const notion = new Client({ auth: integrationMetadata.access_token });

  const pageId = integrationMetadata.duplicated_template_id;
  const pageResponse = await notion.pages.retrieve({ page_id: pageId });
  await new Promise((r) => setTimeout(r, 350));

  const blockResponse = await notion.blocks.children.list({
    block_id: pageResponse.id,
    page_size: 50,
  });
  await new Promise((r) => setTimeout(r, 350));

  for (block of blockResponse.results) {
    if (block.type == "column_list") {
      const columnListResponse = await notion.blocks.children.list({
        block_id: block.id,
        page_size: 50,
      });
      await new Promise((r) => setTimeout(r, 350));

      for (column of columnListResponse.results) {
        const columnResponse = await notion.blocks.children.list({
          block_id: column.id,
          page_size: 50,
        });
        await new Promise((r) => setTimeout(r, 350));

        for (childPage of columnResponse.results) {
          if (childPage.type == "child_page") {
            const childPageResponse = await notion.blocks.children.list({
              block_id: childPage.id,
              page_size: 50,
            });
            await new Promise((r) => setTimeout(r, 350));

            for (databaseChild of childPageResponse.results) {
              if (databaseChild.type == "column_list") {
                const dietColumnListRes = await notion.blocks.children.list({
                  block_id: databaseChild.id,
                  page_size: 50,
                });
                await new Promise((r) => setTimeout(r, 350));
                for (column of dietColumnListRes.results) {
                  const dietColumnResponse = await notion.blocks.children.list({
                    block_id: column.id,
                    page_size: 50,
                  });
                  await new Promise((r) => setTimeout(r, 350));

                  for (dietDB of dietColumnResponse.results) {
                    if (dietDB.type == "child_database") {
                      const databaseChildResponse =
                        await notion.blocks.retrieve({
                          block_id: dietDB.id,
                        });
                      if (
                        databaseChildResponse.child_database.title ==
                        "Food Items"
                      ) {
                        await saveDatabaseID(
                          user.email,
                          databaseChildResponse.id,
                          "food-items",
                        );
                      }
                      await new Promise((r) => setTimeout(r, 350));
                    }
                  }
                }
              }
              if (databaseChild.type == "child_database") {
                const databaseChildResponse = await notion.blocks.retrieve({
                  block_id: databaseChild.id,
                });

                if (databaseChildResponse.child_database.title == "To-dos") {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "to-dos",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Daily Journal"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "daily-journal",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Habits"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "habits",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Meal Entries"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "meal-entries",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Food Items"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "food-items",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Workouts"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "workouts",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Check-ins"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "check-ins",
                  );
                } else if (
                  databaseChildResponse.child_database.title == "Sleep Reports"
                ) {
                  await saveDatabaseID(
                    user.email,
                    databaseChildResponse.id,
                    "sleep-reports",
                  );
                }
                await new Promise((r) => setTimeout(r, 350));
              }
            }
          }
        }
      }
    }
    await saveDatabaseID(user.email, true, "notionIntegrated");
  }

  callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
  });
}

async function saveDatabaseID(user, databaseID, notionTable) {
  const key = { PK: user, SK: user };
  console.log(key);
  const expression = "SET #notionTable = :id";
  const names = {
    "#notionTable": `${notionTable}`,
  };
  const values = {
    ":id": databaseID,
  };
  await dbService.updateItem(expression, key, names, values);
}
