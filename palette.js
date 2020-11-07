const palette = [
  "coral",
  "tomato",
  "crimson",
  "teal",
  "plum",
  "purple",
  "gold",
];

let next = 0;
const colorsByClient = {};

export function getClientColor(clientID) {
  let c = colorsByClient[clientID];
  if (!c) {
    next = (next + 1) % palette.length;
    c = palette[next];
    colorsByClient[clientID] = c;
  }
  return c;
}
