import { TextField, Grid } from "@mui/material";
import { InputBaseComponentProps } from "@mui/material"
interface ViewTextFieldProps extends InputBaseComponentProps {
  text?: string | number;
  labelName:string;
  size: number;
}


export function ViewTextField({text, labelName,size, ...rest}, ref: ViewTextFieldProps) {
  return (
    <Grid item xs={size}>
      <TextField 
      sx={{
        "& .Mui-disabled": {
          color: "primary.main"
        },
        
      }}
      autoFocus={false}
      label={labelName}
      value={text ? text : '***'}
      {...rest}
    />
    </Grid>
     
  )
}