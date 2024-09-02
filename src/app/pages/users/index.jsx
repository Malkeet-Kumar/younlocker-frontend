import { Box, Stack } from "@mui/material";
import { RootContainer, TableContainer } from "../../components/Containers";
import { Breadcrumb, DataTable } from "../../components";
import useGet from "../../hooks/useGet";
import { getDateForInput } from "../../utils/utils";
import { useEffect } from "react";
import withAlert from "../../../hoc/withAlert";
import { Switch } from "antd";
import usePut from "../../hooks/usePut";

const Users = ({ alertError, alertSuccess }) => {
  const [putState, putedData, updateUser] = usePut("user");
  const [userState, users = []] = useGet("user", [putedData]);

  useEffect(() => {
    if (userState.isError) {
      alertError(userState.isError);
    }
    if (userState.isSuccess) {
      alertSuccess("Users loaded successfully");
    }
  }, []);

  useEffect(() => {
    if (putState.isError) {
      alertError(putState.isError);
    }
    if (putState.isSuccess) {
      alertSuccess("User updated successfully");
    }
  }, [putState]);

  const cols = [
    {
      title: "Name",
      dataIndex: "name",
      render: (v) => v?.toUpperCase()
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (v) => v?.toUpperCase()
    },
    {
      title: "Credit Balance",
      dataIndex: "credits",
      render: (v) => v + " Credits".toUpperCase()
    },
    {
      title: "Credit Spent",
      dataIndex: "totalSpent",
      render: (v) => v + " Credits".toUpperCase()
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      render: (date) => getDateForInput(date)
    },
    {
      title: "Blocked",
      dataIndex: "isActive",
      render: (val, row) => (
        <Switch
          size="small"
          loading={putState.isLoading}
          checked={val}
          onChange={(val) => updateUser({ _id: row._id, isActive: val })}
        />
      )
    }
  ];

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "Users", path: "/users" }]} />
      </Box>
      <Stack spacing={3} mt={2}>
        <TableContainer
          title={userState.isLoading ? "Loading..." : "Total Record(s): " + users.length ?? 0}
        >
          <DataTable sourceData={users} columnStructure={cols} pagination />
        </TableContainer>
      </Stack>
    </RootContainer>
  );
};

export default withAlert(Users);
