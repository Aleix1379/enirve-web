interface Small {
  max: number;
}

interface Medium {
  min: number;
  max: number;
}

interface Big {
  min: number;
}

export interface ScreenSizes {
  phone: Small;
  tabPort: Medium;
  tabLand: Medium;
  desktop: Medium;
  bigDesktop: Big;
}
