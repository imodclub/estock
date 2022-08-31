import React, { useEffect } from 'react'
import ListUsers from '../Components/ListUserPageUser'
import ButtonAddUser from '../Components/ButtonAddUser'
import Signin from '../Components/Signin'
import MainSidebar from '../Components/Sidebar'
import { Box,Grid } from '@mui/material'


function UserManage(props) {
  const { db, user } = props.value;

  //Run background check local user
  const chkAuth = new Promise((resolve, reject) => {
    if (user !== null) {
      setTimeout(() => {
        resolve('กำลังเข้าสู่ระบบ');
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
        <Grid container item xs={3}>
          <MainSidebar />
        </Grid>
        <Grid item xs={14}>
          <ButtonAddUser value={{ db: db, user: user }} />
          <ListUsers db={db} />
        </Grid>
      </Box>
    </div>
  );
}

export default UserManage