import IRole from './IRole'
import * as RolesType from './RolesType'

export default class Depressive implements IRole {
    name = 'Depressivo';
    description = 'Você está muito triste. Seu único objetivo é ser morto pela aldeia. Para ganhar, você precisar ser morto na votação da cidade.';
    type = RolesType.OTHER;
    idRole = 5;
    weight = 1;
    weightIdxDivisor = 10;
}