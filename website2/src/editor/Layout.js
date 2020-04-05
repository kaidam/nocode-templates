import React, { useCallback } from 'react'

import Layout from '@nocode-toolkit/frontend/components/layout/Layout'

import withLayoutEditor from '../hooks/withLayoutEditor'

const LayoutEditor = ({
  content_id,
  layout_id,
}) => {

  const {
    getAddMenu,
    onDeleteCell,
  } = withLayoutEditor({
    content_id,
    layout_id
  })

  return (
    <Layout
      content_id={ content_id }
      layout_id={ layout_id }
      getAddMenu={ getAddMenu }
      onDeleteCell={ onDeleteCell }
    />
  )
}

export default LayoutEditor