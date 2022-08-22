import React, { Fragment, useState } from 'react'
import { Container, TextField, Box } from '@mui/material'
import { styled } from '@mui/material/styles';
import Signin from './Signin';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

function AddUserForm(props) {
  const db = props.db;
  const [loading, setLoading] =  useState(false)
    
    return (
      <Fragment>
          <Box
            sx={{ mt: 1, display: 'flex', maxWidth: '100%' }}
          >
            <TextField
              variant="outlined"
              sx={{ maxWidth: '20%', padding: 1 }}
              label={<Div>คำนำหน้า</Div>}
              id="fname"
            />
            <TextField
              sx={{ maxWidth: '40%', padding: 1 }}
              label={<Div>ชื่อ</Div>}
              id="name"
            />
            <TextField
              sx={{ maxWidth: '40%', padding: 1 }}
              label={<Div>นามสกุล</Div>}
              id="lname"
            />
          </Box>
          <Box
            sx={{ mt: 1, display: 'flex', maxWidth: '100%' }}
          >
            <TextField
              sx={{ maxWidth: '55%', padding: 1 }}
              label={<Div>หน่วยงาน/ภาควิชา</Div>}
              id="departments"
            />
            <TextField
              sx={{ maxWidth: '55%', padding: 1 }}
              label={<Div>โทรศัพท์ภายใน</Div>}
              id="telinternel"
            />
          </Box>
          <Box
            sx={{ mt: 1, display: 'flex', maxWidth: '100%' }}
          >
            <TextField
            sx={{ maxWidth: '100%', padding: 1 }}
            fullWidth
              label={<Div>โทรศัพท์ที่ติดต่อได้ (ไม่บังคับ)</Div>}
              id="privatetel"
            />
          </Box>
          <Box
            sx={{ mt: 1, display: 'flex', maxWidth: '100%' }}
          >
            <TextField
            sx={{ maxWidth: 'auto', padding: 1 }}
            fullWidth
              label={<Div>ช่องทางติดต่ออื่นๆ เช่น โซเซียลมีเดีย Line (ไม่บังคับ)</Div>}
              id="social"
            />
          </Box>
      </Fragment>
    );
}

export default AddUserForm