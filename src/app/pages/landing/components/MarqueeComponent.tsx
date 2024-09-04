import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const MarqueeComponent = () => {
  const theme = useTheme();
  const whatsappNumber = '+91 83970 87924';
  const whatsappURL = `https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`;

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        overflow: 'hidden', // Prevent scrollbars
        whiteSpace: 'nowrap', // Keep text on one line
        display: 'flex',
        alignItems: 'center', // Vertically center items
        py: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          animation: 'marquee 15s linear infinite', // Ensure animation is applied correctly
        }}
      >
        <Typography
          variant="h6"
          component="a"
          href={whatsappURL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center', // Vertically center text with icon
            color: theme.palette.common.white,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
            whiteSpace: 'nowrap', // Ensure text stays on one line
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 20, mr: 1 }} /> {/* Adjust size and spacing if needed */}
          For inquiries, WhatsApp us at: {whatsappNumber}
        </Typography>
      </Box>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default MarqueeComponent;
