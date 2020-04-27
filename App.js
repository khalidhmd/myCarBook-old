import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTab from './Components/HomeTab';
import AddCard from './Components/AddCard';
import Deck from './Components/Deck';
import Quiz from './Components/Quiz';
import {
  setLocalNotification,
  // listenForNotifications,
  saveDeckToStorage,
} from './api/helpers';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';

const Stack = createStackNavigator();
const store = createStore(reducer);
store.subscribe(() => {
  saveDeckToStorage(store.getState());
});
export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
      .then(() => console.log('Set Notification success'))
      .catch(e => console.log(e));
    // listenForNotifications();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Decks" component={HomeTab} />
            <Stack.Screen name="NewCard" component={AddCard} />
            <Stack.Screen name="Deck" component={Deck} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
