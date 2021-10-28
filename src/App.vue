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
    <button class="btn btn-secondary" @click="recalculateDimensions">
      Recalculate Dimensions
    </button>

    <!-- Stories View -->
    <div class="overlay" v-show="showSlider">
      <div class="stories_wrapper">
        <stories
          :autoplay="false"
          :duration="duration"
          :stories="stories"
          width="200px"
          height="200px"
          ref="stories_component"
          @ended="endedEvent"
          @next_story="nextStoryEvent"
          @prev_story="prevStoryEvent"
          @prev_slide="prevSlideEvent"
          @next_slide="nextSlideEvent"
          @slide_changed="slideChangedEvent"
          @swipe_up="swipe_up"
          @swipe_down="swipe_down"
          @swipe_left="swipe_left"
          @swipe_right="swipe_right"
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
    <!-- /.overlay -->
  </div>
</template>

<script>
import Stories from "./../lib";
import { ref } from "vue";
export default {
  name: "App",
  components: { Stories },
  setup() {
    const stories_component = ref(null);

    return {
      stories_component,
    };
  },
  data() {
    return {
      showSlider: false,
      duration: 5000,
      stories: [
        {
          custom_attribute: "Story 1",
          slides: [
            { id: 1, color: "#D53738", duration: 3000 },
            { id: 2, color: "#638867", duration: 7000 },
          ],
        },
        {
          custom_attribute: "Story 2",
          slides: [
            { id: 3, color: "#DAF7A6" },
            { id: 4, color: "#FFC300", duration: 10000 },
            { id: 5, color: "#FF5733" },
          ],
        },
        {
          custom_attribute: "Story 3",
          slides: [
            { id: 6, color: "#00BCD4", duration: 4000 },
            { id: 7, color: "#00BCD4" },
          ],
        },
      ],
    };
  },
  methods: {
    //Actions
    storyClicked(index) {
      this.showSlider = true;
      this.stories_component.recalculateDimensions();
      this.stories_component.playStory(index);
    },
    recalculateDimensions() {
      this.stories_component.recalculateDimensions();
    },
    stopStory() {
      this.stories_component.stopStory();
      this.showSlider = false;
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
      this.stopStory();
      this.showSlider = false;
      console.log("endedEvent");
    },
    prevStoryEvent(index) {
      console.log("prevStoryEvent: " + index);
    },
    nextStoryEvent(index) {
      console.log("nextStoryEvent: " + index);
    },
    prevSlideEvent(index) {
      console.log("prevSlideEvent: " + index);
    },
    nextSlideEvent(index) {
      console.log("nextSlideEvent: " + index);
    },
    slideChangedEvent(index){
      console.log("slideChangedEvent: " + index);
    },
    swipe_left() {
      console.log("swipe_left Event");
      this.stories_component.nextStory();
    },
    swipe_right() {
      console.log("swipe_right Event");
      this.stories_component.prevStory();
    },
    swipe_up() {
      console.log("swipe_up Event");
    },
    swipe_down() {
      console.log("swipe_down Event");
      this.stopStory();
      this.showSlider = false;
    },
  },
};
</script>

<style lang='scss'>
.overlay {
  position: fixed;
  top: 200px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);

  .stories_wrapper {
    width: 300px;
    height: 400px;
    outline: 1px solid red;
    margin: 50px auto;
    .slide {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
