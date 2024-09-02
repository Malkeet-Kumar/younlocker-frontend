import React from "react";
import { Box, Typography, Button, TextField, Grid } from "@mui/material";
import { styled } from "@mui/system";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import BuildIcon from "@mui/icons-material/Build";

const Container = styled(Box)(({ theme }) => ({
  minWidth: "1200px",
  maxWidth: "100%",
  margin: "0 auto"
}));

const Container1 = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "80dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const Header = styled(Box)(({ theme }) => ({
  minHeight: "100dvh",
  backgroundImage: "url('./src/assets/banner.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#fff",
  textAlign: "center",
  backgroundColor: "#000"
}));

const Nav = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: "20px",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "black"
}));

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "20px",
  "& a": {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "1.1rem"
  }
}));

const Hero = styled(Box)(({ theme }) => ({

}));

const Section = styled(Box)(({ theme }) => ({
  minHeight: "100dvh",
  padding: "60px 0",
  textAlign: "center"
}));

const ServiceItem = styled(Box)(({ theme }) => ({
  minHeight: "250px",
  backgroundColor: "#393737", // Red background for the service card
  color: "#fff", // White text color
  padding: "30px", // Increased padding
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow for depth
  textAlign: "center", // Center-align text
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" // Enhanced shadow on hover
  },
  "& h5": {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  "& p": {
    fontSize: "1.1rem"
  },
  "& .icon": {
    fontSize: "3rem", // Increased icon size
    color: "#ffc107", // Yellow color for icons
    marginBottom: "15px" // Space between icon and heading
  }
}));
// Styled component for the feature item
const FeatureItem = styled(Box)(({ theme }) => ({
  minHeight: "250px",
  backgroundColor: "#757575", // Red background for the feature card
  color: "#fff", // White text color
  padding: "30px", // Increased padding
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Box shadow for depth
  textAlign: "center", // Center-align text
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)" // Enhanced shadow on hover
  },
  "& h5": {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  "& p": {
    fontSize: "1.1rem"
  },
  "& .icon": {
    fontSize: "3rem", // Increased icon size
    color: "#ffc107", // Yellow color for icons
    marginBottom: "15px" // Space between icon and heading
  }
}));

// Styled component for the section heading
const SectionHeading = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "2.5rem", // Larger font size for the heading
  fontWeight: "bold",
  color: "#6c6666", // Red color for the heading
  marginBottom: "40px", // Space below the heading
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "50px",
    height: "4px",
    backgroundColor: "#ffc107", // Yellow underline
    position: "absolute",
    left: "50%",
    bottom: "-10px",
    transform: "translateX(-50%)",
    borderRadius: "2px"
  }
}));
const ContactForm = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  margin: "auto",
  "& .MuiTextField-root": {
    margin: "10px 0"
  }
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  padding: "20px 0"
}));

const LandingPage = () => {
  return (
    <div>
      <Header>
        <Container1>
          <Nav>
            <Typography variant="h4" component="div">
              Younlocker
            </Typography>
            <NavLinks>
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#features">Features</a>
              <a href="#contact">Contact</a>
            </NavLinks>
          </Nav>
          <Hero>
            <Typography variant="h2" fontWeight={"800"}> Tool Rental Service</Typography>
            <Typography variant="h6" gutterBottom>
              Your one-stop solution for all mobile unlocking and repair software tools.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff5722", color: "#fff", fontWeight:"500", fontSize:"18px" }}
              href="#services"
            >
              Explore
            </Button>
          </Hero>
        </Container1>
      </Header>

      <Box id="services" sx={{ backgroundColor: "#f4f4f4", py: 6 }}>
        <Container>
          <SectionHeading variant="h4" gutterBottom>
            Our Services
          </SectionHeading>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceItem>
                <BuildIcon className="icon" />
                <Box>
                  <Typography variant="h5">Software Tools</Typography>
                  <Typography>
                    Rent cutting-edge mobile repairing software tools to unlock, diagnose, and fix
                    any mobile device.
                  </Typography>
                </Box>
              </ServiceItem>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceItem>
                <HeadsetMicIcon className="icon" />
                <Box>
                  <Typography variant="h5">Technical Support</Typography>
                  <Typography>
                    24/7 technical support for all rented tools. Our experts are here to assist you.
                  </Typography>
                </Box>
              </ServiceItem>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ServiceItem>
                <AccountBalanceWalletIcon className="icon" />
                <Box>
                  <Typography variant="h5">Affordable Plans</Typography>
                  <Typography>
                    Flexible rental plans tailored to your needs. Pay only for the tools you use.
                  </Typography>
                </Box>
              </ServiceItem>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box id="features" sx={{ backgroundColor: "#f4f4f4", py: 6 }}>
        <Container>
          <SectionHeading variant="h4" gutterBottom>
            Why Choose Younlocker?
          </SectionHeading>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureItem>
                <BuildIcon className="icon" />
                <Typography variant="h5">Custom Software Solutions</Typography>
                <Typography>
                  Tailor-made software solutions to fit your unique mobile repair needs and enhance
                  efficiency.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureItem>
                <HeadsetMicIcon className="icon" />
                <Typography variant="h5">Expert Consultation</Typography>
                <Typography>
                  Get professional advice and support from our experts to solve complex repair
                  challenges.
                </Typography>
              </FeatureItem>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FeatureItem>
                <LocalOfferIcon className="icon" />
                <Typography variant="h5">Flexible Rental Options</Typography>
                <Typography>
                  Choose from a variety of rental plans that best fit your needs and budget.
                </Typography>
              </FeatureItem>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Section id="contact">
        <Container>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography gutterBottom>Have questions? Need help? Get in touch with us!</Typography>
          <ContactForm component="form">
            <TextField label="Your Name" fullWidth variant="outlined" required />
            <TextField label="Your Email" type="email" fullWidth variant="outlined" required />
            <TextField
              label="Your Message"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              required
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#ff5722", color: "#fff" }}
              type="submit"
            >
              Send Message
            </Button>
          </ContactForm>
        </Container>
      </Section>

      <Footer>
        <Container>
          <Typography variant="h5">Younlocker</Typography>
          <Box sx={{ marginTop: "10px" }}>
            <a href="#home" style={{ color: "#fff", marginRight: "15px" }}>
              Home
            </a>
            <a href="#services" style={{ color: "#fff", marginRight: "15px" }}>
              Services
            </a>
            <a href="#features" style={{ color: "#fff", marginRight: "15px" }}>
              Features
            </a>
            <a href="#contact" style={{ color: "#fff" }}>
              Contact
            </a>
          </Box>
          <Typography sx={{ marginTop: "20px" }}>
            &copy; 2024 Younlocker. All rights reserved.
          </Typography>
        </Container>
      </Footer>
    </div>
  );
};

export default LandingPage;
