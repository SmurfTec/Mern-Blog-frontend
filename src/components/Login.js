import React, { useContext, useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { API_BASE_URL, handleCatch } from 'utils/constants';
import { toast } from 'react-toastify';
import { AuthContext } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 550,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '& label': {
      fontFamily: `'Roboto", "Helvetica", "Arial", sans-serif'`,
      color: '#fff',
    },
    '& input': {
      color: '#fff',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#06C6FF',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#b033fa',
    },
  },
}));

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const classes = useStyles();
  const initialState = {
    email: '',
    password: '',
  };

  const [fetching, setFetching] = useState(false);
  const [state, setState] = useState(initialState);
  const resetState = () => setState(initialState);

  const handleTextChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    setFetching(true);

    e.preventDefault();
    console.log(`state`, state);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        ...state,
      });
      console.log(`res`, res);
      resetState();
      toast.success('Login Successfull');

      signInUser(res.data.token, res.data.user);
    } catch (err) {
      handleCatch(err);
      console.log(`fetching`, fetching);
      setFetching(false);
    } finally {
      // toggleFetching();
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      className={classes.root}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} onSubmit={loginUser}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={state.email}
            onChange={handleTextChange}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={state.password}
            onChange={handleTextChange}
          />
          {fetching === true && <div className='loaderSmall'></div>}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
            disabled={fetching === true && true}
            style={{
              backgroundColor: fetching === true && '#8e9e9f',
              color: fetching === true && '#fff',
            }}
          >
            LogIn
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgot' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signUp' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Login;
