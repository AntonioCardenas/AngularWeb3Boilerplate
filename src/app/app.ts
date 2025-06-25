import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Wallet } from './components/wallet/wallet';
import { Transaction } from './components/transaction/transaction';
import { Contract } from './components/contract/contract';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Wallet, Transaction, Contract],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  title = 'angularweb3';
}
