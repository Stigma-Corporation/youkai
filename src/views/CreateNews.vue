<template>
  <keep-alive>
    <div class="createnews has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column is-6">
              <div class="box">
                <div class="columns">
                  <div class="column">
                    <div class="field">
                      <label class="label">Название</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Очень важная новость"
                               v-model="title" v-on:input="CheckForm">
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Контент</label>
                      <div class="control">
                        <textarea class="textarea" placeholder="Очень важная информация"
                                  v-model="content" v-on:input="CheckForm"></textarea>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Тип новости</label>
                      <div class="control">
                        <div class="select">
                          <select v-model="tagSelected">
                            <option value="1">Обычная</option>
                            <option value="2">Важная</option>
                            <option value="3">Очень важная</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <div class="file">
                        <div class="control">
                          <label class="file-label">
                            <input class="file-input" type="file" name="resume" id="imageNews" v-on:change="GetFilename">
                            <span class="file-cta">
                          <span class="file-icon">
                            <i class="fas fa-upload"></i>
                          </span>
                          <span class="file-label">
                            Картинка для новости
                          </span>
                          <span class="file-name">{{imageFilename}}</span>
                        </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="field is-grouped is-grouped-centered">
                      <p class="control">
                        <button class="button is-success" v-bind:disabled="!formValid"
                                v-bind:class="{'is-loading': isLoading}" v-on:click="CreateNews">
                          Создать новость
                        </button>
                      </p>
                    </div>
                    <p class="title has-text-success is-size-5 has-text-centered" v-if="result === 'ok, ok'">Создано</p>
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
import store from "../store";
import axios from "axios";


export default {
  name: "CreateNews",
  data: function() {
    return {
      title: "",
      content: "",
      imageFilename: "",
      tagSelected: "1",
      formValid: false,
      result: "",
      isLoading: false,
    }
  },
  computed: {
    currentUser: {
      get() {
        return store.state.currentUser;
      }
    },
    token: {
      get() {
        return store.state.token;
      }
    }
  },
  methods: {
    CheckForm: function () {
      let mainThis = this;
      if (mainThis.title && mainThis.content && mainThis.imageFilename && mainThis.tagSelected){
        mainThis.formValid = true
      }
      else {
        mainThis.formValid = false
      }
    },
    CreateNews: function () {
      let mainThis = this;
      mainThis.isLoading = true;
      let formData = new FormData();
      let imageNews = document.querySelector('#imageNews');
      formData.append("image", imageNews.files[0]);
      formData.append("title", mainThis.title);
      formData.append("content", mainThis.content);
      formData.append("author", mainThis.currentUser['nickname']);
      formData.append("tags", mainThis.tagSelected);
      axios({
        method: "post",
        url: process.env.VUE_APP_API_ROOT + "news/",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Token " + mainThis.token
        },
        data: formData
      }).then(function (response) {
        mainThis.result = response.data.message;
        mainThis.title = "";
        mainThis.content = "";
        mainThis.imageFilename = "";
        mainThis.tagSelected = "1";
        imageNews.value = '';
        mainThis.CheckForm();
        mainThis.isLoading = false;
        // console.log(response)
      })
    },
    GetFilename: function (e) {
      let mainThis = this;
      if (e.target.files.length > 0) {
        mainThis.imageFilename = e.target.files[0].name;
      }
      mainThis.CheckForm();
    }
  }
}
</script>

<style scoped>
.has-bg-img { background: url('../assets/background2.jpg')center center; background-size:cover; }
</style>