import IPlayer from './IPlayer'
import * as PlayerStatusType from './PlayerStatusType'

export default class Player implements IPlayer {
    name: String = '';
    img: String = '';
    role: IRole;
    status: Array = [];
    isAlive: boolean = true;

    constructor(name, img){
      this.name = name;
      this.img = img;
    }
}