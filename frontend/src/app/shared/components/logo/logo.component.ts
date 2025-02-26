import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() size: number = 75;
  @Input() showText: boolean = true;
  @Input() fontSize: number = 32;

  source = `https://res.cloudinary.com/dodu3btfh/image/upload/c_pad,h_${this.size}/v1740526756/logo_jctera.png`;
}
