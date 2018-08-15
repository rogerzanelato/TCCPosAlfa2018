import IAction from "./IAction";
import * as RolesActionType from "./RolesActionType";

export default class ClarividenceVillain implements IAction {
    name: string;
    icon: string;
    type: number = RolesActionType.OTHER;
    charge: 99999;
    needTarget: boolean = true;

    constructor(name: string = 'SELECIONAR') {
        this.name = name;
    }
    
    action(val: ActionParams) {
        const params = { 
            callback: val.callback
        };
        if ( val.target.role.idRole === 2 || val.target.role.idRole === 6 ) {
            params.player = val.target;
        }

        val.screenRef.props.navigation.navigate('ShowPlayerRole', params);
    }
}