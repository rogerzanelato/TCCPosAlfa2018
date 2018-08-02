export default class Jogador {
    name: string = '';
    img: string = '';
    role: IRole;

    constructor(name, img){
      this.name = name;
      this.img = img;
    }
}