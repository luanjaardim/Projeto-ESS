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
