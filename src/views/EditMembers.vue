<template>
  <keep-alive>
    <div class="profile has-bg-img">
      <section class="hero section is-fullheight">
        <div class="container is-fluid">
          <div class="columns">
            <div class="column">
              <div class="box" v-if="adminStatus === 'admin access granted'">
                <div class="columns" v-for="user in allUsers">
                  <div class="column">
                    <div class="box is-centered">
                      <div class="columns">
                        <div class="column">
                          <figure class="image is-24x24">
                            <ImageClasses v-bind:class-number="user['class']"></ImageClasses>
                          </figure>
                        </div>
                        <div class="column">
                          <figure class="image is-24x24">
                            <ImageElements v-bind:element-number="user['equipment']['element']"></ImageElements>
                          </figure>
                        </div>
                        <div class="column is-full">
                          <div class="columns">
                            <div class="column">
                              {{user['first_name']}}
                            </div>
                            <div class="column">
                              {{user['nickname']}}
                            </div>
                            <div class="column">
                              <div class="title">
                                <template v-if="user['role'] === 'admin'">
                                  <span class="tag is-danger">
                                    {{user['role']}}
                                  </span>
                                </template>
                                <template v-else-if="user['role'] === 'staff'">
                                  <span class="tag is-warning">
                                    {{user['role']}}
                                  </span>
                                </template>
                                <template v-else-if="user['role'] === 'member'">
                                  <span class="tag is-success">
                                    {{user['role']}}
                                  </span>
                                </template>
                                <template v-else>
                                  <span class="tag is-info">
                                    {{user['role']}}
                                  </span>
                                </template>
                              </div>
                            </div>
                            <div class="column">
                              {{user['status']}}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
import ImageClasses from "@/components/ImageClasses.vue"
import ImageElements from "@/components/ImageElements.vue"

export default {
  name: "editmemebers",
  components: {ImageClasses, ImageElements},
  computed: {
    adminStatus: {
      get() {
        return store.state.adminStatus;
      },
    },
    token: {
      get() {
        return store.state.token;
      },
    },
    // users: {
    //   get(){
    //     return store.state.users;
    //   },
    // }
    allUsers: {
      get() {
        return store.state.allUsers;
      }
    }
  },
  created: function () {
    store.dispatch("GetAllUsers");
  }
}
</script>

<style scoped>
.has-bg-img { background: url('../assets/background7.jpg')center center; background-size:cover; }
</style>