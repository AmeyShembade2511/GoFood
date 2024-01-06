const mongoose=require('mongoose');
mongoURI=`mongodb+srv://ameysh123:ameysh@cluster0.qujwf2b.mongodb.net/gofoodmern?retryWrites=true&w=majority`
const MongoClient = require('mongodb').MongoClient;
const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(async client=>{
        console.log('Connected');
        const fetched_data=await mongoose.connection.db.collection("food_items");
        // console.log(fetched_data.find({}).toArray());
        // const data= await fetched_data.find({}).toArray(await function (err,data){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         global.food_items=data;
        //         console.log(global.food_items);
        //     }
        // })
        const data =await fetched_data.find({}).toArray();
        // console.log('Data found:', data);
        global.food_items = data;
        const fetched_data1=await mongoose.connection.db.collection("food_category");
        const data1 =await fetched_data1.find({}).toArray();
        // console.log('Data found:', data);
        global.foodCategory = data1;
        // console.log(global.food_items);
    })
    .catch(err=>{
        console.log(err);
    });
}



// MongoClient.connect(mongoURI, function(err, client) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("connected");
//   const db = client.db('gofoodmern');
//   const collection = db.collection('food_items');
//   console.log("hi");
// //   collection.find({}).toArray(function(err, data) {
// //     if (err) {
// //       console.log(err);
// //     } else {
// //       console.log("hi");
// //       global.food_items = data;
// //       console.log(global.food_items);
// //     }

// //     client.close(); // Close the MongoDB connection when done
// //   });
// collection.find({}).exec()
//         .then(data => {
//             console.log("hi");
//             global.food_items = data;
//             console.log(global.food_items);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

module.exports=mongoDB;