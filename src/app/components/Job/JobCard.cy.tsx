import React from 'react'
import JobCard from './JobCard'

describe('<JobCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<JobCard />)
  })
})