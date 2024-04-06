import React from 'react'
import ApplicationForm from './ApplicationForm'

describe('<ApplicationForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ApplicationForm />)
  })
})