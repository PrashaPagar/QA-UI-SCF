export class CommonElements{
    showAllRow(mediumWait) {
        const pageSize = cy.get('span', { timeout:mediumWait }).contains('100')
        pageSize.click({force:true})

        const allPage = cy.get('span').contains(' All Rows ')
        allPage.click({force:true})
        cy.wait(1000)
    }

    //-------------To Open facility------------------------------------//
    openFacility(facility,normalWait){

        const facilityClick =  cy.get('span',{timeout:normalWait}).contains('Facility Name').parent().siblings()
        facilityClick.click()

        const facilityType = cy.get('[type="text"]').first()
        facilityType.type(facility)

        const selectFacility = cy.get('div').contains(facility)
        selectFacility.click({force:true})    
        cy.wait(1000)
    
    }

    //-------------To Open Sub-facility------------------------------------//
    openSubFacility(subFacility,normalWait,){
        
        const subFacilityClick = cy.get('span' ,{ timeout: normalWait}).contains('Sub Facility Name').parent().siblings()
        subFacilityClick.click()

        const subFacilityType = cy.get('[type="text"]').first()
        subFacilityType.type(subFacility)

        const subFacilityOpen =  cy.get('div',{timeout: normalWait}).contains(subFacility)
        subFacilityOpen.click({force:true})
    }

    openTransaction(transactionstate,normalWait,){
        
        const statusClick = cy.get('span' ,{ timeout: normalWait}).contains('Status').parent().siblings()
        statusClick.click()

        const transactionType = cy.get('[type="text"]').first()
        transactionType.type(transactionstate)

        const transactionOpen =  cy.get('div',{timeout: normalWait}).contains(transactionstate)
        transactionOpen.click({force:true})
    }
}
