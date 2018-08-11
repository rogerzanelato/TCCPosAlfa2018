import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";

export default class Kill implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.ATTACK;
    charge: 99999;

    constructor(name: string = 'MATAR') {
        this.name = name;
    }
    
}