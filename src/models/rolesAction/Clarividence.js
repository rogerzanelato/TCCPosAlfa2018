import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";

export default class Clarividence implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.OTHER;
    charge: 99999;
    needTarget: boolean = true;

    constructor(name: string = 'SELECIONAR') {
        this.name = name;
    }
    
    action(val: ActionParams) {
        val.screenRef.props.navigation.replace('ShowPlayerRole', {
            player: val.target,
            callback: val.callback
        });
    }
}