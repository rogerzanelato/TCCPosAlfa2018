import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '@screens/HomeScreen';
import CadJogadorScreen from '@screens/CadJogadorScreen';
import JogadorManagerScreen from '@screens/JogadorManagerScreen';
import ConfigScreen from '@screens/ConfigScreen';
import GameScreen from '@screens/GameScreen';
import RolesScreen from '@screens/RolesScreen';
import StartGameScreen from '@screens/GameCycle/StartGameScreen';
import DayNightScreen from '@screens/GameCycle/DayNightScreen';
import PlayerConfirmScreen from '@screens/GameCycle/PlayerConfirmScreen';
import PlayerActionScreen from '@screens/GameCycle/PlayerActionScreen';
import ShowPlayerRoleScreen from '@screens/GameCycle/ShowPlayerRoleScreen';
import ResultScreen from '@screens/GameCycle/ResultScreen';
import DiscussionTimeScreen from '@screens/GameCycle/DiscussionTimeScreen';
import EndGameScreen from '@screens/GameCycle/EndGameScreen';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './services/redux/reducers';

const store = createStore(reducers)

const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Config: { screen: ConfigScreen },
    Game: { screen: GameScreen },
    CadJogador: { screen: CadJogadorScreen },
    JogadorManager: { screen: JogadorManagerScreen },
    Roles: { screen: RolesScreen },
    StartGame: { screen: StartGameScreen },
    DayNight: { screen: DayNightScreen },
    PlayerConfirm: { screen: PlayerConfirmScreen },
    PlayerAction: { screen: PlayerActionScreen },
    ShowPlayerRole: { screen: ShowPlayerRoleScreen },
    Result: { screen: ResultScreen },
    DiscussionTime: { screen: DiscussionTimeScreen },
    EndGame: { screen: EndGameScreen }
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
      <Provider store={store}>
        <SimpleApp />
      </Provider>
    );
  }
}