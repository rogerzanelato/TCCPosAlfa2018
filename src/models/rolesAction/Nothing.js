import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";
import * as PlayerStatusType from '../player/PlayerStatusType';

export default class Nothing implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.ATTACK;
    charge: 99999;
    needTarget: boolean = false;

    constructor(name: string = 'PULAR') {
        this.name = name;
    }
    
    action() {

    }
}