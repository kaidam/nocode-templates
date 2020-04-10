import React, { useCallback } from 'react'

import Layout from '@nocode-works/template/components/layout/Layout'

import withLayoutEditor from '../hooks/withLayoutEditor'

const LayoutEditor = ({
  content_id,
  layout_id,
}) => {

  const {
    getAddMenu,
  } = withLayoutEditor({
    content_id,
    layout_id
  })

  return (
    <Layout
      content_id={ content_id }
      layout_id={ layout_id }
      getAddMenu={ getAddMenu }
    />
  )
}

export default LayoutEditor