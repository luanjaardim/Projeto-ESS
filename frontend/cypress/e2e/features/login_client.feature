Feature: loginclient
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given eu estou na página "/clients/login"
  And existe um cliente com email "cvmfc@cin.ufpe.br" e com senha "senha567"
	When eu preencho o campo de "email" com "cvmfc@cin.ufpe.br"
	And eu preencho o campo de "senha" com "senha567"
	And eu tento realizar login apertando em "Login"
	Then eu devo ser redirecionado para a página seguinte "/client/home"

Scenario: Login fracassou pois a senha está incorreta
	Given eu estou na página "/clients/login"
  And existe um cliente com email "cvmfc@cin.ufpe.br" e com senha "senha567"
  And não existe cliente com "senha" "1234"
	When eu preencho o campo de "email" com "cvmfc@cin.ufpe.br"
	And eu preencho o campo de "senha" com "1234"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Email e/ou senha incorretos"
	And eu permaneço na página "/clients/login"

Scenario: Login fracassou pois o email não está cadastrado
	Given eu estou na página "/clients/login"
  And existe um cliente com email "cvmfc@cin.ufpe.br" e com senha "senha567"
  And não existe cliente com "email" "abcde@cin.ufpe.br"
	When eu preencho o campo de "email" com "abcde@cin.ufpe.br"
	And eu preencho o campo de "senha" com "senha567"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Email e/ou senha incorretos"
	And eu permaneço na página "/clients/login"

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given eu estou na página "/clients/login"
  And existe um cliente com email "cvmfc@cin.ufpe.br" e com senha "senha567"
	When eu preencho o campo de "email" com "cvmfc@cin.ufpe.br"
	And eu preencho o campo de "senha" com ""
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Todos os campos devem ser preenchidos"
	And eu permaneço na página "/clients/login"