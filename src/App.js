import React, {useContext} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';

import Workplaces from './pages/Workplaces/Workplaces';

import './App.css';
import { UALContext } from 'ual-reactjs-renderer';


const Home = () =>{
  const history = useHistory();
  const { activeUser, showModal } = useContext(UALContext);

  const connectWallet = () => {
      if (activeUser) {
        history.push('/workplaces');
      }else{
        showModal();
      }
  }

  return(
    <div className="center-container">
      <div className="logo-container">
        <h1>FarmingKingdom</h1>
      </div>
      <button className="btn" onClick={() => connectWallet()}>Start Play</button>
    </div>
  );
} 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="layer-bg">
          <Switch>
            <Route path="/workplaces" component={Workplaces} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;