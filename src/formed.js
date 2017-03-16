// import Layout from './components/Layout/layout';
import packageJson from '../package.json';

(() => {
  window.formed = {
    version: packageJson.version,
    Editor: require('./components/Editor').default,
    Layout: require('./components/Layout/layout').default
  }
})();
