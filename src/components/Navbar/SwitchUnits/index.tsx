/**
 * @deprecated
 * This component is deprecated. Buttons component is now used in Navbar component.
 */

import { memo, useState } from "react";
import Image from "next/image";
import makeStyles from '@mui/styles/makeStyles';
import Typography from "@mui/material/Typography";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Buttons from "../Buttons";

import { useAppSelector } from "../../../app/hooks";
import { purple } from '@mui/material/colors';

const icon_setting = "/icon-setting.png";
const icon_close = "/icon-close.png";

const useStyles = makeStyles(() => ({
  menuContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 10pt",
  },
  closeButton: {
    display: "flex",
    justifyContent: "center",
    fontSize: "1.25rem",
    marginRight: ".75rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const SwitchUnits = () => {
  const classes = useStyles();
  const units = useAppSelector((state) => state.weather.units);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <>
    <IconButton
      aria-controls="switch-units"
      aria-haspopup="true"
      onClick={handleClick}
      size="large">
      <Image src={icon_setting} alt="setting icon" width={25} height={25} />
    </IconButton>

    <Menu
      id="switch-units"
      data-testid="menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      <div className={classes.menuContent}>
        <div className={classes.closeButton}>
          <IconButton
            aria-controls="icon-close"
            aria-haspopup="true"
            onClick={handleClose}
            size="large">
            <Image src={icon_close} alt="close icon" width={15} height={15} />
          </IconButton>
        </div>
        <Typography
          variant="h6"
          align="center"
          style={{ color: purple[500], textTransform: "capitalize" }}
        >
          {units} Units
        </Typography>
        <MenuItem>
          <Buttons />
        </MenuItem>
      </div>
    </Menu>
  </>;
};

export default memo(SwitchUnits);
