import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const SignupSuccess = (props) => {

  return (
    <Paper sx={{ padding: 2, mt: 4}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Typography variant='body1'>You have signup successfully</Typography> 
          <Typography variant='body2'>please visit your email to verify your email</Typography> 
          <Link component={RouterLink} to='/users/signin'>Signin</Link>
      </Box>
    </Paper>
  );
};

export default SignupSuccess;
