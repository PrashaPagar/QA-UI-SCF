import "cypress-localstorage-commands"
import { CommonElements } from "../../support/pageobject/common-object";
import { loginPage } from "../../support/pageobject/login";
import { supplierobjects }  from "../../support/pageobject/supplier-object";
import { singOut } from "../../support/pageobject/sign-out"
import { adminObject } from "../../support/pageobject/admin-objects"
import { PushInvoice } from "../../support/pageobject/pushInvoices";
import { SendInvoices } from "../../support/pageobject/sendInvoices";
import { fundersObject } from "../../support/pageobject/Funder-object";

const loginObj = new loginPage();
const commonObj = new CommonElements();
const adminObj = new adminObject();
const supplierObj = new supplierobjects();
const singout = new singOut();
const pushInvoice = new PushInvoice();
const sendinvoiceObj = new SendInvoices();
const funderObj = new fundersObject();


describe("Decline By Funder flow--->", () => {
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

  //---------------------Login as Supplier---------------//
  it("Login as an Supplier user", () => {
    loginObj.login(config.baseURI, config.SupplierUser, config.Password);
    cy.location('pathname').should('have.string', '/scf/invoices/available'); //--Landing URL
  })

  it("Import Invoices", () => { 
    supplierObj.importinvoices().click();
    cy.get('button span').contains('cloud_upload').should('be.visible').click()
    cy.addInvoice(config.mediumWait)     //Importing Invoice
    cy.wait(5000)
    supplierObj.invoiceStatusAfterImport(); // Check status of invoice after import
    singout.singOutUser(config.SupplierUser); // sign out
  })

  //-------------------Admin Login----------------------//
  it("Login as an Admin user", () => {
    loginObj.login(config.baseURI, config.AdminUser, config.Password); 
    cy.location('pathname').should('have.string', '/scf/facilities') //Landing URL check
  })
  
  it("Open Facility---> Push Invoices", () => {
    commonObj.showAllRow(); // Full page view
    commonObj.openFacility(config.facilityName,config.subFacilityName); //Open Facility
    adminObj.facilityview();   
    adminObj.facilitysubtab();
    commonObj.openSubFacility(config.subFacilityName);
    pushInvoice.openInvoicesGrid(); 
    commonObj.showAllRow();
    adminObj.invoiceState(); // Checked Invoice state before pushing invoices
    pushInvoice.pushInvoice(); // Push all available invoices
    singout.singOutUser(config.AdminUser);
  })
  
   //---------------------Login as Supplier---------------//
  it("Login as an Supplier ---> Accept invoices", () => {
    loginObj.login(config.baseURI, config.SupplierUser, config.Password);
    cy.location('pathname').should('have.string', '/scf/invoices/available');
    supplierObj.invoiceStateAvailable(); // to check invoice status- Available
    sendinvoiceObj.sendInvoices()  // Send all avaialble invoices to Admin
    singout.singOutUser(config.SupplierUser);  
  })

  //----------------Admin Login-------------------------//
  it("Admin Login- Funding Request", () => {
    loginObj.login(config.baseURI, config.AdminUser, config.Password)
    cy.location('pathname').should('have.string', '/scf/facilities')
    commonObj.showAllRow();
    commonObj.openFacility(config.facilityName,config.subFacilityName);
    adminObj.facilityview();
    adminObj.facilitysubtab();
    commonObj.openSubFacility(config.subFacilityName);
    adminObj.transactionTab();
    adminObj.invoiceStateAccepted()  //Invoice state - Accepeted
    adminObj.fundingRequestPageDetails(); // send funding request
    cy.reload()
    adminObj.invoiceStateFundingRequested() // invoice status after funding request
    singout.singOutUser(config.AdminUser);
  })
 
  //----------------------Funder Login----------------------------//
   it("Login as an Funder ---> Decline Transaction", () => {
    loginObj.login(config.baseURI, config.FunderUser, config.Password);
    cy.location('pathname').should('have.string', '/scf/transactions');
    funderObj.opentransaction(config.funderstate)
    funderObj.funderTransactionPageDetails() // Transaction detail page details
    funderObj.declineTransaction() // decline transaction
    singout.singOutUser(config.FunderUser);  
  })
})




  


