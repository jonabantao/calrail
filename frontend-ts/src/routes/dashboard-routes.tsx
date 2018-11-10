import * as React from 'react';
import CurrentJobs from 'src/views/dashboards/CurrentJobs';
import EmployeeManagement from 'src/views/dashboards/EmployeeManagement';
import JobManagement from 'src/views/dashboards/JobManagement';
import TrainManagement from 'src/views/dashboards/TrainManagement';
import NotFound from 'src/views/NotFound';

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
    component: JobManagement,
    path: '/jobs'
  },
  {
    component: EmployeeManagement,
    path: '/employees'
  },
  {
    component: TrainManagement,
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
