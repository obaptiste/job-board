import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
//import "../styles/globals.css";
import { AppProps } from "next/app";
import theme from "../theme";
import MyAppBar from "../app/components/Layout/AppBar";
import { Session } from "inspector";

function JobBoard({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <MyAppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default JobBoard;
