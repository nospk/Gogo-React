import {Redirect, Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";

const DeliverySetting = React.lazy(()=>import("./setting"))
const SeoSetting = React.lazy(()=>import("./settingseo"))
const FormCurrencyConsersion = React.lazy(()=>import("./formcurrencyconsersion"))
const FormDelivery = React.lazy(()=>import("./formdelivery"))
const FormOrder = React.lazy(()=>import("./formorder"))

const DeliveryRoutes = ({match})=>{
    return(
        <Suspense fallback={<div className="loading" />}>
            <Switch>
                <Route exact path={`${match.url}/form/delivery`} render={props => <FormDelivery  {...props} />}/>
                <Route exact path={`${match.url}/form/order`} render={props => <FormOrder  {...props} />}/>
                <Route exact path={`${match.url}/form/currencyconversion`} render={props => <FormCurrencyConsersion {...props} />}/>
                <Route exact path={`${match.url}/content`} render={props => <DeliverySetting {...props} />}/>
                <Route exact path={`${match.url}/seo`} render={props => <SeoSetting {...props} />}/>
                <Redirect to="/error" />
            </Switch>
        </Suspense>
    )
}
export default DeliveryRoutes;
