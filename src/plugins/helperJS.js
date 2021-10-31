import * as fn from '../helpers'
    
export default {
  install: app => {
    Object.defineProperties(app.config.globalProperties, {
      $fn: {
        get() {
          return fn;
        }
      }
    });
  }
};
