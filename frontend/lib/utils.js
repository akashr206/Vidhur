import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function parseJson(str) {
  try {
    // Step 1: Remove surrounding quotes if any
    let cleaned = str.trim();
    if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
      cleaned = cleaned.slice(1, -1);
    }

    // Step 2: Unescape \n, \" etc.
    cleaned = cleaned
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    // Step 3: Remove the broken part (manual patch)
    cleaned = cleaned.replace(/"chapter_numberashi":\s*{/, '');

    // Step 4: Find only the JSON part (remove trailing text)
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}') + 1;
    const jsonString = cleaned.slice(jsonStart, jsonEnd);

    // Step 5: Parse
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (err) {
    console.error( err.message);
    return null;
  }
}



