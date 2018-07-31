import React from 'react';
import { Switch } from 'native-base';

export default class SwitchWrapper extends React.Component {
    constructor(props) {
        super(props);
                
        this.state = {
            selected: props.switched ? props.switched : false
        }
    }

    render() {
        const {switched, ...props} = this.props;
        return (
            <Switch 
                value={this.state.selected}
                {...this.props}
            />
        );
    }
}