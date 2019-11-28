import { Observable } from 'rxjs';

import { UrlTree } from '@angular/router';

export type ActivationResponse = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
