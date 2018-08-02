import IRole from './IRole'
import * as RolesType from './RolesType'

export default class Detective implements IRole {
    name = 'Detetive';
    description = 'Você poderá descobrir o papel de outro jogador a cada noite.';
    type = RolesType.HERO;
    idRole = 6;
    weight = 1;
    weightIdxDivisor = 5;
}