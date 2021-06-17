import { AuthContext } from 'contexts/AuthContext';
import { PostsContext } from 'contexts/PostsContext';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { makeReq } from 'utils/constants';
import ConfirmDeleteDialog from 'dialogs/ConfirmDialogBox';

const Post = ({ match, history }) => {
  const { user } = useContext(AuthContext);
  const { deletePost } = useContext(PostsContext);

  const [post, setPost] = useState();
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState();
  const [Likes, setLikes] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const toggleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await makeReq(
          `/posts/${match.params.id}`,
          {},
          'GET'
        );
        console.log(`data`, data);

        setPost(data.post);
        setComments(data.comments);
        setLike(data.like);
        setLikes(data.likes);
      } catch (err) {
        history.push('/posts');
      }
    })();
  }, []);

  const handleLike = async () => {
    (async () => {
      const data = await makeReq(
        `/posts/${match.params.id}/like`,
        {},
        'PATCH'
      );
      console.log(`data`, data);

      setLike(data.like);
    })();
  };
  const handleDelete = () => {
    toggleConfirmModal();
    deletePost(match.params.id);
  };

  return (
    <div>
      <header id='main-header' className='py-2 bg-primary text-white'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <h1>
                <i className='fas fa-pencil-alt'></i> Posts
              </h1>
            </div>
          </div>
        </div>
      </header>

      {post ? (
        <section id='postsSection'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12 px-0'>
                <div
                  className='card'
                  style={{
                    color: '#000',
                  }}
                >
                  <div className='card-header d-flex justify-content-between'>
                    <h4>
                      <i className='fa fa-user'></i> Posted By :-
                      {post.user.name === user.name ? (
                        <p id='email'>You</p>
                      ) : (
                        <p id='email'>{user.email}</p>
                      )}
                    </h4>

                    {post.user._id === user._id && (
                      <div>
                        <button
                          className='btn-danger btn'
                          style={{
                            height: 'fit-content;',
                          }}
                          id='delPost'
                          onClick={toggleConfirmModal}
                        >
                          Delete Post <i className='fas fa-trash'></i>
                        </button>
                        <button
                          className='btn-primary btn'
                          style={{
                            height: 'fit-content;',
                          }}
                          id='editPost'
                          data-toggle='modal'
                          data-target='#editPostModal'
                        >
                          Edit Post <i className='fas fa-edit'></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div className='card-body text-left'>
                    <h4 className='card-title' id='postTitle'>
                      {post.title}
                    </h4>
                    <p className='card-text pl-4'>{post.body}</p>
                  </div>
                  <div className='card-footer text-white-50 d-flex justify-content-start align-content-center'>
                    <button
                      onClick={handleLike}
                      className='btn btn-success m-2'
                      id='like'
                    >
                      {like === false ? (
                        <i className='fa fa-thumbs-up pl-2 mr-2'></i>
                      ) : (
                        <i className='fa fa-thumbs-down pl-2 mr-2'></i>
                      )}

                      {like ? 'UnLike' : 'Like'}
                    </button>
                    <button
                      href=''
                      className='btn btn-warning m-2 text-dark'
                      id='comment'
                      data-toggle='modal'
                      data-target='#commentModal'
                    >
                      Comment
                      <i className='fas fa-comment pl-2'></i>
                    </button>

                    <p
                      className='ml-auto align-self-end px-2'
                      id='numLikes'
                    >
                      {Likes.length} likes |
                    </p>

                    <p
                      className='align-self-end px-2'
                      id='numComments'
                    >
                      {post.comments.length} Comments |
                    </p>
                    <p className='align-self-end'>
                      Last Updated {post.getFormattedDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className='loader'></div>
      )}

      <ConfirmDeleteDialog
        open={showConfirmModal}
        toggleDialog={toggleConfirmModal}
        dialogTitle={'Delete This Post ?'}
        success={handleDelete}
      />
    </div>
  );
};

export default withRouter(Post);
