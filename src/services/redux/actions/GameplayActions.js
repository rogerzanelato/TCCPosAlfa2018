export const setAll = (data) => {
    return {
        type: 'set_all',
        gameStatus: data.gameStatus,
        playerTurn: data.playerTurn,
        dayNumber: data.dayNumber,
        players: data.players
    }
}

export const setGameStatus = (data) => {
    return {
        type: 'set_game_status',
        gameStatus: data.gameStatus
    }
}

export const setPlayerTurn = (data) => {
    return {
        type: 'set_player_turn',
        playerTurn: data.playerTurn
    }
}

export const setDayNumber = (data) => {
    return {
        type: 'set_day_number',
        dayNumber: data.dayNumber
    }
}

export const setPlayers = (data) => {
    return {
        type: 'set_players',
        players: data.players
    }
}