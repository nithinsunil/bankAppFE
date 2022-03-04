import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {
  @Input() item: string|undefined // input decorator

  @Output() onCancel = new EventEmitter() // creating an event called onCancel

  @Output() onDelete = new EventEmitter() // 

  constructor() { }

  ngOnInit(): void {
  }

  delete(){
    this.onDelete.emit(this.item)
  }

  cancel(){
    this.onCancel.emit()
  }

}
