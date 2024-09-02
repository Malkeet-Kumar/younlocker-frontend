import { CircularProgress, Box, styled } from "@mui/material";
import logo from '../../assets/logo.png'

const StyledLoading = styled("div")({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "auto",
    height: "26px",
    marginLeft:'2px',
    marginBottom:'2px'
  },
  "& .circleProgress": {
    position: "absolute",
    left: -7,
    right: 0,
    top: "calc(50% - 25px)"
  }
});

export default function Loading() {
  return (
    <StyledLoading>
      <Box position="relative">
        <img src={logo} alt="SDL" />
        <CircularProgress className="circleProgress" />
      </Box>
    </StyledLoading>
  );
}
