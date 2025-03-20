const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const generateAppSettingsFileFromEnv = async function () {
  try {
    const env = process.env;

    function replaceEnvVariables(str, env) {
      return str.replace(/\$([A-Z_]+)/g, (match, varName) => env[varName] || match);
    }

    const __filename = __filename || __dirname;
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

module.exports = { generateAppSettingsFileFromEnv };