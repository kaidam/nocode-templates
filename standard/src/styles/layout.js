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
      '.document-container':{
        flexBasis: '100%',
      }
    },
    root: {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    appbar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      minHeight: [`${theme.layout.topbarHeight}px`, '!important'],
      //backgroundColor: theme.palette.primary.main,
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      flexGrow: 0,
    },
    headerToolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      height: [`${theme.layout.topbarHeight}px`, '!important'],
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

    main: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      minHeight: `calc(100% - ${theme.layout.topbarHeight}px)`,
    },

    contentContainer: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(0, 0, 0, 0.001)',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },

    contentToolbar: {
      flexGrow: 0,
      height: '100%',
      maxWidth: '1024px',
      margin: '0px auto',
      paddingRight: '108px',
      paddingLeft: '86px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },

    smallContentToolbar: {
      flexGrow: 0,
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
    },

    flexGrowZero: {
      flexGrow: 0,
    },

    contentChildren: {
      flexGrow: 1,
      height: '100%',
      width: '100%',
      maxWidth: '832px',
      margin: '0px auto',
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
      display: 'flex',
    },

    footer: {
      flexGrow: 0,
      width: '100%',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },

    footerToolbar: {
      padding: 0,
    },

    footerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
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
