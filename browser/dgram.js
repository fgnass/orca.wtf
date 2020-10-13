var EventEmitter = require("events");

let ports = window.top.ports;
if (!ports) {
  ports = window.top.ports = {};
}

class Socket extends EventEmitter {
  bind(port) {
    this.port = port;
    ports[port] = this;
    this.emit("listening");
  }
  address() {
    return {
      address: "0.0.0.0",
      port: this.port,
    };
  }
  send(buf, port, ip, onError) {
    const target = ports[port];
    if (!target) onError(new Error("Unable to connect"));
    target.emit("message", buf);
  }
  close() {
    this.removeAllListeners();
    if (this.port && ports[this.port] === this) {
      delete ports[this.port];
    }
  }
}

module.exports = {
  createSocket() {
    return new Socket();
  },
};
