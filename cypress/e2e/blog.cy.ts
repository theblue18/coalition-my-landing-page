describe("Blog Page", () => {
    beforeEach(() => {
      cy.visit("/blog"); 
    });
  
    it("should load the blog page", () => {
      cy.get("h2").should("contain", "Blog Posts"); 
    });
  
    it("should display a list of blog posts", () => {
      cy.get("[data-cy=blog-post]").should("have.length.greaterThan", 0); 
    });
  
    it("should navigate to a blog post page", () => {
      cy.get("[data-cy=blog-post]").first().click(); 
      cy.url().should("include", "/blog/"); 
      cy.get("[data-cy=post-title]").should("be.visible"); 
    });
  });
  