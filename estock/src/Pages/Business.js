import React from 'react'
import Signin from '../Components/Signin';
import ButtonAddBusiness from '../Components/ButtonAddBusiness'
import MainSidebar from '../Components/Sidebar';
import { Box, Grid } from '@mui/material';



function Business(props) {
  const { db, user } = props.value;

  //Run background check local user
  const chkAuth = new Promise((resolve, reject) => {
    if (user !== null) {
      setTimeout(() => {
        resolve('เข้าสู่ระบบสำเร็จ');
      }, 1000);
    }
  });
  chkAuth
    .then((value) => {
      console.log(value);
    })
    .catch((e) => {
      console.log(e);
      return <Signin />;
    });
  //End Run background check local user

  return (
    <div>
        <Box sx={{ display: 'flex', width: '100%' }}>
        <Grid container item xs={4}>
          <MainSidebar />
        </Grid>
        <Grid item xs={12}>
        <ButtonAddBusiness value={{ db: db, user: user }} />
        </Grid>
      </Box>
    </div>
  );
}

export default Business