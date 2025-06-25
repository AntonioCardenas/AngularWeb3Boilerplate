# Angular Web3 DApp

A modern decentralized application (DApp) built with Angular and ethers.js for Ethereum blockchain integration.

## Features

- **Wallet Connection**: Connect to MetaMask and other Web3 wallets
- **Transaction Sending**: Send ETH transactions with real-time gas price
- **Smart Contract Interaction**: Interact with ERC-20 tokens and other smart contracts
- **Real-time Updates**: Live wallet balance and network information
- **Modern UI**: Beautiful, responsive design with smooth animations
- **TypeScript Support**: Full type safety with ethers.js v6

## Technologies Used

- **Angular 17**: Latest Angular framework with standalone components
- **ethers.js v6**: Complete Ethereum wallet implementation and utilities
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with CSS Grid and Flexbox
- **RxJS**: Reactive programming for state management
- **PrimeNG**: Professional UI components

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd angularweb3
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:4200`

## Prerequisites

- **Node.js** (v18 or higher)
- **MetaMask** browser extension installed
- **Ethereum testnet** (Goerli, Sepolia) or mainnet access

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── wallet/
│   │   │   └── wallet.component.ts          # Wallet connection & info
│   │   ├── transaction/
│   │   │   └── transaction.component.ts     # ETH transaction sending
│   │   └── contract/
│   │       └── contract.component.ts        # Smart contract interaction
│   ├── services/
│   │   └── ethereum.service.ts              # Core Ethereum functionality
│   └── app.ts                              # Main application component
├── styles.scss                             # Global styles
└── main.ts                                 # Application entry point
```

## Core Components

### 1. Ethereum Service (`ethereum.service.ts`)

The core service that handles all Ethereum blockchain interactions:

- **Wallet Connection**: Connect to MetaMask and other Web3 providers
- **Transaction Management**: Send ETH transactions with proper error handling
- **Smart Contract Interaction**: Create contract instances and call methods
- **Network Detection**: Automatically detect and display current network
- **Balance Tracking**: Real-time wallet balance updates

### 2. Wallet Component (`wallet.component.ts`)

Displays wallet information and provides connection functionality:

- **Connect/Disconnect**: Easy wallet connection with MetaMask
- **Wallet Info**: Display address, balance, network, and chain ID
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all device sizes

### 3. Transaction Component (`transaction.component.ts`)

Allows users to send ETH transactions:

- **Address Validation**: Ensures valid Ethereum addresses
- **Amount Validation**: Prevents invalid transaction amounts
- **Gas Price Display**: Shows current network gas prices
- **Transaction Tracking**: Displays transaction hashes and Etherscan links

### 4. Contract Component (`contract.component.ts`)

Interact with ERC-20 tokens and smart contracts:

- **Contract Loading**: Load and display contract information
- **Token Transfers**: Transfer ERC-20 tokens
- **Balance Display**: Show token balances and contract details
- **Transaction History**: Track contract interactions

## Usage Examples

### Connecting to Wallet

```typescript
import { EthereumService } from './services/ethereum.service';

constructor(private ethereumService: EthereumService) {}

async connectWallet() {
  const success = await this.ethereumService.connectWallet();
  if (success) {
    console.log('Wallet connected successfully!');
  }
}
```

### Sending ETH Transaction

```typescript
async sendTransaction() {
  try {
    const hash = await this.ethereumService.sendTransaction(
      '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      '0.01'
    );
    console.log('Transaction hash:', hash);
  } catch (error) {
    console.error('Transaction failed:', error);
  }
}
```

### Interacting with Smart Contracts

```typescript
async interactWithContract() {
  const contract = await this.ethereumService.getContract(
    '0x1234567890123456789012345678901234567890',
    ERC20_ABI
  );

  const balance = await contract['balanceOf'](walletAddress);
  console.log('Token balance:', ethers.formatUnits(balance, 18));
}
```

## Supported Networks

- **Ethereum Mainnet** (Chain ID: 1)
- **Goerli Testnet** (Chain ID: 5)
- **Sepolia Testnet** (Chain ID: 11155111)
- **Polygon Mainnet** (Chain ID: 137)
- **Mumbai Testnet** (Chain ID: 80001)
- **Localhost** (Chain ID: 1337)

## Security Features

- **Address Validation**: All Ethereum addresses are validated before use
- **Amount Validation**: Transaction amounts are validated to prevent errors
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Type Safety**: Full TypeScript support prevents runtime errors

## UI/UX Features

- **Modern Design**: Clean, professional interface with gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Loading States**: Visual feedback during async operations
- **Error States**: Clear error messages and recovery options

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist/angularweb3/browser` folder to Netlify

### Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will automatically detect Angular and deploy

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **ethers.js team** for the excellent Ethereum library
- **Angular team** for the amazing framework
- **MetaMask team** for the Web3 wallet integration
- **PrimeNG team** for the professional UI components

## Support

If you have any questions or need help, please:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Happy Web3 Development!**
