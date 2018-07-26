import React from 'react';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../css/Style';

export default class ConfigScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            error: ''
        }
    }

    
    render(){
        return (
            <Container>
            <Header androidStatusBarColor="#000" style={styles.header_main}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack() }>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Configurações</Title>
                </Body>
                <Right />
            </Header>

            <Content>

            </Content>
        </Container>
        );
    }

}