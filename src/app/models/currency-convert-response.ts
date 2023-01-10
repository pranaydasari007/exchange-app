import { RateInfo } from "./rate-info";

export class CurrencyConvertResponse {
    public amount: number | undefined;
    public rateInfo!: RateInfo;
}