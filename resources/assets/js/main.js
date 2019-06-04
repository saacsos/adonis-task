import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'
import cookies from 'browser-cookies'
import axios from 'axios'

const csrf = cookies.get('XSRF-TOKEN')

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'

Vue.config.productionTip = false


const app = new Vue({
    el: "#app",
    router,
    components: { App },
    template: '<App/>'
});

const test_api = async () => {
    const response = await axios.create({withCredentials: true})
        .post('/api/post-sample', {
                name: 'Test',
                send: 'OK',
                lib: 'axios'
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrf
                }
            }
        );

    const body = await response.data

    console.log(body)
}

test_api();
