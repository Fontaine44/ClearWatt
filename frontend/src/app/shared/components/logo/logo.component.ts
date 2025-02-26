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
  @Input() imgClass: string = 'mb-3';

  source = `https://res.cloudinary.com/dodu3btfh/image/upload/c_pad,h_100/v1740526756/logo_jctera.png`;
}
