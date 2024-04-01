import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
const Log = React.lazy(()=>import("./log/index"));
const Setting   = React.lazy(()=>import("./setting/index"));

const ChatGPTRoutes = ({match})=>{
	return(
		<Suspense fallback={<div className="loading" />}>
			<Switch>
				<Route exact path={`${match.url}/`} render={props => <Setting {...props} />}/>
				<Route exact path={`${match.url}/log`} render={props => <Log {...props} />}/>
				<Route exact path={`${match.url}/setting`} render={props => <Setting {...props} />}/>
				<Redirect to="/error" />
			</Switch>
		</Suspense>
	)
}
export default ChatGPTRoutes;
