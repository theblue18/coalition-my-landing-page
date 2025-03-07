import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        sendWebhook(payload) {
          return fetch("http://localhost:3000/api/revalidate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-contentful-signature": "test-signature",
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json()) 
            .then((data) => {
              console.log("Webhook Response:", data);
              return { revalidated: data.revalidated || false }; 
            });
        },
      
      })
      
    },
    defaultCommandTimeout: 8000,
    viewportWidth: 1280, 
    viewportHeight: 720, 
    video: false, 
    retries: 1,
  },
  
});
