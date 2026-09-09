export function readStorage(key, fallback, area = "localStorage") {
  try {
    return JSON.parse(window[area].getItem(`cozynest:${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value, area = "localStorage") {
  try {
    window[area].setItem(`cozynest:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
