import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
      <Router>
        <NavigationBar />
      </Router>
  );
}

export default App;