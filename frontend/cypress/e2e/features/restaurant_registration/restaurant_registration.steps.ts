import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

//Scenario: Cadastro bem sucedido de restaurante
//Given: common-step-definitions.ts
//And: common-step-definitions.ts
//When: common-step-definitions.ts

//Scenario: Cadastro mal sucedido de um restaurante (CNPJ já cadastrado)
//Given: common-step-definitions.ts
//And: common-step-definitions.ts
//When: common-step-definitions.ts

//Scenario: Remoção bem sucedida de um restaurante
//Given: common-step-definitions.ts
When("eu tento excluir o restaurante", () => {
  cy.get("#excluir").click();
  cy.contains(
    "Tem certeza que deseja excluir o restaurante? Todos os dados cadastrados serão excluídos permanentemente"
  ).should("be.visible");
  cy.get("#rightButton").click();
});

Then(
  "o restaurante com nome {string}, CNPJ {string}, email {string} é excluído do sistema",
  (name, cnpj, email) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/restaurants",
    }).then((response) => {
      expect(response.body).to.not.deep.include({ name, cnpj, email });
    });
  }
);

Then("sou encaminhado para a página {string}", (url) => {
  cy.url().should("contain", url);
});
