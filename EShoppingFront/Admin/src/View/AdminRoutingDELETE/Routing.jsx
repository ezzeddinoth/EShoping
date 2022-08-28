import React from 'react';
import Main from '../Main/Main';
import Orders from '../Orders/Orders';
import { BrowserRouter, Route, useRouteMatch, Switch } from 'react-router-dom';
import Products from '../Products/Products';
import Person from '../Person/Person';
import Header from '../Header/Header';
import Login from '../Login/Login';

export default function Routing(match) {

    const { url, /*path*/ } = useRouteMatch();

    return (
        <div>
            <BrowserRouter basename={url}>
                <Switch>
                    <Route exact path="/" component={Main}>
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
            </BrowserRouter >
        </div>
    );

}

