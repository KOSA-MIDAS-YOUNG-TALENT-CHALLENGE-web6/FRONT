import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const SidebarData = [
    {
        title: "Dashboard",
        path: "../dashboard",
        icon: <DashboardIcon/>,
    },
    {
        title: "UserData",
        path: "../userdata",
        icon: <FolderSharedIcon/>,
    },
    {
        title: "Schedule",
        path: "../",
        icon: <CalendarMonthIcon/>,
    },
]