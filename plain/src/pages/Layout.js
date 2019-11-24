import React, { lazy } from 'react'

import Suspense from '@nocode-toolkit/ui/components/system/Suspense'
import Header from '@nocode-toolkit/ui/components/system/Header'
import Tree from '@nocode-toolkit/ui/components/content/Tree'
import NavBar from '@nocode-toolkit/ui/components/content/NavBar'
import Copyright from '@nocode-toolkit/ui/components/widgets/Copyright'
import Logo from '@nocode-toolkit/ui/components/widgets/Logo'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const Layout = ({
  children,
}) => {
  return (
    <React.Fragment>
      <Header>
        <link rel="stylesheet" type="text/css" href="/css/index.css" />
      </Header>
      <div className="layout-root">
        <Suspense
          coreEnabled
          Component={ NocodeTopbar }
        />
        <div className="layout-header">
          <div className="layout-header-logo">
            <Logo />
          </div>
          <div className="layout-header-navbar">
            <NavBar
              section="topbar"
              withHome
            />
          </div>
        </div>
        <div className="layout-container">
          <div className="layout-sidebar">
            <Tree
              section="sidebar"
            />
          </div>
          <div className="layout-main">
            <div className="layout-content">
              { children }
            </div>
            <div className="layout-footer">
              <div className="copyright">
                <Copyright />
              </div>
              <div className="navbar">
                <NavBar
                  section="footer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Suspense
        coreEnabled
        Component={ UIElements }
      />
    </React.Fragment>
  )
}

export default Layout
