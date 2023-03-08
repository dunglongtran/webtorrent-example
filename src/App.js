import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = {
    torrentInfoHash: "",
    torrentMagnetURI: "",
    torrentName: "",
    torrentProgress: "",
    torrentFiles: []
  };

  componentDidMount() {
    // Sintel, a free, Creative Commons movie
    var torrentId =
      "magnet:?xt=urn:btih:edf92c7956664e82bf64982d89c1319c9548cd99&dn=The.Amazing.Maurice.2022.1080p.NOW.WEBRip.1400MB.DD5.1.x264-GalaxyRG&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.tiny-vps.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fexplodie.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.cyberia.is%3A6969%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.birkenwald.de%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2970%2Fannounce&tr=https%3A%2F%2Ftracker.foreverpirates.co%3A443%2Fannounce&tr=http%3A%2F%2Ftracker.openbittorrent.com%3A80%2Fannounce&tr=udp%3A%2F%2Fopentracker.i2p.rocks%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com";

    var WebTorrent = require("webtorrent");
    var client = new WebTorrent();

    client.on("error", (err) => {
      console.log("[+] Webtorrent error: " + err.message);
    });

    client.add(torrentId, (torrent) => {
      const interval = setInterval(() => {
        // console.log('[+] Progress: ' + (torrent.progress * 100).toFixed(1) + '%')
        this.setState({
          torrentProgress: (torrent.progress * 100).toFixed(1) + "%"
        });
      }, 5000);
      torrent.on("done", () => {
        console.log("Progress: 100%");
        clearInterval(interval);
      });
      console.log(torrent);
      this.setState({
        torrentInfoHash: torrent.infoHash,
        torrentMagnetURI: torrent.magnetURI,
        torrentName: torrent.name,
        torrentFiles: torrent.files
      });

      // TODO Figure out a better way to render these files
      this.state.torrentFiles.map((file, i) => {
        file.appendTo("body");
      });
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.torrentName}</h1>
        <p>
          <b>Torrent Info Hash: </b>
          {this.state.torrentInfoHash}
        </p>
        <p>
          <b>Torrent Progress: </b>
          {this.state.torrentProgress}
        </p>
      </div>
    );
  }
}

export default App;
