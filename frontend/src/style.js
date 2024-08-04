export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#282828',
    },
    secondary: {
      main: '#A688FA',
    },
    background: {
      default: '#121212',
      paper: 'rgba(40, 40, 40, 0.8)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A688FA',
    },
    error: {
      main: '#A688FA',
    },
    warning: {
      main: '#A688FA',
    },
    info: {
      main: '#A688FA',
    },
    divider: '#121212',
  },
  typography: {
    fontFamily: 'Inter, Arial, sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
    button: {
      fontWeight: 500,
      lineHeight: 1.45,
    },
    // h5: {
    //   fontWeight: 700,
    //   fontSize: '1.4rem',
    // },
    // h6: {
    //   fontSize: '1.1rem',
    // },
    // body1: {
    //   fontSize: '1rem',
    //   fontWeight: 700,
    // },
    // body2: {
    //   lineHeight: 1.45,
    //   fontSize: '0.9rem',
    // },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiAppBar: {
      color: 'transparent',
    },
  },
  shape: {
    borderRadius: 10,
  },
};