import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes, Router } from "@angular/router";

import { StateComponent } from "./state.component";
import { StatesComponent } from "./states.component";
import { ExportStatesComponent } from "./exportstates.component";

import { RouteMatchService } from 'angular-fragment-matcher';


export function getRouteMatchService(router: Router): RouteMatchService {
  return new RouteMatchService(router);
}

const routes: Routes = [
  {
    path: "states",    
    children : [{
        path: ':name',
        component: StateComponent,
    },{
      path: "",

      children : [{
        component: StateComponent,
        matcher: RouteMatchService.urlFragmentMatcher,
        data : {
          matcherconfig : {
            fragment: 'new'
          }
        }
      }, {
        component: ExportStatesComponent,
        matcher: RouteMatchService.urlFragmentMatcher,
        data : {
          matcherconfig : {
            fragment: 'export'
          }
        }
      }, {
        path: "",
        component: StatesComponent
      }]
    
  }]
  }
  // {
  //   path: "newstate",
  //   component: StateComponent
  // }
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forChild(routes) ],
  declarations: [ StateComponent, StatesComponent, ExportStatesComponent ],
  providers: [ {
    provide: RouteMatchService,
    useFactory : getRouteMatchService, 
    deps : [ Router ]
    } ],
  exports: [ RouterModule ]
})
export class StatesModule {
  constructor(private routeMatchService: RouteMatchService) {}
}
  