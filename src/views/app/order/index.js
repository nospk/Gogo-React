import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";

const OrdersView = React.lazy(()=>import("./order-list"));
const OrderCreateView = React.lazy(()=>import("./order-create"));
const CartList = React.lazy(()=>import("./cart-list"));
const CartDetail = React.lazy(()=>import("./cart-detail"));
const OrderRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route
                    exact
                    path={`${match.url}/`}
                    render={props => <OrdersView {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/create`}
                    render={props => <OrderCreateView {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/cart-list`}
                    render={props => <CartList {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/cart-detail/:id`}
                    render={props => <CartDetail {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/create/:id`}
                    render={props => <OrderCreateView {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default OrderRoutes;
