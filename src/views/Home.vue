<template>
  <div class="home has-bg-img">
    <section class="hero section is-fullheight">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column is-6">
                  <template v-for="article in news">
                    <article class="message" v-bind:class="tagsClasses[article['tags']]">
                      <div class="message-header">
                        <p>{{article['title']}}</p>
                        <p>{{article['author']}}</p>
                      </div>
                      <div class="message-body">
                        <div class="columns">
                          <div class="column is-4">
                            <figure class="image is-16by9">
                              <ImageNews v-bind:image-id="article['image_id']"></ImageNews>
                            </figure>
                          </div>
                          <div class="column is-8">
                            {{article['content']}}
                          </div>
                        </div>
                        <DatetimeCreated v-bind:date-number="article['datetime_created']"></DatetimeCreated>
                      </div>
                    </article>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageNews from "@/components/ImageNews.vue"
import DatetimeCreated from "@/components/DatetimeCreated.vue"
import store from "../store";


export default {
  name: "home",
  components: {
    ImageNews, DatetimeCreated
  },
  data: function(){
    return {
      tagsClasses: {
        "1": "is-dark",
        "2": "is-warning",
        "3": "is-danger"
      }
    }
  },
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
    news: {
      get() {
        return store.state.news;
      }
    },
  },
}
</script>

<style lang="scss">
.has-bg-img { background: url('../assets/background6.png')center center; background-size:cover; }
</style>