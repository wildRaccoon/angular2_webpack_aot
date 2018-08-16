import { enableProdMode } from '@angular/core';
import { IsProd } from "./config/env";

if (IsProd) {
  enableProdMode();
}

export { AppServerModule } from './modules/app/app.server.module';
