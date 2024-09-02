import * as yup from 'yup'
const validationSchema = yup.object().shape({
    category:yup.string().min(3,"Category is required"),
    name:yup.string().min(4,"Name must be 4 character long"),
    version:yup.string(),
    userName:yup.string().required("Username is required"),
    password:yup.string().required("Password is required"),
    available:yup.bool()
})

export default validationSchema