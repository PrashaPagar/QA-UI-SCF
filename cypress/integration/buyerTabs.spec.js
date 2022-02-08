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


describe("Buyer Tabs Validations--->", () => {
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

  it("Login as an buyer user", () => {
    loginObj.login(config.baseURI, config.BuyerUser, config.Password);
    cy.location('pathname').should('have.string', '/scf/facilities');
  })

  it("Open Facility-->", () => {
    commonObj.showAllRow(); // Full page view
    commonObj.openFacility(config.facilityName,config.subFacilityName); //Open Facility
  })
  
})




  


