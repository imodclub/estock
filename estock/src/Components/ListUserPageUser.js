import React,{useEffect,useState} from 'react';

//service and database
import Firebase from '../Service/Firebase';
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  where,
  updateDoc,
} from 'firebase/firestore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EditUserForm from './EditUserForm';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListUsers = (props) => {
  const db = props.db;
  const [data, setData] = React.useState([]);
  const [singleData, setSingleData] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [dataOnClick, setDataOnClick] = React.useState(null);
  const [getValue, setGetValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [fname, setFname] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [departments, setDepartments] = useState(null);
  const [telinternel, setTelInternal] = useState(null);
  const [telPrivate, setTelPrivate] = useState(null);
  const [social, setSocial] = useState(null);

  

  const handleClickOpen = (id,Name,Lastname,Email,Departments,Telinternal) => { 
     setOpen(true);
    setUserID(id);
    setName(Name);
    setName(Lastname);
    setName(Email);
    setName(Departments);
    setName(Telinternal);
    
   
    setSingleData(id);
    
  };



  const handleClose = () => {
    setOpen(false);
  };

  //Read Data to Table list user
  const ReadData = async () => {
    const docData = [];
    const querySnapshort = await getDocs(collection(db, 'User'));
    querySnapshort.forEach((doc) => {
      //console.log(doc.id, ' => ', doc.data())
      docData.push({ ...doc.data(), key: doc.id });
      //setDocID(doc.id)
      setData(docData);
    });
  };
  React.useEffect(() => {
    ReadData();
    setData([]);
  }, []);
  //Read Data to Table list user

  /*Edit user นำข้อมูลลงในฟอร์ม */

  /*จบ Edit user นำข้อมูลลงในฟอร์ม */

  //Delete User
  const handleClickDelete = async (id) => {
    setLoading(false);

    var dataID;
    const checkIdUserFromCollection = await getDocs(
      collection(db, 'User'),
      where('id', '==', id)
    );
    checkIdUserFromCollection.forEach((doc) => {
      if (doc.id == id) {
        dataID = doc.id;
        console.log('id documents ', doc.id);
        setDataOnClick(doc.data().UID);
      }
    });
    if (dataID) {
      console.log('data id คือ ', dataID);
      setLoading(false);
      await deleteDoc(doc(db, 'User', dataID));
      setTimeout(() => {
        setLoading(true);
      }, 3000);
      window.location.reload();
      setData([]);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
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
        <DialogTitle>{'แก้ไขข้อมูลสมาชิก'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            แบบฟอร์มแก้ไขข้อมูลสมาชิก หรือผู้เบิกวัสดุ หรือเบิกสินค้า
            ทางหน่วยงานมีความจำเป็นต้องจัดเก็บข้อมูล
            เพื่อนำไปใช้สำหรับงานเบิกวัสดุ
          </DialogContentText>
          {<EditUserForm value={{ db: db, userID: userID, name: name,lastname:lastname,email,email,departments:departments,telinternel:telinternel }} />}
        </DialogContent>
      </Dialog>

      <Grid item xs={12}>
        <Container>
          <TableContainer>
            <Typography variant="h6" sx={{ p: 2 }}>
              ข้อมูลผู้ใช้งาน
            </Typography>

            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">คำนำหน้า</TableCell>
                  <TableCell align="left">ชื่อ</TableCell>
                  <TableCell align="left">นามสกุล</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">ภาควิชา</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.Fname}</TableCell>
                    <TableCell align="left">{row.Name}</TableCell>
                    <TableCell align="left">{row.Lastname}</TableCell>
                    <TableCell align="left">{row.Email}</TableCell>
                    <TableCell align="left">{row.Departments}</TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="warning"
                          onClick={() => {
                            handleClickOpen(row.key, row.Name,row.Lastname,row.Email,row.Departments,row.telOfUBU);
                            
                          }}
                        >
                          แก้ไข
                        </Button>
                        <Button
                          variant="contained"
                          endIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => {
                            handleClickDelete(row.key);
                          }}
                        >
                          ลบ
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </React.Fragment>
  );
};

export default ListUsers;
