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
  const [TelOfUBU, setTelOfUBU] = useState(null);
  const [telPrivate, setTelPrivate] = useState(null);
  const [social, setSocial] = useState(null);

  

  const handleClickOpen = ( id, Name, Lastname, Email, Departments, TelOfUBU,TelPrivate,Social ) => { 
    setOpen(true);
    setUserID(id);
    setName(Name);
    setLastname(Lastname);
    setEmail(Email);
    setDepartments(Departments);
    setTelOfUBU(TelOfUBU);
    setTelPrivate(TelPrivate);
    setSocial(Social)
    
    
   
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

  /*Edit user ??????????????????????????????????????????????????? */

  /*?????? Edit user ??????????????????????????????????????????????????? */

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
      console.log('data id ????????? ', dataID);
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
        <DialogTitle>{'???????????????????????????????????????????????????'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ??????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????? ??????????????????????????????????????????
            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            ??????????????????????????????????????????????????????????????????????????????????????????
          </DialogContentText>
          {<EditUserForm value={{ db: db, userID: userID, name: name, lastname:lastname, email:email, departments:departments, TelOfUBU:TelOfUBU,TelPrivate:telPrivate,Social:social }} />}
        </DialogContent>
      </Dialog>

      <Grid item xs={12}>
        <Container>
          <TableContainer>
            <Typography variant="h6" sx={{ p: 2 }}>
              ?????????????????????????????????????????????
            </Typography>

            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} align="left">????????????????????????</TableCell>
                  <TableCell colSpan={6} align="left">????????????</TableCell>
                  <TableCell colSpan={6} align="left">?????????????????????</TableCell>
                  <TableCell colSpan={6} align="left">Email</TableCell>
                  <TableCell colSpan={6} align="left">?????????????????????</TableCell>
                  <TableCell colSpan={6} align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell colSpan={6} align="left">{row.Fname}</TableCell>
                    <TableCell colSpan={6} align="left">{row.Name}</TableCell>
                    <TableCell colSpan={6} align="left">{row.Lastname}</TableCell>
                    <TableCell colSpan={6} align="left">{row.Email}</TableCell>
                    <TableCell colSpan={6} align="left">{row.Departments}</TableCell>
                    <TableCell colSpan={6} align="left">
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="warning"
                          onClick={() => {
                            handleClickOpen( row.key, row.Name, row.Lastname, row.Email,row.Departments,row.TelOfUBU,row.TelPrivate,row.Social );
                            
                          }}
                        >
                          ???????????????
                        </Button>
                        <Button
                          variant="contained"
                          endIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => {
                            handleClickDelete(row.key);
                          }}
                        >
                          ??????
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
