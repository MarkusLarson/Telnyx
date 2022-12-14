/// <reference types="cypress" />
describe('Telnyx e2e test', () => {
    beforeEach(() => {
      cy.visit('https://telnyx.com/')
      cy.viewport(1600, 800)
    });
  it('User directed on sighup page by click [Try for free] button with empty email field', () => {
    cy.get('.sc-df34c536-0 > :nth-child(1) > .sc-5d3a275a-1').click({force:true})
    cy.get('.sc-5d3a275a-2').click()
    cy.url().should('contain','sign-up')
    cy.get('div h1').should('contain.text','Create a free account')
  })

  it('User can\'t signup with unchecked checkbox "Terms&Conditions & Privacy Policy"', () => {
    cy.get('.sc-9d98fd33-5.sc-9d98fd33-7 > :nth-child(2) > .sc-5d3a275a-0 > .sc-5d3a275a-1').click()
    cy.get('#email').type('montana@mail.com')
    cy.get('#full_name').type('Grigoriy')
    cy.get('#password').type('PaSwOrD12-34')
    cy.get('[type="submit"]').click()
    cy.get('#terms_and_conditions_error').should('be.visible').and('contain.text','Please accept the terms and conditions')
  })

  it('Links on company Twitter, linkedIn, Facebook displayed on footer', () => {
    cy.get('[href="https://www.linkedin.com/company/telnyx/"]').should('be.visible').and('contain.text','Connect on LinkedIn')
    cy.get('[href="https://twitter.com/telnyx"]').should('be.visible').and('contain.text','Follow on Twitter')
    cy.get('[href="https://www.facebook.com/Telnyx/"]').should('be.visible').and('contain.text','Follow on Facebook')
  })

  it('User directed on Solutions page by hover Solutions on home page & click [See all solutions] button', () => {
    cy.get(':nth-child(3) > .sc-7b3980dc-6 > span').trigger('mousemove')
    cy.get('[href="/solutions"]').click({force:true})
    cy.url().should('contain','solutions')
    cy.get('div h1').should('be.visible').and('contain.text','Solutions for Your Business')
  })

  it('User can saw offer message & [Claim reward] button by click Network>See our pricing', () => {
    cy.get('.sc-7b3980dc-6 > .sc-f97529d6-0').click({force:true})
    cy.get('.sc-181bec92-1 > .sc-5d3a275a-0 > .sc-5d3a275a-1').click({force:true})
    cy.wait(3000)
    cy.get('.sc-6609610a-4 > div > span').should('contain.text','Sign up and your first $10 is on us.')
    cy.get('.sc-6609610a-5 > .sc-5d3a275a-0 > .sc-5d3a275a-1').should('be.visible')
  })

  it('error message appears when user try to login with non-confirmed email', () => {
    cy.get('.sc-602eb426-2 > :nth-child(6)').click({force:true})
    cy.get('.eSxLXo > .InlineForm__Container-cLNSZJ > .TextField__Container-gjOtap > .TextField__InputWrapper-hGJUmT > .ui-reactv2-input').type('ejuki038@gmail.com')
    cy.get('[type="password"]').type('PaSwOrD12-34')
    cy.get('.Button__StyledDefaultButton-sc-44gl5i-0').click()
    cy.wait(3000)
    cy.get('.Message__MessageCopy-sc-1lbs5ge-2').should('be.visible')
  })

  it('User can calculate "How much will you save switching from Twilio?"', () => {
    cy.get(':nth-child(6) > .sc-7b3980dc-6 > span').click()
    cy.get('[href="/twilio-pricing-calculator"]').click({force:true})
    cy.get('.sc-a87e7459-0 > :nth-child(1)').click()
    cy.get('.sc-8143a648-6 > .sc-5d3a275a-0 > .sc-5d3a275a-1').click()
    cy.get('.sc-8143a648-6 > .sc-5d3a275a-0 > .sc-5d3a275a-1').click()
    cy.get('.sc-c7d3cfaa-0').should('contain.text','Your savings')
    cy.get('.sc-c7d3cfaa-1').should('contain.text','$13,752')
  })

  it('User can\'t sigh up with empty password field, error message appears', () => {
    cy.get('.sc-9d98fd33-5.sc-9d98fd33-7 > :nth-child(2) > .sc-5d3a275a-0 > .sc-5d3a275a-1').click()
    cy.get('#email').type('montana@mail.com')
    cy.get('#full_name').type('Grigoriy')
    cy.get('[type="submit"]').click()
    cy.get('#password_requirements').should('be.visible')
      .and('contain.text','Password must:')
  })

  it('User email should be filled in sigh up form when user input them in "Try for free" form', () => {
    cy.get('[placeholder="Email"]').type('montana@mail.com')
    cy.get('.sc-5d3a275a-2').click()
    cy.get('#email').should('contain.value','montana@mail.com')
    cy.url().should('contain','montana@mail.com')
  })

  it('User can\'t login with email in password field and password in email field', () => {
    cy.get('.sc-602eb426-2 > :nth-child(6)').click({force:true})
    cy.get('.eSxLXo > .InlineForm__Container-cLNSZJ > .TextField__Container-gjOtap > .TextField__InputWrapper-hGJUmT > .ui-reactv2-input').type('PaSwOrD12-34')
    cy.get('[type="password"]').type('ejuki038@gmail.com')
    cy.get('.Button__StyledDefaultButton-sc-44gl5i-0').click()
    cy.get('.TextField__ErrorMessage-wqPfx.fjBYhj').should('contain.text','Please enter a valid email address')
  })
})