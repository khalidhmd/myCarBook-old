import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {connect} from 'react-redux';
import {getDecks} from '../api/helpers';

class DeckList extends React.Component {
  state = {
    position: new Animated.Value(0),
  };

  handlePress = title => {
    const {position} = this.state;
    const {navigation} = this.props;
    Animated.timing(position, {
      toValue: -400,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, 500);
    navigation.navigate('Deck', {title});
  };

  componentDidMount() {
    getDecks().then(decks => this.props.loadDecks(decks));
  }

  render() {
    const deckKeys = Object.keys(this.props.decks);
    const deckArray = deckKeys.map(title => {
      return {
        title,
        questions: this.props.decks[title][`questions`],
      };
    });
    const {position} = this.state;
    return (
      <View>
        <FlatList
          data={deckArray}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => this.handlePress(item.title)}>
                <Animated.View style={[styles.deck, {left: position}]}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.text}>{item.questions.length} cards</Text>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.title}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDecks: decks => {
      dispatch({type: 'LOAD_DECKS', decks});
    },
  };
};

const mapStateToProps = state => {
  return {
    decks: state,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckList);

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
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  deck: {
    padding: 5,
    marginTop: 2,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
