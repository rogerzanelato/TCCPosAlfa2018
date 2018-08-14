import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";
import * as PlayerStatusType from "../player/PlayerStatusType";

export default class Defense implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.DEFENSE;
    charge: 99999;
    needTarget: boolean = true;

    constructor(name: string = 'PROTEGER') {
        this.name = name;
    }

    action(val: ActionParams) {
        val.target.status.push(PlayerStatusType.BEING_DEFENSED);
        
        val.callback();
    }
}