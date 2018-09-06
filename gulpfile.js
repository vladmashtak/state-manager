const gulp = require('gulp');
const fs = require ('fs');
const htmlreplace = require('gulp-html-replace');

gulp.task('hostConfiguration', () => {
  const configFilePath = './src/environments/environment.prod.ts';

  const centralHttpHostOption = 'npm_config_http_host';
  const centralWsHostOption = 'npm_config_ws_host';
  const mapHostOption = 'npm_config_map_host';

  const httpHost = process.env[centralHttpHostOption];
  const wsHost = process.env[centralWsHostOption];
  const mapHost = process.env[mapHostOption];

  if (!httpHost || !wsHost || !mapHost) {
    throw new Error('Production mode must contains 3 options: [--http_host=...] [--ws_host=...] [--map_host=...]');
  }

  let environment = fs.readFileSync(configFilePath);

  let productionConfig = environment.toString('utf8');

  productionConfig = productionConfig
    .replace(`centralHttpHost: ''`, `centralHttpHost: '${httpHost}'`)
    .replace(`centralWsHost: ''`, `centralWsHost: '${wsHost}'`)
    .replace(`mapHost: ''`, `mapHost: '${mapHost}'`);

  console.log('Production Config: ', productionConfig);

  fs.writeFile(configFilePath, productionConfig);
});


gulp.task('login', () => {
  gulp.src('./src/index.html')
    .pipe(htmlreplace({
      js: {
        src: 'dir',
        tpl: `
            <script type="text/javascript">
                (function() {
                  const isLogin = window.location.search.indexOf('guid') !== -1;
            
                  if (!isLogin) {
                    const defaultLocale = localStorage.getItem('defaultLocale');
                    let locale = 'ru';

                    if (!!defaultLocale) locale = defaultLocale.includes('ru') ? 'ru' : 'en';
            
                    window.location.href = '//localhost:9000/login?clientType=dashboard' +
                      '&locale=' + locale +
                      '&redirectUrl=' + encodeURIComponent(window.location.origin + '/' + window.location.hash);
                  }
                })()
            </script>`
      }
    }))
    .pipe(gulp.dest((file) => {
      return file.base;
    }));
});

gulp.task('default', ['login']);
