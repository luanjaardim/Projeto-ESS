Feature: loginrestaurant
    As a usuário não logado
    I want to fazer login com meu email e senha
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given eu estou na aba "/restaurants/login"
	When eu preencho o campo de "email" com um email cadastrado "alow@gmail.com"
	And eu preencho o campo de "senha" com a senha correspondente "122333"
	And eu tento realizar login apertando em "Login"
	Then eu devo ser redirecionado para a página seguinte "/restaurant/profile"

Scenario: Login fracassou pois a senha está incorreta
	Given eu estou na aba "/restaurants/login"
	When eu preencho o campo de "email" com um email cadastrado "alow@gmail.com"
	And eu preencho o campo de "senha" com uma senha incorreta "1234"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Email e/ou senha incorretos"
	And eu permaneço na aba "/restaurants/login"

Scenario: Login fracassou pois o email não está cadastrado
	Given eu estou na aba "/restaurants/login"
	When eu preencho o campo de "email" com um email não cadastrado "abcde@cin.ufpe.br"
	And eu preencho o campo de "senha" com uma senha qualquer "12345"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Email e/ou senha incorretos"
	And eu permaneço na aba "/restaurants/login"

Scenario: Login fracassou pois um dos campos não foi preenchido
	Given eu estou na aba "/restaurants/login"
	When eu preencho o campo de "email" com um email cadastrado "alow@gmail.com"
	And eu não preencho o campo de "senha"
	And eu tento realizar login apertando em "Login"
	Then eu devo ver uma mensagem de erro dizendo "Todos os campos devem ser preenchidos"
	And eu permaneço na aba "/restaurants/login"