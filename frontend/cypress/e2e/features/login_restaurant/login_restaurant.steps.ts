import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("eu estou na página {string}", (page: string) => {
  cy.visit(page);
});

Given(
  "existe um restaurante com email {string} e com senha {string}",
  (email: string, password: string) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/restaurants",
    }).then((response) => {
      response.body.forEach((restaurant: any) => {
        if (restaurant.email === email) {
          cy.request({
            method: "DELETE",
            url: "http://localhost:5001/restaurants/" + restaurant.id,
          });
        }
      });

      cy.request({
        method: "POST",
        url: "http://localhost:5001/restaurants",
        body: {
          name: "Caio",
          CNPJ: "34.677.075/0001-23",
          email,
          password,
        },
      });
    });
  }
);

Given(
  "não existe restaurante com {string} {string}",
  (field: string, value) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/restaurants",
    }).then((response) => {
      response.body.forEach((restaurant: any) => {
        if (restaurant[field] === value) {
          cy.request({
            method: "DELETE",
            url: "http://localhost:5001/restaurants/" + restaurant.id,
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