Feature: Shopping Cart
	As a usuário
	I want escolher os itens que desejo pedir
	So that eu posso pagar por eles e receber meus produtos

Scenario: Adicionando produto ao carrinho de compras
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Restaurants"
	When eu vejo "Coxinha" do "Restaurante Glória Maria" por "1" $ como opção
	And eu vejo "Tapioca" do "Restaurante Glória Maria Oficial" por "5" $ como opção
	And eu adiciono "Coxinha" do "Restaurante Glória Maria" por "1" $ ao carrinho
	Then o carrinho contém "1" unidades de "Coxinha" por "1" $ cada do "Restaurante Glória Maria"

Scenario: Adicionando produto que já existe ao carrinho de compras
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Restaurants"
	And o carrinho já contém "5" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	When eu adiciono "Coxinha" do "Restaurante Glória Maria 2" por "10" $ ao carrinho
	Then o carrinho contém "5" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"

Scenario: Mudando a quantidade de itens no carrinho
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Shopping Cart"
	And o carrinho já contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	And o carrinho já contém "1" unidades de "Pizza" por "10" $ cada do "Restaurante Glória Maria Oficial"
	And eu clico na opção "Menos um" para o produto "Coxinha" do "Restaurante Glória Maria 2"
	When eu clico na opção "Mais um" para o produto "Pizza" do "Restaurante Glória Maria Oficial"
	Then o carrinho contém "1" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	And o carrinho contém "2" unidades de "Pizza" por "10" $ cada do "Restaurante Glória Maria Oficial"

Scenario: Removendo um item do carrinho de compras
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Shopping Cart"
	And o carrinho já contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	And o carrinho já contém "1" unidades de "Ovo de Páscoa" por "100" $ cada do "Restaurante Glória Maria Oficial"
	When eu clico na opção "Remove from Cart" para o produto "Ovo de Páscoa" do "Restaurante Glória Maria Oficial"
	And eu seleciono "Yes"
	Then o carrinho contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"

Scenario: Removendo um item com 1 unidade diminuindo sua quantidade em 1
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Shopping Cart"
	And o carrinho já contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	And o carrinho já contém "1" unidades de "Ovo de Páscoa" por "100" $ cada do "Restaurante Glória Maria Oficial"
	When eu clico na opção "Menos um" para o produto "Ovo de Páscoa" do "Restaurante Glória Maria Oficial"
	And eu seleciono "Yes"
	Then o carrinho contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"

Scenario: Finalizando um pedido
    Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Shopping Cart"
    And o carrinho já contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
    When eu seleciono "Finish the Order"
    And eu seleciono "Yes"
    Then o carrinho está vazio

Scenario: Cancelando a finalização de um pedido
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Shopping Cart"
	And o carrinho já contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	When eu seleciono "Finish the Order"
	And eu seleciono "No"
	Then o carrinho contém "2" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"

Scenario: Limpando o carrinho de compras
	Given eu estou logado como "lgaj2@cin.ufpe.br" com a senha "123456" na tela "Restaurants"
	And o carrinho já contém "1" unidades de "Coxinha" por "10" $ cada do "Restaurante Glória Maria 2"
	And o carrinho já contém "1" unidades de "Pastel" por "20" $ cada do "Restaurante Glória Maria 2"
	When eu seleciono "Clear Cart"
	And eu seleciono "Yes"
	Then o carrinho está vazio

Scenario: Consulta ao Banco de Dados carrega o carrinho do usuário após login
    Given eu estou na tela "Login"
    When eu faço login como "lgaj"
    Then uma requisição "GET" para "/{id}/shopping_cart" é enviada
    And o status da resposta deve ser "200"
    And o JSON da resposta contém a lista de itens no carrinho do usuário "lgaj"

Scenario: Salvando produtos adicionados ao carrinho no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho está vazio
    When eu vejo "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ como opção
    Then uma requisição "POST" com "1" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "201"
    And o carrinho contém "1" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"

Scenario: Aumentando a quantidade de produtos no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "1" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    When eu seleciono a opção "aumentar quantidade" do produto no carrinho "Coxinha" do "Restaurante Glória Maria Maria Juazeiro"
    Then uma requisição "PUT" com "2" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "2.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o carrinho contém "2" unidade(s) de "Coxinha" por "2.0" $ do "Restaurante Glória Maria Maria Juazeiro"

Scenario: Diminuindo a quantidade de produtos no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "3" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    When eu seleciono a opção "diminuir quantidade" do produto no carrinho "Coxinha" do "Restaurante Glória Maria Maria Juazeiro"
    Then uma requisição "PUT" com "2" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o carrinho contém "2" unidade(s) de "Coxinha" por "2.0" $ do "Restaurante Glória Maria Maria Juazeiro"

Scenario: Removendo produtos do carrinho no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "3" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    And o carrinho contém "1" unidade(s) de "Pitsa" por "10.0" $ do "Restaurante Glória Maria Juazeiro Oficial"
    When eu seleciono a opção "remover item" do produto no carrinho "Coxinha" do "Restaurante Glória Maria Maria Juazeiro"
    Then uma requisição "DELETE" com "3" unidade(s) de "Coxinha" do "Restaurante Glória Maria Juazeiro" por "1.0" $ é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o carrinho contém "1" unidade(s) de "Pitsa" por "10.0" $ do "Restaurante Glória Maria Juazeiro Oficial"

Scenario: Finalizando pedidos no Banco de Dados
    Given eu estou logado como "lgaj" na tela "Restaurantes"
    And o carrinho contém "3" unidade(s) de "Coxinha" por "1.0" $ do "Restaurante Glória Maria Maria Juazeiro"
    And o carrinho contém "1" unidade(s) de "Pitsa" por "10.0" $ do "Restaurante Glória Maria Juazeiro Oficial"
    When eu seleciono a opção "finalizar pedido" no carrinho
    Then uma requisição "PUT" é enviada para "/{id}/shopping_cart/"
    And o status da resposta deve ser "200"
    And o pedido tem status diferente de "Nao finalizado"
    And o carrinho está vazio
