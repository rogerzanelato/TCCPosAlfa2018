import IRole from './IRole'
import * as roleType from './RoleTypes'

export default class Depressive implements IRole {
    name = 'Depressivo';
    description = 'Você está muito triste. Seu único objetivo é ser morto pela aldeia. Para ganhar, você precisar ser morto na votação da cidade.';
    type = roleType.OTHER;
}
