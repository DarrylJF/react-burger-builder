import React from 'react';
import Layout from './hoc/Auxillary/Auxillary';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import './App.scss';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
