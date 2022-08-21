import React, { Fragment, useState } from 'react'
import SignInSide from '../Components/SignInSide';

function Auth(props) {
  const user = props.user;

  return (
    <Fragment>
      <SignInSide user={user}  />
    </Fragment>
  )
}

export default Auth