import Navbar from './components/Navbar.js'
import { Helmet } from 'react-helmet';
import Home from './components/Home.js';
import Form from './components/Form.js';

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>NBA Odds Calculator</title>
      </Helmet>
      <Navbar />
      <Home />
      <Form />

    </div>
  );
}

export default App;
