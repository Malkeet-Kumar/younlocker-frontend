import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography, Button, Stack } from "@mui/material";
import { Delete as RemoveIcon } from "@mui/icons-material";
import { Box } from "@mui/material";
import { RootContainer } from "../../components/Containers";
import { Breadcrumb } from "../../components";
import withAlert from "../../../hoc/withAlert";
import useGet from "../../hooks/useGet";
import { Popconfirm } from "antd";

const Orders = ({ alertError, alertSuccess }) => {
  const [orderState, orders] = useGet("order");

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "Orders", path: "/orders" }]} />
      </Box>
      <Stack spacing={3}>
        {orders.map((p) => (
          <ProductCard {...p} />
        ))}
      </Stack>
    </RootContainer>
  );
};

const ProductCard = ({
  toolName,
  version,
  toolImage,
  isValid,
  userName,
  password,
  purchaseDate,
  onRemove
}) => {
  return (
    <Card className="m-3" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid
            item
            sm={3}
            md={3}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <CardMedia
              component="img"
              image={toolImage}
              alt="Tool Image"
              sx={{
                height: {
                  xs: "150px",
                  md: 90
                },
                width: {
                  xs: "auto",
                  md: 90
                },
                marginTop: 2,
                marginBottom: 3,
                objectFit: "contain",
                scale: "1.4"
              }}
            />
          </Grid>
          <Grid item xs={6} sm={5} md={5}>
            <Typography variant="h6" className="mb-2">
              {toolName} (v{version})
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Username:</strong> {userName}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Password:</strong> {password}
            </Typography>
            <Typography variant="body2" className="mb-1">
              <strong>Purchase Date:</strong> {new Date(purchaseDate).toLocaleString()}
            </Typography>
            <Typography variant="body2" color={isValid ? "green" : "red"} className="mb-1">
              <strong>Status:</strong> {isValid ? "Valid" : "Invalid"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            sm={4}
            sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
          >
            <Popconfirm title="Sure to remove">
              <Box display="flex" flexDirection={"column"} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<RemoveIcon />}
                  onClick={onRemove}
                >
                  Remove
                </Button>
              </Box>
            </Popconfirm>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withAlert(Orders);
