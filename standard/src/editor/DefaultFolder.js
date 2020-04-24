import React from 'react'
import CoreDefaultFolder from '@nocode-works/template/components/document/DefaultFolder'
import useMenuButton from '@nocode-works/template/components/hooks/useMenuButton'
import useDocumentEditor from '@nocode-works/template/components/hooks/useDocumentEditor'

const DefaultFolder = ({
  node,
}) => {

  const {
    getAddContentItems,
  } = useDocumentEditor({
    node,
  })

  const {
    menus,
    onClick,
  } = useMenuButton({
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