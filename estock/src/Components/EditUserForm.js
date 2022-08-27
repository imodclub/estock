import React, { Fragment, useEffect, useRef, useState } from 'react';
import { TextField, Box, Button, Typography,Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Signin from './Signin';
import { collection, addDoc, serverTimestamp, getDoc, getDocs, where, updateDoc,doc } from 'firebase/firestore';

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const options = [
  'คำนำหน้า',
  'นาย',
  'นางสาว',
  'นาง',
  'ศ.',
  'ศ.ดร.',
  'รศ.',
  'รศ.ดร.',
  'ผศ.',
  'ผศ.ดร.',
  'ดร.',
];

function EditUserForm(props) {
  const { db, userID,name,lastname,email,departments,TelOfUBU,TelPrivate,Social } = props.value;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  const [fname, setFname] = useState(null)
  const [updateName, setUpdateName] = useState(null)
  const [updateLastname, setUpdateLastname] = useState(null)
  const [updateEmail, setUpdateEmail] = useState(null)
  const [updateDepartments, setUpdateDepartments] = useState(null)
  const [updateTelOfUBU, setUpdateTelOfUBU] = useState(null)
  const [updateTelPrivate, setUpdateTelPrivate] = useState(null)
  const [updateSocial, setUpdateSocial] = useState(null);
  


  
  

  /**ตรวจสอบข้อความใน Text filed มีค่าว่างหรือไม่ */
  useEffect(() => {
    const validator =
      updateName?.trim().length > 0 &&
      updateLastname?.trim().length > 0 &&
      updateEmail?.trim().length > 0 &&
      updateDepartments?.trim().length > 0 &&
      updateTelOfUBU;
    if (validator) {
      setError(true);
    } else {
      setError(false);
    }
  }, [updateName, updateLastname, updateEmail, updateDepartments, updateTelOfUBU]);
  /**จบการตรวจสอบข้อความใน Text filed มีค่าว่างหรือไม่ */

  const handleChangeName = (e) => {
    setUpdateName(e);
  };
  const handleChangeLastname = (e) => {
    setUpdateLastname(e);
  };
  const handleChangeEmail = (e) => {
    setUpdateEmail(e);
  };
  const handleChangeDepartments = (e) => {
    setUpdateDepartments(e);
  };
  const handleChangeTelIternal = (e) => {
    setUpdateTelOfUBU(e);
  };
  const handleChangeTelPrivate = (e) => {
    setUpdateTelPrivate(e);
  };
  const handleChangeSocial = (e) => {
    setUpdateSocial(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "User", userID);
    await updateDoc(docRef,{
        Fname: fname,
        Name: updateName,
        Lastname: updateLastname,
        Email: updateEmail,
        Departments: updateDepartments,
        TelOfUBU: updateTelOfUBU,
        TelPrivate: updateTelPrivate,
        Social: updateSocial,
        CreateUserDate: serverTimestamp(),
      })
      .then((doc) => {
        alert('บันทึกข้อมูลสำเร็จ');
        window.location.reload();
      })
      .catch((error) => {
        console.log('ไม่สามารถเชื่อมต่อฐานข้อมูลได้');
        console.log(error);
      });
  };

  

  return (
    <Fragment>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            setFname(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          selectOnFocus
          id="fnamelist"
          options={options}
          sx={{ width: 200, padding: 1 }}
          renderInput={(params) => (
            <TextField {...params} label="คำนำหน้า" id="fname" />
          )}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          label={<Div>ชื่อ</Div>}
          id="name"
          placeholder={`${name}`}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          label={<Div>นามสกุล</Div>}
          id="lname"
          placeholder={`${lastname}`}
          onChange={(e) => handleChangeLastname(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '55%', padding: 1 }}
          fullWidth
          label={<Div>แผนก / ฝ่าย</Div>}
          id="departments"
          placeholder={`${departments}`}
          onChange={(e) => handleChangeDepartments(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '55%', padding: 1 }}
          label={<Div>เบอร์โทรภายใน</Div>}
          id="telOfUBU"
          placeholder={`${TelOfUBU}`}
          onChange={(e) => handleChangeTelIternal(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '100%', padding: 1 }}
          fullWidth
          label={<Div>EMAIL</Div>}
          id="email"
          placeholder={`${email}`}
          onChange={(e) => handleChangeEmail(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '100%', padding: 1 }}
          fullWidth
          label={<Div>โทรศัพท์ที่ติดต่อได้ (ไม่บังคับ)</Div>}
          id="telprivate"
          placeholder={`${TelPrivate}`}
          onChange={(e) => handleChangeTelPrivate(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: 'auto', padding: 1 }}
          fullWidth
          label={
            <Div>ช่องทางติดต่ออื่นๆ เช่น โซเซียลมีเดีย Line (ไม่บังคับ)</Div>
          }
          id="social"
          placeholder={`${Social}`}
          onChange={(e) => handleChangeSocial(e.target.value)}
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
            แก้ไขข้อมูล
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
}

export default EditUserForm;
