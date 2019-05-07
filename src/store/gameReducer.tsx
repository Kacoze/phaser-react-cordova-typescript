export const PLAY = "PLAY";
export const QUIT = "QUIT";

const initState: { playing: boolean, game: any } = {
  playing: false,
  game: null
};

export const play = () => ({
  type: PLAY
});

export const quit = () => ({
  type: QUIT
});

export const gameReducer = (
  state = initState,
  action: { type: string; payload?: any }
) => {
  console.log("Action:", action);
  switch (action.type) {
    case PLAY:
      return { ...state, playing: true, game: action.payload };
    case QUIT:
      state.game.destroy(true);
      return { ...state, playing: false, game: null};

    default:
      return state;
  }
};