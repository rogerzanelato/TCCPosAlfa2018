import React, { Component } from "react";
import { Alert } from 'react-native';
import BackHandlerIntercept from './BackHandlerIntercept';
import { StackActions, NavigationActions } from 'react-navigation';

export default class ExitGameIntercept extends Component {
    
    constructor(props) {
        super(props);
    }

    exit() {
        const ref = this.props.screen;
        const resetAction = StackActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Game' }),
                NavigationActions.navigate({ routeName: 'Roles' }),
            ],
        });
        ref.props.navigation.dispatch(resetAction);
    }

    onBackPress() {
        Alert.alert(
            '',
            'Deseja mesmo sair deste jogo?',
            [
                {text: 'CANCELAR'},
                {text: 'SAIR', onPress: () => this.exit() },
            ]
        )
    }

    render() {
        return (
            <BackHandlerIntercept handleEvent={() => this.onBackPress()} />
        );
    }
}