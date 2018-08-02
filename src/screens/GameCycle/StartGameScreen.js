import React from 'react';
import { Image, Keyboard, TouchableOpacity, Alert, View } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content, Form, Item, Label, Input  } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setPlayers } from '@services/redux/actions/GameplayActions'
import Jogador from '@models/Jogador';
import Util from '@utils/Util';

class StartGameScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: ''
        }
    }

    render(){
        return (
            <Container>
                <Header noLeft androidStatusBarColor="#000" style={styles.header_main}>
                    <Body>
                        <Title>Máfia</Title>
                    </Body>
                    <Right />
                </Header>

                <Content contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 50}} padder>
                    <Image source={this.props.players[0].img} style={[styles.avatar_img_medium, styles.avatar_border]}/>

                    <View style={styles.container}>
                        <Text style={[styles.title_gamecycle, styles.margin_paragraph]}>
                            { this.props.players[0].name } é o Mestre do Jogo.
                        </Text>
                        <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                            Todos os jogadores sentam formando um círculo. O primeiro jogador é o mestre. Ele vai receber o aparelho no início
                            de cada noite e dia e vai ler as instruções.
                        </Text>
                        <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                            Entregue o aparelho ao mestre do jogo.
                        </Text>
                    </View>

                    <Button style={[{alignSelf: 'center'}, styles.margin_paragraph]}>
                        <Text>PRONTO</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayers })(StartGameScreen)