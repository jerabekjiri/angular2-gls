import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from '../services/module.service';
@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private moduleService: ModuleService) { }

  private sub: any;

  parts;

  specPart;

  filteredParts;

  module;

  gearbox;

  editable:boolean = false;

  tableHeader = ['Pos','note', 'ID No.', 'Q/GBX', 'Q', 'Q/Q/GBX'];

  dataChanged = false;

  storePart;

  ngOnInit() {

  this.moduleService.getParts().then( parts => { this.parts = parts;

      this.sub = this.route.params.subscribe(params => {

        this.module = params['module'];

        this.gearbox = params['gearbox'];


        this.filteredParts = this.filterParts();
        this.availableParts();

    });








  });


  }


  filterParts()
  {
    let firstMatch;
    if(this.gearbox == 'gpd25')
    {
       firstMatch = this.parts.filter( gearbox => gearbox.gpd25 == 1);
    }

    if(this.gearbox == 'gpd35')
    {
      firstMatch = this.parts.filter( gearbox => gearbox.gpd35 == 1);

    }

    if(this.gearbox == 'gpd50')
    {
      firstMatch = this.parts.filter( gearbox => gearbox.gpd50 == 1);

    }

    if(this.gearbox == 'gpd70')
    {
      firstMatch = this.parts.filter( gearbox => gearbox.gpd70 == 1);

    }

    if(this.gearbox == 'gpd100')
    {
      firstMatch = this.parts.filter( gearbox => gearbox.gpd100 == 1);

    }

    if(this.gearbox == 'gpd140')
    {
      firstMatch = this.parts.filter( gearbox => gearbox.gpd140 == 1);

    }

    return firstMatch.filter(parts => parts.type == this.module );

  }


  availableParts()
  {
    this.filteredParts.forEach( part => {

    let result = part.q / part.q_gbx;
    result = Math.floor(result);

    part.q_q_gbx = result;

    });
  }

  edit(part)
  {
    this.editable = true;
    this.specPart = part;

    let storePart = part;
    console.log(storePart);
  }

  updatePart(part)
  {
    /*
    * Check for change of part
    */
    console.log(this.dataChanged);
    if(!this.dataChanged)
    {
      this.cancel();
      console.log("data not changed");
    }
    else{

      console.log("data changed");
      this.moduleService.updateModuleDetail(part);
      this.cancel();

    }








  }

  cancel()
  {
    this.editable = false;
    this.specPart = "";
  }

  evokeChange(qqgbx?)
  {
    let part = this.specPart;
    if(qqgbx)
    {
    let  result = part.q_q_gbx * part.q_gbx;
    part.q = result;
    }
    else{
      let result = part.q / part.q_gbx;

        result = Math.floor(result);

        part.q_q_gbx = result;
    }


    this.dataChanged = true;


  }





}
