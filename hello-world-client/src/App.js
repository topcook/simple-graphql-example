import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const loadGreeting = async () => {

  try {
    const response = await axios.post(
      'http://localhost:9000/graphql',
      {
        query: '{greeting}',
      },
      {
        headers: {
          'content-type': 'application/json',
        }
      }
    );

    console.log(response.data.data.greeting);
    return response.data.data.greeting;

  } catch (error) {
    console.log(error);
  }
};

const loadSayhello = async (name) => {

  try {
    const response = await axios.post(
      'http://localhost:9000/graphql',
      {
        query: `{sayHello(name:"${name}")}`,
      },
      {
        headers: {
          'content-type': 'application/json',
        }
      }
    );

    console.log(response.data.data.sayHello);
    return response.data.data.sayHello;
  } catch (error) {
    console.log(error);
  }

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { greetingMessage: '', sayHelloMessage: '', userName: '' }
    this.updateName = this.updateName.bind(this);
    this.showSayHelloMessage = this.showSayHelloMessage.bind(this);
    this.showGreeting = this.showGreeting.bind(this);
  }

  showGreeting() {
    loadGreeting().then(g => this.setState({ greetingMessage: g + " :-)" }))
  }

  showSayHelloMessage() {
    const name = this.state.userName;
    console.log(name)
    loadSayhello(name).then(m => this.setState({ sayHelloMessage: m }))
  }

  updateName(event) {
    this.setState({ userName: event.target.value })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br /><br />
        <section>
          <button id="btnGreet" onClick={this.showGreeting}>Greet</button>
          <br /> <br />
          <div id="greetingDiv">
            <h1>{this.state.greetingMessage}</h1>
          </div>
        </section>

        <hr />

        <section>
          Enter a name:<input id="txtName" type="text" onChange={this.updateName}
            value={this.state.userName} />
          <button id="btnSayhello" onClick={this.showSayHelloMessage}>SayHello</button>
          <br />
          user name is:{this.state.userName}    <br />
          <div id="SayhelloDiv">
            <h1>{this.state.sayHelloMessage}</h1>
          </div>
        </section>
      </div>
    );
  }
}

export default App;