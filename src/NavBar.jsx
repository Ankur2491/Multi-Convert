import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function NavBar() {
    function goToMyLinkedIn() {
          window.open('https://www.linkedin.com/in/ankur2491/', '_blank', 'noopener,noreferrer');
    }
    return(
          <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{justifyContent: "space-between"}}>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Multi-Convert
          </Typography>
          <Tooltip title="Connect with me">
          <LinkedInIcon sx={{cursor:'pointer'}}
          onClick={goToMyLinkedIn}
          >
            </LinkedInIcon>
            </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
    )
}