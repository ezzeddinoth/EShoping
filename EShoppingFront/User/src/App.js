import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './View/Login/Login';
import Register from './View/Register/Register';
import Main from './View/Main/Main';
import Account from './View/Account/Account';
import Orders from './View/Orders/Orders';
import Basket from './View/Basket/Basket';
import './App.css';
import Footer from './View/Footer/Footer';
import Header from './View/Header/Header';
import Toast from '../src/View/Gloabal/Toast';

export default function App() {

  return (
    <BrowserRouter basename=''>
      <Header></Header>
      <Toast></Toast>
      <div className='app-content'>
        <Switch>
          <Route path="/home" component={Main}>
          </Route>
          <Route exact path="/" component={Main}>
          </Route>
          <Route exact path="/login" component={Login}>
          </Route>
          <Route exact path="/register" component={Register}>
          </Route>
          <Route exact path="/my-account" component={Account}>
          </Route>
          <Route exact path="/orders" component={Orders}>
          </Route>
          <Route exact path="/basket" component={Basket}>
          </Route>
        </Switch>
      </div>
      <Footer></Footer>
    </BrowserRouter>
  );
}
