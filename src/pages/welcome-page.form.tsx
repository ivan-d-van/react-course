import { Button } from '@mui/material';
import React from 'react';

const WelcomePage: React.FC = () => {
  return (
    <div>
        <a href='/login'>
            <Button
                type="button"
                variant="contained"
                color="primary"
                size="medium"
                disableElevation= {true}
                sx={{ width: '15vw' }}
            > 
                Go to login
            </Button>
        </a>
        <a href='/registration'>
            <Button
                type="button"
                variant="contained"
                color="primary"
                size="medium"
                disableElevation= {true}
                sx={{ width: '15vw' }}
            > 
                Go to registration
            </Button>
        </a>
    </div>
  );
};

export default WelcomePage;