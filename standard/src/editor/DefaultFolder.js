import React from 'react'
import CoreDefaultFolder from '@nocode-works/template/components/document/DefaultFolder'
import withMenuButton from '@nocode-works/template/components/hooks/withMenuButton'
import withDocumentEditor from '../hooks/withDocumentEditor'

const DefaultFolder = ({
  node,
}) => {

  const {
    getAddContentItems,
  } = withDocumentEditor({
    node,
  })

  const {
    menus,
    onClick,
  } = withMenuButton({
    getItems: getAddContentItems,
  })

  return (
    <React.Fragment>
      <CoreDefaultFolder
        onClick={ onClick }
      />
      {
        menus
      }
    </React.Fragment>
    
  )
}

export default DefaultFolder