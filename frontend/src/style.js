export const themeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#A688FA',
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
    warning: {
      main: '#A688FA',
    },
    error: {
      main: '#FA6868'
    },
    success: {
      main: '#68FAA6'
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
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          color: '#ffffff', // Set text color to white
          '& .MuiSvgIcon-root': {
            color: '#ffffff', // Set icon color to white
          },
        },
        gutters: {
          backgroundColor: '#121212',
        },
        regular: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '& .MuiDataGrid-cell': {
            color: '#FFFFFF',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#333333',
            color: '#FFFFFF',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#333333',
            color: '#FFFFFF',
          },
        },
      },
    },
  },
};