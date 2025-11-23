import fs from "fs";
import path from "path";

export async function loadMessages(locale: string) {
  try {
    const filePath = path.join(process.cwd(), "src", "locales", `${locale}.json`);
    const json = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(json);
  } catch (error) {
    console.error(`❌ Could not load messages for locale "${locale}"`, error);
    return {};
  }
}
