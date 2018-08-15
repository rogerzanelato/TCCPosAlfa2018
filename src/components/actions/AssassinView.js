import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { Button, Text, Badge, Icon } from 'native-base';
import styles from '../../css/Style';
import { connect } from 'react-redux';
import { setPlayers } from '@services/redux/actions/GameplayActions';

/**
 * Não precisamos utilizar o setAll pois como estamos lidando com um Array de objetos
 * os dados são atualizados por referência
*/
class AssassinView extends React.Component {
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

            // Se o jogador também for um assassino
            if ( item.role.name === this.props.player.role.name ) {
                avatarStyle.push(styles.border_diff)

                return (
                    <View key={index}>
                        <TouchableOpacity activeOpacity={1} style={styles.avatar_view}>
                            <Image source={item.img} style={avatarStyle} />
                            <Badge style={[styles.item_diff, styles.badge_top_avatar_view]}>
                                <Icon name='mask' type='Entypo' style={{color: '#FFF', fontSize: 14, position: 'relative', top: 6}} />
                            </Badge>
                            <Text style={styles.paragraph_gamecycle}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
            
            let numberOfVotes = 0;
            let badge;
            
            // Jogador selecionado
            if ( this.state.playerTargeted !== null && this.state.playerTargeted === index ) {
                numberOfVotes++;
            }

            // Se este jogador já foi selecionado por outro assassino, incrementa a quantidade de votos nele
            if ( item.votes > 0 ) {
                numberOfVotes += item.votes;
            }

            if ( numberOfVotes > 0 ) {
                avatarStyle.push(styles.border_color3)
                badge = <Badge style={[styles.bg_color3, styles.badge_bottom_avatar_view]}>
                            <Text style={{ color: 'white' }}>{numberOfVotes}</Text>
                        </Badge>;
            }

            return (
                <View key={index}>
                    <TouchableOpacity activeOpacity={1} style={styles.avatar_view} onPress={() => this.selectTarget(index)} >
                        <Image source={item.img} style={avatarStyle} />
                        {badge}
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

            const params = {
                target: this.state.targets[ this.state.playerTargeted ],
                callback: this.props.callback
            };

            return (
                <Button key={key} style={btnStyles} 
                        onPress={() => item.action(params)}>
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
export default connect(mapStateToProps, { setPlayers })(AssassinView)