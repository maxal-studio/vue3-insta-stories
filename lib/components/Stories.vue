<template>
  <div id="stories_wrapper" ref="stories_wrapper">
    <div
      id="stories_slider"
      :class="{ withTransition: withTransition }"
      :style="generatePosition()"
    >
      <story
        v-for="(story, index) in stories"
        :key="index"
        :duration="duration"
        :slides="story.slides"
        :width="width"
        :height="height"
        @next_story="nextStory"
        @prev_story="prevStory"
        @next_slide="nextSlideEvent"
        @prev_slide="prevSlideEvent"
        :ref="
          (el) => {
            grouped_stories[index] = el;
          }
        "
      >
        <template v-slot:slide="{ slide }">
          <slot name="slide" v-bind:slide="slide" v-bind:story="story"> </slot>
        </template>
      </story>
    </div>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import { onBeforeUpdate, ref } from "vue";
import Story from "./Story.vue";
export default {
  components: { Story },
  setup() {
    const grouped_stories = ref([]);
    const stories_wrapper = ref(null);

    // Make sure to reset the refs before each update.
    onBeforeUpdate(() => {
      grouped_stories.value = [];
    });

    return {
      stories_wrapper,
      grouped_stories,
    };
  },
  name: "Stories",
  props: {
    stories: Array,
    duration: {
      type: Number,
      default: 5000,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    breakpoint: {
      type: Number,
      default: 768,
    },
  },
  data() {
    return {
      withTransition: true,
      currentStoryIndex: 0,
      width: 0,
      height: 0,
    };
  },
  mounted() {
    //Window resize event
    this.getStoriesWrapperSize();
    window.addEventListener("resize", () => {
      this.getStoriesWrapperSize();
    });
    // Disable mouse wheel
    this.$el.addEventListener("wheel", (event) => {
      event.preventDefault();
    });
    // Debounced previous and next
    const debouncedNext = debounce(
      () => {
        this.nextStory();
      },
      200,
      { leading: true, trailing: false }
    );
    const debouncedPrevious = debounce(
      () => {
        this.prevStory();
      },
      200,
      { leading: true, trailing: false }
    );
    // Mouse wheel handling
    // https://codepen.io/kayue/full/qGZOrb
    const debouncedWheelCallback = debounce(
      (event) => {
        // No wheel function in mobile
        if (window.innerWidth <= this.breakpoint) {
          return;
        }
        const delta = event.deltaY;
        // Ignore small wheel movement
        if (Math.abs(delta) < 25) {
          debouncedWheelCallback.cancel();
          return;
        }
        if (delta > 0) {
          debouncedNext();
        } else if (delta < 0) {
          debouncedPrevious();
        }
      },
      30,
      { leading: true, trailing: false }
    );
    this.$el.addEventListener("wheel", debouncedWheelCallback);
    if (this.autoplay == true) {
      this.grouped_stories[0].activate();
    }
  },
  methods: {
    getStoriesWrapperSize() {
      this.width = this.stories_wrapper.offsetWidth;
      this.height = this.stories_wrapper.offsetHeight;
    },
    prevSlideEvent() {
      this.$emit("prev_slide");
    },
    nextSlideEvent() {
      this.$emit("next_slide");
    },
    prevSlide() {
      this.grouped_stories[this.currentStoryIndex].prevSlide();
    },
    nextSlide() {
      this.grouped_stories[this.currentStoryIndex].nextSlide();
    },
    nextStory() {
      this.$emit("next_story");
      if (this.currentStoryIndex < this.stories.length - 1) {
        this.grouped_stories[this.currentStoryIndex].deactivate();
        this.currentStoryIndex++;
        this.grouped_stories[this.currentStoryIndex].activate();
      } else {
        this.$emit("ended", true);
      }
    },
    prevStory() {
      this.$emit("prev_story");
      if (this.currentStoryIndex > 0) {
        this.grouped_stories[this.currentStoryIndex].deactivate();
        this.currentStoryIndex--;
        this.grouped_stories[this.currentStoryIndex].activate();
      } else {
        this.grouped_stories[this.currentStoryIndex].resetSlide();
      }
    },
    playStory(index = null, withTransition = false) {
      if (index == null) {
        index = this.currentStoryIndex;
      }
      this.withTransition = withTransition;
      this.grouped_stories[this.currentStoryIndex].deactivate();
      this.currentStoryIndex = index;
      this.grouped_stories[index].activate();
    },
    stopStory() {
      this.grouped_stories[this.currentStoryIndex].deactivate();
    },
    resetStory() {
      this.grouped_stories[this.currentStoryIndex].resetSlide();
      this.grouped_stories[this.currentStoryIndex].deactivate();
    },
    generatePosition() {
      let style = {};
      if (window.innerWidth <= this.breakpoint) {
        style["width"] = "9999vw";
        //Rest Margin Top as in bigger screen sizes the slides scroll vertically
        style["margin-top"] = 0;
        style["margin-left"] = this.currentStoryIndex * -this.width + "px"; //Mins width
      } else {
        style["width"] = "100%";
        //Reset Margin Left as in smaller screen sizes the slides scroll horizontally
        style["margin-left"] = 0;
        style["margin-top"] = this.currentStoryIndex * -this.height + "px";
      }
      //Transition Timeout
      if (this.withTransition == false) {
        setTimeout(() => {
          this.withTransition = true;
        }, 300);
      }

      return style;
    },
  },
};
</script>

<style lang='scss' scoped>
#stories_wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  #stories_slider {
    height: 100%;
    position: relative;

    &.withTransition {
      transition: margin 0.3s ease-out;
    }
  }
}
</style>