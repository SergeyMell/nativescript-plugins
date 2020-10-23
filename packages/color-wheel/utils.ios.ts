export function redOffset(x, y, w) {
  return y * w * 4 + x * 4 + 1;
}

export function greenOffset(x, y, w) {
  return y * w * 4 + x * 4 + 2;
}

export function blueOffset(x, y, w) {
  return y * w * 4 + x * 4 + 3;
}
