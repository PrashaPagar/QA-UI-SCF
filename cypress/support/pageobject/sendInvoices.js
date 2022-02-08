export class SendInvoices {

    sendInvoices(){
        cy.wait(2000)
        cy.get('span').contains('Status').parent().parent().parent().within(()=>{
            cy.get('[type="checkbox"]').click({force:true})
        })
        const sendSelected =  cy.get('span').contains('Offer Selected')
        sendSelected.click()
        const confirm = cy.get('mat-dialog-actions span').contains('Offer Selected')
        confirm.click({force:true})
    }

}