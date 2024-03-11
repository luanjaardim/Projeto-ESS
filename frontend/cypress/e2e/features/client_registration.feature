Scenario:Cadastro bem sucedido (GUI)
Given estou na pagina de cadastro
And não existe nenhum cliente com o CPF “123321222” nem com o email "comercomer@gmail.com" nem com onome "user1" cadastrado no sistema
When eu preencho o campo nome com "user1"
And o campo email com "comercomer@gmail.com"
And o campo CPF com “123321222”
And o campo endereco com "rua1"
And o campo senha com "123"
And o campo confirmar_senha com "123"
And seleciono a opção “Cadastrar”
Then aparece a mensagem "Cadastro realizado com sucesso!"
And volto a tela de login

Scenario: Cadastro mal-sucedido, email já usado (GUI)
Given estou na pagina de cadastro
And existe um cliente com o CPF “123321222” e com o email "comercomer@gmail.com" e com onome "user1" cadastrado no sistema
When eu preencho o campo nome com "user2"
And o campo email com "comercomer@gmail.com"
And o campo CPF com “1233214444”
And o campo endereco com "rua1"
And o campo senha com "123"
And o campo confirmar_senha com "123"
And seleciono a opção “Cadastrar”
Then aparece a mensagem "Cadastro mal-sucedido, e-mail já existente"
And permaneco na tela de cadastro

Scenario: Cadastro mal-sucedido, CPF já usado (GUI)
Given estou na pagina de cadastro
And existe um cliente com o CPF “123321222” e com o email "alimentarmail.com" e com o nome "user1" cadastrado no sistema
When eu preencho o campo nome com "user2"
And o campo email com "comercomer@gmail.com"
And o campo CPF com “123321222”
And o campo endereco com "rua1"
And o campo senha com "123"
And o campo confirmar_senha com "123"
And seleciono a opção “Cadastrar”
Then aparece a mensagem "Cadastro mal-sucedido, CPF já existente"
And permaneco na tela de cadastro

Scenario: atualização de cadastro (GUI)
Given estou logado numa conta cujo e-mail é "alimentarmail.com"
And estou na página "Meus dados"
When eu altero o e-mail para "comercomer@gmail.com"
And seleciono Salvar
Then aparece a mensagem "Cadastro atualizado com sucesso"
And permaneco na pagina "Meus dados"

Scenario: atualização de cadastro mal-sucedida, email já usado (GUI)
Given estou logado numa conta cujo e-mail é "alimentarmail.com"
And estou na página "Meus dados"
And existe uma conta que usa o e-mail "comercomer@gmail.com"
When eu altero o e-mail para "comercomer@gmail.com"
And seleciono Salvar
Then aparece a mensagem "Cadastro não atualizado, e-mail já existente"
And permaneco na pagina "Meus dados"
