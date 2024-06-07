import mysql, { createPool } from "mysql2/promise";
import dotenv from "dotenv";
import { getEnv } from "./EnvHelper";

dotenv.config();

const connection = createPool({
  port: getEnv("mySQLPort"),
  user: getEnv("mySQLUser"),
  password: getEnv("mySQLPassword"),
  database: getEnv("mySQLDatabase"),
  host: getEnv("mySQLHost"),
});

// const connection = createPool({
//   port: 3308,
//   user: "dbeaver",
//   password: "dbeaver",
//   database: "registerDB",
// });

interface QueryFromDbCallbackProps {
  onSuccess: (value: [mysql.QueryResult, mysql.FieldPacket[]]) => void;
  onError: (err: any) => void;
}

export function queryFromDB(
  sqlvalue: string,
  callback: QueryFromDbCallbackProps
) {
  connection
    .getConnection()
    .then((conn) => {
      const res = conn.query(sqlvalue);
      conn.release();
      return res;
    })
    .then((result) => {
      callback.onSuccess(result);
    })
    .catch((err) => {
      callback.onError(err);
    });
}
