/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {

     let token
     before(() => {
          cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          //TO DO
     })

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.body.usuarios[1].nome).to.equal('Fulano da Silva')
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.lessThan(20)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          let usuarios = `Fulano da Silva ${Math.floor(Math.random() * 100000000)}`
          let email = `${Math.floor(Math.random() * 100000000)}fulano@qa.com`
                   cy.cadastrarUsuario(usuarios, email, "teste", "true")
                        .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })
     })

})

it('Deve validar um usuário com email inválido', () => {
     cy.request({
          method: 'POST',
          url: 'usuarios',
          body: {
               "nome": "Fulano da Silva",
               "email": "fulano000@qa.com.br",
               "password": "teste",
               "administrador": "true"
          },
          
          failOnStatusCode: false
     }).then((response) => {

          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal('Este email já está sendo usado')


     })

})

it('Deve editar um usuário previamente cadastrado', () => {
     let email = `${Math.floor(Math.random() * 100000000)}fulano@qa.com`
     cy.request('usuarios').then(response => {

          let id = response.body.usuarios[1]._id

          cy.request({
               method: 'PUT',
               url: 'usuarios/put_usuarios___id_',
               body: {
                    "nome": "Fulano da Silva",
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               },
               

          }).then((response) => {

               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          })


     })

})

it('Deve deletar um usuário previamente cadastrado', () => {
     it('Deve deletar um usuário previamente cadastrado', () => {
          cy.request('usuarios').then(response => {

               let id = response.body.usuarios[1]._id
               cy.request({
                    method: 'DELETE',
                    url: 'usuarios/${"id"}',
                    headers: { authorization: token }
               }).then((response) => {

                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro excluído com sucesso')


               })
          });


     });
})
