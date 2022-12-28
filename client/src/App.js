import './App.css';
import { BrowserRouter , Route , Switch } from 'react-router-dom';
import { LandingPage } from './components/landingPage/LandingPage';
import Home from './components/home/Home'; 
import RaceCreate from './components/raceCreate/RaceCreate';

function App() {
  return (
    <BrowserRouter>
    <div className="App">    
      <Switch>
        <Route exact path= "/" component={LandingPage} />
        <Route path= "/home" component={Home} />
        <Route path='/create' component={RaceCreate} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
