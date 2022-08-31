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

import EditBusinessForm from './EditBusinessForm';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListBusiness = (props) => {
  const db = props.db;
  const [data, setData] = React.useState([]);
  const [singleData, setSingleData] = React.useState(null);
  const [businessID, setBusinessID] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [dataOnClick, setDataOnClick] = React.useState(null);
  const [getValue, setGetValue] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [businessName, setBusinessName] = useState(null);
  const [businessAddress, setBusinessAddress] = useState(null);
  const [soi, setSoi] = useState(null);
  const [road, setRoad] = useState(null);
  const [subdistrict, setSubdistrict] = useState(null);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [telephone, setTelephone] = useState(null);

  

  const handleClickOpen = ( id, BusinessName, BusinessAddress, Soi, Road, Subdistrict,District,Province, Zipcode,Telephone ) => { 
    setOpen(true);
    setBusinessID(id);
    setBusinessName(BusinessName);
    setBusinessAddress(BusinessAddress);
    setSoi(Soi);
    setRoad(Road);
    setSubdistrict(Subdistrict);
    setDistrict(District);
    setProvince(Province);
    setZipcode(Zipcode);
    setTelephone(Telephone);
    
    
   
    setSingleData(id);
    
  };



  const handleClose = () => {
    setOpen(false);
  };

  //Read Data to Table list business
  const ReadData = async () => {
    const docData = [];
    const querySnapshort = await getDocs(collection(db, 'Business'));
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
  //Read Data to Table list business

  

  //Delete Business
  const handleClickDelete = async (id) => {
    setLoading(false);

    var dataID;
    const checkIdUserFromCollection = await getDocs(
      collection(db, 'Business'),
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
          {
            <EditBusinessForm
              value={{
                db: db,
                BusinessID: businessID,
                BusinessName: businessName,
                BusinessAddress: businessAddress,
                Soi: soi,
                Road: road,
                Subdistrict: subdistrict,
                District: district,
                Province: province,
                Zipcode: zipcode,
                Telephone: telephone,
              }}
            />
          }
        </DialogContent>
      </Dialog>

      <Grid item xs={12}>
        <TableContainer>
          <Typography variant="h6" sx={{ p: 2 }}>
            ข้อมูลผู้ใช้งาน
          </Typography>

          <Table sx={{ Width: 'maxWidth' }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={6} align="left">
                  ชื่อร้าน / ห้าง
                </TableCell>
                <TableCell colSpan={6} align="left">
                  ที่อยู่
                </TableCell>
                <TableCell colSpan={6} align="left">
                  ตำบล
                </TableCell>
                <TableCell colSpan={6} align="left">
                  อำเภอ
                </TableCell>
                <TableCell colSpan={6} align="left">
                  จังหวัด
                </TableCell>
                <TableCell colSpan={6} align="left">
                  รหัสไปรษณีย์
                </TableCell>
                <TableCell colSpan={6} align="left">
                  โทรศัพท์
                </TableCell>
                <TableCell colSpan={6} align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell colSpan={6} align="left">
                    {row.BusinessName}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    {row.BusinessAddress} {row.Soi} {row.Road}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    {row.Subdistrict}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    {row.District}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    {row.Province}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    {row.Zipcode}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    {row.Telephone}
                  </TableCell>
                  <TableCell colSpan={6} align="left">
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        startIcon={<EditIcon />}
                        color="warning"
                        onClick={() => {
                          handleClickOpen(
                            row.key,
                            row.BusinessName,
                            row.BusinessAddress,
                            row.Soi,
                            row.Road,
                            row.Subdistrict,
                            row.District,
                            row.Province,
                            row.Zipcode,
                            row.Telephone
                          );
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
      </Grid>
    </React.Fragment>
  );
};

export default ListBusiness;
