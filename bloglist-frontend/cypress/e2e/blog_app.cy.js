describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Eemi Kärkkäinen',
      username: 'emi',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'emi', password: 'salainen' })
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('emi')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Eemi logged in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'emi', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.createBlog({ title: 'a blog created by cypress', author: 'Cypress', url: 'www.cypresstests.com' })
      cy.contains('a blog created by cypress')
    })
  })

  describe('logged in and a blog added', function () {
    beforeEach(function () {
      cy.login({ username: 'emi', password: 'salainen' })
      cy.createBlog({ title: 'a blog created by cypress', author: 'Cypress', url: 'www.cypresstests.com' })
    })

    it('a blog can be liked', function () {
      cy.contains('view').click()
      cy.contains('likes 0')
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted by the creator', function () {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.should('not.contain', 'a blog created by cypress')
      cy.get('.message').should('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })

  describe('logged in and someone elses blog added', function () {
    beforeEach(function () {
      const user = {
        name: 'Emma',
        username: 'ema',
        password: 'salainen'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      cy.visit('')
      cy.login({ username: 'emi', password: 'salainen' })
      cy.createBlog({ title: 'a blog created by cypress', author: 'Cypress', url: 'www.cypresstests.com' })
      cy.contains('logout').click()
    })
    it('can not delete others blogs', function () {
      cy.login({ username: 'ema', password: 'salainen' })
      cy.contains('view').click()
      cy.get('html').should('not.contain', 'delete')
    })
  })

  describe('blogs should be ordered from most to least likes', function() {
    beforeEach(function() {
      cy.login({ username: 'emi', password: 'salainen' })
      cy.createBlog({ title: 'blog with most likes', author: 'emi', url: 'www.mostlikes.com', likes: 999 })
      cy.createBlog({ title: 'blog with second most likes', author: 'emi', url: 'www.secondmostlikes.com', likes: 1 })
    })

    it('likes should be from most to least', function() {
      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('hide').click()
      for(let n = 0; n < 10; n ++){
        cy.get('#like-button').click()
        cy.wait(500)
      }
      cy.contains('view').click()
      cy.contains('hide').click()
      for(let n = 0; n < 20; n ++){
        cy.get('#like-button').click()
        cy.wait(500)
      }
      cy.contains('view').click()
      cy.get('.blog').eq(0).should('contain', 'blog with most likes')
      cy.get('.blog').eq(1).should('contain', 'blog with second most likes')

    })
  })
})
