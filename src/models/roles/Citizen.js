import IRole from './IRole'
import * as RolesType from './RolesType'

export default class Citizen implements IRole {
    name = 'Cidadão';
    description = 'Você não tem nenhuma característica em especial, mas poderá votar e ajudar na discussão da cidade para descobrir e eliminar o assassino.';
    type = RolesType.HERO;
    idRole = 4;
    weight = 1;
    weightIdxDivisor = 1;
}