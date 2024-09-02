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
import { CInput, CLabel, ResetButton, SaveButton } from "../../components/Elements";
import { useFormik } from "formik";
import * as yup from "yup";
import withAlert from "../../../hoc/withAlert";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import usePatch from "../../hooks/usePatch";
import { useEffect, useState } from "react";
import { Switch } from "antd";
import { Span } from "../../components/Typography";

const validationSchema = yup.object().shape({
  toolName: yup.string().min(3, "Tool Name must be 3 characters long")
});

const ToolType = ({ alertError, alertSuccess }) => {
  const [postState, postedData, createToolType] = usePost("toolType");
  const [patchState, patchedData, updateToolType] = usePatch("toolType");
  const [toolTypeState, data] = useGet("toolType", [postedData, patchedData]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (postState.isError || patchState.isError || toolTypeState.isError) {
      alertError(postState.isError || patchState.isError || toolTypeState.isError);
    }
  }, [postState, patchState, toolTypeState]);

  useEffect(() => {
    if (postState.isSuccess) {
      alertSuccess("Tool type added successfully");
    }
  }, [postState]);

  useEffect(() => {
    if (patchState.isSuccess) {
      alertSuccess("Tool type updated successfully");
    }
  }, [patchState]);

  useEffect(() => {
    if (toolTypeState.isSuccess) {
      alertSuccess("Tool types loaded successfully");
    }
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeName: "",
      price: "",
      isActive: false
    },
    validationSchema,
    onSubmit: async (values) => {
      (await editId) ? updateToolType(values) : createToolType(values);
      setEditId(null);
      formik.resetForm();
    }
  });

  const startEditing = (id) => {
    if (id != editId) {
      setEditId((p) => id);
      const tool = data.filter((t) => t._id == id);
      Object.entries(tool[0]).forEach(([k, v]) => formik.setFieldValue(k, v));
    } else {
      setEditId(null);
      formik.resetForm();
    }
  };

  const handleSubmit = async (e) => {
    try {
      await validationSchema.validate(formik.values, { abortEarly: true });
      formik.submitForm(e);
    } catch (error) {
      alertError(error.message);
    }
  };

  const cols = [
    {
      title: "Type Name",
      dataIndex: "typeName",
      render: (v) => v.toUpperCase()
    },
    {
      title: "Is Active",
      dataIndex: "_id",
      render: (id, row) => (
        <Switch
          size="small"
          loading={patchState.isLoading}
          checked={row.isActive}
          onChange={(val) => updateToolType({ ...row, isActive: val })}
        />
      )
    },
    {
      title: "Edit",
      dataIndex: "_id",
      render: (id, row) => {
        return (
          <Icon
            onClick={() => startEditing(id)}
            style={{ fontSize: "18px", color: editId == id ? "green" : "black" }}
          >
            edit
          </Icon>
        );
      }
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id, row) => {
        return <Icon style={{ fontSize: "18px", color: "red" }}>delete_outline</Icon>;
      }
    }
  ];

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "ToolType", path: "/tooltype" }]} />
      </Box>
      <Stack spacing={3}>
        <TwoColContainer headerColor="#0093D4" borderColor="#0093D4" title="Tool Type">
          <PairLI3Col>
            <CLabel>Type Name</CLabel>
            <CInput
              value={formik.values.typeName}
              onInput={(val) => formik.setFieldValue("typeName", val)}
              placeholder="Tool Name"
            />
          </PairLI3Col>

          <PairLI3Col>
            <CLabel>Is Active</CLabel>
            <CInput
              type="checkbox"
              checked={formik.values.isActive}
              onChecked={(val) => formik.setFieldValue("isActive", val)}
              style={{ width: "20px" }}
            />
          </PairLI3Col>
        </TwoColContainer>
        <ActionContainer>
          <SaveButton
            disabled={postState.isLoading}
            text={editId ? "Update" : "Add"}
            onClick={handleSubmit}
          />
          <ResetButton onClick={formik.resetForm} />
        </ActionContainer>

        <TableContainer
          title={toolTypeState.isLoading ? "Loading..." : "Total Record(s): " + data.length ?? 0}
        >
          <DataTable pagination sourceData={data} columnStructure={cols} />
        </TableContainer>
      </Stack>
    </RootContainer>
  );
};

export default withAlert(ToolType);
