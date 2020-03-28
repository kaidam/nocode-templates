import React, { lazy, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import SystemNavBar from '@nocode-toolkit/frontend/components/navbar/NavBar'

const ItemEditor = lazy(() => import(/* webpackChunkName: "ui" */ './ItemEditor'))
const NavbarSectionEditor = lazy(() => import(/* webpackChunkName: "ui" */ './NavbarSectionEditor'))

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
  },
  editor: {
    flexGrow: 0,
  },
}))

const NavBar = ({
  small,
  section,
  contrast,
  vertical,
  align,
  onClick,
}) => {
  const classes = useStyles()
  const showUI = useSelector(systemSelectors.showUI)
  
  return (
    <div
      className={ classes.root }
    >
      <div
        className={ classes.content }
      >
        <SystemNavBar
          section={ section }
          ItemEditorComponent={ ItemEditor }
          small={ small }
          contrast={ contrast }
          vertical={ vertical }
          align={ align }
          onClick={ onClick }
        />
      </div>
      {
        showUI && (
          <div className={ classes.editor }>
            <Suspense
              Component={ NavbarSectionEditor }
              props={{
                section,
              }}
            />
          </div>
        )
      }
    </div>
  )
}

export default NavBar