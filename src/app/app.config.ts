import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideCharts(withDefaultRegisterables()), provideFirebaseApp(() => initializeApp({ projectId: "lrn-jpanese", appId: "1:265153457348:web:b3069c603c01db19f96d91", storageBucket: "lrn-jpanese.firebasestorage.app", apiKey: "AIzaSyChR6f5QAOgMu5aW1yavrtUoyldlSVkNLU", authDomain: "lrn-jpanese.firebaseapp.com", messagingSenderId: "265153457348", measurementId: "G-T77HBET2Q5" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
