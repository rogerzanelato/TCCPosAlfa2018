import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setGameStatus } from '@services/redux/actions/GameplayActions';
import BackHandlerIntercept from '@components/BackHandlerIntercept';
import LinearGradient from 'react-native-linear-gradient';
import { StackActions, NavigationActions } from 'react-navigation';
import * as GameStatus from '@models/game/GameStatusType';
import * as RolesType from '@models/roles/RolesType';

/**
 * Esta tela só é chamada quando o calculo do jogadores é realizado e o jogo é o jogo é concluído
 */
class EndGameScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            // winners: [ props.players[0] ]
            winners: props.navigation.getParam('winners', null) // Null === Empate
        }
    }

    goNext() {
        this.props.setGameStatus({
            gameStatus: GameStatus.GAME_ENDED
        })

        const resetAction = StackActions.reset({
            index: 2,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'Game' }),
                NavigationActions.navigate({ routeName: 'Roles' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }

    createPlayerComponent(player: IPLayer) {
        return (
            <View key={player.idPlayer} style={styles.avatar_view}>
                <Image source={player.img} style={[styles.avatar_img, styles.avatar_border, styles.margin_paragraph]}/>
                <Text style={styles.paragraph_gamecycle}>
                    {player.name}
                </Text>
            </View>
        );
    }

    renderDraw() {
        return (
            <View>
                <Text style={[styles.big_title_gamecycle, styles.align_center]}>
                    EMPATE!
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    Os últimos jogadores morreram ao mesmo tempo. Vamos para uma próxima?
                </Text>
            </View>
        );
    }

    renderWinnersAndLosers() {
        const winnersComponents = this.state.winners.map( player => this.createPlayerComponent(player) )
        
        const losersComponents = this.props.players.reduce( (final, player) => {
            const isLoser = this.state.winners.findIndex( val => val.idPlayer === player.idPlayer ) === -1
            
            if ( isLoser ) {
                final.push( this.createPlayerComponent(player) )
            }

            return final
        }, [])

        const winner = this.state.winners.length > 0 ? 'Vencedores' : 'Vencedor';
        const type = this.state.winners[0].role.type;

        let title = ''
        let message = ''
        switch (type) {
            case RolesType.VILLAIN:
                title = 'A máfia venceu'
                message = 'Todos os cidadões comum foram assassinados!'
                break
            case RolesType.HERO:
                title = 'Os cidadões venceram!'
                message = 'Todos os assassinos foram eliminados, a cidade está em paz novamente!'
                break
            case RolesType.OTHER:
                title = this.state.winners[0].role.winnerTitle
                message = this.state.winners[0].role.winnerMessage
                break
        }

        return (
            <View>
                <Text style={[styles.big_title_gamecycle]}>
                    {title}
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    {message}
                </Text>

                <Text style={[styles.title_gamecycle, styles.margin_paragraph]}>
                    {winner}
                </Text>
                <View style={[{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}]}>
                    { winnersComponents }
                </View>

                <Text style={[styles.title_gamecycle, styles.margin_paragraph]}>
                    Perdedores
                </Text>
                <View style={[{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}]}>
                    { losersComponents }
                </View>
            </View>
        );
    }

    renderContent() {
        return this.state.winners !== null
                ? this.renderWinnersAndLosers()
                : this.renderDraw();
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

                <BackHandlerIntercept />

                <LinearGradient colors={['#212121', '#424242', '#616161']} style={{ flex: 1 }}>
                    <ScrollView>
                        <Content style={{ paddingBottom: 15 }}>
                            
                            <View style={styles.container}>
                                { this.renderContent() }
                            </View>

                            <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                                onPress={() => this.goNext()}>
                                <Text>PRÓXIMO</Text>
                            </Button>

                        </Content>
                    </ScrollView>
                </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setGameStatus })(EndGameScreen)