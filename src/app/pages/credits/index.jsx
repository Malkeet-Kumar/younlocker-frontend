import { Box, Stack, Tab } from "@mui/material";
import {
  ActionContainer,
  PairLI3Col,
  RootContainer,
  TableContainer,
  TwoColContainer
} from "../../components/Containers";
import { Breadcrumb, CustomAutoComplete, DataTable } from "../../components";
import withAlert from "../../../hoc/withAlert";
import { CInput, CLabel, ResetButton, SaveButton } from "../../components/Elements";
import { Label } from "@mui/icons-material";
import { useFormik } from "formik";
import useGet from "../../hooks/useGet";
import * as yup from "yup";
import usePut from "../../hooks/usePut";
import { useEffect } from "react";
import usePost from "../../hooks/usePost";
import { getDateForInput } from "../../utils/utils";

const validationSchema = yup.object().shape({
  userId: yup.string().min(1, "Select User"),
  credits: yup
    .number()
    .typeError("Minium 5 credites can be added")
    .min(5, "Minium 5 credites can be added")
});

const Credits = ({ alertError, alertSuccess }) => {
  const [userOptionState, userSuggestions] = useGet("user?suggestions=1");
  const [postState, postedData, addCredits] = usePost("credit");
  const [historyState, history=[]] = useGet("credit",[postedData])

  useEffect(()=>{
    if(postState.isError){
      alertError(postState.isError)
    }
    if(postState.isSuccess){
      alertSuccess("Credits added successfully")
    }
  },[postState])

  useEffect(()=>{
    if(historyState.isError){
      alertError(historyState.isError)
    }
    if(historyState.isSuccess){
      alertSuccess("Credits history loaded successfully")
    }
  },[])

  const formik = useFormik({
    initialValues: {
      userId: "",
      credits: 0
    },
    validationSchema,
    onSubmit: async (values) => {
      await addCredits(values);
      formik.resetForm();
    }
  });

  const handleSumit = async () => {
    try {
      await validationSchema.validate(formik.values);
      formik.submitForm();
    } catch (error) {
      alertError(error.message);
    }
  };

  const cols =[
    {
      title:"User Email",
      dataIndex:"user"
    },
    {
      title:"Vendor Email",
      dataIndex:"vendor"
    },
    {
      title:"Credits",
      dataIndex:"credits",
      render:val=><span style={{padding:"2px", backgroundColor:"#ff8484", borderRadius:"3px", color:"white"}}>+ {val}</span>
    },
    {
      title:"Credit Balance",
      dataIndex:"balance"
    },
    {
      title:"Date",
      dataIndex:"createdAt",
      render:date=>getDateForInput(date)
    }
  ]

  return (
    <RootContainer>
      <Box>
        <Breadcrumb routeSegments={[{ name: "Credits", path: "/credits" }]} />
      </Box>
      <Stack spacing={3}>
        <TwoColContainer title={"Credits Recharge"} headerColor="#0093D4" borderColor="#0093D4">
          <PairLI3Col>
            <CLabel>Email</CLabel>
            <CustomAutoComplete
              value={formik.values.userId}
              onChange={(val) => formik.setFieldValue("userId", val)}
              list={userSuggestions}
              placeholder="Search User"
            />
          </PairLI3Col>
          <PairLI3Col>
            <CLabel>Credit Recharge</CLabel>
            <CInput
              value={formik.values.credits}
              onInput={(val) => formik.setFieldValue("credits", val)}
              placeholder="Credit Recharge"
            />
          </PairLI3Col>
        </TwoColContainer>
        <ActionContainer>
          <SaveButton onClick={handleSumit} text="Rechg." />
          <ResetButton onClick={formik.resetForm} />
        </ActionContainer>
        <TableContainer title={historyState.isLoading?"Loading...":"Recharge Hitstory : " +history.length ?? 0}>
          <DataTable sourceData={history} columnStructure={cols} />
        </TableContainer>
      </Stack>
    </RootContainer>
  );
};

export default withAlert(Credits);
