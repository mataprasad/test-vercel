const __dirname = import.meta.dirname;
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export const generateAppSettingsFileFromEnv = async function (dataToSubstitute = null) {
  try {
    const env = process.env;

    function replaceEnvVariables(str, env) {
      return str.replace(/\$([A-Z_]+)/g, (match, varName) => env[varName] || match);
    }

    let data = '';
    if (dataToSubstitute != null) {
      data = dataToSubstitute;
    } else {
      const configJsonText = await readAppConfigJson();
      const filePath = path.join(__dirname, 'app-config.js.template');
      data = await fs.readFile(filePath, 'utf8');
      data = data.replace('__CONFIG__TEMPL__', configJsonText);
    }

    const appSettingsString = replaceEnvVariables(data, env);

    console.log(appSettingsString);
    return appSettingsString;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
};

export const readAppConfigJson = async function () {
  try {
    const filePath = path.join(__dirname, '../app-config.json');
    const configJsonText = await fs.readFile(filePath, 'utf8');
    console.log(configJsonText);
    return configJsonText;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
};

// module.exports = { generateAppSettingsFileFromEnv, readAppConfigJson };