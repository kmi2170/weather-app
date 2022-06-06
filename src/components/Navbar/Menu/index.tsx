import { memo, useState } from 'react';
import Image from 'next/image';

import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import Buttons from './Buttons';
import icon_setting from '../../../../public/icon_setting.png';

const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
    </>
  );
};

export default memo(MenuComponent);
