import { Modal, Box, Typography, Button } from '@mui/material'
import React from 'react'


function ModalPrimary({ open, onClose, handleClose, handleDelete }) {
    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
            }}>
                <Typography variant="h6" component="h2">
                    تایید انجام عملیات
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    آیا از انجام این عملیات مطمئن هستید؟
                </Typography>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
                    <Box flexGrow={1}></Box>
                    <Button variant="outlined" color="primary" onClick={handleClose} sx={{ marginLeft: '1rem' }}>لغو</Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>تایید</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalPrimary