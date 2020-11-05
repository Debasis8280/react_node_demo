import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <div className="container">
        <Router>
          <Route  path="/" exact component={Signup}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/login" component={Login}></Route>
        </Router>
    </div>
  );
}

export default App;
