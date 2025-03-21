import { generateAppSettingsFileFromEnv } from '../buildx/common-utils.js';

export const handler = async function (req, res) {
  try {
    const template = {
    "apiUrl": "$API_BASE_URL",
    "AppName": "$APP_NAME",
    "LogoPath": "$LOGO_PATH"
};
    const config = await generateAppSettingsFileFromEnv(template);

    if (!config) {
      res.status(500).json({ error: "Failed to generate app config" });
      return;
    }

    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(config);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
