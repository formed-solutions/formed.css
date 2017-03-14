// import Layout from './components/Layout/layout';
import packageJson from '../package.json';

(() => {
  window.formed = {
    version: packageJson.version,
    Layout: require('./components/Layout/layout').default
  }
})();
