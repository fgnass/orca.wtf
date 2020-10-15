# orca.wtf

An online playground to run Orca and Pilot directly in the browser.

## About

[Orca](https://hundredrabbits.itch.io/orca) is an esoteric programming language, designed to create procedural sequencers in which each letter of the alphabet is an operation, where lowercase letters operate on bang, uppercase letters operate each frame.

[Pilot](https://wiki.xxiivv.com/site/pilot.html) is a mini synthetiser designed to be used with Orca.

Normally both are standalone apps that talk to another via UDP. This project lets you run both side by side directly in your browser.

Whenever you edit an orca file its contents is encoded in the URL so that you can share the link with others.

## Implementation Details

Both Orca and Pilot are linked as git submodules and are left completely untouched so that they can easily be updated.

The bundling is done using Webpack.
In that process all Electron/Node.js specific code is replaced with mock implementations that can be found in `/browser`. Most notably `dgram.js` that replaces the UDP communication with plain cross-iframe JavaScript calls.

Unlike Pilot, Orca is not built using ES modules but relies on globals. The webpack config sets up some shimming rules to convert these into proper modules that can be imported.
