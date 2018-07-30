import React from 'react';
import { Image, Keyboard, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, Title, Text, Content, Form, Item, Label, Input  } from 'native-base';
import styles from '../css/Style';
import { connect } from 'react-redux';
import { setPlayers } from '@services/redux/actions/GameplayActions'
import Jogador from '@models/Jogador';
import Util from '@utils/Util';

const imgs = [
    require('@imgs/avatares/av1.png'),
    require('@imgs/avatares/av2.png'),
    require('@imgs/avatares/av3.png'),
    require('@imgs/avatares/av4.png'),
    require('@imgs/avatares/av5.png'),
    require('@imgs/avatares/av6.png'),
    require('@imgs/avatares/av7.png'),
    require('@imgs/avatares/av8.png'),
];

class JogadorManagerScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            name: '',
            img: imgs[Util.randomIntFromInterval(0, 7)]
        }
    }

    componentDidMount() {
        const idx = this.props.navigation.getParam('idxPlayerToUpdate', false);
        if ( idx !== false ) {
            const player = this.props.players[idx];
            this.setState({
                name: player.name,
                img: player.img
            })
        }
    }

    savePlayer() {
        const players = this.props.players;
        const player = new Jogador(this.state.name, this.state.img);
        
        const idx = this.props.navigation.getParam('idxPlayerToUpdate', false);
        if ( idx !== false ) {
            players[idx] = player;
        }  else {
            players.push(player);
        }

        Keyboard.dismiss();
        this.props.setPlayers({ players: players });
        this.goBack();
    }

    confirmRemovePlayer() {
        Alert.alert(
            '',
            `Deseja mesmo retirar ${this.state.name} do jogo?`,
            [
                {text: 'Não'},
                {text: 'Sim, remover', onPress: () => this.removePlayer()},
            ]
        )
    }

    removePlayer() {
        const players = this.props.players;
        const idx = this.props.navigation.getParam('idxPlayerToUpdate', false);
        players.splice(idx, 1);

        this.props.setPlayers({ players: players });
        this.goBack();
    }

    renderRemoveButton = () => {
        if ( this.props.navigation.getParam('idxPlayerToUpdate', false) !== false ) {
            return (
                <TouchableOpacity onPress={() => this.confirmRemovePlayer()}>
                    <Text style={{marginTop: 50, color: '#F00', alignSelf: 'center'}}>Remover Jogador</Text>
                </TouchableOpacity>
            );
        }
    }

    goBack() {
        Keyboard.dismiss();
        
        // Workaround para forçar o render ao voltar para screen
        const onNavigateBack = this.props.navigation.getParam('onNavigateBack', false);
        if ( onNavigateBack !== false ) {
            onNavigateBack(this.state.foo);
        }
        
        this.props.navigation.goBack();
    }

    render(){
        return (
            <Container>
                <Header androidStatusBarColor="#000" style={styles.header_main}>
                    <Left>
                        <Button transparent onPress={() => this.goBack()}>
                            <Icon name='close' style={styles.title_main_color} />
                        </Button>
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                    <Right>
                        <Text style={styles.title_main_color} onPress={() => this.savePlayer()}>Salvar</Text>
                    </Right>
                </Header>

                <Content contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', marginTop: 20, paddingRight: 25}} padder>
                    <Image source={this.state.img} style={{width: 210, height: 210, borderRadius: 105}}/>
                        <Form style={{width: '100%'}}>
                            <Item floatingLabel>
                                <Label>Nome do jogador</Label>
                                <Input
                                    value={this.state.name}
                                    onChangeText={name => {
                                        this.setState({ name: name })
                                    }}
                                />
                            </Item>

                            { this.renderRemoveButton() }
                        </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayers })(JogadorManagerScreen)