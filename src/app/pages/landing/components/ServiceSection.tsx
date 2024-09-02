import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { GoTag } from "react-icons/go";



const ServiceSection = () => {
  const theme = useTheme();

  const services = [
    {
      icon:<GoTag />,
      title: '24 HOURS SUPPORT',
      description: 'Support 24 hours / 7 days-a-week. Our company operates a 24 hour/7 day-a-week email & remote support service.',
    },
    {
      icon:"./images/icon1.png",
      title: 'BEST PRICES',
      description: 'If you find a cheaper price from our competitors, feel free to contact us. We can negotiate and always beat the competition.',
    },
    {
      icon:"./images/icon1.png",
      title: 'SIMPLE INSTRUCTIONS',
      description: 'Our instructions are easy to follow. If you can dial a phone number, you can enter the code!',
    },
    {
      icon:"./images/icon1.png",
      title: 'ABSOLUTELY SAFE',
      description: 'Completely safe, with no risk to your phone or hardware. No software downloads are required.',
    },
    {
      icon:"./images/icon1.png",
      title: 'Money Back Guarantee',
      description: 'All of our services are covered by our 100% Money Back Guarantee. We provide assurance that your service will be delivered in good faith.',
    },
    {
      icon:"./images/icon1.png",
      title: 'Expeditious Delivery',
      description: 'All open codes and confirmations are sent by e-mail to the address provided. We ensure timely delivery.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                borderRadius: 2,
                boxShadow: theme.shadows[4],
                padding: theme.spacing(4),
                display: 'flex',
                flexDirection:"column",
            justifyContent: 'center',
            alignItems: 'center',
                backgroundColor: '#2C2C2C', // Darker grey to match black theme
              }}
            >
                <Box
        sx={{
            width: '40px',
            height: '40px',
            marginBottom: theme.spacing(2),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
>
    <GoTag style={{ width: '100%', height: '100%', color: '#fff' }} />
</Box>

             
              <Typography variant="h6" gutterBottom sx={{ color: '#ffffff' }}>
                {service.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
                {service.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServiceSection;
