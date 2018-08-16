import React from 'react';
import { Image, View } from 'react-native';
import { Container, Header, Body, Right, Button, Title, Text, Content } from 'native-base';
import styles from '../../css/Style';
import ExitGameIntercept from '@components/ExitGameIntercept';
import LinearGradient from 'react-native-linear-gradient';

export default class ShowPlayerRoleScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            error: '',
            player: props.navigation.getParam('player', null),
            callback: props.navigation.getParam('callback', null)
        }
    }

    goNext() {
        this.props.navigation.goBack();
        this.state.callback();
    }

    renderContent() {
        if ( this.state.player ) {
            return (
                <View>
                    <Image source={this.state.player.img} style={[styles.avatar_img_medium, styles.avatar_border, styles.align_center]}/>

                    <Text style={[styles.paragraph_gamecycle, styles.align_center, styles.margin_paragraph]}>
                        {this.state.player.name} é um(a)
                    </Text>
                    <Text style={[styles.big_title_gamecycle, styles.align_center, styles.margin_paragraph]}>
                        {this.state.player.role.name}!
                    </Text>
                </View>
            )
        }

        return (
            <View>
                <Text style={[styles.big_title_gamecycle, styles.align_center, styles.margin_paragraph]}>
                    Nada encontrado
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.align_center, styles.margin_paragraph]}>
                    Não foi possível descobrir o papel deste jogador(a).
                </Text>
            </View>
        );
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

                <LinearGradient colors={['#151515', '#212121', '#424242', '#616161']} style={{ flex: 1 }}>
                    <Content contentContainerStyle={[styles.container_init, { justifyContent: 'flex-start', marginTop: 30}]} padder>

                       { this.renderContent() }

                        <Button style={[styles.align_center, styles.margin_paragraph, styles.item_diff, styles.button_gamecycle]} 
                                onPress={() => this.goNext()}>
                            <Text>FEITO</Text>
                        </Button>
                    </Content>
                </LinearGradient>
            </Container>
        );
    }
}