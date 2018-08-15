import React from 'react';
import { Image, View, Dimensions} from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content, Icon } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setGameStatus } from '@services/redux/actions/GameplayActions'
import ExitGameIntercept from '@components/ExitGameIntercept';
import * as GameStatus from '@models/game/GameStatusType';
import LinearGradient from 'react-native-linear-gradient';
import Util from '@utils/Util';

class DiscussionTimeScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            started: false,
            count: 120
        }
    }

    goNext() {
        clearInterval(this._interval);

        this.props.setGameStatus({
            gameStatus: GameStatus.POLL_TIME
        })
        this.props.navigation.replace('PlayerAction')
    }

    incrementCount() {
        this.setState({
            count: this.state.count + 60
        })
    }

    startCount() {
        this._interval = setInterval(() => {
            if ( this.state.count <= 0 ) {
                this.goNext();
            } else {
                this.setState({
                    started: true,
                    count: this.state.count - 1
                })
            }
        }, 1000);
    }

    getTime() {
        const min = Util.pad(Math.floor( this.state.count / 60 ), 2);
        const sec = Util.pad(this.state.count % 60, 2);

        return `${min}:${sec}`;
    }

    renderTimer() {
        return (
            <View>
                <View style={styles.container}>
                    <Icon name='ios-clock' type='Ionicons' style={[{fontSize: 128, color: '#f1f1f1'}, styles.align_center]}/>

                    <Text style={[styles.big_title_gamecycle, styles.margin_paragraph, styles.align_center, {fontSize: 64, fontWeight: 'bold'}]}>
                        {this.getTime()}
                    </Text>

                    <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph, styles.align_center, {fontSize: 16, fontWeight: 'bold'}]}
                          onPress={() => this.incrementCount()}>
                        + 1:00
                    </Text>
                </View>
                
                <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                        onPress={() => this.goNext()}>
                    <Icon name='pistol' type='MaterialCommunityIcons'/>
                    <Text>FINALIZAR A DISCUSSÂO</Text>
                </Button>
            </View>
        );
    }

    renderTutorial() {
        return (
            <View>
                <View style={styles.container}>
                    <Icon name='bell' type='Entypo' style={[{fontSize: 128, color: '#f1f1f1'}, styles.align_center]}/>

                    <Text style={[styles.big_title_gamecycle, styles.margin_paragraph]}>
                        Discussão
                    </Text>
                    <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                        Todos os jogadores agora discutem os eventos da noite passada e quem deve ser o assassino. Todos devem dizer as suas opiniões.
                    </Text>
                    <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                        Depois da discussão, cada jogador deverá votar em quem ele suspeita que seja o assassino. A pessoa com mais votos será morta pela cidade.
                    </Text>
                </View>
                
                <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                        onPress={() => this.startCount()}>
                    <Text>COMEÇAR A DISCUSSÂO</Text>
                </Button>
            </View>
        );
    }

    renderContent() {
        return !this.state.started ? this.renderTutorial() : this.renderTimer();
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
                    <Content contentContainerStyle={[styles.container_init, { justifyContent: 'flex-start', marginTop: 15}]} padder>
                
                        { this.renderContent() }
                    </Content>
                </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setGameStatus })(DiscussionTimeScreen)