import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HomePage = () => {
    return (
        <>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
                    <Typography variant="h4" component="h1" color="black" sx={{ mb: 2 }} align='center'>
                        HOME PAGE
                    </Typography>
                </Box>
            </Container>
        </>
    )
}

export default HomePage