# 🎮 Pokédex - Binpar Technical Test

## Deployment

The application is deployed in Vercel and you can access it with the following link

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Static typing for enhanced security
- **TailwindCSS** - Utility-first CSS framework
- **PokéAPI** - REST API for Pokémon data

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Main layout
│   ├── page.tsx                 # Home page
│   ├── error.tsx                # Global error page
│   ├── not-found.tsx            # 404 page
│   └── pokemon/[id]/            # Dynamic Pokémon pages
│       ├── page.tsx             # Detail page
│       ├── loading.tsx          # Loading skeleton
│       └── error.tsx            # Pokémon-specific error
├── components/                   # React components
│   ├── PokemonCard.tsx          # Individual Pokémon card
│   ├── PokemonDetail.tsx        # Complete detail page
│   ├── PokemonList.tsx          # Main list with filters
│   └── SearchAndFilters.tsx     # Search component
├── context/                      # Context API
│   └── PokemonListContext.tsx   # Global filter state
├── services/                     # API services
│   └── pokeapi.ts               # PokéAPI client
└── types/                        # TypeScript definitions
    └── pokemon.ts               # Data interfaces
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
