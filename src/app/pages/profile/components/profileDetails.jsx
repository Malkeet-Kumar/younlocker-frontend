import React, { useState } from "react";
import { Container, Avatar, Typography, Grid, Button, Box, IconButton, Stack } from "@mui/material";
import { Upload, Edit } from "@mui/icons-material";
import useStore from "../../../hooks/useStore";
import { RootContainer } from "../../../components/Containers";
import { Breadcrumb } from "../../../components";
import { useNavigate } from "react-router-dom";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const store = useStore();
  const { user } = store;

  const [avatar, setAvatar] = useState(user?.avatarUrl);
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [creditBalance] = useState(user.credits);

  const handleAvatarChange = (e) => {
    // Logic to handle avatar change
  };

  const handlePasswordChange = () => {
    // Logic to handle password change
  };

  const handlePurchaseCredits = () => {
    // Logic to handle credit purchase
  };

  const handleEditUsername = () => {
    // Logic to handle username edit
    alert("Edit username logic here");
  };

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ path: "/profile", name: "Profile" }]} />
      </Box>
      <Stack mt={2}>
        {/* <Container maxWidth="md"> */}

        <Grid container spacing={3} paddingInline={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" mb={4}>
              <Avatar src={avatar} sx={{ width: 100, height: 100, marginRight: 2 }} />
              <Button variant="contained" component="label" startIcon={<Upload />}>
                Change Avatar
                <input type="file" hidden onChange={handleAvatarChange} />
              </Button>
            </Box>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center">
                <Typography variant="body2">Username: {username}</Typography>
                <IconButton onClick={handleEditUsername} sx={{ marginLeft: 1 }}>
                  <Edit />
                </IconButton>
              </Box>
              <Typography variant="body2">Email: {email}</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/profile/changepassword")}
              >
                Change Password
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Available Credit Balance: {creditBalance} Credits</Typography>
            <Button variant="contained" color="primary" fullWidth onClick={handlePurchaseCredits}>
              Purchase Credits
            </Button>
          </Grid>
        </Grid>
        {/* </Container> */}
      </Stack>
    </RootContainer>
  );
};

export default ProfileDetails;
