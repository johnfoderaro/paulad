module.exports = {
  browserSync: {
    open: false,
    notify: false,
    ghostMode: false,
    server: {
      baseDir: './public',
    },
  },
  css: {
    app: {
      main: './src/sass/main.scss',
      dest: './src/css',
      watch: ['src/sass/**/*.scss'],
    },
  },
  js: {
    app: {
      main: './src/js/main.js',
      src: 'main.min.js',
      dest: './src/js',
      watch: ['src/js/main.js', 'src/js/lib/**/*.js'],
    },
  },
  watch: [
    'src/css/**/*',
    'src/templates/**/*',
    'src/pages/**/*',
    'src/img/**/*',
    'src/js/vendor/**/*',
    'src/js/main.min.js',
  ],
};
