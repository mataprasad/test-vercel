import { generateAppSettingsFileFromEnv } from '../buildx/common-utils';

export default async function handler(req, res) {

  const config = await generateAppSettingsFileFromEnv();

  res.setHeader("Content-Type", "application/javascript");
  res.send(config);
}