class DbUtils {
  constructor(db, tableName) {
    this.DB = db;
    this.tableName = tableName;
  }

  deleteItem(key) {
    const params = {
      TableName: this.tableName,
      Key: key,
    };
    return new Promise((resolve, reject) => {
      this.DB.delete(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  deleteItems(pk, items) {
    if (items.length === 0) return Promise.resolve();

    const MAX_BATCH_SIZE = 25;
    const batches = [];

    // Split items into batches of 25
    for (let i = 0; i < items.length; i += MAX_BATCH_SIZE) {
      batches.push(items.slice(i, i + MAX_BATCH_SIZE));
    }

    const deleteBatch = (batch) => {
      const params = {
        RequestItems: {
          [this.tableName]: batch.map((item) => ({
            DeleteRequest: {
              Key: { PK: pk, SK: item.SK },
            },
          })),
        },
      };

      return new Promise((resolve, reject) => {
        this.DB.batchWrite(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    };

    // Process all batches sequentially
    return batches.reduce((promiseChain, batch) => {
      return promiseChain.then(() => deleteBatch(batch));
    }, Promise.resolve());
  }

  putItem(itemObject) {
    const params = {
      Item: itemObject,
      TableName: this.tableName,
    };
    return new Promise((resolve, reject) => {
      this.DB.put(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  getItem(key) {
    const params = {
      Key: key,
      TableName: this.tableName,
    };
    return new Promise((resolve, reject) => {
      this.DB.get(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  updateItem(expression, key, names, values, condition = undefined) {
    const params = {
      TableName: this.tableName,
      Key: key,
      UpdateExpression: expression,
      ConditionExpression: condition,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    };
    return new Promise((resolve, reject) => {
      this.DB.update(params, function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  queryItem(
    expression,
    names,
    values,
    limit = null,
    ascending = true,
    filters = null,
    consistentRead = false
  ) {
    var params = {
      TableName: this.tableName,
      KeyConditionExpression: expression,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
      ConsistentRead: consistentRead,
      ScanIndexForward: ascending,
    };

    if (filters) {
      params["FilterExpression"] = filters;
    }
    if (limit) {
      params["Limit"] = limit;
    }
    return new Promise((resolve, reject) => {
      this.DB.query(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
module.exports = DbUtils;
