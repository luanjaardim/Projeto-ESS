Feature: Cancelamento de Pedidos.
As um usuário. 
I want to acessar os pedidos em andamento e ter a possibilidade de solicitar o cancelamento de um pedido.
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa cancelar o meu pedido.

Scenario: Cancelar pedido com status "Confirmado" e dentro do tempo limite (5 minutos).
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento". 
And o pedido "#01" foi realizado há "3" minutos.
And o status do pedido "#01" é "Confirmado".
When seleciona a opção "Cancelar Pedido" do pedido "#01". 
Then aparece a "Janela  de Confirmação".

Scenario: Falha ao cancelar pedido após o tempo limite (5 minutos).
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento". 
And um usuário finalizou o pedido "#01" há "6" minutos.
And o status do pedido "#01" é "Confirmado".
When seleciona a opção "Cancelar Pedido". 
Then há uma "notificação" informando "Tempo limite excedido!!".

Scenario: Falha ao cancelar pedido com status "em Preparo".
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento". 
And um usuário finalizou o pedido "#01" há "3" minutos.
And o status do pedido "#01" é "em Preparo".
When seleciona a opção "Cancelar Pedido". 
Then há uma "notificação" informando "Pedido já em preparo :(".

Scenario: Falha na confirmação de cancelamento por senha incorreta.
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento".
And eu estou com a "Janela de confirmação" aberta.
When seleciona a opção "Outros".
And insiro a senha "321".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificação" informando "Senha incorreta, tente novamente!".

Scenario: Falha no cancelamento por falta de preenchimento do campo "Motivo".
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento.
And eu estou com a "Janela de confirmação" aberta.
When insiro a senha "123".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificação" informando "É necessário inserir um motivo para o cancelamento".

Scenario: Confirmação de cancelamento de pedido.
Given eu estou logado como "Hugo" com senha "123".
And eu estou na página "Pedidos em Andamento".
And eu estou com a "Janela de confirmação" aberta.
When seleciona a opção "Outros".
And insiro a senha "123".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificação" informando "Pedido Cancelado com sucesso!"

Scenario: Falha no cancelamento por falta de preenchimento do campo "Senha".
Given eu estou logado como "Hugo" "com senha "123".
And eu estou na página "Pedidos em Andamento.
And eu estou com a "Janela de confirmação" aberta.
When seleciona a opção "Outros".
And seleciona a opção "Confirmar Cancelamento".
Then há uma "notificação" informando "É necessário o preenchimento da senha".

Scenario: Voltar para página inicial.
Given eu estou logado como "João" com senha "senha".
And eu estou na página "Pedidos em Andamento". 
When seleciona a opção "Voltar". 
Then eu estou na página "Pagina Inicial".

Scenario: Verificação cancelamento.
Given um pedido com número "001" está registrado no sistema de "Pedidos em andamento".
When uma requisição de "DELETE" é enviada para "PedidosEmAndamento/001". 
And o status da resposta deve ser "200". 
Then uma mensagem de "Pedido cancelado" deve ser retornada.

Scenario: Verificação Status do Pedido.
Given um pedido com número "002" está registrado no sistema de "Pedidos em andamento".
When uma requisição de "GET" é enviada para "PedidosEmAndamento/002/Status".
Then o status da resposta deve ser "200".
And a resposta contém id "002" and nome "Status".

