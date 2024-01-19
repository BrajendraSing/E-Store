import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/header/Header';
import Content from './components/content/Content';
import Cart from './components/cart/Cart';
import PageNotFound from './components/404/PageNotFound';

function App() {
  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={ <Content /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    
    </>
  );
}

export default App;
