import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Default from '@components/actions/Default'

export default class Citizen implements IRole {
    name = 'Cidadão';
    description = 'Você não tem nenhuma característica em especial, mas poderá votar e ajudar na discussão da cidade para descobrir e eliminar o assassino.';
    descriptionActions = 'Durante o dia, você discute com a cidade sobre quem pode ser o assassino e decide alguém para matar.';
    type = RolesType.HERO;
    idRole = 4;
    weight = 1;
    weightIdxDivisor = 1;

    component = ({...props}) => <Default {...props} />;
    
    isConditionToWinDone(val: ConditionToWinParam) {
        const playersAlive = val.players.filter( it => it.isAlive );
        const thereIsNotAssassinsAlive = playersAlive.findIndex( it => it.role.idRole === 2 ) === -1;
        const thereIsHeroesAlive = playersAlive.findIndex( it => it.role.type === RolesType.HERO ) !== -1;
        
        return thereIsHeroesAlive && thereIsNotAssassinsAlive;
    }
}