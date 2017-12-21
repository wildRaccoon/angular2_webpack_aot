import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';



if (process.env.ENV === 'production') {
  enableProdMode();
}

/////  EXTERNAL
import { BaseExternalModuleResolver } from './app/external/external.resolver';
import { PartnerModule } from './partner/parnter.module';
import { PartnerComponent } from 'src/partner/partner.component';

class ImplementExternamModuleResolver implements BaseExternalModuleResolver
{
  GetModule() {
   console.log("Rresolve Partner Class");

   return PartnerModule;
  }
}
/////  EXTERNAL


platformBrowserDynamic(
      [
        {
          provide:PartnerModule,
          useClass: PartnerModule,
          deps:[]
        },
        {
          provide: BaseExternalModuleResolver,
          
          useClass: ImplementExternamModuleResolver, 
          deps:[]
        }
      ]
  )
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));
