import React from 'react';
import { Image, Alert, View } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content, Form, Item, Label, Input  } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setAll } from '@services/redux/actions/GameplayActions'
import Player from '@models/player/Player';
import Util from '@utils/Util';
import BackHandlerIntercept from '@components/BackHandlerIntercept';


class StartGameScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: ''
        }
    }

    goNext() {
        this.props.setAll({
            gameStatus: 1,
            playerTurn: 0,
            dayNumber: 0,
            players: this.props.players
        })
    }

    onBackPress() {
        Alert.alert(
            '',
            'Deseja mesmo sair deste jogo?',
            [
                {text: 'CANCELAR'},
                {text: 'SAIR', onPress: () => this.props.navigation.navigate('Roles') },
            ]
        )
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

                <BackHandlerIntercept handleEvent={() => this.onBackPress()} />

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

                    <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                            onPress={() => this.goNext()}>
                        <Text>PRONTO</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setAll })(StartGameScreen)