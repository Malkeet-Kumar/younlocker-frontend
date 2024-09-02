import { Box, Stack } from "@mui/material";
import { RootContainer } from "../../components/Containers";
import { Breadcrumb } from "../../components";
import withAlert from "../../../hoc/withAlert";
import Grid3Col from "../../components/Grid3Col";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { useEffect } from "react";

const Shop = ({ alertError, alertSuccess }) => {
  const [productState, products] = useGet("shop");
  const [postState, postedData, addToCart] = usePost("cart")

  useEffect(()=>{
    if(postState.isError){
      alertError(postState.isError)
    } 
    if(postState.isSuccess){
      alertSuccess("Added to cart successfully")
    }
  },[postState])

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "Shop", path: "/shop" }]} />
      </Box>
      <Stack spacing={3}>
        <Grid3Col products={products} addToCart={addToCart} />
      </Stack>
    </RootContainer>
  );
};

export default withAlert(Shop);
