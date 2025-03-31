import { createTheme } from "@mui/material/styles";
import {Shadows} from "@mui/material/styles/shadows";

export const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});