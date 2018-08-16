import React from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setAll, setGameStatus } from '@services/redux/actions/GameplayActions';
import ExitGameIntercept from '@components/ExitGameIntercept';
import LinearGradient from 'react-native-linear-gradient';
import * as GameStatus from '@models/game/GameStatusType';
import * as PlayerStatus from '@models/player/PlayerStatusType';

class ResultScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            playersKilled: []
        }
    }

    componentDidMount() {
        // Array pois no futuro será possível mais de um jogador ser morto por rodada
        const tmpPlayersKilled = [];

        // Player com mais votos para ser morto pelos assassinos
        const playerToBeKilled = this.props.players.reduce((prev, current) => {
            return prev.votes > current.votes ? prev : current;	
        })

        const playerIsBeingDefensed = playerToBeKilled.status.indexOf( PlayerStatus.BEING_DEFENSED ) !== -1;
        const votationIsTied = this.votationIsTied(playerToBeKilled)

        if ( !playerIsBeingDefensed && !votationIsTied && playerToBeKilled.votes > 0 ) {
            
            playerToBeKilled.isAlive = false;
            // Se foi morto ao amanhecer, quer dizer que foi morto durante à noite. Do contrário, foi na votação
            playerToBeKilled.wasKilledByPlayer = this.props.gameStatus === GameStatus.DAWN ? true : false;
            tmpPlayersKilled.push(playerToBeKilled);

            this.setState({
                playersKilled: tmpPlayersKilled
            })
        }
    }

    votationIsTied(playerToBeKilled) {
        // Se o status do jogo for diferente de amanhecer, significa que é o fim da votação
        if ( this.props.gameStatus === GameStatus.POLL_FINISHED ) {
            
            const tmpPlayersWithoutSelected = this.props.players.slice().filter( it => it.idPlayer !== playerToBeKilled.idPlayer );

            // Valida se não há outro jogador com a mesma quantidade de votos
            const playerToBeKilledValidate = tmpPlayersWithoutSelected.reduce((prev, current) => {
                return prev.votes > current.votes ? prev : current;
            })

            if ( playerToBeKilledValidate.votes === playerToBeKilled.votes )  {
                return true;
            }
        }

        return false;
    }

    goNext() {
        this.checkEndGame();

        this.props.players.forEach(player => {
            player.votes = 0;
            player.status.length = 0;
        });

        const idxNewPlayerTurn = this.props.players.findIndex( player => player.isAlive );

        const params = {
            playerTurn: idxNewPlayerTurn,
            players: this.props.players
        }

        let newScreen;

        if ( this.props.gameStatus === GameStatus.DAWN ) {
            params.dayNumber  = this.props.dayNumber + 1
            params.gameStatus = GameStatus.DISCUSSION_TIME
            newScreen = 'DiscussionTime'
        } else {
            params.dayNumber  = this.props.dayNumber
            params.gameStatus = GameStatus.NIGHTFALL
            newScreen = 'DayNight'
        }

        this.props.setAll(params)
        this.props.navigation.replace(newScreen)
    }

    checkEndGame() {
        const playersAlive = this.props.players.filter( player => player.isAlive );
        const params = { 
            players: this.props.players
         };

         if ( playersAlive.length > 0 ) {
            const winners = [];

            this.props.players.forEach( player => {
                params.self = player;
                if ( player.role.isConditionToWinDone(params) ) {
                    winners.push(player);
                }
            })

            if ( winners.length > 0 ) {
                this.props.setGameStatus({ gameStatus: GameStatus.GAME_ENDED })
                this.props.navigation.replace('EndGame', { winners: winners })
                return true
            }
            
            // Se há apenas um jogador sobrando e sua condição de vitória não foi alcançada. É considerado empate
            if ( playersAlive.length === 0 ) {
                this.props.setGameStatus({ gameStatus: GameStatus.GAME_ENDED })
                this.props.navigation.replace('EndGame') // Draw
                return true
            }

        } else {
            this.props.setGameStatus({ gameStatus: GameStatus.GAME_ENDED })
            this.props.navigation.replace('EndGame') // Draw
            return true
        }
        
        return false
    }

    renderDrawOcurred() {
        return (
            <View>
                <Text style={[styles.big_title_gamecycle, styles.align_center]}>
                    Votação empatada!
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    Ninguém será morto pela cidade hoje.
                </Text>
            </View>
        );
    }

    renderMiracleOcurred() {
        return (
            <View>
                <Text style={[styles.big_title_gamecycle, styles.align_center]}>
                    É um milagre!
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    Os assassinos não foram capazes de matar ninguém nesta noite.
                </Text>
            </View>
        );
    }

    renderPlayersKilled() {

        const players = this.state.playersKilled.map( (player, key) => {
            return (
                <View key={key}>
                    <Image source={player.img} style={[styles.avatar_img_medium, styles.avatar_border, styles.margin_paragraph, styles.align_center]}/>
                    <Text style={[styles.big_title_gamecycle, styles.align_center, styles.margin_paragraph]}>
                        {player.name}
                    </Text>
                </View>
            )
        })

        const titulo = this.props.gameStatus === GameStatus.DAWN
                            ? 'Vítimas nessa noite:'
                            : 'A cidade matou:' ;

        return (
            <View>
                <Text style={[styles.big_title_gamecycle]}>
                    {titulo}
                </Text>

                { players }

                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    A vítima não tem permissão para falar até o fim do jogo!
                </Text>
            </View>
        );
    }

    renderContent() {
        // Votação empatada
        if ( this.props.gameStatus === GameStatus.POLL_FINISHED && this.state.playersKilled.length === 0) {
            return this.renderDrawOcurred()
        }

        return this.state.playersKilled.length > 0
                ? this.renderPlayersKilled()
                : this.renderMiracleOcurred();
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
                    <Content contentContainerStyle={[styles.container_init, { justifyContent: 'flex-start' }]} padder>
                        
                        <View style={styles.container}>
                            { this.renderContent() }
                        </View>

                        <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                                onPress={() => this.goNext()}>
                            <Text>PRÓXIMO</Text>
                        </Button>
                    </Content>
                </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setAll, setGameStatus })(ResultScreen)