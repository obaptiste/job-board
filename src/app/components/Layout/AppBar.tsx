import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

const MyAppBar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Job Application Platform
        </Typography>
        {session ? (
          <Button color="inherit" onClick={() => signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button color="inherit" onClick={() => signIn()}>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default MyAppBar;
