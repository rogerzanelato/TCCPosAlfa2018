import IGame from './IGame'
import * as GameStatusType from './GameStatusType'

export default class Game implements IGame {
    status: number = GameStatusType.AWAITING_TO_START;
    players: Array<IPlayer>;
}