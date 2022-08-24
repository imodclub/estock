import React, { Fragment, useEffect, useRef, useState } from 'react'
import { TextField, Box,Button,Grid } from '@mui/material'
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Signin from './Signin';
import { collection, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore'

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

function AddUserForm(props) {
  const db = props.db;
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [fname, setFname]=useState(null)
  const [name, setName] = useState(null);
  const [lastname, setLastname]=useState(null)
  const [email, setEmail]=useState(null)
  const [departments, setDepartments]=useState(null)
  const [telinternel, setTelInternal]=useState(null)
  const [telPrivate, setTelPrivate]=useState(null)
  const [social, setSocial] = useState(null);
  const textInputDepartments = useRef(null);

  //ref
  const inputTextName = useRef(null);
  const inputTextLastname = useRef(null);
  const inputTextEmail = useRef(null);
  const inputTextDepartments = useRef(null);
  const inputTextTelInternal = useRef(null);
  const inputTextTelPrivate = useRef(null);
  const inputTextSocial = useRef(null);

  useEffect(() => {
    const validator =
      name?.trim().length > 0 &&
      lastname?.trim().length > 0 &&
      email?.trim().length > 0 &&
      departments?.trim().length > 0 &&
      telinternel;
    if (validator) {
      setError(true)
    } else {
      setError(false)
    }
  },
  [fname,name, lastname,email,departments,telinternel])
    
  const handleChangeName=(e)=>{setName(e)}
  const handleChangeLastname=(e)=>{setLastname(e)}
  const handleChangeEmail = (e) => { setEmail(e) }
  const handleChangeDepartments = (e) => { setDepartments(e) }
  const handleChangeTelIternal = (e) => { setTelInternal(e)}
  const handleChangeTelPrivate= (e) => {setTelPrivate(e)};
  const handleChangeSocial = (e) => { setSocial(e) };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "User"), {
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
    
  }

  const handleClear = (e) => {
    e.preventDefault();
    inputTextName.current.value="";
    inputTextLastname.current.value="";
    inputTextEmail.current.value = "";
    inputTextDepartments.current.value = '';
    inputTextTelInternal.current.value="";
    inputTextTelPrivate.current.value="";
    inputTextSocial.current.value="";
  }

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
            inputRef={inputTextName}
            onChange={(e) => handleChangeName(e.target.value)}
          />
          <TextField
            sx={{ maxWidth: '70%', padding: 1 }}
            label={<Div>นามสกุล</Div>}
            id="lname"
            inputRef={inputTextLastname}
            onChange={(e) => handleChangeLastname(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            sx={{ maxWidth: '55%', padding: 1 }}
            label={<Div>หน่วยงาน/ภาควิชา</Div>}
            id="departments"
            inputRef={inputTextDepartments}
            onChange={(e) => handleChangeDepartments(e.target.value)}
          />
          <TextField
            sx={{ maxWidth: '55%', padding: 1 }}
            label={<Div>โทรศัพท์ภายใน</Div>}
            id="telinternel"
            inputRef={inputTextTelInternal}
            onChange={(e) => handleChangeTelIternal(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            sx={{ maxWidth: '100%', padding: 1 }}
            fullWidth
            label={<Div>Email</Div>}
            id="email"
            inputRef={inputTextEmail}
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            sx={{ maxWidth: '100%', padding: 1 }}
            fullWidth
            label={<Div>โทรศัพท์ที่ติดต่อได้ (ไม่บังคับ)</Div>}
            id="telprivate"
            inputRef={inputTextTelPrivate}
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
            inputRef={inputTextSocial}
            onChange={(e) => handleChangeSocial(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Box component="div" sx={{ display: 'inline', p: 1, m: 1 }}>
            <Button
              sx={{ padding: 1 }}
              onClick={handleClear}
              variant="outlined"
              color="error"
            >
              Clear
            </Button>
          </Box>
          <Box component="div" sx={{ display: 'inline', p: 1, m: 1 }}>
            <Button
              variant="outlined"
              sx={{ padding: 1 }}
              disabled={!error}
              onClick={handleSubmit}
            >
              เพิ่มข้อมูล
            </Button>
          </Box>
        </Box>
      </Fragment>
    );
}

export default AddUserForm