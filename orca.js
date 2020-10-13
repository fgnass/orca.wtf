import Client from "./orca/desktop/sources/scripts/client";
import LZString from "lz-string";

const client = (window.client = new Client());

// Expose a function to be called from the parent
window.start = () => {
  client.install(document.body);
  client.start();

  // Read compressed orca file from URL
  let code;
  let hash = window.top.location.hash.slice(1);
  if (hash.length) {
    try {
      code = LZString.decompressFromEncodedURIComponent(hash);
      client.whenOpen("", code);
    } catch (e) {}
  }

  document.addEventListener("keyup", (e) => {
    const newCode = client.orca.toString();
    if (newCode !== code) {
      code = newCode;
      hash = LZString.compressToEncodedURIComponent(code);
      window.top.history.replaceState(undefined, undefined, `#${hash}`);
    }
  });
};
