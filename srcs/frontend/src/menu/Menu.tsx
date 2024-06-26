import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import '../style/display.css';
import React from 'react';
import { PrivateGuard } from '../components/PrivateGuard';
import { useNavigate } from 'react-router-dom';
import WhiteX from '../asset/images/white_x.png';

function MenuElement(props) {
  return (
    <Link className="menu" to={{ pathname: `${props.url}` }}>
      {props.name}
    </Link>
  );
}

export default function Menu() {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <PrivateGuard />
      <div
        onClick={() => navigate(`${process.env.REACT_APP_HOME}`)}
        className="exit_button"
        style={{
          backgroundColor: 'red',
          float: 'right',
          height: 'undefined',
          width: 'undefined',
          minHeight: '1.5vw',
          maxHeight: '2vw',
          minWidth: '1.5vw',
          maxWidth: '2vw',
        }}
      >
        <img src={WhiteX} style={{ width: '100%' }} alt="cross" />
      </div>

      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={1}
        sx={{ width: '100%', height: '100%', marginTop: '10px' }}
      >
        <MenuElement name={'Profile'} url={process.env.REACT_APP_PROFILE} />
        <MenuElement name={'Friends'} url={process.env.REACT_APP_FRIENDS} />
        <MenuElement name={'Settings'} url={process.env.REACT_APP_SETTINGS} />
        <MenuElement
          name={'Match History'}
          url={process.env.REACT_APP_HISTORY}
        />
        <MenuElement
          name={'Achievement'}
          url={process.env.REACT_APP_ACHIEVEMENT}
        />
      </Stack>
    </React.Fragment>
  );
}
