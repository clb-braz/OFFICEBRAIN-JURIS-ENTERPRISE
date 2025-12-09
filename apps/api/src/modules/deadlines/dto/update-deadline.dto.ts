import { PartialType } from '@nestjs/mapped-types';
import { CreateDeadlineDto } from './create-deadline.dto';

export class UpdateDeadlineDto extends PartialType(CreateDeadlineDto) {}

