import React from 'react'
import HiringManagerDashboard from './hiring-manager'

describe('<HiringManagerDashboard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HiringManagerDashboard />)
  })
})