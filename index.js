import "./index.css";

const hash = window.top.location.hash.slice(1);

const modules = [];
let interactionRequired;

/**
 * Global callback that is invoked by the Orca and Pilot iframes.
 */
window.register = (mod, requiresInteraction) => {
  modules.push(mod);
  if (requiresInteraction) interactionRequired = true;
  if (modules.length === 2) {
    // Both modules are loaded, initialize them...
    modules.forEach((mod) => mod.init(hash));
    document.body.classList.add("ready");
    if (hash) {
      // Content was passed in the URL, skip the intro
      if (interactionRequired) {
        // Playback requires user interaction, show a play button
        document.body.classList.add("showPlayButton");
      } else {
        window.startShared();
      }
    } else {
      document.body.className = "showIntro";
    }
  }
};

window.startDemo = () => {
  window.start(
    "HQ18ZXTt-cBQCWrejZnQEwGEBTTYk0rWANgCEAGWAETAEYAlAFjM+O2gClqi0AFQBuegFEAMjiZc56HlAqSAHKBosAzPJ1dFEAEYA1CuBqaAKuN03M+lNdQBXPGts776lm9BGDwXhRGYBoVCwoKFQAzChjTdwxPdQBZHDBTAHFHeFEAdQBBAAlYhL0YAFU6eBEmNnoAMQ5S0qSQIRQauvrIFx9m0laaACcmuBEVAFZ8idkIUIsVHE1lzSZZ-oRFDR9tLLGAdjq8NMh6NxUWKI2FcE1U9HGJvBmoUXycegN967R9cvi0J16hMfrZ9O0MCIaF0eq5QdwwMMQQ9ahlkaB6Bx5jQcLimDiTvDoPpZHsuKJjngaOsiZsuDUpnhafJWoCcBMMtpmWVOAz6kyIL1uahWagoRMGuAziEwjRqfiCcKIKKOioKPQKDTRPR8NSlUh9YbyEajSqTdczeb+parS1bUqbfawU7uY6XR53bS3Z6eT6ft6-QNA-7gxbQxsA+GblG7TGEpG43TE87kzYE6mYOmM1As9nlXmWQW5LmiyAgA"
  );
};

window.startShared = () => {
  window.start(hash);
};

window.start = (bin) => {
  modules.forEach((mod) => mod.start(bin));
  document.body.className = "started";
  document.getElementById("orca").contentWindow.focus();
};

/* Add a service-worker to enable offline use */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
