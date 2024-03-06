import { Component,OnInit } from '@angular/core';
import { CommServiceService } from '../comm-service.service';
@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.css'
})
export class Child1Component implements OnInit{
  message:string="This message is from child 1"
constructor(private shared:CommServiceService){}

ngOnInit(): void {
    this.shared.setMessage(this.message);
}

}
