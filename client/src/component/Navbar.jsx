import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";

const pages = ["Home", "My-Posts", "Create-Post"];
const settings = ["Logout"];

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{ backgroundColor: "#0C0C0D" }} position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  padding: "10px",
                }}
                onClick={handleCloseNavMenu}
              >
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  <Typography
                    style={{ marginTop: "2px", cursor: "pointer" }}
                    textAlign="center"
                  >
                    HOME
                  </Typography>
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/posts"
                >
                  <Typography
                    style={{ marginTop: "2px", cursor: "pointer" }}
                    textAlign="center"
                  >
                    MY-POSTS
                  </Typography>
                </Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/create"
                >
                  <Typography
                    style={{ marginTop: "2px", cursion: "pointer" }}
                    textAlign="center"
                  >
                    CREATE-POSTS
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link style={{ textDecoration: "none" }} to="/">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Home
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/posts">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                My-Posts
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/create">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Create-Posts
              </Button>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Image logo"
                  src="https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-vector-avatar-icon-png-image_889567.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <div
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
