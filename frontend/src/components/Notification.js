import { useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';

const Notification = (props) => {
  const { data } = useSelector(state => state.notification)
  if(data)
    return (
      <Alert sx={{mb: 2}} severity={data._status}>
        { data.message}
      </Alert>
    )
    return null
};

export default Notification;
