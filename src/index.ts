import express from "express";
import path from "path";
import cors from "cors";
import { getEnv } from "./utils";
import { RadioButtonType } from "./types";

const app = express();

// This code also sets EJS as the view engine for the Express
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(cors());

app.use(express.json());

app.get("/", function (req, res) {
  let radioCollection: RadioButtonType[] = [
    {
      id: "1",
      label: "General Inquiry",
      value: "Generatal Inquiry",
    },
    {
      id: "2",
      label: "Support Request",
      value: "Support Request",
    },
  ];
  res.render("pages/index", {
    radioCollection,
  });
});

app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.listen(getEnv("serverPort"), async () => {
  console.log("Server running at http://localhost:" + getEnv("serverPort"));
});
