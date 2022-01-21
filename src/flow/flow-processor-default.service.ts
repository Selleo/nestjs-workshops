import { Injectable, Logger } from '@nestjs/common';

let createdTimes = 0;

@Injectable()
export class FlowProcessorDefaultService {
  constructor() {
    createdTimes += 1;
    console.log(
      `CREATING ${FlowProcessorDefaultService.name} - ${createdTimes}`,
    );
  }

  private logger = new Logger(FlowProcessorDefaultService.name);
}
