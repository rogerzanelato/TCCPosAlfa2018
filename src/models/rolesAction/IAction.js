export interface IAction {
    name: string;
    icon?: string;
    type: number;
    charge: number;
    needTarget: boolean;

    action(player: IPlayer, players?: Array<IPlayer>): void;
}