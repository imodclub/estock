import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

function ButtonAddUser (){
  return (
    <Box
      sx={{ '& button': { m: 2 }, display: 'flex', justifyContent: 'flex-end' }}
    >
      <div>
        <Button variant="outlined" size="large" startIcon={<PersonAddAltOutlinedIcon />}>
          เพิ่มข้อมูล
        </Button>
      </div>
    </Box>
  );
}
export default ButtonAddUser;
