import React from 'react';
import { Image, View, TouchableWithoutFeedback} from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setAll } from '@services/redux/actions/GameplayActions';
import ExitGameIntercept from '@components/ExitGameIntercept';
import LinearGradient from 'react-native-linear-gradient';
import * as GameStatus from '@models/game/GameStatusType';

class PlayerConfirmScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            player: '',
            confirmed: false
        }
    }

    componentDidMount() {
        const idxPlayerTurn = this.props.playerTurn;
        const player = this.props.players[idxPlayerTurn];

        this.setState({
            player: player
        })
    }

    goNext() {
        this.props.navigation.replace('PlayerAction')
    }

    confirmPlayer() {
        this.setState({ confirmed: true })
    }

    renderImage() {
        const imageStyles = [styles.avatar_img_medium, styles.avatar_border];

        if ( this.state.confirmed ) {
            imageStyles.push( styles.border_diff )
        }

        return (
            <Image source={this.state.player.img} style={imageStyles}/>
        )
    }

    renderButton() {
        if ( this.state.confirmed ) {
            return (
                <Button style={[{alignSelf: 'center'}, styles.margin_paragraph, styles.item_diff]} 
                        onPress={() => this.goNext()}>
                    <Text>MOSTRAR O PAPEL</Text>
                </Button>
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
                    <Content contentContainerStyle={[styles.container_init, { justifyContent: 'flex-start', marginTop: 30}]} padder>
                        
                        <TouchableWithoutFeedback onPress={() => this.confirmPlayer()}>
                            { this.renderImage() }
                        </TouchableWithoutFeedback>

                        <View style={styles.container}>
                            <Text style={[styles.big_title_gamecycle, styles.align_center]}>
                                {this.state.player.name}
                            </Text>
                            <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                                Entregue o dispositivo para este jogador.
                                Aperte na foto quando estiver pronto!
                            </Text>
                        </View>

                        { this.renderButton() }
                    </Content>
                </LinearGradient>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setAll })(PlayerConfirmScreen)