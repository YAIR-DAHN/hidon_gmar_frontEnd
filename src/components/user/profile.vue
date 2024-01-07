<template>
    <div class="profile">
        <h1>פרופיל משתמש</h1>
        <div class="personal-details">
            <h2>פרטים אישיים</h2>
            <p>שם פרטי: {{ firstName }}</p>
            <p>שם משפחה: {{ lastName }}</p>
            <p>מספר טלפון: {{ phoneNumber }}</p>
            <p>כתובת מייל: {{ email }}</p>
            <p>תאריך לידה: {{ birthDate }}</p>
            <p>כתובת: {{ address }}</p>
            <p>עיר מגורים: {{ city }}</p>
        </div>
        <div class="user-stats">
            <h2>נתונים נוספים</h2>
            <p>ניקוד: {{ score }}</p>
            <p>שלב: {{ level }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            birthDate: '',
            address: '',
            city: '',
            score: 0,
            level: '',
        };
    },
    mounted() {
        // Fetch user data from http://localhost:3000/users/:id
        const userId = localStorage.getItem('id');
        fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                this.firstName = data.userFirstName;
                this.lastName = data.userLastName;
                this.phoneNumber = data.userPhone;
                this.email = data.userEmail;
                this.birthDate = data.userBirthDate;
                this.address = data.userAddress;
                this.city = data.userCity;
                this.score = data.userScore;
                this.level = data.userLevel;
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    },
};
</script>

<style scoped>
.profile {
    text-align: right;
}

.personal-details {
    margin-bottom: 20px;
}

.user-stats {
    margin-top: 20px;
}
</style>
