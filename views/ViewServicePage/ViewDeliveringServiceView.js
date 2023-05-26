import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '../../components/Typography';

//other
import NEXTLink from 'next/link'
import { useRouter } from 'next/router';


export default function ViewDeliveringServiceView() {

    const router = useRouter();
    const [data, setData] = useState({});

    useEffect(() => {
        if (router.query.rowData) {
            const rowData = JSON.parse(router.query.rowData);
            setData(rowData);
        }
    }, [router.query.rowData]);


    return (
        <div>
            <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
                <Box sx={{ width: '100%', textAlign: 'center', display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }} border={1}>
                    <Typography variant="h6" align="center" >
                        Service Details
                    </Typography>
                    <img
                        src={data.serviceImage}
                        style={{ maxWidth: "100%", height: "auto", alignSelf: 'center' }}
                    />
                    <br />
                    <TextField
                        id="orderID"
                        label="Order ID"
                        defaultValue={data.id || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="serviceId"
                        label="Service ID"
                        defaultValue={data.serviceId || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <br />
                    <TextField
                        id="serviceName"
                        label="Service Name"
                        defaultValue={data.serviceName || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="serviceDetail"
                        label="Service Details"
                        defaultValue={data.serviceDetail || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="teamLink"
                        label="Team Link"
                        defaultValue={data.teamLink || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="language"
                        label="Language"
                        defaultValue={data.language || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="buyerID"
                        label="Buyer ID"
                        defaultValue={data.buyerID || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />
                    <TextField
                        id="dateArrange"
                        label="Date Arrange"
                        defaultValue={data.dateArrange || ''}
                        disabled={true}
                        multiline
                        sx={{ width: '50%', mt: '50px', mb: '50px', alignSelf: 'center' }}
                    />

                    <Box sx={{ width: '100%', textAlign: 'center', display: 'flex' }} >
                        <Button component={NEXTLink} prefetch={false} href='ViewServicePage' variant="contained" sx={{ mb: '10px', mt: '10px', ml: '10px', alignSelf: 'flex-start' }}>Back</Button>
                        <NEXTLink
                            href={{
                                pathname: './StartSessionPage',
                                query: { sessionData: JSON.stringify(data) },
                            }}
                            passHref
                        >
                            <Button variant="contained" sx={{ mb: '10px', mt: '10px', ml: '10px', alignSelf: 'flex-start', bgcolor: 'green' }}>Start Session</Button>
                        </NEXTLink>

                    </Box>
                </Box>
            </Container>
        </div>
    )
}
