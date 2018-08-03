import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content, Footer, FooterTab } from 'native-base';
import styles from '../css/Style';
import { connect } from 'react-redux';
import { setPlayers } from '@services/redux/actions/GameplayActions'
import Player from '@models/player/Player';

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
                    new Player('Jogador 1', require('@imgs/avatares/av1.png')),
                    new Player('Jogador 2', require('@imgs/avatares/av2.png')),
                    new Player('Jogador 3', require('@imgs/avatares/av3.png')),
                    new Player('Jogador 4', require('@imgs/avatares/av4.png')),
                    new Player('Jogador 5', require('@imgs/avatares/av5.png')),
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
                <Button full 
                    onPress={() => this.props.navigation.push('Roles')} 
                    style={[styles.button_on_footer, styles.item_diff]}>
                    <Text style={styles.text_inside_button_on_footer}> PRÓXIMO </Text>
                </Button>
            );
        } else {
            const qtde = 3 - this.props.players.length;
            const strJogador = qtde > 1 ? 'JOGADORES' : 'JOGADOR';
            return (
                <Button full style={[{backgroundColor: "#757575"}, styles.button_on_footer]}>
                    <Text style={styles.text_inside_button_on_footer}> ADICIONE MAIS {`${qtde} ${strJogador}`}</Text>
                </Button>
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
                </Content>

                <Footer style={styles.footer}>
                    <FooterTab style={styles.tab_footer}>
                        {this.renderButton()}
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayers })(GameScreen)