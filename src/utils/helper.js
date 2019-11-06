const Z_KEY_CODE = 90;
const Y_KEY_CODE = 89;

export const KEY_CODES = {
  Y: Y_KEY_CODE,
  Z: Z_KEY_CODE
};

export function avgcolor(color1, color2) {
  var avg = function(a, b) {
      return (a + b) / 2;
    },
    t16 = function(c) {
      return parseInt(("" + c).replace("#", ""), 16);
    },
    hex = function(c) {
      return (c >> 0).toString(16);
    },
    hex1 = t16(color1),
    hex2 = t16(color2),
    r = function(hex) {
      return (hex >> 16) & 0xff;
    },
    g = function(hex) {
      return (hex >> 8) & 0xff;
    },
    b = function(hex) {
      return hex & 0xff;
    },
    res =
      "#" +
      hex(avg(r(hex1), r(hex2))) +
      hex(avg(g(hex1), g(hex2))) +
      hex(avg(b(hex1), b(hex2)));
  return res;
}
