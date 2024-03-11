import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When(
  "eu preencho o campo {string} com {string}",
  (field: string, value: string) => {
    cy.get("#" + field).type(value);
  }
);

When("eu seleciono a opção {string}", (button: string) => {
  cy.get("#" + button).click();
});

Then("aparece a mensagem {string}", (message: string) => {
  cy.contains(message).should("be.visible");
});

Then("vou para a tela {string}", (url: string) => {
  cy.url().should("contain", url);
});



