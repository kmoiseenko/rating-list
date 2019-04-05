const globalConst = {
  UPDATE_PLAYER_NAME: 'updatePlayerName',
  UPDATE_PLAYER_SCORES: 'updatePlayerScores',
  CONFIRM_PLAYER_SCORES_UPDATE: 'confirmPlayerScoresUpdate',
  DELETE_PLAYER_FROM_LIST: 'deletePlayerFromList'
}

const generateRandom = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const sortList = (list) => {
  return list.sort((a, b) => (b.score - a.score));
}

export { globalConst, generateRandom, sortList };
