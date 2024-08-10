import { Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import { Box, Container, CssBaseline, Toolbar, Typography, } from "@mui/material"
import Sidebar from "./Sidebar";

const drawerWidth = 240;

function Layout() {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppNav drawerWidth={drawerWidth} />
                <Sidebar drawerWidth={drawerWidth} />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Outlet/>
                </Box>
            </Box>
        </>
    )
}

export default Layout