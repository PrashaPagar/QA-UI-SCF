// import { contains } from "cypress/types/jquery"

export class loginPage {
 
    navigate(url ){
        cy.visit(url)
        cy.location('pathname').should('have.string', 'b2c_1a_test2_signin')
    }
    usernameInput() {
        return cy.get('#signInName')
    }

    passwordInput() {
        return cy.get('#password')
    }

    signinbtn(){
        return cy.get('#next')
    }

    login(url ,username ,password )
    {
        this.navigate(url) 
        this.usernameInput().should('be.visible').type(username)
        this.passwordInput().should('be.visible').type(password)
        this.signinbtn().click();
        cy.get('.logo').should('exist')
        cy.get('.menu-button').should('exist') 
    }
}