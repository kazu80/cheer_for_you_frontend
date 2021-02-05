import {Validator} from "validator.ts/Validator";
import {IsInt, IsLength, IsFloat} from "validator.ts/decorator/Validation";

class Staking {
    @IsLength(42, 42)
    address: string;

    @IsFloat({ min: 0.000000001, max: 10.00000})
    amount: number;

    @IsInt({ min: 1, max: 10000})
    total: number;
}

export const validateStaking = (address, amount, total) => {
    const staking = new Staking();
    staking.address = address;
    staking.amount  = amount;
    staking.total   = total;

    const validator = new Validator();
    const error = validator.validate(staking);

    if (error.length > 0) throw new Error('Validation Error');
}
