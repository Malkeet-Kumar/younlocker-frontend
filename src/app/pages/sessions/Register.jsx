import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, Grid, TextField, useTheme, Box, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";

import useStore from "../../hooks/useStore";
import { H2, Paragraph } from "../../components/Typography";
import withAlert from "../../../hoc/withAlert";

// STYLED COMPONENTS
const FlexBox = styled(Box)(({ justifyContent }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: justifyContent || "flex-start"
}));

const ContentBox = styled(FlexBox)(({ theme }) => ({
  height: "100%",
  padding: "20px",
  background: theme.palette.background.default
}));

const JWTRegister = styled(FlexBox)({
  background: "#1A2038",
  minHeight: "100vh",
  justifyContent: "center",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  }
});

// initial login credentials
const initialValues = {
  email: "",
  password: "",
  username: "",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 characters long")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

function JwtRegister({ alertError, alertSuccess }) {
  const theme = useTheme();
  const store = useStore();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    await store.register(values.email, values.username, values.password);
    if (store.error) {
      alertError(store.error);
      return;
    }
    alertSuccess("Registered successfully");
    setTimeout(() => {
      store.error = null;
      navigate("/login");
    }, 3000);
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox justifyContent="center">
              <img
                src="./src/assets/logo_box.png"
                width="56%"
                style={{ transform: "scale(1.2)" }}
                alt="Logo"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <H2 mt={4} textAlign="center">
              Register
            </H2>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="username"
                      label="Username"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.username}
                      onChange={handleChange}
                      helperText={touched.username && errors.username}
                      error={Boolean(errors.username && touched.username)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Password"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 2 }}
                    />

                    <LoadingButton
                      fullWidth
                      type="submit"
                      color="primary"
                      loading={store.isSubmitting}
                      variant="contained"
                      sx={{ mb: 2, mt: 2, backgroundColor: "orangered" }}
                    >
                      Register
                    </LoadingButton>

                    <Paragraph>
                      Already have an account?
                      <NavLink
                        to="/login"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Login
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
}

export default withAlert(JwtRegister);
