import React from 'react';
import { Image, View, Dimensions} from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setAll } from '@services/redux/actions/GameplayActions'
import ExitGameIntercept from '@components/ExitGameIntercept';
import * as GameStatus from '@models/game/GameStatusType';
import LinearGradient from 'react-native-linear-gradient';

class StartGameScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: ''
        }
    }

    goNext() {
        this.props.setAll({
            gameStatus: GameStatus.NIGHTFALL,
            playerTurn: 0,
            dayNumber: 1,
            players: this.props.players
        })

        this.props.navigation.replace('DayNight');
    }

    render(){
        return (
            <Container>
                <Header noLeft androidStatusBarColor="#212121" style={styles.header_main}>
                    <Body>
                        <Title>Máfia</Title>
                    </Body>
                    <Right />
                </Header>

                <ExitGameIntercept screen={this}/>

                <LinearGradient colors={['#212121', '#424242', '#616161']} style={{ flex: 1 }}>
                    <Content contentContainerStyle={[styles.container_init]} padder>
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
                </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setAll })(StartGameScreen)