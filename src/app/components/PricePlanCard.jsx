import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, styled } from '@mui/material';
// import ProductImage from './ProductImage'; // Import the updated styled component

// Styled components
const ProductCardContainer = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  margin: theme.spacing(2),
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  position: 'relative', // Position relative for the button positioning
  overflow: 'hidden',
}));

const ProductDetails = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
}));

const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '220px',
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: '100%',
  objectFit: 'contain',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
  },
}));

const ButtonOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'opacity 0.3s ease-in-out',
  opacity: 0,
  '&:hover': {
    opacity: 1,
  },
}));

const GetNowButton = styled(Button)(({ theme }) => ({
  border: `2px solid orangered`,
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  padding: theme.spacing(1.5, 4),
  fontSize: '1rem',
  transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor:"orangered",
    color: theme.palette.common.white,
},
}));
// backgroundColor: theme.palette.primary.main,

const PricePlanCard = ({ image, planName, price, duration, toolName, onGetNow, quantity }) => {
  return (
    <ProductCardContainer>
      {console.log(quantity)}
      <ProductImageContainer>
        <ProductImage
          component="img"
          alt={planName}
          image={image}
          title={planName}
        />
        <ButtonOverlay>
          <GetNowButton disabled={quantity==0} onClick={onGetNow}>
            {quantity>0?"Get Now":"Unavailable"}
          </GetNowButton>
        </ButtonOverlay>
      </ProductImageContainer>
      <ProductDetails>
        <Typography variant="h6" component="div" gutterBottom>
          {planName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Price: {price} credits
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Duration: {duration}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Tool: {toolName}
        </Typography>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default PricePlanCard;
