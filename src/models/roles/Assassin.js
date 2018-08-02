import IRole from './IRole'
import * as RolesType from './RolesType'

export default class Assassin implements IRole {
    name = 'Assassino';
    description = 'Durante a noite, você acorda e decide uma vítima para matar. Durante o dia, tente parecer um cidadão indefeso para não ser morto.';
    type = RolesType.VILLAIN;
    idRole = 2;
    weight = 1;
    weightIdxDivisor = 4;
}