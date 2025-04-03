import { TestBed } from '@angular/core/testing';

import { authInterceptor } from './auth.interceptor';
import {provideHttpClient, withInterceptors} from "@angular/common/http";

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideHttpClient(
        withInterceptors([authInterceptor])
      )
    ]
  }));
});
