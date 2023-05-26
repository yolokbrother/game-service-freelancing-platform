import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import AddBoxIcon from '@mui/icons-material/AddBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import WalletIcon from '@mui/icons-material/Wallet';
import Button from '@mui/material/Button';
import NEXTLink from 'next/link';
//Other
import Typography from '../../components/Typography';
//Tabs
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProfileFunctions() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
  return (
      <div>
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
              <Card>
                  <Typography color="inherit" align="center" variant="h2" marked="center">
                      Functions
                  </Typography>
                  <CardMedia>
                      <Box sx={{ width: '100%' }}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="basic tabs example">
                                  <Tab label="Service" {...a11yProps(0)} />
                                  <Tab label="Order" {...a11yProps(1)} />
                                  <Tab label="Wallet" {...a11yProps(2)} />
                              </Tabs>
                          </Box>
                          <TabPanel value={value} index={0}>
                              <Button component={NEXTLink} prefetch={false} href="/CreateServicePage/CreateServicePage1" variant="contained" sx={{ marginRight: '10px' }}><AddBoxIcon/>Create Service</Button>
                              <Button component={NEXTLink} prefetch={false} href="/ViewServicePage" variant="contained" sx={{ marginLeft: '10px' }}><VisibilityIcon/>View Service</Button>
                          </TabPanel>
                          <TabPanel value={value} index={1}>        
                              <Button component={NEXTLink} prefetch={false} href="/ViewOrderPage" variant="contained" sx={{ marginLeft: '10px' }}><BorderColorIcon/>View Order</Button>
                              <Button component={NEXTLink} prefetch={false} href="/ViewSessionsPage" variant="contained" sx={{ marginLeft: '10px' }}><BorderColorIcon/>View Sessions</Button>
                          </TabPanel>
                          <TabPanel value={value} index={2}>
                            <Button variant="contained" sx={{ marginLeft: '10px' }}><WalletIcon/>View Wallet</Button>
                          </TabPanel>
                      </Box>
                  </CardMedia>
              </Card>
          </Container>
      </div>
  );
}
export default ProfileFunctions;
