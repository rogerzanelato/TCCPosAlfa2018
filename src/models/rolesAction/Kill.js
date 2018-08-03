import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";
import * as PlayerStatusType from "../player/PlayerStatusType";

export default class Kill implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.ATTACK;

    constructor(name: string) {
        this.name = name;
    }

    action(players ?: Array<IRole>, target ?: IRole): void {
        if ( target !== undefined ) {
            target.status.push(PlayerStatusType.BEING_ATTACKED);
        }
    }
    
}