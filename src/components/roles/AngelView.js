import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setAll } from '@services/redux/actions/GameplayActions';

/**
 * Não precisamos utilizar o setAll pois como estamos lidando com um Array de objetos
 * os dados são atualizados por referência
*/
class AngelView extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            error: '',
            targets: [],
            playerTargeted: null
        }
    }

    componentDidMount() {
        const players = this.props.players.filter((it, index) => {
            return index !== this.props.playerTurn && it.isAlive
        })

        this.setState({ targets: players })
    }

    selectTarget(idx) {
        this.setState({ playerTargeted: idx })
    }

    renderTargets() {
        return this.state.targets.map( (item, index) => {
            let avatarStyle = [styles.avatar_img, styles.avatar_border];

            // Jogador selecionado
            if ( this.state.playerTargeted !== null && this.state.playerTargeted === index ) {
                avatarStyle.push(styles.border_color3)
            }

            return (
                <View key={index}>
                    <TouchableOpacity activeOpacity={1} style={styles.avatar_view} onPress={() => this.selectTarget(index)} >
                        <Image source={item.img} style={avatarStyle} />
                        <Text style={styles.paragraph_gamecycle}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            );


        });
    }

    renderButtons() {
        const actions = this.props.player.role.actions;
        
        return actions.map( (item, idx) => {
            const btnStyles =[{alignSelf: 'center'}, styles.button_gamecycle, styles.margin_paragraph, styles.bg_color3];
            const key = 'btnAction' + idx;
            
            if ( this.state.playerTargeted === null && item.needTarget ) {
                btnStyles.push(styles.item_disabled)

                return (
                    <Button key={key} style={btnStyles}>
                        <Text>{item.name}</Text>
                    </Button>
                )                
            }

            const player = this.state.targets[ this.state.playerTargeted ];

            return (
                <Button key={key} style={btnStyles} 
                        onPress={() => { 
                            item.action(player);  
                            this.props.callback();
                        }}>
                    <Text>{item.name}</Text>
                </Button>
            )
        }) 
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.player.img} style={[styles.avatar_img_medium, styles.avatar_border, styles.align_center]}/>

                <Text style={[styles.big_title_gamecycle, styles.align_center, {marginTop: 25}]}>
                    {this.props.player.role.name}
                </Text>
                <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                    {this.props.player.role.descriptionActions || this.props.player.role.description}
                </Text>

                <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', flexWrap: 'wrap'}, styles.margin_paragraph]}>
                    { this.renderTargets() }
                </View>

                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    { this.renderButtons() }
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => ({ ...state.GameplayReducer })
export default connect(mapStateToProps, { setAll })(AngelView)