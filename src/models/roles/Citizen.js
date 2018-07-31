import IRole from './IRole'
import * as roleType from './RoleTypes'

export default class Citizen implements IRole {
    name = 'Cidadão';
    description = 'Você não tem nenhuma característica em especial, mas poderá votar e ajudar na discussão da cidade para descobrir e eliminar o assassino.';
    type = roleType.HERO;
}
