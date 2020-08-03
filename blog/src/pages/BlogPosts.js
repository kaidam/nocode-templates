import React, { lazy, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import Link from '@nocode-works/template/components/widgets/Link'
import CoreDocumentPage from '@nocode-works/template/components/document/Page'

import Hidden from '@material-ui/core/Hidden'

import Suspense from '@nocode-works/template/components/system/Suspense'
import routerSelectors from '@nocode-works/template/store/selectors/router'
import contentSelectors from '@nocode-works/template/store/selectors/content'

const EditableDocumentToolbar = lazy(() => import(/* webpackChunkName: "ui" */ '@nocode-works/template/components/document/EditableDocumentToolbar'))

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


const BlogPosts = ({
  section = 'blogposts',
  tagField = 'blogpost_tags',
} = {}) => {

  const classes = useStyles()

  const route = useSelector(routerSelectors.route)
  const tag = route.params.tag
  const treeSelector = useMemo(contentSelectors.sectionTree, [])
  const items = useSelector(state => treeSelector(state, section))

  const blogPosts = useMemo(() => {
    return items.filter(item => {
      if(!tag) return item
      return item.annotation && item.annotation[tagField] == tag ? true : false
    })
  }, [
    items,
    tag,
    tagField,
  ])

  console.log(blogPosts)

  return (
    <div className={ classes.root }>
      {
        blogPosts
          .map((child, i) => {
            const {
              name,
              modifiedTime,
              lastModifyingUser,
            } = child

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
                      Updated <span className={ classes.bold }>{ new Date(modifiedTime).toLocaleString() }</span> { lastModifyingUser && (<>by <span className={ classes.bold }>{ lastModifyingUser }</span></>) }
                    </div>
                  </Link>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}

export default BlogPosts
