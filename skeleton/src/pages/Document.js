import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CoreDocumentPage from '@nocode-works/template/components/document/Page'
import PostHeroSection from './PostHeroSection'

const useStyles = makeStyles(theme => {
  return {
    root: {
      backgroundColor: 'red'
    },
    document: {
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
  }
})

const DocumentPage = ({

} = {}) => {

  const classes = useStyles()

  return (
    <div className={ classes.root }>
      <PostHeroSection />
      <div className={ classes.document }>
        <CoreDocumentPage />
      </div>
    </div>
    
  )
}

export default DocumentPage
