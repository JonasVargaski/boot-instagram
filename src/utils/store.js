const fs = require('fs');
const path = require('path');


module.exports = {
  createDatabase() {
    if (!fs.existsSync(path.resolve(__dirname, '..', 'database', 'data.json'))) {
      fs.writeFileSync(
        path.resolve(__dirname, '..', 'database', 'data.json'),
        JSON.stringify({}));
    }
  },

  get(name, defaulValue = {}) {
    let data = fs.readFileSync(path.resolve(__dirname, '..', 'database', 'data.json'));
    const obj = JSON.parse(data);
    return obj[name] || defaulValue;
  },

  set(name, content = {}) {
    let rawdata = fs.readFileSync(path.resolve(__dirname, '..', 'database', 'data.json'));
    if (!rawdata) {
      rawdata = "{}"
    }
    const obj = JSON.parse(rawdata);
    obj[name] = content;
    fs.writeFileSync(
      path.resolve(__dirname, '..', 'database', 'data.json'),
      JSON.stringify(obj));
  }
}