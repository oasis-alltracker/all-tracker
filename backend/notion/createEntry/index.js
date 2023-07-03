// const DynamoDB = require('aws-sdk/clients/dynamodb');
// const DbUtils = require('../../utils/databaseManager');

// const tableName = process.env.ALL_TRACKER_TABLE_NAME;
// const DB = new DynamoDB.DocumentClient();
// const dbService = new DbUtils(DB, tableName);

const { Client } = require("@notionhq/client")

const notion = new Client({ auth: "secret_EDYoluRrZmCVaw77oF5ztiEfhIu8RicV2RLlCZu2QXI"})


module.exports.handler = async () => {
  try {

    const response = await notion.pages.create({
      parent: {
        database_id: "26263bd257c2479b88e2d0362d6ac8a5",
      },
      properties: {
        title: {
          title: [
            {
              type: "text",
              text: {
                content: "title",
              },
            },
          ],
        },
      //   activity: {
      //     activity: [
      //       {
      //         type: "text",
      //         text: {
      //           content: "activity",
      //         },
      //       },
      //     ],
      //   },
      //   company: {
      //     company: [
      //       {
      //         type: "text",
      //         text: {
      //           content: "company",
      //         },
      //       },
      //     ],
      //   },
      //   feeling: {
      //     feeling: [
      //       {
      //         type: "text",
      //         text: {
      //           content: "feeling",
      //         },
      //       },
      //     ],
      //   },
      //   mood: {
      //     mood: [
      //       {
      //         type: "text",
      //         text: {
      //           content: "mood",
      //         },
      //       },
      //     ],
      //   },
      //   location: {
      //     location: [
      //       {
      //         type: "text",
      //         text: {
      //           content: "location",
      //         },
      //       },
      //     ],
      //   },
      // },
    }})
    console.log(response);
  }
  catch (e){
    console.log(e);
  }
}