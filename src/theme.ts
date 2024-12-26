import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    cards: {
      hero: { text: string; bg: string };
      schedule: { text: string; bg: string };
      homework: { text: string; bg: string };
      music: { text: string; bg: string };
      pomodoro: { text: string; bg: string };
      lunch: { text: string; bg: string };
    };
  }
  interface PaletteOptions {
    cards?: {
      hero: { text: string; bg: string };
      schedule: { text: string; bg: string };
      homework: { text: string; bg: string };
      music: { text: string; bg: string };
      pomodoro: { text: string; bg: string };
      lunch: { text: string; bg: string };
    };
  }
}

const ctp = {
  rosewater: "#f5e0dc",
  flamingo: "#f2cdcd",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  red: "#f38ba8",
  maroon: "#eba0ac",
  peach: "#fab387",
  yellow: "#f9e2af",
  green: "#a6e3a1",
  teal: "#94e2d5",
  sky: "#89dceb",
  sapphire: "#74c7ec",
  blue: "#89b4fa",
  lavender: "#b4befe",
  text: "#cdd6f4",
  subtext1: "#bac2de",
  subtext0: "#a6adc8",
  overlay2: "#9399b2",
  overlay1: "#7f849c",
  overlay0: "#6c7086",
  surface2: "#585b70",
  surface1: "#45475a",
  surface0: "#313244",
  base: "#1e1e2e",
  mantle: "#181825",
  crust: "#11111b",
};

const cardColors = {
  light: {
    hero: { text: ctp.base, bg: ctp.rosewater },
    schedule: { text: ctp.base, bg: ctp.flamingo },
    homework: { text: ctp.base, bg: ctp.mauve },
    music: { text: ctp.base, bg: ctp.peach },
    pomodoro: { text: ctp.base, bg: ctp.lavender },
    lunch: { text: ctp.base, bg: ctp.teal },
  },
  dark: {
    hero: { text: ctp.rosewater, bg: ctp.base },
    schedule: { text: ctp.flamingo, bg: ctp.base },
    homework: { text: ctp.mauve, bg: ctp.base },
    music: { text: ctp.peach, bg: ctp.base },
    pomodoro: { text: ctp.lavender, bg: ctp.base },
    lunch: { text: ctp.teal, bg: ctp.base },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: ctp.blue,
    },
    secondary: {
      main: ctp.pink,
    },
    background: {
      default: ctp.text,
      paper: ctp.text,
    },
    /* text: {
      primary: ctp.base,
      secondary: ctp.subtext1,
    }, */
    cards: cardColors.light,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    /*     MuiTypography: {
      styleOverrides: {
        root: {
          color: ctp.base,
        },
      },
    }, */
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: ctp.text,
          color: ctp.base,
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ctp.blue,
    },
    secondary: {
      main: ctp.pink,
    },
    background: {
      default: ctp.crust,
      paper: ctp.mantle,
    },
    /* text: {
      primary: ctp.text,
      secondary: ctp.subtext1,
    }, */
    cards: cardColors.dark,
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },

  components: {
    /* MuiTypography: {
      styleOverrides: {
        root: {
          color: ctp.text,
        },
      },
    }, */
    MuiButton: {
      styleOverrides: {
        root: {
          color: ctp.text,
          backgroundColor: ctp.base,
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
