import React from 'react';

import '../node_modules/jquery/dist/jquery';
import '../node_modules/bootstrap/dist/js/bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import HomePage from './components/HomePage/HomePage'

class App extends React.Component{
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render(){
    return(
      <div className="App">
      
  
  
  
    <HomePage></HomePage>
    </div>
    );
  }
}

export default App;
