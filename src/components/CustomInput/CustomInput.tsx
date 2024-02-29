import * as React from 'react';
import { Typography, InputBase, styled } from '@mui/material';

const TextInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    fontSize: "1em",
    padding: "10px",
    margin: "0px 20px 1px 20px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "4px",
    fontFamily: ["Avenir-Book"].join(","),
    "&:focus": {
      border: `1px solid ${theme.palette.secondary.light}`,
    },
    "&:active": {
      border: `1px solid ${theme.palette.secondary.light}`,
    },
  },
}));

interface CustomInputProps {
  name: any;
  multiline?: boolean;
  rows?: number;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  placeHolder: any;
  onClick?: () => void; // onClick prop definition
  onChange: (value: any) => void; // onChange prop definition
}

const CustomInput: React.FC<CustomInputProps> = ({ name, multiline, rows, style, fullWidth, placeHolder, onChange }) => {
  return (
    <div>
      <Typography style={{ margin: "0px 20px 5px 20px", color: "#000" }}>{name}</Typography>
      <TextInput size="small" fullWidth={fullWidth} style={style} multiline={multiline} rows={rows} placeholder={placeHolder} onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default CustomInput;
