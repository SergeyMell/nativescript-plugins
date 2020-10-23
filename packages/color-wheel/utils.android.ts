export function colorSpectra() {
  const colors = Array.create('int', 7);
  colors[0] = android.graphics.Color.RED;
  colors[1] = android.graphics.Color.MAGENTA;
  colors[2] = android.graphics.Color.BLUE;
  colors[3] = android.graphics.Color.CYAN;
  colors[4] = android.graphics.Color.GREEN;
  colors[5] = android.graphics.Color.YELLOW;
  colors[6] = android.graphics.Color.RED;
  return colors;
}

export function colorDistribution() {
  const sectors = Array.create('float', 7);
  sectors[0] = 0.000;
  sectors[1] = 0.166;
  sectors[2] = 0.333;
  sectors[3] = 0.499;
  sectors[4] = 0.666;
  sectors[5] = 0.833;
  sectors[6] = 0.999;
  return sectors;
}
