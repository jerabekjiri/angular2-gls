import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../services/order.service';
import { ModuleService } from '../services/module.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence
} from '@angular/animations';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [
     trigger('anim', [
        transition('* => void', [
          style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}),
          sequence([
            animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'  })),
            animate(".1s ease", style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none'  }))
          ])
        ]),
        transition('void => active', [
          style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
          sequence([
            animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none'  })),
            animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'  }))
          ])
        ])
    ])
  ]
})
export class OrderComponent implements OnInit {

  constructor(private modalService: NgbModal, private orderService: OrderService, private moduleService: ModuleService) { }

  orders;
  parts;

    mr;
  ngOnInit() {
    this.orderService.getOrders().then( orders => { this.orders = orders.filter( order => order.active == 1)});
    this.moduleService.getParts().then( parts => { this.parts = parts;});
  }


  headerTemplate = ['Gearbox','Producer', 'Ordered',"Note", 'Date'];

  producers = ['igw', 'gmc', 'zoko', 'hrk'];

  currentProducer = "";

  gearboxes = ['gpd25', 'gpd35', 'gpd50', 'gpd70', 'gpd100', 'gpd140'];

  currentGearbox = "";

  quantity = "";

  textarea = "";

  date;

  anim = "";

  currentNote = "";

  newPromise;

  partsToFilter;
  filteredParts;



  addOrder()
  {
    let date = `${this.date.day}.${this.date.month}.${this.date.year}`;
    let order = {order_id: null, gearbox: this.currentGearbox, producer: this.currentProducer, quantity: this.quantity, date: date, active: "1", note: this.textarea};
  this.newPromise =  this.orderService.add(order).then( response => {
      order.order_id = response['_body'];
      this.orders.push(order);
      this.anim = "active";

     this.closeModal();
      return response;

    });
  }

  setNote(order)
  {
    console.log(order);
    this.currentNote = order.note;
  }

  done(order)
  {
    let qgbxArr = this.getListOfUpdatable(order.producer);
   this.newPromise = this.moduleService.updatePartsByGearbox(order, qgbxArr).then( resolve =>{

     this.orders = this.orders.filter( orders => orders.order_id != order.order_id );
     console.log(this.orders);

          return resolve;
      });

      this.orderService.update(order);



  }

  setFilteredParts(order){
    let partsToFilter = this.parts.filter( part => part.type == order.producer && part[order.gearbox] == 1);

    this.partsToFilter = partsToFilter;

  }

  donePart(order)
  {
    let filteredParts = this.partsToFilter.filter( part => part.checked == true);
    console.log(filteredParts);
  }

  setGearbox(gearbox)
  {
    this.currentGearbox = gearbox;
  }

  setProducer(producer)
  {
    this.currentProducer = producer;
  }

  open(content) {
    this.modalService.open(content);
  }

  getListOfUpdatable(currentProducer)
  {
    let parts = this.parts.filter( part => part.type == currentProducer);
    let qgbxArr = [];
    parts.forEach( part => {

      let qgbx = part.q_gbx;

          qgbxArr.push({id: part.id, qgbx: qgbx});


        });

return qgbxArr;
  }

  model: NgbDateStruct;

 isWeekend(date: NgbDateStruct) {
   const d = new Date(date.year, date.month - 1, date.day);
   return d.getDay() === 0 || d.getDay() === 6;
 }

 isDisabled(date: NgbDateStruct, current: {month: number}) {
   return date.month !== current.month;
 }

 public openModal(content: string) {
   this.mr = this.modalService.open(content);
 }

 public closeModal() {
this.mr.close();
}

setCheckboxItem(item)
{
this.partsToFilter.forEach( part =>{
  if(part.id == item.id)
  {
      part.checked = true;
  }

});

console.log(this.partsToFilter);
}


}
