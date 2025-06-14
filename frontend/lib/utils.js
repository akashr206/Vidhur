import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseJson(jsonString) {
    try {
        let cleanedString = jsonString.trim();
        cleanedString = cleanedString.replace(/^"/, '').replace(/"$/, '');
        
        cleanedString = cleanedString.replace(/\\n/g, '\n');
        cleanedString = cleanedString.replace(/\n/g, '');
        
        cleanedString = cleanedString.replace(/\s+/g, ' ').trim();
        
        return JSON.parse(cleanedString);
    } catch (error) {
        console.error('Invalid JSON after filtering:', error);
        return null;
    }
}