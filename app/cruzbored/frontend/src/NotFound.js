import {Box, Typography} from '@mui/material';
import React from 'react';

/**
 * Simple component with one state variable.
 *
 * @return {object} JSX
 */
function NotFound() {
  return (
    <Box
      sx ={{
        display: 'flex',
      }}
    >
      <Typography
        sx = {{
          display: 'flex',
          ml: 'auto',
          mr: 'auto',
          mb: 'auto',
          mt: 'auto',
        }}
        variant = 'h1' component ='div'>
        {'404 Not Found'}
      </Typography>
    </Box>
  );
}

export default NotFound;