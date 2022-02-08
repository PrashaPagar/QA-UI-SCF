/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************


// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}

module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
};

const fs = require('fs')
module.exports = (on, config) => {

  on('task', {
    createTestFile({ filename, invoiceNumber, fileType }) {
      console.log('invoiceNumber==== ' + invoiceNumber);
      if (fs.existsSync(filename)) {
        let dirName = './cypress/fixtures/' + invoiceNumber + '-C_' + fileType;
        var data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })
        data = data.replace(/<PO>/g, invoiceNumber);
        fs.writeFileSync(dirName, data, 'utf8');
        if (fs.existsSync(dirName)) {
          fs.readFileSync(filename, 'utf8')
          return invoiceNumber;
        }
      }
      return null
    },
    readFileMaybe(filename) {
      if (fs.existsSync(filename)) {
        let invoiceNumebr = 'Auto' + Math.random().toString().slice(2, 11);
        let dirName = './cypress/fixtures/' + invoiceNumebr + '-C' + '.edi';
        var data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' })
        data = data.replace(/<PO>/g, invoiceNumebr);
        fs.writeFileSync(dirName, data, 'utf8');
        if (fs.existsSync(dirName)) {
          fs.readFileSync(filename, 'utf8')
          return invoiceNumebr
        }
      }
      return null
    },
    deleteFile(deleteFile) {

      // delete file named 'sample.txt'

      let baseUrl = './cypress/fixtures/'
      fs.unlink(baseUrl + deleteFile, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
      });
      return null

    },
  })
}