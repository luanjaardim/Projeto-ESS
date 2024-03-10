Feature: Cancelamento de Pedidos.
As um usuário. 
I want to acessar os Pedidos e ter a possibilidade de solicitar o cancelamento de um pedido.
So that quando eu tiver algum contratempo ou mudar de ideia, eu possa cancelar o meu pedido.

Scenario: Cancelamento mal sucedido de pedido: Senha incorreta.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId10349".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8657" há "00:34" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8657".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId103", motivo "Perdi a Vontade" e confirmo o cancelamento.
Then há uma notificação informando "Senha incorreta!".
And o status do pedido "#8657" é "Pendente".

Scenario: Cancelamento mal sucedido de pedido: Pedido já cancelado.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId10349".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#2442" há "00:45" minutos e o status do pedido é "Cancelado".
When seleciona a opção cancelar pedido do pedido "#2442".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId10349", motivo "Demorou demais" e confirmo o cancelamento.
Then há uma notificação informando "Pedido já cancelado!".
And o status do pedido "#2442" é "Cancelado".

Scenario: Cancelamento mal sucedido de pedido: Pedido já aceito.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId10349".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#4842" há "02:42" minutos e o status do pedido é "Aceito".
When seleciona a opção cancelar pedido do pedido "#4842".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId10349", motivo "Mudei de ideia" e confirmo o cancelamento.
Then há uma notificação informando "Pedido já foi aceito!".
And o status do pedido "#4842" é "Aceito".

Scenario: Cancelamento bem sucedido de pedido.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId10349".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#8657" há "00:34" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8657".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId10349", motivo "Comi muito já" e confirmo o cancelamento.
Then há uma notificação informando "Cancelamento bem sucedido!".
And o status do pedido "#8657" é "Cancelado".

Scenario: Cancelamento mal sucedido de pedido: Tempo limite excedido.
Given eu estou logado como "bigT@cin.ufpe.br" com senha "senha_userId10349".
And eu estou na página "/order". 
And "bigT" finalizou o pedido "#5000" há "05:01" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#5000".
Then aparece a Janela de Confirmação.
When insiro a senha "senha_userId10349", motivo "Tive um imprevisto" e confirmo o cancelamento.
Then há uma notificação informando "Tempo limite excedido!".
And o status do pedido "#5000" é "Pendente".

Scenario: Falha no cancelamento por falta de preenchimento do campo "Motivo".
Given eu estou logado como "ham4@cin.ufpe.br" com senha "abc".
And eu estou na página "/order".
And "ham4" finalizou o pedido "#8685" há "15:28" minutos e o status do pedido é "Pendente".
When seleciona a opção cancelar pedido do pedido "#8685".
Then aparece a Janela de Confirmação.
When insiro a senha "abc", motivo "" e confirmo o cancelamento.
Then há uma notificação informando "Preencha o campo de motivo!".
And o status do pedido "#8685" é "Pendente".

Scenario: Falha no cancelamento por falta de preenchimento do campo "Senha".
Given eu estou logado como "ham4@cin.ufpe.br" com senha "abc".
And eu estou na página "/order".
And "ham4" finalizou o pedido "#8686" há "06:21" minutos e o status do pedido é "Aceito".
When seleciona a opção cancelar pedido do pedido "#8686".
Then aparece a Janela de Confirmação.
When insiro a senha "", motivo "Vou comer algo bom para saúde" e confirmo o cancelamento.
Then há uma notificação informando "Preencha o campo de senha!".
And o status do pedido "#8685" é "Aceito".

Scenario: Voltar para página inicial.
Given eu estou logado como "ham4@cin.ufpe.br" com senha "abc".
And eu estou na página "/order". 
When seleciona a opção "Voltar". 
Then eu estou na pagina "/client/home".