import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseJson(rawString) {
  console.log(rawString);
  
  try {
    // 1. Extract the JSON-ish part from the text
    const jsonStart = rawString.indexOf('{');
    const jsonEnd = rawString.lastIndexOf('}');
    if (jsonStart === -1 || jsonEnd === -1) throw new Error("JSON boundaries not found");

    let jsonString = rawString.slice(jsonStart, jsonEnd + 1);

    // 2. Unescape characters
    jsonString = jsonString
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '')
      .replace(/\\t/g, '')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\');

    jsonString = jsonString.replace(/,\s*(?=[}\]])/g, '');

    const parsed = JSON.parse(jsonString);
    console.log(parsed);

    return parsed;

  } catch (err) {
    console.error("Failed to parse JSON:", err);
    return null;
  }
}



