<template>
<v-container>
    <v-layout row wrap>
        <v-flex xs6 offset-xs3>
            <h1>Login</h1>
            <v-text-field lable="Email" placeholder="Email"
            required @input="setRegisterEmail"></v-text-field>
            <v-text-field lable="Password" placeholder="Password" type="password" autocomplete="new-password"
            @input="setRegisterPassword">
            </v-text-field>
            <v-alert type="error" :value="loginError" >{{ loginError }}</v-alert>
            <v-btn color="green" dark @click="login">
                <v-icon>fingerprint</v-icon>
                Login
            </v-btn>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('authentication', ['registerEmail', 'registerPassword', 'loginError',]),
  },
  methods: {
    ...mapMutations('authentication', ['setRegisterEmail', 'setRegisterPassword', 'resetValue',]),
    ...mapActions('authentication', ['login']),
  },
};
</script>