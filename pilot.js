import Tone from "tone";
import Pilot from "./pilot/desktop/sources/scripts/pilot";
import "./pilot/desktop/sources/links/style.css";

const interactionRequired = Tone.context.state !== "running";

function register() {
  const pilot = new Pilot();
  window.top.register(
    {
      init() {
        pilot.install(document.body);
      },
      start() {
        pilot.start();
      },
    },
    interactionRequired
  );
}

if (window.top.register) register();
else window.top.addEventListener("load", register);
