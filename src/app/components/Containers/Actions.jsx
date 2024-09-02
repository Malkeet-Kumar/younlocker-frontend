import { styled, Grid } from "@mui/material";
import React from "react";
const Container = styled("div")(() => ({}));

/**
 *
 * @param {object} style
 * @returns {JSX.Element}
 */
const ActionContainer = ({ children }) => {
  return (
    <Grid
      container
      style={{
        backgroundColor: "#d3d3d3",
        paddingInline: "40px",
        paddingBlock: "5px"
      }}
      columnGap={1}
      rowGap={1}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {React.Children.toArray(children).map((child) => {
        return (
          <Grid item sx={6} md={1} xl={1}>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ActionContainer;
