import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChipModule } from 'primeng/chip';
import { EthereumService } from '../../services/ethereum';
import { Subscription } from 'rxjs';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    MessageModule,
    ProgressSpinnerModule,
    ChipModule,
    DividerModule,
  ],
  templateUrl: './transaction.html',
  styleUrls: ['./transaction.scss'],
})
export class Transaction implements OnInit, OnDestroy {
  toAddress = '';
  amount: number | null = null;
  isSending = false;
  lastTransaction = '';
  message = '';
  messageType: 'success' | 'error' = 'success';
  addressError = '';
  amountError = '';

  private subscription: Subscription = new Subscription();

  constructor(private ethereumService: EthereumService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.ethereumService.walletInfo$.subscribe((info) => {
        if (info !== null) {
          this.loadGasPrice();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async loadGasPrice(): Promise<void> {
    try {
      // Implement gas price loading logic
    } catch (error) {
      console.error('Failed to load gas price:', error);
    }
  }

  canSendTransaction(): boolean {
    return (
      this.toAddress.trim() !== '' &&
      this.amount !== null &&
      this.amount > 0 &&
      !this.addressError &&
      !this.amountError
    );
  }

  validateAddress(): void {
    this.addressError = '';
    const address = this.toAddress.trim();

    if (!address) {
      this.addressError = 'Address is required';
      return;
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      this.addressError = 'Invalid Ethereum address format';
      return;
    }
  }

  validateAmount(): void {
    this.amountError = '';

    if (this.amount === null || this.amount <= 0) {
      this.amountError = 'Amount must be greater than 0';
      return;
    }

    if (this.amount > 1000) {
      this.amountError = 'Amount cannot exceed 1000 ETH';
      return;
    }
  }

  async sendTransaction(): Promise<void> {
    if (!this.canSendTransaction()) {
      return;
    }

    this.validateAddress();
    this.validateAmount();

    if (this.addressError || this.amountError) {
      return;
    }

    this.isSending = true;
    this.message = '';

    try {
      const hash = await this.ethereumService.sendTransaction(
        this.toAddress.trim(),
        this.amount!.toString()
      );

      this.lastTransaction = hash;
      this.showMessage('Transaction sent successfully!', 'success');

      // Reset form
      this.toAddress = '';
      this.amount = null;
    } catch (error) {
      this.showMessage(
        'Transaction failed: ' + (error as Error).message,
        'error'
      );
    } finally {
      this.isSending = false;
    }
  }

  formatHash(hash: string): string {
    if (!hash) return '';
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  }

  openExplorer(hash: string) {
    const network = this.getCurrentNetwork();
    const explorerUrl = this.getExplorerUrl(network, hash);
    window.open(explorerUrl, '_blank');
  }

  private getCurrentNetwork(): string {
    // This would need to be implemented based on the current network
    // For now, default to Ethereum mainnet
    return 'mainnet';
  }

  private getExplorerUrl(network: string, hash: string): string {
    switch (network) {
      case 'mainnet':
        return `https://etherscan.io/tx/${hash}`;
      case 'goerli':
        return `https://goerli.etherscan.io/tx/${hash}`;
      case 'sepolia':
        return `https://sepolia.etherscan.io/tx/${hash}`;
      default:
        return `https://etherscan.io/tx/${hash}`;
    }
  }

  private showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
