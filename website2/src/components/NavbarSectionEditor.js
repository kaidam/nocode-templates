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
  contrast,
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
    contrast,
  })

  return (
    <div className={ classes.root }>
      <MenuButton
        header={ ghostFolder ? ghostFolder.name : '' }
        getButton={ getSettingsButton }
        getItems={ getSettingsItems }
      />
    </div>
  )
}

export default NavbarSectionEditor