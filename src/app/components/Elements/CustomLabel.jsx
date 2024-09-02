import { styled } from "@mui/material"

const Label = styled("label")(()=>({
    fontSize:"14px",
    fontWeight:'600',
    color:'black',
    fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
}))

const CLabel = (props)=>{
    return (
        <Label {...props}>{props.children}</Label>
    )
}

export default CLabel