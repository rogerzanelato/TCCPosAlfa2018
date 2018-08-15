import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Kill from '../rolesAction/Kill'
import Nothing from '../rolesAction/Nothing'
import AssassinView from '@components/actions/AssassinView'

export default class Assassin implements IRole {
    name = 'Assassino';
    description = 'Durante a noite, você acorda e decide uma vítima para matar. Durante o dia, tente parecer um cidadão indefeso para não ser morto.';
    descriptionActions = 'Selecione um jogador para matar. Caso haja mais assassinos, eles saberão de seu voto.'
    type = RolesType.VILLAIN;
    idRole = 2;
    weight = 1;
    weightIdxDivisor = 4;

    actions: Array<IAction> = [ new Kill('MATAR'), new Nothing('PULAR') ];

    component = ({...props}) => <AssassinView {...props} />;
}