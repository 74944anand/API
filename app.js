const express = require("express");
const con = require("./config");
const bodyParser = require("body-parser");
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//Create a route that handles the POST request from the form and inserts the data into the database.
app.post("/api/upload", (req, res) => {
  const { id, name, marks } = req.body;

  const sql = "INSERT INTO demo (id, name, marks) VALUES (?, ?, ?)";
  const values = [id, name, marks];

  con.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "An error occurred" });
    } else {
      console.log("Data inserted successfully");
      res.status(201).json({ message: "Data inserted successfully" });
    }
  });
});

//Serve the HTML form so that users can access it.
app.get("/upload-form", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000);
