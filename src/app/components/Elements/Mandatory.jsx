import { styled } from "@mui/material";

const Span = styled("span")(() => ({
  fontWeight: "800",
  color: "red",
  fontSize:'14px'
}));

const Mandatory = () => <Span>*</Span>;

export default Mandatory