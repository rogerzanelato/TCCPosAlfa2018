import React from 'react';
import { Image, View, TouchableOpacity} from 'react-native';
import { Button, Text, Content } from 'native-base';
import styles from '../../css/Style';
import LinearGradient from 'react-native-linear-gradient';

export default class Default extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            error: '',
            countPress: 0
        }
    }

    renderButton() {
        const btnStyles =[{alignSelf: 'center'}, styles.button_gamecycle, styles.margin_paragraph, styles.bg_color3];

        if ( this.state.countPress > 0 ) {
            return (
                <Button style={btnStyles}
                        onPress={this.props.callback}>
                    <Text>OK</Text>
                </Button>
            )
        }
    }

    incrementCount() {
        this.setState({
            countPress: this.state.countPress + 1
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
                <TouchableOpacity onPress={ () => this.incrementCount() }>
                    <Text style={[styles.paragraph_gamecycle, styles.margin_paragraph]}>
                        Aperte aqui para prosseguir.
                    </Text>
                </TouchableOpacity>

                { this.renderButton() }
            </View>
        );
    }
}