This is a Twitter-like knowledgebase/blog application with React and MongoDB.

## Getting Started

First, you must edit the .env file,

and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


The structure of the articles collection in MongoDB should be as follows:
```json
{
  "title": "Article 1",
  "content": "<p>This is the content of the article.</p>",
  "slug": "article-1",
  "category": "Account Management"
}
```
