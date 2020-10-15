import LZString from "lz-string";
import Client from "./orca/desktop/sources/scripts/client";
import "./orca/desktop/sources/links/main.css";

const client = (window.client = new Client());
client.install(document.body);

// Initialize the client but don't satrt the clock yet...
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

let code;

/**
 * Load compressed data into orca
 */
function load(bin) {
  if (bin) {
    try {
      code = LZString.decompressFromEncodedURIComponent(bin);
      client.whenOpen("", code);
      client.update();
    } catch (e) {
      console.log(e);
    }
  }
}

function register() {
  window.top.register({
    init(bin) {
      if (bin) load(bin);
      // Update the URL hash when the user modifies the code...
      document.addEventListener("keyup", (e) => {
        const newCode = client.orca.toString();
        if (newCode !== code) {
          code = newCode;
          bin = LZString.compressToEncodedURIComponent(code);
          window.top.history.replaceState(undefined, undefined, `#${bin}`);
        }
      });
    },
    start(bin) {
      load(bin);
      if (!code) {
        // Show help screen when the canvas is empty
        client.toggleGuide(true);
      }
      client.clock.start();
    },
  });
}

if (window.top.register) register();
else window.top.addEventListener("load", register);
