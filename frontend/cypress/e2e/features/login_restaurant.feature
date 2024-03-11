Feature: loginrestaurant
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given eu estou na página "/restaurants/login"
	And existe um restaurante com email "alow@gmail.com" e com senha "122333"
	When eu preencho o campo de "email" com "alow@gmail.com"
	And eu preencho o campo de "senha" com "122333"
	And eu tento realizar login apertando em "Login"
	Then eu devo ser redirecionado para a página seguinte "/restaurant/profile"

Scenario: Login fracassou pois a senha está incorreta
	Given eu estou na página "/restaurants/login"
	And existe um restaurante com email "alow@gmail.com" e com senha "122333"
	And não existe restaurante com "senha" "1234"
	When eu preencho o campo de "email" com "alow@gmail.com"
	And eu preencho o campo de "senha" com "1234"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Email e/ou senha incorretos"
	And eu permaneço na página "/restaurants/login"

Scenario: Login fracassou pois o email não está cadastrado
	Given eu estou na página "/restaurants/login"
	And existe um restaurante com email "alow@gmail.com" e com senha "122333"
  And não existe restaurante com "email" "abcde@cin.ufpe.br"
	When eu preencho o campo de "email" com "abcde@cin.ufpe.br"
	And eu preencho o campo de "senha" com "12345"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Email e/ou senha incorretos"
	And eu permaneço na página "/restaurants/login"

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given eu estou na página "/restaurants/login"
	And existe um restaurante com email "alow@gmail.com" e com senha "122333"
	When eu preencho o campo de "email" com "alow@gmail.com"
	And eu preencho o campo de "senha" com ""
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Todos os campos devem ser preenchidos"
	And eu permaneço na página "/restaurants/login"