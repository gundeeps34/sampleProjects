import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Menu,
  Close,
  Favorite,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import Flex from "components/Flex";
import { grey } from "@mui/material/colors";

const LowerBar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const user = useSelector((state) => state.user);
    const user = {
        firstName: "Alex",
        lastName: "Haider",
        token: "eee",
        email: 'alexHaider@gmail.com',
    }
    const desktopScreens = useMediaQuery("(min-width: 1000px)");

    const fullName = `${user.firstName} ${user.lastName}`;
    return (
        <Flex padding="1rem 6%" sx={{bottom: "0"}}>
          <Flex gap="1.75rem">
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 2rem, 2.25rem)"
            //   color="primary"
              onClick={() => navigate("/home")}
              sx={{
                "&:hover": {
                //   color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Recipe Finder
            </Typography>
            {desktopScreens && (
              <Flex
                borderRadius="9px"
                gap="3rem"
                padding="0.1rem 1.5rem"
              >
                <InputBase placeholder="Search..." />
                <IconButton>
                  <Search />
                </IconButton>
              </Flex>
            )}
          </Flex>
    
          {/* DESKTOP NAV */}
          {desktopScreens ? (
            <Flex gap="2rem">
                <IconButton onClick={() => navigate(`${user.email}/likes`)}>
                <Favorite sx={{ fontSize: "25px" }} />
                </IconButton>
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: grey,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }
                }>Log Out</MenuItem>
                </Select>
              </FormControl>
            </Flex>
          ) : (
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Menu />
            </IconButton>
          )}
    
          {/* MOBILE NAV */}
          {!desktopScreens && isMobileMenuToggled && (
            <Box
              position="fixed"
              right="0"
              bottom="0"
              height="100%"
              zIndex="10"
              maxWidth="500px"
              minWidth="300px"
              backgroundColor={grey}
            >
              {/* CLOSE ICON */}
              <Box display="flex" justifyContent="flex-end" p="1rem">
                <IconButton
                  onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                  <Close />
                </IconButton>
              </Box>
    
              {/* MENU ITEMS */}
              <Flex
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap="3rem"
              >
                <Favorite sx={{ fontSize: "25px" }} />
                <FormControl variant="standard" value={fullName}>
                <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                        dispatch(setLogout());
                        navigate("/");
                    }}>
                    Log Out
                </MenuItem>
                </FormControl>
              </Flex>
            </Box>
          )}
        </Flex>
      );
    };

export default LowerBar;