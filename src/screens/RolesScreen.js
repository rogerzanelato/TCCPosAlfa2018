import React from 'react';
import { View, Alert } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, List, ListItem, 
        Title, Text, Content, Switch, Footer, FooterTab } from 'native-base';
import styles from '../css/Style';
import * as Roles from '@models/WrappedRoles';
import * as RolesType from '@models/roles/RolesType';
import SwitchWrapper from '@components/SwitchWrapper';
import Util from '@utils/Util';
import { connect } from 'react-redux';
import { setPlayers } from '@services/redux/actions/GameplayActions';

class RolesScreen extends React.Component {
    constructor(props){
        super(props);
        
        this.selectedRoles = [];
        
        this.state = {
            error: '',
            allRoles: []
        }
    }

    componentDidMount() {
        const keys = Object.keys(Roles)
        const allRoles = [];
        const selected = [];

        // Percorre todas as classes exportadas na variável Roles
        keys.forEach( (val) => {
            const role = new Roles[val]();
            // Todo: Verificar se o papel está habilitado para conta do usuário
            role.selected = true;

            selected.push(role);
            allRoles.push(role);
        })

        this.setState({ allRoles: allRoles }, () => {
            this.selectedRoles = selected; // No momento permitiremos que todos comecem selecionados
        })
    }

    listRolesAvailable() {
        const heroes = [];
        const villains = [];
        const others = [];

        this.state.allRoles.forEach((val, idx) => {
            const component = this.createListItem(val, idx);

            switch (val.type) {
                case RolesType.VILLAIN:
                    villains.push(component);
                    break;
                case RolesType.HERO:
                    heroes.push(component);
                    break;
                case RolesType.OTHER:
                    others.push(component);
                    break;
            }
        })

        return (
            <List>
                <ListItem itemDivider>
                    <Text>Cívis</Text>
                </ListItem>
            
                { heroes }

                <ListItem itemDivider>
                    <Text>Vilões</Text>
                </ListItem>
            
                { villains }

                <ListItem itemDivider>
                    <Text>Especiais</Text>
                </ListItem>
            
                { others }
            </List>
        );
    }

    createListItem(Role: IRole, idx: number) {
        const disabled = Role.idRole === 2; // É obrigatório que haja pelo menos um assassino no jogo
        

        return (
            <ListItem key={idx}>
                {/* <Left/> */}
                <Body>
                    <Text style={styles.list_item_title}>{Role.name}</Text>
                    <Text style={styles.list_item_description}>{Role.description}</Text>
                </Body>
                <Right>
                    <SwitchWrapper
                        disabled={disabled}
                        switched={Role.selected}
                        ref={component => Role.ref = component} // Adicionamos ao objeto uma referência do componente
                        onValueChange={(value) => { this.switchItemOnSelectedList(idx, value) }}
                    />
                </Right>
            </ListItem>
        );
    }

    switchItemOnSelectedList(idx: number, value: boolean) {
        const Role = this.state.allRoles[idx];

        const idxSelected = this.selectedRoles.findIndex((val) => {
            return val.type === Role.type && val.name === Role.name;
        })

        if ( idxSelected !== -1 && value === false ) {
            this.selectedRoles.splice(idxSelected, 1);
        }  else if ( idxSelected === -1 && value === true ){
            this.selectedRoles.push(Role);
        }
        
        Role.ref.setState({
            selected: value
        })
    }
    
    validateSelectedItems() {
        const heroes = this.selectedRoles.filter((val) => { return val.type === RolesType.HERO });
        const villains = this.selectedRoles.filter((val) => { return val.type === RolesType.VILLAIN });

        let error = '';
        let title = '';

        if ( heroes.length === 0 ) { 
            title = 'Precisamos de vítimas!';
            error += 'Adicione pelo menos um papel de cidadão ao jogo!\n\n';
        }
        if ( villains.length === 0 ) {
            title = 'Fácil demais, não acha?'
            error += 'Adicione pelo menos um papel de vilão ao jogo!';
        }

        if ( villains.length === 0 && heroes.length === 0 ) {
            title = 'Assim não vai ter graça!';
        }

        if (error === '') {
            this.startGame();
        } else {
            Alert.alert(title, error);
        }
    }

    startGame() {
        const tmpSelectedRoles = this.selectedRoles.slice();

        const players = this.props.players.reduce((final, player, idx, arr) => {
            
            const role = this.getRandomRole(arr.length, final, tmpSelectedRoles);
            player.role = role;
            final.push(player);

            return final;

        }, []);

        // Se nenhum papel de assassino foi distribuído pelo método aleatorio, atribuímos-o aqui
        const idxAssassin = players.findIndex( (val) => val.role.idRole === 2 );
        if ( idxAssassin === -1 ) {
            const idxRandomPlayer = Util.randomIntFromInterval(0, players.length - 1)
            players[idxRandomPlayer].role = new Roles.Assassin();
        }

        this.props.setPlayers({ players: players });
        this.props.navigation.navigate('StartGame');
    }

    getRandomRole(qtdePlayers: number, playersAlreadyDone: Array<Player>, tmpSelectedRoles: Array<IRole>): IRole {
        
        let Role: IRole;

        if ( this.selectedRoles.length > 0 ) {
            const idxRandomRole = Util.randomIntFromInterval(0, this.selectedRoles.length - 1)
            Role = this.selectedRoles[idxRandomRole]
        
            const qtdePlayersWithThisRole = playersAlreadyDone.filter( (val) => val.role.idRole === Role.idRole ).length + 1 // +1 porque estamos contato com o papel atual
            const qtdePlayersMax = Math.round( (Role.weight / Role.weightIdxDivisor) * qtdePlayers )
    
            // Se a distribuição do papel atual já ultrapassar o permitido, removemos-o das opções
            if ( qtdePlayersWithThisRole >= qtdePlayersMax ) {
                this.selectedRoles.splice(idxRandomRole, 1);
            }
        } else {  // Cai aqui caso não seja mais possível obedecer à regra dos pesos, devido à não haver papéis o bastante selecionados
            
            // Todo: Verificar possibilidade de distribuir os papéis aqui de forma mais inteligente. Ex: De acordo com a quantidade de heróis e vilões, mas ainda mantendo o aspecto aleatório
            const idxRandomRole = Util.randomIntFromInterval(0, tmpSelectedRoles.length - 1)
            Role = tmpSelectedRoles[idxRandomRole]
        }

        return Role;
    }

    render(){
        return (
            <Container>
                <Header androidStatusBarColor="#212121" style={styles.header_main}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack() }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Papéis</Title>
                    </Body>
                    <Right />
                </Header>

                <Content>
                        <View style={[styles.bg_color3, {flex: 1} ]}>
                            <Text style={ styles.text_inside_box }>
                                Selecione os papéis que deseja que façam parte do jogo
                            </Text>
                        </View>
                        
                        { this.listRolesAvailable() }
                </Content>

                <Footer style={styles.footer}>
                    <FooterTab style={styles.tab_footer}>
                        <Button full style={[styles.item_diff, styles.button_on_footer]}
                            onPress={() => this.validateSelectedItems()}>
                            <Text style={styles.text_inside_button_on_footer}> INICIAR JOGO </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

}

const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setPlayers })(RolesScreen)