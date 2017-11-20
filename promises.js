// promises
// alternatives to promises: generators, async functions, observables

// problem solved using callbacks
const action = (cb) => {
  setTimeout(() => {
    cb('hey');
  }, 1000);
};
// arg is the callback function that is going to run after setTimeout
action((arg) => {
  console.log(arg);
});

// problem solved with promises
const actionPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('hey promise');
      //reject(new Error('nooo'));
    }, 1500)
  })
};
// .then() receives the arguments in resolve
actionPromise()
  .then((word) => {
    console.log(word);
  })
.catch((err)=>{
  console.log(err);
});