import React, { useEffect, useState } from "react";
import { styled, Icon, Stack } from "@mui/material";

const Table = styled("table")(() => ({
  minWidth: "100%",
  width: "100%",
  borderCollapse: "collapse"
}));

const Head = styled("thead")(() => ({
  color: "white"
}));

const Header = styled("th")(() => ({
  textAlign:"center",
  width: "fit-content",
  border: "1px solid grey",
  paddingLeft: "10px",
  paddingRight: "5px",
  paddingBlock: "2px",
  // textAlign: "left",
  fontSize: "13px",
  whiteSpace: "nowrap",
  cursor: "pointer",
  "&:first-child": {
    borderLeft: "none"
  },
  "&:last-child": {
    borderRight: "none"
  }
}));

const Footer = styled("div")(({ theme }) => ({
  width: '100%',
  paddingInline: "30px",
  paddingBlock: "10px",
  display: "flex",
  justifyContent: 'flex-start',  // Align items to the left
  alignItems: "center",
  boxSizing: 'border-box' 
}));

const Row = styled("tr")(() => ({
  padding: "1px"
}));

const Data = styled("td")(() => ({
  // textTransform:"uppercase",
  textAlign:"center",
  padding: "1px 5px",
  border: "1px solid rgb(204, 202, 202)",
  fontSize: "13px",
  fontWeight: "400",
  // fontFamily: "Arial",
  color: "#393939",
  backgroundColor: "white",
  whiteSpace: "nowrap",
  "&:first-child": {
    borderLeft: "none"
  },
  "&:last-child": {
    borderRight: "none"
  }
}));

const Button = styled("button")(() => ({
  height: "30px",
  width: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#c4ffc4",
  cursor: "pointer",
  "&:disabled": {
    backgroundColor: "#e0e0e0",
    cursor: "not-allowed"
  }
}));

const Select = styled("select")(() => ({
  padding: "6px",
  marginLeft: "15px",
  backgroundColor: "white",
  border: "1px solid grey"
}));

const DataTable = ({
  sourceData,
  columnStructure,
  pagination = false,
  headerBgColor = "#36304A",
  headerFontColor = "white"
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState(sourceData);

  useEffect(() => {
    setData([...sourceData]);
  }, [sourceData]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);

  const onSort = (column) => {
    if (!column.sort) return;

    let direction = "ascending";
    if (sortConfig.key === column.dataIndex && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      if (column.sort) {
        return direction === "ascending" ? column.sort(a, b) : column.sort(b, a);
      }
      if (a[column.dataIndex] < b[column.dataIndex]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[column.dataIndex] > b[column.dataIndex]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
    setSortConfig({ key: column.dataIndex, direction });
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <Stack style={{ width: "100%" }}>
      <Table>
        <Head style={{ backgroundColor: headerBgColor, color: headerFontColor }}>
          <Row>
            {columnStructure.map((column) => (
              <Header key={column.key ?? column.dataIndex} onClick={() => onSort(column)}>
                {column.title}
                {column.sort && sortConfig.key === column.dataIndex && (
                  <span>{sortConfig.direction === "ascending" ? " ▲" : " ▼"}</span>
                )}
              </Header>
            ))}
          </Row>
        </Head>
        <tbody>
          {sourceData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <Row key={rowIndex}>
                {columnStructure.map((column) => (
                  <Data key={column.dataIndex}>
                    {column.render
                      ? column.render(row[column.dataIndex], row, rowIndex)
                      : row[column.dataIndex]}
                  </Data>
                ))}
              </Row>
            ))
          ) : (
            <Data style={{ textAlign: "center" }} colSpan={columnStructure.length}>
              Empty
            </Data>
          )}
        </tbody>
      </Table>
      {sourceData.length > 0 && pagination ? (
        <Footer>
          <>
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <Icon>navigate_before</Icon>
            </Button>
            <span style={{ marginInline: "10px" }}>{`${currentPage} / ${totalPages}`}</span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Icon>navigate_next</Icon>
            </Button>
          </>
          <Select onChange={handleRowsPerPageChange} defaultValue={5}>
            <option value="5">5/Page</option>
            <option value="10">10/Page</option>
            <option value="20">20/Page</option>
            <option value="30">30/Page</option>
            <option value="50">50/Page</option>
          </Select>
        </Footer>
      ) : null}
    </Stack>
  );
};

export default DataTable;
