import Pilot from "./pilot/desktop/sources/scripts/pilot";
import "./pilot/desktop/sources/links/style.css";

const pilot = new Pilot();

// Expose a function to be called from the parent
window.start = () => {
  pilot.install(document.body);
  pilot.start();
};
