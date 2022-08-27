import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Signin from './Signin';
import AddUserForm from './AddUserForm'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function ButtonAddUser(props) {
  const { db, user } = props.value;
  const [open, setOpen] = React.useState(false);
  if (user === null) {
    return <Signin />;
  }

   const handleClickOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };
  
  return (
    <Box
      sx={{ '& button': { m: 2 }, display: 'flex', justifyContent: 'flex-end' }}
    >
      <div>
        <Button
          variant="outlined"
          size="large"
          startIcon={<AddBusinessOutlinedIcon />}
          onClick={handleClickOpen}
        >
          เพิ่มข้อมูลผู้ขาย
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogActions>
            <Button onClick={handleClose} endIcon={<CloseIcon />}></Button>
          </DialogActions>
          <DialogTitle>{'เพิ่มข้อมูลสมาชิก'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              แบบฟอร์มเพิ่มข้อมูลสมาชิก หรือผู้เบิกวัสดุ หรือเบิกสินค้า
              ทางหน่วยงานมีความจำเป็นต้องจัดเก็บข้อมูล
              เพื่อนำไปใช้สำหรับงานเบิกวัสดุ
            </DialogContentText>
            {<AddUserForm db={db} />}
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
}
export default ButtonAddUser;