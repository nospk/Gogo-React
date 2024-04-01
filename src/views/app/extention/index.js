import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const ExtentioShop = React.lazy(()=>import("./extention-shop"));
const ExtentionProduct = React.lazy(()=>import("./extention-product"));
const ExtentionDetailt = React.lazy(()=>import("./extention-detailt"));
const ExtensionCart = React.lazy(()=>import("./extension-cart"));
const ExtensionCartDetailt = React.lazy(()=>import("./extension-cart-detailt"));
const ExtensionDictionary = React.lazy(()=>import("./extension-dictionary"));
const BatchLog = React.lazy(()=>import("../log/batchlog"));

const ExtentionRoutes = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                path={`${match.url}/shop`}
                render={props => <ExtentioShop {...props} />}
            />
            <Route
                path={`${match.url}/product/:shopId`}
                render={props => <ExtentionProduct {...props} />}
            />
            <Route
                path={`${match.url}/product`}
                render={props => <ExtentionProduct {...props} />}
            />
            <Route
                path={`${match.url}/detailt/:id`}
                render={props => <ExtentionDetailt {...props} />}
            />
            <Route
                exact={true}
                path={`${match.url}/cart/`}
                render={props => <ExtensionCart {...props} />}
            />
            <Route
                exact={true}
                path={`${match.url}/cart/:id`}
                render={props => <ExtensionCartDetailt {...props} />}
            />
            <Route
                exact={true}
                path={`${match.url}/dictionary`}
                render={props => <ExtensionDictionary {...props} />}
            />
            <Route
                exact={true}
                path={`${match.url}/log`}
                render={props => <BatchLog {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default ExtentionRoutes;
