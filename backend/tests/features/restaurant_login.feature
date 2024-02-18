Feature: login_restaurant Service
    As a usuário não logado
    I want to fazer login com meu email e senha e recuperar a senha caso necessário
    So that eu posso acessar minha conta no iBreno

Scenario: Login realizado com sucesso
	Given existe um restaurante cadastrado com email “ecab@cin.ufpe.br” e com senha “senha_restaurant”
	When uma requisição POST é enviada para “/restaurant" com os dados “ecab@cin.ufpe.br” e “senha_errada_restaurant”
	Then a senha "senha_errada_restaurant" não corresponde à senha correta “senha_restaurant“
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Login realizado com sucesso
	Given existe um restaurante cadastrado com email “ecab@cin.ufpe.br” e com senha “111111”
	When uma requisição POST é enviada para “/restaurant" com os dados “ecab@cin.ufpe.br” e “111111”
	Then os dados são encontrados no banco de dados
	And é retornado status “202”
	And o login é realizado com sucesso

Scenario: Login fracassou, pois a senha está incorreta
	Given existe um restaurante cadastrado com email “ecab@cin.ufpe.br” e com senha “111115”
	When uma requisição POST é enviada para “/restaurant" com os dados “ecab@cin.ufpe.br” e “111115”
	Then um dos dados não é encontrado no banco de dados
	And é retornado status “401”
	And o login não pode ser concluído

Scenario: Esqueci senha sucesso
	Given existe um restaurante cadastrado com email "ecab@cin.ufpe.br" 
	When uma requisição POST é enviada para “/recover" com o dado “ecab@cin.ufpe.br”
	Then o e-mail "ecab@cin.ufpe.br" é encontrado  no banco de dados
	And é retornado status "202"
	And o restaurante de e-mail "ecab@cin.upe.br" é atualizado com o código de verificação "12345"
	And o código "12345" é enviado para o endereço de e-mail 

Scenario: Esqueci senha falha
	Given não existe um restaurante cadastrado com email "emilly@cin.ufpe.br" 
	When uma requisição POST é enviada para “/recover" com o dado “emilly@cin.ufpe.br”
	Then o e-mail "ecab@cin.ufpe.br" não é encontrado  no banco de dados
	And é retornado status "401"
	And o texto do corpo de requisição é "e-mail não encontrado"

Scenario: Recuperação de senha sucesso
	Given o restaurante de e-mail "ecab@cin.ufpe.br" tem um código de verificação "12345"
	When uma requisição POST é enviada para “/recover/code" com os dados "ecab@cin.ufpe.br" e “12345”
	Then o e-mail "ecab@cin.ufpe.br" é encontrado  no banco de dados
	And o código "12345" é associado ao restaurante de e-mail "ecab@cin.ufpe.br"
	And é retornado status "202"

Scenario: Recuperação de senha falha
	Given o restaurante de e-mail "ecab@cin.ufpe.br" tem um código de verificação "12345"
	When uma requisição POST é enviada para “/recover/code" com os dados "ecab@cin.ufpe.br" e “1234”
	Then o e-mail "ecab@cin.ufpe.br" é encontrado  no banco de dados
	And o código "1234" não é associado ao restaurante de e-mail "ecab@cin.ufpe.br"
	And é retornado status "401"

Scenario: Criação de nova senha sucesso
	Given o restaurante de e-mail "ecab@cin.ufpe.br" tem um código de verificação
	When uma requisição POST é enviada para “/recover/password" com os dados "ecab@cin.ufpe.br" e “123Em”
	Then a senha do restaurante de e-mail "ecab@cin.ufpe.br" é atualizada para "123Em"
	And é retornado status "202"
	And o texto do corpo de requisição é "senha atualizada com sucesso"

Scenario: Criação de nova senha falha
	Given o restaurante de e-mail "ecab@cin.ufpe.br" não tem um código de verificação
	When uma requisição POST é enviada para “/recover/password" com os dados "ecab@cin.ufpe.br" e “123Em”
	Then a senha do restaurante de e-mail "ecab@cin.ufpe.br" não é atualizada 
	And é retornado status "401"