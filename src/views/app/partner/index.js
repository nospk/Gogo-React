import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";

const PartnerList = React.lazy(()=>import("./partnerlist"));
const PartnerRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route
                    exact
                    path={`${match.url}/`}
                    render={props => <PartnerList {...props} />}
                />
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default PartnerRoutes;