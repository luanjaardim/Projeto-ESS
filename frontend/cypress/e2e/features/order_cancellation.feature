Feature: Cancelamento de Pedidos.
As um usuário. 
I want to acessar os Pedidos e ter a possibilidade de solicitar o cancelamento de um pedido.
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa cancelar o meu pedido.

Scenario: Cancelamento mal sucedido de pedido: Senha incorreta.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId1034".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8697" há "01:53" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8697".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId103", motivo "Perdi a Vontade" e confirmo o cancelamento.
Then há uma notificação informando "Senha incorreta!".
And o status do pedido "#8697" é "Pendente".

Scenario: Cancelamento mal sucedido de pedido: Pedido já cancelado.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId1034".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8698" há "01:09" minutos e o status do pedido é "Cancelado".
When seleciona a opção cancelar pedido do pedido "#8698".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId1034", motivo "Demorou demais" e confirmo o cancelamento.
Then há uma notificação informando "Pedido já cancelado!".
And o status do pedido "#8698" é "Cancelado".

Scenario: Cancelamento mal sucedido de pedido: Pedido já aceito.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId1034".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8700" há "04:21" minutos e o status do pedido é "Aceito".
When seleciona a opção cancelar pedido do pedido "#8700".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId1034", motivo "Mudei de ideia" e confirmo o cancelamento.
Then há uma notificação informando "Pedido já foi aceito!".
And o status do pedido "#8700" é "Aceito".

Scenario: Cancelamento bem sucedido de pedido.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId1034".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8697" há "01:53" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8697".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId1034", motivo "Comi muito já" e confirmo o cancelamento.
Then há uma notificação informando "Cancelamento bem sucedido!".
And o status do pedido "#8697" é "Cancelado".

Scenario: Cancelamento mal sucedido de pedido: Tempo limite excedido.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId1034".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8699" há "17:34" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8699".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId1034", motivo "Tive um imprevisto" e confirmo o cancelamento.
Then há uma notificação informando "Tempo limite excedido!".
And o status do pedido "#8699" é "Pendente".

Scenario: Falha no cancelamento por falta de preenchimento do campo "Motivo".
Given eu estou logado como "ham4@cin.ufpe.br" com senha "abc123".
And eu estou na página "/order".
And "ham4" finalizou o pedido "#8703" há "02:13" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8703".
Then aparece a Janela de Confirmação.
When insiro a senha "abc123", motivo "" e confirmo o cancelamento.
Then há uma notificação informando "Preencha o campo de motivo!".
And o status do pedido "#8703" é "Pendente".

Scenario: Falha no cancelamento por falta de preenchimento do campo "Senha".
Given eu estou logado como "ham4@cin.ufpe.br" com senha "abc123".
And eu estou na página "/order".
And "ham4" finalizou o pedido "#8704" há "01:48" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8704".
Then aparece a Janela de Confirmação.
When insiro a senha "", motivo "Vou comer algo bom para saúde" e confirmo o cancelamento.
Then há uma notificação informando "Preencha o campo de senha!".
And o status do pedido "#8704" é "Pendente".

Scenario: Voltar para página inicial.
Given eu estou logado como "ham4@cin.ufpe.br" com senha "abc123".
And eu estou na página "/order". 
When seleciona a opção "Voltar". 
Then eu estou na pagina "/client/home".
