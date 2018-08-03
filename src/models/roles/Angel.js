import IRole from './IRole'
import * as RolesType from './RolesType'
import Defense from '../rolesAction/Defense'

export default class Angel implements IRole {
    name = 'Anjo';
    description = 'Durante a noite, você acorda e seleciona um jogador que não poderá ser morto pelo Assassino.';
    descriptionActions = 'Selecione um jogador que deseja defender nesta noite.';
    type = RolesType.HERO
    idRole = 1;
    weight = 1;
    weightIdxDivisor = 5;

    actions: Array<IAction> = [ new Defense() ];

}