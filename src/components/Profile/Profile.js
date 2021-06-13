import { AuthContext } from 'contexts/AuthContext';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateMe, updatePass } = useContext(AuthContext);

  const updateInit = {
    name: user.name,
    email: user.email,
    bio: user.bio,
  };

  const passInit = {
    password: '',
    passwordNew: '',
    passwordConfirm: '',
  };

  const [updateState, setUpdateState] = useState(updateInit);
  const [passState, setPassState] = useState(passInit);

  const handleTxtChange = (e) => {
    setUpdateState({
      ...updateState,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassChange = (e) => {
    e.preventDefault();
    setPassState({
      ...passState,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassUpdate = (e) => {
    e.preventDefault();
    if (passState.passwordNew !== passState.passwordConfirm) {
      toast.error('Passwords NOT matched');
      return;
    }
    updatePass(passState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!updateState.name || !updateState.email || !updateState.bio) {
      toast.error('Plz Fill in all fields');
      return;
    }
    // setUpdateState(updateInit);
    updateMe(updateState);
  };

  return (
    <div>
      <header id='main-header' class='py-2 bg-primary text-white'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-6'>
              <h1>
                <i class='fas fa-user'></i> Edit Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id='actions' className='py-4 mb-4 bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <Link
                to='/'
                className='btn btn-primary pl-0 ml-0 btn-block'
              >
                <i className='fas fa-arrow-left ml-0' /> Back to
                Dashboard
              </Link>
            </div>
            <div className='col-md-3'>
              <Link
                to='#changePopup'
                data-toggle='modal'
                className='btn btn-success btn-block'
                data-target='#passModal'
                id='togglePasswordModal'
              >
                <i className='fas fa-lock' /> Change Password
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id='profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Edit Profile</h4>
                </div>
                <div className='card-body'>
                  <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                      <label htmlFor='name'>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        // defaultValue={user.name}
                        id='name'
                        name='name'
                        value={updateState.name}
                        onChange={handleTxtChange}
                      />
                      <small className='invalid-feedback'>
                        Invalid or Empty Name
                      </small>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        id='email'
                        type='email'
                        name='email'
                        className='form-control'
                        // defaultValue={user.email}
                        value={updateState.email}
                        onChange={handleTxtChange}
                      />
                      <small className='invalid-feedback'>
                        Invalid or Empty Email
                      </small>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='bio'>Bio</label>
                      <textarea
                        className='form-control'
                        id='bio'
                        name='bio'
                        rows={8}
                        // defaultValue={user && user.bio}
                        value={updateState.bio}
                        onChange={handleTxtChange}
                      />
                      <small className='invalid-feedback'>
                        Invalid or Empty Bio
                      </small>
                    </div>
                    <button
                      className='btn btn-primary btn-block'
                      type='submit'
                      id='submitProfile'
                    >
                      <i className='fas fa-check pr-2' />
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className='modal fade'
        id='passModal'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modalTitle'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header bg-success text-center text-white'>
              <h5 className='modal-title' id='modalTitle'>
                Change Password
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form onSubmit={handlePassUpdate}>
                <div className='form-group'>
                  <label htmlFor='password1'>Current Password</label>
                  <input
                    className='form-control'
                    id='password1'
                    type='password'
                    name='password'
                    value={passState.password}
                    onChange={handlePassChange}
                  />
                  <small className='invalid-feedback'>
                    This fields must NOT be less than 8 characters
                  </small>
                </div>
                <hr />
                <div className='form-group'>
                  <label htmlFor='password2'>New Password</label>
                  <input
                    className='form-control'
                    id='password2'
                    onChange={handlePassChange}
                    type='password'
                    name='passwordNew'
                    value={passState.passwordNew}
                  />
                  <small className='invalid-feedback'>
                    This fields must NOT be less than 8 characters
                  </small>
                </div>
                <div className='form-group'>
                  <label htmlFor='password3'>
                    Confirm New Password
                  </label>
                  <input
                    className='form-control'
                    id='password3'
                    type='password'
                    name='passwordConfirm'
                    onChange={handlePassChange}
                    value={passState.passwordConfirm}
                  />
                  <small className='invalid-feedback'>
                    This fields must NOT be less than 8 characters
                  </small>
                  <small
                    className='invalid-feedback'
                    id='confirmFeedback'
                  >
                    Confirm Password must be equal to New Password
                  </small>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='submit'
                id='changeBtn'
                className='btn btn-warning'
                onClick={handlePassUpdate}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
