import { styled } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  margin: "20px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "15px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const RootContainer = (props) => {
  return <Root style={props.style}>{props.children}</Root>;
};

export default RootContainer