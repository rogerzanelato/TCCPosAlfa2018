import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import DefaultWithTargets from '@components/actions/DefaultWithTargets'
import Clarividence from '../rolesAction/Clarividence'
import Nothing from '../rolesAction/Nothing'

export default class Detective implements IRole {
    name = 'Detetive';
    description = 'Você poderá descobrir o papel de outro jogador a cada noite.';
    descriptionActions = 'Selecione um jogador para descobrir seu papel.';
    type = RolesType.HERO;
    idRole = 6;
    weight = 1;
    weightIdxDivisor = 5;

    actions: Array<IAction> = [ new Clarividence('SELECIONAR'), new Nothing('PULAR') ];

    component = ({...props}) => <DefaultWithTargets {...props} />;
}