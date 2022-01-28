import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

const Profile = (props) => {
  const { currentUser } = useSelector(state => state.user);

  if(currentUser){
    return ( 
      <>
        <Typography>Profile page</Typography> 
        { currentUser?.email }
      </>
    );
  }
  return (
    <Navigate to='/users/signin' />
  )
};

export default Profile;
