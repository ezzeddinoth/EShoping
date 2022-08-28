import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './View/Main/Main';
import Orders from './View/Orders/Orders';
import Products from './View/Products/Products';
import Person from './View/Person/Person';
import Login from './View/Login/Login';

export default function App() {

  return (
    <BrowserRouter basename=''>
      <Switch>
        <Route exact path="/" component={Login}>
        </Route>
        <Route exact path="/main" component={Main}>
        </Route>
        <Route exact path="/orders" component={Orders}>
        </Route>
        <Route exact path="/products" component={Products}>
        </Route>
        <Route exact path="/person" component={Person}>
        </Route>
        <Route exact path="/login" component={Login}>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
