import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";

import sassMiddleware from "node-sass-middleware";
import * as homeController from "./controllers/home_controller.js";
const app = express();
dotenv.config();

//mongodb database

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_url);
    console.log(`Connected to Database successfully ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in MongoDB ${error}`);
  }
};
connectDB();

//end mongodb database

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
// set up the view engine
app.set("view engine", "ejs");
app.set("Views", "./Views");

//this will convert all sass/scss file to css before server starts
app.use(
  sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="css/style.css"/>
  })
);
app.use(express.static("./assets"));
//router
app.use("/", homeController.home);

const port = process.env.PORT;
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
