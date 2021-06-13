import React from 'react';

const Home = ({ posts, categories, users }) => {
  return (
    <div>
      <header id='main-header' className='py-2 bg-primary text-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h1>
                <i className='fas fa-cog' />
                Dashboard
              </h1>
            </div>
          </div>
        </div>
      </header>
      {/* ACTIONS */}
      <section id='actions' className='py-4 mb-4 bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <a
                href='#'
                className='btn btn-primary btn-block'
                data-toggle='modal'
                data-target='#addPostModal'
              >
                <i className='fas fa-plus' /> Add Post
              </a>
            </div>
            <div className='col-md-3'>
              <a
                href='#'
                className='btn btn-success btn-block'
                data-toggle='modal'
                data-target='#addCategoryModal'
                id='addCatAnchor'
              >
                Add Category
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* POSTS */}
      <section id='posts'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-9'>
              <div className='card'>
                <div className='card-header'>
                  <h4>Latest Posts</h4>
                </div>
                <table className='table table-striped'>
                  <thead className='thead-dark'>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {posts &&
                      posts.map((post, i) => {
                        <tr>
                          <td> i+1</td>
                          <td> post[i].title</td>
                          <td> post[i].category.title</td>
                          <td> post[i].getFormattedDate()</td>
                          <td>
                            <a
                              href={`post/${post[i]._id}`}
                              // href={`post/{post[i].id}`}
                              className='btn btn-secondary'
                            >
                              <i className='fas fa-angle-double-right' />
                              Show Post
                            </a>
                          </td>
                        </tr>;
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='card text-center bg-primary text-white mb-3'>
                <div className='card-body'>
                  <h3>Posts</h3>
                  <h4 className='display-4'>
                    <i className='fas fa-pencil-alt' />
                    {posts && posts.length}
                  </h4>
                  <a
                    href='/posts'
                    className='btn btn-outline-light btn-sm'
                  >
                    View
                  </a>
                </div>
              </div>
              <div className='card text-center bg-success text-white mb-3'>
                <div className='card-body'>
                  <h3>Categories</h3>
                  <h4 className='display-4'>
                    <i className='fas fa-folder' />
                    {categories && categories.length}
                  </h4>
                  <a
                    href='/categories'
                    className='btn btn-outline-light btn-sm'
                  >
                    View
                  </a>
                </div>
              </div>
              <div className='card text-center bg-warning text-white mb-3'>
                <div className='card-body'>
                  <h3>Users</h3>
                  <h4 className='display-4'>
                    <i className='fas fa-users' />
                    {users && users.length}
                  </h4>
                  <a
                    href='/users'
                    className='btn btn-outline-light btn-sm'
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
      &lt;%- include ('partials/footer') -%&gt;
      {/* MODALS */}
      {/* ADD POST MODAL */}
      <div className='modal fade' id='addPostModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header bg-primary text-white'>
              <h5 className='modal-title'>Add Post</h5>
              <button className='close' data-dismiss='modal'>
                <span>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    id='postTitle'
                  />
                  <span className='invalid-feedback'>
                    A Post must contain a title !
                  </span>
                </div>
                <div className='form-group'>
                  <label htmlFor='category'>Category</label>
                  <select className='form-control' id='postCat'>
                    {categories &&
                      categories.map((cat, i) => {
                        <option value={`cat[i].title`}>
                          {cat[i].title}
                        </option>;
                      })}
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='body'>Body</label>
                  <textarea
                    name='editor1'
                    className='form-control'
                    id='postBody'
                    defaultValue={''}
                  />
                  <span className='invalid-feedback'>
                    A Post must contain a Body !
                  </span>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-primary'
                data-dismiss
                id='addPost'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ADD CATEGORY MODAL */}
      <div className='modal fade' id='addCategoryModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header bg-success text-white'>
              <h5 className='modal-title'>Add Category</h5>
              <button className='close' data-dismiss='modal'>
                <span>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <form method='POST' action='/categories'>
                <div className='form-group'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    id='title'
                  />
                  <div className='invalid-feedback'>
                    This is required field
                  </div>
                </div>
                <div className='form-group'>
                  <label htmlFor='Summary'>Summary</label>
                  <textarea
                    name='cat'
                    id='summary'
                    className='form-control'
                    rows={3}
                    aria-describedby='helpId'
                    required='required'
                    defaultValue={''}
                  />
                  <small id='helpId' className='text-muted'>
                    A Short Explanation of Category
                  </small>
                  <div className='invalid-feedback'>
                    This is required field
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-success'
                data-dismiss
                id='addCat'
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
