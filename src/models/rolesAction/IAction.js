export interface IAction {
    name: string;
    icon?: string;
    type: number;

    action(players ?: Array<IRole>, target ?: IRole, self ?: IRole): mixed;
}