import './App.css';
import HomePage from './pages/HomePage';
import {
  BrowserRouter as Router,
  Route,
  Switch
}from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage}/>
      </Switch>
    </Router>
    // <Dashboard></Dashboard>
  );
}

export default App;
