import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

function NavbarMessage() {
	return (
		<>
			<IconButton
				size="large"
				aria-label="show 4 new mails"
				color="inherit"
				sx={{ mx: 1 }}
			>
				<Badge badgeContent={4} color="error">
					<MailIcon />
				</Badge>
			</IconButton>
		</>
	);
}

export default NavbarMessage;
