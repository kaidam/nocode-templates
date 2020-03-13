import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'

import AppLayout from '@nocode-toolkit/frontend/components/system/Layout'
import templateSelectors from '@nocode-toolkit/frontend/store/selectors/template'

import useStyles from '../styles/layout'

const Layout = ({
  children,
}) => {
  const classes = useStyles()
  const contentRef = useRef(null)

  const {
    showUI,
    settings,
    route,
  } = useSelector(templateSelectors.core)

  let hasLeftNavigation = false
  let hasRightNavigation = false

  useEffect(() => {
    contentRef.current.scrollTop = 0
  }, [route])

  return (
    <div className={ classes.root }>
      <AppLayout
        material
      >
        <AppBar 
          position="static" 
          className={ classes.appbar }
        >
          <Toolbar classes={{
            root: classes.headerToolbar,
          }}>
            {
              // hasLeftNavigation && (
              //   <NavDrawer
              //     Component={ Tree }
              //     section="sidebar"
              //   />
              // )
            }
            <div className={ classes.appBarTitle }>
              {/* <Logo /> */}LOGO
            </div>
            {/* <NavBar
              section="topbar"
              withHome
            /> */}
            {/* {
              hasRightNavigation && (
                <NavDrawer
                  Component={ Tree }
                  section="rightbar"
                  anchor="right"
                />
              )
            } */}
          </Toolbar>
        </AppBar>
        <div className={ classes.main }>
          {
            hasLeftNavigation && (
              <div className={ navbarClassname }>
                {/* <Tree
                  section="sidebar"
                /> */}
              </div>
            )
          }
          <main className={ classes.content } ref={ contentRef }>
            <div className={ classes.contentChildren }>
              { children }
            </div>
            <Divider />
            <div className={ classes.footer }>
              <Toolbar classes={{
                root: classes.footerToolbar,
              }}>
                <div className={ classes.footerContainer }>
                  <div className={ classes.footerCopyright }>
                    {/* <Copyright /> */}
                  </div>
                  <div className={ classes.footerNavBar }>
                    {/* <NavBar
                      section="footer"
                      contrast
                      vertical
                      align="right"
                    /> */}
                  </div>
                </div>
              </Toolbar>
            </div>
          </main>
          {
            hasRightNavigation && (
              <div className={ navbarClassname }>
                {/* <Tree
                  section="rightbar"
                /> */}
              </div>
            )
          }
        </div>
      </AppLayout>
    </div>
  )
}

export default Layout