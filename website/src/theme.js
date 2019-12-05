const themeProcessor = ({
  config,
  settings,
}) => {
  const updates = {
    layout: {
      logoHeight: 60,
      topbarHeight: 80,
      footerHeight: 80,
      drawerWidth: config.showUI ? 360 : 240,
      smallScreenBreakpoint: 'sm',
      largeScreenBreakpoint: 'md',
    }
  }
  if(settings.color && settings.color.color) {
    updates.palette = {
      primary: {
        main: settings.color.color
      }
    }
  }
  return updates
}

export default themeProcessor