const globalConst = {
  UPDATE_PLAYER_NAME: 'updatePlayerName',
  INCREASE_PLAYER_SCORES: 'increasePlayerScores',
  DECREASE_PLAYER_SCORES: 'decreasePlayerScores',
  DELETE_PLAYER_FROM_LIST: 'deletePlayerFromList'
}

const generateRandom = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const sortList = (list) => {
  return list.sort((a, b) => (b.score - a.score));
}

export { globalConst, generateRandom, sortList };
