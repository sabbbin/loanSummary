import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import AssessmentIcon from '@mui/icons-material/Assessment';

const pages = ["DashBoard", "UserName"];

const Navbar = () => {
  const [anchorelNav, SetAnchorNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, SetAnchorUser] = React.useState<null | HTMLElement>(
    null
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar>
      <Toolbar>
        <Grid
          container
          sx={{
            display: "flex",
            alignitem: "center",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            sx={{
              display: "flex",
              alignitem: "center",
            }}
          >
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="logo"
            ></IconButton>
            <Typography variant="h6">Base Report</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit">Dashboard</Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
              <MenuItem onClick={handleClose}>Change Password</MenuItem>
            </Menu>

            <Button
              color="inherit"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Username
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
