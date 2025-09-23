# Pokedex - Binpar Technical Test

## Deployment

The application is deployed in Vercel and you can access it with the following link: https://binpar-samy-pokedex.vercel.app/

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Static typing for enhanced security
- **TailwindCSS** - Utility-first CSS framework
- **PokéAPI** - REST API for Pokémon data

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   └── pokemon/[id]/
│       ├── page.tsx
│       ├── loading.tsx
│       └── error.tsx
├── components/
│   ├── PokemonCard.tsx
│   ├── PokemonDetail.tsx
│   ├── PokemonList.tsx
│   └── SearchAndFilters.tsx
├── context/
│   └── PokemonListContext.tsx
├── services/
│   └── pokeapi.ts
└── types/
    └── pokemon.ts
```

## Installation

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/binpar-pokedex.git
cd binpar-pokedex
```

2. **Install dependencies**

```bash
npm install
```

3. **Run in development mode**

```bash
npm run dev
```

4. **Open in browser**

```
http://localhost:3000
```
