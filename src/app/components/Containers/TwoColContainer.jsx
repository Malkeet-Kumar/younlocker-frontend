import { Grid, styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  padding: "20px",
  paddingTop: "30px",
  borderBottom: "1px solid",
  borderLeft: "1px solid",
  borderRight: "1px solid",
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBlock: "4px",
  borderTop: "1px solid",
  borderLeft: "1px solid",
  borderRight: "1px solid",
}));

const Title = styled("span")(() => ({
  marginLeft: "8px",
  color: "white"
}));

const TwoColContainer = ({
  headerColor = "#EF9B1B",
  borderColor="#EF9B1B",
  title,
  children,
  checkbox = false,
  onCheck = (checked) => {},
  checkboxVal = false
}) => {
  return (
    <div className="flex view_column">
      <Header style={{ backgroundColor:headerColor,borderColor}}>
        <Title>
          {checkbox ? (
            <input type="checkbox" checked={checkboxVal} onChange={(e) => onCheck(e.target.val)} />
          ) : null}
          {title}
        </Title>
      </Header>
      <Container style={{borderColor}}>
        <Grid
          container
          style={{ gridRowGap: "10px" }}
          spacing={{ xs: 1.5, md: 1.5 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
        >
          {children}
        </Grid>
      </Container>
    </div>
  );
};

export default TwoColContainer;
