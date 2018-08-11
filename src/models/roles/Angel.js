import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Defense from '../rolesAction/Defense'
import Default from '@components/roles/Default'

export default class Angel implements IRole {
    name = 'Anjo';
    description = 'Durante a noite, você acorda e seleciona um jogador que não poderá ser morto pelo Assassino.';
    descriptionActions = 'Selecione um jogador que deseja proteger nesta noite.';
    type = RolesType.HERO
    idRole = 1;
    weight = 1;
    weightIdxDivisor = 5;

    actions: Array<IAction> = [ new Defense() ];
    
    component = ({...props}) => <Default {...props} />;

}