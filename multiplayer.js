import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { getClientColor } from "./palette";

function setup(client, room) {
  // Create a shared document
  const doc = new Y.Doc();

  // Share it via WebRTC
  const { awareness } = new WebrtcProvider(room, doc);

  // A shared text-type for the orca code
  const ycode = doc.getText("code");

  // A shared array for the canvas dimensions
  const ysize = doc.getArray("size");

  const { orca, cursor } = client;

  /**
   * Returns the id of the remote client that has selected the given coordinates.
   */
  const selectedBy = (x, y) => {
    for (let [clientID, state] of awareness.getStates()) {
      if (clientID !== doc.clientID) {
        if (
          x >= state.minX &&
          y >= state.minY &&
          x <= state.maxX &&
          y <= state.maxY
        )
          return clientID;
      }
    }
  };

  // Overwrite to capture the bounds of the selected area
  const _calculateBounds = cursor.calculateBounds;
  cursor.calculateBounds = () => {
    _calculateBounds.call(cursor);
    const { minX, minY, maxX, maxY } = cursor;
    // store in local state which is propagated to the other clients
    awareness.setLocalState({ minX, minY, maxX, maxY });
  };

  // Overwrite to display a cursor glyph for remote cursors
  client.isCursor = (x, y) => {
    if (x === client.cursor.x && y === client.cursor.y) return true;
    for (let [clientID, state] of awareness.getStates()) {
      if (clientID !== doc.clientID) {
        if (x === state.minX && y === state.minY) return true;
      }
    }
  };

  // Overwrite so that remote selections aren't hidden
  const _isInvisible = client.isInvisible;
  client.isInvisible = (x, y) =>
    _isInvisible.call(client, x, y) && !selectedBy(x, y);

  // Overwrite to show remote selections in different colors
  const _makeStyle = client.makeStyle;
  client.makeStyle = (x, y, glyph, selection) => {
    const clientID = selectedBy(x, y);
    if (clientID) return clientID;
    return _makeStyle.call(client, x, y, glyph, selection);
  };

  // Overwrite to show remote selections in different colors
  const _makeTheme = client.makeTheme;
  client.makeTheme = (type) => {
    if (type > 20) {
      return { bg: getClientColor(type), fg: client.theme.active.f_inv };
    }
    return _makeTheme.call(client, type);
  };

  /**
   * Writes a single glyph into the shared document.
   */
  const ywrite = (x, y, g) => {
    const index = orca.indexAt(x, y);
    doc.transact(() => {
      ycode.delete(index, 1);
      ycode.insert(index, g);
    });
  };

  // Overwrite to send modifications to remote clients
  const _write = cursor.write;
  cursor.write = (g) => {
    if (!orca.isAllowed(g)) return;
    _write.call(cursor, g);
    ywrite(cursor.x, cursor.y, g);
  };

  const _orcaWrite = orca.write;

  /**
   * Utility to temporarily overwrite orca.write to capture modifications.
   * We can't do this all the time since this would also capture programmatic output!
   */
  const callAndCapture = (cb) => {
    doc.transact(() => {
      orca.write = (x, y, g) => {
        ywrite(x, y, g);
        _orcaWrite.call(orca, x, y, g);
      };
      cb();
      orca.write = _orcaWrite;
    });
  };

  // Overwrite to capture block writes like paste & comments
  const _writeBlock = orca.writeBlock;
  orca.writeBlock = (x, y, block, overlap = false) => {
    callAndCapture(() => _writeBlock.call(orca, x, y, block, overlap));
  };

  // Overwrite to capture deletions
  const _erase = cursor.erase;
  cursor.erase = () => {
    callAndCapture(() => _erase.call(cursor));
  };

  ycode.observe(() => {
    orca.replace(ycode.toString());
    if (client.clock.isPaused) client.update();
  });

  awareness.on("change", () => {
    if (client.clock.isPaused) client.update();
  });

  return { orca, doc, ycode, ysize };
}

export function createRoom(client, room) {
  const { orca, doc, ycode, ysize } = setup(client, room);
  client.resize = () => {};
  doc.transact(() => {
    ysize.insert(0, [orca.w, orca.h]);
    ycode.insert(0, orca.s);
  });
}

export function joinRoom(client, room) {
  const { orca, ycode, ysize } = setup(client, room);
  client.resize = () => {};
  ysize.observe(() => {
    const w = ysize.get(0);
    const h = ysize.get(1);
    const code = ycode.toString();
    orca.load(w, h, code);
    client.update();
  });
}
