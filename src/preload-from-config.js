const preloadFromConfig = (sass) => {
  return new Promise((resolve, reject) => {
    if(Array.isArray((System.sassOptions||{}).includePaths)){
      return System.sassOptions.includePaths.reduce( (accumulator, path) => {
        return accumulator.then( () => { 
          return new Promise((resolve, reject) => {
            sass.lazyFiles(path.base || '/', path.directory || '' , path.files || [], function(){
              resolve();
            });
          });
        })
      }, Promise.resolve())
      .then( () => {
        resolve();
      })
    }else{
      return resolve();
    }
  });
};

export default preloadFromConfig;
