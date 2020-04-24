const themeProcessor = ({
  config,
  route,
  settings,
}) => {
  const updates = {
    layout: {
      topbarHeight: 80,
      footerHeight: 80,
      drawerWidthSmall: 280,
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
  if(settings.sidebarWidth) {
    updates.layout.drawerWidthSmall = settings.sidebarWidth
    updates.layout.drawerWidthLarge = settings.sidebarWidth + 60
  }
  return updates
}

export default themeProcessor