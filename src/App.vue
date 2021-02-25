<template>
  <div>
    <h5>Stories</h5>
    <!-- Storie buttons -->
    <button
      class="btn btn-primary me-2"
      v-for="(story, index) in stories"
      :key="index"
      @click="storyClicked(index)"
    >
      {{ index }}
    </button>

    <h5>Actions</h5>
    <!-- Actions -->
    <button class="btn btn-danger" @click="stopStory">Stop</button>
    <button class="btn btn-danger" @click="resetStory">Reset</button>
    <button class="btn btn-success" @click="playStory">Play</button>
    <button class="btn btn-secondary" @click="prevStory">Previous Story</button>
    <button class="btn btn-secondary" @click="nextStory">Next Story</button>
    <button class="btn btn-secondary" @click="prevSlide">Prev Slide</button>
    <button class="btn btn-secondary" @click="nextSlide">Next Slide</button>

    <!-- Stories View -->
    <div class="stories_wrapper">
      <stories
        :autoplay="false"
        :duration="duration"
        :stories="stories"
        ref="stories_component"
        @ended="endedEvent"
        @next_story="nextStoryEvent"
        @prev_story="prevStoryEvent"
        @prev_slide="prevSlideEvent"
        @next_slide="nextSlideEvent"
      >
        <template v-slot:slide="{ story, slide }">
          <div class="slide" :style="'background-color:' + slide.color">
            <div>
              <p>{{ story.custom_attribute }}</p>
              <p>Color: {{ slide.color }}</p>
            </div>
          </div>
        </template>
      </stories>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "App",
  setup() {
    const stories_component = ref(null);

    return {
      stories_component,
    };
  },
  data() {
    return {
      duration: 5000,
      stories: [
        {
          custom_attribute: "Story 1",
          slides: [
            { id: 1, color: "#D53738", duration: 3000 },
            { id: 2, color: "#638867", duration: 10000 },
          ],
        },
        {
          custom_attribute: "Story 2",
          slides: [
            { id: 3, color: "#DAF7A6" },
            { id: 4, color: "#FFC300", duration: 20000 },
            { id: 5, color: "#FF5733" },
          ],
        },
        {
          custom_attribute: "Story 3",
          slides: [
            { id: 6, color: "#00BCD4", duration: 7000 },
            { id: 7, color: "#00BCD4" },
          ],
        },
      ],
    };
  },
  methods: {
    //Actions
    storyClicked(index) {
      this.stories_component.playStory(index);
    },
    stopStory() {
      this.stories_component.stopStory();
    },
    resetStory() {
      this.stories_component.resetStory();
    },
    playStory() {
      this.stories_component.playStory();
    },
    prevStory() {
      this.stories_component.prevStory();
    },
    nextStory() {
      this.stories_component.nextStory();
    },
    prevSlide() {
      this.stories_component.prevSlide();
    },
    nextSlide() {
      this.stories_component.nextSlide();
    },
    //Events
    endedEvent() {
      console.log("endedEvent");
    },
    prevStoryEvent() {
      console.log("prevStoryEvent");
    },
    nextStoryEvent() {
      console.log("nextStoryEvent");
    },
    prevSlideEvent() {
      console.log("prevSlideEvent");
    },
    nextSlideEvent() {
      console.log("nextSlideEvent");
    },
  },
};
</script>
  
<style lang='scss'>
.stories_wrapper {
  width: 300px;
  height: 400px;
  outline: 1px solid red;
  margin-top: 15px;
  .slide {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>