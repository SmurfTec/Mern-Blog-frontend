import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { PostsContext } from '../../contexts/PostsContext';

const Posts = () => {
  const { posts, categories } = useContext(PostsContext);
  return (
    <div>
      <header id='main-header' className='py-1 bg-primary text-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h1>
                <i className='fas fa-pencil-alt' /> Posts
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section id='search' className='py-4 mb-4 bg-light'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <Link
                to='/'
                className='btn btn-primary btn-block'
                data-toggle='modal'
                data-target='#addPostModal'
                style={{ cursor: 'pointer', height: 'fit-content' }}
              >
                <i className='fas fa-plus' /> Add Post
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div>
        <section id='postsSection' className='mt-3'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <div className='card'>
                  <div className='card-header'>
                    <hgroup>
                      <h4>Latest Posts </h4>
                      <h5>{posts && posts.length} Results</h5>
                    </hgroup>
                  </div>

                  <table className='table table-striped'>
                    <thead className='thead-dark'>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>User</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody id='searchBody'>
                      {posts &&
                        posts.length > 0 &&
                        posts.map((post, i) => (
                          <tr>
                            <td>{i + 1}</td>
                            <td>{post.title}</td>
                            <td>{post.category.title}</td>
                            <td>{post.getFormattedDate}</td>
                            <td>{post.user.name}</td>
                            <td>
                              <Link
                                to={`posts/${post.id}`}
                                className='btn btn-secondary'
                                style={{ cursor: 'pointer' }}
                              >
                                <i className='fas fa-angle-double-right' />
                                Show post
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='modal fade' id='addPostModal'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header bg-primary text-white'>
                <h5 className='modal-title'>Add Post</h5>
                <button className='close' data-dismiss='modal'>
                  <span>X</span>
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
                        categories.length > 0 &&
                        categories.map((cat, i) => (
                          <option value={cat.title}>
                            {cat.title}
                          </option>
                        ))}
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
      </div>
    </div>
  );
};

export default Posts;
