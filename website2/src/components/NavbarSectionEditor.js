import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import MenuButton from '@nocode-toolkit/frontend/components/widgets/MenuButton'

import withSectionEditor from '../hooks/withSectionEditor'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
}))

const NavbarSectionEditor = ({
  section,
}) => {
  const classes = useStyles()

  const {
    ghostFolder,
    getAddButton,
    getSettingsButton,
    getAddItems,
    getSettingsItems,
  } = withSectionEditor({
    section,
  })

  return (
    <div className={ classes.root }>
      <MenuButton
        header={ ghostFolder ? ghostFolder.name : '' }
        getButton={ getSettingsButton }
        getItems={ getSettingsItems }
      />
      <MenuButton
        header={ ghostFolder ? `${ghostFolder.name} : Add` : '' }
        getButton={ getAddButton }
        getItems={ getAddItems }
      />
    </div>
  )
}

export default NavbarSectionEditor