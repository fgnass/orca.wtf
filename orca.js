import LZString from "lz-string";
import Client from "./orca/desktop/sources/scripts/client";
import "./orca/desktop/sources/links/main.css";

if (window.top.register)
  window.top.register(() => {
    const client = (window.client = new Client());
    client.install(document.body);
    client.start();
    client.orca.reset();
    let code;
    let hash = window.top.location.hash.slice(1);
    if (hash.length) {
      // Read compressed orca file from URL
      try {
        code = LZString.decompressFromEncodedURIComponent(hash);
        console.log(hash, code);
        client.whenOpen("", code);
      } catch (e) {
        console.log(e);
      }
    }

    document.addEventListener("keyup", (e) => {
      const newCode = client.orca.toString();
      if (newCode !== code) {
        code = newCode;
        console.log(newCode);
        hash = LZString.compressToEncodedURIComponent(code);
        window.top.history.replaceState(undefined, undefined, `#${hash}`);
      }
    });
  });
