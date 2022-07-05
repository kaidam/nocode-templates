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
      backgroundColor: '#ffffff',
      accentColor: '#ff0000',
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
    updates.layout.drawerWidthLarge = settings.sidebarWidth + 80
  }
  if(settings.background_color && settings.background_color.color) {
    updates.layout.backgroundColor = settings.background_color.color
  }
  if(settings.accent_color && settings.accent_color.color) {
    updates.layout.accentColor = settings.accent_color.color
  }
  return updates
}

export default themeProcessor