import { Link as RouterLink } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Nomatch = (props) => {

  return (
    <Paper sx={{ p: 2, mt: 4}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ mb: 2}}>Nothing here</Typography>
        <Link component={RouterLink} to='/'>home</Link>
      </Box>
    </Paper>
  );
};

export default Nomatch
