import React from 'react'
import Signin from '../Components/Signin';
import ButtonAddBusiness from '../Components/ButtonAddBusiness'


function Material(props) {
   const { db, user } = props.value;
   if (user === null) {
     return <Signin />;
   }
  return (
    <div><ButtonAddBusiness value={{db:db,user:user}} /></div>
  )
}

export default Material