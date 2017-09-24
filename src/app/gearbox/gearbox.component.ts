import { Component, OnChanges, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModuleService } from '../services/module.service';
@Component({
  selector: 'app-gearbox',
  templateUrl: './gearbox.component.html',
  styleUrls: ['./gearbox.component.css']
})
export class GearboxComponent implements OnInit{

  constructor(private modalService: NgbModal, private router: Router, private moduleService: ModuleService) { }

  @Input() gearbox;

  @Input() parts;

  @Input() ordered;

  @Output() partsUpdated = new EventEmitter();

  tableHeader = ['Producer', 'On Stock', 'Ordered'];

  public mr: NgbModalRef;


  filtered;

  modules = [];

  newPromise;

  ngOnInit() {

    this.filterModule('igw');
    this.filterModule('gmc');
    this.filterModule('zoko');
    this.filterModule('hrk');


  }



      newProduct = {};

      currentProduct;

      grabProduct(product)
      {
          this.currentProduct = product;
          this.currentProduct.gearbox = this.gearbox;
      }

      add(quantity)
      {
        let qgbxArr = this.getListOfUpdatable();
        let gbx = {producer: this.currentProduct.producer, gearbox: this.currentProduct.gearbox, quantity: quantity.value};

        this.newPromise = this.moduleService.updatePartsByGearbox(gbx, qgbxArr).then( resolve =>{

           this.currentProduct.stock += parseInt(quantity.value);
           this.partsUpdated.emit(gbx);

          this.closeModal();



          return resolve;

         });


      }

      remove(quantity)
      {
        let qgbxArr = this.getListOfUpdatable();
        quantity.value = -quantity.value;
        let gbx = { producer: this.currentProduct.producer, gearbox: this.currentProduct.gearbox, quantity: quantity.value};

      this.newPromise =  this.moduleService.updatePartsByGearbox(gbx, qgbxArr).then( resolve => {

          this.currentProduct.stock += parseInt(quantity.value);
         this.partsUpdated.emit(gbx);

          this.closeModal();



          return resolve;
        });
      }

      addGear(ordered)
      {
      /*  if(!ordered.value)
        {
          ordered.value = 0;
        }
        let index = this.gpd25.findIndex( item => item.producer == this.producerChosen );
        this.gpd25[index].ordered += parseInt(ordered.value);*/
        console.log("todo work");
      }

      setProduct(product)
      {
      //  this.producerChosen = product.producer;
      }


      open(content) {
        this.modalService.open(content);
      }


      moduleDetail(gearbox, module)
      {
        let loweredURL = module.producer.toLowerCase();
        this.router.navigate(['/module-detail', gearbox, loweredURL]);
      }

      filterModule(type)
      {
      let parts = this.parts.filter( part => part.type == type);

      let qqgbxArr = [];
      parts.forEach( part => {

        let qqgbx = this.getQQGBX(part);

            qqgbxArr.push(qqgbx);


          });

         this.setModule(type, this.maxProducible(qqgbxArr));

      }

      getQQGBX(part)
      {
        let result = part.q / part.q_gbx;
        result = Math.floor(result);

        return result;
      }

      maxProducible(array)
      {
         return Math.min.apply(Math,array);
      }

      setModule(type, stock)
      {
        let ordered = this.filterOrdered(type);
        this.modules.push({ producer: type, stock: stock, quantity: ordered});
      }

      filterOrdered(type)
      {
        type = type.toLowerCase();

        let filtered = this.ordered.filter( ordered => ordered.producer == type);

        let ordered = 0;

        filtered.forEach( module => { ordered += parseInt(module.quantity) });
          return ordered;
      }

      getListOfUpdatable()
      {
          let parts = this.parts.filter( part => part.type == this.currentProduct.producer);

        let qgbxArr = [];
        parts.forEach( part => {

          let qgbx = part.q_gbx;

              qgbxArr.push({id: part.id, qgbx: qgbx});


            });

            return qgbxArr;
      }


      public openModal(content: string) {
        this.mr = this.modalService.open(content);
      }

      public closeModal() {
   this.mr.close();
}




}
