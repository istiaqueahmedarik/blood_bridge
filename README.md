# Blood Bridge

Blood Bridge is a platform that connects blood donors with those in need, facilitating the blood donation process and helping save lives.

## Promotional Video

[![Blood Bridge Promo Video](https://img.youtube.com/vi/HksJlOszX-c/0.jpg)](https://www.youtube.com/watch?v=HksJlOszX-c)

Click the image above to watch our promotional video!

## Project Structure

This project consists of two main components:

- **Client**: A Next.js web application that provides the user interface
- **Server**: A backend API that handles business logic and data storage

## Installation

### Prerequisites

- Node.js (v14 or newer)
- Bun.JS
- npm or yarn package manager
- Git

### Clone the Repository

```bash
git clone [your-repository-url]
cd blood_bridge
```

### Server Setup

```bash
cd server
bun install --force
```

### Client Setup

```bash
cd client
npm install --force
```

## Running the Application

### Start the Server

```bash
cd server
npm run dev
```

The server will start running on http://localhost:[port]

### Start the Client

```bash
cd client
bun run dev
```

The client will be available at http://localhost:3000

## Deployment

### Deploy the Server

```bash
cd server
npm run deploy
```

### Deploy the Client

The easiest way to deploy the client is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Follow our [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Technologies Used

- **Frontend**: Next.js, React
- **Backend**: Hono.js
- **Deployment**: Vercel, Cloudflare

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
