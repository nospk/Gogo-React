import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
const LazadaSetting = React.lazy(()=>import("./setting"));
const LazadaList = React.lazy(()=> import("./list"));
const LazadaDetail = React.lazy(()=>import("./detailt"));
const LazadaRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route exact path={`${match.url}`} render={props => <LazadaList {...({...props,type:'detailt'})} />}/>
                <Route exact path={`${match.url}/setting`} render={props => <LazadaSetting {...({...props,type:'detailt'})} />}/>
                <Route exact path={`${match.url}/detail`} render={props => <LazadaDetail {...({...props,type:'detailt'})} />}/>
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default LazadaRoutes;
