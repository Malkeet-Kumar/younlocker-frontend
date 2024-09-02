import { Box, Icon, Stack } from "@mui/material";
import {
  ActionContainer,
  PairLI3Col,
  RootContainer,
  TableContainer,
  ThreeColContainer,
  TwoColContainer
} from "../../components/Containers";
import { Breadcrumb, DataTable } from "../../components";
import useGet from "../../hooks/useGet";
import { getDateForInput } from "../../utils/utils";
import { CInput, CLabel, CSelect, ResetButton, SaveButton } from "../../components/Elements";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import usePost from "../../hooks/usePost";
import usePatch from "../../hooks/usePatch";
import initialValues from "./initialValues";
import validationSchema from "./validations";
import withAlert from "../../../hoc/withAlert";
import { Switch } from "antd";

const Password = ({ pass }) => {
  const [show, setShow] = useState(false);
  return (
    <span onClick={() => setShow((p) => !p)} title={show ? "Hide" : "Show"}>
      {!show ? "*******" : pass}
    </span>
  );
};

const Tools = ({ alertError, alertSuccess }) => {
  const [postState, postedData, createTool] = usePost("tool");
  const [patchState, patchedData, updateTool] = usePatch("tool");
  const [toolState, tools = []] = useGet("tool", [postedData, patchedData]);
  const [toolTypeState, toolTypes = []] = useGet("toolType?suggestions=1");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (toolState.isError || postState.isError || patchState.isError) {
      alertError(toolState.isError || postState.isError || patchState.isError);
    }
  }, [toolState, postState, patchState]);

  useEffect(() => {
    if (toolState.isSuccess) {
      alertSuccess("Tools loaded successfully");
    }
  }, []);

  useEffect(() => {
    if (postState.isSuccess) {
      alertSuccess("Tool added successfully");
    }
  }, [postState]);

  useEffect(() => {
    if (patchState.isSuccess) {
      alertSuccess("Tool updated successfully");
    }
  }, [patchState]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      (await editId) ? updateTool(values) : createTool(values);
      setEditId(null);
      formik.resetForm();
    }
  });

  const startEditing = (id) => {
    if (editId != id) {
      setEditId((p) => id);
      const tool = tools.filter((t) => t._id == id);
      Object.entries(tool[0]).forEach(([k, v]) => formik.setFieldValue(k, v));
    } else {
      setEditId(null);
      formik.resetForm();
    }
  };

  const handleSubmit = async (e) => {
    try {
      await validationSchema.validate(formik.values, { abortEarly: true });
      formik.submitForm();
    } catch (error) {
      alertError(error.message);
    }
  };

  const cols = [
    {
      title: "Name",
      dataIndex: "name",
      render: (val) => val?.toUpperCase()
    },
    {
      title: "Category",
      dataIndex: "categoryText",
      render: (val) => val?.toUpperCase()
    },
    {
      title: "User Name",
      dataIndex: "userName"
    },
    {
      title: "Password",
      dataIndex: "password",
      render: (val) => <Password pass={val} />
    },
    {
      title: "Available",
      dataIndex: "available",
      render: (val, row) => (
        <Switch
          loading={patchState.isLoading}
          checked={val}
          size="small"
          onChange={(val) => updateTool({ ...row, available: val })}
        />
      )
    },
    {
      title: "Edit",
      dataIndex: "_id",
      render: (id, row) => (
        <Icon
          style={{ color: editId == id ? "green" : "black", fontSize: "18px" }}
          onClick={() => startEditing(id)}
        >
          edit
        </Icon>
      )
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id, row) => (
        <Icon
          style={{ color: "red", fontSize: "18px" }}
          onClick={() => console.log("delete " + id)}
        >
          delete_outline
        </Icon>
      )
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      render: (date) => {
        const diffInMs = Math.abs(new Date() - new Date(date));
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours >= 1) {
          return `${Math.floor(diffInHours)} hour(s) ago`;
        } else {
          const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
          return `${diffInMinutes} minute(s) ago`;
        }
      }
    }
  ];

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "tools", path: "/tools" }]} />
      </Box>
      <Stack spacing={3} mt={2}>
        <ThreeColContainer title={"Tools"} headerColor="#0093D4" borderColor="#0093D4">
          <PairLI3Col>
            <CLabel>Tool Name</CLabel>
            <CInput
              value={formik.values.name}
              onInput={(val) => formik.setFieldValue("name", val)}
              placeholder="Tool Name"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Tool Type</CLabel>
            <CSelect
              value={formik.values.category}
              onChange={(val) => formik.setFieldValue("category", val)}
              list={[{ label: "Select Type", value: "" }, ...toolTypes]}
              placeholder="Tool Name"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Version</CLabel>
            <CInput
              value={formik.values.version}
              onInput={(val) => formik.setFieldValue("version", val)}
              placeholder="Version"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>User Name</CLabel>
            <CInput
              value={formik.values.userName}
              onInput={(val) => formik.setFieldValue("userName", val)}
              placeholder="UserName"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Password</CLabel>
            <CInput
              value={formik.values.password}
              onInput={(val) => formik.setFieldValue("password", val)}
              placeholder="Password"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Available</CLabel>
            <CInput
              type="checkbox"
              style={{ width: "20px" }}
              checked={formik.values.available}
              onChecked={(val) => formik.setFieldValue("available", val)}
            />
          </PairLI3Col>
        </ThreeColContainer>

        <ActionContainer>
          <SaveButton text={editId ? "Update" : "Add"} onClick={handleSubmit} />
          <ResetButton onClick={formik.resetForm} />
        </ActionContainer>

        <TableContainer
          title={toolState.isLoading ? "Loding..." : "Total Record(s): " + tools.length}
        >
          <DataTable pagination sourceData={tools} columnStructure={cols} />
        </TableContainer>
      </Stack>
    </RootContainer>
  );
};

export default withAlert(Tools);
