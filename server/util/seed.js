import User from '../api/user/userModel';
import Post from '../api/post/postModel';
import Category from '../api/category/categoryModel';
import _ from 'lodash';
import logger from './logger';

logger.log('Seeding the Database');

const users = [
  {username: 'Jimylo', password: 'test'},
  {username: 'Xoko', password: 'test'},
  {username: 'katamon', password: 'test'}
];

const categories = [
  {name: 'intros'},
  {name: 'angular'},
  {name: 'UI/UX'}
];

const posts = [
  {title: 'Learn angular 2 today', text:'Angular is so dope'},
  {title: '10 reasons you should love IE7', text:'IE7 is so amazing'},
  {title: 'Why we switched to Go', text:'go is dope'}
];

const createDoc = (model, doc) => {
  return new Promise((resolve, reject) => {
    new model(doc).save((err, saved) => {
      return err ? reject(err) : resolve(saved);
    })
  })
};

const cleanDB = () => {
  logger.log('... clean the DB');
  const cleanPromises = [User, Category, Post]
    .map((model) => {
    return model.remove().exec();
    });
  return Promise.all(cleanPromises);
};

const createUsers = (data) => {

  const promises = users.map((user) => {
    return createDoc(User, user);
  });

  return Promise.all(promises)
    .then((users) => {
    return _.merge({users: users}, data || {});
    })
};

const createCategories = (data) => {
  const promises = categories.map((category) => {
    return createDoc(Category, category);
  });

  return Promise.all(promises)
    .then((categories) => {
    return _.merge({categories:categories}, data || {});
    })
};

const createPosts = (data) => {
  const addCategory = (post, category) => {
    post.categories.push(category);

    return new Promise((resolve, reject) => {
      post.save((err,saved) => {
        return err ? reject(err) : resolve(saved);
      })
    })
  };

  const newPosts = posts.map((post,i) => {
    post.author = data.users[i]._id;
    return createDoc(Post, post);
  });

  return Promise.all(newPosts)
    .then((savedPosts) =>{
    return Promise.all(savedPosts.map((post, i) => {
      return addCategory(post, data.categories[i])
    }))
    })
    .then(() => {
    return 'Seeded Db with 3 Posts, 3 Users, 3 Categories';
    })
};

cleanDB()
.then(createUsers)
.then(createCategories)
.then(createPosts)
.then(logger.log.bind(logger))
.catch(logger.log.bind(logger));