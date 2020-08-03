import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import Link from '@nocode-works/template/components/widgets/Link'
import routerSelectors from '@nocode-works/template/store/selectors/router'
import contentSelectors from '@nocode-works/template/store/selectors/content'

import TagHeroSection from './TagHeroSection'

const useStyles = makeStyles(theme => ({
  root: {
    
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
  },
  contentChildren: {
    maxWidth: '816px',
    margin: '0px auto',
    minHeight: `calc(100% - ${theme.layout.footerHeight}px - 1px)`,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: '96px',
    paddingLeft: '96px',
    [theme.breakpoints.up(theme.layout.largeScreenBreakpoint)]: {
      paddingLeft: '96px',
      paddingRight: '96px',
    },
    [theme.breakpoints.down(theme.layout.smallScreenBreakpoint)]: {
      paddingLeft: [['17px'], '!important'],
      paddingRight: [['17px'], '!important'],
    },
    letterSpacing: '0px',
  },
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

  const tagId = (tag || 'root').toLowerCase().replace(/\W+/g, '_')

  return (
    <div className={ classes.root }>
      <TagHeroSection
        defaultTitle={ tag || 'My Blog' }
        prefix={ `blogsection_${tagId}` }
      />
      <div className={ classes.contentChildren }>
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
    </div>
  )
}

export default BlogPosts
