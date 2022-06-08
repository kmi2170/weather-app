import { memo, useState } from 'react';
import Image from 'next/image';

import { makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { asyncThunkSearchLocation } from '../../features/weatherAsyncThunk';
import { setIsNotFound } from '../../features/weatherSlice';

import icon_search from '../../../public/icon_search.png';
import icon_cancel from '../../../public/icon-cancel.png';

const useStyles = makeStyles((theme: Theme) => ({
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    margin: '0 5vw',
    [theme.breakpoints.up('sm')]: {
      margin: '0 10vw',
    },
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputbar: {
    flexGrow: 1,
  },
  messageContainer: {
    color: purple[800],
    marginTop: '.5rem',
  },
  queryExamples: {
    fontStyle: 'italic',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
}));

const queryExamples = ['London', 'Seattle,WA,USA', 'Tokyo,Japan'];

const SearchLocationBar = () => {
  const classes = useStyles();

  const isNotFound = useAppSelector(state => state.weather.isNotFound);
  const dispatch = useAppDispatch();

  const [searchLocation, setSearchLocation] = useState<string>('');

  const handleInput: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void = e => {
    setSearchLocation(e.target.value);
  };

  const handleClear: React.MouseEventHandler<HTMLButtonElement> = () => {
    setSearchLocation('');
    dispatch(setIsNotFound(false));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (searchLocation) {
      dispatch(asyncThunkSearchLocation(searchLocation));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={classes.searchContainer}>
          <IconButton type="submit">
            <Image
              src={icon_search}
              alt="search butoon"
              width={20}
              height={20}
            />
          </IconButton>
          <div className={classes.searchInputbar}>
            <TextField
              fullWidth
              type="text"
              variant="standard"
              value={searchLocation}
              onChange={handleInput}
              placeholder="Search Location; City,State,Country"
              style={{ borderColor: 'white' }}
            />
          </div>
          <IconButton onClick={handleClear}>
            <Image
              src={icon_cancel}
              alt="clear button"
              width={20}
              height={20}
            />
          </IconButton>
        </div>
      </form>
      {isNotFound && (
        <div className={classes.messageContainer}>
          <Typography variant="h5" align="center">
            No Place Found
          </Typography>
          <Typography
            variant="h6"
            align="center"
            style={{ fontStyle: 'italic' }}
          >
            Examples (case insensitive)
          </Typography>
          <div className={classes.queryExamples}>
            {queryExamples.map(example => (
              <Typography key={example} variant="h6" align="center">
                {example}
              </Typography>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SearchLocationBar);
