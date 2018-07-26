import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content, Form, Item, Label, Input  } from 'native-base';
import styles from '../css/Style';

export default class JogadorManagerScreen extends React.Component {
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
                        <Icon name='close' style={styles.title_main_color} />
                    </Button>
                </Left>
                <Body>
                    <Title></Title>
                </Body>
                <Right>
                    <Text style={styles.title_main_color}>Salvar</Text>
                </Right>
            </Header>

            <Content contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 20, paddingRight: 15}}>
                <Image source={require('../img/avatares/av1.png')} style={{width: 210, height: 210, borderRadius: 105}}/>
                <Form style={{width: '100%'}}>
                    <Item floatingLabel>
                        <Label>Nome do jogador</Label>
                        <Input />
                    </Item>
                </Form>
            </Content>
        </Container>
        );
    }

}