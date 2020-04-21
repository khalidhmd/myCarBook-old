import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: "",
  };
  saveCard = (title) => {
    const { navigation } = this.props;
    if (this.state.answer === "" || this.state.question === "") {
      alert(`Question and Answer can't be empty`);
      return;
    }
    this.props.addCard(title, this.state);
    navigation.navigate("Deck");
  };

  render() {
    const { title } = this.props.route.params;
    const deck = this.props.decks[title];

    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.title}>Add a question to {deck.title}</Text>
        </View>
        <View style={styles.question}>
          <TextInput
            placeholder="Question"
            style={styles.text}
            value={this.state.question}
            onChangeText={(text) => this.setState({ question: text })}
          />
          <TextInput
            placeholder="Answer"
            style={styles.text}
            value={this.state.answer}
            onChangeText={(text) => this.setState({ answer: text })}
          />
        </View>

        <TouchableOpacity onPress={() => this.saveCard(title)}>
          <View>
            <Text style={styles.submit}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { decks: state };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (title, question) => {
      dispatch({ type: "ADD_QUESTION", title, question });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    alignItems: "center",
  },

  text: {
    fontSize: 25,
    borderWidth: 2,
    marginHorizontal: 7,
    marginVertical: 10,
    width: 400,
    borderRadius: 8,
    padding: 5,
  },
  question: {
    padding: 5,
    marginTop: 2,
  },

  submit: {
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
    padding: 5,
    width: 250,
    color: "white",
    backgroundColor: "darkblue",
    borderRadius: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    alignSelf: "stretch",
    textAlign: "center",
    fontWeight: "bold",
  },
  deck: {
    padding: 5,
    marginTop: 2,
  },
});
