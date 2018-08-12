import React from 'react';
import { Image, View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setPlayerTurn } from '@services/redux/actions/GameplayActions'
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
        const idxNewPlayerTurn = this.props.playerTurn + 1;

        // Se o novo idx for igual ao tamanho do array, significa que todos os jogadores efetuaram as ações
        if ( idxNewPlayerTurn  === this.props.players.length ) {
            // todo
            console.log(this)
            alert('All players already done')
        } else {
            this.props.setPlayerTurn( {
                playerTurn: idxNewPlayerTurn
            })
            this.props.navigation.replace('PlayerConfirm')
        }
    }

    renderRoleComponent() {
        const idxPlayerTurn = this.props.playerTurn;
        const player = this.props.players[idxPlayerTurn];

        if ( player ) {
            const Component = player.role.component;

            return (
                <Component player={player} callback={() => { this.goNext() }}/>
            )
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
                                
                                {this.renderRoleComponent()}
                        
                            </Content>
                        </ScrollView>
                    </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayerTurn })(PlayerActionScreen)