Feature: Cadastro de usuário
	As a usuário do aplicativo
	I want to criar minha conta
	So that eu posso realizar os pedidos
	

Scenario: Cadastro bem sucedido 
  Given estou na página "/clients/registration"
  And não existe nenhum cliente com o "cpf" "123.321.222-87"
  And não existe nenhum cliente com o "email" "comida@gmail.com"
  When eu preencho o campo "nome" com "user1"
  And eu preencho o campo "email" com "comida@gmail.com"
  And eu preencho o campo "cpf" com "123.321.222-87"
  And eu preencho o campo "endereço" com "rua1"
  And eu preencho o campo "senha" com "123"
  And seleciono a opção "cadastrar"
  Then aparece a mensagem "Cadastro realizado com sucesso"

Scenario: Cadastro mal-sucedido, CPF já usado
  Given estou na página "/clients/registration"
  And existe um cliente com senha "123" email "alimentar@mail.com" nome "user1" cpf "12332122287" endereço "rua1"
  When eu preencho o campo "nome" com "user2"
  And eu preencho o campo "email" com "comercomer@gmail.com"
  And eu preencho o campo "cpf" com "12332122287"
  And eu preencho o campo "endereço" com "rua1"
  And eu preencho o campo "senha" com "123"
  And seleciono a opção "cadastrar"
  Then aparece a mensagem "Cadastro mal-sucedido"

Scenario: Cadastro mal-sucedido, email já usado
  Given estou na página "/clients/registration"
  And existe um cliente com senha "123" email "comercomer@gmail.com" nome "user1" cpf "12332122287" endereço "rua1"
  When eu preencho o campo "nome" com "user2"
  And eu preencho o campo "email" com "comercomer@gmail.com"
  And eu preencho o campo "cpf" com "12332144441"
  And eu preencho o campo "endereço" com "rua1"
  And eu preencho o campo "senha" com "123"
  And seleciono a opção "cadastrar"
  Then aparece a mensagem "Cadastro mal-sucedido"

Scenario: atualização de cadastro
  Given existe um cliente com senha "123" email "alimentar@mail.com" nome "user1" cpf "12332122287" endereço "rua1"
  And estou na página "/clients/profile"
  When seleciono a opção "editar"
  When eu preencho o campo "nome" com "user2"
  And seleciono a opção "salvar"
  Then consigo ver uma mensagem dizendo "Cadastro atualizado com sucesso!"

