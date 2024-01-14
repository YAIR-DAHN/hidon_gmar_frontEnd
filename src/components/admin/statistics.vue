<template>
    <div class="statistics">
        <h1>סטטיסטיקה של הכניסות לאתר</h1>
        <div class="data" v-for="(data, index) in loginCount" :key="index" >
            <h2>התבצעו {{ data.loginCounter }} כניסות מ {{ data.loginDeviceType }}</h2>

            <!-- <p>מכשיר: {{ data.loginDeviceType}}</p>
            <p>כמות הכניסות: {{ data.loginCounter }}</p> -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginCount: []
        };
    },
    mounted() {
        this.getInfPerDevice("mobile");
        this.getInfPerDevice("desktop");
        console.log(this.loginCount);
    },
    methods: {
        async getInfPerDevice(type) {
            try {
                const response = await fetch('http://localhost:3000/counter/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({ "loginDeviceType" : type, })
                })
                const data = await response.json();
                const info = {
                    loginDeviceType: type,
                    loginCounter: data
                }
                this.loginCount.push(info);
                console.log(`data: ${data} type: ${type}`);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style scoped>
.statistics {
    text-align: center;
}

.data {
    margin-top: 20px;
}
</style>
