import { Test, TestingModule } from '@nestjs/testing';
import { CircularityService } from './circularity.service';

describe('CircularityService', () => {
  let service: CircularityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CircularityService],
    }).compile();

    service = module.get<CircularityService>(CircularityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
