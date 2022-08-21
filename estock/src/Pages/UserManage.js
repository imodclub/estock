import React from 'react'
import ListUsers from '../Components/ListUserPageUser'
import ButtonAddUser from '../Components/ButtonAddUser'
import Signin from '../Components/Signin'

function UserManage(props) {
  const { db, user } = props.value
  if (user === null) {
    return <Signin />
  }
  return (
    <div>
      <ButtonAddUser />
      <ListUsers db={db} />
    </div>
  )
}

export default UserManage