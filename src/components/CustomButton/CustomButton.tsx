import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

const BootstrapButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.common.white,
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  // backgroundColor: '#0063cc',
  // borderColor: '#0063cc',

  backgroundColor: theme.palette.secondary.main,
  borderColor: theme.palette.secondary.light,

  '&:hover': {
    //   backgroundColor: '#0069d9',
    //   borderColor: '#0062cc',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.light,
  },
  '&:active': {
    boxShadow: 'none',
    //   backgroundColor: '#0062cc',
    //   borderColor: '#005cbf',
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.light,
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(58,110,33,.5)',
    //   boxShadow: '0 0 0 0.2rem',
    //   boxShadowColor: "rgba(0,123,255,.5)",
  },
}));

function CustomButton(props: ButtonProps) {
  return (
    <BootstrapButton {...props}>
      Bootstrap
    </BootstrapButton>
  )
}

export default CustomButton;