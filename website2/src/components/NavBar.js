import React, { lazy, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import systemSelectors from '@nocode-toolkit/frontend/store/selectors/system'

import Suspense from '@nocode-toolkit/frontend/components/system/Suspense'
import SystemNavBar from '@nocode-toolkit/frontend/components/navbar/NavBar'

const ItemEditor = lazy(() => import(/* webpackChunkName: "ui" */ './ItemEditor'))
const NavbarSectionEditor = lazy(() => import(/* webpackChunkName: "ui" */ './NavbarSectionEditor'))

const useStyles = makeStyles(theme => ({
  root: ({
    vertical,
  }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: vertical ?
      'flex-start' :
      'center',
  }),
  content: ({
    vertical,
  }) => ({
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
    padding: vertical ?
      theme.spacing(1) :
      0,
  }),
  editor: ({
    vertical,
  }) => ({
    flexGrow: 0,
    paddingTop: vertical ?
      theme.spacing(2) :
      0,
  }),
}))

const NavBar = ({
  small,
  section,
  contrast,
  vertical,
  align,
  withHome,
  onClick,
}) => {
  const classes = useStyles({
    vertical,
    align,
  })
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
          withHome={ withHome }
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
                contrast,
              }}
            />
          </div>
        )
      }
    </div>
  )
}

export default NavBar