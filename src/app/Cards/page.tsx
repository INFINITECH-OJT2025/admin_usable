'use client'
import React from "react";
/* Place all @import rules at the top */
// import "https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap";
// import "https://fonts.gstatic.com";
// import "https://buttons.github.io/buttons.js";

import "../assets/vendor/fonts/boxicons.css";
import "../assets/vendor/css/core.css";
import "../assets/vendor/css/theme-default.css";
import "../assets/css/demo.css";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "../assets/vendor/libs/apex-charts/apex-charts.css";
import "../assets/vendor/js/helpers.js";
// import "../assets/js/config.js";

import "../assets/vendor/libs/jquery/jquery.js";
import "../assets/vendor/libs/popper/popper.js";
import "../assets/vendor/js/bootstrap.js";
import "../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js";

import "../assets/vendor/js/menu.js";
import "../assets/vendor/libs/masonry/masonry.js";
import "../assets/js/main.js";
// import "../assets/js/dashboards-analytics.js";
// import "https://buttons.github.io/buttons.js";

export default function Cards() {
  return (
    <>
            <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Menu */}

        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
          <div className="app-brand demo">
            <a href="index.html" className="app-brand-link">
              <span className="app-brand-logo demo">
                <svg
                  width="25"
                  viewBox="0 0 25 42"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"

                >
                  <defs>
                    <path
                      d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                      id="path-1"
                    ></path>
                    <path
                      d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                      id="path-3"
                    ></path>
                    <path
                      d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                      id="path-4"
                    ></path>
                    <path
                      d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                      id="path-5"
                    ></path>
                  </defs>
                  <g id="g-app-brand" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                      <g id="Icon" transform="translate(27.000000, 15.000000)">
                        <g id="Mask" transform="translate(0.000000, 8.000000)">
                          <mask id="mask-2" fill="white">

                          </mask>

                          <g id="Path-3" mask="url(#mask-2)">
                          </g>
                          <g id="Path-4" mask="url(#mask-2)">


                          </g>
                        </g>
                        <g
                          id="Triangle"
                          transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                        >

                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
              <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
            </a>

            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i className="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div className="menu-inner-shadow"></div>

          <ul className="menu-inner py-1">
            {/* Dashboard */}
            <li className="menu-item">
              <a href="index.html" className="menu-link">
                <i className="menu-icon tf-icons bx bx-home-circle"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </a>
            </li>

            {/* Layouts */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-layout"></i>
                <div data-i18n="Layouts">Layouts</div>
              </a>

              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="layouts-without-menu.html" className="menu-link">
                    <div data-i18n="Without menu">Without menu</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-without-navbar.html" className="menu-link">
                    <div data-i18n="Without navbar">Without navbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-container.html" className="menu-link">
                    <div data-i18n="Container">Container</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-fluid.html" className="menu-link">
                    <div data-i18n="Fluid">Fluid</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="layouts-blank.html" className="menu-link">
                    <div data-i18n="Blank">Blank</div>
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-header small text-uppercase">
              <span className="menu-header-text">Pages</span>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-dock-top"></i>
                <div data-i18n="Account Settings">Account Settings</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="pages-account-settings-account.html" className="menu-link">
                    <div data-i18n="Account">Account</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="pages-account-settings-notifications.html" className="menu-link">
                    <div data-i18n="Notifications">Notifications</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="pages-account-settings-connections.html" className="menu-link">
                    <div data-i18n="Connections">Connections</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
                <div data-i18n="Authentications">Authentications</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="auth-login-basic.html" className="menu-link" target="_blank">
                    <div data-i18n="Basic">Login</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="auth-register-basic.html" className="menu-link" target="_blank">
                    <div data-i18n="Basic">Register</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="auth-forgot-password-basic.html" className="menu-link" target="_blank">
                    <div data-i18n="Basic">Forgot Password</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-cube-alt"></i>
                <div data-i18n="Misc">Misc</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="pages-misc-error.html" className="menu-link">
                    <div data-i18n="Error">Error</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="pages-misc-under-maintenance.html" className="menu-link">
                    <div data-i18n="Under Maintenance">Under Maintenance</div>
                  </a>
                </li>
              </ul>
            </li>
            {/* Components */}
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Components</span></li>
            {/* Cards */}
            <li className="menu-item active">
              <a href="cards-basic.html" className="menu-link">
                <i className="menu-icon tf-icons bx bx-collection"></i>
                <div data-i18n="Basic">Cards</div>
              </a>
            </li>
            {/* User interface */}
            <li className="menu-item">
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-box"></i>
                <div data-i18n="User interface">User interface</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="ui-accordion.html" className="menu-link">
                    <div data-i18n="Accordion">Accordion</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-alerts.html" className="menu-link">
                    <div data-i18n="Alerts">Alerts</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-badges.html" className="menu-link">
                    <div data-i18n="Badges">Badges</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-buttons.html" className="menu-link">
                    <div data-i18n="Buttons">Buttons</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-carousel.html" className="menu-link">
                    <div data-i18n="Carousel">Carousel</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-collapse.html" className="menu-link">
                    <div data-i18n="Collapse">Collapse</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-dropdowns.html" className="menu-link">
                    <div data-i18n="Dropdowns">Dropdowns</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-footer.html" className="menu-link">
                    <div data-i18n="Footer">Footer</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-list-groups.html" className="menu-link">
                    <div data-i18n="List Groups">List groups</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-modals.html" className="menu-link">
                    <div data-i18n="Modals">Modals</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-navbar.html" className="menu-link">
                    <div data-i18n="Navbar">Navbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-offcanvas.html" className="menu-link">
                    <div data-i18n="Offcanvas">Offcanvas</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-pagination-breadcrumbs.html" className="menu-link">
                    <div data-i18n="Pagination &amp; Breadcrumbs">Pagination &amp; Breadcrumbs</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-progress.html" className="menu-link">
                    <div data-i18n="Progress">Progress</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-spinners.html" className="menu-link">
                    <div data-i18n="Spinners">Spinners</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-tabs-pills.html" className="menu-link">
                    <div data-i18n="Tabs &amp; Pills">Tabs &amp; Pills</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-toasts.html" className="menu-link">
                    <div data-i18n="Toasts">Toasts</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-tooltips-popovers.html" className="menu-link">
                    <div data-i18n="Tooltips & Popovers">Tooltips &amp; popovers</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="ui-typography.html" className="menu-link">
                    <div data-i18n="Typography">Typography</div>
                  </a>
                </li>
              </ul>
            </li>

            {/* Extended components */}
            <li className="menu-item">
              <a href="javascript:void(0)" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-copy"></i>
                <div data-i18n="Extended UI">Extended UI</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="extended-ui-perfect-scrollbar.html" className="menu-link">
                    <div data-i18n="Perfect Scrollbar">Perfect scrollbar</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="extended-ui-text-divider.html" className="menu-link">
                    <div data-i18n="Text Divider">Text Divider</div>
                  </a>
                </li>
              </ul>
            </li>

            <li className="menu-item">
              <a href="icons-boxicons.html" className="menu-link">
                <i className="menu-icon tf-icons bx bx-crown"></i>
                <div data-i18n="Boxicons">Boxicons</div>
              </a>
            </li>

            {/* Forms & Tables */}
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Forms &amp; Tables</span></li>
            {/* Forms */}
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Elements">Form Elements</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="forms-basic-inputs.html" className="menu-link">
                    <div data-i18n="Basic Inputs">Basic Inputs</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="forms-input-groups.html" className="menu-link">
                    <div data-i18n="Input groups">Input groups</div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="menu-item">
              <a href="javascript:void(0);" className="menu-link menu-toggle">
                <i className="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Form Layouts">Form Layouts</div>
              </a>
              <ul className="menu-sub">
                <li className="menu-item">
                  <a href="form-layouts-vertical.html" className="menu-link">
                    <div data-i18n="Vertical Form">Vertical Form</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="form-layouts-horizontal.html" className="menu-link">
                    <div data-i18n="Horizontal Form">Horizontal Form</div>
                  </a>
                </li>
              </ul>
            </li>
            {/* Tables */}
            <li className="menu-item">
              <a href="tables-basic.html" className="menu-link">
                <i className="menu-icon tf-icons bx bx-table"></i>
                <div data-i18n="Tables">Tables</div>
              </a>
            </li>
            {/* Misc */}
            <li className="menu-header small text-uppercase"><span className="menu-header-text">Misc</span></li>
            <li className="menu-item">
              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                target="_blank"
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bx-support"></i>
                <div data-i18n="Support">Support</div>
              </a>
            </li>
            <li className="menu-item">
              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                target="_blank"
                className="menu-link"
              >
                <i className="menu-icon tf-icons bx bx-file"></i>
                <div data-i18n="Documentation">Documentation</div>
              </a>
            </li>
          </ul>
        </aside>
        {/* / Menu */}

        {/* Layout container */}
        <div className="layout-page">
          {/* Navbar */}

          <nav
            className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
            id="layout-navbar"
          >
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
              <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i className="bx bx-menu bx-sm"></i>
              </a>
            </div>

            <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
              {/* Search */}
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center">
                  <i className="bx bx-search fs-4 lh-0"></i>
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search..."
                    aria-label="Search..."
                  />
                </div>
              </div>
              {/* /Search */}

              <ul className="navbar-nav flex-row align-items-center ms-auto">
                {/* Place this tag where you want the button to render. */}
                <li className="nav-item lh-1 me-3">
                  <a
                    className="github-button"
                    href="https://github.com/themeselection/sneat-html-admin-template-free"
                    data-icon="octicon-star"
                    data-size="large"
                    data-show-count="true"
                    aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
                    >Star</a>
                </li>

                {/* User */}
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <a className="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                    <div className="avatar avatar-online">
                      <img src="../assets/img/avatars/1.png" alt="img" className="w-px-40 h-auto rounded-circle" />
                    </div>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        <div className="d-flex">
                          <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                              <img src="../assets/img/avatars/1.png" alt="img" className="w-px-40 h-auto rounded-circle" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <span className="fw-semibold d-block">John Doe</span>
                            <small className="text-muted">Admin</small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-user me-2"></i>
                        <span className="align-middle">My Profile</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <i className="bx bx-cog me-2"></i>
                        <span className="align-middle">Settings</span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <span className="d-flex align-items-center align-middle">
                          <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                          <span className="flex-grow-1 align-middle">Billing</span>
                          <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <div className="dropdown-divider"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="auth-login-basic.html">
                        <i className="bx bx-power-off me-2"></i>
                        <span className="align-middle">Log Out</span>
                      </a>
                    </li>
                  </ul>
                </li>
                {/* / User */}
              </ul>
            </div>
          </nav>

          {/* / Navbar */}

          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}

            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">UI Elements /</span> Cards Basic</h4>

              {/* Examples */}
              <div className="row mb-5">
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/2.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the cards content.
                      </p>
                      <a href="javascript:void(0)" className="btn btn-outline-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                    </div>
                    <img className="img-fluid" src="../assets/img/elements/13.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <p className="card-text">Bear claw sesame snaps gummies chocolate.</p>
                      <a href="javascript:void(0);" className="card-link">Card link</a>
                      <a href="javascript:void(0);" className="card-link">Another link</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <h6 className="card-subtitle text-muted">Support card subtitle</h6>
                      <img
                        className="img-fluid d-flex mx-auto my-4"
                        src="../assets/img/elements/4.jpg"
                        alt="Card image cap"
                      />
                      <p className="card-text">Bear claw sesame snaps gummies chocolate.</p>
                      <a href="javascript:void(0);" className="card-link">Card link</a>
                      <a href="javascript:void(0);" className="card-link">Another link</a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Examples */}

              {/* Content types */}
              <h5 className="pb-1 mb-4">Content types</h5>

              <div className="row mb-5">
                <div className="col-md-6 col-lg-4">
                  <h6 className="mt-2 text-muted">Body</h6>
                  <div className="card mb-4">
                    <div className="card-body">
                      <p className="card-text">
                        This is some text within a card body. Jelly lemon drops tiramisu chocolate cake cotton candy
                        soufflé oat cake sweet roll. Sugar plum marzipan dragée topping cheesecake chocolate bar. Danish
                        muffin icing donut.
                      </p>
                    </div>
                  </div>
                  <h6 className="mt-2 text-muted">Titles, text, and links</h6>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <div className="card-subtitle text-muted mb-3">Card subtitle</div>
                      <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the cards content.
                      </p>
                      <a href="javascript:void(0)" className="card-link">Card link</a>
                      <a href="javascript:void(0)" className="card-link">Another link</a>
                    </div>
                  </div>
                  <h6 className="mt-2 text-muted">List groups</h6>
                  <div className="card mb-4">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Cras justo odio</li>
                      <li className="list-group-item">Dapibus ac facilisis in</li>
                      <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <h6 className="mt-2 text-muted">Images</h6>
                  <div className="card mb-4">
                    <img className="card-img-top" src="../assets/img/elements/5.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the cards content.
                      </p>
                      <p className="card-text">
                        Cookie topping caramels jujubes gingerbread. Lollipop apple pie cupcake candy canes cookie ice
                        cream. Wafer chocolate bar carrot cake jelly-o.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <h6 className="mt-2 text-muted">Kitchen sink</h6>
                  <div className="card">
                    <img className="card-img-top" src="../assets/img/elements/7.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">Some quick example text to build on the card title.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Cras justo odio</li>
                      <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-body">
                      <a href="javascript:void(0)" className="card-link">Card link</a>
                      <a href="javascript:void(0)" className="card-link">Another link</a>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="pb-1 mb-4 text-muted">Header and footer</h6>
              <div className="row mb-5">
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <div className="card-header">Featured</div>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to additional content natural lead-in to
                        additional content.
                      </p>
                      <a href="javascript:void(0)" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card">
                    <h5 className="card-header">Quote</h5>
                    <div className="card-body">
                      <blockquote className="blockquote mb-0">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.Lorem
                          ipsum dolor sit amet, consectetur.
                        </p>
                        <footer className="blockquote-footer">
                          Someone famous in
                          <cite title="Source Title">Source Title</cite>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 mb-3">
                  <div className="card text-center">
                    <div className="card-header">Featured</div>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural.</p>
                      <a href="javascript:void(0)" className="btn btn-primary">Go somewhere</a>
                    </div>
                    <div className="card-footer text-muted">2 days ago</div>
                  </div>
                </div>
              </div>
              {/*/ Content types */}

              {/* Text alignment */}
              <h5 className="pb-1 mb-4">Text alignment</h5>
              <div className="row mb-5">
                <div className="col-md-6 col-lg-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="javascript:void(0)" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card text-center mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="javascript:void(0)" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="card text-end mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="javascript:void(0)" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>
              </div>
              {/*/ Text alignment */}

              {/* Images */}
              <h5 className="pb-1 mb-4">Images caps & overlay</h5>
              <div className="row mb-5">
                <div className="col-md-6 col-xl-4">
                  <div className="card mb-3">
                    <img className="card-img-top" src="../assets/img/elements/18.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                      </p>
                      <p className="card-text">
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                      </p>
                      <p className="card-text">
                        <small className="text-muted">Last updated 3 mins ago</small>
                      </p>
                    </div>
                    <img className="card-img-bottom" src="../assets/img/elements/1.jpg" alt="Card image cap" />
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-dark border-0 text-white">
                    <img className="card-img" src="../assets/img/elements/11.jpg" alt="Card image" />
                    <div className="card-img-overlay">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a wider card with supporting text below as a natural lead-in to additional content. This
                        content is a little bit longer.
                      </p>
                      <p className="card-text">Last updated 3 mins ago</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*/ Images */}

              {/* Horizontal */}
              <h5 className="pb-1 mb-4">Horizontal</h5>
              <div className="row mb-5">
                <div className="col-md">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img className="card-img card-img-left" src="../assets/img/elements/12.jpg" alt="Card image" />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer.
                          </p>
                          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a natural lead-in to additional content.
                            This content is a little bit longer.
                          </p>
                          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <img className="card-img card-img-right" src="../assets/img/elements/17.jpg" alt="Card image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*/ Horizontal */}

              {/* Style variation */}
              <h5 className="pb-1 mb-4">Style variation</h5>
              <div className="row">
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-primary text-white mb-3">
                    <div className="card-header">Header</div>
                    <div className="card-body">
                      <h5 className="card-title text-white">Primary card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-secondary text-white mb-3">
                    <div className="card-header">Header</div>
                    <div className="card-body">
                      <h5 className="card-title text-white">Secondary card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-success text-white mb-3">
                    <div className="card-header">Header</div>
                    <div className="card-body">
                      <h5 className="card-title text-white">Success card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-danger text-white mb-3">
                    <div className="card-header">Header</div>
                    <div className="card-body">
                      <h5 className="card-title text-white">Danger card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-warning text-white mb-3">
                    <div className="card-header">Header</div>
                    <div className="card-body">
                      <h5 className="card-title text-white">Warning card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card bg-info text-white mb-3">
                    <div className="card-header">Header</div>
                    <div className="card-body">
                      <h5 className="card-title text-white">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Outline */}
              <div className="row">
                <div className="col-md-6 col-xl-4">
                  <div className="card shadow-none bg-transparent border border-primary mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Primary card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card shadow-none bg-transparent border border-secondary mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Secondary card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card shadow-none bg-transparent border border-success mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Success card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card shadow-none bg-transparent border border-danger mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Danger card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card shadow-none bg-transparent border border-warning mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Warning card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xl-4">
                  <div className="card shadow-none bg-transparent border border-info mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Info card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up.</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*/ Style variation */}

              {/* Card layout */}
              <h5 className="pb-1 my-5">Card layout</h5>

              {/* Card Groups */}
              <h6 className="pb-1 mb-4 text-muted">Card Groups</h6>
              <div className="card-group mb-5">
                <div className="card">
                  <img className="card-img-top" src="../assets/img/elements/4.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural lead-in to additional content. This
                      content is a little bit longer.
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
                <div className="card">
                  <img className="card-img-top" src="../assets/img/elements/5.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This card has supporting text below as a natural lead-in to additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
                <div className="card">
                  <img className="card-img-top" src="../assets/img/elements/1.jpg" alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural lead-in to additional content. This
                      card has even longer content than the first to show that equal height action.
                    </p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </div>
                </div>
              </div>

              {/* Grid Card */}
              <h6 className="pb-1 mb-4 text-muted">Grid Card</h6>
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                <div className="col">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/2.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/13.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/4.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/18.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/19.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="card h-100">
                    <img className="card-img-top" src="../assets/img/elements/20.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Masonry */}
              <h6 className="pb-1 mb-4 text-muted">Masonry</h6>
              <div className="row" data-masonry='{"percentPosition": true }'>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card">
                    <img className="card-img-top" src="../assets/img/elements/5.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title that wraps to a new line</h5>
                      <p className="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content.
                        This content is a little bit longer.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card p-3">
                    <figure className="p-3 mb-0">
                      <blockquote className="blockquote">
                        <p>A well-known quote, contained in a blockquote element.</p>
                      </blockquote>
                      <figcaption className="blockquote-footer mb-0 text-muted">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card">
                    <img className="card-img-top" src="../assets/img/elements/18.jpg" alt="Card image cap" />
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This card has supporting text below as a natural lead-in to additional content.
                      </p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card bg-primary text-white text-center p-3">
                    <figure className="mb-0">
                      <blockquote className="blockquote">
                        <p>A well-known quote, contained in a blockquote element.</p>
                      </blockquote>
                      <figcaption className="blockquote-footer mb-0 text-white">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">This card has a regular title and short paragraph of text below it.</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card">
                    <img className="card-img-top" src="../assets/img/elements/4.jpg" alt="Card image cap" />
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card p-3 text-end">
                    <figure className="mb-0">
                      <blockquote className="blockquote">
                        <p>A well-known quote, contained in a blockquote element.</p>
                      </blockquote>
                      <figcaption className="blockquote-footer mb-0 text-muted">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                      </figcaption>
                    </figure>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Card title</h5>
                      <p className="card-text">
                        This is another card with title and supporting text below. This card has some additional content
                        to make it slightly taller overall.
                      </p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
              {/*/ Card layout */}
            </div>
            {/* / Content */}

            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                <div className="mb-2 mb-md-0">
                  ©
                  <script>
                    document.write(new Date().getFullYear());
                  </script>
                  , made with ❤️ by
                  <a href="https://themeselection.com" target="_blank" className="footer-link fw-bolder">ThemeSelection</a>
                </div>
                <div>
                  <a href="https://themeselection.com/license/" className="footer-link me-4" target="_blank">License</a>
                  <a href="https://themeselection.com/" target="_blank" className="footer-link me-4">More Themes</a>

                  <a
                    href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                    target="_blank"
                    className="footer-link me-4"
                    >Documentation</a
                  >

                  <a
                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                    target="_blank"
                    className="footer-link me-4"
                    >Support</a
                  >
                </div>
              </div>
            </footer>
            {/* / Footer */}

            <div className="content-backdrop fade"></div>
          </div>
          {/* Content wrapper */}
        </div>
        {/* / Layout page */}
      </div>

      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
    </>
  )
}