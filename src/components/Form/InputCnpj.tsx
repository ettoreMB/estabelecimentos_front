import {  forwardRef, ForwardRefRenderFunction, useCallback, FormEvent } from "react";
import {  FilledInputProps, FormControl,Input, InputLabel, FormHelperText } from "@mui/material";
import { FieldError} from 'react-hook-form'
import { cnpjMask } from "../../utils/masks";
interface InputProps extends FilledInputProps {
  label?: string;
  name: string;
  err?: FieldError
} 



const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({name, label, err = null, ...rest}, ref) => {

   

    return (
      <FormControl variant="outlined"   >
        {!!label  && <InputLabel htmlFor={name}>{name}</InputLabel> }
         <Input id={name}  name={name} error={!!err}  ref={ref} {...rest} />
         {!!err && (<FormHelperText>{err?.message}</FormHelperText>)}
      </FormControl>
    )
  }

  export const InputCnpj = forwardRef(InputBase)