import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
const ImageListView = React.lazy(()=>import("./Image-list"))
const ImageRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route
                    exact
                    path={`${match.url}/`}
                    render={props => <ImageListView {...props} />}
                />
                <Route
                    exact
                    path={`${match.url}/:type`}
                    render={props => <ImageListView {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default ImageRoutes;
