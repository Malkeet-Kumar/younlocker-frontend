import styled from "@emotion/styled";
import logo from '../../assets/logo.png'
import { constants } from "../utils/constant";

const Logo = styled("img")(({ theme }) => ({
  width: "26px",
  height: "26px",
  scale:5
}));

export default function MatxLogo({ className }) {
  return (
    <>
      <Logo src={logo} alt="logo" title={constants.TITLE_LONG} />
    </>
  );
}
