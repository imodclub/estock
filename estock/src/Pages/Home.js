import React, { Fragment } from 'react'
import SignInSide from '../Components/SignInSide'

function Home(props) {
  const user = props.user
  return (
    <Fragment>
      <SignInSide user={user} />
    </Fragment>
  );
}

export default Home