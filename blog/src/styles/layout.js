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
      overflowX: 'hidden',
    },
    appbar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      height: [`${theme.layout.topbarHeight}px`, '!important'],
      backgroundColor: '#F2F2F2',
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

    main: {
      height: `calc(100% - ${theme.layout.topbarHeight}px)`,
      width: '100%',
      bottom: 0,
      left: 0,
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
    },

    

    footer: {
      width: '100%',
      color: theme.palette.common.white,
      minHeight: [`${theme.layout.footerHeight}px`, '!important'],
      //height: [`${theme.layout.footerHeight}px`, '!important'],
      backgroundColor: theme.palette.primary.main,
    },

    footerToolbar: {
      padding: 0,
      //height: '100%',
    },

    footerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      //height: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      // paddingRight: theme.spacing(1),
      
      // paddingBottom: theme.spacing(2),
    },

    footerCopyright: {
      flexGrow: 0,
    },

    footerFiller: {
      flexGrow: 1,
    },

    footerNavBar: {
      paddingTop: theme.spacing(1),
      flexGrow: 0,
    },

    globalSettings: ({
      
    }) => ({
      marginLeft: theme.spacing(2),
    }),

    searchHolder: {
      padding: theme.spacing(1),
    },
  }
})

export default styles
