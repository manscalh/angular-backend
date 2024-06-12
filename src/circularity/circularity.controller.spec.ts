import { Test, TestingModule } from '@nestjs/testing';
import { CircularityController } from './circularity.controller';
import { CircularityService } from './circularity.service';

describe('CircularityController', () => {
  let controller: CircularityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CircularityController],
      providers: [CircularityService],
    }).compile();

    controller = module.get<CircularityController>(CircularityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
