import React, { lazy, useState } from 'react'

import Suspense from '@nocode-toolkit/ui/components/system/Suspense'
import Header from '@nocode-toolkit/ui/components/layout/Header'

import Tree from '@nocode-toolkit/ui/components/content/Tree'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/layout/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const Layout = ({
  children,
}) => {
  return (
    <div>
      <Header />
      <Suspense
        Component={ NocodeTopbar }
      />
      <div>
        Header
      </div>
      <div>
        <div>
          <Tree
            section="sidebar"
            onClick={ closeDrawer }
          />
        </div>
      </div>
      <Suspense
        Component={ UIElements }
      />
    </div>
  )
}

export default Layout
