import { PostsContext } from 'contexts/PostsContext';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ users }) => {
  const { posts, categories, addNewCategory, addNewPost } =
    useContext(PostsContext);

  const [postCat, setPostCat] = useState({
    date: '',
    _id: '',
    title: (categories && categories[0] && categories[0].title) || '',
    summary: '',
    __v: 0,
  });
  useEffect(() => {
    if (!categories || categories === null || categories.length === 0)
      return;

    setPostCat(categories[0]);
  }, [categories]);
  const initCatState = {
    title: '',
    summary: '',
  };
  const initPostState = {
    postTitle: '',
    postBody: '',
  };

  const [categoryState, setCategoryState] = useState(initCatState);
  const [postState, setPostState] = useState(initPostState);

  const handleAddCategory = (e) => {
    // e.preventDefault();
    console.log(`categoryState`, categoryState);
    addNewCategory(categoryState);
    setCategoryState(initCatState);
  };

  const handleAddPost = (e) => {
    console.log(`postState`, postState);
    console.log(`postCat`, postCat);

    addNewPost({ ...postState, postCat });
  };

  const handleCatChange = (e) => {
    setCategoryState({
      ...categoryState,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostChange = (e) => {
    console.log('Bitch GOt here');
    console.log(`e.target.name`, e.target.name);
    console.log(`e.target.value`, e.target.value);

    setPostState({
      ...postState,
      [e.target.name]: e.target.value,
    });
  };
  const handlePostCatChange = (e) => {
    console.log('DOG GOt here');
    console.log(`e.target.name`, e.target.name);

    setPostCat(e.target.value);
  };

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
          <div
            className='row'
            style={{
              justifyContent: 'space-between',
            }}
          >
            <div className='col-xs-12 mb-5'>
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
                      posts.length > 0 &&
                      posts.map((post, i) => (
                        <tr key={i}>
                          <td> {i + 1}</td>
                          <td> {post.title}</td>
                          <td> {post.category.title}</td>
                          <td> {post.getFormattedDate}</td>
                          <td>
                            <Link
                              to={`posts/${post._id}`}
                              // href={`post/{post.id}`}
                              className='btn btn-secondary'
                            >
                              <i className='fas fa-angle-double-right' />
                              Show Post
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='card text-center bg-primary text-white mb-3'>
                <div className='card-body'>
                  <h3>Posts</h3>
                  <h4 className='display-4'>
                    <i className='fas fa-pencil-alt' />
                    {posts && posts.length}
                  </h4>
                  <Link
                    to='/posts'
                    className='btn btn-outline-light btn-sm'
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className='card text-center bg-success text-white mb-3'>
                <div className='card-body'>
                  <h3>Categories</h3>
                  <h4 className='display-4'>
                    <i className='fas fa-folder' />
                    {categories && categories.length}
                  </h4>
                  <Link
                    to='/categories'
                    className='btn btn-outline-light btn-sm'
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
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
                <div
                  className='form-group'
                  style={{ textAlign: 'left' }}
                >
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    style={{ textAlign: 'left' }}
                    id='postTitle'
                    name='postTitle'
                    value={postState.postTitle}
                    onChange={handlePostChange}
                  />
                  <span className='invalid-feedback'>
                    A Post must contain a title !
                  </span>
                </div>
                <div
                  className='form-group'
                  style={{ textAlign: 'left' }}
                >
                  <label htmlFor='category'>Category</label>
                  <select
                    className='form-control'
                    style={{ textAlign: 'left' }}
                    id='postCat'
                    value={postCat.title}
                    name='postCat'
                    onChange={handlePostCatChange}
                  >
                    {categories.map((el) => (
                      <option key={el._id} value={el.title}>
                        {el.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className='form-group'
                  style={{ textAlign: 'left' }}
                >
                  <label htmlFor='body'>Body</label>
                  <textarea
                    name='postBody'
                    className='form-control'
                    style={{ textAlign: 'left' }}
                    id='postBody'
                    value={postState.postBody}
                    onChange={handlePostChange}
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
                onClick={handleAddPost}
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
              <form onSubmit={handleAddCategory}>
                <div
                  className='form-group'
                  style={{ textAlign: 'left' }}
                >
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    className='form-control'
                    style={{ textAlign: 'left' }}
                    id='title'
                    name='title'
                    value={categoryState.title}
                    onChange={handleCatChange}
                  />
                  <div className='invalid-feedback'>
                    This is required field
                  </div>
                </div>
                <div
                  className='form-group'
                  style={{ textAlign: 'left' }}
                >
                  <label htmlFor='Summary'>Summary</label>
                  <textarea
                    name='cat'
                    id='summary'
                    name='summary'
                    className='form-control'
                    style={{ textAlign: 'left' }}
                    rows={3}
                    aria-describedby='helpId'
                    required='required'
                    onChange={handleCatChange}
                    value={categoryState.summary}
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
                onClick={handleAddCategory}
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
