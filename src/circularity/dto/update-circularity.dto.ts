import { PartialType } from '@nestjs/swagger';
import { CreateCircularityDto } from './create-circularity.dto';

export class UpdateCircularityDto extends PartialType(CreateCircularityDto) {}
