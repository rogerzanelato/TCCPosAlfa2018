import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";
import * as PlayerStatusType from '../player/PlayerStatusType';

export default class Kill implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.ATTACK;
    charge: 99999;
    needTarget: boolean = true;

    constructor(name: string = 'MATAR') {
        this.name = name;
    }
    
    action(val: ActionParams) {
        val.target.votes++;
        val.target.status.push(PlayerStatusType.BEING_ATTACKED);

        val.callback();
    }
}