import React from 'react';
import { Image, View, Dimensions} from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content, Icon } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setGameStatus } from '@services/redux/actions/GameplayActions'
import ExitGameIntercept from '@components/ExitGameIntercept';
import LinearGradient from 'react-native-linear-gradient';
import * as GameStatus from '@models/game/GameStatusType';

/**
 * Backgrounds Possíveis:
 * https://www.freepik.com/free-vector/city-at-night_1250624.htm
 * https://www.freepik.com/free-vector/starry-night-background_1368060.htm
 * https://www.freepik.com/free-vector/city-at-night_794406.htm
 */

class DayNightScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            dayNumber: 0,
            gameStatus: GameStatus.AWAITING_TO_START
        }
    }

    componentDidMount() {
        this.setState({
            dayNumber: this.props.dayNumber,
            gameStatus: this.props.gameStatus
        })
    }

    goNext() {
        if ( this.state.gameStatus === GameStatus.NIGHTFALL ) {
            this.props.setGameStatus({
                gameStatus: GameStatus.PLAYERS_ACTION
            })
            this.props.navigation.replace('PlayerConfirm')
        } else {
            // Calculate End
        }
    }

    renderDay() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title_gamecycle, styles.margin_paragraph]}>
                    {this.state.dayNumber}º Dia
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    Amanheceu, a cidade acorda. Entregue o aparelho ao mestre do jogo.
                </Text>
            </View>
        );
    }
    
    renderNight() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title_gamecycle, styles.margin_paragraph]}>
                    {this.state.dayNumber}ª Noite
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    A cidade dorme, todos os jogadores fecham os olhos e vão dormir.
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    O mestre recebe o aparelho, visualiza sua função e entrega para o próximo jogador ao terminar.
                </Text>
            </View>
        );
    }

    renderContent() {
        return this.state.gameStatus === GameStatus.NIGHTFALL 
                ? this.renderNight()
                : this.renderDay();
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
                        {/* <Image source={this.props.players[0].img} style={[styles.avatar_img_medium, styles.avatar_border]}/> */}

                        { this.renderContent() }

                        <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                                onPress={() => this.goNext()}>
                            <Icon name='pistol' type='MaterialCommunityIcons'/>
                            <Text>PRONTO</Text>
                        </Button>
                    </Content>
                </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setGameStatus })(DayNightScreen)