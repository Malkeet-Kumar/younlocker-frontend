import React from 'react';
import { Box, Typography } from '@mui/material';

const ProductCard = ({ image, title, price }:any) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '100%',
          height: '250px',
          borderRadius: 2,
        }}
      />
      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1">
        ₹{price}
      </Typography>
    </Box>
  );
};

export default ProductCard;
