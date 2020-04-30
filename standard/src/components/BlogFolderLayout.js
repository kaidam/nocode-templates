import React, { lazy } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Link from '@nocode-works/template/components/widgets/Link'
import contentSelectors from '@nocode-works/template/store/selectors/content'
import Suspense from '@nocode-works/template/components/system/Suspense'
import ImageWidgetFactory from '@nocode-works/template/widgets/image'

import utils from '../utils'

const ImageWidget = ImageWidgetFactory().Render

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5),
  },
  row: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3), 
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  img: {
    flexGrow: 0,
    width: '250px',
    marginLeft: theme.spacing(2),
    '& img': {
      boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.2)',
    }
  },
  content: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
  },
  info: {
    color:'#999',
    paddingTop: '5px',
    paddingBottom: '5px',
    borderTop: '1px solid #e5e5e5',
    borderBottom: '1px solid #e5e5e5',
  },
  bold: {
    fontWeight: 500,
    color:'#666',
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
      {
        children
          .map((child, i) => {
            const {
              name,
              modifiedTime,
              lastModifyingUser,
            } = child
            const image = utils.extractImage({
              item: child,
            })
            return (
              <div
                key={ i }
                className={ classes.row }
              >
                <div className={ classes.content }>
                  <Link
                    path={ child.route.path }
                    name={ child.route.name }
                    className={ classes.link }
                  >
                    <Typography
                      variant="h6"
                    >
                      { name }
                    </Typography>
                    <div className={ classes.info }>
                      Updated <span className={ classes.bold }>{ new Date(modifiedTime).toLocaleString() }</span> by <span className={ classes.bold }>{ lastModifyingUser }</span>
                    </div>
                  </Link>
                </div>
                <div className={ classes.img }>
                  {
                    image && (
                      <ImageWidget
                        copyrightBelow
                        data={ image.data }
                        link={ child.route }
                      />
                    )
                  }
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

export default BlogFolderLayout