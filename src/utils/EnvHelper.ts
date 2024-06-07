import * as dotenv from "dotenv";

dotenv.config();

export type EnvType =
  | "serverPort"
  | "mySQLDatabase"
  | "mySQLPassword"
  | "mySQLUser"
  | "mySQLPort"
  | "mySQLHost"
  | "serverProtocol"
  | "serverHost";

const ENV_COLLECTION: Record<EnvType, any> = {
  serverPort: process.env.SERVER_PORT,
  mySQLDatabase: process.env.SERVER_MYSQL_DATABASE,
  mySQLPassword: process.env.SERVER_MYSQL_PASSWORD,
  mySQLUser: process.env.SERVER_MYSQL_USER,
  mySQLPort: process.env.SERVER_MYSQL_PORT,
  mySQLHost: process.env.SERVER_MYSQL_HOST,
  serverHost: process.env.SERVER_HOST,
  serverProtocol: process.env.SERVER_PROTOCOL,
};

export function checkForEnv() {
  Object.entries(ENV_COLLECTION).map((item) => {
    if (item[1] === null || item[1] === undefined) {
      throw new Error("check your env");
    }
  });
}

export function getEnv(envKey: EnvType) {
  return ENV_COLLECTION[envKey];
}

export function getBaseAPI(): string {
  let url = getEnv("serverProtocol") + getEnv("serverHost");
  const serverPort = getEnv("serverPort");
  if (Boolean(serverPort)) {
    url += ":" + serverPort;
  }

  return url;
}
