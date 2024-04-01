import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
const UsersView = React.lazy(()=>import("./user-list"));
const UserDetailtView = React.lazy(()=>import("./user-detailt"));

const UserRoutes = ({ match })=>(
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                exact
                path={`${match.url}/`}
                render={props => <UsersView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/create`}
                render={props => <UserDetailtView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/create/{id}`}
                render={props => <UserDetailtView {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)
export default UserRoutes;
