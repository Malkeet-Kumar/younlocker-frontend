import React from 'react';
import Slider from 'react-slick';
import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import ServiceSection from './components/ServiceSection';
import ProductCard from './components/ProductCard';
import ImageSlider from './components/ImageSlider';

// Product data for demonstration
const products = [
  { image: './images/image1.jpg', title: 'Product 1', price: 120 },
  { image: './images/image2.jpg', title: 'Product 2', price: 120 },
  { image: './images/image3.jpg', title: 'Product 3', price: 120 },
  { image: './images/image4.jpg', title: 'Product 4', price: 120 },
  { image: './images/image5.jpg', title: 'Product 5', price: 120 },
  { image: './images/image6.jpg', title: 'Product 6', price: 120 },
  { image: './images/image7.jpg', title: 'Product 6', price: 120 },
  { image: './images/image8.jpg', title: 'Product 6', price: 120 },
  { image: './images/image9.jpg', title: 'Product 6', price: 120 },
  { image: './images/image10.jpg', title: 'Product 6', price: 120 },
];

const images = [
  './images/slide1.jpg',
  './images/slide2.jpg',
  './images/slide3.jpg',
  './images/slide4.jpg',
];


const ComprehensiveHomepage = () => {
  const theme = useTheme();

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enables autoplay
    autoplaySpeed: 3000, // Sets autoplay speed (3 seconds)
  };

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#2c2c2c",
          color: '#fff',
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">My Company</Typography>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Twitter />}
                sx={{ mr: 2 }}
              >
                Twitter
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Facebook />}
                sx={{ mr: 2 }}
              >
                Facebook
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Linkedin />}
              >
                LinkedIn
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        sx={{
          height: '60vh',
          overflow: 'hidden',
          '&:before': {
            width: '100%',
            height: '100%',
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
            color: '#fff',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Our Comprehensive Homepage
          </Typography>
          <Typography variant="h5" gutterBottom>
            Explore our wide range of products and services.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 4 }}>
            Shop Now
          </Button>
        </Container>
      </Box>

     
          <div
          style={{
            width:"80%",
          //  marginTop:"50px",
           margin:"50px auto 0 auto",
          }}
          >
          <ImageSlider images={images} />

          </div>
      
      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
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
          backgroundColor: theme.palette.grey[900],
          color: '#fff',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="body1">© 2023 My Company. All rights reserved.</Typography>
            <Box>
              <Button variant="text" color="inherit" sx={{ mr: 2 }}>
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
