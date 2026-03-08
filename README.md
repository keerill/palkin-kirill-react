[![Live Demo](https://img.shields.io/badge/Live_Demo-black?style=for-the-badge&logo=vercel)](https://palkin-kirill-react.vercel.app)


## Stack

- Next.js 16 (App Router)
- TypeScript
- Zustand for state
- Axios
- SCSS modules
- Prettier + ESLint + Stylelint

## Quick Start

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Login

Use these test credentials:

- Username: `emilys`
- Password: `emilyspass`

## Docker

Build:

```bash
docker build -t shop-app .
```

Run:

```bash
docker run -p 3000:3000 shop-app
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production build
- `npm run lint` - check code with eslint, tsc, and stylelint
- `npm run format` - format code with prettier

## Project Structure

```
src/
├── app/              # pages and layouts
├── components/       # React components
├── services/         # API layer
├── store/           # Zustand stores
├── types/           # TypeScript definitions
└── utils/           # helper functions
```

## Features

- JWT auth with token refresh
- Product listing and search
- Infinite scroll
- Responsive design
- Loading states and error handling
