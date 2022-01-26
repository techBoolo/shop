import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const Nomatch = (props) => {

  return (
    <main styles={{ padding: '2rem'}}>
      nothing here
      <Link component={RouterLink} to='/'>home</Link>
    </main>
  );
};

export default Nomatch
