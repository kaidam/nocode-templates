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
        alignItems: 'center',
        height: `${theme.layout.topbarHeight}px`,
      },
      // the logo image
      '.nocode-logo-image': {
        height: '75%',
        padding: '10px',
      },
      // the text in the logo
      '.nocode-logo-text': {
        color: [`${theme.palette.getContrastText(theme.palette.primary.main)} !important`],
        fontWeight: '500',
      },

      '.nocode-copyright-container': {
        padding: '1px',
      },

      '.nocode-copyright-text': {

      },

      '.nocode-navbar-open-button-icon': {
        color: theme.palette.primary.contrastText,
      },

      '.nocode-drawer-open-button-icon': {
        color: theme.palette.primary.contrastText,
      },

      '.nocode-navbar-nav .nocode-navbar-item': {
        color: theme.palette.primary.contrastText,
        backgroundColor: [`${theme.palette.primary.main} !important`],
      },

      '.nocode-navbar-nav .nocode-navbar-item:active': {
        backgroundColor: [`${theme.layout.accentColor} !important`],
      },

      '.nocode-navbar-footer .nocode-navbar-item': {
        borderRadius: 10,
      },

      '.nocode-navbar-footer .nocode-navbar-item:active': {
        backgroundColor: [`${theme.layout.accentColor} !important`],
      },

      '.nocode-navbar-footer .nocode-navbar-item-hover': {
        backgroundColor: [`${theme.palette.primary.dark} !important`],
        color: [`${theme.palette.primary.contrastText} !important`],
      },

      '.nocode-sidebar-left': {
        backgroundColor: theme.layout.backgroundColor,
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
      },

      '.nocode-sidebar-right': {
        backgroundColor: theme.layout.backgroundColor,
        position: 'sticky',
        top: 0,
        alignSelf: 'flex-start',
      },

      '.nocode-sidebar-left .nocode-tree-list .nocode-tree-list': {
        paddingRight: '22px !important',
      },

      '.nocode-sidebar-right .nocode-tree-list .nocode-tree-list': {
        paddingLeft: '22px !important',
      },

      '.nocode-tree-list': {
        display: 'flex',
        flexDirection: 'column',
        // backgroundColor: [`${theme.palette.primary.light} !important`],
      },

      '.nocode-tree-item': {
        color: [`${theme.palette.common.black} !important`],
        backgroundColor: [`${theme.palette.common.white} !important`],
        maxWidth: 'calc( 100% - 8px )',
        // width: 'calc( 100% )',
        // borderRadius: '3px',
        borderRadius: '0 0 16px 0',
        borderBottom: [`3px solid ${theme.palette.primary.light} !important`],
        borderRight: [`3px solid ${theme.palette.primary.light} !important`],
        padding: '6px',
        margin: '4px',
        '&:hover': {
          backgroundColor: [`${theme.palette.primary.main} !important`],
          color: [`${theme.palette.primary.contrastText} !important`],
          '&: > span': {
            color: [`${theme.palette.primary.contrastText} !important`],
          },
        },
      },

      '.nocode-tree-item-active': {
        backgroundColor: [`${theme.layout.accentColor} !important`],
        borderBottom: [`3px solid ${theme.layout.accentColor} !important`],
        borderRight: [`3px solid ${theme.layout.accentColor} !important`],
      },

      '.nocode-tree-item-active .nocode-tree-text span': {
        color: [`${theme.palette.getContrastText(theme.layout.accentColor)} !important`],
      },
    },
    root: {
      height: '100%',
    },
    // Page Breakpoints
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

    // Topbar
    appbar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      minHeight: [`${theme.layout.topbarHeight}px`, '!important'],
      backgroundColor: theme.palette.primary.main,
      boxShadow: 'none',
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
    },
    headerToolbar: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      minHeight: [`${theme.layout.topbarHeight}px`, '!important'],
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    appBarTitle: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    appBarSmallMenu: {
      flexGrow: 0,
    },
    appBarFiller: {
      width: '38px',
    },
    // Structure
    main: {
      minHeight: `calc(100vw - 143px - ${theme.layout.topbarHeight}px - ${theme.layout.footerHeight}px)`,
      display: 'flex',
      flexDirection: 'row',
    },
    // Sidebar width
    smallDrawer: {
      minWidth: [`${theme.layout.drawerWidthSmall}px`],
      maxWidth: [`${theme.layout.drawerWidthSmall}px`],
    },

    largeDrawer: {
      minWidth: [`${theme.layout.drawerWidthLarge}px`],
      maxWidth: [`${theme.layout.drawerWidthLarge}px`],
    },

    //Layout and Doc Content
    contentContainer: {
      flexGrow: 1,
      backgroundColor: theme.layout.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
    },

    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    contentChildrenContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },

    document: {
      maxWidth: '832px',
      margin: '0px auto',
      minHeight: `calc(100% - ${theme.layout.footerHeight}px)`,
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
      hyphens: 'auto',
    },

    toolbar: {

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

    // Footer
    footer: {
      width: '100%',
      minHeight: [`${theme.layout.footerHeight}px`, '!important'],
      backgroundColor: theme.palette.primary.main,
    },

    footerToolbar: {
      padding: theme.spacing(2),
    },

    footerContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },

    footerCopyright: {
      flexGrow: 0,
      margin: '20px',
    },

    footerSocialLinks: {
      borderRadius: '20px',
      margin: '20px',
      padding: '16px 14px 14px',
      backgroundColor: '#fff',
    },

    footerFiller: {
      flexGrow: 1,
    },

    // Settings button
    globalSettings: ({
      
    }) => ({
      marginLeft: theme.spacing(2),
      position: 'absolute',
      top: '10px',
      right: '10px',
    }),

    // Search widget
    searchHolder: {
      padding: theme.spacing(1),
    },

    appBarSearch: {
      maxWidth: '200px',
    },
  }
})

export default styles
