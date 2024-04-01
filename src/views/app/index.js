import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import AppLayout from '../../layout/AppLayout';
import ImageRoutes from "./image";
const Dashboards = React.lazy(() => import(/* webpackChunkName: "dashboards" */ './dashboards'));
const Pages = React.lazy(() => import(/* webpackChunkName: "pages" */ './pages'));
const Applications = React.lazy(() => import(/* webpackChunkName: "applications" */ './applications'));
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() => import(/* webpackChunkName: "blank-page" */ './blank-page'));

/**
 * My custom
 * */
const ProductRoutes = React.lazy(()=>import("./product"));
const CategoryRoutes = React.lazy(()=>import("./category"));
const OrderRoutes = React.lazy(()=>import("./order"));
const ExtentionRoutes = React.lazy(()=>import("./extention"));
const SettingRoutes = React.lazy(()=>import("./setting"))
const UserRoutes = React.lazy(()=>import("./user"))
const PostRoutes = React.lazy(()=>import("./post"))
const PartnerRoutes = React.lazy(()=>import("./partner"))
const GHNRoutes = React.lazy(()=>import("./ghn"))
const LogView = React.lazy(()=>import("./log/log"))
const FacebookRoutes = React.lazy(()=>import("./facebook"))
const LazadaRoutes = React.lazy(()=>import("./lazada"))
const DeliveryRoutes = React.lazy(()=>import("./delivery"))
const ChatGPTRoutes = React.lazy(()=>import("./chatgpt"))
class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />
              <Route path={`${match.url}/product`} render={props => <ProductRoutes {...props}/>}/>
              <Route path={`${match.url}/category`} render={props => <CategoryRoutes {...props}/>}/>
              <Route path={`${match.url}/order`} render={props => <OrderRoutes {...props}/>}/>
              <Route path={`${match.url}/image`} render={props => <ImageRoutes {...props}/>}/>
              <Route path={`${match.url}/extention`} render={props => <ExtentionRoutes {...props}/>}/>
              <Route path={`${match.url}/setting`} render={props => <SettingRoutes {...props}/>}/>
              <Route path={`${match.url}/user`} render={props => <UserRoutes {...props}/>}/>
              <Route path={`${match.url}/post`} render={props => <PostRoutes {...props}/>}/>
              <Route path={`${match.url}/partner`} render={props => <PartnerRoutes {...props}/>}/>
              <Route path={`${match.url}/ghn`} render={props => <GHNRoutes {...props}/>}/>
              <Route path={`${match.url}/log`} render={props => <LogView {...props}/>}/>
              <Route path={`${match.url}/facebook`} render={props => <FacebookRoutes {...props}/>}/>
              <Route path={`${match.url}/lazada`} render={props => <LazadaRoutes {...props}/>}/>
              <Route path={`${match.url}/delivery`} render={props => <DeliveryRoutes {...props}/>}/>
              <Route path={`${match.url}/chatgpt`} render={props => <ChatGPTRoutes {...props}/>}/>
              <Route
                path={`${match.url}/applications`}
                render={props => <Applications {...props} />}
              />
              <Route
                path={`${match.url}/pages`}
                render={props => <Pages {...props} />}
              />
              <Route
                path={`${match.url}/ui`}
                render={props => <Ui {...props} />}
              />
              <Route
                path={`${match.url}/menu`}
                render={props => <Menu {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
