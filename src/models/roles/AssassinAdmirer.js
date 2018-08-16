import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import DefaultWithTargets from '@components/actions/DefaultWithTargets'
import Nothing from '../rolesAction/Nothing'
import ClarividenceVillain from '../rolesAction/ClarividenceVillain';

export default class AssassinAdmirer implements IRole {
    name = 'Admirador do Assassino';
    description = 'Você é um grande fã do Assassino embora ainda não o conheça. Durante a noite, você seleciona um jogador e pode descobrir se ele é o Detetive ou o Assassino.';
    descriptionActions = 'Você é um grande fã do assassino! Selecione um jogador e poderá descobrir se ele é o Assassino ou Detetive.';
    img =  require('@imgs/roles/admirador.png');
    type = RolesType.VILLAIN;
    idRole = 3;
    weight = 1;
    weightIdxDivisor = 5;

    actions: Array<IAction> = [ new ClarividenceVillain('SELECIONAR'), new Nothing('PULAR') ];

    component = ({...props}) => <DefaultWithTargets {...props} />;

    isConditionToWinDone(val: ConditionToWinParam) {
        const playersAlive = val.players.filter( it => it.isAlive );
        const thereIsVillainsAlive = playersAlive.findIndex( it => it.role.type === RolesType.VILLAIN ) !== -1;
        const thereIsNotOthersRoleAlive = playersAlive.findIndex( it => it.role.type !== RolesType.VILLAIN ) === -1;
        
        return thereIsVillainsAlive && thereIsNotOthersRoleAlive;
    }
}