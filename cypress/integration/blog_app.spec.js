describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('LoginForm is shown', function () {
    cy.contains('login').click()
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#input-username').type('mluukkai')
      cy.get('#input-password').type('salainen')
      cy.get('#button-login').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#input-username').type('mluukkai')
      cy.get('#input-password').type('wrong')
      cy.get('#button-login').click()

      cy.contains('wrong username or password')
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testtest')
      cy.get('#author').type('me')
      cy.get('#url').type('testing.com')
      cy.contains('save').click()

      cy.contains('testtest me')
    })

    describe('create a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'testtest2',
          author: 'me',
          url: 'testing2.com'
        })
      })

      it('user can like the blog', function () {
        cy.contains('view').click()
        cy.contains('likes').children().click()

        cy.contains('likes: 1')
      })

      it('user can delete the created blog', function () {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.should('not.contain', 'testtest2 me')
      })
    })

    describe.only('create some blogs', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first', author: 'me', url: 'testing.com', likes: 2 })
        cy.createBlog({ title: 'second', author: 'me', url: 'testing.com', likes: 1 })
        cy.createBlog({ title: 'third', author: 'me', url: 'testing.com', likes: 5 })
      })

      it('blogs order by likes', function () {
        cy.get('button[id="button-view"]').click({ multiple: true })
        cy.get('div[id="likes"]').then(likes => {
          cy.wrap(likes[0]).contains('5')
          cy.wrap(likes[1]).contains('2')
          cy.wrap(likes[2]).contains('1')
        })
      })
    })
  })
})