import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { createServerRenderer } from 'aspnet-prerendering';
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/dev_ssr/app');

const html = require("./dist/dev/index.html");

enableProdMode();

export default createServerRenderer(params => {
 
   console.log(params);

  const options = {
    document: html,
    url: params.url,
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP),
      { provide: APP_BASE_HREF, useValue: params.baseUrl },
      { provide: 'BASE_URL', useValue: params.origin + params.baseUrl }
    ]
  };

  const renderPromise = renderModuleFactory(AppServerModuleNgFactory, options);
    
  return renderPromise.then(html => ({ html }));
});