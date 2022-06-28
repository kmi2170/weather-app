import { memo, useState } from 'react';
import Image from 'next/image';
import purple from '@material-ui/core/colors/purple';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import Buttons from './Buttons';
import { useAppSelector } from '../../../app/hooks';

const useStyles = makeStyles(() => ({
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '1.25rem',
    marginRight: '.75rem',
    '&:hover': {
      cursor: 'pointer',
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

  return (
    <>
      <IconButton
        aria-controls="switch-units"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Image
          src="/icon_setting.png"
          alt="setting icon"
          width={25}
          height={25}
        />
      </IconButton>

      <Menu
        id="switch-units"
        data-testid="menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <div className={classes.closeButton}>
          <IconButton
            aria-controls="icon-close"
            aria-haspopup="true"
            onClick={handleClose}
          >
            <Image
              src="/icon-close.png"
              alt="close icon"
              width={15}
              height={15}
            />
          </IconButton>
        </div>
        <Typography variant="subtitle1" align="center"></Typography>
        <Typography
          variant="h6"
          align="center"
          style={{ color: purple[500], textTransform: 'capitalize' }}
        >
          {units} Units
        </Typography>
        <MenuItem>
          <Buttons />
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(SwitchUnits);
