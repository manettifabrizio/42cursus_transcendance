import { Stack } from '@mui/material';
import './style/buttons.css';
import LogoCyberpong from './asset/images/cyberpong.png';
import Logo42 from './asset/images/42_Logo.png';
import AfreireBraimbau from './asset/images/afreire_braimbau.png';
import FmanettiSelgrabl from './asset/images/fmanetti_selgrabl.png';

function App() {
  return (
    <div
      style={{
        backgroundColor: 'black',
        height: '100vh',
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        className="stack"
      >
        <img
          src={LogoCyberpong}
          style={{ width: '100%' }}
          alt="cyberpong logo"
        />

        <div
          onClick={() => window.open(process.env.REACT_APP_URL_AUTH, '_self')}
          className="conn_button"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%', height: '100%' }}
          >
            CONNECT
            <img
              src={Logo42}
              style={{ width: '15%', margin: '2%' }}
              alt="42 connnect"
            />
          </Stack>
        </div>

        <div>
          <img
            src={AfreireBraimbau}
            style={{ width: '50%' }}
            alt="afreire braimabu"
          />
          <img
            src={FmanettiSelgrabl}
            style={{ width: '50%' }}
            alt="fmanetti slegrabl"
          />
        </div>
      </Stack>
    </div>
  );
}

export default App;
