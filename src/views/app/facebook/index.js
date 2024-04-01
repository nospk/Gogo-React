import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const FacebookSetting = React.lazy(()=>import("./setting"));
const FacebookCategories = React.lazy(()=>import("./categories"));
const ProductUploaded = React.lazy(()=>import("./uploaded"));
const FacebookRoutes = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                exact
                path={`${match.url}/uploaded`}
                render={props => <ProductUploaded {...props} />}
            />
            <Route
                exact
                path={`${match.url}/categories`}
                render={props => <FacebookCategories {...props} />}
            />
            <Route
                path={`${match.url}/`}
                render={props => <FacebookSetting {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default FacebookRoutes;
