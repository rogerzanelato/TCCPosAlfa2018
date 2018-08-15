import React from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Body, Right, Button, Icon, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setAll } from '@services/redux/actions/GameplayActions';
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
        
        if ( !playerIsBeingDefensed && playerToBeKilled.votes > 0 ) {
            playerToBeKilled.isAlive = false;
            tmpPlayersKilled.push(playerToBeKilled);

            this.setState({
                playersKilled: tmpPlayersKilled
            })
        }
    }


    goNext() {
        this.props.players.forEach(player => {
            player.votes = 0;
            player.status.length = 0;
        });

        this.props.setAll({
            gameStatus: GameStatus.DISCUSSION_TIME,
            playerTurn: 0,
            dayNumber: this.props.dayNumber + 1,
            players: this.props.players
        })

        if ( this.props.gameStatus ===  GameStatus.DAWN ) {
            this.props.navigation.replace('DiscussionTime')
        }

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

        return (
            <View>
                <Text style={[styles.big_title_gamecycle]}>
                    Vítimas nessa noite:
                </Text>

                { players }

                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    A vítima não tem permissão de falar até o fim do jogo!
                </Text>
            </View>
        );
    }

    renderContent() {
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
export default connect(mapStateToProps, { setAll })(ResultScreen)