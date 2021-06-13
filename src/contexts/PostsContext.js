import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { handleCatch, makeReq } from 'utils/constants';
import { AuthContext } from './AuthContext';

export const PostContext = React.createContext();

export const PostProvider = withRouter(({ children, history }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || user === null) return;
    getPosts();
    getCategories();
  }, [user]);

  const getPosts = async () => {
    try {
      const data = await makeReq(`/posts`, {}, 'GET');
      console.log(`data POSTS`, data);
      setPosts(data.posts);
    } catch (err) {
      handleCatch(err);
    }
  };

  const getCategories = async () => {
    try {
      const data = await makeReq(`/categories`, {}, 'GET');
      console.log(`data CATEGORIES`, data);
      setCategories(data.categories);
    } catch (err) {
      handleCatch(err);
    }
  };

  const addNewCategory = async (catObj) => {
    try {
      const data = await makeReq(
        `/categories`,
        { body: catObj },
        'POST'
      );
      console.log(`data ADD CATEGORIES`, data);
      setCategories([...categories, data.category]);
    } catch (err) {
      handleCatch(err);
    }
  };

  const addNewPost = async (postObj) => {
    let postBody = {
      category: postObj.postCat,
      title: postObj.postTitle,
      body: postObj.postBody,
    };

    console.log(`typeof postObj.postCat`, typeof postObj.postCat);

    if (typeof postObj.postCat === 'object')
      postBody.category = postObj.postCat.title;

    console.log(`postObj`, postObj);
    console.log(`postBody`, postBody);
    try {
      const data = await makeReq(
        `/posts`,
        { body: postBody },
        'POST'
      );
      console.log(`data ADD POSTS`, data);
      setPosts([...posts, data.post]);
    } catch (err) {
      handleCatch(err);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, categories, addNewCategory, addNewPost }}
    >
      {children}
    </PostContext.Provider>
  );
});
