import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { EthereumService, WalletInfo } from '../../services/ethereum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    ChipModule,
    DividerModule,
  ],
  templateUrl: './wallet.html',
  styleUrls: ['./wallet.scss'],
})
export class Wallet implements OnInit, OnDestroy {
  isConnected = false;
  walletInfo: WalletInfo | null = null;
  message = '';
  messageType: 'success' | 'error' = 'success';
  private subscription = new Subscription();

  constructor(private ethereumService: EthereumService) {}

  ngOnInit() {
    this.subscription.add(
      this.ethereumService.walletInfo$.subscribe((info) => {
        this.walletInfo = info;
        this.isConnected = info !== null;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async connectWallet() {
    try {
      const success = await this.ethereumService.connectWallet();
      if (success) {
        this.showMessage('Wallet connected successfully!', 'success');
      } else {
        this.showMessage(
          'Failed to connect wallet. Please make sure MetaMask is installed and unlocked.',
          'error'
        );
      }
    } catch (error) {
      this.showMessage(
        'Failed to connect wallet: ' + (error as Error).message,
        'error'
      );
    }
  }

  async disconnectWallet() {
    try {
      await this.ethereumService.disconnectWallet();
      this.showMessage('Wallet disconnected successfully!', 'success');
    } catch (error) {
      this.showMessage(
        'Failed to disconnect wallet: ' + (error as Error).message,
        'error'
      );
    }
  }

  formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  private showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
    }, 5000);
  }
}
