import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
const GHNSetting = React.lazy(()=>import("./setting"));
const GHNOrder   = React.lazy(()=>import("./order"));
const GHNDetailt = React.lazy(()=>import("./detailt"));
const GHNOrderList = React.lazy(()=>import("./orderlist"));
const GHNRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route exact path={`${match.url}/setting`} render={props => <GHNSetting {...props} />}/>
                <Route exact path={`${match.url}/order`} render={props => <GHNOrder {...props} />}/>
                <Route exact path={`${match.url}/list/:id`} render={props => <GHNOrderList {...props}/>}/>
                <Route exact path={`${match.url}/create/:id`} render={props => <GHNDetailt {...({...props,type:'create'})} />}/>
                <Route exact path={`${match.url}/detailt/:id`} render={props => <GHNDetailt {...({...props,type:'detailt'})} />}/>
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default GHNRoutes;
