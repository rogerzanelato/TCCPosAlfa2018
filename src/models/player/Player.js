import IPlayer from './IPlayer'

export default class Player implements IPlayer {
    name: String = '';
    img: String = '';
    role: IRole = null;
    status: Array<number> = [];
    isAlive: boolean = true;
    votes: number = 0;

    constructor(name, img){
      this.name = name;
      this.img = img;
    }
}