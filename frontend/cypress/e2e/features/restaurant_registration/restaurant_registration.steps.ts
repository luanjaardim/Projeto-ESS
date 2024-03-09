import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

//Given: common-step-definitions.ts

Then("o usuário deve ver o titulo {string}", (text: string) => {
  cy.get("h1").should("contain", text);
});
