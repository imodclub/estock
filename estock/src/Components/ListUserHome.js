import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

import Grid from '@mui/material/Grid';
import {
  doc,
  getFirestore,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from 'firebase/firestore';



function ListUserHome(props) {
  const db = props.db;
  const [data, setData] = React.useState([]);
  
  const ReadData = async () => {
    const docData = [];
    const querySnapshot = await getDocs(collection(db, "User"));
    querySnapshot.forEach((doc => {
      //console.log(doc.id, ' => ', doc.data())
      docData.push({ ...doc.data(), key: doc.id });
      //setDocID(doc.id)
      setData(docData);
    }))
  }
  
  React.useEffect(() => {
    ReadData();
    setData([]);
  }, []);
  
  return (
    <Grid item xs={12}>
      <Container>
        <TableContainer>
          <Typography variant="h6" sx={{ p: 2 }} color="primary">
            ข้อมูลผู้ใช้งาน
          </Typography>

          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="left">ชื่อ</TableCell>
                <TableCell align="left">นามสกุล</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">ภาควิชา</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow
                  key={row.key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.Name}</TableCell>
                  <TableCell align="left">{row.Lastname}</TableCell>
                  <TableCell align="left">{row.Email}</TableCell>
                  <TableCell align="left">{row.Departments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Grid>
  );
}

export default ListUserHome