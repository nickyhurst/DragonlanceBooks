export function truthyNumber(val) {
  return val !== null && val !== undefined && String(val) !== "0" && String(val) !== "";
}

export function isComic(book) {
  return String(book?.Series ?? "").toLowerCase().includes("dc comic");
}

export function isCollected(book) {
  return String(book?.Collected ?? "0") !== "0" && String(book?.Collected ?? "") !== "";
}

export function isHardcover(book) {
  return String(book?.["Hard Cover"] ?? "0") !== "0" && String(book?.["Hard Cover"] ?? "") !== "";
}