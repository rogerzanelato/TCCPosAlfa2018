import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Default from '@components/roles/Default'

export default class Detective implements IRole {
    name = 'Detetive';
    description = 'Você poderá descobrir o papel de outro jogador a cada noite.';
    descriptionActions = 'Selecione um jogador para descobrir seu papel.';
    type = RolesType.HERO;
    idRole = 6;
    weight = 1;
    weightIdxDivisor = 5;

    component = ({...props}) => <Default {...props} />;
}