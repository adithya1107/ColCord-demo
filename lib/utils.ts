import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const cacheKey = `cache_${url}`;
  const cachedData = sessionStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const response = await fetch(url, options);
  const data = await response.json();

  sessionStorage.setItem(cacheKey, JSON.stringify(data));

  return data;
}

