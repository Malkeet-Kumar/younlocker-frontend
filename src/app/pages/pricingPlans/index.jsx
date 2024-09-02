import { Box, Icon, Stack, Grid } from "@mui/material";
import {
  ActionContainer,
  PairLI3Col,
  RootContainer,
  TableContainer,
  ThreeColContainer
} from "../../components/Containers";
import { Breadcrumb, DataTable } from "../../components";
import { CInput, CLabel, CSelect, ResetButton, SaveButton } from "../../components/Elements";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";
import { Switch } from "antd";
import PricePlanCard from "../../components/PricePlanCard";
import usePostFormData from "../../hooks/usePostFormData";
import usePutFormData from "../../hooks/usePutFormData";
import Grid3Col from "../../components/Grid3Col";
import withAlert from "../../../hoc/withAlert";
import usePatch from "../../hooks/usePatch";

const PricingPlan = ({ alertSuccess, alertError }) => {
  const [logo, setLogo] = useState(null);
  const [postState, postedData, createPlan] = usePostFormData("pricePlan");
  const [putState, putedData, updatePlan] = usePutFormData("pricePlan");
  const [patchState, patchedData, mark] = usePatch("pricePlan");
  const [toolTypeState, tooltypes = []] = useGet("toolType?suggestions=1");
  const [planState, plans = []] = useGet("pricePlan", [postedData, patchedData, putedData]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (toolTypeState.isError) {
      alertError(toolTypeState.isError);
    }
  }, [toolTypeState]);

  useEffect(() => {
    if (putState.isSuccess) {
      alertSuccess("Price plan updated successfully");
    }
  }, [putState]);

  useEffect(() => {
    if (postState.isError) {
      alertSuccess("Price plan added successfully");
      resetForm();
    }
    if (postState.isError) {
      alertError(postState.isError);
    }
  }, [postState]);

  useEffect(() => {
    if (patchState.isSuccess) {
      alertSuccess("Price plan updated successfully");
      resetForm();
    }
    if (patchState.isError) {
      alertError(patchState.isError);
    }
  }, [patchState]);

  useEffect(() => {
    if (planState.isSuccess) {
      alertSuccess("Price plans loaded successfully");
    }
    if (planState.isError) {
      alertError(planState.isError);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      planName: "",
      price: "",
      toolType: "",
      duration: "",
      toolLogo: ""
    },
    onSubmit: async (values) => {
      editId
        ? updatePlan({ ...values, toolLogo: logo })
        : createPlan({ ...values, toolLogo: logo });
    }
  });

  const startEditing = (id) => {
    if (editId != id) {
      setEditId((p) => id);
      const plan = plans.filter((p) => p._id == id);
      plan[0].toolLogo = "";
      Object.entries(plan[0]).forEach(([k, v]) => formik.setFieldValue(k, v));
    } else {
      resetForm();
    }
  };

  const handleSubmit = async () => {
    try {
      formik.submitForm();
    } catch (error) {
      alertError(error.message);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setLogo(null);
    formik.resetForm();
  };

  const cols = [
    {
      title: "Plan Name",
      dataIndex: "planName"
    },
    {
      title: "Plan Price",
      dataIndex: "price"
    },
    {
      title: "Tool",
      dataIndex: "toolTypeText"
    },
    {
      title: "Duration (Hours)",
      dataIndex: "duration"
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      render: (val, row) => (
        <Switch
          loading={patchState.isLoading}
          checked={val}
          size="small"
          onChange={(val) => mark({ ...row, isActive: val })}
        />
      )
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id) => (
        <Icon style={{ color: "red", fontSize: "18px" }} onClick={() => console.log("delete")}>
          delete_outline
        </Icon>
      )
    },
    {
      title: "Edit",
      dataIndex: "_id",
      render: (id) => (
        <Icon
          style={{ color: editId == id ? "green" : "black", fontSize: "18px" }}
          onClick={() => startEditing(id)}
        >
          edit
        </Icon>
      )
    }
  ];
  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "Pricing Plans", path: "/priceplans" }]} />
      </Box>
      <Stack spacing={3}>
        <ThreeColContainer title="Price Plan" headerColor="#0093D4" borderColor="#0093D4">
          <PairLI3Col>
            <CLabel>Plan Name</CLabel>
            <CInput
              value={formik.values?.planName}
              onInput={(val) => formik.setFieldValue("planName", val)}
              placeholder="Plan Name"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Plan Price</CLabel>
            <CInput
              value={formik.values?.price}
              onInput={(val) => formik.setFieldValue("price", val)}
              placeholder="Plan Price"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Tool</CLabel>
            <CSelect
              list={[{ label: "Select Tool", value: "" }, ...tooltypes]}
              value={formik.values?.toolType}
              onChange={(val) => formik.setFieldValue("toolType", val)}
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Duration (Hours)</CLabel>
            <CInput
              value={formik.values?.duration}
              onInput={(val) => formik.setFieldValue("duration", val)}
              placeholder="Duration"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Tool Logo</CLabel>
            <CInput
              type="file"
              value={formik.values?.toolLogo}
              onInput={(val) => {
                formik.setFieldValue("toolLogo", val);
              }}
              onChange={(e) => setLogo(e.target.files[0])}
              placeholder="Plan Price"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Is Active</CLabel>
            <CInput
              type="checkbox"
              checked={formik.values?.isActive}
              onChecked={(val) => formik.setFieldValue("isActive", val)}
              style={{ width: "20px" }}
            />
          </PairLI3Col>
        </ThreeColContainer>
        <ActionContainer>
          <SaveButton
            disabled={postState.isLoading || patchState.isLoading}
            onClick={handleSubmit}
            text={editId ? "Update" : "Add"}
          />
          <ResetButton onClick={formik.resetForm} />
        </ActionContainer>

        <TableContainer
          title={planState.isLoading ? "Loading..." : "Total Record(s): " + plans.length ?? 0}
        >
          <DataTable pagination columnStructure={cols} sourceData={plans} />
        </TableContainer>
        <Grid3Col products={plans} />
      </Stack>
    </RootContainer>
  );
};

export default withAlert(PricingPlan);
