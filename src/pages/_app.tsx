import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
//import "../styles/globals.css";
import { AppProps } from "next/app";
import { lightTheme, darkTheme } from "../theme";
import MyAppBar from "../app/components/Layout/AppBar";
import { Session } from "inspector";

function JobBoard({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={lightTheme}>
        <MyAppBar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default JobBoard;
