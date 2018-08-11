import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Default from '@components/roles/Default'

export default class AssassinAdmirer implements IRole {
    name = 'Admirador do Assassino';
    description = 'Você é um grande fã do Assassino embora ainda não o conheça. Durante a noite, você seleciona um jogador e pode descobrir se ele é o Detetive ou o Assassino.';
    descriptionActions = 'Você é um grande fã do assassino! Selecione um jogador e poderá descobrir se ele é o Assassino ou Detetive.';
    type = RolesType.VILLAIN;
    idRole = 3;
    weight = 1;
    weightIdxDivisor = 5;

    component = ({...props}) => <Default {...props} />;
}