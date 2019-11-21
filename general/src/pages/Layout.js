import React, { lazy, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
import Divider from '@material-ui/core/Divider'

import Suspense from '@nocode-toolkit/ui/components/system/Suspense'
import Header from '@nocode-toolkit/ui/components/layout/Header'
import styles from '@nocode-toolkit/ui/styles/layout'

import Tree from '@nocode-toolkit/ui/components/content/Tree'
import NavBar from '@nocode-toolkit/ui/components/content/NavBar'
import Copyright from '@nocode-toolkit/ui/components/widgets/Copyright'
import Logo from '@nocode-toolkit/ui/components/widgets/Logo'

const NocodeTopbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/layout/NocodeTopbar'))
const UIElements = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-toolkit/ui/components/system/UIElements'))

const useStyles = makeStyles(styles)

const Layout = ({
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <div className={ classes.root }>
      <Header />
      <Suspense
        Component={ NocodeTopbar }
      />
      <AppBar 
        position="static" 
        className={ classes.appBar }
      >
        <Toolbar classes={{
          root: classes.toolbar,
        }}>
          <IconButton 
            className={ classes.smallNav }
            aria-label="Menu"
            onClick={ openDrawer }
          >
            <MenuIcon className={ classes.smallNavButton } />
          </IconButton>
          <Drawer 
            open={ drawerOpen }
            onClose={ closeDrawer }
            className={ classes.smallNav }
          >
            <div className={ [classes.drawer, classes.smallNav].join(' ') }>
              <Tree
                section="sidebar"
                onClick={ closeDrawer }
              />
            </div>
          </Drawer>
          <div className={ classes.appBarTitle }>
            <Logo />
          </div>
          <NavBar
            section="topbar"
            withHome
          />
        </Toolbar>
      </AppBar>
      <div className={ classes.main }>
        <div className={ [classes.drawer, classes.largeNav].join(' ') }>
          <Tree
            section="sidebar"
            onClick={ closeDrawer }
          />
        </div>
        <main className={ classes.content }>
          <div className={ classes.contentChildren }>
            { children }
          </div>
          <Divider />
          <div className={ classes.footer }>
            <Toolbar classes={{
              root: classes.toolbar,
            }}>
              <NavBar
                section="footer"
              >
                <Copyright />
              </NavBar>
            </Toolbar>
          </div>
        </main>
      </div>
      <Suspense
        Component={ UIElements }
      />
    </div>
  )
}

export default Layout
