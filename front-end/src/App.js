import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Nav />
        <Routes>

          <Route element={<PrivateComponent />}>

            <Route path='/' element={<ProductList />}></Route>
            <Route path='/add' element={<AddProduct />}></Route>
            <Route path='/update/:id' element={<UpdateProduct />}></Route>

          </Route>

          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
