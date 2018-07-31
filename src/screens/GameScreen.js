import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content, Footer, FooterTab } from 'native-base';
import styles from '../css/Style';
import { connect } from 'react-redux';
import { setPlayers } from '@services/redux/actions/GameplayActions'
import Jogador from '@models/Jogador';

class GameScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: ''
        }
    }

    componentDidMount() {
        if ( this.props.players.length === 0 ) {
            this.props.setPlayers({
                players: [
                    new Jogador('Jogador 1', require('@imgs/avatares/av1.png')),
                    new Jogador('Jogador 2', require('@imgs/avatares/av2.png')),
                    new Jogador('Jogador 3', require('@imgs/avatares/av3.png'))
                ]
            });
        }
    }

    renderJogadores() {
        return this.props.players.map( (item, index) => {
            return (
                <View key={index}>
                    <TouchableOpacity 
                        style={styles.avatar_view}
                        onPress={() => this.openPlayerManager(index)} >
                        <Image
                            source={item.img}
                            style={styles.avatar_img} />
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    openPlayerManager = (index) => {
        this.props.navigation.push('JogadorManager', {
            idxPlayerToUpdate: index,
            onNavigateBack: this.handleOnNavigateBack
        })
    }

    renderButton() {
        if(this.props.players.length >= 3){
            return (
                <Text 
                    onPress={() => this.props.navigation.push('Roles')}
                    style={[styles.item_diff, styles.text_default, { height: '100%', textAlign: 'center', textAlignVertical: 'center', borderRadius: 5}]} >
                    PRÓXIMO 
                </Text>
            );
        } else {
            const qtde = 3 - this.props.players.length;
            const strJogador = qtde > 1 ? 'JOGADORES' : 'JOGADOR';
            return (
                <Text style={[styles.text_default, { backgroundColor: '#757575', height: '100%', textAlign: 'center', textAlignVertical: 'center', borderRadius: 5}]}>
                    ADICIONE MAIS {`${qtde} ${strJogador}`}
                </Text>
            );
        }
    }

    // Workaround para forçar um re-render ao usar o goBack na tela JogadorManagerScreen
    handleOnNavigateBack = (foo) => {
        this.setState({
          foo
        })
      }
    
    render() {
        return (
            <Container>
                <Header androidStatusBarColor="#000" style={styles.header_main}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack() }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Jogadores</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.openPlayerManager(false) }>
                            <Icon name='add' />
                        </Button>
                    </Right>
                </Header>

                <Content contentContainerStyle={{flex: 1, flexDirection: 'column'}}>
                    <View style={[styles.bg_color3, {flex: 1} ]}>
                        <Text style={ styles.text_inside_box }>
                            Adicione os jogadores abaixo. Os papéis serão atribuídos automaticamente no início da rodada.
                        </Text>
                    </View>

                    <View style={{flex: 5}}>
                        <ScrollView>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly',  flexWrap: 'wrap', margin: 10}}>
                                {this.renderJogadores()}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={{flex: 0.5, borderTopColor: '#cccccc', borderTopWidth: 1, padding: 10}}>
                        {this.renderButton()}
                    </View>
                </Content>
                {/* <Footer style={{height: 60}}>
                    <FooterTab style={{backgroundColor: '#FFF', padding: 15}}>
                        <Button full style={{alignSelf: 'center', backgroundColor: "#F00", height: 45}}>
                            <Text style={{color: '#FFF', fontSize: 14}}>RECUPERAR</Text>
                        </Button>
                    </FooterTab>
                </Footer> */}
            </Container>
        );
    }

}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayers })(GameScreen)