import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import Actions from '@nocode-toolkit/frontend/utils/actions'
import contentActions from '@nocode-toolkit/frontend/store/modules/content'

import useSection from '@nocode-toolkit/frontend/components/hooks/useSection'

import icons from '@nocode-toolkit/frontend/icons'
import driveUtils from '@nocode-toolkit/frontend/utils/drive'

const MoreVertIcon = icons.moreVert
const AddIcon = icons.add
const LinkIcon = icons.link

const withSectionEditor = ({
  section,
}) => {
  const {
    node,
    annotation,
    ghostFolder,
  } = useSection({
    section,
  })

  const actions = Actions(useDispatch(), {
    onCreateRemoteContent: contentActions.createRemoteContent,
    onCreateLocalContent: contentActions.createLocalContent,
    onEditSection: contentActions.editSection,
  })

  const getAddButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        onClick={ onClick }
      >
        <AddIcon
          fontSize="inherit"
          color="secondary"
        />
      </IconButton>
    )
  }, [])

  const getSettingsButton = useCallback((onClick) => {
    return (
      <IconButton
        size="small"
        onClick={ onClick }
      >
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
    )
  }, [])

  const getAddItems = useCallback(() => {

    const linkItem = {
      title: 'Link',
      icon: LinkIcon,
      handler: () => actions.onCreateLocalContent({
        title: 'Create Link',
        form: 'link',
        location: `section:${section}`,
      })
    }

    return ghostFolder ? [{
      title: 'Folder',
      icon: icons.folder,
      secondaryIcon: icons.drive,
      handler: () => actions.onCreateRemoteContent({
        title: 'Create Folder',
        driver: 'drive',
        form: 'drive.folder',
        parentId: ghostFolder.id,
      })
    },{
      title: 'Document',
      icon: icons.docs,
      secondaryIcon: icons.drive,
      handler: () => actions.onCreateRemoteContent({
        title: 'Create Document',
        driver: 'drive',
        form: 'drive.document',
        parentId: ghostFolder.id,
      })
    }, linkItem] : [linkItem]
  }, [
    ghostFolder,
  ])
  
  const getSettingsItems = useCallback(() => {
    return [
      {
        title: 'Add',
        icon: icons.add,
        items: getAddItems(),
      },

      {
        title: 'Edit',
        icon: icons.edit,
        handler: () => actions.onEditSection({
          title: `Edit Section`,
          form: `section`,
          id: section,
        })
      },

      ghostFolder ? {
        title: 'Open in Drive',
        icon: icons.open,
        secondaryIcon: icons.drive,
        url: driveUtils.getItemUrl(ghostFolder),
      } : null,
    ].filter(i => i)
  }, [
    ghostFolder,
    getAddItems,
  ])

  return {
    node,
    annotation,
    ghostFolder,
    getAddButton,
    getSettingsButton,
    getAddItems,
    getSettingsItems,
  }
}

export default withSectionEditor