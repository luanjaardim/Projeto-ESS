import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("estou na página {string}", (page: string) => {
  cy.visit(page);
});

Given(
  "não existe nenhum restaurante com o CNPJ {string} nem com o email {string} cadastrado no sistema",
  (cnpj: string, email: string) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/restaurants",
    }).then((response) => {
      response.body.forEach((restaurant: any) => {
        if (restaurant.cnpj === cnpj || restaurant.email === email) {
          cy.request({
            method: "DELETE",
            url: "http://localhost:5001/restaurants/" + restaurant.id,
          });
        }
      });
    });
  }
);

Given(
  "não existe nenhum restaurante com o {string} {string}",
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

Given(
  "existe um restaurante cadastrado no sistema com os dados nome {string}, CNPJ {string}, email {string} e senha {string}",
  (name: string, CNPJ: string, email: string, password: string) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/restaurants",
    }).then((response) => {
      response.body.forEach((restaurant: any) => {
        if (restaurant.cnpj === CNPJ || restaurant.email === email) {
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
          name,
          CNPJ,
          email,
          password,
        },
      });
    });
  }
);

When(
  "o campo de {string} é preenchido com {string}",
  (field: string, value: string) => {
    cy.get("#" + field).type(value);
  }
);

When("seleciono a opção {string}", (button: string) => {
  cy.get("#" + button).click();
});

Then("consigo ver uma mensagem dizendo {string}", (message: string) => {
  cy.contains(message).should("be.visible");
});

Then("continuo na página {string}", (url: string) => {
  cy.url().should("contain", url);
});

//Mock
Given(
  "estou logado como administrador do restaurante {string} com senha {string} na tela {string}",
  (email: string, password: string, url: string) => {
    cy.visit("/restaurants/login");
    cy.get('input[type="email"]').type(email);
    //type the password and press enter
    cy.get('input[type="password"]').type(password + "{enter}");

    cy.wait(500);

    cy.url().should("contain", url);
  }
);
