class DeleteJournalEntry {
  constructor(db) {
    this.DB = db;
  }

  async deleteJournalEntry(user, journalEntryID) {
    try {
      await this.deleteEntry(user.email, journalEntryID);

      return {
        statusCode: 200,
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

  async deleteEntry(email, journalEntryID) {
    const key = { PK: `${email}-journalEntry`, SK: journalEntryID };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteJournalEntry;
