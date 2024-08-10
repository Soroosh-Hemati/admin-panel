import { Outlet } from "react-router-dom"
import AppNav from "./AppNav"
import { Container, CssBaseline } from "@mui/material"

const drawerWidth = 240;

function Layout() {
    return (
        <>
            <Container maxWidth={false} sx={{ backgroundColor: '#fff', width: '100%', height: '100vh' }}>
                <CssBaseline />
                <AppNav drawerWidth={drawerWidth} />
                <Outlet />
            </Container>
        </>
    )
}

export default Layout