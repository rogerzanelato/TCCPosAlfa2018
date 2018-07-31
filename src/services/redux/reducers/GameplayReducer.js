const INITIAL_STATE = {
    gameStatus: '',
    players: [],
    playerTurn: 0,
    dayNumber: 1
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'set_all':
            return {
              ...state,
              ...action
            }
        case 'set_game_status':
            return {
              ...state,
              gameStatus: action.gameStatus
            }
        case 'set_player_turn':
            return {
              ...state,
              playerTurn: action.playerTurn
            }
        case 'set_day_number':
            return {
              ...state,
              dayNumber: action.dayNumber
            }
        case 'set_players':
            return {
              ...state,
              players: action.players
            }
        default:
          return state
    }

    return state
}