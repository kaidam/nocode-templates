import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles(theme => {
  return {
    '@global': {
      'body, html, #_nocode_root': {
        backgroundColor: theme.palette.common.white,
        width: '100%',
        height: '100%',
        margin: '0px',
        border: 0,
      },
    },
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    appbar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      height: [`${theme.layout.topbarHeight}px`, '!important'],
      backgroundColor: '#fff',
      borderBottom: '1px solid #666',
    },
    headerToolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      height: [`${theme.layout.topbarHeight}px`, '!important'],
    },

    toolbarControls: {
      width: '70px',
      flexGrow: 0,
      paddingRight: theme.spacing(2),
    },

    toolbarMenuContainer: {
      flexGrow: 1,
      height: '100%',
    },

    toolbarMenu: {
      maxWidth: '1024px',
      margin: 'auto',
      display: 'flex',
      height: '100%',
      alignItems: 'center',
    },

    toolbarMenuLeft: {
      flexGrow: 0,
      justifyContent: 'flex-start',
    },

    toolbarMenuFiller: {
      flexGrow: 1,
    },

    toolbarMenuRight: {
      flexGrow: 0,
      justifyContent: 'flex-end',
    },

    appBarTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
      color: theme.palette.primary.main,
    },

    logoTitle: {
      color: theme.palette.primary.main,
    },

    drawer: {
      height: '100%',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      backgroundColor: theme.palette.background.paper,
    },

    smallDrawer: {
      width: `${theme.layout.drawerWidthSmall}px`,
      minWidth: `${theme.layout.drawerWidthSmall}px`,
    },

    largeDrawer: {
      width: `${theme.layout.drawerWidthLarge}px`,
      minWidth: `${theme.layout.drawerWidthLarge}px`,
    },
    
    largeScreen: {
      display: 'none',
      [theme.breakpoints.up(theme.layout.largeScreenBreakpoint)]: {
        display: 'block',
      },
      [theme.breakpoints.down(theme.layout.smallScreenBreakpoint)]: {
        display: 'none',
      },
      "& *": {
        textDecoration: 'none'
      }
    },
    smallScreen: {
      display: 'none',
      [theme.breakpoints.up(theme.layout.largeScreenBreakpoint)]: {
        display: 'none',
      },
      [theme.breakpoints.down(theme.layout.smallScreenBreakpoint)]: {
        display: 'block',
      },
      "& *": {
        textDecoration: 'none'
      }
    },

    docRoot: {
      height: '100%',
    },

    main: {
      height: `calc(100% - ${theme.layout.topbarHeight}px)`,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },

    contentContainer: {
      flexGrow: 1,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },

    content: {
      flexGrow: 1,
      overflowY: 'auto',
      background: 'rgba(0, 0, 0, 0.001)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    footer: {
      backgroundColor: '#fff',
      borderTop: '1px solid #ccc',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: theme.spacing(1),
    },

    footerContent: {
      width: '100%',
      maxWidth: '1024px',
      margin: '0px auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    footerCopyright: {
      flexGrow: 0,
      paddingLeft: theme.spacing(1),
    },

    footerSocialLinks: {
      flexGrow: 0,
      paddingLeft: theme.spacing(3),
    },

    footerFiller: {
      flexGrow: 1,
    },

    footerSectionContent: {
      flexGrow: 0,
      paddingRight: theme.spacing(1),
    },


    globalSettings: ({
      
    }) => ({
      marginLeft: theme.spacing(2),
      position: 'absolute',
      top: '10px',
      right: '10px',
    }),

    searchHolder: {
      padding: theme.spacing(1),
    },
  }
})

export default styles
