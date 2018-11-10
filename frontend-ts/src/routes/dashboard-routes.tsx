import * as React from 'react';
import CurrentJobs from '../view/dashboards/CurrentJobs';
import NotFound from '../view/NotFound';

export interface IRoute {
  component: React.ReactType;
  path: string;
}

export const routes: IRoute[] = [
  {
    component: CurrentJobs,
    path: '/',
  },
  {
    component: NotFound,
    path: '/jobs'
  },
  {
    component: NotFound,
    path: '/employees'
  },
  {
    component: NotFound,
    path: '/trains'
  },
  {
    component: NotFound,
    path: '/terminals'
  },
  {
    component: NotFound,
    path: '/certifications'
  },
];
