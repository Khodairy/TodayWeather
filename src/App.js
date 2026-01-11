import "./App.css";
import TheCard from "./component/theCard";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "IBM",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TheCard />
      </ThemeProvider>
    </div>
  );
}

export default App;
