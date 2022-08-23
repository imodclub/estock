import React, { Fragment, useEffect, useRef, useState } from 'react'
import { TextField, Box,Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import Signin from './Signin';

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
  //const [error,setError] = (false)
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [fname, setFname]=useState(null)
  const [name, setName] = useState(null);
  const [lastname, setLastname]=useState(null)
  const [email, setEmail]=useState(null)
  const [departments, setDepartments]=useState(null)
  const [telinternel, setTelInternal]=useState(null)
  const [telPrivate, setTelPrivate]=useState(null)
  const [social, setSocial] = useState(null);
  const textInputDepartments = useRef(null);

  useEffect(() => {
    const validator =
      name?.trim().length > 0 &&
      lastname?.trim().length > 0 &&
      email?.trim().length > 0 &&
      departments?.trim().length > 0 &&
      telinternel;
    /*if (validator) {
      setError(true)
    } else {
      //setError(false)
    }*/
  },
  [fname,name, lastname,email,departments,telinternel])
    
  const handleChangeFname=(e)=>{setFname(e)}
  const handleChangeName=(e)=>{setName(e)}
  const handleChangeLastname=(e)=>{setLastname(e)}
  const handleChangeEmail = (e) => { setEmail(e) }
  const handleChangeDepartments = (e) => { setDepartments(e) }
  const handleChangeTelIternal = (e) => { setTelInternal(e)}
  const handleChangeTelPrivate= (e) => {setTelPrivate(e)};
  const handleChangeSocial = (e) => { setSocial(e) };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("คำนำหน้า ",fname)
    console.log("ชื่อ ",name)
    console.log("นามสกุล ",lastname)
    console.log("อีเมล ",email)
    console.log("แผนก ",departments)
    console.log('โทร ', telinternel);
  }
  const handleClear = (e) => {
    e.preventDefault();
    textInputDepartments.current.value='';
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
            onChange={(e) => handleChangeName(e.target.value)}
          />
          <TextField
            sx={{ maxWidth: '70%', padding: 1 }}
            label={<Div>นามสกุล</Div>}
            id="lname"
            onChange={(e) => handleChangeLastname(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            sx={{ maxWidth: '55%', padding: 1 }}
            label={<Div>หน่วยงาน/ภาควิชา</Div>}
            id="departments"
            onChange={(e) => handleChangeDepartments(e.target.value)}
          />
          <TextField
            sx={{ maxWidth: '55%', padding: 1 }}
            label={<Div>โทรศัพท์ภายใน</Div>}
            id="telinternel"
            onChange={(e) => handleChangeTelIternal(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            sx={{ maxWidth: '100%', padding: 1 }}
            fullWidth
            label={<Div>Email</Div>}
            id="email"
            onChange={(e) => handleChangeEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            sx={{ maxWidth: '100%', padding: 1 }}
            fullWidth
            label={<Div>โทรศัพท์ที่ติดต่อได้ (ไม่บังคับ)</Div>}
            id="telprivate"
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
            onChange={(e) => handleChangeSocial(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <Button onClick={handleClear}>Disagree</Button>
          <Button onClick={handleSubmit}>Agree</Button>
        </Box>
      </Fragment>
    );
}

export default AddUserForm