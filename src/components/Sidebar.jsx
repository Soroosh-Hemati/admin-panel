
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material"
import { NavLink } from "react-router-dom"

function Sidebar({ drawerWidth }) {
    return (
        <>
            <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
                variant="permanent"
                anchor="right">
                <Toolbar />
                <Divider />
                <List>
                    <ListItem key={'dashboard'} disablePadding alignItems="center">
                        <ListItemButton component={NavLink} to='/app'>
                            <ListItemText primary="داشبورد" sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'categories'} disablePadding alignItems="center">
                        <ListItemButton component={NavLink} to='categories'>
                            <ListItemText primary="دسته بندی ها" sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'products'} disablePadding alignItems="center">
                        <ListItemButton component={NavLink} to='products'>
                            <ListItemText primary="محصولات" sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'articles'} disablePadding alignItems="center">
                        <ListItemButton component={NavLink} to='articles'>
                            <ListItemText primary="مقالات" sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'users'} disablePadding alignItems="center">
                        <ListItemButton component={NavLink} to='users'>
                            <ListItemText primary="کاربران" sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </>
    )
}

export default Sidebar