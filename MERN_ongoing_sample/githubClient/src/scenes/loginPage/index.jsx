import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";
import './index.css';

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        display='flex'        
      >
        <Box className="iniBox">
          <Box className='upperLogoBox'>
            <img className="upperLogo" display='block' position='absolute' src='http://localhost:3000/assets/Group 26.svg' />
            <Box className='mainSlogan'>
              <Typography> 
                Cook With What You Have.
              </Typography>
              <Box position='relative' bottom='-200px' left='50px'>
                <img width='170px' src='http://localhost:3000/assets/Vector 5.svg' />
              </Box>
            </Box>
            <Box top='150px' left='320px' position='absolute'>
              <img width='780px' src='http://localhost:3000/assets/recipeImage.png' />
            </Box>
            <Box top='192px' position='relative'>
              <img width='570px' src='http://localhost:3000/assets/Vector 4.svg' />
            </Box>
          </Box>
        </Box>
        <Box className='loginBox'>
          <Box className= "welcomeBox">
            <Typography className='first'>
              Welcome Back
            </Typography>
            <Typography className="second">
              Please log in to your account
            </Typography>
          </Box>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
