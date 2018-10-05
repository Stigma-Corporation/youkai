<template>
  <keep-alive>
    <div class="profile-settings has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container">
          <div class="columns">
            <div class="column is-one-quarter">
              <div class="box" v-if="token">
                <div class="column">
                  <div class="field">
                    <label class="label">Текущий пароль</label>
                    <div class="control">
                      <input class="input" maxlength="4" type="password"
                             v-model="currentPassword" v-on:input="CheckCurrentPassword">
                    </div>
                    <p class="help is-danger" v-if="userUpdatedMessage['message'] === 'Incorrect password'">
                      Не верный текущий Пароль!
                    </p>
                    <p class="help is-danger" v-if="currentPasswordErrors">
                      {{currentPasswordErrors}}
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Новый пароль</label>
                    <div class="control">
                      <input class="input" maxlength="4" type="password"
                             v-model="newPassword" v-on:input="CheckNewPasswords">
                    </div>
                    <p class="help is-danger" v-if="newPasswordErrors">
                      {{newPasswordErrors}}
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">Подверждение нового пароля</label>
                    <div class="control">
                      <input class="input" maxlength="4" type="password"
                             v-model="newPasswordConfirm" v-on:input="CheckNewPasswords">
                    </div>
                    <p class="help is-danger" v-if="newPasswordConfirmErrors">
                      {{newPasswordConfirmErrors}}
                    </p>
                    <p class="help is-danger" v-if="passwordsIdentityError">
                      {{passwordsIdentityError}}
                    </p>
                  </div>
                </div>
                <div class="column">
                  <div class="field is-grouped">
                    <p class="control">
                      <button class="button is-success"
                              v-bind:disabled="formInvalid" v-on:click="UpdateUserPasswordByToken(token)">
                        Сохранить
                      </button>
                    </p>
                    <p class="is-size-5" v-if="userUpdatedMessage['message'] === 'User\'s information updated'">
                      Информация обновлена
                    </p>
                    <p class="is-size-5" v-else-if="userUpdatedMessage['message'] === 'User already updated'">
                      Информация идентичная
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </keep-alive>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "ProfileSettings",
  data: function(){
    return {
      userUpdatedMessage: "",
      currentPassword: "",
      currentPasswordErrors: "",
      newPassword: "",
      newPasswordErrors: "",
      newPasswordConfirm: "",
      newPasswordConfirmErrors: "",
      passwordsIdentityError: "",
      formInvalid: true
    }
  },
  computed: {
    token: {
      get() {
        return store.state.token;
      },
    },
  },
  methods:{
    GetUserByToken: function (token) {
      let mainThis = this;
      mainThis.userUpdatedMessage = "";
      axios({
        method: "get",
        url: "http://192.168.1.100:8000/account/user",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        }
      }).then(function (response) {
        mainThis.currentUser = response.data;
      })
    },
    UpdateUserPasswordByToken: function (token) {
      let mainThis = this;
      axios({
        method: "patch",
        url: "http://192.168.1.100:8000/account/user",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          "current_password": mainThis.currentPassword,
          "new_password": mainThis.newPassword,
        }
      }).then(function (response) {
        mainThis.userUpdatedMessage = response.data;
        // console.log(response.data);
      })
    },
    CheckCurrentPassword: function () {
      let mainThis = this;
      if (mainThis.currentPassword.length === 4 ){
        mainThis.currentPasswordErrors = ""
      }
      else {
        mainThis.currentPasswordErrors = "Пароль должен состоять из 4 символов!";
        mainThis.formInvalid = true
      }
    },
    CheckNewPasswords: function () {
      let mainThis = this;
      if (mainThis.newPassword.length === 4 ){
        mainThis.newPasswordErrors = ""
      }
      else {
        mainThis.newPasswordErrors = "Пароль должен состоять из 4 символов!";
        mainThis.formInvalid = true
      }
      if (mainThis.newPasswordConfirm.length === 4 ){
        mainThis.newPasswordConfirmErrors = ""
      }
      else {
        mainThis.newPasswordConfirmErrors = "Пароль должен состоять из 4 символов!";
        mainThis.formInvalid = true
      }
      if (mainThis.newPassword !== mainThis.newPasswordConfirm) {
        mainThis.passwordsIdentityError = "Пароли не совпадают!";
        mainThis.formInvalid = true
      }
      else {
        mainThis.passwordsIdentityError = "";
      }
      mainThis.CheckForm()
    },
    CheckForm: function () {
      let mainThis =this;
      if (!mainThis.currentPasswordErrors && !mainThis.newPasswordErrors
        && !mainThis.newPasswordConfirmErrors &&!mainThis.passwordsIdentityError){
        mainThis.formInvalid = false
      }
    }
  },
  created: function () {
    this.GetUserByToken(this.token)
  }
}
</script>

<style lang="scss" scoped>
  .has-bg-img { background: url('../assets/background4.jpg')center center; background-size:cover; }
</style>