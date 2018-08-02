import IRole from './IRole'
import * as RolesType from './RolesType'

export default class AssassinAdmirer implements IRole {
    name = 'Admirador do Assassino';
    description = 'Você é um grande fã do Assassino embora ainda não o conheça. Durante a noite, você seleciona um jogador e pode descobrir se ele é o Detetive ou o Assassino.';
    type = RolesType.VILLAIN;
    idRole = 3;
    weight = 1;
    weightIdxDivisor = 5;
}