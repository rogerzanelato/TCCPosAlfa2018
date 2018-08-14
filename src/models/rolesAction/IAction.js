type ActionParams = {
    target?: IPlayer,
    screenRef?: object,
    callback?: () => void,
    players?: Array<IPlayer>
};

export interface IAction {
    name: string;
    icon?: string;
    type: number;
    charge: number;
    needTarget: boolean;

    action(val: ActionParams): void;
}