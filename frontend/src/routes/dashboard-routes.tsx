import * as React from 'react';
import CertificationManagement from 'src/views/dashboards/CertificationManagement';
import CurrentJobs from 'src/views/dashboards/CurrentJobs';
import EmployeeManagement from 'src/views/dashboards/EmployeeManagement';
import JobManagement from 'src/views/dashboards/JobManagement';
import TerminalManagement from 'src/views/dashboards/TerminalManagement';
import TrainManagement from 'src/views/dashboards/TrainManagement';

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
    component: TerminalManagement,
    path: '/terminals'
  },
  {
    component: CertificationManagement,
    path: '/certifications'
  },
];
