((typeof self !== 'undefined' ? self : this)["webpackJsonpvue3_insta_stories"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvue3_insta_stories"] || []).push([[3],{

/***/ "54af":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./lib/components/Story.vue?vue&type=template&id=17049f7b

var _hoisted_1 = {
  class: "timeline"
};

var _hoisted_2 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", {
  class: "progress"
}, " ", -1);

var _hoisted_3 = {
  class: "slideWrapper"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", {
    class: "story",
    style: 'width:' + $props.width + 'px; height:' + $props.height + 'px;'
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", _hoisted_1, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])($props.slides, function (slide_object, i) {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])("div", {
      class: "slice",
      key: i
    }, [_hoisted_2]);
  }), 128))]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createVNode"])("div", _hoisted_3, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderSlot"])(_ctx.$slots, "slide", {
    slide: $props.slides[$data.currentSlideIndex]
  })])], 4);
}
// CONCATENATED MODULE: ./lib/components/Story.vue?vue&type=template&id=17049f7b

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/animejs/lib/anime.es.js
var anime_es = __webpack_require__("1209");

// EXTERNAL MODULE: ./node_modules/hammerjs/hammer.js
var hammer = __webpack_require__("c8b5");
var hammer_default = /*#__PURE__*/__webpack_require__.n(hammer);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader-v16/dist??ref--0-1!./lib/components/Story.vue?vue&type=script&lang=js




/* harmony default export */ var Storyvue_type_script_lang_js = ({
  name: "Story",
  props: {
    slides: Array,
    duration: Number,
    width: Number,
    height: Number
  },
  data: function data() {
    var timeline = anime_es["a" /* default */].timeline({
      autoplay: false,
      easing: "linear"
    });
    return {
      currentSlideIndex: 0,
      isActive: false,
      timeline: timeline
    };
  },
  methods: {
    activate: function activate() {
      // Start timer
      this.resetSlide();
    },
    deactivate: function deactivate() {
      this.timeline.pause();
    },
    resetSlide: function resetSlide() {
      // Jump to beginning of the slide
      var duration = 0; // if (this.slides[this.currentSlideIndex].duration != undefined) {
      // } else {
      //   //Index * Default Duration
      //   duration = this.currentSlideIndex * this.duration;
      // }
      //If custom duration is set, go through each duration and sum them togetehr

      for (var index in this.slides) {
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
    nextSlide: function nextSlide() {
      this.$emit("next_slide");

      if (this.currentSlideIndex < this.slides.length - 1) {
        this.currentSlideIndex++;
        this.resetSlide();
      } else {
        this.nextStory();
      }
    },
    prevSlide: function prevSlide() {
      this.$emit("prev_slide");

      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--;
        this.resetSlide();
      } else {
        this.previousStory();
      }
    },
    nextStory: function nextStory() {
      this.$emit("next_story");
    },
    previousStory: function previousStory() {
      this.$emit("prev_story");
    },
    getOffset: function getOffset(el) {
      var _x = 0;
      var _y = 0;

      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }

      return {
        top: _y,
        left: _x
      };
    }
  },
  mounted: function mounted() {
    var _this = this;

    var $timeline = this.$el.getElementsByClassName("timeline")[0]; // Add progress bars to the timeline animation group

    this.slides.forEach(function (slide, index) {
      var $slice = $timeline.getElementsByClassName("slice")[index];
      var duration = _this.slides[index].duration != undefined ? _this.slides[index].duration : _this.duration;

      _this.timeline.add({
        duration: duration,
        targets: $slice.getElementsByClassName("progress"),
        width: "100%",
        changeBegin: function changeBegin() {
          // Update the Vue componenet state when progress bar begins to play
          _this.currentSlideIndex = index;
        },
        complete: function complete() {
          // Move to the next story when finished playing all slides
          if (index === _this.slides.length - 1) {
            _this.nextStory();
          }
        }
      });
    });
    this.hammer = new hammer_default.a.Manager(this.$el, {
      recognizers: [[hammer_default.a.Pan, {
        direction: hammer_default.a.DIRECTION_HORIZONTAL
      }], [hammer_default.a.Tap], [hammer_default.a.Press, {
        time: 1,
        threshold: 1000000
      }]]
    });
    this.hammer.on("press", function () {
      _this.timeline.pause();
    });
    this.hammer.on("pressup tap", function () {
      _this.timeline.play();
    }); // Tap on the side to navigate between slides

    this.hammer.on("tap", function (event) {
      if (event.center.x - _this.getOffset(_this.$el).left > _this.width / 3) {
        _this.nextSlide();
      } else {
        _this.prevSlide();
      }
    }); // Handle swipe

    this.hammer.on("pan", function (event) {
      if (event.isFinal) {
        if (event.deltaX < 0) {
          _this.nextStory();
        } else if (event.deltaX > 0) {
          _this.previousStory();
        }
      }
    });
  }
});
// CONCATENATED MODULE: ./lib/components/Story.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./lib/components/Story.vue?vue&type=style&index=0&id=17049f7b&lang=scss
var Storyvue_type_style_index_0_id_17049f7b_lang_scss = __webpack_require__("d2be");

// CONCATENATED MODULE: ./lib/components/Story.vue





Storyvue_type_script_lang_js.render = render

/* harmony default export */ var Story = __webpack_exports__["default"] = (Storyvue_type_script_lang_js);

/***/ }),

/***/ "d2be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Story_vue_vue_type_style_index_0_id_17049f7b_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f82e");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Story_vue_vue_type_style_index_0_id_17049f7b_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_v16_dist_index_js_ref_0_1_Story_vue_vue_type_style_index_0_id_17049f7b_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f82e":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("fbe6");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("0c87e85c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "fbe6":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".story{float:left;position:relative;z-index:1}.story .timeline{display:flex;flex-grow:0;position:absolute;top:5px;left:5px;right:5px;z-index:2}.story .timeline>.slice{background:rgba(0,0,0,.7);height:5px;margin:5px;width:100%;display:flex;align-items:flex-start;justify-content:left;border-radius:2px}.story .timeline>.slice>.progress{background:hsla(0,0%,100%,.8);height:5px;width:0}.story .slideWrapper{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}", ""]);
// Exports
module.exports = exports;


/***/ })

}]);
//# sourceMappingURL=vue3-insta-stories.umd.3.js.map