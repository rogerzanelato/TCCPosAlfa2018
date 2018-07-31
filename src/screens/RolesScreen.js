import React from 'react';
import { View } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../css/Style';

export default class RolesScreen extends React.Component {
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
                    <Title>Papéis</Title>
                </Body>
                <Right />
            </Header>

            <Content>
                    <View style={[styles.bg_color3, {flex: 1} ]}>
                        <Text style={ styles.text_inside_box }>
                            Selecione os papéis que deseja que façam parte do jogo
                        </Text>
                    </View>
            </Content>
        </Container>
        );
    }

}