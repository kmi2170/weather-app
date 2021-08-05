import { useState, useEffect, useContext } from 'react';
import router, { useRouter } from 'next/router';
import Image from 'next/image';

import { WeatherContext, actionTypes } from '../reducer/reducer';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, InputBase } from '@material-ui/core';

import icon_search from '../../public/icon_search.png';
import icon_cancel from '../../public/icon-cancel.png';

const useStyles = makeStyles((theme: Theme) => ({
  text: {},
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    margin: '0 5vw',
    [theme.breakpoints.up('sm')]: {
      margin: '0 10vw',
    },
  },
  searchSubContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputBase: {
    // maxWidth: '60vw',
  },
}));

const Searchbar: React.FC = () => {
  const classes = useStyles();

  const { query } = useRouter();
  const { state, dispatch } = useContext(WeatherContext);

  const [searchLocation, setSearchLocation] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchLocation(e.target.value);

  const handleClear = () => {
    setSearchLocation('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('submit', searchLocation);

    router.push({
      pathname: '/',
      query: { searchLocation },
    });
  };

  return (
    <div className={classes.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={classes.searchSubContainer}>
          <IconButton type="submit">
            <Image src={icon_search} alt="search icon" width={25} height={25} />
          </IconButton>
          <InputBase
            fullWidth
            type="text"
            value={searchLocation}
            onChange={handleInput}
            placeholder="Search Location"
          />
          <IconButton onClick={handleClear}>
            <Image src={icon_cancel} alt="clear icon" width={25} height={25} />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
