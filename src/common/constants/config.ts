import { Type } from "class-transformer";

export const devConfig : EnvConfig = {
     port: 3000
};
export const proConfig : EnvConfig = {
     port: 400
};

export type EnvConfig = {
    port: number
}