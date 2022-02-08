export class PushInvoice {
    openInvoicesGrid(mediumWait){
        const invoceGride =  cy.get('mat-panel-title',{timeout:mediumWait}).contains(' AVAILABLE INVOICES ')
        invoceGride.click({force:true})
     }
    //  editEnable(){
    //      const edit = cy.get('span').contains('Edit')
    //      edit.click({force:true})
    //  }
     pushInvoice(){
         cy.wait(5000)
         const pushInvoice = cy.get('span').contains('Push Additional Invoices')
         pushInvoice.click({force:true})
         const confirm = cy.get('button span').contains('CONFIRM')
         confirm.click({force:true})
     }
}