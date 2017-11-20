// promises (some libraries are bluebird or Q or the node built in
// alternatives to promises: generators, async functions, observables


import fs from 'fs';

// more complex example
const readfile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./package.json', (err, file) =>{
      return err ? reject(err) : resolve(file.toString());
    })
  })
};

readfile()
  .then((file)=>{
  console.log(file);
  })
  .catch((err) => {
  console.log(err);
  })
  .finally(console.log('the end')); //sometimes called done

// promise.all, another example
const readAllFiles = () => {
  const promises = [readfile(), readfile(), readfile()];
  return Promise.all(promises);
};

const logFile = () => {
  return readfile()
    .then(() => {
    return readfile()
    })
};

// start loading
readAllFiles()
  .then((files) => {
  console.log(files)
  });

// simple example
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