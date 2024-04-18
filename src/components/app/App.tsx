import React from 'react';
import Header from '../app-header/App-header';
import BurgerIngredients from '../burger-ingredients/Burger-ingredients';
import './App.css';

function App() {
  return (
    <div className='app pl-4 pr-4'>
      <Header />
      <main className='main'>
        <div className='column pl-4 pr-4'>
          <BurgerIngredients />
        </div>
        <div className='column pl-4 pr-4'>

        </div>
      </main>
    </div>
  );
}

export default App;
