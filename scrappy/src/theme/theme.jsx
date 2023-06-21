import { createTheme } from "@mui/material";
import { muiPaletteLight } from "./palette";

const normalTypeface = ["Poppins", "sans-serif"].join(",");

const originalTheme = createTheme({
  typography: {
    fontFamily: normalTypeface,
  },
  typeface: {
    normal: normalTypeface,
  },
});

export const theme = createTheme(originalTheme, {
  typography: {
    h1: {
      fontSize: originalTheme.typography.pxToRem(36),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(44),
    },
    h2: {
      fontSize: originalTheme.typography.pxToRem(32),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(40),
    },
    h3: {
      fontSize: originalTheme.typography.pxToRem(28),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(36),
    },
    h4: {
      fontSize: originalTheme.typography.pxToRem(24),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(32),
    },
    h5: {
      fontSize: originalTheme.typography.pxToRem(22),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(28),
    },
    h6: {
      fontSize: originalTheme.typography.pxToRem(18),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(24),
    },
    subtitle1: {
      fontSize: originalTheme.typography.pxToRem(16),
      fontWeight: 500,
      lineHeight: originalTheme.typography.pxToRem(24),
      letterSpacing: "0.1px",
    },
    subtitle2: {
      fontSize: originalTheme.typography.pxToRem(14),
      fontWeight: 500,
      lineHeight: originalTheme.typography.pxToRem(20),
      letterSpacing: "0.1px",
    },
    button: {
      fontSize: originalTheme.typography.pxToRem(14),
      fontWeight: 500,
      lineHeight: originalTheme.typography.pxToRem(20),
      letterSpacing: "0.1px",
    },
    caption: {
      fontSize: originalTheme.typography.pxToRem(12),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(16),
      letterSpacing: "0.4px",
    },
    overline: {
      fontSize: originalTheme.typography.pxToRem(12),
      fontWeight: 500,
      lineHeight: originalTheme.typography.pxToRem(16),
      letterSpacing: "0.5px",
    },
    bodyLarge: {
      fontSize: originalTheme.typography.pxToRem(16),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(24),
      letterSpacing: "0.5px",
    },
    bodyMedium: {
      fontSize: originalTheme.typography.pxToRem(14),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(20),
      letterSpacing: "0.25px",
    },
    bodySmall: {
      fontSize: originalTheme.typography.pxToRem(12),
      fontWeight: 400,
      lineHeight: originalTheme.typography.pxToRem(16),
      letterSpacing: "0.4px",
    },
  },
  palette: {
    ...muiPaletteLight,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "100px",
          "&:focus": {
            outline: "none",
          },
        },
        containedScrappyBlack: {
          "&:hover": {
            backgroundColor: muiPaletteLight.scrappyBlack.light,
          },
        },
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
        spacing: 1,
        alignItems: "center",
      },
    },
  },
});
