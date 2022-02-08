import "cypress-localstorage-commands"
import { CommonElements } from "../support/pageobject/common-object";
import { loginPage } from "../support/pageobject/login";
import { supplierobjects }  from "../support/pageobject/supplier-object";
import { singOut } from "../support/pageobject/sign-out"
import { adminObject } from "../support/pageobject/admin-objects"
import { PushInvoice } from "../support/pageobject/pushInvoices";
import { SendInvoices } from "../support/pageobject/sendInvoices";
import { fundersObject } from "../support/pageobject/Funder-object";


const loginObj = new loginPage();
const commonObj = new CommonElements();
const adminObj = new adminObject();
const supplierObj = new supplierobjects();
const singout = new singOut();
const pushInvoice = new PushInvoice();
const sendinvoiceObj = new SendInvoices();
const funderObj = new fundersObject();


describe("Supplier Tabs Validations--->", () => {
let config;

  beforeEach(function () {
    console.log('config  name===>', Cypress.env('test-env'));
    cy.fixture(Cypress.env('test-env') + '-config').then((data) => {
      config = data
      console.log('config data', data)
      cy.visit(config.baseURI)
  })
  cy.restoreLocalStorage();
})
afterEach(() => {
  cy.saveLocalStorage();
});

  it("Login as an Supplier user", () => {
    loginObj.login(config.baseURI, config.SupplierUser, config.Password);
    cy.location('pathname').should('have.string', '/scf/invoices/available');

    supplierObj.labelAvailableTabs()
    supplierObj.buttons()
    supplierObj.stateValidations()
    supplierObj.markNotForFunding()
    supplierObj.offeredStateValidations()
    supplierObj.fundedTab()
    supplierObj.notforfunding()
    supplierObj.exceptionTab()
    supplierObj.completedTab()
    supplierObj.transactionPageView()
    supplierObj.tranactionColumnGrid()
    supplierObj.userProfile()
   singout.singOutUser(config.SupplierUser)
  })
})




  


