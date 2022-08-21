import React, { Fragment, useState } from 'react'
import Signin from '../Components/Signin';
import SignIn from '../Components/Signin'
import Signout from '../Components/Signout'
import CircularIndeterminate from '../Components/ProgressLoading'

function Auth(props) {
  const user = props.user;
  const [loading, setLoading] = useState(false)

  return (
    <Fragment>
      {user === null ? <SignIn /> : <Signout user={user}  />}
    </Fragment>
  )
}

export default Auth