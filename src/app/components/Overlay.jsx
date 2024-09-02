import { CircularProgress, Box, styled } from "@mui/material";
import logo from "../../assets/logo.png";
import { RootContainer } from "./Containers";

const StyledLoading = styled("div")({
    height:'100%',
    width:'100%',
  backgroundColor: "#80808026",
  //   transform:'translate(-50%,-50%)',
  "& img": {
    width: "auto",
    height: "26px",
    marginLeft: "2px",
    marginBottom: "2px"
  },
  "& .circleProgress": {
    position: "absolute",
    left: -7,
    right: 0,
    top: "calc(50% - 25px)"
  }
});

export default function OverlayLoading() {
  return (
    <RootContainer style={{
        display:'flex',
        aligItems:'center',
        justifyContent:'center',
        height:'100%',
        width:'100%',
        position:'fixed',
    }}>
      <StyledLoading>
        <Box position="relative">
          <img src={logo} alt="SDL" />
          <CircularProgress className="circleProgress" />
        </Box>
      </StyledLoading>
    </RootContainer>
  );
}
