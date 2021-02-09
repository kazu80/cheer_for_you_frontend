import {validateStaking} from "./validator";
import {stakeDev} from "./dev_protocol";

export const staking = async function () {
    const address = this.parentElement.querySelector("[name='address']").value;
    const amount  = this.parentElement.querySelector("[name='amount']").value;
    const total   = this.parentElement.querySelector("[name='total']").value;

    try {
        validateStaking(address, amount, total);
    } catch (e) {
        console.error(e.message);
        return;
    }

    // 小数点0.000001で切り捨てて、あまりはステーキングを行わない
    const stakingAmount =　Math.floor((parseFloat(amount) / parseInt(total)) * 1000000) / 1000000;

    // Stakingを実行する
    await stakeDev(address, stakingAmount.toString())
}