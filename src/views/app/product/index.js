import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
const ProductListView = React.lazy(()=>import("./product-list"));
const ProductStockManagerView = React.lazy(()=>import("./product-stockmanager"));
const ProductCreateView = React.lazy(()=>import("./product-create"));
const ProductRoutes = ({ match })=>(
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                exact
                path={`${match.url}/`}
                render={props => <ProductListView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/create`}
                render={props => <ProductCreateView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/create/:id`}
                render={props => <ProductCreateView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/stockmanager`}
                render={props => <ProductStockManagerView {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)
export default ProductRoutes;
