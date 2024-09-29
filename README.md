Too much products available, challenging navigations, lots of undetailed description to read, not being able to ask about the product and quickly get an answer with recommendation just like we would when shopping irl, may cause fatigue, frustration, churn of customers and ultimately lead to profit loss for ecommerce stores. Biggest ecommerce stores like Amazon are already trying to address this problem with their internally developed tools like Amazon Rufus. Our goal is to democratize the access to such tools to allow for great, seamless experience when shopping online.





Planned System Architecture:

```mermaid
graph TD
    A[User] -->|Provides URL| B[Web Scraper]
    B -->|Extracts Data| C[Product Catalog Database]
    C -->|Feeds Data| D[RAG System]
    D -->|Enhances| E[AI Chatbot]
    A -->|Interacts with| E
    E -->|Queries| D
    E -->|Provides Assistance| A
    F[External Knowledge Base] -->|Supplements| D