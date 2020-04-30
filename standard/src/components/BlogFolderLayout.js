import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Link from '@nocode-works/template/components/widgets/Link'
import contentSelectors from '@nocode-works/template/store/selectors/content'
import Suspense from '@nocode-works/template/components/system/Suspense'

import utils from '../utils'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  row: {
    marginTop: theme.spacing(1), 
  }
}))

const BlogFolderLayout = ({
  node,
  DefaultFolder,
}) => {
  const classes = useStyles()
  const children = useSelector(contentSelectors.routeChildren)

  if(!children || children.length <= 0) {
    return (
      <Suspense>
        <DefaultFolder
          node={ node }
        />
      </Suspense>
    )
  }
  return (
    <div className={ classes.root }>
      <h3>BLOG LAYOUT</h3>
      <ul>
        {
          children
            .map((child, i) => {

              const name = child.name
              const image = utils.extractImage({
                item: child,
              })
              
              return (
                <li
                  key={ i }
                  className={ classes.row }
                >
                  <Link
                    path={ child.route.path }
                    name={ child.route.name }
                  >
                    { child.name }
                  </Link>
                </li>
              )
            })
        }
      </ul>
    </div>
  )
}

export default BlogFolderLayout
