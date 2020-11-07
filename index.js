import "./index.css";

const hash = window.top.location.hash.slice(1);

let orca;
let pilot;

window.registerOrca = (orcaApi) => {
  orca = orcaApi;
  check();
};

window.registerPilot = (pilotApi) => {
  pilot = pilotApi;
  check();
};

function check() {
  if (pilot && orca) {
    pilot.init();
    document.body.classList.add("ready");
    if (hash) {
      // Content was passed in the URL, skip the intro
      if (pilot.interactionRequired) {
        // Playback requires user interaction, show a play button
        document.body.classList.add("showPlayButton");
      } else {
        window.startShared();
      }
    } else {
      document.body.className = "showIntro";
    }
  }
}

window.startDemo = () => {
  window.start(
    "HQ18ZXTt-cBQCWrejZnQEwGEBTTYk0rWANgCEAGWAETAEYAlAFjM+O2gClqi0AFQBuegFEAMjiZc56HlAqSAHKBosAzPJ1dFEAEYA1CuBqaAKuN03M+lNdQBXPGts776lm9BGDwXhRGYBoVCwoKFQAzChjTdwxPdQBZHDBTAHFHeFEAdQBBAAlYhL0YAFU6eBEmNnoAMQ5S0qSQIRQauvrIFx9m0laaACcmuBEVAFZ8idkIUIsVHE1lzSZZ-oRFDR9tLLGAdjq8NMh6NxUWKI2FcE1U9HGJvBmoUXycegN967R9cvi0J16hMfrZ9O0MCIaF0eq5QdwwMMQQ9ahlkaB6Bx5jQcLimDiTvDoPpZHsuKJjngaOsiZsuDUpnhafJWoCcBMMtpmWVOAz6kyIL1uahWagoRMGuAziEwjRqfiCcKIKKOioKPQKDTRPR8NSlUh9YbyEajSqTdczeb+parS1bUqbfawU7uY6XR53bS3Z6eT6ft6-QNA-7gxbQxsA+GblG7TGEpG43TE87kzYE6mYOmM1As9nlXmWQW5LmiyAgA"
  );
};

window.startShared = () => {
  window.start(hash);
};

window.start = (bin) => {
  pilot.start();
  document.body.className = "started";
  console.log({ hash, bin, test: /^room=/.test(bin) });
  if (/^room=/.test(bin)) {
    orca.joinRoom(bin.slice(5));
    multiplayerButton.classList.add("primary");
  } else {
    if (bin) orca.load(bin);
    else orca.showGuide();
  }
  orca.start();
  orcaFrame.contentWindow.focus();
};

window.createRoom = async () => {
  const room = Math.random().toString(32).slice(2);
  orca.createRoom(room);
  multiplayerButton.classList.add("primary");
  const showUrl = () => shareUrl(`${window.origin}/#room=${room}`);
  multiplayerButton.onclick = showUrl;
  showUrl();
};

function shareUrl(url) {
  shareInput.value = url;
  shareInput.select();
}

window.copy = async () => {
  const href = shareInput.value;
  try {
    await navigator.clipboard.writeText(href);
  } catch (e) {
    // fallback to open in new window
    window.open(href);
  }
  orcaFrame.contentWindow.focus();
};
window.share = () => {
  const bin = orca.getCode();
  shareUrl(`${window.origin}/#${bin}`);
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
