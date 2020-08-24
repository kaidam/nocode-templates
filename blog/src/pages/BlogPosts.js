import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useSelector } from 'react-redux'
import Link from '@nocode-works/template/components/widgets/Link'
import UnsplashCopyright from '@nocode-works/template//components/widgets/UnsplashCopyright'

import routerSelectors from '@nocode-works/template/store/selectors/router'
import contentSelectors from '@nocode-works/template/store/selectors/content'
import websiteSelectors from '@nocode-works/template/store/selectors/website'

import TagHeroSection from './TagHeroSection'
import TagLinks from '../components/TagLinks'

import utils from '../utils'

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
    marginRight: theme.spacing(2),
    width: '250px',
    marginLeft: theme.spacing(2),
    '& img': {
      width: '100%',
      boxShadow: '3px 3px 3px 0px rgba(0,0,0,0.2)',
      border: '1px solid #000'
    }
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  documentInfo: {
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
  summary: {
    color:'#999',
    paddingTop: '5px',
    paddingBottom: '5px',
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
  copyright: {
    fontSize: '0.8em',
    color: '#999'
  }
}))


const BlogPosts = ({
  section = 'blogposts',
  tagField = 'blogpost_tags',
} = {}) => {

  const classes = useStyles()

  const route = useSelector(routerSelectors.route)
  const websiteData = useSelector(websiteSelectors.websiteData)
  const tag = route.params.tag
  const treeSelector = useMemo(contentSelectors.sectionTree, [])
  const items = useSelector(state => treeSelector(state, section))

  const blogPosts = useMemo(() => {
    return items.filter(item => {
      if(!tag) return true
      const postTags = item.annotation && item.annotation[tagField] ?
        item.annotation[tagField] :
        null
      if(!postTags) return false
      return postTags.indexOf(tag) >= 0
    })
  }, [
    items,
    tag,
    tagField,
  ])

  const tagId = utils.tagId(tag)
  const tagTitle = utils.tagTitle(tag, websiteData)

  return (
    <div className={ classes.root }>
      <TagHeroSection
        tag={ tag }
        defaultTitle={ tagTitle }
        prefix={ `blogsection_${tagId}` }
      />
      <div className={ classes.contentChildren }>
        {
          blogPosts
            .filter(child => child.route ? true : false)
            .map((child, i) => {
              const {
                name,
                annotation,
                modifiedTime,
                lastModifyingUser,
              } = child

              const image = annotation.image

              return (
                <div
                  key={ i }
                  className={ classes.row }
                >
                  <div className={ classes.content }>
                    <div className={ classes.img }>
                      {
                        image && (
                          <Link
                            path={ child.route.path }
                            name={ child.route.name }
                            className={ classes.link }
                          >
                            <img src={ image.url } />
                          </Link>
                        )
                      }
                      {
                        image && (
                          <div className={ classes.copyright }>
                            <UnsplashCopyright
                              unsplash={ image.unsplash }
                            />
                          </div>
                        )
                      }
                    </div>
                    <div className={ classes.documentInfo }>
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
                      </Link>
                      {
                        annotation && annotation.summary && (
                          <div className={ classes.summary }>
                            { annotation.summary }
                          </div>
                        )
                      }
                      <div className={ classes.info }>
                        Updated <span className={ classes.bold }>{ new Date(modifiedTime).toLocaleString() }</span> { lastModifyingUser && (<>by <span className={ classes.bold }>{ lastModifyingUser }</span></>) }
                      </div>
                      
                      {
                        annotation && annotation.blogpost_tags && annotation.blogpost_tags.length > 0 && (
                          <TagLinks
                            tags={ annotation.blogpost_tags }
                          />
                        )
                      }
                    </div>
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
