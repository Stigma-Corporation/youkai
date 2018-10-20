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
                <div class="column is-6">
                  <div class="content is-medium">
                    <p class="has-text-centered"><strong>Общая информация</strong></p>
                    <p>Мы рады сообщить о том, что идёт набор в боевую школу <strong>Youkai</strong>.
                      Основное направления нашей боевой школы PvЕ, но мы так же будем рады и PvP игрокам.</p>
                    <ul>
                      <li>Сервер: <span class="tag is-link is-medium">Сапфир</span></li>
                      <li>Фракция: <span class="tag is-danger is-medium">Хончон</span></li>
                    </ul>
                    <p>Основные требования при вступлении</p>
                    <ol>
                      <li>Основной персонаж, уровень <strong>55</strong>(<strong>12</strong>+) (возможны исключения)</li>
                      <li>Активность и адекватность</li>
                      <li>Иметь Discord (на рейдах обязательно общаться)</li>
                      <li>Стабильный онлайн и активное участие в деятельности боевой школы</li>
                    </ol>
                    <p>Ссылки:</p>
                    <p class="buttons">
                      <a class="button is-info" href="https://vk.com/club164892099" target="_blank">
                          <span class="icon is-small">
                            <i class="fab fa-vk"></i>
                          </span>
                      </a>
                      <a class="button is-info" href="https://discord.gg/ARg7VPP" target="_blank">
                          <span class="icon is-small">
                            <i class="fab fa-discord"></i>
                          </span>
                      </a>
                    </p>
                    <p class="has-text-centered"><strong>Основные правила</strong></p>
                    <ol>
                      <li>Все вопросы решаются с главой БШ или же замом БШ. Все принятые решения без главы или его зама являются не действительными.</li>
                      <!--<li>Что касается, каких либо изменений и т.п. Все обговаривается, рассматривается и утверждается-->
                        <!--главой БШ или же в его отсутствие замом БШ.</li>-->
                      <!--<li>Рассматриваются вопросы или какие то ситуации тоже с главой БШ или же с замом БШ во избежание-->
                        <!--каких либо недоразумений и конфликтных ситуаций или же поднятых вопросов, тем и т.п.</li>-->
                      <!--<li>Все принятые решения без главы или его зама являются не действительными.</li>-->
                      <li><strong>Запрещаются</strong>: обманы, махинации с денежными валютами, подставления, предательства согильдийцев,
                        ради преследования каких либо алчных целей или целей личного характера,
                        а так же <strong>слитие информации</strong> о БШ, такие персоны будут удаляться из БШ.</li>
                      <li>Получение дропа имеет следующую формулу важности:<br>очередь > ветеран > новичок > твин (хоть Папа Римский)<br>
                        <strong>НО!</strong> Если ветеран оказался <strong>не в своём рейде</strong>,
                        и в этом же рейде есть новичок, и им нужны одинаковые вещи
                        формула изменяется на: ветеран < новичок > твин (хоть Дональд Трамп)
                      </li>
                      <li>Не явка (без уважительной причины) на рейды их участников,
                        будет наказываться в дальнейшем смещением в таблице (вплоть до исключения БШ)
                      </li>
                      <li>Новости БШ пишутся в Discord в канале News,а так же в группе в вконтакте (смотрите ссылки выше)</li>
                      <!--<li>Свод правил будет дорабатываться и редактироваться.</li>-->
                    </ol>
                  </div>
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