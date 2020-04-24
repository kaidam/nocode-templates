import React, { useCallback } from 'react'

import Layout from '@nocode-works/template/components/layout/Layout'
import useLayoutEditor from '@nocode-works/template/components/hooks/useLayoutEditor'

const LayoutEditor = ({
  content_id,
  layout_id,
}) => {

  const {
    getAddMenu,
  } = useLayoutEditor({
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