import React, { useContext } from 'react'
import { Context } from '../context/ContextApi'
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoutes = () => {
    const { isAuthenticated, loading} = useContext(Context);

  if(loading) {
    return (
      <Box sx={{ display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
         }}>
        <CircularProgress />
      </Box>
    );
  }   
  return isAuthenticated ? <Outlet/> : <Navigate to='/' />
}

export default ProtectedRoutes;