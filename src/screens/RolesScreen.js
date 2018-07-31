import React from 'react';
import { View } from 'react-native';
import { Container, Header, Left, Body, Icon, Right, Button, List, ListItem, Title, Text, Content, Switch } from 'native-base';
import styles from '../css/Style';
import * as roles from '@models/WrappedRoles';
import * as rolesTypes from '@models/roles/RoleTypes';
import IRole from '@models/roles/IRole';
import SwitchWrapper from '@components/SwitchWrapper';

export default class RolesScreen extends React.Component {
    constructor(props){
        super(props);
        
        this.selected = [];
        
        this.state = {
            error: '',
            allRoles: []
        }
    }

    componentDidMount() {
        const keys = Object.keys(roles)
        const allRoles = [];
        const selected = [];

        keys.forEach( (val) => {
            const role = new roles[val];
            // Todo: Verificar se o papel está habilitado para conta do usuário
            role.selected = true;

            selected.push(role);
            allRoles.push(role);
        })

        this.setState({ allRoles: allRoles}, () => {
            this.selected = selected; // No momento permitiremos que todos comecem selecionados
        })
    }

    listRolesAvailable() {
        const heroes = [];
        const villains = [];
        const others = [];

        this.state.allRoles.forEach((val, idx) => {
            const component = this.createListItem(val, idx);

            switch (val.type) {
                case rolesTypes.VILLAIN:
                    villains.push(component);
                    break;
                case rolesTypes.HERO:
                    heroes.push(component);
                    break;
                case rolesTypes.OTHER:
                    others.push(component);
                    break;
            }
        })

        return (
            <List>
                <ListItem itemDivider>
                    <Text>Cidadões</Text>
                </ListItem>
            
                { heroes }

                <ListItem itemDivider>
                    <Text>Vilões</Text>
                </ListItem>
            
                { villains }

                <ListItem itemDivider>
                    <Text>Outros</Text>
                </ListItem>
            
                { others }
            </List>
        );
    }

    createListItem(Role: IRole, idx: number) {
        return (
            <ListItem key={idx}>
                {/* <Left/> */}
                <Body>
                    <Text style={styles.list_item_title}>{Role.name}</Text>
                    <Text style={styles.list_item_description}>{Role.description}</Text>
                </Body>
                <Right>
                    <SwitchWrapper 
                        switched={Role.selected}
                        ref={component => Role.ref = component} // Adicionamos ao objeto uma referência ao componente
                        onValueChange={(value) => { this.switchItemOnSelectedList(idx, value) }}
                    />
                </Right>
            </ListItem>
        );
    }

    switchItemOnSelectedList(idx: number, value: boolean) {
        const Role = this.state.allRoles[idx];

        const idxSelected = this.selected.findIndex((val) => {
            return val.type === Role.type && val.name === Role.name;
        })

        if ( idxSelected !== -1 && value === false ) {
            this.selected.splice(idxSelected, 1);
        }  else if ( idxSelected === -1 && value === true ){
            this.selected.push(Role);
        }
        
        Role.ref.setState({
            selected: value
        })
    }
    
    render(){
        return (
            <Container>
                <Header androidStatusBarColor="#000" style={styles.header_main}>
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
            </Container>
        );
    }

}