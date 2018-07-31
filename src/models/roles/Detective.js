import IRole from './IRole'
import * as roleType from './RoleTypes'

export default class Detective implements IRole {
    name = 'Detetive';
    description = 'Você poderá descobrir o papel de outro jogador a cada noite.';
    type = roleType.HERO;
}
