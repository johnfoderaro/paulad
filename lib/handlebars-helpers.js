// TODO register handlebars helpers for templating here (http://handlebarsjs.com/block_helpers.html)

const Handlebars = require('handlebars');

module.exports = {
  // sample method: ifModulus is a conditional checking the modulus of given arugment
  ifModulus() {
    return Handlebars.registerHelper('ifModulus', (index, mod, block) => {
      const condition = parseInt(index, 10) % parseInt(mod, 10) === 0;
      return condition ? block.fn(this.ifModulus) : false;
    });
  },
};
