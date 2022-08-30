import React, { useEffect, useState } from 'react'
import InputAddress from 'react-thailand-address-autocomplete';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


function TestReadeJSON() {
   

    return (
      <div>
        แขวง / ตำบล
        <InputAddress
                address="subdistrict"
                
          
        />
        เขต / อำเภอ
        <InputAddress
          address="district"
          
        />
      </div>
    );
  }

export default TestReadeJSON