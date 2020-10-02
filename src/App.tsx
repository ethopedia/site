import React from 'react';
import './App.css';
import {ApolloProvider} from "./ApolloProvider";
import {Transition} from "./pages/search-page/transition";
import {BrowserRouter as Router} from 'react-router-dom';


function App() {

  return (
    <ApolloProvider>
      <Router>
        <Transition />
      </Router>
    </ApolloProvider>
  );
}

export default App;
