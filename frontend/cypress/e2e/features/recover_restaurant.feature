Scenario: Recuperação de senha sucesso (GUI)
    Given o usuário está na página de “Recuperação de senha”
    When o campo de e-mail é preenchido “ecab@cin.ufpe.br”
    Then uma requisição POST é enviada para “/restaurants/recover" com o dado "ecab@cin.ufpe.br" 
    Then o e-mail é encontrado no banco de dados
    And o código "12345" é associado ao restaurante de e-mail "ecab@cin.ufpe.br"
    And é retornado status "202"
    Then o texto do corpo da requisição é “código enviado para o e-mail”
