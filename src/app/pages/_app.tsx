import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import theme from "../theme";

function JobBoard({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default JobBoard;
