/**
 * Orca isn't built using ES modules but uses globals instead.
 * This file describes the exports/imports of each file so that
 * we can turn them into proper modules during the build process.
 *
 * The format of each entry is [file, export, ...imports]
 */
module.exports = [
  ["core/io/cc.js", "MidiCC"],
  ["core/io/midi.js", "Midi", "transposeTable"],
  ["core/io/mono.js", "Mono"],
  ["core/io/osc.js", "Osc"],
  ["core/io/udp.js", "Udp"],
  ["core/io.js", "IO", "Midi", "MidiCC", "Mono", "Udp", "Osc"],
  ["core/library.js", "library", "Operator"],
  ["core/operator.js", "Operator"],
  ["core/orca.js", "Orca"],
  ["core/transpose.js", "transposeTable"],
  ["lib/acels.js", "Acels"],
  ["lib/history.js", "History"],
  ["lib/source.js", "Source"],
  ["lib/theme.js", "Theme"],
  [
    "client.js",
    "Client",
    "library",
    "Acels",
    "Source",
    "History",
    "Orca",
    "IO",
    "Cursor",
    "Commander",
    "Clock",
    "Theme",
  ],
  ["clock.js", "Clock"],
  ["commander.js", "Commander"],
  ["cursor.js", "Cursor"],
];
