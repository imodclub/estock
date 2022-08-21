import React, { Fragment } from 'react'
import { Container, TextField,Box } from '@mui/material'
import Signin from './Signin';

function AddUserForm() {
    
    return (
      <Fragment>
        <Container>
                <Box sx={{ mt: 1, display: 'flex', maxWidth: '100%' }}>
                <TextField fullWidth label="name" id="name" />
          </Box>
        </Container>
      </Fragment>
    );
}

export default AddUserForm