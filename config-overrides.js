const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
  if (env === 'development') {
    // eslint-disable-next-line no-param-reassign
    config = rewireStyledComponents(config, env, {
      displayName: true,
    });
  }

  return config;
};
