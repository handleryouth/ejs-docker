import * as dotenv from "dotenv";

dotenv.config();

export type EnvType = "serverPort";

const ENV_COLLECTION: Record<EnvType, any> = {
  serverPort: process.env.SERVER_PORT,
};

export function getEnv(envKey: EnvType) {
  return ENV_COLLECTION[envKey];
}
