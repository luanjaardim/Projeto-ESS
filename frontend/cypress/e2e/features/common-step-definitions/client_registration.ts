import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given(
  "não existe nenhum cliente com o {string} {string}",
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

Given(
  "existe um cliente com senha {string} email {string} nome {string} cpf {string} endereço {string}",
  (password: string, email: string, name: string, cpf: string, address: string) => {
    cy.request({
      method: "GET",
      url: "http://localhost:5001/clients",
    }).then((response) => {
      response.body.forEach((client: any) => {
        if (client.cpf === cpf || client.email === email) {
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
          password,
          name,
          cpf,
          email,
          address,
          
          
                   
          
          
        },
      });
    });
  }
);

Given(
  "estou logado numa conta {string} na tela {string}",
  (client: string, page: string) => {
    cy.visit(page);
  }
);

