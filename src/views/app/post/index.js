import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
const PostsView = React.lazy(()=>import("./post-list"));
const PostDetailtView = React.lazy(()=>import("./post-detailt"));

const PostRoutes = ({ match })=>(
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                exact
                path={`${match.url}/`}
                render={props => <PostsView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/create`}
                render={props => <PostDetailtView {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)
export default PostRoutes;
