import React, { useRef } from 'react';
import { Box, Button, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import ServiceSection from './components/ServiceSection';
import ProductCard from './components/ProductCard';
import ImageSlider from './components/ImageSlider';
import MarqueeComponent from './components/MarqueeComponent';

import bannerImage from "/images/banner.png"

// Product data for demonstration
const products = [
  { image: './images/image1.jpg', title: 'Product 1', price: 120 },
  { image: './images/image2.jpg', title: 'Product 2', price: 120 },
  { image: './images/image3.jpg', title: 'Product 3', price: 120 },
  { image: './images/image4.jpg', title: 'Product 4', price: 120 },
  { image: './images/image5.jpg', title: 'Product 5', price: 120 },
  { image: './images/image6.jpg', title: 'Product 6', price: 120 },
  { image: './images/image7.jpg', title: 'Product 7', price: 120 },
  { image: './images/image8.jpg', title: 'Product 8', price: 120 },
  { image: './images/image9.jpg', title: 'Product 9', price: 120 },
  { image: './images/image10.jpg', title: 'Product 10', price: 120 },
];

const images = [
  './images/slide1.jpg',
  './images/slide2.jpg',
  './images/slide3.jpg',
  './images/slide4.jpg',
];

const ComprehensiveHomepage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const featuredProductsRef = useRef(null);

  const handleShopNowClick = () => {
    if (featuredProductsRef.current) {
      window.scrollTo({
        top: featuredProductsRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: '#000000', // Changed to black
          color: '#ffffff',
          py: theme.spacing(2),
          margin: 0,
          padding: 1,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: isSmallScreen ? 'column' : 'row',
              textAlign: isSmallScreen ? 'center' : 'left',
            }}
          >
            <Typography variant="h6" sx={{ mb: isSmallScreen ? theme.spacing(2) : 0 }}>
              My Company
            </Typography>
            <Box>
              <Button
                variant="contained"
                sx={{ 
                  mb: isSmallScreen ? theme.spacing(1) : 0, 
                  mr: isSmallScreen ? 0 : theme.spacing(2),
                  backgroundColor: '#ff6600', // Orange color
                  '&:hover': {
                    backgroundColor: '#e65c00', // Darker orange on hover
                  },
                }}
                startIcon={<Twitter />}
              >
                Twitter
              </Button>
              <Button
                variant="contained"
                sx={{ 
                  mb: isSmallScreen ? theme.spacing(1) : 0, 
                  mr: isSmallScreen ? 0 : theme.spacing(2),
                  backgroundColor: '#ff6600',
                  '&:hover': {
                    backgroundColor: '#e65c00',
                  },
                }}
                startIcon={<Facebook />}
              >
                Facebook
              </Button>
              <Button
                variant="contained"
                sx={{ 
                  backgroundColor: '#ff6600',
                  '&:hover': {
                    backgroundColor: '#e65c00',
                  },
                }}
                startIcon={<Linkedin />}
              >
                LinkedIn
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <MarqueeComponent />

      {/* Hero Section */}
      <Box
        sx={{
          height: isSmallScreen ? '40vh' : '60vh',
          overflow: 'hidden',
          position: 'relative',
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          '&:before': {
            content: '""',
            display: 'block',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ffffff',
            textAlign: 'center',
            zIndex: 2,
            px: theme.spacing(2),
          }}
        >
          <Typography variant={isSmallScreen ? 'h4' : 'h2'} gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to Our Comprehensive Homepage
          </Typography>
          <Typography variant={isSmallScreen ? 'h6' : 'h5'} gutterBottom sx={{ fontStyle: 'italic' }}>
            Explore our wide range of products and services.
          </Typography>
          <Button
            variant="contained"
            sx={{ 
              mt: theme.spacing(4), 
              px: theme.spacing(4), 
              py: theme.spacing(1.5),
              backgroundColor: '#ff6600',
              '&:hover': {
                backgroundColor: '#e65c00',
              },
            }}
            onClick={handleShopNowClick}
          >
            Shop Now
          </Button>
        </Container>
      </Box>

      {/* Image Slider */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "50%",
          margin: `${theme.spacing(6)} auto 0 auto`,
        }}
      >
        <ImageSlider images={images} />
      </Box>

      {/* Featured Products */}
      <Container
        maxWidth="lg"
        sx={{
          py: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#ffffff', // White background
        }}
        ref={featuredProductsRef}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#000000' }}>
          Featured Products
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          justifyContent="center"
        >
          {products.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ServiceSection />

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#000000',
          color: '#ffffff',
          py: theme.spacing(4),
          margin: 0,
          padding: 0,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: isSmallScreen ? 'column' : 'row',
              textAlign: isSmallScreen ? 'center' : 'left',
            }}
          >
            <Typography variant="body1" sx={{ mb: isSmallScreen ? theme.spacing(2) : 0 }}>
              © 2023 My Company. All rights reserved.
            </Typography>
            <Box>
              <Button variant="text" color="inherit" sx={{ mb: isSmallScreen ? theme.spacing(1) : 0, mr: isSmallScreen ? 0 : theme.spacing(2) }}>
                Privacy Policy
              </Button>
              <Button variant="text" color="inherit">
                Terms of Service
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ComprehensiveHomepage />
  );
}

export default App;