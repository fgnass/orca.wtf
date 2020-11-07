import LZString from "lz-string";
import Client from "./orca/desktop/sources/scripts/client";
import "./orca/desktop/sources/links/main.css";
import { createRoom, joinRoom } from "./multiplayer";

const client = (window.client = new Client());
client.install(document.body);

// Initialize the client but don't start the clock yet...
client.theme.start();
client.io.start();
client.history.bind(client.orca, "s");
client.history.record(client.orca.s);
client.cursor.start();
client.modZoom();
client.update();
client.el.className = "ready";

// Repaint canvas when font is loaded
window.addEventListener("load", () => client.update());

function register() {
  window.top.registerOrca({
    load(bin) {
      try {
        client.whenOpen("", LZString.decompressFromEncodedURIComponent(bin));
        client.update();
      } catch (e) {
        console.log(e);
      }
    },
    getCode() {
      return LZString.compressToEncodedURIComponent(client.orca.toString());
    },
    start() {
      client.clock.start();
    },
    showGuide() {
      client.toggleGuide(true);
    },
    createRoom(room) {
      createRoom(client, room);
    },
    joinRoom(room) {
      joinRoom(client, room);
    },
  });
}

if (window.top.registerOrca) register();
else window.top.addEventListener("load", register);
