import React, { lazy } from 'react'

import Suspense from '@nocode-toolkit/ui/components/system/Suspense'
import Header from '@nocode-toolkit/ui/components/system/Header'
import Tree from '@nocode-toolkit/ui/components/content/Tree'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const Layout = ({
  children,
}) => {
  return (
    <div className="layout-root">
      <Header>
        <link rel="stylesheet" type="text/css" href="/css/index.css" />
      </Header>
      <Suspense
        Component={ NocodeTopbar }
      />
      <div className="layout-header">
        Header
      </div>
      <div className="layout-main">
        <div className="layout-sidebar">
          <Tree
            section="sidebar"
          />
        </div>
        <div className="layout-content">
          This is the children
        </div>
      </div>
      <Suspense
        Component={ UIElements }
      />
    </div>
  )
}

export default Layout
