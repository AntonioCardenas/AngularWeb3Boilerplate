import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';

export interface WalletInfo {
  address: string;
  balance: string;
  chainId: number;
  networkName: string;
}

@Injectable({
  providedIn: 'root',
})
export class EthereumService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private walletInfoSubject = new BehaviorSubject<WalletInfo | null>(null);

  public walletInfo$ = this.walletInfoSubject.asObservable();

  constructor() {
    this.checkWalletConnection();
  }

  async connectWallet(): Promise<boolean> {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed');
      }

      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();

      await this.updateWalletInfo();
      return true;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  }

  async disconnectWallet(): Promise<void> {
    this.provider = null;
    this.signer = null;
    this.walletInfoSubject.next(null);
  }

  async checkWalletConnection(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        await this.updateWalletInfo();
      } catch (error) {
        console.log('No wallet connected');
      }
    }
  }

  private async updateWalletInfo(): Promise<void> {
    if (!this.signer || !this.provider) return;

    try {
      const address = await this.signer.getAddress();
      const balance = await this.provider.getBalance(address);
      const network = await this.provider.getNetwork();

      const walletInfo: WalletInfo = {
        address: address,
        balance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        networkName: this.getNetworkName(Number(network.chainId)),
      };

      this.walletInfoSubject.next(walletInfo);
    } catch (error) {
      console.error('Error updating wallet info:', error);
    }
  }

  private getNetworkName(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 5:
        return 'Goerli Testnet';
      case 11155111:
        return 'Sepolia Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 80001:
        return 'Mumbai Testnet';
      case 1337:
        return 'Localhost';
      default:
        return `Chain ID ${chainId}`;
    }
  }

  async sendTransaction(to: string, amount: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const tx = await this.signer.sendTransaction({
        to: to,
        value: ethers.parseEther(amount),
      });

      const receipt = await tx.wait();
      await this.updateWalletInfo();
      return receipt?.hash || '';
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  }

  async getContract(
    contractAddress: string,
    abi: any
  ): Promise<ethers.Contract> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    return new ethers.Contract(contractAddress, abi, this.signer);
  }

  async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }

    return await this.signer.signMessage(message);
  }

  async getGasPrice(): Promise<string> {
    if (!this.provider) {
      throw new Error('Provider not connected');
    }

    const gasPrice = await this.provider.getFeeData();
    return ethers.formatUnits(gasPrice.gasPrice || 0, 'gwei');
  }

  isConnected(): boolean {
    return this.signer !== null;
  }

  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  getSigner(): ethers.JsonRpcSigner | null {
    return this.signer;
  }

  getCurrentWalletInfo(): WalletInfo | null {
    return this.walletInfoSubject.value;
  }
}

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
