Feature: Cadastro de restaurante
    As a administrador de um restaurante
    I want to inserir o meu restaurante no sistema
    So that eu possa acompanhar os pedidos dos clientes

Scenario: Cadastro bem sucedido de restaurante
    Given estou na página "/restaurant/registration"
    And não existe nenhum restaurante com o CNPJ "12.381.185/0001-70" nem com o email "test1@email.com" cadastrado no sistema
    When o campo de "nome" é preenchido com "Quentinha refeições"
    And o campo de "CNPJ" é preenchido com "12.381.185/0001-70"
    And o campo de "email" é preenchido com "test1@email.com"
    And o campo de "senha" é preenchido com "12345678"
    And seleciono a opção "cadastrar"
    Then consigo ver uma mensagem dizendo "Cadastro realizado com sucesso"


Scenario: Cadastro mal sucedido de um restaurante (CNPJ já cadastrado)
    Given existe um restaurante cadastrado no sistema com os dados nome "Quentinha refeições", CNPJ "23.381.185/0001-70", email "test2@email.com" e senha "senha_adm_restaurante"
    And não existe nenhum restaurante com o "email" "guloso@email.com"
    And estou na página "/restaurant/registration"
    When o campo de "nome" é preenchido com "Guloso Trincado"
    And o campo de "CNPJ" é preenchido com "23.381.185/0001-70"
    And o campo de "email" é preenchido com "guloso@email.com"
    And o campo de "senha" é preenchido com "12345678"
    And seleciono a opção "cadastrar"
    Then consigo ver uma mensagem dizendo "Falha no cadastro! Restaurante já cadastrado"
    And continuo na página "/restaurant/registration"

Scenario: Cadastro mal sucedido de um restaurante (email já cadastrado)
    Given existe um restaurante cadastrado no sistema com os dados nome "Quentinha refeições", CNPJ "33.381.185/0001-70", email "test3@email.com" e senha "senha_adm_restaurante"
    And não existe nenhum restaurante com o "cnpj" "23.381.185/0001-71"
    And estou na página "/restaurant/registration"
    When o campo de "nome" é preenchido com "Guloso Trincado"
    And o campo de "CNPJ" é preenchido com "23.381.185/0001-71"
    And o campo de "email" é preenchido com "test3@email.com"
    And o campo de "senha" é preenchido com "12345678"
    And seleciono a opção "cadastrar"
    Then consigo ver uma mensagem dizendo "Falha no cadastro! Restaurante já cadastrado"
    And continuo na página "/restaurant/registration"

Scenario: Remoção bem sucedida de um restaurante
    Given existe um restaurante cadastrado no sistema com os dados nome "Quentinha refeições", CNPJ "43.381.185/0001-70", email "test4@email.com" e senha "senha_adm_restaurante"
    And estou logado como administrador do restaurante "Quentinha refeições" na tela "/restaurant/profile"
    When eu tento excluir o restaurante
    Then o restaurante com nome "Quentinha refeições", CNPJ "43.381.185/0001-70", email "test4@email.com" é excluído do sistema
    And sou encaminhado para a página "/restaurant/registration"
