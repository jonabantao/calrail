import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div>
        <h1>CalRail (Now with almost zero CSS styling!)</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Current Jobs</Link></li>
          <li><Link to="/jobs">Manage Jobs</Link></li>
          <li><Link to="/employees">Manage Employees</Link></li>
          <li><Link to="/trains">Manage Trains</Link></li>
          <li><Link to="/terminals">Manage Terminals</Link></li>
          <li><Link to="/certifications">Manage Certifications</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;