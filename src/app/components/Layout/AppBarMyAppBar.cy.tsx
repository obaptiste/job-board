import React from 'react'
import MyAppBar from './AppBar'

describe('<MyAppBar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyAppBar />)
  })
})