import React, { Fragment, useEffect, useRef, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Signin from './Signin';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


function AddUserForm(props) {
  const db = props.db;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [businessName, setBusinessName] = useState(null);
  const [businessAddress, setBusinessAddress] = useState(null);
  const [subdistrict, setSubdistrict] = useState(null);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [telephone, setTelephone] = useState(null);


  //ref
  const inputTextName = useRef(null);
  const inputTextLastname = useRef(null);
  const inputTextEmail = useRef(null);
  const inputTextDepartments = useRef(null);
  const inputTextTelInternal = useRef(null);
  const inputTextTelPrivate = useRef(null);
  const inputTextSocial = useRef(null);

  
  const handleChangeBusinessName=(e)=>{setBusinessName(e)}
  const handleChangeBusinessAddress=(e)=>{setBusinessAddress(e)}
  const handleChangeSubdistrict = (e) => { setSubdistrict(e) }
  const handleChangeDistrict = (e) => { setDistrict(e) }
  const handleChangeProvince = (e) => { setProvince(e)}
  const handleChangeZipcode= (e) => {setZipcode(e)};
  const  handleChangeTelephone = (e) => { setTelephone(e) };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    /*const docRef = await addDoc(collection(db, "User"), {
      Fname: fname,
      Name: name,
      Lastname: lastname,
      Email: email,
      Departments: departments,
      TelOfUBU: telinternel,
      TelPrivate: telPrivate,
      Social: social,
      CreateUserDate:serverTimestamp()
    }).then((doc) => {
      alert('บันทึกข้อมูลสำเร็จ')
      window.location.reload();
    }).catch((error)=>{
      console.log("ไม่สามารถเชื่อมต่อฐานข้อมูลได้");
      console.log(error)
    })
    */
  };

  const handleClear = (e) => {
    e.preventDefault();
    inputTextName.current.value = '';
    inputTextLastname.current.value = '';
    inputTextEmail.current.value = '';
    inputTextDepartments.current.value = '';
    inputTextTelInternal.current.value = '';
    inputTextTelPrivate.current.value = '';
    inputTextSocial.current.value = '';
  };

  return (
    <Fragment>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          fullWidth
          label={<Div>ชื่อร้านค้า</Div>}
          id="businessname"
          inputRef={inputTextName}
          onChange={(e) => handleChangeBusinessName(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          label={<Div>ที่อยู่</Div>}
          id="businessAddress"
          inputRef={inputTextLastname}
          onChange={(e) => handleChangeBusinessAddress(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '55%', padding: 1 }}
          label={<Div>แขวง / ตำบล</Div>}
          id="subdistrict"
          inputRef={inputTextDepartments}
          onChange={(e) => handleChangeSubdistrict(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '55%', padding: 1 }}
          label={<Div>อำเภอ</Div>}
          id="district"
          inputRef={inputTextTelInternal}
          onChange={(e) => handleChangeDistrict(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '100%', padding: 1 }}
          fullWidth
          label={<Div>จังหวัด</Div>}
          id="province"
          inputRef={inputTextEmail}
          onChange={(e) => handleChangeProvince(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '100%', padding: 1 }}
          fullWidth
          label={<Div>รหัสไปรษณีย์</Div>}
          id="zipcode"
          inputRef={inputTextTelPrivate}
          onChange={(e) => handleChangeZipcode(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: 'auto', padding: 1 }}
          fullWidth
          label={<Div>เบอร์โทร</Div>}
          id="telephone"
          inputRef={inputTextSocial}
          onChange={(e) => handleChangeTelephone(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <Box component="div" sx={{ display: 'inline', p: 1, m: 1 }}>
          <Button
            sx={{ padding: 1 }}
            disabled={!error}
            onClick={handleSubmit}
            variant="outlined"
          >
            เพิ่มข้อมูล
          </Button>
        </Box>
        <Box component="div" sx={{ display: 'inline', p: 1, m: 1 }}>
          <Button
            variant="outlined"
            sx={{ padding: 1 }}
            color="error"
            onClick={handleClear}
          >
            Clear form
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}

export default AddUserForm;
