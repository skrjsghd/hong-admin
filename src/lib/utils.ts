import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepCompare<T extends Record<string, any>>(
  obj1: T,
  obj2: T,
): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    // If both values are objects, recursively compare them
    if (typeof val1 === "object" && typeof val2 === "object") {
      if (!deepCompare(val1, val2)) {
        return false;
      }
    } else {
      // Otherwise, compare the values directly
      if (val1 !== val2) {
        return false;
      }
    }
  }

  return true;
}
