import AsyncStorage from '@react-native-community/async-storage';
import Notifications from 'react-native-push-notification';
// import * as Permissions from "expo-permissions";

const appKey = 'MY_CAR_BOOK:appKey';
const notificationKey = 'MY_CAR_BOOK:notificationKey';
const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

export const getDecks = async () => {
  try {
    const value = await AsyncStorage.getItem(appKey);

    if (value !== null) {
      return JSON.parse(value);
    } else {
      return {};
    }
  } catch (e) {
    console.log(e);
  }
};

export const saveDeckToStorage = async decks => {
  await AsyncStorage.setItem(appKey, JSON.stringify(decks));
};

export const getDeck = async title => {
  try {
    const value = await AsyncStorage.getItem(appKey);
    if (value !== null) {
      const deck = JSON.parse(value)[title];

      return deck;
    }
  } catch (e) {
    console.log(e);
  }
};

export const addQuestion = async (title, question) => {
  try {
    console.log('runs');
    const value = await AsyncStorage.getItem(appKey);
    if (value !== null) {
      const decks = JSON.parse(value);
      decks[title]['questions'].push(question);
      await AsyncStorage.setItem(appKey, JSON.stringify(decks));
    }
  } catch (e) {
    console.log(e);
  }
};

export const createDeck = async title => {
  try {
    const value = await AsyncStorage.getItem(appKey);
    if (value !== null) {
      const decks = JSON.parse(value);
      decks[title] = {title, questions: []};
      await AsyncStorage.setItem(appKey, JSON.stringify(decks));
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteDeck = async title => {
  try {
    const value = await AsyncStorage.getItem(appKey);

    if (value !== null) {
      const decks = JSON.parse(value);
      decks[title] = undefined;
      delete decks[title];

      await AsyncStorage.setItem(appKey, JSON.stringify(decks));
    }
  } catch (e) {
    console.log(e);
  }
};

Notifications.configure({
  // *** (required) Called when a remote or local notification is opened or received
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification here
  },

  // *** ANDROID ONLY: FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
  // senderID: 'YOUR FCM SENDER ID',

  // *** Should the initial notification be popped automatically
  // *** default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  // requestPermissions: true,
});

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(notificationKey);
  await Notifications.cancelAllLocalNotifications();
};

export const setLocalNotification = async () => {
  const response = await AsyncStorage.getItem(notificationKey);
  const data = JSON.parse(response);
  if (data === null) {
    Notifications.cancelAllLocalNotifications();
    let tomorrow = new Date();

    tomorrow.setHours(20);
    tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);
    Notifications.localNotificationSchedule({
      message: 'MyCarBook Notification',
      date: new Date(Date.now() + 60 * 1000),
    });
    AsyncStorage.setItem(notificationKey, JSON.stringify(true));
  }
};

// export const listenForNotifications = () => {
//   Notifications.addListener(notification => {
//     if (notification.origin === 'received') {
//       Alert.alert(notification.title, notification.body);
//     }
//   });
// };
