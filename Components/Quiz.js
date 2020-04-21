import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Quiz extends React.Component {
  state = {
    question: true,
    remaining: 0,
    total: 0,
    correct: 0,
    incorrect: 0,
    current: 0,
  };

  handleCorrect = () => {
    this.setState({
      remaining: this.state.remaining - 1,
      correct: this.state.correct + 1,
      current: this.state.current + 1,
      question: true,
    });
  };

  handleIncorrect = () => {
    this.setState({
      remaining: this.state.remaining - 1,
      incorrect: this.state.incorrect + 1,
      current: this.state.current + 1,
      question: true,
    });
  };
  startOver = () => {
    this.setState({
      remaining: this.state.total,
      correct: 0,
      incorrect: 0,
      current: 0,
    });
  };

  goBack = () => {
    const { navigation } = this.props;
    navigation.pop();
  };

  componentDidMount() {
    const { title } = this.props.route.params;

    this.setState({
      remaining: this.props.decks[title].questions.length,
      total: this.props.decks[title].questions.length,
    });
  }

  render() {
    const { title } = this.props.route.params;
    const deck = this.props.decks[title];

    const { question, correct, incorrect, total } = this.state;
    if (this.state.remaining <= 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.counter}>Correct: {correct}</Text>
          <Text style={styles.counter}>Incorrect: {incorrect}</Text>
          <Text style={styles.percent}>
            Percentage: {((correct / total) * 100).toFixed(2)} %
          </Text>
          <TouchableOpacity onPress={this.startOver}>
            <View>
              <Text style={styles.correct}>Restart Quiz</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goBack}>
            <View>
              <Text style={styles.correct}>Back to Deck</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>
          Remaining: {this.state.remaining}/{this.state.total}
        </Text>
        <Text style={styles.title}>
          {question
            ? deck.questions[this.state.current].question
            : deck.questions[this.state.current].answer}
        </Text>
        <TouchableOpacity
          onPress={() => this.setState({ question: !question })}
        >
          <View>
            <Text style={styles.flip}>{question ? "Answer" : "Question"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleCorrect}>
          <View>
            <Text style={styles.correct}>Correct</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleIncorrect}>
          <View>
            <Text style={styles.incorrect}>Incorrect</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return { decks: state };
};

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f1f1f1",
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    alignSelf: "stretch",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },

  correct: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    padding: 5,
    width: 250,
    color: "#f1f1f1",
    backgroundColor: "darkgreen",
    borderRadius: 10,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  incorrect: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    padding: 5,
    width: 250,
    color: "#f1f1f1",
    backgroundColor: "darkred",
    borderRadius: 10,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  flip: {
    marginTop: 20,
    fontSize: 25,
    textAlign: "center",
    padding: 20,
    color: "darkred",
    borderRadius: 10,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  counter: {
    alignSelf: "flex-start",
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  percent: {
    marginTop: 20,
    fontSize: 30,
    alignSelf: "stretch",
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
});
