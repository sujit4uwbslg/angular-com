import { Component,OnInit } from '@angular/core';
import { CommServiceService } from '../comm-service.service';
@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrl: './child2.component.css'
})
export class Child2Component implements OnInit{

  message:string=""
  constructor(private shared:CommServiceService){}

  ngOnInit(): void {
      this.message=this.shared.getMessage()
  }
}
