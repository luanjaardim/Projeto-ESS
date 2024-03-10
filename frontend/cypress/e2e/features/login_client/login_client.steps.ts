import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("eu estou na página {string}", (page: string) => {
  cy.visit(page);
});

Given(
  "existe um cliente com email {string} e com senha {string}",
  (email: string, password: string) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/clients",
    }).then((response) => {
      response.body.forEach((client: any) => {
        if (client.email === email) {
          cy.request({
            method: "DELETE",
            url: "http://localhost:5001/clients/" + client.id,
          });
        }
      });

      cy.request({
        method: "POST",
        url: "http://localhost:5001/clients",
        body: {
          name: "Caio",
          cpf: "123.456.789-00",
          email,
          password,
          address: "Rua ESS - Software",
        },
      });
    });
  }
);

Given(
  "não existe cliente com {string} {string}",
  (field: string, value) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/clients",
    }).then((response) => {
      response.body.forEach((client: any) => {
        if (client[field] === value) {
          cy.request({
            method: "DELETE",
            url: "http://localhost:5001/clients/" + client.id,
          });
        }
      });
    });
  }
);

When(
  "eu preencho o campo de {string} com {string}",
  (field: string, value: string) => {
    if (value === "") {
      cy.get("#" + field).clear();
    } else {
      cy.get("#" + field).type(value);
    }
  }
);

When("eu tento realizar login apertando em {string}", (button: string) => {
  cy.get("#" + button).click();
});

Then("eu devo ver uma mensagem de erro dizendo {string}", (message: string) => {
  cy.contains(message).should("be.visible");
});

Then("eu devo ser redirecionado para a página seguinte {string}", (url: string) => {
  cy.url().should("contain", url);
});

Then("eu permaneço na página {string}", (url: string) => {
  cy.url().should("contain", url);
});