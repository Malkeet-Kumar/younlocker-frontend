import { Grid, styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
    overflowX:'auto',
    borderLeft:"1px solid #CCCACA",
    borderRight:"1px solid #CCCACA",
    borderBottom:"1px solid #CCCACA",
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBlock: "4px",
  borderTop: "1px solid",
  borderLeft: "1px solid",
  borderRight: "1px solid",
  borderColor: "#0093D4",
  backgroundColor: "#0093D4"
}));

const Title = styled("span")(() => ({
  marginLeft: "8px",
  color: "white"
}));

const TableContainer = ({
  title,
  children,
  checkbox = false,
  onCheck = (checked) => {},
  checkboxVal = false
}) => {
  return (
    <div className="flex view_column">
      <Header>
        <Title>
          {checkbox ? (
            <input type="checkbox" checked={checkboxVal} onChange={(e) => onCheck(e.target.val)} />
          ) : null}
          {title}
        </Title>
      </Header>
      <Container>
          {children}
      </Container>
    </div>
  );
};

export default TableContainer;
