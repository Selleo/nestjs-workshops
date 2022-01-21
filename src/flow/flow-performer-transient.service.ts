import { Injectable, Scope } from '@nestjs/common';
import * as uuid from 'uuid';

let createdTimes = 0;

@Injectable({ scope: Scope.TRANSIENT })
export class FlowPerformerTransientService {
  constructor() {
    createdTimes += 1;
    console.log(
      `CREATING ${FlowPerformerTransientService.name} - ${createdTimes}`,
    );
  }

  private _token: string;

  get token() {
    if (!this._token) this._token = uuid.v4();

    return this._token;
  }
}
