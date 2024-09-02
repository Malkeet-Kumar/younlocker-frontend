import { Grid } from "@mui/material";
import PricePlanCard from "./PricePlanCard";

const Grid3Col = ({ products, addToCart }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <PricePlanCard
            quantity={product.availableToolCount}
            image={product.toolLogo}
            planName={product.planName}
            price={product.price}
            duration={product.duration + " Hrs"}
            toolName={product.toolType}
            onGetNow={() =>addToCart({productId:product._id})}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Grid3Col;
