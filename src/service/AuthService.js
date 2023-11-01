import instance from "../store/api";


class AuthService {
    login(email, password) {

        return instance
            .post("api/token/", {email: email, password: password})
            .then((response) => {
                localStorage.setItem('accessToken', response.data.access);
                console.log(localStorage.getItem('accessToken'));
                localStorage.setItem('refreshToken', response.data.refresh);
                window.location.href = '/audit';
                return response.data;
            }).catch(e => alert("Не правильно ввели данные"));
    }

    getUserInfo() {
        return instance.get('auth/users/me/').catch();
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    registration(email, password) {
        return instance.post('/auth/users/', {email: email, password: password, role: 'user'})
    }


}

export default new AuthService();
