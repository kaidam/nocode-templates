import { createStyles } from '@material-ui/core/styles'

const styles = theme => {
  return createStyles({
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
    },
    appBar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
      height: [`${theme.layout.topbarHeight}px`, '!important'],
      //backgroundColor: theme.palette.primary.main,
      backgroundColor: '#ffffff',
      boxShadow: 'none',
      borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)',
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    },
    logoTitle: {
      color: theme.palette.primary.main,
    },
    headerToolbar: {
      height: [`${theme.layout.topbarHeight}px`, '!important'],
    },
    footerToolbar: {
      height: [`${theme.layout.footerHeight}px`, '!important'],
    },
    largeNav: {
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
    smallNav: {
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
    smallNavButton: {
      color: theme.palette.primary.main,
    },

    drawer: {
      height: '100%',
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

    content: {
      flexGrow: 1,
      height: '100%',
      overflowY: 'auto',
      //backgroundColor: theme.palette.background.default,
      background: 'rgba(0, 0, 0, 0.001)',
    },
    contentChildren: {
      maxWidth: '960px',
      margin: '0 auto',
      minHeight: `calc(100% - ${theme.layout.footerHeight}px - 1px)`,
      padding: theme.spacing(3),
    },
    footer: {
      width: '100%',
      color: theme.palette.common.white,
      height: [`${theme.layout.footerHeight}px`, '!important'],
      backgroundColor: theme.palette.primary.main,
    },


    appBarTitle: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      flexGrow: 1,
    },
    main: {
      height: `calc(100% - ${theme.layout.topbarHeight + theme.layout.uiTopbarHeight}px)`,
      width: '100%',
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'row',
    },

    footerContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },

    footerCopyright: {
      flexGrow: 0,
    },

    footerNavBar: {
      flexGrow: 1,
    },

    navItem: {
      ...theme.typography.button,
      display: 'block',
      fontWeight: '500',
      color: theme.palette.primary.main,
      textAlign: 'center',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginRight: theme.spacing(1),
      textDecoration: 'none',
      cursor: 'pointer',
    },

    footerNavItem: {
      ...theme.typography.button,
      display: 'block',
      fontWeight: '500',
      color: theme.palette.primary.contrastText,
      textAlign: 'center',
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      marginRight: theme.spacing(1),
      textDecoration: 'none',
      cursor: 'pointer',
      '& .navbar-ui-icon': {
        color: [theme.palette.primary.contrastText, '!important'],
      },
    },

    navActive: {
      color: [theme.palette.primary.contrastText, '!important'],
      backgroundColor: [theme.palette.primary.main, '!important'],
      borderRadius: [theme.spacing(1), '!important'],
      '& .navbar-ui-icon': {
        color: [theme.palette.primary.contrastText, '!important'],
      },
    },

    navItemLarge: {
      '&:hover': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.spacing(1),
        '& .navbar-ui-icon': {
          color: theme.palette.primary.contrastText,
        },
      },
      '& .navbar-ui-icon': {
        color: theme.palette.primary.main,
      },
    },

    navItemSmall: {
      color: theme.palette.primary.main,
      '& .navbar-ui-icon': {
        color: [theme.palette.primary.main, '!important'],
      },
    },

    inactiveEditorContainer: {
      '& .navbar-ui-icon': {
        color: theme.palette.primary.main,
      },
    },

    smallNavButton: {
      color: theme.palette.primary.main,
    },

    footerSmallNavButton: {
      color: theme.palette.primary.contrastText,
    },
  })
}

export default styles
