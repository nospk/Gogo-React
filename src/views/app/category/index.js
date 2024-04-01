import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
const CategoryView = React.lazy(()=>import("./category-list"))
const CategoryRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route
                    exact
                    path={`${match.url}/`}
                    render={props => <CategoryView {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default CategoryRoutes;
