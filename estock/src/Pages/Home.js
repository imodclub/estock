import React, { Fragment } from 'react'
import ListUserHome from '../Components/ListUserHome'

function Home(props) {
  const db = props.db
  return (
      <Fragment>
          <ListUserHome db={db} />
    </Fragment>
  )
}

export default Home