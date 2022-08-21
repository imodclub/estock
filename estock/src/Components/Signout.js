import React from 'react';
import {
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Firebase from '../Service/Firebase';
import { signOut, getAuth } from 'firebase/auth';

function Signout(props) {
const user = props.user
  const handleSignOut = () => {
    signOut(getAuth())
      .then(() => {
        alert('ออกจากระบบสำเร็จ');
      })
      .catch((error) => {
        alert('ไม่สามารถออกจากระบบได้');
      });
  };

  return (
    <Box
      display="flex"
      sx={{
        width: '100%',
        height: '100%',
      }}
      justifyContent="center"
      justifyItems="center"
      alignItems="center"
    >
      <Card sx={{ minWidth: 600 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            marginBottom="10%"
            color="text.secondary"
          >
            {user}
          </Typography>
          <IconButton size="large" sx={{display:'flex', justifyContent:'center'}} onClick={handleSignOut}>
            <LogoutIcon sx={{ fontSize: 40 }} color="primary" />
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              ml={2}
            >
              ออกจากระบบ
            </Typography>
          </IconButton>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signout;
