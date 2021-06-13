import React from 'react';

const Post = ({ post, user, categories, posts, like, Likes }) => {
  return (
    <div>
      <header id='main-header' class='py-2 bg-primary text-white'>
        <div class='container'>
          <div class='row'>
            <div class='col-md-6'>
              <h1>
                <i class='fas fa-pencil-alt'></i> Posts
              </h1>
            </div>
          </div>
        </div>
      </header>

      {post && (
        <section id='postsSection'>
          <div class='container-fluid'>
            <div class='row'>
              <div class='col-md-12 px-0'>
                <div class='card' style='color: #000;'>
                  <div class='card-header d-flex justify-content-between'>
                    <h4>
                      <i class='fa fa-user'></i> Posted By :-
                      {post.user.name === user.name ? (
                        <p id='email'>You</p>
                      ) : (
                        <p id='email'>{user.email}</p>
                      )}
                    </h4>

                    {post.user._id === user._id && (
                      <div>
                        <button
                          class='btn-danger btn'
                          style='height: fit-content;'
                          id='delPost'
                        >
                          Delete Post <i class='fas fa-trash'></i>
                        </button>
                        <button
                          class='btn-primary btn'
                          style='height: fit-content;'
                          id='editPost'
                          data-toggle='modal'
                          data-target='#editPostModal'
                        >
                          Edit Post <i class='fas fa-edit'></i>
                        </button>
                      </div>
                    )}
                  </div>
                  <div class='card-body'>
                    <h4 class='card-title' id='postTitle'>
                      {post.title}
                    </h4>
                    <p class='card-text pl-4'>{post.body}</p>
                  </div>
                  <div class='card-footer text-white-50 d-flex justify-content-start align-content-center'>
                    <a href='' class='btn btn-success m-2' id='like'>
                      {like === false ? (
                        <i class='fa fa-thumbs-up pl-2'>Like</i>
                      ) : (
                        <i class='fa fa-thumbs-down pl-2'>UnLike</i>
                      )}{' '}
                    </a>
                    <button
                      href=''
                      class='btn btn-warning m-2 text-dark'
                      id='comment'
                      data-toggle='modal'
                      data-target='#commentModal'
                    >
                      Comment
                      <i class='fas fa-comment pl-2'></i>
                    </button>

                    <p
                      class='ml-auto align-self-end px-2'
                      id='numLikes'
                    >
                      {Likes.length} likes |
                    </p>

                    <p class='align-self-end px-2' id='numComments'>
                      {post.comments.length} Comments |
                    </p>
                    <p class='align-self-end'>
                      Last Updated {post.getFormattedDate()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Post;
