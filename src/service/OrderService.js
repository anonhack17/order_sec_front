import instance from "../store/api";

export default class OrderService {
    static async post() {
        return instance.post('api/order/order/', {email: email, password: password, role:'customer'})
    }

}
