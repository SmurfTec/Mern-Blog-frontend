import { AuthContext } from 'contexts/AuthContext';
import { PostsContext } from 'contexts/PostsContext';
import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { makeReq } from 'utils/constants';
import ConfirmDeleteDialog from 'dialogs/ConfirmDialogBox';

const Post = ({ match, history }) => {
  const { user } = useContext(AuthContext);
  const { deletePost, updatePost } = useContext(PostsContext);

  const initPostState = {
    postTitle: '',
    postBody: '',
  };

  const [postState, setPostState] = useState(initPostState);

  const [editCommentId, setEditCommentId] = useState(null);
  const [post, setPost] = useState();
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState();
  const [Likes, setLikes] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [commentBody, setCommentBody] = useState('');
  const [editCommentTxt, setEditCommentTxt] = useState('');

  const handleCommentChange = (e) => {
    setCommentBody(e.target.value);
  };

  const handleEditCommentChange = (e) => {
    setEditCommentTxt(e.target.value);
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
        setPostState({
          postBody: data.post.body,
          postTitle: data.post.title,
        });
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

  const handleUpdatePost = async () => {
    console.log('here');
    console.log(`postState`, postState);
    const updatedPost = await updatePost(
      { title: postState.postTitle, body: postState.postBody },
      post._id
    );
    console.log(`updatedPost`, updatedPost);
  };

  const addComment = async (e) => {
    console.log('here GOt here');
    try {
      const data = await makeReq(
        `/posts/${post._id}/comment`,
        { body: { comment: commentBody } },
        'POST'
      );

      console.log(`data`, data);
      toast.success('Comment Updated Successfully');
      setComments([...comments, data.comment]);
    } catch (err) {
      toast.error('Error Making comment');
    }
  };

  const handleDeleteComment = async (e) => {
    try {
      const id = e.target.id;
      const data = await makeReq(
        `/posts/comments/${id}`,
        {},
        'DELETE'
      );
      setComments(comments.filter((el) => el.id !== id));
      toast.success('Comment Deleted successfully!');
    } catch (err) {
      toast.error('Error deleting comment');
    }
  };

  const updateCommentId = (e) => {
    setEditCommentId(e.target.id);
  };

  const updateComment = async (e) => {
    const data = await makeReq(
      `/posts/comments/${editCommentId}`,
      { body: { commentBody: editCommentTxt } },
      'PATCH'
    );
    console.log(`data`, data);

    setComments(
      comments.map((el) =>
        el._id === data.comment._id ? data.comment : el
      )
    );
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
                          className='btn-danger btn mr-2'
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

      {comments && comments.length > 0 && (
        <section
          id='comments'
          className='pt-3'
          style={{ background: '#e1e4e6' }}
        >
          <div className='container-fluid' id='commentsSec'>
            <h4>Comments</h4>
            {comments.map((el) => (
              <div className='row my-0 py-0' id='el._id' key={el._id}>
                <div className='col-md-8 py-3'>
                  <div
                    className='card'
                    style={{ background: '#fff' }}
                  >
                    <div className='card-header'>
                      <i className='fas fa-user'></i> {el.user.name}
                    </div>
                    <div className='card-body'>
                      <p className='card-text'>{el.body}</p>
                    </div>
                    <div className='card-footer text-muted flex-wrap d-flex justify-content-between align-items-start'>
                      <div>{el.getFormattedDate}</div>
                      <div
                        className='d-flex flex-wrap align-items-center justify-content-end'
                        style={{ flexGrow: 1, maxWidth: 330 }}
                      >
                        <button
                          className='btn-danger btn btn-sm delComment mr-2'
                          style={{ height: 'fit-content' }}
                          onClick={handleDeleteComment}
                          id={el._id}
                        >
                          Delete <i className='fas fa-trash'></i>
                        </button>

                        <button
                          className='btn-primary btn btn-sm editComment'
                          style={{ height: 'fit-content' }}
                          id='editCommentBtn'
                          data-toggle='modal'
                          data-target='#commentEditModal'
                          id={el._id}
                          onClick={updateCommentId}
                        >
                          Edit <i className='fas fa-edit'></i>
                          <span className='sr-only'>{el._id}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <ConfirmDeleteDialog
        open={showConfirmModal}
        toggleDialog={toggleConfirmModal}
        dialogTitle={'Delete This Post ?'}
        success={handleDelete}
      />

      <div className='modal fade' id='editPostModal'>
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
                data-dismiss='modal'
                aria-label='Close'
                id='addPost'
                onClick={handleUpdatePost}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className='modal fade'
        id='commentModal'
        tabindex='-1'
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Comment</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <form className='w-100' style={{ height: 150 }}>
                <textarea
                  name='commentBody'
                  value={commentBody}
                  onChange={handleCommentChange}
                  id='commentBody'
                  className='form-control w-100 h-100'
                ></textarea>
                <span className='invalid-feedback'>
                  Comment must NOT be Empty !
                </span>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                id='commentBtn'
                className='btn btn-primary'
                // className='close'
                data-dismiss='modal'
                aria-label='Close'
                onClick={addComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className='modal fade'
        id='commentEditModal'
        tabIndex={-1}
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Edit Comment</h5>
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
              <form className='w-100' style={{ height: 150 }}>
                <textarea
                  name='textarea'
                  className='form-control w-100 h-100 commentEditBody'
                  value={editCommentTxt}
                  onChange={handleEditCommentChange}
                />
                <span className='invalid-feedback'>
                  Comment must NOT be Empty !
                </span>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary commentEditBtn'
                data-dismiss='modal'
                aria-label='Close'
                onClick={updateComment}
              >
                Update Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Post);
