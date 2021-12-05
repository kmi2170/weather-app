import { useState } from "react";
import Image from "next/image";

import { Typography, Menu, MenuItem, IconButton } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

import Buttons from "./Buttons";
import icon_setting from "../../../public/icon_setting.png";

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
}));

const MenuComponent: React.FC = () => {
  // const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="switch-units"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Image src={icon_setting} alt="setting icon" width={25} height={25} />
      </IconButton>

      <Menu
        id="switch-units"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography variant="h6" align="center">
          Units
        </Typography>
        <MenuItem onClick={handleClose}>
          <Buttons />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuComponent;
