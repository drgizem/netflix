import Entrance from "./components/Entrance"
import Signup from "./components/Signup" 
import Home from "./components/Home"
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
        <Entrance />
        </Route>
        <Route path="/signin">
        <Signup />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Router>
    </div>
  );
}

export default App;
