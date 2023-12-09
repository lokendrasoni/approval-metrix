import { Home, People, RocketLaunch } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { SidebarDiv } from "styles/style";

export default function Sidebar() {
    const router = useRouter();
    const [active] = useState(router.pathname);
    const navigation = [
        { key: "dashboard", title: "Dashboard", icon: Home, link: "/dao/dashboard" },
        { key: "quicksend", title: "Quick Send", icon: RocketLaunch, link: "/dao/quick-send" },
        { key: "contacts", title: "Contributors", icon: People, link: "/dao/contributors" },
    ];

    return (
        <SidebarDiv>
            <h2>Buildoors!</h2>
            <List>
                {navigation.map(item => (
                    <ListItem key={item.key} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <ListItemButton
                            selected={active === item.link}
                            onClick={() => router.push(item.link)}
                        >
                            <ListItemIcon style={{ minWidth: "30px", color: "white" }}>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </SidebarDiv>
    );
}
