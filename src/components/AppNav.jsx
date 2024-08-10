import { AppBar, Avatar, Box, Toolbar, Typography } from "@mui/material"

function AppNav({ drawerWidth }) {
    return (
        <>
            <AppBar
                color="secondary"
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, mr: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        پنل مدیریت ایران ساین
                    </Typography>
                    <Box flexGrow={1} />
                    <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"}>
                        <Typography variant="body1" marginLeft={1}>سروش همتی</Typography>
                        <Avatar>SH</Avatar>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default AppNav