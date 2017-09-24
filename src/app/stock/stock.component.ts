import { Component, OnInit } from '@angular/core';
import { ModuleService } from '../services/module.service';
import { OrderService } from '../services/order.service';




@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  constructor(private moduleService: ModuleService, private orderService: OrderService) { }

gearboxes = [];

array = [];
parts;
specParts;

ordered;

gearbox;

gearboxesName = ['gpd25', 'gpd35', 'gpd50', 'gpd70', 'gpd100', 'gpd140'];

unfilteredParts;
  ngOnInit() {

    Promise.all([
    this.moduleService.getParts(),
    this.orderService.getOrders()
  ]).then( promises => {
     this.parts = promises[0];
     this.unfilteredParts = promises[0];
     this.ordered = promises[1];

     this.ordered = this.ordered.filter( order => order.active == 1);

     this.getParts();


   });


}


  filterParts(type)
  {
    return this.parts.filter( part => part[type] == 1);

  }

  filterOrders(gearbox)
  {
   return this.ordered.filter( order => order.gearbox == gearbox );
  }


  getParts()
  {
      this.gearboxesName.forEach( gearbox => {


      this.gearboxes.push({gearbox: gearbox, parts: this.filterParts(gearbox), ordered: this.filterOrders(gearbox) });
    });

  }

  handlePartsUpdated(gbx){

    this.gearboxes = [];

      this.moduleService.getParts().then( parts =>{

        this.parts = parts;

        this.getParts();
      });


  /**  let saveParts;
    this.moduleService.getParts().then( parts =>{

      this.parts = parts;
      this.gearboxes.forEach( gearbox => {
        let filtered = this.parts.filter( parts => parts[gearbox.gearbox] == 1);
        console.log(filtered);
        gearbox.parts = filtered;


      });
      console.log(this.gearboxes);
    });*/


  }








}
