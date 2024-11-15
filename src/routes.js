import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StaffHomePage from './components/staff/StaffHomePage';
import MyCommodities from './components/staff/MyCommodities';
import ManageServices from './components/staff/ManageServices';
import LiveViewing from './components/staff/LiveViewing';
import Transactions from './components/staff/Transactions';
import Messages from './components/staff/Messages';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/staff" exact component={StaffHomePage} />
        <Route path="/staff/my-commodities" component={MyCommodities} />
        <Route path="/staff/manage-services" component={ManageServices} />
        <Route path="/staff/live-viewing" component={LiveViewing} />
        <Route path="/staff/transactions" component={Transactions} />
        <Route path="/staff/messages" component={Messages} />
      </Switch>
    </Router>
  );
};

export default Routes;