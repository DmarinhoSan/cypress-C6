describe('Central de Atendimento ao Cliente TAT', () => { //Define Suite de testes
  beforeEach(() => { //Executa algo antes de cada caso de teste
    cy.visit('./src/index.html') //Acessa a página HTML
  })
  
  it('verifica o título da aplicação', () => { //Define o caso de teste
    //cy.visit('https://wlsf82.github.io/cypress-do-zero-a-nuvem/src/index.html') //Acessa a página HTML
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT') //Pega o título da página
  })

  it('preenche os campos obrigatórios e envia o formulário', () => { //Define o caso de teste
    const longText = ('Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.', 10) //Texto longo para o campo de texto
    cy.get('#firstName').type('Douglas') //Pega o campo pelo id e insere um texto
    cy.get('#lastName').type('Santos') //Pega o campo pelo id e insere um texto
    cy.get('#email').type('doug_masterds@hotmail.com') //Pega o campo pelo id e insere um texto
    cy.get('#open-text-area').type(longText, {delay: 0}) //Pega o campo pelo id e insere um texto com delay de 0
    
    cy.get('button[type="submit"]').click() //Pega o botão pelo seletor e clica
    
    cy.get('.success').should('be.visible') //Pega a classe e verifica se está visível    
  })

  it('exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', () => { //Define o caso de teste
    cy.get('#firstName').type('Douglas') //Pega o campo pelo id e insere um texto 
    cy.get('#lastName').type('Santos') //Pega o campo pelo id e insere um texto 
    cy.get('#email').type('doug_masterds@hotmail,com') //Pega o campo pelo id e insere um texto
    cy.get('#open-text-area').type('teste') //Pega o campo pelo id e insere um texto com delay de 0
    
    cy.get('button[type="submit"]').click() //Pega o botão pelo seletor e clica
    
    cy.get('.error').should('be.visible') //Pega a classe e verifica se está visível
  })

    it('campo telefone continua vazio quando preenchido com um valor não-númerico', () => { //Define o caso de teste
    cy.get('#phone') //Pega o campo pelo id e insere um texto
      .type('abcdefghij') //Tenta inserir um texto
      .should('have.value', '') //Verifica se o campo continua vazio
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => { //Define o caso de teste
    cy.get('#firstName').type('Douglas') //Pega o campo pelo id e insere um texto 
    cy.get('#lastName').type('Santos') //Pega o campo pelo id e insere um texto 
    cy.get('#email').type('doug_masterds@hotmail,com') //Pega o campo pelo id e insere um texto
    cy.get('#open-text-area').type('teste') //Pega o campo pelo id e insere um texto com delay de 0
    cy.get('#phone-checkbox').click() //Clica no checkbox de telefone para tornar o campo obrigatório
    
    cy.get('button[type="submit"]').click() //Pega o botão pelo seletor e clica

    cy.get('.error').should('be.visible') //Pega a classe e verifica se está visível
  })

  it('preenche e limpa os campos nome, sobrenome, e-mail e telefone', () => { //Define o caso de teste
    cy.get('#firstName')
      .type('Douglas') //Pega o campo pelo id e insere um texto
      .should('have.value', 'Douglas') //Verifica se o campo foi preenchido corretamente
      .clear() //Limpa o campo
      .should('have.value', '') //Verifica se o campo está vazio
    
    cy.get('#lastName')
      .type('Santos') //Pega o campo pelo id e insere um texto
      .should('have.value', 'Santos') //Verifica se o campo foi preenchido corretamente
      .clear() //Limpa o campo 
      .should('have.value', '') //Verifica se o campo está vazio
    
    cy.get('#email')
      .type('doug_masterds@hotmail.com') //Pega o campo pelo id e insere um texto
      .should('have.value', 'doug_masterds@hotmail.com') //Verifica se o campo foi preenchido corretamente
      .clear() //Limpa o campo
      .should('have.value', '') //Verifica se o campo está vazio

     cy.get('#phone')
      .type('1234567890') //Pega o campo pelo id e insere um texto
      .should('have.value', '1234567890') //Verifica se o campo foi preenchido corretamente
      .clear() //Limpa o campo
      .should('have.value', '') //Verifica se o campo está vazio
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => { //Define o caso de teste
    cy.get('button[type="submit"]').click() //Pega o botão pelo seletor e clica
    cy.get('.error').should('be.visible') //Pega a classe e verifica se está visível
  })

  it('envia o formulário com sucesso usando um comando customizado', () => { //Define o caso de teste
    const data = { // 
      firstName: 'Douglas', //  
      lastName: 'Santos',
      email: 'doug_masterds@hotmail.com',
      text: 'teste.'

    } //

    cy.fillMandatoryFieldsAndSubmit(data) //Chama o comando customizado
    //cy.fillMandatoryFieldsAndSubmit() //Chama o comando customizado
    cy.get('.success').should('be.visible') //Pega a classe e verifica se está visível

  })

  it('seleciona um produto (YouTube) por seu texto', () => { //Define o caso de teste
    cy.get('#product') //Pega o campo pelo id
      .select('YouTube') //Seleciona o campo pelo texto
      .should('have.value', 'youtube') //Verifica se o campo foi selecionado corretamente
  })
  
  it('seleciona um produto (Mentoria) por seu valor (value)', () => { //Define o caso de teste
    cy.get('#product') //Pega o campo pelo id
      .select('mentoria') //Seleciona o campo pelo value
      .should('have.value', 'mentoria') //Verifica se o campo foi selecionado corretamente
  })

  it('seleciona um produto (Blog) por seu índice', () => { //Define o caso de teste
    cy.get('#product') //Pega o campo pelo id
      .select(1) //Seleciona o campo pelo índice
      .should('have.value', 'blog') //Verifica se o campo foi selecionado corretamente
  })

  it('marca o tipo o tipo de atendimento "Feedback"', () => { 
    cy.get('input[type="radio"][value="feedback"]') //Seleciona especificamente o feedback
      .check()
      .should('be.checked')
  })

  it('marca o tipo o tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeofService => { //Seleciona cada um dos seletores
      cy.wrap(typeofService)
      .check()
      .should('be.checked')  
    })
  })

  // Teste para marcar ambos checkboxes e desmarcar o último
  it('marca ambos checkboxes, depois desmarca o último', () => {
      cy.get('input[type="checkbox"]') // Seleciona todos os checkboxes na página
        .check() // Marca todos os checkboxes
        .should('be.checked') // Verifica se todos estão marcados
        .last() // Seleciona o último checkbox
        .uncheck() // Desmarca o último checkbox
        .should('not.be.checked') // Verifica se o último está desmarcado
  })

  // Teste para selecionar um arquivo da pasta fixtures
  it ('seleciona um arquivo da pasta fixtures', () => { 
      cy.get('#file-upload') // Seleciona o campo de upload de arquivo pelo id
        .selectFile('cypress/fixtures/example.json') // Realiza o upload do arquivo example.json da pasta fixtures
        .should(input => { // Verifica o resultado do upload
          expect(input[0].files[0].name).to.equal('example.json') // Confirma que o arquivo selecionado é o example.json
        })
  })

    // Teste para selecionar um arquivo da pasta fixtures usando drag-drop
    it ('seleciona um arquivo simulando um drag-and-drop', () => { 
      cy.get('#file-upload') // Seleciona o campo de upload de arquivo pelo id
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'}) // Realiza o upload do arquivo example.json da pasta fixtures simulando o arrastar e soltar
        .should(input => { // Verifica o resultado do upload
          expect(input[0].files[0].name).to.equal('example.json') // Confirma que o arquivo selecionado é o example.json
        })
    })

    // Teste para selecionar um arquivo utilizando uma fixture com alias
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
          cy.fixture('example.json').as('sampleFile') // Carrega o arquivo example.json da pasta fixtures e atribui o alias 'sampleFile'
          cy.get('#file-upload') // Seleciona o campo de upload de arquivo pelo id
            .selectFile('@sampleFile') // Realiza o upload do arquivo usando o alias criado
            .should(input => { // Verifica o resultado do upload
              expect(input[0].files[0].name).to.equal('example.json') // Confirma que o arquivo selecionado é o example.json
            })
          })

    // Teste para selecionar um arquivo utilizando uma fixture com alias
    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr', 'href', 'privacy.html')
        .and('have.attr', 'target', '_blank')
    })


    // Teste para selecionar um arquivo utilizando uma fixture com alias
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    })

    
    
})