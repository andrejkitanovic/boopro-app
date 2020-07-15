import React, {Component} from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from '../components/Login/Login'
import Movies from '../components/Movies/Movies'

class App extends Component {

  

  render(){
    return (
      <Router>
        <div className="App">
          {/* Koristimo react-router-dom posto se radi o multipage stranici */}
          <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/movies" exact component={Movies} />
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
