import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Signin from './Signin';
import AddMaterialForm from './AddMaterialForm';
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ButtonAddMaterial(props) {
  const { db, user } = props.value;
  const [open, setOpen] = React.useState(false);

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
      return <CircularProgress />;
    })
    .catch((e) => {
      console.log(e);
      return <Signin />;
    });
  //End Run background check local user

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
          startIcon={<ShoppingCartCheckoutOutlinedIcon />}
          onClick={handleClickOpen}
        >
          เพิ่มข้อมูล
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
          <DialogTitle>{'เพิ่มข้อมูลวัสดุ'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              แบบฟอร์มเพิ่มข้อมูลวัสดุ กรุณากรอกรายละเอียด
            </DialogContentText>
            {<AddMaterialForm db={db} />}
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
}
export default ButtonAddMaterial;
