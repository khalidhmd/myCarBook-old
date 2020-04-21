import { CREATE_DECK, ADD_QUESTION, DELETE_DECK, LOAD_DECKS } from "../actions";

const initState = {
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
export default reducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DECK:
      const newState = { ...state };
      delete newState[action.title];
      return newState;

    case CREATE_DECK:
      return {
        ...state,
        [action.title]: { title: action.title, questions: [] },
      };

    case LOAD_DECKS:
      return {
        ...action.decks,
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [...state[action.title]["questions"], action.question],
        },
      };
    default:
      return state;
  }
};
