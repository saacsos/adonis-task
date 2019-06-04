import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'
import cookies from 'browser-cookies'

Vue.config.productionTip = false


const app = new Vue({
    el: "#app",
    router,
    components: { App },
    template: '<App/>'
});

(async () => {
    const csrf = cookies.get('XSRF-TOKEN')

    const response = await fetch('/api/post-sample', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-xsrf-token': csrf
        },
        body: JSON.stringify({
            name: 'Test',
            send: 'OK'
        })
    });

    const body = await response.json()

    console.log(body)
})()