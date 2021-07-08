import './App.css';
import HomePage from './pages/HomePage';
import ChartPage from './pages/ChartPage';
import {
  BrowserRouter as Router,
  Route,
  Switch
}from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage} exact/>
        <Route path="/:type/:metric" component={ChartPage}/>
      </Switch>
    </Router>
    // <Dashboard></Dashboard>
  );
}

export default App;
