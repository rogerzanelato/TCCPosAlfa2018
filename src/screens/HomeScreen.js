import React from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../css/Style';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            error: ''
        }
    }

    render() {
        return (
            <Container>
                <Header noLeft androidStatusBarColor="#000" style={styles.header_main}>
                    <Body>
                        <Title>Máfia</Title>
                    </Body>
                    <Right />
                </Header>
                
                <ImageBackground source={require('../img/imagem_fundo.jpg')} style={styles.container_init}>
                    <Content padder contentContainerStyle={styles.container_init}>
                        <Text 
                            style={[styles.item_menu, styles.item_diff]}
                            onPress={ () => this.props.navigation.navigate('Game') }>
                            Começar Jogo
                        </Text>
                        <Text 
                            style={styles.item_menu}
                            onPress={ () => this.props.navigation.navigate('JogadorManager') }>
                            Cadastrar Jogadores
                        </Text>
                        <Text 
                            style={styles.item_menu}
                            onPress={ () => this.props.navigation.navigate('Config') }>
                            Configurações
                        </Text>
                        <Text style={styles.item_menu}>Feedback</Text>
                        {/* <Text style={styles.item}>Virar PRO</Text> */}
                    </Content>
                </ImageBackground>
            </Container>
        );
    }

}