import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsNumber()
  PORT: number;
  @IsString()
  DB_HOST: string;
  @IsString()
  DB_USERNAME: string;
  @IsString()
  DB_PASSWORD: string;
  @IsString()
  DB_NAME: string;
  @IsString()
  JWT_SECRET: string;
  @IsString()
  JWT_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  //plainInstance converts plain (literal) object to class (constructor) object. Also works with arrays.
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    /**
     * enableImplicitConversion will tell class-transformer that if it sees a
     primitive that is currently a string (like a boolean or a number) to assume it
     should be the primitive type instead and transform it, even though @Type(() =>
     Number) or @Type(() => Boolean) isn't used
     */
    enableImplicitConversion: true,
  });
  /**
   * Performs sync validation of the given object.
   * Note that this method completely ignores async validations.
   * If you want to properly perform validation you need to call validate method
   instead. */
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
