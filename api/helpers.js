import  AsyncStorage  from "@react-native-community/async-storage";
// import { Notifications } from "expo";
// import * as Permissions from "expo-permissions";

const appKey = "FLASH_CARD_DECKS";
const notificationKey = "FLASH_CARD_NOTIFICATION";
const decks = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
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

export const saveDeckToStorage = async (decks) => {
  await AsyncStorage.setItem(appKey, JSON.stringify(decks));
};

export const getDeck = async (title) => {
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
    console.log("runs");
    const value = await AsyncStorage.getItem(appKey);
    if (value !== null) {
      const decks = JSON.parse(value);
      decks[title]["questions"].push(question);
      await AsyncStorage.setItem(appKey, JSON.stringify(decks));
    }
  } catch (e) {
    console.log(e);
  }
};

export const createDeck = async (title) => {
  try {
    const value = await AsyncStorage.getItem(appKey);
    if (value !== null) {
      const decks = JSON.parse(value);
      decks[title] = { title, questions: [] };
      await AsyncStorage.setItem(appKey, JSON.stringify(decks));
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteDeck = async (title) => {
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

// const createNotificationObject = () => {
//   return {
//     title: "Take a Quiz.",
//     body: `Don't forget to take a quiz`,
//     ios: {
//       sound: true,
//     },
//     android: {
//       sound: true,
//       priority: "high",
//       sticky: false,
//       vibrate: true,
//     },
//   };
// };

// export const clearLocalNotification = async () => {
//   await AsyncStorage.removeItem(notificationKey);
//   await Notifications.cancelAllScheduledNotificationsAsync();
// };

// export const setLocalNotification = async () => {
//   const response = await AsyncStorage.getItem(notificationKey);
//   const data = JSON.parse(response);
//   if (data === null) {
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

//     if (status === "granted") {
//       Notifications.cancelAllScheduledNotificationsAsync();
//       let tomorrow = new Date();

//       // tomorrow.setHours(20);
//       tomorrow = tomorrow.setDate(tomorrow.getDate() + 1);
//       Notifications.scheduleLocalNotificationAsync(createNotificationObject(), {
//         time: tomorrow,
//         repeat: "day",
//       });
//       AsyncStorage.setItem(notificationKey, JSON.stringify(true));
//     }
//   }
// };

// export const listenForNotifications = () => {
//   Notifications.addListener((notification) => {
//     if (notification.origin === "received") {
//       Alert.alert(notification.title, notification.body);
//     }
//   });
// };
