import { Paper, Button, ButtonGroup } from "@mui/material";
import { DarkMode, LightMode, Fullscreen, Refresh } from "@mui/icons-material";
import { useThemeContext } from "./ThemeContext";

export default function Buttons() {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <Paper
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ButtonGroup
        variant="contained"
        color="primary"
        size="large"
        sx={{
          "& .MuiButton-root": {
            height: 96,
          },
        }}
      >
        <Button
          onClick={toggleTheme}
          sx={{
            borderRadius: 6,
          }}
        >
          {isDarkMode ? (
            <LightMode fontSize="large" />
          ) : (
            <DarkMode fontSize="large" />
          )}
        </Button>

        <Button onClick={toggleFullScreen}>
          <Fullscreen fontSize="large" />
        </Button>

        <Button
          onClick={() => window.location.reload()}
          sx={{
            borderRadius: 6,
          }}
        >
          <Refresh fontSize="large" />
        </Button>
      </ButtonGroup>
    </Paper>
  );
}
