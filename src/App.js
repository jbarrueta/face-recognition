import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 600
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'b501e1101b054bc3bf9ec78153232cd0'
})

//{const url = "https://samples.clarifai.com/metro-north.jpg"}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    const newInput = event.target.value;
    console.log(newInput);
    this.setState({input: newInput}, () => console.log(this.state.input));
    ;
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log(this.state.imageUrl);
    app.models.predict(Clarifai.COLOR_MODEL, this.state.imageUrl)
      .then(
        function (response) {
          console.log(response)
        },
        function (err) {
          // there was an error
        }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }

}

export default App;
