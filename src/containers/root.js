import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CLIENT_PAGES } from 'common/consts';
import { Header } from 'components';

import { RubricsContainer } from './rubrics';
import { VacanciesContainer } from './vacancies';


export const Root = () => (
  <React.Fragment>
    <Header />
    <Switch>
      <Route path={CLIENT_PAGES.RUBRICS} component={RubricsContainer} />
      <Route path={CLIENT_PAGES.VACANCIES} component={VacanciesContainer} />
      <Redirect to={CLIENT_PAGES.RUBRICS} />
    </Switch>
  </React.Fragment>
);
