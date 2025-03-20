import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const generateAppSettingsFileFromEnv = async function () {
  try {
    const env = process.env;

    function replaceEnvVariables(str, env) {
      return str.replace(/\$([A-Z_]+)/g, (match, varName) => env[varName] || match);
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, '../', 'app-config.js.template');

    const data = await fs.readFile(filePath, 'utf8');

    const appSettingsString = replaceEnvVariables(data, env);

    console.log(appSettingsString);
    return appSettingsString;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
};

// Example usage
// (async () => {
//   await generateAppSettingsFileFromEnv();
// })();