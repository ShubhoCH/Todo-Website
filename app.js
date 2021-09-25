const express = require("express");
const bodyParser = require("body-parser");

let items = ["Eat", "Code", "Sleep", "Repeat"];
let workItems = [];

const app = express();

app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

//To add public files as server based websites cann't access static file!
app.use(express.static("public"));

app.get("/", function(req, res){

    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    
    res.render("list", {listTitle: day, newListItem: items});

});

app.get("/work", function(req, res){

    res.render("list", {listTitle: "Work List", newListItem: workItems});

});

app.get("/about", function(req, res){
0
    res.render("about");

});

app.post("/", function(req, res){
    
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});

/////////////////////////////////////////////////

app.listen(3000, function(){
    console.log("Server Started!");
});