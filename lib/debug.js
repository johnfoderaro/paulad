function debug(log) {
  return (files, metalsmith, callback) => {
    if (log) {
      const contents = Object.entries(files);
      console.log({ metaData: metalsmith.metadata() });
      contents.forEach(content => console.log({ file: content[1] }));
    }
    callback();
  };
}

module.exports = debug;
