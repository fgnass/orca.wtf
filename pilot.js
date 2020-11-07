import Tone from "tone";
import Pilot from "./pilot/desktop/sources/scripts/pilot";
import "./pilot/desktop/sources/links/style.css";

function register() {
  const pilot = new Pilot();
  window.top.registerPilot({
    init() {
      pilot.install(document.body);
    },
    start() {
      pilot.start();
    },
    interactionRequired: Tone.context.state !== "running",
  });
}

if (window.top.registerPilot) register();
else window.top.addEventListener("load", register);
