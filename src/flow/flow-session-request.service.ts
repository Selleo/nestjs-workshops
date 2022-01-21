import * as uuid from 'uuid';
import { Injectable, Scope } from '@nestjs/common';
import { FlowPerformerTransientService } from './flow-performer-transient.service';

let createdTimes = 0;

@Injectable({ scope: Scope.REQUEST })
export class FlowSessionRequestService {
  constructor(
    private flowPerformerTransientService: FlowPerformerTransientService,
  ) {
    createdTimes += 1;
    console.log(`CREATING ${FlowSessionRequestService.name} - ${createdTimes}`);
  }

  private _token: string;

  get token() {
    if (!this._token) this._token = uuid.v4();

    return this._token;
  }
}
