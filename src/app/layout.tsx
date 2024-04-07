import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../theme";
//import "../styles/globals.css"
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
} from "react";
// or `v1X-appRouter` if you are using Next.js v1X

export default function RootLayout(props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | Promise<AwaitedReactNode>
    | null
    | undefined;
}) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          {<ThemeProvider theme={lightTheme}>{children}</ThemeProvider>}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
