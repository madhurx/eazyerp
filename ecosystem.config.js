module.exports = {
  apps: [
    {
      name: 'eazyerp',
      script: './app.js',
      instances: '1',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
