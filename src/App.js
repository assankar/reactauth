import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDiwit5xIc5o_oZY2dML4n9rjn6S_mXN-U',
      authDomain: 'authentication-6be86.firebaseapp.com',
      databaseURL: 'https://authentication-6be86.firebaseio.com',
      projectId: 'authentication-6be86',
      storageBucket: 'authentication-6be86.appspot.com',
      messagingSenderId: '906371828683'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  logoutStyle: {
    flexDirection: 'row',
    paddingTop: 200
  }
};

export default App;
