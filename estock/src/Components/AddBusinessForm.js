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
  const [soi, setSoi] = useState(null);
  const [road, setRoad] = useState(null);
  const [subdistrict, setSubdistrict] = useState(null);
  const [district, setDistrict] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [telephone, setTelephone] = useState(null);


  //ref
  const inputTextBusinessName = useRef(null);
  const inputTextBusinessAddress = useRef(null);
  const inputTextSoi = useRef(null);
  const inputTextRoad = useRef(null);
  const inputTextSubdistrict = useRef(null);
  const inputTextDistrict = useRef(null);
  const inputTextProvince = useRef(null);
  const inputTextZipcode = useRef(null);
  const inputTextTelephone = useRef(null);

  
  const handleChangeBusinessName=(e)=>{setBusinessName(e)}
  const handleChangeBusinessAddress=(e)=>{setBusinessAddress(e)}
  const handleChangeSoi = (e) => { setSoi(e) };
  const handleChangeRoad = (e) => {setRoad(e);};
  const handleChangeSubdistrict = (e) => { setSubdistrict(e) }
  const handleChangeDistrict = (e) => { setDistrict(e) }
  const handleChangeProvince = (e) => { setProvince(e)}
  const handleChangeZipcode= (e) => {setZipcode(e)};
  const handleChangeTelephone = (e) => { setTelephone(e) };

  useEffect(() => {
    const validator =
      businessName?.trim().length > 0 &&
      businessAddress?.trim().length > 0 &&
      soi?.trim().length > 0 &&
      road?.trim().length > 0 &&
      subdistrict?.trim().length > 0 &&
      district?.trim().length > 0 &&
      province?.trim().length > 0 &&
      zipcode > 0 &&
      telephone;
    if (validator) {
      setError(true);
    } else {
      setError(false);
    }
  }, [businessName, businessAddress,soi,road, subdistrict, district, province, zipcode,telephone]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, 'Business'), {
      BusinessName: businessName,
      BusinessAddress: businessAddress,
      Road:road,
      Subdistrict: subdistrict,
      District: district,
      Province: province,
      Zipcode: zipcode,
      Telephone: telephone,
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

  const handleClear = (e) => {
    e.preventDefault();
    inputTextBusinessName.current.value = '';
    inputTextBusinessAddress.current.value = '';
    inputTextRoad.current.value = '';
    inputTextSubdistrict.current.value = '';
    inputTextDistrict.current.value = '';
    inputTextProvince.current.value = '';
    inputTextZipcode.current.value = '';
    inputTextTelephone.current.value = '';
  };

  return (
    <Fragment>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          fullWidth
          label={<Div>ชื่อร้านค้า</Div>}
          id="businessname"
          inputRef={inputTextBusinessName}
          onChange={(e) => handleChangeBusinessName(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '40%', padding: 1 }}
          label={<Div>ที่อยู่</Div>}
          id="businessAddress"
          inputRef={inputTextBusinessAddress}
          onChange={(e) => handleChangeBusinessAddress(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          label={<Div>ซอย</Div>}
          id="soi"
          inputRef={inputTextSoi}
          onChange={(e) => handleChangeSoi(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '70%', padding: 1 }}
          label={<Div>ถนน</Div>}
          id="road"
          inputRef={inputTextRoad}
          onChange={(e) => handleChangeRoad(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '55%', padding: 1 }}
          label={<Div>แขวง / ตำบล</Div>}
          id="subdistrict"
          inputRef={inputTextSubdistrict}
          onChange={(e) => handleChangeSubdistrict(e.target.value)}
        />
        <TextField
          sx={{ maxWidth: '55%', padding: 1 }}
          label={<Div>อำเภอ</Div>}
          id="district"
          inputRef={inputTextDistrict}
          onChange={(e) => handleChangeDistrict(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '100%', padding: 1 }}
          fullWidth
          label={<Div>จังหวัด</Div>}
          id="province"
          inputRef={inputTextProvince}
          onChange={(e) => handleChangeProvince(e.target.value)}
        />
      </Box>

      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: '100%', padding: 1 }}
          fullWidth
          label={<Div>รหัสไปรษณีย์</Div>}
          id="zipcode"
          inputRef={inputTextZipcode}
          onChange={(e) => handleChangeZipcode(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 1, display: 'flex' }}>
        <TextField
          sx={{ maxWidth: 'auto', padding: 1 }}
          fullWidth
          label={<Div>เบอร์โทร</Div>}
          id="telephone"
          inputRef={inputTextTelephone}
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
