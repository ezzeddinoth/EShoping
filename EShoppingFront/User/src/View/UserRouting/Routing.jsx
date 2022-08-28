import React from 'react';
import Main from '../Main/Main';
import { BrowserRouter, Route, useRouteMatch, Switch } from 'react-router-dom';


export default function Routing(match) {

    const { url, /*path*/ } = useRouteMatch();

    return (
        <BrowserRouter basename={url}>
            <Switch>
                <Route exact path="/" component={Main}>
                </Route>
            </Switch>
        </BrowserRouter >
    );

}

