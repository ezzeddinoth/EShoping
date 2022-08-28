import React from 'react';
import Admin from '../../../View/Admin/Admin';
import Orders from '../../../View/Orders/Orders';
import { BrowserRouter, Route, useRouteMatch, Switch } from 'react-router-dom';

export default function Routing(match) {

    const { url, /*path*/ } = useRouteMatch();

    return (
        <BrowserRouter basename={ url}>

            <Switch>
                <Route exact path="/" component={Admin}>
                </Route>

                <Route path="/orders" component={Orders}>
                </Route>
            </Switch>
        </BrowserRouter >
    );

}

