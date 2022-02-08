const data=require("../fixtures/test2-config.json")
import 'cypress-file-upload';
const inputDir= './cypress/fixtures/';
var invoiceNumber,fileName;
Cypress.Commands.add("addInvoice", (mediumWait) => {

    invoiceNumber = 'Auto' + Math.random().toString().slice(2, 6);
    cy.log('invoiceNumber::', invoiceNumber)
  
        let fileInput = inputDir+'invoice_UI.csv';
        cy.log("------------------------>")
        cy.task('createTestFile', { filename: fileInput, invoiceNumber: invoiceNumber, fileType: "invoice_UI.csv" }).then((invoiceNumber) => {
            fileName = invoiceNumber + '-C_invoice_UI.csv';
            cy.log("-----------fileName------------->",fileName)
            cy.get('ngx-file-drop [type="file"]').attachFile(fileName);
            cy.wait(1000)
            cy.get('span').contains(' Submit Invoices ').click()
        })
});


Cypress.Commands.add("getToken", function (user, pass) {
    //const platformCodes = 'LQX'
    
     let requestBody = {
         username: user,
         password: pass,
         grant_type: 'password',
         scope: 'openid ' + data.audience + ' offline_access',
         client_id: data.audience,
         response_type: 'token id_token'
     };
     cy.request({
         method: 'POST',
         url: data.b2cURI,
         body: requestBody,
         headers: {
             'content-type': 'application/x-www-form-urlencoded',
         },
     }).then((response) => {
         return response
     })
 });














// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
