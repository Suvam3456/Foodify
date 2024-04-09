// connecting backend to database using mongoose
const mongoose = require("mongoose");
const mongoURI =
  "mongodb://Suvam108:Suvam108@ac-tyesvxh-shard-00-00.4bucuui.mongodb.net:27017,ac-tyesvxh-shard-00-01.4bucuui.mongodb.net:27017,ac-tyesvxh-shard-00-02.4bucuui.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-jtucbs-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";


const mongoDB = async () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("----", err);
    else {
      console.log("Connected to MongoDB");
      const fetched_data = await mongoose.connection.db.collection(
        "food_items"
      );
      fetched_data.find({}).toArray(async function (err, data) {
        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );
        foodCategory.find({}).toArray(function (err, catData) {
          if (err) console.log(err);
          else {
            global.food_items = data;
            global.foodCategory = catData;
            //  console.log(global.food_items);
          }
          // Data read/fetch kiye from database (CRUD me R is done)
        });
      });
    }
  });
};

module.exports = mongoDB;
