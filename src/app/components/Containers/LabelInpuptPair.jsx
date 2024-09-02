import { Grid,styled } from "@mui/material";

const Pair = styled("div")(({ theme }) => ({
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: "40% 56%",
  textAlign: "right",
  alignItems: "center"
}));

const PairLI3Col = (props) => {
  const {renderError=()=>{}} = props
  return (
    <Grid style={{
      padding:0,
    }} item xs={4} sm={4} md={4}>
      <Pair>{props.children}</Pair>
        <Grid style={{
          textAlign:'center',
          color:'red'
        }} item xs={12} sm={12} md={12}>
        {renderError() ?? ""}
      </Grid>
    </Grid>
  );
};

export default PairLI3Col;
