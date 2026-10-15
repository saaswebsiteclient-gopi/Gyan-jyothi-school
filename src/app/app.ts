import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/header/header';
import { AppFooter } from './components/footer/footer';
import { AppWhatsappWidget } from './components/whatsapp-widget/whatsapp-widget';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AppHeader, AppFooter, AppWhatsappWidget],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
