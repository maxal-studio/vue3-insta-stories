<template>
  <div class="story" :style="'width:' + width + 'px; height:' + height + 'px;'">
    <div class="timeline">
      <div class="slice" v-for="(slide_object, i) in slides" :key="i">
        <div class="progress">&nbsp;</div>
      </div>
    </div>
    <div class="slideWrapper">
      <slot name="slide" v-bind:slide="slides[currentSlideIndex]"></slot>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import Hammer from "hammerjs";
export default {
  name: "Story",
  props: {
    slides: Array,
    duration: Number,
    width: Number,
    height: Number,
  },
  data() {
    const timeline = anime.timeline({
      autoplay: false,
      easing: "linear",
    });
    return {
      currentSlideIndex: 0,
      isActive: false,
      timeline: timeline,
    };
  },
  methods: {
    activate: function () {
      // Start timer
      this.resetSlide();
    },
    deactivate: function () {
      this.timeline.pause();
    },
    resetSlide: function () {
      // Jump to beginning of the slide
      let duration = 0;
      // if (this.slides[this.currentSlideIndex].duration != undefined) {
      // } else {
      //   //Index * Default Duration
      //   duration = this.currentSlideIndex * this.duration;
      // }

      //If custom duration is set, go through each duration and sum them togetehr
      for (let index in this.slides) {
        if (this.currentSlideIndex == 0) {
          break;
        }
        if (this.currentSlideIndex == index) {
          break;
        }
        if (this.slides[index].duration != undefined) {
          duration += this.slides[index].duration;
        } else {
          duration += this.duration;
        }
      }

      this.timeline.pause();
      this.timeline.seek(duration);
      this.timeline.play();
    },
    nextSlide: function () {
      this.$emit("next_slide");
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.currentSlideIndex++;
        this.resetSlide();
      } else {
        this.nextStory();
      }
    },
    prevSlide: function () {
      this.$emit("prev_slide");
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
        this.resetSlide();
      } else {
        this.previousStory();
      }
    },
    nextStory: function () {
      this.$emit("next_story");
    },
    previousStory: function () {
      this.$emit("prev_story");
    },
    getOffset(el) {
      var _x = 0;
      var _y = 0;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x };
    },
  },
  mounted() {
    let $timeline = this.$el.getElementsByClassName("timeline")[0];
    // Add progress bars to the timeline animation group
    this.slides.forEach((slide, index) => {
      let $slice = $timeline.getElementsByClassName("slice")[index];
      let duration =
        this.slides[index].duration != undefined
          ? this.slides[index].duration
          : this.duration;

      this.timeline.add({
        duration: duration,
        targets: $slice.getElementsByClassName("progress"),
        width: "100%",
        changeBegin: () => {
          // Update the Vue componenet state when progress bar begins to play
          this.currentSlideIndex = index;
        },
        complete: () => {
          // Move to the next story when finished playing all slides
          if (index === this.slides.length - 1) {
            this.nextStory();
          }
        },
      });
    });
    this.hammer = new Hammer.Manager(this.$el, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
        [Hammer.Tap],
        [Hammer.Press, { time: 1, threshold: 1000000 }],
      ],
    });
    this.hammer.on("press", () => {
      this.timeline.pause();
    });
    this.hammer.on("pressup tap", () => {
      this.timeline.play();
    });
    // Tap on the side to navigate between slides
    this.hammer.on("tap", (event) => {
      if (event.center.x - this.getOffset(this.$el).left > this.width / 3) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    });
    // Handle swipe
    this.hammer.on("pan", (event) => {
      if (event.isFinal) {
        if (event.deltaX < 0) {
          this.nextStory();
        } else if (event.deltaX > 0) {
          this.previousStory();
        }
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
.story {
  float: left;
  position: relative;
  z-index: 1;

  .timeline {
    display: flex;
    flex-grow: 0;
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    z-index: 2;

    & > .slice {
      background: rgba(0, 0, 0, 0.7);
      height: 5px;
      margin: 5px;
      width: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: left;
      border-radius: 2px;

      & > .progress {
        background: rgba(255, 255, 255, 0.8);
        height: 5px;
        width: 0%;
      }
    }
  }

  .slideWrapper {
    /* Take the rest of the page */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>