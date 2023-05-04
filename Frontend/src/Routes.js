import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import EventView from "./user/EventView"
import Profile from "./user/Profile";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashBoard from "./admin/dashboard";
import CreateEvent from "./admin/createEvent";
import ManageEvent from "./admin/manageEvent";
import EventList from "./admin/eventList";
import EventAttendence from "./admin/eventAttendence";
import Transaction from "./admin/transaction";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <PrivateRoute path="/user/profile" exact component={Profile} />
          <PrivateRoute path="/user/registered/event" exact component={Profile} />
          <Route path="/eventv/:eventId" exact component={EventView} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
          <AdminRoute path="/admin/create/event" exact component={CreateEvent} />
          <AdminRoute path="/admin/events" exact component={ManageEvent} />
          <AdminRoute path="/admin/event/attendence" exact component={EventList} />
          <Route path="/admin/event/view/:eventId" exact component={EventAttendence} />
          <AdminRoute path="/admin/view/transactions" exact component={Transaction} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  