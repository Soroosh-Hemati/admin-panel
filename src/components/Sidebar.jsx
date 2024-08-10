
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material"

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
                    {['داشبورد', 'دسته بندی ها', 'محصولات', 'مقالات', 'کاربران'].map((text) => (
                        <ListItem key={text} disablePadding alignItems="center" >
                            <ListItemButton>
                                <ListItemText primary={text} sx={{ textAlign: 'center' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </>
    )
}

export default Sidebar