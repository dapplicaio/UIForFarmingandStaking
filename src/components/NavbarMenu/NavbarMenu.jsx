import React from 'react';

import './NavbarMenu.css';

function NavbarMenu() {
    return (
      <div className="navbar-menu">
        <div className="navbar-menu-item active">
            <p>Workplaces</p>
        </div>
        <div className="navbar-menu-item">
            <p>Upgrade</p>
        </div>
        <div className="navbar-menu-item">
            <p>Inventory</p>
        </div>
        <div className="navbar-menu-item">
            <p>DAO</p>
        </div>
        <div className="navbar-menu-item">
            <p>Market</p>
        </div>
      </div>
    );
}

export default NavbarMenu;