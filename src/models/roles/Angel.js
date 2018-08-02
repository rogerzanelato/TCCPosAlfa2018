import IRole from './IRole'
import * as RolesType from './RolesType'

export default class Angel implements IRole {
    name = 'Anjo';
    description = 'Durante a noite, você acorda e seleciona um jogador que não poderá ser morto pelo Assassino.';
    type = RolesType.HERO
    idRole = 1;
    weight = 1;
    weightIdxDivisor = 5;
}
