import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {IconButton, Menu, MenuItem} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function AdminAppBar() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <AppBar position="relative">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon onClick={handleClick}/>
                <Menu
                    id="pages-menu"
                    keepMounted
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <Link style={{color: "inherit"}} to={'/admin/products'}>
                            Products
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link style={{color: "inherit"}} to={'/admin/products/create'}>
                            Create Product
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link style={{color: "inherit"}} to={'/admin'}>
                            Orders
                        </Link>
                    </MenuItem>
                </Menu>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Admin Bike Store
            </Typography>
        </Toolbar>
    </AppBar>;
}