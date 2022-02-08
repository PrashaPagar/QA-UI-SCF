export class adminObject{
    
    facilitytype = () => cy.get('div').contains(' Obligor Led ')
    sellercount = () => cy.contains('Sellers')
    obligorcount = () => cy.contains('Obligors')
    currenciescount = () => cy.contains('Currencies')
    governinglawscount = () => cy.contains('Governing Laws')
    availableassets = () => cy.contains('Available Assets')
    pendingassets = () => cy.contains('Pending Assets')
    outstandingassets = () => cy.contains('Outstanding Assets')
    subfacilities = () => cy.contains('SUB-FACILITIES')
    transactions = () => cy.contains('TRANSACTIONS')
    obliogors = () => cy.contains('OBLIGORS')
    sellers = () => cy.contains('SELLERS')
    relationships = () => cy.contains('RELATIONSHIPS')
    funders = () => cy.contains('FUNDERS')
    assets = () => cy.contains('ASSETS')
    
//--------------------To Verify Facility view Details------------------------//
    facilityview()
    {
        this.facilitytype().should('exist')
        this.sellercount().should('exist')
        this.obligorcount().should('exist')
        this.currenciescount().should('exist')
        this.governinglawscount().should('exist')
        this.availableassets().should('exist')
        this.pendingassets().should('exist')
        this.outstandingassets().should('exist')
    } 

//-------------------To check details of facility sub-tabs-----------------------//
    facilitysubtab()
    {
        this.subfacilities().should('be.visible').click()
        // this.transactions().should('be.visible').click()
        // this.obliogors().should('be.visible').click()
        // this.sellers().should('be.visible').click()
        // this.relationships().should('be.visible').click()
        // this.assets().should('be.visible').click()
        // this.funders().should('be.visible').click()
        this.subfacilities().should('be.visible').click()
    }

//---------------------Subfacility and facility name verification---------------------//
    subfacilityName = () => cy.contains('[class="subfacility-name"]').should('exist')
    facilityname = () => cy.contains('QA_UI_Automation_SCF').should('exist')

//--------------------Sub-facility Details-------------------------------------------//
   subfacilityDetails(){
       cy.contains('SUB FACILITY').should('exist').click()
       cy.get('[formcontrolname="ctrlSubFacilityName"]').should('have.attr','disabled')
       cy.contains('Active').should('exist')
       cy.contains('Open').should('exist')
       cy.contains('SELECT FUNDERS * ').should('exist').click()
       cy.contains('LIMITS ').should('exist')
       cy.contains('SUB-FACILITY PARAMETERS').should('exist')
       cy.contains('SUB-FACILITY SELLER/OBLIGOR RELATIONSHIPS ').should('exist').click();
       cy.contains(' AVAILABLE INVOICES ').should('exist').click()
   }

//------------------------------Accepting Transaction--------------------------------//
   transactionTab()
   {
    cy.contains('Transactions').should('exist').click();
    cy.get('span').contains('ACTIVITY MONITOR').click();
    cy.get('[ref="eHeaderContainer"]').last().within(() =>{
      cy.get('[role="row"] [col-id="status"]').contains('Status').click()
    })
    cy.get('[ref="eCenterContainer"]').last().within(() =>{
      cy.get('[role="gridcell"][col-id="status"]').contains('Accepted').click()
    })
   }

//----------------------------Send Funding request----------------------------//
   fundingRequestPageDetails()
   {
    cy.contains('QA_UI_Automation_SCF').should('exist')
    cy.contains('View Sub-Facility').should('exist')
    cy.contains('View Calculations and Additional Details').should('exist')
    cy.contains(' IMPORTANT INFORMATION ').should('exist').click()
    cy.contains(' ADDITIONAL DETAILS ').should('exist')
    cy.get('span').contains('SEND FUNDING REQUEST TO ALL').click()
    cy.get('span').contains('Send Funding Request').click()
   }
//---------------------To check invoice status when its available at sub-facility ----------------//  
   invoiceState()
      {
          cy.get('[ref="eCenterContainer"]').last().within(() =>{
             cy.get('[role="row"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="state"]`).should('have.text', 'A/D Accepted')
                cy.log("iterating row", $el)
             })
          })
      }

//---------------To Check Invoice and Transaction status before sending to funding request-----//
      invoiceStateAccepted()
      {
          cy.get('[class="transaction-header"]').contains('Accepted').should('exist')
          cy.get('[ref="eCenterContainer"]').first().within(() =>{
             cy.get('[role="row"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="status"]`).should('have.text', 'Accepted')
                cy.log("iterating row", $el)
             })
           
          })
      }
//----------------To Send Funding request ------------------------//
      invoiceStateFundingRequested()
      {
          cy.get('[class="transaction-header"]').contains('Funding Requested').should('exist')
          cy.get('[ref="eCenterContainer"]').first().within(() =>{
             cy.get('[role="row"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="status"]`).should('have.text', 'Funding Requested')
                cy.log("iterating row", $el)
             })
           
          })
      }

//--------------To Cancelled Current Transaction----------------------------//

       cancelledTransaction(){
           cy.get('span').contains('CANCEL CURRENT TRANSACTION').click()
           cy.get('[role="dialog"]').contains('Cancel Current Transaction').click()
       }

 //----------------Transaction Status---------------------------------//
 transactionStateCancelled()
   {
     cy.get('[class="transaction-header"]').contains('Cancelled').should('exist')
   }

//---------------Marked Transaction as not for funding--------------------//
   notForFunded(){
       cy.get('[data-qa-id="not-funded-button"]').contains('UPDATE TO NOT FUNDED').click()
       cy.get('[type="button"]').contains('Update To Not Funded').click()
       cy.reload()
       cy.get('[class="transaction-header"]').contains('Not Funded').should('exist')
   }

   
    // 1. Select Facility 
    selectFacility()
    {
        cy.get('.facility-name').should('have.text','QA_UI_Automation_SCF')  //Facility name
        cy.get('.scf-facility-header-facility-type').should('have.text',' Obligor Led ') //Facility type
        cy.get('.buyers-count').should('have.text',' 1 Obligors ')   //Buyers count
        cy.get('.buyers-count').next().should('have.text',' 1 Governing Laws ')
        cy.contains('Sellers').should('have.text',' 1 Sellers ')
        cy.contains('Currencies').should('have.text',' 1 Currencies ')
    }
    
    // 1. Select Sub Facility sub tab
    selectSubFacTabs()
    {
        cy.get('[ref="eCenterContainer"]').first().within(() =>{
            cy.get('[row-index="1"]').within(() =>{
               cy.get('div[role="gridcell"][col-id="subfacilityName"]').contains('QA_UI_SubFac');
               cy.get('div[col-id="subFacility_id"][role="gridcell"]').should('have.text','12531')  //Sub facility ID
               cy.get('div[col-id="supplierNames"][role="gridcell"]').should('have.text','SCF Supplier UI')  //Seller
               //cy.get('.ag-center-cols-viewport').scrollTo('center')
            //    cy.get('div[col-id="adNames"][role="gridcell"]').should('have.text','SCF Buyer UI')  //Obligors
            //    cy.get('div[col-id="investorNames"][role="gridcell"]').should('have.text','SCF Funder UI 1')  //Funder
            //    //cy.get('.ag-center-cols-viewport').scrollTo('right')
            //    cy.get('div[col-id="facilityName"][role="gridcell"]').should('have.text','QA_UI_Automation_SCF')  //Facility name
            //    cy.get('div[col-id="facilityType"][role="gridcell"]').should('have.text','Buyer Led')  //Facility type
               
            })
         })


      
    }
    // 2. Select Transaction sub tab
    transactionSubTab()
    {
        cy.get('#mat-tab-label-0-1').click()
        // cy.get('#mat-tab-label-1-0 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('be.visible')
        // cy.get('#mat-tab-label-1-1 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('be.visible')
        cy.get('#mat-tab-label-1-0').should('be.visible')
        cy.get('#mat-tab-label-1-1').should('be.visible')
    }

    // 1.Select Obligors sub tab
    obligorSubTab()
    {
        cy.get('#mat-tab-label-0-2').click()
        cy.get('[col-id="name"][role="gridcell"]').should('have.text','SCF Buyer UI')
    }

    // 2.Select Sellers sub tab
    sellerSubTab()
    {
        cy.get('#mat-tab-label-0-3').click()
        cy.get('[col-id="name"][role="gridcell"]').should('have.text','SCF Supplier UI')
    }

    // 3. Select relationship sub tab
    relationshipSubTab()
    {
        cy.get('#mat-tab-label-0-4').click()
        cy.get('[col-id="supplierName"][role="gridcell"]').should('have.text','SCF Supplier UI')
    }

    // 4. Select Funders sub tab
    funderSubTab()
    {
        cy.get('#mat-tab-label-0-5').click()
        cy.get('[col-id="currInvestorName"][role="gridcell"]').should('have.text','SCF Funder UI 1')
        cy.get('[col-id="supplierName"][role="gridcell"]').should('have.text','SCF Supplier UI')
        cy.get('[col-id="debtorName"][role="gridcell"]').should('have.text','SCF Buyer UI')
    }

    // 5. Select Assets tab
    assetTabDetails()
    {
        cy.get('#mat-tab-label-0-6').click()
        cy.get('#mat-tab-label-2-0 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('have.text','Transferred')
        cy.get('#mat-tab-label-2-1 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('have.text','Available')
        cy.get('#mat-tab-label-2-2 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('have.text','Accepted')
        cy.get('#mat-tab-label-2-3 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('have.text','Exceptions')
        cy.get('#mat-tab-label-2-4 > .mat-tab-label-content > .ng-star-inserted > :nth-child(3)').should('have.text','Completed')
    }

    // Verify labels in page header
    labelsPageHeader()
    {
        cy.get('[fxlayoutalign="space-between"][fxlayout="column"]>.count-header').eq(0).should('have.text','Available Assets')
        cy.get('[fxlayoutalign="space-between"][fxlayout="column"]>.count-header').eq(1).should('have.text','Pending Assets')
        cy.get('[fxlayoutalign="space-between"][fxlayout="column"]>.count-header').eq(2).should('have.text','Outstanding Assets')
    }

    // 7. Click on User profile and Select Manage Subscription
    userProfile()
    {
        cy.get('[role="img"][aria-label="settings"][data-mat-icon-type="font"]').click()
        expect('Profile')
        expect('Manage Subscriptions')
        expect('Sign Out')
        cy.contains('Manage Subscriptions').click()
        cy.get('[type="submit"]').click()
        cy.get('[formcontrolname="email"][type="email"]').type('emailadress@liquidx.com')
        cy.contains('Invoice Acceptance').prev().click()
        cy.contains('Save').click()
    }

    selectInvoices(){
        cy.get('[role="grid"]').last().within(() =>{})
            cy.get('[ref="eCenterContainer"]').last().within(() =>{
                cy.get('[type="checkbox"]')
                //cy.get('input[type="checkbox"]').first().uncheck().should('not.be.checked')
                //cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
                cy.get('[role="row"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] input[type="checkbox"]`).uncheck().should('not.be.checked')
                //cy.get(`[row-index="${index}"] input[type="checkbox"]`).classList.remove('ag-checked')
                cy.log("index-->",index)
                cy.log("iterating row", $el)
                // if (index == 1 ) 
                // {
                //     return false
                // }
             })
            })
        // cy.get('[data-qa-id="push-button"]').click()
        // cy.get('[type="button"]').contains('CONFIRM').click()
    }
}


