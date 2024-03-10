// e.g Given("o usuário "tal" está logado", (page: string) => {});
import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import "cypress-if";
import { ordersSize } from "../../../../src/app/OrderCancellation/pages/index";

var flag = 0;
beforeEach(() => {
  flag = 0;
});

Given(
  "eu estou logado como {string} com senha {string}.",
  function (name: string, password: string) {
    cy.visit("*");
    cy.wait(500);
    cy.contains("Login Cliente").click();
    cy.get(":nth-child(1) > input").type(name);
    cy.get(":nth-child(2) > input").type(password);
    cy.get("span").click();
    cy.wait(500);
  }
);

Given("eu estou na página {string}.", function (page: string) {
  cy.wait(200);
  cy.get(
    '.top_inner_container > [style="background: rgb(37, 31, 165);"]'
  ).click();
  cy.wait(500);
});

Given(
  "{string} finalizou o pedido {string} há {string} minutos e o status do pedido é {string}.",
  function (name: string, orderNumber: string, time: string, status: string) {
    for (let i = 1; i <= ordersSize; i++) {
      cy.get(`:nth-child(${i}) > .order-label-cancPg`)
        .if()
        .invoke("text")
        .then((text) => {
          if (text === "Pedido " + orderNumber) {
            flag = i;
            cy.get(".user-info-cancPg").should("have.text", name);
            cy.get(`:nth-child(${i}) > .order-label-cancPg`).should(
              "have.text",
              "Pedido " + orderNumber
            );
            cy.get(
              `:nth-child(${i}) > .order-actions-cancPg > .action-left-cancPg > .time-cancPg`
            ).should("have.text", "Tempo estimado: " + time);
            cy.get(
              `:nth-child(${i}) > .order-actions-cancPg > .action-left-cancPg > .status-cancPg > .status-${status}-cancPg`
            ).should("have.have.text", status);
          }
        });
    }
  }
);

When(
  "seleciona a opção cancelar pedido do pedido {string}.",
  function (orderNumber: string) {
    cy.get(
      `:nth-child(${flag}) > .order-actions-cancPg > .cancel-button-cancPg`
    ).click();
  }
);

When(
  "insiro a senha {string}, motivo {string} e confirmo o cancelamento.",
  function (password: string, reason: string) {
    if (reason != "") {
      cy.get(":nth-child(1) > label").type(reason);
    }
    if (password != "") {
      cy.get("#senha").type(password);
    }
    cy.get(".confirm-button-cancPg").click();
  }
);

When("seleciona a opção {string}.", function (voltar: string) {
  cy.get(".back-button-cancPg").click();
});

Then("aparece a Janela de Confirmação.", function () {
  cy.get(".modal-content-cancPg").should("be.visible");
});

Then("há uma notificação informando {string}.", function (label: string) {
  if (
    label === "Preencha o campo de senha!" ||
    label === "Preencha o campo de motivo!"
  ) {
    cy.get(".MuiAlert-message").should("have.text", label);
    cy.get(".MuiPaper-root").should("be.visible");
  } else {
    cy.get("p").should("have.text", label);
    if (label === "Cancelamento bem sucedido!") {
      cy.get(".success-tab-cancPg").should("be.visible");
    } else {
      cy.get(".error-tab-cancPg").should("be.visible");
    }
  }
});

Then(
  "o status do pedido {string} é {string}.",
  function (orderNumber: string, status: string) {
    cy.get(
      `:nth-child(${flag}) > .order-actions-cancPg > .action-left-cancPg > .status-cancPg > .status-${status}-cancPg`
    ).should("have.have.text", status);
  }
);

Then("eu estou na pagina {string}.", function (url: string) {
  cy.url().should("include", url);
});
