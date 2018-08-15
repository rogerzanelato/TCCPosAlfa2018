import React from 'react';
import { Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setPlayerTurn, setGameStatus } from '@services/redux/actions/GameplayActions'
import ExitGameIntercept from '@components/ExitGameIntercept';
import LinearGradient from 'react-native-linear-gradient';
import * as GameStatus from '@models/game/GameStatusType';

class PlayerActionScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    goNext() {
        const oldIdxPlayerTurn = this.props.playerTurn;
        
        const idxNewPlayerTurn = this.props.players.findIndex( (player, idx) => {
            return player.isAlive && idx > oldIdxPlayerTurn
        });

        // Se não houver um index menor que o antigo, indica que o Loop recomeçou
        if ( idxNewPlayerTurn === -1 ) {
            // Mestre do jogo
            this.props.setGameStatus({
                gameStatus: GameStatus.FINISHED_ACTIONS
            })
            this.props.navigation.replace('DayNight')
        } else {
            this.props.setPlayerTurn( {
                playerTurn: idxNewPlayerTurn
            })
            this.props.navigation.replace('PlayerConfirm')
        }
    }

    renderVoteComponent(player) {

    }

    renderRoleComponent(player: IPlayer) {
        const Component = player.role.component;

        return (
            <Component player={player} screenRef={this} callback={() => { this.goNext() }}/>
        )
    }

    renderContent() {
        const idxPlayerTurn = this.props.playerTurn;
        const player = this.props.players[idxPlayerTurn];

        if ( player ) {
            return this.renderRoleComponent(player);
        }
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
                        <ScrollView>
                            <Content contentContainerStyle={[styles.container_init, { justifyContent: 'flex-start', marginTop: 30}]} padder>
                                
                                {this.renderContent()}
                        
                            </Content>
                        </ScrollView>
                    </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayerTurn, setGameStatus })(PlayerActionScreen)