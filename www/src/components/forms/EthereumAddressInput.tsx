import { FC } from "react";
import TextField from "@mui/material/TextField";
import { fieldToTextField, TextFieldProps } from "formik-mui";
import { InputAdornment } from "@mui/material";
import { Diamond } from "@mui/icons-material";

export const EthereumAddressInput: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...fieldToTextField(props)}
      margin="normal"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Diamond />
          </InputAdornment>
        ),
      }}
    />
  );
};
