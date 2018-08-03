import React, { Component } from "react";
import { BackHandler } from 'react-native'

export default class BackHandlerIntercept extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleEvent);                
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleEvent);                
    }

    _handleEvent = () => {
        if ( this.props.handleEvent !== undefined ) {
            this.props.handleEvent();
        }

        return true
    }

    render(){
        return null
    }

}