export class supplierobjects {

    assetview = () =>  cy.get('[href="/scf/invoices"]')
    
    //-------------Assets states--------------------//
    trasferred = () => cy.contains('TRANSFERRED')
    offered = () => cy.contains('OFFERED')
    funded = () => cy.containsc('FUNDED')
    notforfunding = () => cy.contains('NOT FOR FUNDING')
    exception = () => cy.contains('EXCEPTIONS')
    completed = () => cy.contains('COMPLETED')

    //-----------Import Invoices----------------------//
    importinvoices = () => cy.contains('IMPORT')
    cloudupload = () =>  cy.get('button span').contains('cloud_upload')

  //--------------To check invoice status after--------------------//
   invoiceStatusAfterImport(){
        cy.get('[ref="eCenterContainer"]').first().within(() =>{
           cy.get('[role="row"]').each(($el, index)=>{
              cy.get(`[row-index="${index}"] [col-id="importStatus"]`).should('have.text', 'check_circle_outline Imported')
              cy.log("iterating row", $el)
           })
        })
        cy.get('[id="lqx-bulk-invoice-import-bottom-bar"]').contains('Done').click()
   }

    //-------------------Main Tabs------------------------------//
    remittanceupload = () => cy.get('[href="/scf/import/remittance"]').should('be.visible')
    transactiontab = () => cy.get('[href="/scf/transactions"]').should('be.visible')

    //-----------------To check Invoice status when its available at supplier ---------------------//
    invoiceStateAvailable()
      {
          cy.get('[ref="eCenterContainer"]').last().within(() =>{
             cy.get('[role="row"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="status"]`).contains('Available')
                cy.log("iterating row", $el)
             })
           
          })
      }

     //-----------------Lable under Available tab----------------//
     labelAvailableTabs()
     {
         cy.get('div').contains('# of invoices:').should('be.visible')
         cy.get('div').contains('Invoice Net Face Value:').should('be.visible')
         cy.get('div').contains('Selected Discount Amount:').should('be.visible')
         cy.get('div').contains('Selected Net Proceeds:').should('be.visible')
         cy.get('div').contains('Next Cut-Off Time In:').should('be.visible')
     }
 
     //------------------Buttons---------------------------------//
     buttons()
     {
         cy.get('[data-qa-id="offer-selected-button"]').should('have.text','Offer Selected');
         cy.get('[data-qa-id="offer-all-button"]').should('have.text','Offer All')
         cy.get('[data-qa-id="mark-not-for-funding-button"]').should('have.text','Mark Not for Funding')
         cy.get('[role="button"][id="mat-expansion-panel-header-0"]').should('have.text','Auto-Offer(0 of 1)')
     }
 
 
    //------------- Transferred Tab and state validations----------------------//
    stateValidations()
     {
         cy.get('[href="/scf/invoices/transferred"]').should('have.text',' TRANSFERRED ').click()
         cy.get('[ref="eCenterContainer"]').first().within(() =>{
         cy.get('[role="row"]').each(($el, index)=>{
            cy.get(`[row-index="${index}"] [col-id="status"]`).contains('A/D Accepted')
            cy.log("iterating row", $el)
            })
         })
     }
   
    markNotForFunding()
    {
       cy.get('[data-qa-id="mark-not-for-funding-button"]').should('have.text','Mark Not for Funding') // button 
    }

    //--------------Offeres Tab and state validations----------------------------//
    offeredStateValidations()
    {
      cy.get('[href="/scf/invoices/offered"]').should('be.visible').click()
      cy.get('[ref="eCenterContainer"]').first().within(() =>{
      cy.get('[role="row"]').each(($el, index)=>{
         cy.get(`[row-id="${index}"] [col-id="status"]`).contains('Pending Settlement')
         cy.log("iterating row", $el)
         })
      })
   }
    
   fundedTab()
    {
      cy.get('[href="/scf/invoices/funded"]').should('be.visible').click() //----Funded Tab
    } 

    notforfundingTab()
    {
      cy.get('[href="/scf/invoices/notforfunding"]').should('be.visible').click()//-----NotForFunding
    }

    exceptionTab()
    {
      cy.get('[href="/scf/invoices/exceptions"]').should('be.visible').click() //----Execption
    }

   //-----------Completed Tab and Status validation-------------------------------//
   completedTab()
   {
    cy.get('[href="/scf/invoices/completed"]').should('be.visible').click()
    cy.get('[id="app-grid-container"]').scrollIntoView({easing:'linear'})
    cy.get('[ref="eCenterContainer"]').first().within(() =>{
     cy.get('[role="row"]').each(($el, index)=>{
        cy.get(`[row-id="${index}"] [col-id="status"]`).contains('Completed')
        cy.log("iterating row", $el)
       })
     })
   }
 
   //---------------Transaction Tab-------------------------//
   transactionPageView()
   {
      cy.get('[href="/scf/transactions"]').should('be.visible').click()
      cy.get('div').contains('ACTIVITY MONITOR').should('be.visible')
      cy.get('div[col-id="debtorText"][role="gridcell"]').contains('SCF Buyer UI')
      cy.get('div[col-id="supplierText"][role="gridcell"]').contains('SCF Supplier UI')
      // cy.get('[class="ag-body-horizontal-scroll"]').scrollTo('right')
      // cy.get('div[col-id="facilityType"][role="gridcell"]').contains('Buyer Led')
   }
    
   tranactionColumnGrid()
   {
      cy.get('[ref="eCenterContainer"]').first().within(() =>{
         cy.get('[role="row"]').each(($el, index)=>{
            cy.get(`[row-id="${index}"] [col-id="transactionId"]`).should('not.be.empty')
            cy.log("iterating row", $el)
            })
         })
   }

   faceValueColumnGrid()
   {
      cy.get('[ref="eCenterContainer"]').first().within(() =>{
         cy.get('[role="row"]').each(($el, index)=>{
            cy.get(`[row-id="${index}"] [col-id="faceValue"]`).should('not.be.empty')
            cy.log("iterating row", $el)
            })
         })
   }

   adjustmentAmountColumnGrid()
   {
      cy.get('[ref="eCenterContainer"]').first().within(() =>{
         cy.get('[role="row"]').each(($el, index)=>{
            cy.get(`[row-id="${index}"] [col-id="adjustmentAmount"]`).should('not.be.empty')
            cy.log("iterating row", $el)
            })
         })
   }

   impliedAdvaneRateColumnGrid()
   {
      cy.get('[ref="eCenterContainer"]').first().within(() =>{
         cy.get('[role="row"]').each(($el, index)=>{
            cy.get(`[row-id="${index}"] [col-id="impliedAdvanceRate"]`).should('not.be.empty')
            cy.log("iterating row", $el)
            })
         })
   }
   //--------Managae Subscription-----------------//
   //--Click on User profile  & Select Manage Subscription

   userProfile()
   {
      cy.get('[role="img"][aria-label="settings"][data-mat-icon-type="font"]').click()
      expect('Profile')
      expect('Manage Subscriptions')
      expect('Sign Out')
      cy.contains('Manage Subscriptions').click()
      cy.get('[type="submit"]').click()
      cy.get('[formcontrolname="email"][type="email"]').type('lqxtestui@gmail.com')
      cy.contains('New Available Invoices').prev().click()
      cy.contains('Save').click()
      cy.get('div[col-id="product"][role="gridcell"]').should('have.text','SCF')
      cy.get('div[col-id="editBtn"][role="gridcell"]').contains('Edit').click()
      cy.get('span').contains('Cancel').click()
   }
}