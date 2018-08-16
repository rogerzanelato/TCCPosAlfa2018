type ConditionToWinParam = {
    players?: Array<IPLayer>,
    self?: IPlayer
};

/**
 * Interface dos papéis presentes no jogo
 * Os atributos weight e weightIdxDivisor são responsáveis por fazer a regra de 3 que validará atribuição automática
 * de determinado papel ao jogador. 
 * Ex: weight = 1, weightIdxDivisor = 5, _number_of_players_ = 7   =>   Math.round( ( 1 / 5 ) * 7 ) = 1
 * No exemplo acima, a rodada poderá ter apenas um jogador com esse papel ( fora exceções )
 */
export interface IRole {
    name: string;
    description: string;
    descriptionActions: string;
    img: string;
    type: number;
    idRole: number;
    weight: number;
    weightIdxDivisor: number;
    actions?: Array<IAction>;
    component: Object;
    
    isConditionToWinDone(val: ConditionToWinParam): boolean;
}