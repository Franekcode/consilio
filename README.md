Planned System Architecture:


graph TD
    A[User] -->|Provides URL| B[Web Scraper]
    B -->|Extracts Data| C[Product Catalog Database]
    C -->|Feeds Data| D[RAG System]
    D -->|Enhances| E[AI Chatbot]
    A -->|Interacts with| E
    E -->|Queries| D
    E -->|Provides Assistance| A
    F[External Knowledge Base] -->|Supplements| D
