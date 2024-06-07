import express, { Request } from "express";
import crypto from "crypto";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { checkForEnv, generateId, getBaseAPI, getEnv } from "./utils";
import { RadioButtonType } from "./types";
import { queryFromDB } from "./utils/CreateDBConnection";

checkForEnv();

const app = express();

// This code also sets EJS as the view engine for the Express
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export type ContactFormQueryType = "generalEnquiry" | "supportRequest";

interface ContactFormBodyRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  radioCollection: ContactFormQueryType;
  message: string;
}

app.post(
  "/",
  function (req: Request<{}, {}, ContactFormBodyRequest>, res, next) {
    const { emailAddress, firstName, lastName, message, radioCollection } =
      req.body;
    const id = generateId();
    console.log(req.body);

    queryFromDB(
      `INSERT INTO users (id, firstName, lastName, email, queryType, message) VALUES ('${id}', '${firstName}', '${lastName}', '${emailAddress}', '${radioCollection}', '${message}');`,
      {
        onError(err) {
          console.log("err", err);
          return res.status(500);
        },
        onSuccess(value) {
          return res.status(201);
        },
      }
    );
  }
);

app.get("/", function (req, res) {
  let radioCollection: RadioButtonType[] = [
    {
      id: "1",
      label: "General Enquiry",
      value: "generalEnquiry",
    },
    {
      id: "2",
      label: "Support Request",
      value: "supportRequest",
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
