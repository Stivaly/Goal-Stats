const fs = require('fs-extra');

fs.copy('routes.json', 'dist/routes.json')
  .then(() => console.log('routes.json was copied to dist'))
  .catch(err => console.error(err));