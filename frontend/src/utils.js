export function percentDifference(a, b) {
  return +(((b - a) / a) * 100).toFixed(2);
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
