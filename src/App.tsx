import * as React from "react";
import * as Phaser from "phaser";
import { connect } from "react-redux";
import { Game } from './game/game';
import { BootScene } from "./game/scenes/bootScene";
import { GameScene } from "./game/scenes/gameScene";
import store from "./store";
import { PLAY } from "./store/gameReducer";

const config: GameConfig = {
  title: "Flappy Bird",
  url: "https://github.com/digitsensitive/phaser3-typescript",
  version: "1.0",
  width: '100vw',
  height: '100vh',
  zoom: 1,
  type: Phaser.AUTO,
  parent: "game",
  scene: [BootScene, GameScene],
  input: {
    keyboard: false,
    mouse: true,
    touch: true,
    gamepad: false
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  backgroundColor: "#98d687",
  render: { pixelArt: true, antialias: false },
};

class App extends React.Component<any> {
  render() {
    return (
      <div className="App">
        <div id="game"></div>
        <div id="ui" style={{display: !this.props.playing ? 'block' : 'none' }}>
          <header className="App-header">
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <button
            onClick={async () => {
              store.dispatch({ type: PLAY, payload: new Game(config) });
            }}
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ playing }: { playing: boolean }) => ({
  playing
});

export default connect(mapStateToProps)(App);
