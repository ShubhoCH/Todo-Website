//||||||||||||||||||||||||||MODULES||||||||||||||||||||||||||||||||
const express = require("express");
const bodyParser = require("body-parser");
/////////////////////////DATABASE/////////////////////
const mongoose = require("mongoose");
/////////////////////////DATABASE/////////////////////
const _ = require("lodash");
//My very node module[date module i.e. date.js] that gives 
//the current date:
const date = require(__dirname + "/date.js");
//||||||||||||||||||||||||||MODULES||||||||||||||||||||||||||||||||

const app = express();

app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

//To add public files as server based websites cann't access static file!
app.use(express.static("public"));


/////////////////////////DATABASE/////////////////////
mongoose.connect("mongodb://localhost:27017/todolistDB");
//Schema:
const itemSchema = {
  name: String
};
const Item = mongoose.model("Item", itemSchema);
const item1 = new Item({
  name: "Welcome to your todoList!"
});
const item2 = new Item({
  name: "Hit the + button to Add a new Item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item."
});
const defaultItems = [item1, item2, item3];
//Schema2:
const listSchema = {
  name: String,
  //To establish the relation:
  items: [itemSchema]
};
const List = mongoose.model("List", listSchema);

/////////////////////////DATABASE/////////////////////

app.get("/", function(req, res){ 
  //From our Date Module:
    let day = date.getDate();
  //From DB:
    Item.find({}, function(err,foundItems){
      if(foundItems.length === 0){
        Item.insertMany(defaultItems, function(err){
          if(err){
            console.log(err);
          } else {
            console.log("Successfully Added to DB!");
          }
          res.redirect("/");
        });
      }
      else{
        res.render("list", {listTitle: "Today", newListItem: foundItems});
      }
    })
});

app.get("/:customListName", function(req, res){
  //From our Date Module:
  let day = date.getDate();
  //Get the Custom list name from list.ejs
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({name: customListName}, function(err, foundList){
    if(!err){
      if(!foundList){
        console.log("AddedHere!");
        //Create New List:
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }else{
        console.log("Not Added! Already there");
        //Show Found List:
        res.render("list", {listTitle: customListName, newListItem: foundList.items});
      }
    }
  })
});

// app.get("/work", function(req, res){

//     res.render("list", {listTitle: "Work List", newListItem: workItems});

// });

// app.get("/about", function(req, res){
// 0
//     res.render("about");

// });

app.post("/", function(req, res){
    
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
      name: itemName
    });
    if(listName == "Today"){
      console.log("In Default List!");
      item.save();
      res.redirect("/");
    }else{
      console.log("In custom List!");
      List.findOne({name: listName}, function(err, foundList){
        if(!err){  
          console.log("Inside Function!");
          foundList.items.push(item);
          foundList.save();
          res.redirect("/" + listName);
        }
      });
    }
});
app.post("/delete", function(req, res){
    const checkedItemID = req.body.checkbox;
    const listName = req.body.listName;
    if(listName == "Today"){
        Item.findByIdAndRemove(checkedItemID, function(err){
        if(!err){
          console.log("Successfully deleted checked item.");
        }
      });
      res.redirect("/");
    }else{
        List.findOneAndUpdate(
          {name: listName}, {$pull: {items: {_id: checkedItemID}}}, function(err, foundList){
            if(!err){
                res.redirect("/" + listName);
            }
          });
    }
    
})

/////////////////////////////////////////////////

app.listen(3000, function(){
    console.log("Server Started!");
});