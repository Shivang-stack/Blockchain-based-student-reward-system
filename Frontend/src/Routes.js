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
import RegisteredEvents from "./user/RegisteredEvents";
import EventQrcode from "./admin/eventQrcode";
import AddAchievement from "./user/createAchievement";
import ViewAchievements from "./user/viewAchievements";
import ViewAllAchievements from "./admin/viewAllAchievements";
import ViewRewards from "./user/viewRewardList";


const Routes = () => {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signin" exact component={Signin} />
          <PrivateRoute path="/user/profile" exact component={Profile} />
          <PrivateRoute path="/user/upload/certificate" exact component={AddAchievement} />
          <PrivateRoute path="/user/view/certificate" exact component={ViewAchievements} />
          <PrivateRoute path="/user/view/rewards" exact component={ViewRewards} />
          <PrivateRoute path="/user/registered/event/:userId" exact component={RegisteredEvents} />
          <Route path="/eventv/:eventId" exact component={EventView} />
          <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
          <AdminRoute path="/admin/create/event" exact component={CreateEvent} />
          <AdminRoute path="/admin/events" exact component={ManageEvent} />
          <AdminRoute path="/admin/event/attendence" exact component={EventList} />
          <AdminRoute path="/admin/view/achievements" exact component={ViewAllAchievements} />
          <Route path="/admin/event/view/:eventId" exact component={EventAttendence} />
          <AdminRoute path="/admin/view/transactions" exact component={Transaction} />
          <AdminRoute path="/admin/view/event/qrcode" exact component={EventQrcode} />
        </Switch>
      </BrowserRouter>
    );
  };
  
  export default Routes;
  