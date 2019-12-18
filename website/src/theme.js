const themeProcessor = ({
  config,
  settings,
}) => {
  const updates = {
    layout: {
      topbarHeight: 80,
      footerHeight: 80,
      drawerWidthSmall: 240,
      drawerWidthLarge: 360,
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
  if(settings.topbarHeight) {
    updates.layout.topbarHeight = settings.topbarHeight
  }
  if(settings.footerHeight) {
    updates.layout.footerHeight = settings.footerHeight
  }
  return updates
}

export default themeProcessor