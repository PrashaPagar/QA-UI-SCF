export class fundersObject{
    
//-------block for main tabs-------//
    funderView()
    {
        cy.get('[href="/scf/facilities"]').contains('FACILITIES').should('exist')
        cy.get('span').contains('ACTIVITY MONITOR').should('exist')
        cy.get('span').contains('BLOTTER').should('exist')
        cy.get('span').contains('Auto-Accept').should('exist')
    }

//----To Open transaction which has Funding requested state-----//
    opentransaction(funderstate)
    {
        const transactionClick =  cy.get('div').contains('Status').parent().siblings()
        transactionClick.click()

        const transactionState = cy.get('[type="text"]').first()
        transactionState.type(funderstate)

        const selectTransaction = cy.get('div').contains(funderstate)
        selectTransaction.click({force:true})    
        cy.wait(1000)
    }
    
//------------------Various page component details------------------------//
    funderTransactionPageDetails(){
          cy.get('div').contains('QA_UI_Automation_SCF').should('exist')
          cy.get('span').contains('SUBMIT RESPONSE').should('exist')
          cy.get('span').contains('Net Face Value').should('be.visible')
          cy.get('span').contains('Discount Margin %').should('be.visible')
          cy.get('span').contains('Implied Base Rate %').should('be.visible')
          cy.get('span').contains('ALLOCATIONS').should('be.visible')
          cy.get('div').contains('IMPORTANT INFORMATION').should('be.visible')
      }

//-------------------Invoice and transaction state validations => Funding Requsted-------------------------------//
    invoiceStateFundingRequested()
      {
          cy.get('[class="transaction-header"]').contains('Funding Requested').should('exist')
          cy.log("Transaction status is validated----> Funding Requsted")
          cy.wait(5000)
          cy.get('[ref="eCenterContainer"]').first().within(() =>{
             cy.get('[role="row"] [col-id="status"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="status"]`).should('have.text', 'Funding Requested')
                cy.log("iterating row", $el)
                // if(index >= 14){
                //     cy.get(`[row-index="${index}"] [col-id="status"]`).scrollIntoView().should('be.visible')
                //     cy.get(`[row-index="${index++}"] [col-id="status"]`).should('have.text', 'Funding Requested')
                //     cy.log("iterating row", $el)
                // }
             })
           
          })
      }

//-------------------Accept the invoices-------------------------------------//
      acceptFundingRequest(){
          cy.get('[data-qa-id="accept-button"]').contains('Accept').click()
          cy.get('span').contains('Update To Accept').click()
      }

//----------- Invoice and transaction status after accepting transaction  => CONFIRMED------------------//
    
      invoiceStateConfirmed()
      {
          cy.get('[class="transaction-header"]').contains('Confirmed').should('exist')
          cy.log("Transaction status is validated----> Confirmed")
          cy.wait(3000)
          cy.get('[ref="eCenterContainer"]').first().within(() =>{
             cy.get('[role="row"] [col-id="status"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="status"]`).should('have.text', 'Confirmed')
                cy.log("iterating row", $el)
             })
          })
      }

//------------- Invoice and transaction status  => Pending Settlement-------------//
      invoiceStatePendingSettlement()
      {   
          cy.get('[class="transaction-header"]').contains('Pending Settlement').should('exist')
          cy.log("Transaction status is validated----> Pending Settlement")
          cy.wait(3000)
          cy.get('[ref="eCenterContainer"]').first().within(() =>{
             cy.get('[role="row"] [col-id="status"]').each(($el, index)=>{
                cy.get(`[row-index="${index}"] [col-id="status"]`).should('have.text', 'Pending Settlement')
                cy.log("iterating row", $el)
             })
           
          })
      }


      declineTransaction()
      {
          cy.get('[data-qa-id="decline-button"]').contains('Decline').click()
          cy.get('[type="button"]').contains('Update To Decline').click()
          cy.reload()
          cy.get('[class="transaction-header"]').contains('Declined').should('exist')
          cy.log("Transaction status is validated----> Declined")
          cy.get('[ref="eCenterContainer"]').first().within(() =>{
            cy.get('[role="row"] [col-id="status"]').each(($el, index)=>{
               cy.get(`[row-index="${index}"] [col-id="status"]`).should('have.text', 'Declined')
               cy.log("iterating row", $el)
            })
         })
      }
      

}