import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../css/Style';
import Jogador from '../models/Jogador';

export default class GameScreen extends React.Component {
    constructor() {
        super();

        this.state = {
            error: '',
            jogadores: [
                new Jogador('Jogador 1', require('../img/avatares/av1.png')),
                new Jogador('Jogador 2', require('../img/avatares/av2.png')),
                new Jogador('Jogador 3', require('../img/avatares/av3.png')),
                new Jogador('Jogador 4', require('../img/avatares/av4.png')),
                new Jogador('Jogador 5', require('../img/avatares/av5.png'))
            ]
        }
    }

    renderJogadores() {
        content = this.state.jogadores.map( (item, index) => {
            return (
                <View key={index}>
                    <TouchableOpacity 
                        style={styles.avatar_view}
                        onPress={() => this.openPlayerManager(item)} >
                        <Image
                            source={item.img}
                            style={styles.avatar_img} />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            );
        });

        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',  flexWrap: 'wrap', margin: 10}}>
                {content}
            </View>
        );
    }

    openPlayerManager = (item) => {
        this.props.navigation.push('JogadorManager')
    }

    renderButton() {
        if(this.state.jogadores.length >= 3){
            return (
                <Text style={[styles.item_diff, styles.text_default, { height: '100%', textAlign: 'center', textAlignVertical: 'center', borderRadius: 5}]} >
                    PRÓXIMO 
                </Text>
            );
        } else {
            const qtde = 3 - this.state.jogadores.length;
            const str = qtde > 1 ? 'JOGADORES' : 'JOGADOR';
            return (
                <Text style={[styles.text_default, { backgroundColor: '#757575', height: '100%', textAlign: 'center', textAlignVertical: 'center', borderRadius: 5}]}>
                    ADICIONE MAIS {`${qtde} ${str}`}
                </Text>
            );
        }
    }
    
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#000" style={styles.header_main}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack() }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Jogadores</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.openPlayerManager() }>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={{flex: 1, flexDirection: 'column'}}>
                    <View style={[styles.bg_color3, {flex: 1} ]}>
                        <Text style={ styles.text_inside_box }>
                            Adicione os jogadores abaixo. Os papéis serão atribuídos automaticamente no início da rodada.
                        </Text>
                    </View>

                    <View style={{flex: 5}}>
                        <ScrollView>
                            {this.renderJogadores()}
                        </ScrollView>
                    </View>

                    <View style={{flex: 0.5, borderTopColor: '#cccccc', borderTopWidth: 1, padding: 10}}>
                        {this.renderButton()}
                    </View>
                </Content>
            </Container>
        );
    }

}