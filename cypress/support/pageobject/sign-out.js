export class singOut {
 
    singOutUser(userName){
        cy.contains(userName).parent().within(()=>{
            cy.get('button').click({force : true})
        }) 
        cy.contains('Sign Out').click({force : true})  
        cy.wait(1000)
    }
}