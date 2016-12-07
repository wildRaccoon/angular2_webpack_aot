import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
if (process.env.ENV === 'production') {
  enableProdMode();
}

declare var __WEBPACK_VERSION__:any;
console.log(__WEBPACK_VERSION__);

platformBrowserDynamic().bootstrapModule(AppModule);
