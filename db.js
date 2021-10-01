// const mongoose = require("mongoose");

// //////////////////////////////DATABASE/////////////////////////////
// mongoose.connect("mongodb://localhost:27017/todolistDB");
// const itemSchema = new mongoose.Schema({
//     name: String
// });
// //Creating the mongoose model:
// const Item = mongoose.model("Item", itemSchema);


// function ifEmpty(){
//     //Creating 3 new Items:
//     const item1 = new Item({name: "1st One"});
//     const item2 = new Item({name: "2nd One"});
//     const item3 = new Item({name: "3rd One"});

//     var defaultItems = [item1, item2, item3];
//     //Insert the items into Items collection in MongoDB:
//     Item.insertMany(defaultItems, function(err){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Successfully saved default items to DB");
//         }
//     })
//     return defaultItems;
// }

// exports.onLoad = function(){
//     Item.find({}, function(err, foundItems){
//         if(foundItems.length === 0){
//             foundItems = ifEmpty();
//         }
//         foundItems.forEach(function(x){
//             console.log(x.name);
//         })
//         return l;
//     });
// } 