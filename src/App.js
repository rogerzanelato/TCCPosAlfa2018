import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import CadJogadorScreen from './screens/CadJogadorScreen';
import JogadorManagerScreen from './screens/JogadorManagerScreen';
import ConfigScreen from './screens/ConfigScreen';
import GameScreen from './screens/GameScreen';

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Config: { screen: ConfigScreen },
    Game: { screen: GameScreen },
    CadJogador: { screen: CadJogadorScreen },
    JogadorManager: { screen: JogadorManagerScreen }
  },
  {
    initialRouteName: 'Home',
    headerMode: "none",
    navigationOptions: {
      // headerStyle: styles.header_main,
      // headerTitleStyle: styles.title_main_color, // 
      // headerTintColor: '#f5f5f5'  // Seta ( Voltar ),
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <SimpleApp />
    );
  }
}