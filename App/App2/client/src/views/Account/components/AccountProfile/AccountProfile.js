import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,

} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Ashcharya Hemachandra',
    city: 'Colombo',
    country: 'SL',
    timezone: 'GTM +5 1/2',
    avatar: '/images/avatars/profile.png'
  };

  return (

    <div>


      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent>
          <div className={classes.details}>
            <div>
              <Typography
                gutterBottom
                variant="h2"
              >
                Ashcharya Hemachandra
              </Typography>
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="body1"
              >
                {user.city}, {user.country}
              </Typography>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
              >
                {moment().format('hh:mm A')} ({user.timezone})
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={user.avatar}
            />
          </div>

        </CardContent>
        <Divider />

      </Card>
    </div>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
