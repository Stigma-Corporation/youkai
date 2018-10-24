<template>
  <div class="home has-bg-img">
    <section class="hero section is-fullheight">
      <div class="container is-fluid">
        <div class="columns">
          <div class="column">
            <div class="box">
              <div class="columns">
                <div class="column is-6">
                  <div class="box">
                    <div class="title has-text-centered is-size-5">Календарь</div>
                    <div class="columns">
                      <template v-for="(day, day_index) in calendar">
                        <div class="column is-size-7 has-text-centered">
                          <div class="title has-text-centered is-size-6">{{dayMap[day_index+1]}}</div>
                          <template v-for="event in day['events']">
                            <div class="box is-marginless is-paddingless"
                                 v-bind:class="{'has-background-link has-text-white': event['tag'] === '1',
                                 'has-background-warning has-text-black': event['tag'] === '2',
                                 'has-background-danger has-text-white': event['tag'] === '3'}">
                              <!--<abbr v-bind:title="event['description']">{{event['brief']}}</abbr>-->
                              <div class="tooltip is-tooltip-right-desktop is-tooltip-bottom-mobile"
                                   v-bind:class="{'is-tooltip-link': event['tag'] === '1',
                                   'is-tooltip-warning': event['tag'] === '2',
                                   'is-tooltip-danger': event['tag'] === '3'}"
                                   v-bind:data-tooltip="event['description']">
                                {{event['brief']}}
                              </div>
                              <br>
                              {{timeMap[event['start']]}}
                            </div>
                            <br>
                          </template>
                        </div>
                        <template v-if="day_index === calendar.length - 1"></template>
                        <template v-else>
                          <div class="is-divider-vertical no-padding"></div>
                        </template>
                      </template>
                    </div>
                  </div>
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
                      <li><strong>Не явка</strong> (без уважительной причины) на рейды их участников,
                        будет наказываться в дальнейшем смещением в таблице (<strong>вплоть до исключения БШ</strong>)
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
      },
      dayMap: {"1": "Пн", "2": "Вт", "3": "Ср", "4": "Чт", "5": "Пт", "6": "Сб", "7": "Вс"},
      timeMap: {
        "0": "00:00", "1": "01:00", "2": "02:00", "3": "03:00", "4": "04:00", "5": "05:00", "6": "06:00", "7": "07:00",
        "8": "08:00", "9": "09:00", "10": "10:00", "11": "11:00", "12": "12:00", "13": "13:00", "14": "14:00",
        "15": "15:00", "16": "16:00", "17": "17:00", "18": "18:00", "19": "19:00", "20": "20:00", "21": "21:00",
        "22": "22:00", "23": "23:00", "24": "24:00",
      },
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
    calendar: {
      get() {
        return store.state.calendar;
      }
    }
  },
}
</script>

<style lang="scss">
@import "~bulma-extensions/bulma-tooltip/dist/css/bulma-tooltip.min.css";
@import "~bulma-extensions/bulma-divider/dist/css/bulma-divider.min.css";
.has-bg-img { background: url('../assets/background6.png')center center; background-size:cover; }
.no-padding {padding: 0 !important;}
</style>