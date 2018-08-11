import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Default from '@components/roles/Default'

export default class Depressive implements IRole {
    name = 'Depressivo';
    description = 'Você está muito triste. Seu único objetivo é ser morto pela aldeia. Para ganhar, você precisar ser morto na votação da cidade.';
    descriptionActions = 'Você vence o jogo se for morto na votação da cidade.';
    type = RolesType.OTHER;
    idRole = 5;
    weight = 1;
    weightIdxDivisor = 10;

    component = ({...props}) => <Default {...props} />;
}