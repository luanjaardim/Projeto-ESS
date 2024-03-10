import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { transformIntoId } from "../../../../src/app/Shopping_cart/pages/HomePage/index";
import 'cypress-if';

beforeEach(() => {
    //cy.on on assertionError
    cy.on('uncaught:exception', (err, runnable) => {
        return false;
    });
    cy.visit('/client/home');
    cy.wait(500);
    cy.get('#shopping_cart_button').should('exist');
    cy.get('#shopping_cart_button').click();
    cy.get('#shopping_cart').should('exist');
    cy.wait(500);
    cy.get('#clear_cart')
        .if()
        .then(($element) => {
            $element.click();
            cy.get('#yes_button').click();
        });
});

Given("eu estou logado como {string} na tela {string}",
    function (email: string, screen: string) {
    cy.visit('/client/home');
    cy.wait(500);
    cy.get('#shopping_cart_button').click();
    cy.get('#shopping_cart').should('exist');
    cy.get(transformIntoId(screen, true)).should('have.text', screen);
    //waits for the page to load
    cy.wait(1000);
});

Given("o carrinho já contém {string} unidades de {string} por {string} $ cada do {string}",
    function (quantity: string, product: string, price: string, restaurant: string) {
    cy.get('#shopping_cart').should('exist');
    const id = transformIntoId(`${restaurant} ${product} ${price}`, true);
    cy.get(id + '_button').click();
    cy.wait(500);
    cy.get('#yes_button').click();
    cy.wait(500);
    let cartId: string;
    for (let i = 1; i < parseInt(quantity); i++) {
        const newPrice = (parseFloat(price) * i);
        cartId = transformIntoId(`${restaurant} ${product} ${newPrice} ${i} plus`, true);
        cy.get(cartId).click();
    }
});

When("eu vejo {string} do {string} por {string} $ como opção",
    function (product: string, restaurant: string, price: string) {
    cy.get(
        transformIntoId(
            `${restaurant} ${product} ${price}`, true
        )
    ).should('exist');
});

When("eu adiciono {string} do {string} por {string} $ ao carrinho",
    function (product: string, restaurant: string, price: string) {
    const id = transformIntoId(`${restaurant} ${product} ${price}`, true);
    cy.get(
        id
    ).should('exist');
    cy.get(
        id + '_button'
    ).click();
    cy.wait(200);
    cy.get('#yes_button').click();
});

When("eu clico na opção {string} para o produto {string} do {string}",
    function (option: string, product: string, restaurant: string) {
    const id = transformIntoId(`${restaurant} ${product}`, true);
    cy.get(id)
        .children()
        .first()
        .invoke('attr', 'id')
        .then((id) => {
            var childId: string = '';
            for(let i = id.length; i >= 0; i--) {
                if(id[i] === '_') {
                    childId = '#' + id.substring(0, i);
                    break;
                }
            }
            if (option === 'Remove from Cart') {
                cy.get(childId + '_remove').click();
            }
            else if(option === 'Mais um') {
                cy.get(childId + '_plus').click();
            } else {
                cy.get(childId + '_minus').click();
            }
        });
});

When("eu seleciono {string}",
    function (option: string) {
    if (option === 'Yes') {
        cy.get('#yes_button').click();
    } else if(option === 'No') {
        cy.get('#no_button').click();
    } else if(option === 'Finish the Order') {
        cy.get('#finish_order').click();
    } else {
        cy.get('#clear_cart').click();
    }
});

Then("o carrinho contém {string} unidades de {string} por {string} $ cada do {string}",
    function (quantity: string, product: string, price: string, restaurant: string) {
    cy.get('#shopping_cart').should('exist');
    const itemId = transformIntoId(`${restaurant} ${product} ${price} ${quantity} remove`, true);
    cy.get(itemId).should('exist');
});

Then("o carrinho está vazio",
    function () {
    cy.contains('Your cart is empty').should('exist');
});


    // cy.contains('*', 'cart')
    //     .invoke('text')
    //     .then(text => {
    //         // Use the text content as needed
    //         cy.log('Text content:', text);
    //     });
