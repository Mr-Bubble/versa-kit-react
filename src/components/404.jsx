import React from 'react';
import { Box, Typography, Button } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        marginTop: '100px',
        maxWidth: 'md',
        mx: 'auto',
      }}
    >
      <Typography level="h1" color="primary">
        404
      </Typography>
      <Typography level="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography level="body1" sx={{ mb: 2 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button variant="solid" onClick={handleGoHome}>
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
