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

      // the container for the logo div
      '.nocode-logo-container': {
        display: 'flex',
        flexDirection: 'column',
      },
      // the logo image
      '.nocode-logo-image': {
        height: '20px'
      },
      // the image in the logo
      '.nocode-logo-text': {
        color: 'red',
      },

      '.nocode-copyright-container': {
        padding: '1px',
      },

      '.nocode-copyright-text': {
        color: 'red',
      },

      '.nocode-navbar-open-button-icon': {
        color: 'red',
      },

      '.nocode-drawer-open-button-icon': {
        color: 'red',
      },

      // make these look as horrible as I can :-)
      '.nocode-navbar-item': {
        borderRadius: 0,
        backgroundColor: 'red',
        color: 'green !important'
      },

      '.nocode-navbar-item-hover': {
        borderRadius: 10,
        backgroundColor: 'yellow !important',
      },

      '.nocode-tree-list': {
        backgroundColor: 'pink'
      },

      '.nocode-tree-item': {
        padding: '20px',
        '&:hover': {
          backgroundColor: 'orange !important',
        }
      },

      '.nocode-tree-item-active': {
        backgroundColor: 'blue !important'
      },

      '.nocode-tree-text': {
        textDecoration: 'underline !important'
      },
    },
    root: {
      height: '100%',
      overflowX: 'hidden',
    },
    appbar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      minHeight: [`${theme.layout.topbarHeight}px`, '!important'],
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
    },
    headerToolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      height: [`${theme.layout.topbarHeight}px`, '!important'],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    appBarTitle: {
      flexGrow: 1,
      color: theme.palette.primary.main,
      padding: theme.spacing(2),
    },
    appBarSmallMenu: {
      flexGrow: 0,
    },
    appBarFiller: {
      width: '38px',
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
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

    contentToolbar: {
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
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing(2),
    },

    contentChildrenContainer: {
      margin: '0px auto',
      minHeight: `calc(100% - ${theme.layout.footerHeight}px - 10px)`,
    },

    footer: {
      width: '100%',
      color: theme.palette.common.white,
      minHeight: [`${theme.layout.footerHeight}px`, '!important'],
      //height: [`${theme.layout.footerHeight}px`, '!important'],
      backgroundColor: theme.palette.primary.main,
    },

    footerToolbar: {
      padding: theme.spacing(2),
      //height: '100%',
    },

    footerContainer: {
      display: 'flex',
      flexDirection: 'column',
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
      position: 'absolute',
      top: '10px',
      right: '10px',
    }),

    searchHolder: {
      padding: theme.spacing(1),
    },

    document: {
      maxWidth: '832px',
      margin: '0px auto',
      minHeight: `calc(100% - ${theme.layout.footerHeight}px - 10px)`,
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

export default styles
