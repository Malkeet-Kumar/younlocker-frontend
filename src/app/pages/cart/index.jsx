import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Box,
  IconButton
} from "@mui/material";
import { RootContainer } from "../../components/Containers";
import { Breadcrumb } from "../../components";
import {
  AddCircle as Plus,
  RemoveCircle as Minus,
  Delete as RemoveIcon
} from "@mui/icons-material";
import useGet from "../../hooks/useGet";
import usePatch from "../../hooks/usePatch";
import withAlert from "../../../hoc/withAlert";
import useDelete from "../../hooks/useDelete";
import usePost from "../../hooks/usePost";
import useStore from "../../hooks/useStore";
import { observer } from "mobx-react-lite";
import { Empty } from "antd";

const Cart = ({ alertError, alertSuccess }) => {
  const [patchState, patchedData, updateQuant] = usePatch("cart");
  const [deleteState, deletedData, deleteCart] = useDelete("cart");
  const [orderState, order, makeOrder] = usePost("order");
  const [productState, cart, setCart] = useGet("cart", [patchedData, deletedData, orderState]);
  const store = useStore();

  useEffect(() => {
    if (order.creditSpent > 0) {
      store.user.credits -= order.creditSpent
    }
  }, [order]);

  useEffect(() => {
    if (productState.isError) {
      alertError(productState.isError);
    }
    if (productState.isSuccess) {
      alertSuccess("Cart loaded successfully");
    }
  }, []);

  useEffect(() => {
    if (patchState.isError) {
      alertError(patchState.isError);
    }
    if (patchState.isSuccess) {
      alertSuccess("Quantity updated successfully");
    }
  }, [patchState]);

  useEffect(() => {
    if (orderState.isError) {
      alertError(orderState.isError);
    }
    if (orderState.isSuccess) {
      alertSuccess("Order placed. Check orders for credentials");
    }
  }, [orderState]);

  useEffect(() => {
    if (deleteState.isError) {
      alertError(deleteCart.isError);
    }
    if (deleteState.isSuccess) {
      alertSuccess("Product removed from cart successfully");
    }
  }, [deleteState]);

  const handleIncrease = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          if (item.quantity >= item.availableToolCount) {
            alertError(
              `Cannot increase quantity. Maximum available is ${item.availableToolCount}.`
            );
            return item;
          }
          updateQuant({ productId: id, quantity: item.quantity + 1 });
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  // Decrease quantity of an item
  const handleDecrease = (id) => {
    setCart(
      cart.map((item) => {
        if (item._id === id) {
          if (item.quantity <= 1) {
            alertError("Quantity cannot be less than 1.");
            return item;
          }
          updateQuant({ productId: id, quantity: item.quantity - 1 });
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id) => {
    deleteCart({ productId: id });
  };

  const handleProceedToPayment = () => {
    makeOrder();
  };

  return (
    <RootContainer>
      <Box mb={3}>
        <Breadcrumb routeSegments={[{ name: "Cart", path: "/cart" }]} />
      </Box>
      <Grid container spacing={3} style={{ height: "calc(100vh - 100px)" }}>
        {/* Adjust 100px based on your header height */}
        <Grid
          item
          xs={12}
          md={8}
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none"
            }
          }}
        >
          {cart.length>0?cart.map((p, index) => (
            <OrderItemCard
              key={index}
              {...p}
              onIncrease={() => handleIncrease(p._id)}
              onDecrease={() => handleDecrease(p._id)}
              onRemove={() => handleRemoveItem(p._id)}
            />
          )):<Empty style={{placeItems:"center"}}>
              <Typography variant="h5">Cart is empty</Typography>
            </Empty>}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-4" style={{ position: "sticky", top: "20px" }}>
            <ListItem>
              <Typography variant="h6" className="mb-4">
                PRICE DETAILS
              </Typography>
            </ListItem>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Price items(${cart.reduce((total, item) => total + item.quantity, 0)})`}
                />
                <Typography>
                  {cart.reduce((total, item) => total + item.quantity * item.price, 0)}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Discount" />
                <Typography className="text-green-500">{0}</Typography>
              </ListItem>
              {/* <ListItem>
                <ListItemText primary="Delivery Charges" />
                <Typography className="text-green-500"></Typography>
              </ListItem> */}
              <Divider />
              <ListItem>
                <ListItemText primary="Total Amount" />
                <Typography variant="h6">
                  {cart.reduce((total, item) => total + item.quantity * item.price, 0)} Credit
                </Typography>
              </ListItem>
              <ListItem>
                <Button
                  disabled={cart.length == 0}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  className="mt-4"
                  onClick={handleProceedToPayment}
                >
                  PROCEED TO PAYMENT
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </RootContainer>
  );
};

const OrderItemCard = ({
  planName,
  typeName,
  duration = 0,
  price = 0,
  quantity,
  availableToolCount,
  onIncrease,
  onDecrease,
  onRemove
}) => {
  const subtotal = price * quantity;

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
              image="../src/assets/logo_box.png"
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
          <Grid item xs={6} sm={4} md={4}>
            <Typography variant="h6" className="mb-2">
              {planName}
            </Typography>
            <Typography variant="body1" className="mb-1">
              <strong>Tool:</strong> {typeName}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mb-1">
              <strong>Duration:</strong> {duration} Hrs
            </Typography>
            <Box display="flex" alignItems="center" className="mb-2">
              <Typography variant="body2" className="mr-2">
                <strong>Quantity:</strong>
              </Typography>
              <IconButton size="small" onClick={onDecrease}>
                <Minus size={16} />
              </IconButton>
              <Typography variant="body1" className="mx-2">
                {quantity}
              </Typography>
              <IconButton size="small" onClick={onIncrease}>
                <Plus size={16} />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} sm={4}>
            <Typography variant="h6" className="mt-2">
              Subtotal: {subtotal.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Price per unit: {price.toFixed(2)} Credit
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Tool Available: {availableToolCount}
            </Typography>
            <Box display="flex" justifyContent="flex-end" flexDirection={"column"} mt={3}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<RemoveIcon />}
                onClick={onRemove}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withAlert(observer(Cart));
