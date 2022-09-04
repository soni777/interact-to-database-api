const express = require("express");
const app = express();
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

// console.log(typeof open);

const dbpath = path.join(__dirname, "goodreads.db");
let db = null;
const intializeDBandServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("server runs on http:localhost:3000/");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

intializeDBandServer();

app.get("/books/", async (request, response) => {
  const sqlQuery = "select * from book Order BY book_id";
  const booksArray = await db.all(sqlQuery);
  response.send(booksArray);
});
