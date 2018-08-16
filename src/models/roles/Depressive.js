import React from 'react';
import IRole from './IRole'
import * as RolesType from './RolesType'
import Default from '@components/actions/Default'

export default class Depressive implements IRole {
    name = 'Depressivo';
    description = 'Você está muito triste. Seu único objetivo é ser morto pela aldeia. Para ganhar, você precisar ser morto na votação da cidade.';
    descriptionActions = 'Você vence o jogo se for morto na votação da cidade.';
    img =  require('@imgs/roles/depressivo.png');    
    type = RolesType.OTHER;
    idRole = 5;
    weight = 1;
    weightIdxDivisor = 10;
    winnerTitle = 'O depressivo venceu!';
    winnerMessage = 'Um cidadão inocente foi eliminado pela votação!';

    component = ({...props}) => <Default {...props} />;
    
    isConditionToWinDone(val: ConditionToWinParam) {
        const isDead = val.self.isAlive === false
        const wasNotKilledByPlayer = val.self.wasKilledByPlayer === false

        // Se o jogador está morto e não foi porto por um jogador, indica que foi por votação
        return isDead && wasNotKilledByPlayer
    }
}