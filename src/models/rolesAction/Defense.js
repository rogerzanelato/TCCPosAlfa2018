import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";
import * as PlayerStatusType from "../player/PlayerStatusType";

export default class Defense implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.DEFENSE;
    charge: 99999;

    constructor(name: string = 'PROTEGER') {
        this.name = name;
    }
}