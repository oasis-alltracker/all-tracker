class DeleteWorkoutPlan {
  constructor(db) {
    this.DB = db;
  }

  async deleteWorkoutPlan(user, workoutPlanID) {
    try {
      await this.deletePlan(user.email, workoutPlanID);

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

  // Only the plan is deleted. Its exercises belong to the user's library and
  // may be in other plans; past workout entries keep their own records.
  async deletePlan(email, workoutPlanID) {
    const key = { PK: `${email}-workoutPlan`, SK: workoutPlanID };
    await this.DB.deleteItem(key);
  }
}
module.exports = DeleteWorkoutPlan;
