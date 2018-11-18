import React, { Component } from 'react';

class Sidebar extends Component {

    render() {
        return (<div className="pcoded-main-container">
            <div className="pcoded-wrapper">
                <nav className="pcoded-navbar">
                    <div className="nav-list">
                        <div className="pcoded-inner-navbar main-menu">
                            <div className="pcoded-navigation-label">Navigation</div>
                            <ul className="pcoded-item pcoded-left-item">
                                <li className="pcoded-hasmenu active pcoded-trigger">
                                    <a href="javascript:void(0)" className="waves-effect waves-dark">
                                        <span className="pcoded-micon"><i className="feather icon-home"></i></span>
                                        <span className="pcoded-mtext">Dashboard</span>
                                    </a>
                                    <ul className="pcoded-submenu">
                                        <li className="">
                                            <a href="index-2.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Default</span>
                                            </a>
                                        </li>
                                        <li className="active">
                                            <a href="dashboard-crm.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">CRM</span>
                                            </a>
                                        </li>
                                        <li className="">
                                            <a href="dashboard-analytics.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Analytics</span>
                                                <span className="pcoded-badge label label-info ">NEW</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="pcoded-hasmenu">
                                    <a href="javascript:void(0)" className="waves-effect waves-dark">
                                        <span className="pcoded-micon"><i className="feather icon-sidebar"></i></span>
                                        <span className="pcoded-mtext">Page layouts</span>
                                        <span className="pcoded-badge label label-warning">NEW</span>
                                    </a>
                                    <ul className="pcoded-submenu">
                                        <li className=" pcoded-hasmenu">
                                            <a href="javascript:void(0)" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Vertical</span>
                                            </a>
                                            <ul className="pcoded-submenu">
                                                <li className="">
                                                    <a href="menu-static.html" className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Static Layout</span>
                                                    </a>
                                                </li>
                                                <li className="">
                                                    <a href="menu-header-fixed.html"
                                                       className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Header Fixed</span>
                                                    </a>
                                                </li>
                                                <li className="">
                                                    <a href="menu-compact.html" className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Compact</span>
                                                    </a>
                                                </li>
                                                <li className="">
                                                    <a href="menu-sidebar.html" className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Sidebar Fixed</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className=" pcoded-hasmenu">
                                            <a href="javascript:void(0)" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Horizontal</span>
                                            </a>
                                            <ul className="pcoded-submenu">
                                                <li className="">
                                                    <a href="menu-horizontal-static.html" target="_blank"
                                                       className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Static Layout</span>
                                                    </a>
                                                </li>
                                                <li className="">
                                                    <a href="menu-horizontal-fixed.html" target="_blank"
                                                       className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Fixed layout</span>
                                                    </a>
                                                </li>
                                                <li className="">
                                                    <a href="menu-horizontal-icon.html" target="_blank"
                                                       className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Static With Icon</span>
                                                    </a>
                                                </li>
                                                <li className="">
                                                    <a href="menu-horizontal-icon-fixed.html" target="_blank"
                                                       className="waves-effect waves-dark">
                                                        <span className="pcoded-mtext">Fixed With Icon</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="">
                                            <a href="menu-bottom.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Bottom Menu</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="">
                                    <a href="navbar-light.html" className="waves-effect waves-dark">
        									<span className="pcoded-micon">
        										<i className="feather icon-menu"></i>
        									</span>
                                        <span className="pcoded-mtext">Navigation</span>
                                    </a>
                                </li>
                                <li className="pcoded-hasmenu">
                                    <a href="javascript:void(0)" className="waves-effect waves-dark">
        									<span className="pcoded-micon">
        										<i className="feather icon-layers"></i>
        									</span>
                                        <span className="pcoded-mtext">Widget</span>
                                        <span className="pcoded-badge label label-danger">100+</span>
                                    </a>
                                    <ul className="pcoded-submenu">
                                        <li className="">
                                            <a href="widget-statistic.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Statistic</span>
                                            </a>
                                        </li>
                                        <li className="">
                                            <a href="widget-data.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Data</span>
                                            </a>
                                        </li>
                                        <li className="">
                                            <a href="widget-chart.html" className="waves-effect waves-dark">
                                                <span className="pcoded-mtext">Chart Widget</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            </div>
          );
    }
}

export default Sidebar;
