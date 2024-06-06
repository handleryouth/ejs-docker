import express from "express";
import cors from "cors";
import { getEnv } from "./utils";

const app = express();

// This code also sets EJS as the view engine for the Express
app.set("view engine", "ejs");

app.use(cors());

app.use(express.json());

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.listen(getEnv("serverPort"), async () => {
  console.log("Server running at http://localhost:" + getEnv("serverPort"));
});
