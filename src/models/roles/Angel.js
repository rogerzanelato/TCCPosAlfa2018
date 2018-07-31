import IRole from './IRole'
import * as roleType from './RoleTypes'

export default class Angel implements IRole {
    name = 'Anjo';
    description = 'Durante a noite, você acorda e seleciona um jogador que não poderá ser morto pelo Assassino.';
    type = roleType.HERO;
}
