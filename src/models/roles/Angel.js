import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Defense from '../rolesAction/Defense'
import Nothing from '../rolesAction/Nothing'
import DefaultWithTargets from '@components/actions/DefaultWithTargets'

export default class Angel implements IRole {
    name = 'Anjo';
    description = 'Durante a noite, você acorda e seleciona um jogador que não poderá ser morto pelo Assassino.';
    descriptionActions = 'Selecione um jogador para proteger nesta noite.';
    img =  require('@imgs/roles/anjo.png');
    type = RolesType.HERO
    idRole = 1;
    weight = 1;
    weightIdxDivisor = 5;

    actions: Array<IAction> = [ new Defense('PROTEGER'), new Nothing('PULAR')];
    
    component = ({...props}) => <DefaultWithTargets {...props} />;

    isConditionToWinDone(val: ConditionToWinParam) {
        const playersAlive = val.players.filter( it => it.isAlive );
        const thereIsNotAssassinsAlive = playersAlive.findIndex( it => it.role.idRole === 2 ) === -1;
        const thereIsHeroesAlive = playersAlive.findIndex( it => it.role.type === RolesType.HERO ) !== -1;
        
        return thereIsHeroesAlive && thereIsNotAssassinsAlive;
    }
}