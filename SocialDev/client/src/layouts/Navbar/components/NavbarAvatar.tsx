import React, { useState } from "react";
import { useSelector } from "react-redux";
// @ts-ignore
import { authSelector } from "stateStore/slices/authSlice";
// @ts-ignore
import useRequest from "hooks/use-request";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
// @ts-ignore
function NavbarAvatar(props) {
	// @ts-ignore
	const { loggedIn } = useSelector(authSelector);
	const [anchorEl, setAnchorEl] = useState(null);

	const { doRequest } = useRequest({
		url: "/api/auth/signout",
		method: "post",
		body: {},
	});
	// @ts-ignore
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
				sx={{ mx: 1 }}
			>
				<Stack direction="row" spacing={2}>
					<Avatar alt="Travis Howard" src="/avatar-image-example.jpg" />
				</Stack>
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				sx={{ mx: 3, mt: 5 }}
			>
				<MenuItem onClick={handleClose}>My Profile</MenuItem>
				<MenuItem
					onClick={() => {
						handleClose();
						doRequest();
						props.setModalShow(false);
					}}
				>
					Sign-Out
				</MenuItem>
			</Menu>
		</div>
	);
}

export default NavbarAvatar;
