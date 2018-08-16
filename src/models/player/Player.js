import IPlayer from './IPlayer'
import { v4 as uuidv4 } from 'uuid'

export default class Player implements IPlayer {
    name: string = '';
    img: string = '';
    role: IRole = null;
    status: Array<number> = [];
    isAlive: boolean = true;
    votes: number = 0;
    wasKilledByPlayer: boolean | null = null;
    idPlayer: string = '';

    constructor(name, img){
      this.name = name;
      this.img = img;

      this.idPlayer = uuidv4();
    }
}