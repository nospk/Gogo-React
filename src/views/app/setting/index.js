import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
const SettingBannerView = React.lazy(()=>import("./banner/setting-banner"));
const SettingBannerView1 = React.lazy(()=>import("./banner/setting-banner1"));
const SettingSlideView = React.lazy(()=>import("./slide/setting-slide"));
const SettingMenuView = React.lazy(()=>import("./menu/setting-menu"));
const SettingWebsite  = React.lazy(()=>import("./website/setting-website"));
const SettingEmail  = React.lazy(()=>import("./email/setting-email"));
const SettingPrice = React.lazy(()=>import("./price/PriceSetting"));
const ShipSetting = React.lazy(()=>import("./ship/ShipSetting"));
const Brand = React.lazy(()=>import("./brand/brand"));
const Embed = React.lazy(()=>import("./embed/embed"));
const EmbedSocial = React.lazy(()=>import("./embedSocial"));
const Robots = React.lazy(()=>import("./robots"));
const Geo2IP = React.lazy(()=>import("./geo2ip/geo2ip"));
const Test = React.lazy(()=>import("./menu/setting-test"));
const SettingRoutes = ({ match })=>(
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Route
                exact
                path={`${match.url}/banner1`}
                render={props =><SettingBannerView {...{...props,type:"banner1"}} />}
            />
            <Route
                exact
                path={`${match.url}/banner2`}
                render={props =><SettingBannerView1 {...{...props,type:"banner2"}} />}
            />
            <Route
                exact
                path={`${match.url}/slide`}
                render={props =><SettingSlideView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/menu`}
                render={props =><SettingMenuView {...props} />}
            />
            <Route
                exact
                path={`${match.url}/website`}
                render={props =><SettingWebsite {...props} />}
            />
            <Route
                exact
                path={`${match.url}/email`}
                render={props =><SettingEmail {...props} />}
            />
            <Route
                exact
                path={`${match.url}/price`}
                render={props =><SettingPrice {...props} />}
            />
            <Route
                exact
                path={`${match.url}/ship`}
                render={props =><ShipSetting {...props} />}
            />
            <Route
                exact
                path={`${match.url}/brand`}
                render={props =><Brand {...props} />}
            />
            <Route
                exact
                path={`${match.url}/embed`}
                render={props =><Embed {...props} />}
            />
            <Route
                exact
                path={`${match.url}/embed-social`}
                render={props =><EmbedSocial {...props} />}
            />
            <Route
                exact
                path={`${match.url}/robots`}
                render={props =><Robots {...props} />}
            />
            <Route
                exact
                path={`${match.url}/geo2ip`}
                render={props =><Geo2IP {...props} />}
            />
            <Route
                exact
                path={`${match.url}/test`}
                render={props =><Test {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
)
export default SettingRoutes;
