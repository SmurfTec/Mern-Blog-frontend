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
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from 'utils/constants';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';

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
    marginTop: theme.spacing(3),
    '& label': {
      color: '#000',
      fontFamily: `'Roboto", "Helvetica", "Arial", sans-serif'`,
    },
    '& input': {
      color: '#000',
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

const SignUp = () => {
  const classes = useStyles();
  const [fetching, setFetching] = useState(false);
  const { signInUser } = useContext(AuthContext);

  const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    bio: '',
  };
  const [state, setState] = useState(initialState);

  const resetState = () => setState(initialState);

  const handleTextChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const registerNewUser = async (e) => {
    if (state.password !== state.passwordConfirm) {
      toast.error('Passwords NOT matched');
      return;
    }
    setFetching(true);
    e.preventDefault();
    console.log(`state`, state);

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/signUp`, {
        ...state,
      });
      console.log(`res`, res);
      toast.success('Signup Succesfull');
      toast.success(`Signup Successfull ! Logging In`);
      resetState();
      signInUser(res.data.token, res.data.user);
    } catch (err) {
      let msg = 'Something Went Wrong';
      if (err.response && err.response.data)
        msg = err.response.data.message;

      toast.error(msg);

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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={registerNewUser}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='name'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Name'
                autoFocus
                value={state.name}
                onChange={handleTextChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                value={state.email}
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='bio'
                label='Bio'
                name='bio'
                value={state.bio}
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={state.password}
                onChange={handleTextChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='passwordConfirm'
                label='Password Comfirm'
                type='password'
                id='passwordConfirm'
                value={state.passwordConfirm}
                onChange={handleTextChange}
              />
            </Grid>
          </Grid>
          {fetching && <div className='loaderSmall'></div>}

          <Button
            type='submit'
            fullWidth
            variant='contained'
            className={classes.submit}
            disabled={fetching}
            style={{
              backgroundColor: fetching === true && '#8e9e9f',
              color: fetching === true && '#fff',
            }}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
                Already have an account? LogIn
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
