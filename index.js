const express = require("express");
const path = require("path");
const port = process.env.port || 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact.js");

const app = express();

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var contactList;

// home page
app.get("/", async (req, res) => {
  var contactList = await Contact.find({});

  return res.render("home", {
    title: "My Contacts List",
    contact_list: contactList,
  });
});

app.get("/practice", (req, res) => {
  return res.render("practice", {
    title: "practice page",
  });
});

// create contact
app.post("/create-contact", (req, res) => {
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    (err, newContact) => {
      if (err) return console.log("error in creating contact List");
      console.log("**** ", newContact);
    }
  );
  return res.redirect("back");
});

// delete contact
app.get("/delete-contact/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id, (err) => {
    if (err) return console.log("error deleting data", err);
  });

  return res.redirect("back");
});

app.listen(port, (err) => {
  if (err) console.log(`error , ${err}`);

  console.log(`server running on ${port}`);
});
