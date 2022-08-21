import React from 'react';
import { CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const theme = createTheme();

function Navbar() {

  const AuthLink = () => {
    window.location.href = 'auth'
  }
  const HomeLink = () => {
    window.location.href = '/'
  }
  const UserManageLink = () => {
    window.location.href = 'usermanage'
  }
  const MaterialLink = () => {
    window.location.href='material'
  }
  const ReportLink = () => {
    window.location.href = 'report'
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="transparent"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: 'flex', mx: 0.5, fontSize: 14 }}>
              <Button
                sx={{ my: 2, color: 'primary', display: 'block', mr: '10px' }}
                onClick={HomeLink}
              >
              <Typography
                variant="h6"
                color="primary"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                E-Stock
              </Typography>
              </Button>
            </Box>
            <Box
              sx={{
                width: '80%',
                flexGrow: 1,
                display: { md: 'flex' },
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{ my: 2, color: 'primary', display: 'block', mr: '10px' }}
                onClick={HomeLink}
              >
                <HomeOutlinedIcon sx={{ fontSize: 30 }} />
              </Button>
              <Button
                sx={{ my: 2, color: 'primary', display: 'block', mr: '10px' }}
                onClick={UserManageLink}
              >
                <PersonOutlineOutlinedIcon sx={{ fontSize: 30 }} />
              </Button>
              <Button
                sx={{ my: 2, color: 'primary', display: 'block', mr: '10px' }}
                onClick={MaterialLink}
              >
                <LocalGroceryStoreOutlinedIcon sx={{ fontSize: 30 }} />
              </Button>
              <Button
                sx={{ my: 2, color: 'primary', display: 'block', mr: '10px' }}
                onClick={ReportLink}
              >
                <AssessmentOutlinedIcon sx={{ fontSize: 30 }} />
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                width: 10,
                display: { md: 'flex' },
                justifyContent: 'flex-end',
              }}
            >
              <Button
                sx={{
                  my: 2,
                  color: 'primary',
                  display: 'block',
                  mr: '10px',
                }}
                onClick={AuthLink}
              >
                <VpnKeyOutlinedIcon sx={{ fontSize: 30 }} />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
