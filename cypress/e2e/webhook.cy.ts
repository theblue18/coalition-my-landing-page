describe("Contentful Webhook Test", () => {
    it("should trigger webhook and update blog page", () => {
     
      cy.visit("/blog");
      
     
      cy.get("[data-cy=blog-post]").should("exist");
  
    
      cy.task<{ revalidated: boolean }>("sendWebhook", {
        fields: {
          slug: { "en-US": "test-blog-post" },
        },
      }).then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(response.revalidated).to.be.true; 
      });
  
      cy.reload();
      cy.get("[data-cy=blog-post]").should("contain", "Guide to Cyber Insurance");
    });
  });
  