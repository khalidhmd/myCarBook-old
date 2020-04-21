import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {clearLocalNotification, setLocalNotification} from '../api/helpers';
import {connect} from 'react-redux';

class DeckItem extends React.Component {
  state = {
    deck: {tite: '', questions: []},
  };
  addCard = title => {
    const {navigation} = this.props;
    navigation.navigate('NewCard', {title});
  };

  startQuiz = title => {
    const {navigation} = this.props;
    if (this.props.decks[title].questions.length < 1) {
      alert(`You can't take quiz on empty deck`);
      return;
    }
    // clearLocalNotification()
    //   .then(() => setLocalNotification())
    //   .then(() => navigation.navigate("Quiz", { title }));
    navigation.navigate('Quiz', {title});
  };

  handleDelete = title => {
    const {navigation} = this.props;
    navigation.pop();
    this.props.deleteDeck(title);
    navigation.navigate('Decks');
  };

  render() {
    const {title} = this.props.route.params;
    const deck = this.props.decks[title];

    if (!deck) return null;
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.text}>{deck.questions.length} cards</Text>
        </View>

        <TouchableOpacity onPress={() => this.addCard(title)}>
          <View>
            <Text style={styles.addCard}>Add Card</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.startQuiz(title)}>
          <View>
            <Text style={styles.start}>Start Quiz</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDelete(title)}>
          <View>
            <Text style={styles.delete}>Delete Deck</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {decks: state};
};
const mapDispatchToProps = dispatch => {
  return {
    deleteDeck: title => {
      dispatch({type: 'DELETE_DECK', title});
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckItem);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  title: {
    fontSize: 30,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 25,
    paddingTop: 5,
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deck: {
    padding: 5,
    marginTop: 2,
  },
  addCard: {
    marginTop: 75,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    width: 250,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 10,
  },
  start: {
    marginTop: 20,
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    width: 250,
    color: 'white',
    backgroundColor: 'darkblue',
    borderRadius: 10,
    paddingVertical: 10,
  },
  delete: {
    marginTop: 20,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    width: 250,
    color: 'red',
    borderRadius: 10,
  },
});
