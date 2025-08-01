import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: [];
  @IsDateString()
  @IsNotEmpty()
  readonly releasedDate: Date;
  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;
  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
