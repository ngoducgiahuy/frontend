import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ReceiptIcon from '@material-ui/icons/Receipt';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        title: "Category",
        icon: <CategoryIcon />,
        link: "/admin/cate",
    },
    {
        title: "Product",
        icon: <MenuBookIcon />,
        link: "/admin/product",
    },
    {
        title: "User",
        icon: <PersonIcon />,
        link: "/admin/user",
    },
    {
        title: "Order",
        icon: <ReceiptIcon />,
        link: "/admin/order",
    }
]
