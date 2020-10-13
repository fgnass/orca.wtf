import Pilot from "./pilot/desktop/sources/scripts/pilot";

const pilot = new Pilot();

// Expose a function to be called from the parent
window.start = () => {
  pilot.install(document.body);
  pilot.start();
};
