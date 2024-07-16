!(function (e, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : ((e || self).readSmore = n());
})(this, function () {
  var e = {
    blockClassName: "read-smore",
    wordsCount: 70,
    charsCount: 150,
    moreText: "Подробнее....",
    lessText: "Меньше",
    isInline: !1,
  };
  function n(n, t) {
    t = Object.assign({}, e, t);
    var r = { originalContentArr: [], truncatedContentArr: [] };
    return {
      init: function () {
        for (var e = 0, o = n.length; e < o; ++e)
          (i = e),
            void 0,
            void 0,
            void 0,
            void 0,
            (l = (function (e, n, t) {
              void 0 === t && (t = !1);
              var r = (function (e) {
                return e.replace(/(^\s*)|(\s*$)/gi, "");
              })(e);
              return t
                ? r.split("").slice(0, n).join("") + "..."
                : r.split(/\s+/).slice(0, n).join(" ") + "...";
            })(
              (d = (a = n[e]).innerHTML),
              (s =
                a.dataset.readSmoreChars ||
                a.dataset.readSmoreWords ||
                t.wordsCount),
              !!a.dataset.readSmoreChars
            )),
            (c = d.length),
            r.originalContentArr.push(d),
            r.truncatedContentArr.push(l),
            s < c &&
              ((a.innerHTML = r.truncatedContentArr[i]),
              (function (e) {
                var o = document.createElement("span");
                (o.className = t.blockClassName + "__link-wrap"),
                  (o.innerHTML =
                    "<a id=" +
                    t.blockClassName +
                    "_" +
                    e +
                    "\n                             class=" +
                    t.blockClassName +
                    '__link\n                             style="cursor:pointer;">\n                             ' +
                    t.moreText +
                    "\n                          </a>"),
                  n[e].after(o),
                  (function (e) {
                    document
                      .querySelector("#" + t.blockClassName + "_" + e)
                      .addEventListener("click", function (o) {
                        n[e].classList.toggle("is-expanded");
                        var a = o.currentTarget;
                        "true" !== a.dataset.clicked
                          ? ((n[e].innerHTML = r.originalContentArr[e]),
                            (a.innerHTML = t.lessText),
                            (a.dataset.clicked = !0))
                          : ((n[e].innerHTML = r.truncatedContentArr[e]),
                            (a.innerHTML = t.moreText),
                            (a.dataset.clicked = !1));
                      });
                  })(e);
              })(i));
        var a, i, s, d, l, c;
      },
    };
  }
  return (n.options = e), n;
});
//# sourceMappingURL=index.umd.js.map

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}

/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== "undefined" ? globalThis : global || self),
      (global.Splide = factory()));
})(this, function () {
  "use strict";

  var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var SCROLLING = 5;
  var DRAGGING = 6;
  var DESTROYED = 7;
  var STATES = {
    CREATED: CREATED,
    MOUNTED: MOUNTED,
    IDLE: IDLE,
    MOVING: MOVING,
    SCROLLING: SCROLLING,
    DRAGGING: DRAGGING,
    DESTROYED: DESTROYED,
  };

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  var nextTick = setTimeout;

  var noop = function noop() {};

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    try {
      return (
        subject instanceof
        (subject.ownerDocument.defaultView || window).HTMLElement
      );
    } catch (e) {
      return false;
    }
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function includes(array, value) {
    return array.indexOf(value) > -1;
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function before(nodes, ref) {
    forEach(nodes, function (node) {
      var parent = (ref || node).parentNode;

      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }

  function matches(elm, selector) {
    return (
      isHTMLElement(elm) &&
      (elm["msMatchesSelector"] || elm.matches).call(elm, selector)
    );
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector
      ? children2.filter(function (child) {
          return matches(child, selector);
        })
      : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (
        key
      ) {
        key !== "__proto__" && iteratee(object[key], key);
      });
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function merge(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge(
            {},
            isObject(object[key]) ? object[key] : {},
            value
          );
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }

  function omit(object, keys) {
    forEach(keys || ownKeys(object), function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === ""
          ? removeAttribute(elm, attrs)
          : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }

    parent && append(parent, elm);
    return elm;
  }

  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }

    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }

  function display(elm, display2) {
    style(elm, "display", display2);
  }

  function focus(elm) {
    (elm["setActive"] && elm["setActive"]()) ||
      elm.focus({
        preventScroll: true,
      });
  }

  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function rect(target) {
    return target.getBoundingClientRect();
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
  }

  function prevent(e, stopPropagation) {
    e.preventDefault();

    if (stopPropagation) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }

  function query(parent, selector) {
    return parent && parent.querySelector(selector);
  }

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function timeOf(e) {
    return e.timeStamp;
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
    max = Math.max,
    floor = Math.floor,
    ceil = Math.ceil,
    abs = Math.abs;

  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }

  function between(number, x, y, exclusive) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return exclusive
      ? minimum < number && number < maximum
      : minimum <= number && number <= maximum;
  }

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  function sign(x) {
    return +(x > 0) - +(x < 0);
  }

  function format(string, replacements) {
    forEach(replacements, function (replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var ids = {};

  function uniqueId(prefix) {
    return "" + prefix + pad((ids[prefix] = (ids[prefix] || 0) + 1));
  }

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = "addEventListener" in target;
        var remover = isEventTarget
          ? target.removeEventListener.bind(target, event, callback, options)
          : target["removeListener"].bind(target, callback);
        isEventTarget
          ? target.addEventListener(event, callback, options)
          : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (
            listener[0] === target &&
            listener[1] === event &&
            listener[2] === namespace &&
            (!callback || listener[3] === callback)
          ) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail,
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function (target) {
        target &&
          forEach(events, function (events2) {
            events2.split(" ").forEach(function (eventNS) {
              var fragment = eventNS.split(".");
              iteratee(target, fragment[0], fragment[1]);
            });
          });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy,
    };
  }

  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_OVERFLOW = "overflow";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
  var EVENT_SLIDE_KEYDOWN = "sk";
  var EVENT_SHIFTED = "sh";
  var EVENT_END_INDEX_CHANGED = "ei";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function (e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign(binder, {
      bus: bus,
      on: on,
      off: apply(binder.unbind, bus),
      emit: emit,
    });
  }

  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;

    function update() {
      if (!paused) {
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);

        if (rate >= 1) {
          onInterval();
          startTime = now();

          if (limit && ++count >= limit) {
            return pause();
          }
        }

        id = raf(update);
      }
    }

    function start(resume) {
      resume || cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      id = raf(update);
    }

    function pause() {
      paused = true;
    }

    function rewind() {
      startTime = now();
      rate = 0;

      if (onUpdate) {
        onUpdate(rate);
      }
    }

    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }

    function set(time) {
      interval = time;
    }

    function isPaused() {
      return paused;
    }

    return {
      start: start,
      rewind: rewind,
      pause: pause,
      cancel: cancel,
      set: set,
      isPaused: isPaused,
    };
  }

  function State(initialState) {
    var state = initialState;

    function set(value) {
      state = value;
    }

    function is(states) {
      return includes(toArray(states), state);
    }

    return {
      set: set,
      is: is,
    };
  }

  function Throttle(func, duration) {
    var interval = RequestInterval(duration || 0, func, null, 1);
    return function () {
      interval.isPaused() && interval.start();
    };
  }

  function Media(Splide2, Components2, options) {
    var state = Splide2.state;
    var breakpoints = options.breakpoints || {};
    var reducedMotion = options.reducedMotion || {};
    var binder = EventBinder();
    var queries = [];

    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints)
        .sort(function (n, m) {
          return isMin ? +n - +m : +m - +n;
        })
        .forEach(function (key) {
          register(
            breakpoints[key],
            "(" + (isMin ? "min" : "max") + "-width:" + key + "px)"
          );
        });
      register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
      update();
    }

    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }

    function register(options2, query) {
      var queryList = matchMedia(query);
      binder.bind(queryList, "change", update);
      queries.push([options2, queryList]);
    }

    function update() {
      var destroyed = state.is(DESTROYED);
      var direction = options.direction;
      var merged = queries.reduce(function (merged2, entry) {
        return merge(merged2, entry[1].matches ? entry[0] : {});
      }, {});
      omit(options);
      set(merged);

      if (options.destroy) {
        Splide2.destroy(options.destroy === "completely");
      } else if (destroyed) {
        destroy(true);
        Splide2.mount();
      } else {
        direction !== options.direction && Splide2.refresh();
      }
    }

    function reduce(enable) {
      if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
        enable
          ? merge(options, reducedMotion)
          : omit(options, ownKeys(reducedMotion));
      }
    }

    function set(opts, base, notify) {
      merge(options, opts);
      base && merge(Object.getPrototypeOf(options), opts);

      if (notify || !state.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
      }
    }

    return {
      setup: setup,
      destroy: destroy,
      reduce: reduce,
      set: set,
    };
  }

  var ARROW = "Arrow";
  var ARROW_LEFT = ARROW + "Left";
  var ARROW_RIGHT = ARROW + "Right";
  var ARROW_UP = ARROW + "Up";
  var ARROW_DOWN = ARROW + "Down";
  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT],
  };

  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly, direction) {
      direction = direction || options.direction;
      var index =
        direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return (
        (ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index]) ||
        prop.replace(/width|left|right/i, function (match, offset) {
          var replacement =
            ORIENTATION_MAP[match.toLowerCase()][index] || match;
          return offset > 0
            ? replacement.charAt(0).toUpperCase() + replacement.slice(1)
            : replacement;
        })
      );
    }

    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }

    return {
      resolve: resolve,
      orient: orient,
    };
  }

  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ARIA_BUSY = ARIA_PREFIX + "busy";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ALL_ATTRIBUTES = [
    ROLE,
    TAB_INDEX,
    DISABLED,
    ARIA_CONTROLS,
    ARIA_CURRENT,
    ARIA_LABEL,
    ARIA_LABELLEDBY,
    ARIA_HIDDEN,
    ARIA_ORIENTATION,
    ARIA_ROLEDESCRIPTION,
  ];
  var CLASS_PREFIX = PROJECT_CODE + "__";
  var STATUS_CLASS_PREFIX = "is-";
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = CLASS_PREFIX + "track";
  var CLASS_LIST = CLASS_PREFIX + "list";
  var CLASS_SLIDE = CLASS_PREFIX + "slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = CLASS_PREFIX + "arrows";
  var CLASS_ARROW = CLASS_PREFIX + "arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = CLASS_PREFIX + "progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
  var CLASS_SPINNER = CLASS_PREFIX + "spinner";
  var CLASS_SR = CLASS_PREFIX + "sr";
  var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
  var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
  var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
  var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
  var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
  var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
  var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
  var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
  var STATUS_CLASSES = [
    CLASS_ACTIVE,
    CLASS_VISIBLE,
    CLASS_PREV,
    CLASS_NEXT,
    CLASS_LOADING,
    CLASS_FOCUS_IN,
    CLASS_OVERFLOW,
  ];
  var CLASSES = {
    slide: CLASS_SLIDE,
    clone: CLASS_CLONE,
    arrows: CLASS_ARROWS,
    arrow: CLASS_ARROW,
    prev: CLASS_ARROW_PREV,
    next: CLASS_ARROW_NEXT,
    pagination: CLASS_PAGINATION,
    page: CLASS_PAGINATION_PAGE,
    spinner: CLASS_SPINNER,
  };

  function closest(from, selector) {
    if (isFunction(from.closest)) {
      return from.closest(selector);
    }

    var elm = from;

    while (elm && elm.nodeType === 1) {
      if (matches(elm, selector)) {
        break;
      }

      elm = elm.parentElement;
    }

    return elm;
  }

  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";

  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2),
      on = _EventInterface.on,
      bind = _EventInterface.bind;

    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var rootClasses = [];
    var trackClasses = [];
    var track;
    var list;
    var isUsingKey;

    function setup() {
      collect();
      init();
      update();
    }

    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
      bind(
        document,
        POINTER_DOWN_EVENTS + " keydown",
        function (e) {
          isUsingKey = e.type === "keydown";
        },
        {
          capture: true,
        }
      );
      bind(root, "focusin", function () {
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
      });
    }

    function destroy(completely) {
      var attrs = ALL_ATTRIBUTES.concat("style");
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(
        root,
        completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]
      );
    }

    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }

    function collect() {
      track = find("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(
        slides,
        children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")")
      );
      forOwn(
        {
          arrows: CLASS_ARROWS,
          pagination: CLASS_PAGINATION,
          prev: CLASS_ARROW_PREV,
          next: CLASS_ARROW_NEXT,
          bar: CLASS_PROGRESS_BAR,
          toggle: CLASS_TOGGLE,
        },
        function (className, key) {
          elements[key] = find("." + className);
        }
      );
      assign(elements, {
        root: root,
        track: track,
        list: list,
        slides: slides,
      });
    }

    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";

      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }

      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }

    function find(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }

    function getClasses(base) {
      return [
        base + "--" + options.type,
        base + "--" + options.direction,
        options.drag && base + "--draggable",
        options.isNavigation && base + "--nav",
        base === CLASS_ROOT && CLASS_ACTIVE,
      ];
    }

    return assign(elements, {
      setup: setup,
      mount: mount,
      destroy: destroy,
    });
  }

  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";

  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
    var on = event.on,
      emit = event.emit,
      bind = event.bind;
    var Components = Splide2.Components,
      root = Splide2.root,
      options = Splide2.options;
    var isNavigation = options.isNavigation,
      updateOnMove = options.updateOnMove,
      i18n = options.i18n,
      pagination = options.pagination,
      slideFocus = options.slideFocus;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var label = getAttribute(slide, ARIA_LABEL);
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var destroyed;

    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(
          slide,
          ARIA_LABEL,
          label || format(i18n.slideLabel, [index + 1, Splide2.length])
        );
      }

      listen();
    }

    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);

      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }

    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }

    function initNavigation() {
      var controls = Splide2.splides
        .map(function (target) {
          var Slide2 = target.splide.Components.Slides.getAt(index);
          return Slide2 ? Slide2.slide.id : "";
        })
        .join(" ");
      setAttribute(
        slide,
        ARIA_LABEL,
        format(i18n.slideX, (isClone ? slideIndex : index) + 1)
      );
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
    }

    function onMove() {
      if (!destroyed) {
        update();
      }
    }

    function update() {
      if (!destroyed) {
        var curr = Splide2.index;
        updateActivity();
        updateVisibility();
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }

    function updateActivity() {
      var active = isActive();

      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, (isNavigation && active) || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
      }
    }

    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);

      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }

      setAttribute(
        queryAll(slide, options.focusableNodes || ""),
        TAB_INDEX,
        hidden ? -1 : ""
      );

      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }

      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
      }

      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }

    function style$1(prop, value, useContainer) {
      style((useContainer && container) || slide, prop, value);
    }

    function isActive() {
      var curr = Splide2.index;
      return curr === index || (options.cloneStatus && curr === slideIndex);
    }

    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }

      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left", true);
      var right = resolve("right", true);
      return (
        floor(trackRect[left]) <= ceil(slideRect[left]) &&
        floor(slideRect[right]) <= ceil(trackRect[right])
      );
    }

    function isWithin(from, distance) {
      var diff = abs(from - index);

      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }

      return diff <= distance;
    }

    var self = {
      index: index,
      slideIndex: slideIndex,
      slide: slide,
      container: container,
      isClone: isClone,
      mount: mount,
      destroy: destroy,
      update: update,
      style: style$1,
      isWithin: isWithin,
    };
    return self;
  }

  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
      on = _EventInterface2.on,
      emit = _EventInterface2.emit,
      bind = _EventInterface2.bind;

    var _Components2$Elements = Components2.Elements,
      slides = _Components2$Elements.slides,
      list = _Components2$Elements.list;
    var Slides2 = [];

    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
    }

    function init() {
      slides.forEach(function (slide, index) {
        register(slide, index, -1);
      });
    }

    function destroy() {
      forEach$1(function (Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }

    function update() {
      forEach$1(function (Slide2) {
        Slide2.update();
      });
    }

    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
      Slides2.sort(function (Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    }

    function get(excludeClones) {
      return excludeClones
        ? filter(function (Slide2) {
            return !Slide2.isClone;
          })
        : Slides2;
    }

    function getIn(page) {
      var Controller = Components2.Controller;
      var index = Controller.toIndex(page);
      var max = Controller.hasFocus() ? 1 : options.perPage;
      return filter(function (Slide2) {
        return between(Slide2.index, index, index + max - 1);
      });
    }

    function getAt(index) {
      return filter(index)[0];
    }

    function add(items, index) {
      forEach(items, function (slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }

        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }

    function remove$1(matcher) {
      remove(
        filter(matcher).map(function (Slide2) {
          return Slide2.slide;
        })
      );
      emit(EVENT_REFRESH);
    }

    function forEach$1(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }

    function filter(matcher) {
      return Slides2.filter(
        isFunction(matcher)
          ? matcher
          : function (Slide2) {
              return isString(matcher)
                ? matches(Slide2.slide, matcher)
                : includes(toArray(matcher), Slide2.index);
            }
      );
    }

    function style(prop, value, useContainer) {
      forEach$1(function (Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }

    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;

      if (length) {
        images.forEach(function (img) {
          bind(img, "load error", function () {
            if (!--length) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }

    function getLength(excludeClones) {
      return excludeClones ? slides.length : Slides2.length;
    }

    function isEnough() {
      return Slides2.length > options.perPage;
    }

    return {
      mount: mount,
      destroy: destroy,
      update: update,
      register: register,
      get: get,
      getIn: getIn,
      getAt: getAt,
      add: add,
      remove: remove$1,
      forEach: forEach$1,
      filter: filter,
      style: style,
      getLength: getLength,
      isEnough: isEnough,
    };
  }

  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2),
      on = _EventInterface3.on,
      bind = _EventInterface3.bind,
      emit = _EventInterface3.emit;

    var Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements,
      root = _Components2$Elements2.root,
      track = _Components2$Elements2.track,
      list = _Components2$Elements2.list;
    var getAt = Slides.getAt,
      styleSlides = Slides.style;
    var vertical;
    var rootRect;
    var overflow;

    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }

    function init() {
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize(true);
    }

    function resize(force) {
      var newRect = rect(root);

      if (
        force ||
        rootRect.width !== newRect.width ||
        rootRect.height !== newRect.height
      ) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);

        if (overflow !== (overflow = isOverflow())) {
          toggleClass(root, CLASS_OVERFLOW, overflow);
          emit(EVENT_OVERFLOW, overflow);
        }
      }
    }

    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return (
        (padding && unit(padding[prop] || (isObject(padding) ? 0 : padding))) ||
        "0px"
      );
    }

    function cssTrackHeight() {
      var height = "";

      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height =
          "calc(" +
          height +
          " - " +
          cssPadding(false) +
          " - " +
          cssPadding(true) +
          ")";
      }

      return height;
    }

    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }

    function cssSlideWidth() {
      return options.autoWidth
        ? null
        : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }

    function cssSlideHeight() {
      return (
        unit(options.fixedHeight) ||
        (vertical ? (options.autoHeight ? null : cssSlideSize()) : cssHeight())
      );
    }

    function cssSlideSize() {
      var gap = unit(options.gap);
      return (
        "calc((100%" +
        (gap && " + " + gap) +
        ")/" +
        (options.perPage || 1) +
        (gap && " - " + gap) +
        ")"
      );
    }

    function listSize() {
      return rect(list)[resolve("width")];
    }

    function slideSize(index, withoutGap) {
      var Slide = getAt(index || 0);
      return Slide
        ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap())
        : 0;
    }

    function totalSize(index, withoutGap) {
      var Slide = getAt(index);

      if (Slide) {
        var right = rect(Slide.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }

      return 0;
    }

    function sliderSize(withoutGap) {
      return (
        totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap)
      );
    }

    function getGap() {
      var Slide = getAt(0);
      return (
        (Slide && parseFloat(style(Slide.slide, resolve("marginRight")))) || 0
      );
    }

    function getPadding(right) {
      return (
        parseFloat(
          style(track, resolve("padding" + (right ? "Right" : "Left")))
        ) || 0
      );
    }

    function isOverflow() {
      return Splide2.is(FADE) || sliderSize(true) > listSize();
    }

    return {
      mount: mount,
      resize: resize,
      listSize: listSize,
      slideSize: slideSize,
      sliderSize: sliderSize,
      totalSize: totalSize,
      getPadding: getPadding,
      isOverflow: isOverflow,
    };
  }

  var MULTIPLIER = 2;

  function Clones(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on;
    var Elements = Components2.Elements,
      Slides = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;

    function mount() {
      on(EVENT_REFRESH, remount);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);

      if ((cloneCount = computeCloneCount())) {
        generate(cloneCount);
        Components2.Layout.resize(true);
      }
    }

    function remount() {
      destroy();
      mount();
    }

    function destroy() {
      remove(clones);
      empty(clones);
      event.destroy();
    }

    function observe() {
      var count = computeCloneCount();

      if (cloneCount !== count) {
        if (cloneCount < count || !count) {
          event.emit(EVENT_REFRESH);
        }
      }
    }

    function generate(count) {
      var slides = Slides.get().slice();
      var length = slides.length;

      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }

        push(slides.slice(-count), slides.slice(0, count)).forEach(function (
          Slide,
          index
        ) {
          var isHead = index < count;
          var clone = cloneDeep(Slide.slide, index);
          isHead
            ? before(clone, slides[0].slide)
            : append(Elements.list, clone);
          push(clones, clone);
          Slides.register(
            clone,
            index - count + (isHead ? 0 : length),
            Slide.index
          );
        });
      }
    }

    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }

    function computeCloneCount() {
      var clones2 = options.clones;

      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (isUndefined(clones2)) {
        var fixedSize =
          options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount =
          fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
        clones2 =
          fixedCount ||
          (options[resolve("autoWidth")] && Splide2.length) ||
          options.perPage * MULTIPLIER;
      }

      return clones2;
    }

    return {
      mount: mount,
      destroy: destroy,
    };
  }

  function Move(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2),
      on = _EventInterface4.on,
      emit = _EventInterface4.emit;

    var set = Splide2.state.set;
    var _Components2$Layout = Components2.Layout,
      slideSize = _Components2$Layout.slideSize,
      getPadding = _Components2$Layout.getPadding,
      totalSize = _Components2$Layout.totalSize,
      listSize = _Components2$Layout.listSize,
      sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction,
      resolve = _Components2$Directio.resolve,
      orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements,
      list = _Components2$Elements3.list,
      track = _Components2$Elements3.track;
    var Transition;

    function mount() {
      Transition = Components2.Transition;
      on(
        [EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH],
        reposition
      );
    }

    function reposition() {
      if (!Components2.Controller.isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        Components2.Slides.update();
      }
    }

    function move(dest, index, prev, callback) {
      if (dest !== index && canShift(dest > prev)) {
        cancel();
        translate(shift(getPosition(), dest > prev), true);
      }

      set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Transition.start(index, function () {
        set(IDLE);
        emit(EVENT_MOVED, index, prev, dest);
        callback && callback();
      });
    }

    function jump(index) {
      translate(toPosition(index, true));
    }

    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        style(
          list,
          "transform",
          "translate" + resolve("X") + "(" + destination + "px)"
        );
        position !== destination && emit(EVENT_SHIFTED);
      }
    }

    function loop(position) {
      if (Splide2.is(LOOP)) {
        var index = toIndex(position);
        var exceededMax = index > Components2.Controller.getEnd();
        var exceededMin = index < 0;

        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }

      return position;
    }

    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -=
        orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }

    function cancel() {
      translate(getPosition(), true);
      Transition.cancel();
    }

    function toIndex(position) {
      var Slides = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;

      for (var i = 0; i < Slides.length; i++) {
        var slideIndex = Slides[i].index;
        var distance = abs(toPosition(slideIndex, true) - position);

        if (distance <= minDistance) {
          minDistance = distance;
          index = slideIndex;
        } else {
          break;
        }
      }

      return index;
    }

    function toPosition(index, trimming) {
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }

    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }

    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize(true) - listSize()));
      }

      return position;
    }

    function offset(index) {
      var focus = options.focus;
      return focus === "center"
        ? (listSize() - slideSize(index, true)) / 2
        : +focus * slideSize(index) || 0;
    }

    function getLimit(max) {
      return toPosition(
        max ? Components2.Controller.getEnd() : 0,
        !!options.trimSpace
      );
    }

    function canShift(backwards) {
      var shifted = orient(shift(getPosition(), backwards));
      return backwards
        ? shifted >= 0
        : shifted <=
            list[resolve("scrollWidth")] - rect(track)[resolve("width")];
    }

    function exceededLimit(max, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin =
        max !== true && orient(position) < orient(getLimit(false));
      var exceededMax =
        max !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }

    return {
      mount: mount,
      move: move,
      jump: jump,
      translate: translate,
      shift: shift,
      cancel: cancel,
      toIndex: toIndex,
      toPosition: toPosition,
      getPosition: getPosition,
      getLimit: getLimit,
      exceededLimit: exceededLimit,
      reposition: reposition,
    };
  }

  function Controller(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2),
      on = _EventInterface5.on,
      emit = _EventInterface5.emit;

    var Move = Components2.Move;
    var getPosition = Move.getPosition,
      getLimit = Move.getLimit,
      toPosition = Move.toPosition;
    var _Components2$Slides = Components2.Slides,
      isEnough = _Components2$Slides.isEnough,
      getLength = _Components2$Slides.getLength;
    var omitEnd = options.omitEnd;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var endIndex;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;

    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
      on(EVENT_RESIZED, onResized);
    }

    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      endIndex = getEnd();
      var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);

      if (index !== currIndex) {
        currIndex = index;
        Move.reposition();
      }
    }

    function onResized() {
      if (endIndex !== getEnd()) {
        emit(EVENT_END_INDEX_CHANGED);
      }
    }

    function go(control, allowSameIndex, callback) {
      if (!isBusy()) {
        var dest = parse(control);
        var index = loop(dest);

        if (index > -1 && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move.move(dest, index, prevIndex, callback);
        }
      }
    }

    function scroll(destination, duration, snap, callback) {
      Components2.Scroll.scroll(destination, duration, snap, function () {
        var index = loop(Move.toIndex(getPosition()));
        setIndex(omitEnd ? min(index, endIndex) : index);
        callback && callback();
      });
    }

    function parse(control) {
      var index = currIndex;

      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [],
          indicator = _ref[1],
          number = _ref[2];

        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(
            currIndex + +("" + indicator + (+number || 1)),
            currIndex
          );
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, endIndex);
      }

      return index;
    }

    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(
        currIndex + number * (prev ? -1 : 1),
        currIndex,
        !(perMove || hasFocus())
      );

      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : endIndex;
        }
      }

      return destination ? dest : loop(dest);
    }

    function computeDestIndex(dest, from, snapPage) {
      if (isEnough() || hasFocus()) {
        var index = computeMovableDestIndex(dest);

        if (index !== dest) {
          from = dest;
          dest = index;
          snapPage = false;
        }

        if (dest < 0 || dest > endIndex) {
          if (
            !perMove &&
            (between(0, dest, from, true) ||
              between(endIndex, from, dest, true))
          ) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = snapPage
                ? dest < 0
                  ? -(slideCount % perPage || perPage)
                  : slideCount
                : dest;
            } else if (options.rewind) {
              dest = dest < 0 ? endIndex : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (snapPage && dest !== from) {
            dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }

      return dest;
    }

    function computeMovableDestIndex(dest) {
      if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
        var position = getPosition();

        while (
          position === toPosition(dest, true) &&
          between(dest, 0, Splide2.length - 1, !options.rewind)
        ) {
          dest < currIndex ? --dest : ++dest;
        }
      }

      return dest;
    }

    function loop(index) {
      return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }

    function getEnd() {
      var end = slideCount - (hasFocus() || (isLoop && perMove) ? 1 : perPage);

      while (omitEnd && end-- > 0) {
        if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
          end++;
          break;
        }
      }

      return clamp(end, 0, slideCount - 1);
    }

    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
    }

    function toPage(index) {
      return hasFocus()
        ? min(index, endIndex)
        : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
    }

    function toDest(destination) {
      var closest = Move.toIndex(destination);
      return isSlide ? clamp(closest, 0, endIndex) : closest;
    }

    function setIndex(index) {
      if (index !== currIndex) {
        prevIndex = currIndex;
        currIndex = index;
      }
    }

    function getIndex(prev) {
      return prev ? prevIndex : currIndex;
    }

    function hasFocus() {
      return !isUndefined(options.focus) || options.isNavigation;
    }

    function isBusy() {
      return (
        Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition
      );
    }

    return {
      mount: mount,
      go: go,
      scroll: scroll,
      getNext: getNext,
      getPrev: getPrev,
      getAdjacent: getAdjacent,
      getEnd: getEnd,
      setIndex: setIndex,
      getIndex: getIndex,
      toIndex: toIndex,
      toPage: toPage,
      toDest: toDest,
      hasFocus: hasFocus,
      isBusy: isBusy,
    };
  }

  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH =
    "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;

  function Arrows(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
      bind = event.bind,
      emit = event.emit;
    var classes = options.classes,
      i18n = options.i18n;
    var Elements = Components2.Elements,
      Controller = Components2.Controller;
    var placeholder = Elements.arrows,
      track = Elements.track;
    var wrapper = placeholder;
    var prev = Elements.prev;
    var next = Elements.next;
    var created;
    var wrapperClasses;
    var arrows = {};

    function mount() {
      init();
      on(EVENT_UPDATED, remount);
    }

    function remount() {
      destroy();
      mount();
    }

    function init() {
      var enabled = options.arrows;

      if (enabled && !(prev && next)) {
        createArrows();
      }

      if (prev && next) {
        assign(arrows, {
          prev: prev,
          next: next,
        });
        display(wrapper, enabled ? "" : "none");
        addClass(
          wrapper,
          (wrapperClasses = CLASS_ARROWS + "--" + options.direction)
        );

        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }

    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);

      if (created) {
        remove(placeholder ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }

    function listen() {
      on(
        [
          EVENT_MOUNTED,
          EVENT_MOVED,
          EVENT_REFRESH,
          EVENT_SCROLLED,
          EVENT_END_INDEX_CHANGED,
        ],
        update
      );
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }

    function go(control) {
      Controller.go(control, true);
    }

    function createArrows() {
      wrapper = placeholder || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      !placeholder && before(wrapper, track);
    }

    function createArrow(prev2) {
      var arrow =
        '<button class="' +
        classes.arrow +
        " " +
        (prev2 ? classes.prev : classes.next) +
        '" type="button"><svg xmlns="' +
        XML_NAME_SPACE +
        '" viewBox="0 0 ' +
        SIZE +
        " " +
        SIZE +
        '" width="' +
        SIZE +
        '" height="' +
        SIZE +
        '" focusable="false"><path d="' +
        (options.arrowPath || PATH) +
        '" />';
      return parseHtml(arrow);
    }

    function update() {
      if (prev && next) {
        var index = Splide2.index;
        var prevIndex = Controller.getPrev();
        var nextIndex = Controller.getNext();
        var prevLabel =
          prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
        var nextLabel =
          nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
        prev.disabled = prevIndex < 0;
        next.disabled = nextIndex < 0;
        setAttribute(prev, ARIA_LABEL, prevLabel);
        setAttribute(next, ARIA_LABEL, nextLabel);
        emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
      }
    }

    return {
      arrows: arrows,
      mount: mount,
      destroy: destroy,
      update: update,
    };
  }

  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";

  function Autoplay(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2),
      on = _EventInterface6.on,
      bind = _EventInterface6.bind,
      emit = _EventInterface6.emit;

    var interval = RequestInterval(
      options.interval,
      Splide2.go.bind(Splide2, ">"),
      onAnimationFrame
    );
    var isPaused = interval.isPaused;
    var Elements = Components2.Elements,
      _Components2$Elements4 = Components2.Elements,
      root = _Components2$Elements4.root,
      toggle = _Components2$Elements4.toggle;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var stopped = autoplay === "pause";

    function mount() {
      if (autoplay) {
        listen();
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
        stopped || play();
        update();
      }
    }

    function listen() {
      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function (e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }

      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function (e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }

      if (toggle) {
        bind(toggle, "click", function () {
          stopped ? play() : pause(true);
        });
      }

      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, onMove);
    }

    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = stopped = false;
        update();
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }

    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }

      stopped = !!stop;
      update();

      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }
    }

    function autoToggle() {
      if (!stopped) {
        hovered || focused ? pause(false) : play();
      }
    }

    function update() {
      if (toggle) {
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(
          toggle,
          ARIA_LABEL,
          options.i18n[stopped ? "play" : "pause"]
        );
      }
    }

    function onAnimationFrame(rate) {
      var bar = Elements.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }

    function onMove(index) {
      var Slide = Components2.Slides.getAt(index);
      interval.set(
        (Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE)) ||
          options.interval
      );
    }

    return {
      mount: mount,
      destroy: interval.cancel,
      play: play,
      pause: pause,
      isPaused: isPaused,
    };
  }

  function Cover(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2),
      on = _EventInterface7.on;

    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }

    function cover(cover2) {
      Components2.Slides.forEach(function (Slide) {
        var img = child(Slide.container || Slide.slide, "img");

        if (img && img.src) {
          toggle(cover2, img, Slide);
        }
      });
    }

    function toggle(cover2, img, Slide) {
      Slide.style(
        "background",
        cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "",
        true
      );
      display(img, cover2 ? "none" : "");
    }

    return {
      mount: mount,
      destroy: apply(cover, false),
    };
  }

  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;

  function Scroll(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2),
      on = _EventInterface8.on,
      emit = _EventInterface8.emit;

    var set = Splide2.state.set;
    var Move = Components2.Move;
    var getPosition = Move.getPosition,
      getLimit = Move.getLimit,
      exceededLimit = Move.exceededLimit,
      translate = Move.translate;
    var isSlide = Splide2.is(SLIDE);
    var interval;
    var callback;
    var friction = 1;

    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }

    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();

      if (snap && (!isSlide || !exceededLimit())) {
        var size = Components2.Layout.sliderSize();
        var offset =
          sign(destination) * size * floor(abs(destination) / size) || 0;
        destination =
          Move.toPosition(Components2.Controller.toDest(destination % size)) +
          offset;
      }

      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance
        ? 0
        : duration ||
          max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(
        duration,
        onEnd,
        apply(update, from, destination, noConstrain),
        1
      );
      set(SCROLLING);
      emit(EVENT_SCROLL);
      interval.start();
    }

    function onEnd() {
      set(IDLE);
      callback && callback();
      emit(EVENT_SCROLLED);
    }

    function update(from, to, noConstrain, rate) {
      var position = getPosition();
      var target = from + (to - from) * easing(rate);
      var diff = (target - position) * friction;
      translate(position + diff);

      if (isSlide && !noConstrain && exceededLimit()) {
        friction *= FRICTION_FACTOR;

        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          scroll(
            getLimit(exceededLimit(true)),
            BOUNCE_DURATION,
            false,
            callback,
            true
          );
        }
      }
    }

    function clear() {
      if (interval) {
        interval.cancel();
      }
    }

    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onEnd();
      }
    }

    function easing(t) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }

    return {
      mount: mount,
      destroy: clear,
      scroll: scroll,
      cancel: cancel,
    };
  }

  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true,
  };

  function Drag(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2),
      on = _EventInterface9.on,
      emit = _EventInterface9.emit,
      bind = _EventInterface9.bind,
      unbind = _EventInterface9.unbind;

    var state = Splide2.state;
    var Move = Components2.Move,
      Scroll = Components2.Scroll,
      Controller = Components2.Controller,
      track = Components2.Elements.track,
      reduce = Components2.Media.reduce;
    var _Components2$Directio2 = Components2.Direction,
      resolve = _Components2$Directio2.resolve,
      orient = _Components2$Directio2.orient;
    var getPosition = Move.getPosition,
      exceededLimit = Move.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;

    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true,
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }

    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }

    function onPointerDown(e) {
      clickPrevented = false;

      if (!disabled) {
        var isTouch = isTouchEvent(e);

        if (isDraggable(e.target) && (isTouch || !e.button)) {
          if (!Controller.isBusy()) {
            target = isTouch ? track : window;
            dragging = state.is([MOVING, SCROLLING]);
            prevBaseEvent = null;
            bind(
              target,
              POINTER_MOVE_EVENTS,
              onPointerMove,
              SCROLL_LISTENER_OPTIONS
            );
            bind(
              target,
              POINTER_UP_EVENTS,
              onPointerUp,
              SCROLL_LISTENER_OPTIONS
            );
            Move.cancel();
            Scroll.cancel();
            save(e);
          } else {
            prevent(e, true);
          }
        }
      }
    }

    function onPointerMove(e) {
      if (!state.is(DRAGGING)) {
        state.set(DRAGGING);
        emit(EVENT_DRAG);
      }

      if (e.cancelable) {
        if (dragging) {
          Move.translate(basePosition + constrain(diffCoord(e)));
          var expired = diffTime(e) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());

          if (expired || hasExceeded) {
            save(e);
          }

          clickPrevented = true;
          emit(EVENT_DRAGGING);
          prevent(e);
        } else if (isSliderDirection(e)) {
          dragging = shouldStart(e);
          prevent(e);
        }
      }
    }

    function onPointerUp(e) {
      if (state.is(DRAGGING)) {
        state.set(IDLE);
        emit(EVENT_DRAGGED);
      }

      if (dragging) {
        move(e);
        prevent(e);
      }

      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
      dragging = false;
    }

    function onClick(e) {
      if (!disabled && clickPrevented) {
        prevent(e, true);
      }
    }

    function save(e) {
      prevBaseEvent = baseEvent;
      baseEvent = e;
      basePosition = getPosition();
    }

    function move(e) {
      var velocity = computeVelocity(e);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;
      reduce(false);

      if (isFree) {
        Controller.scroll(destination, 0, options.snap);
      } else if (Splide2.is(FADE)) {
        Controller.go(
          orient(sign(velocity)) < 0 ? (rewind ? "<" : "-") : rewind ? ">" : "+"
        );
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller.go(Controller.toDest(destination), true);
      }

      reduce(true);
    }

    function shouldStart(e) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = (isObj && thresholds.mouse) || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }

    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }

    function computeVelocity(e) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e);

        if (time && time < LOG_INTERVAL) {
          return diffCoord(e) / time;
        }
      }

      return 0;
    }

    function computeDestination(velocity) {
      return (
        getPosition() +
        sign(velocity) *
          min(
            abs(velocity) * (options.flickPower || 600),
            isFree
              ? Infinity
              : Components2.Layout.listSize() * (options.flickMaxPages || 1)
          )
      );
    }

    function diffCoord(e, orthogonal) {
      return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
    }

    function diffTime(e) {
      return timeOf(e) - timeOf(getBaseEvent(e));
    }

    function getBaseEvent(e) {
      return (baseEvent === e && prevBaseEvent) || baseEvent;
    }

    function coordOf(e, orthogonal) {
      return (
        isTouchEvent(e) ? e.changedTouches[0] : e
      )["page" + resolve(orthogonal ? "Y" : "X")];
    }

    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
    }

    function isDraggable(target2) {
      var noDrag = options.noDrag;
      return (
        !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) &&
        (!noDrag || !matches(target2, noDrag))
      );
    }

    function isTouchEvent(e) {
      return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
    }

    function isDragging() {
      return dragging;
    }

    function disable(value) {
      disabled = value;
    }

    return {
      mount: mount,
      disable: disable,
      isDragging: isDragging,
    };
  }

  var NORMALIZATION_MAP = {
    Spacebar: " ",
    Right: ARROW_RIGHT,
    Left: ARROW_LEFT,
    Up: ARROW_UP,
    Down: ARROW_DOWN,
  };

  function normalizeKey(key) {
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }

  var KEYBOARD_EVENT = "keydown";

  function Keyboard(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2),
      on = _EventInterface10.on,
      bind = _EventInterface10.bind,
      unbind = _EventInterface10.unbind;

    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;

    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
      on(EVENT_MOVE, onMove);
    }

    function init() {
      var keyboard = options.keyboard;

      if (keyboard) {
        target = keyboard === "global" ? window : root;
        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }

    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }

    function disable(value) {
      disabled = value;
    }

    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function () {
        disabled = _disabled;
      });
    }

    function onKeydown(e) {
      if (!disabled) {
        var key = normalizeKey(e);

        if (key === resolve(ARROW_LEFT)) {
          Splide2.go("<");
        } else if (key === resolve(ARROW_RIGHT)) {
          Splide2.go(">");
        }
      }
    }

    return {
      mount: mount,
      destroy: destroy,
      disable: disable,
    };
  }

  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR =
    "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";

  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2),
      on = _EventInterface11.on,
      off = _EventInterface11.off,
      bind = _EventInterface11.bind,
      emit = _EventInterface11.emit;

    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];

    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
      }
    }

    function init() {
      empty(entries);
      register();

      if (isSequential) {
        loadNext();
      } else {
        off(events);
        on(events, check);
        check();
      }
    }

    function register() {
      Components2.Slides.forEach(function (Slide) {
        queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);

          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner =
              child(parent, "." + className) ||
              create("span", className, parent);
            entries.push([img, Slide, spinner]);
            img.src || display(img, "none");
          }
        });
      });
    }

    function check() {
      entries = entries.filter(function (data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
        return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
      });
      entries.length || off(events);
    }

    function load(data) {
      var img = data[0];
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }

    function onLoad(data, e) {
      var img = data[0],
        Slide = data[1];
      removeClass(Slide.slide, CLASS_LOADING);

      if (e.type !== "error") {
        remove(data[2]);
        display(img, "");
        emit(EVENT_LAZYLOAD_LOADED, img, Slide);
        emit(EVENT_RESIZE);
      }

      isSequential && loadNext();
    }

    function loadNext() {
      entries.length && load(entries.shift());
    }

    return {
      mount: mount,
      destroy: apply(empty, entries),
      check: check,
    };
  }

  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on,
      emit = event.emit,
      bind = event.bind;
    var Slides = Components2.Slides,
      Elements = Components2.Elements,
      Controller = Components2.Controller;
    var hasFocus = Controller.hasFocus,
      getIndex = Controller.getIndex,
      go = Controller.go;
    var resolve = Components2.Direction.resolve;
    var placeholder = Elements.pagination;
    var items = [];
    var list;
    var paginationClasses;

    function mount() {
      destroy();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
      var enabled = options.pagination;
      placeholder && display(placeholder, enabled ? "" : "none");

      if (enabled) {
        on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
        createPagination();
        update();
        emit(
          EVENT_PAGINATION_MOUNTED,
          {
            list: list,
            items: items,
          },
          getAt(Splide2.index)
        );
      }
    }

    function destroy() {
      if (list) {
        remove(placeholder ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }

      event.destroy();
    }

    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes,
        i18n = options.i18n,
        perPage = options.perPage;
      var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
      list =
        placeholder ||
        create("ul", classes.pagination, Elements.track.parentElement);
      addClass(
        list,
        (paginationClasses = CLASS_PAGINATION + "--" + getDirection())
      );
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(
        list,
        ARIA_ORIENTATION,
        getDirection() === TTB ? "vertical" : ""
      );

      for (var i = 0; i < max; i++) {
        var li = create("li", null, list);
        var button = create(
          "button",
          {
            class: classes.page,
            type: "button",
          },
          li
        );
        var controls = Slides.getIn(i).map(function (Slide) {
          return Slide.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));

        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i));
        }

        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        setAttribute(button, TAB_INDEX, -1);
        items.push({
          li: li,
          button: button,
          page: i,
        });
      }
    }

    function onClick(page) {
      go(">" + page, true);
    }

    function onKeydown(page, e) {
      var length = items.length;
      var key = normalizeKey(e);
      var dir = getDirection();
      var nextPage = -1;

      if (key === resolve(ARROW_RIGHT, false, dir)) {
        nextPage = ++page % length;
      } else if (key === resolve(ARROW_LEFT, false, dir)) {
        nextPage = (--page + length) % length;
      } else if (key === "Home") {
        nextPage = 0;
      } else if (key === "End") {
        nextPage = length - 1;
      }

      var item = items[nextPage];

      if (item) {
        focus(item.button);
        go(">" + nextPage);
        prevent(e, true);
      }
    }

    function getDirection() {
      return options.paginationDirection || options.direction;
    }

    function getAt(index) {
      return items[Controller.toPage(index)];
    }

    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());

      if (prev) {
        var button = prev.button;
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }

      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
      }

      emit(
        EVENT_PAGINATION_UPDATED,
        {
          list: list,
          items: items,
        },
        prev,
        curr
      );
    }

    return {
      items: items,
      mount: mount,
      destroy: destroy,
      getAt: getAt,
      update: update,
    };
  }

  var TRIGGER_KEYS = [" ", "Enter"];

  function Sync(Splide2, Components2, options) {
    var isNavigation = options.isNavigation,
      slideFocus = options.slideFocus;
    var events = [];

    function mount() {
      Splide2.splides.forEach(function (target) {
        if (!target.isParent) {
          sync(Splide2, target.splide);
          sync(target.splide, Splide2);
        }
      });

      if (isNavigation) {
        navigate();
      }
    }

    function destroy() {
      events.forEach(function (event) {
        event.destroy();
      });
      empty(events);
    }

    function remount() {
      destroy();
      mount();
    }

    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function (index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }

    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }

    function update() {
      setAttribute(
        Components2.Elements.list,
        ARIA_ORIENTATION,
        options.direction === TTB ? "vertical" : ""
      );
    }

    function onClick(Slide) {
      Splide2.go(Slide.index);
    }

    function onKeydown(Slide, e) {
      if (includes(TRIGGER_KEYS, normalizeKey(e))) {
        onClick(Slide);
        prevent(e);
      }
    }

    return {
      setup: apply(
        Components2.Media.set,
        {
          slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus,
        },
        true
      ),
      mount: mount,
      destroy: destroy,
      remount: remount,
    };
  }

  function Wheel(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2),
      bind = _EventInterface12.bind;

    var lastTime = 0;

    function mount() {
      if (options.wheel) {
        bind(
          Components2.Elements.track,
          "wheel",
          onWheel,
          SCROLL_LISTENER_OPTIONS
        );
      }
    }

    function onWheel(e) {
      if (e.cancelable) {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e);

        var _min = options.wheelMinThreshold || 0;

        var sleep = options.wheelSleep || 0;

        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide2.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }

        shouldPrevent(backwards) && prevent(e);
      }
    }

    function shouldPrevent(backwards) {
      return (
        !options.releaseWheel ||
        Splide2.state.is(MOVING) ||
        Components2.Controller.getAdjacent(backwards) !== -1
      );
    }

    return {
      mount: mount,
    };
  }

  var SR_REMOVAL_DELAY = 90;

  function Live(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2),
      on = _EventInterface13.on;

    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));

    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }

    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);

      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
        interval.cancel();
      }
    }

    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }

    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }

    return {
      mount: mount,
      disable: disable,
      destroy: destroy,
    };
  }

  var ComponentConstructors = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Media: Media,
    Direction: Direction,
    Elements: Elements,
    Slides: Slides,
    Layout: Layout,
    Clones: Clones,
    Move: Move,
    Controller: Controller,
    Arrows: Arrows,
    Autoplay: Autoplay,
    Cover: Cover,
    Scroll: Scroll,
    Drag: Drag,
    Keyboard: Keyboard,
    LazyLoad: LazyLoad,
    Pagination: Pagination,
    Sync: Sync,
    Wheel: Wheel,
    Live: Live,
  });
  var I18N = {
    prev: "Previous slide",
    next: "Next slide",
    first: "Go to first slide",
    last: "Go to last slide",
    slideX: "Go to slide %s",
    pageX: "Go to page %s",
    play: "Start autoplay",
    pause: "Pause autoplay",
    carousel: "carousel",
    slide: "slide",
    select: "Select a slide to show",
    slideLabel: "%s of %s",
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause",
    },
  };

  function Fade(Splide2, Components2, options) {
    var Slides = Components2.Slides;

    function mount() {
      EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
    }

    function init() {
      Slides.forEach(function (Slide) {
        Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
      });
    }

    function start(index, done) {
      Slides.style(
        "transition",
        "opacity " + options.speed + "ms " + options.easing
      );
      nextTick(done);
    }

    return {
      mount: mount,
      start: start,
      cancel: noop,
    };
  }

  function Slide(Splide2, Components2, options) {
    var Move = Components2.Move,
      Controller = Components2.Controller,
      Scroll = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
    var endCallback;

    function mount() {
      EventInterface(Splide2).bind(list, "transitionend", function (e) {
        if (e.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }

    function start(index, done) {
      var destination = Move.toPosition(index, true);
      var position = Move.getPosition();
      var speed = getSpeed(index);

      if (abs(destination - position) >= 1 && speed >= 1) {
        if (options.useScroll) {
          Scroll.scroll(destination, speed, false, done);
        } else {
          transition("transform " + speed + "ms " + options.easing);
          Move.translate(destination, true);
          endCallback = done;
        }
      } else {
        Move.jump(index);
        done();
      }
    }

    function cancel() {
      transition("");
      Scroll.cancel();
    }

    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;

      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller.getIndex(true);
        var end = Controller.getEnd();

        if ((prev === 0 && index >= end) || (prev >= end && index === 0)) {
          return rewindSpeed;
        }
      }

      return options.speed;
    }

    return {
      mount: mount,
      start: start,
      cancel: cancel,
    };
  }

  var _Splide = /*#__PURE__*/ (function () {
    function _Splide(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge(
        {
          label: getAttribute(root, ARIA_LABEL) || "",
          labelledby: getAttribute(root, ARIA_LABELLEDBY) || "",
        },
        DEFAULTS,
        _Splide.defaults,
        options || {}
      );

      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }

      this._o = Object.create(merge({}, options));
    }

    var _proto = _Splide.prototype;

    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;

      var state = this.state,
        Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T,
      });
      forOwn(Constructors, function (Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function (component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };

    _proto.sync = function sync(splide) {
      this.splides.push({
        splide: splide,
      });
      splide.splides.push({
        splide: this,
        isParent: true,
      });

      if (this.state.is(IDLE)) {
        this._C.Sync.remount();

        splide.Components.Sync.remount();
      }

      return this;
    };

    _proto.go = function go(control) {
      this._C.Controller.go(control);

      return this;
    };

    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };

    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };

    _proto.emit = function emit(event) {
      var _this$event;

      (_this$event = this.event).emit.apply(
        _this$event,
        [event].concat(slice(arguments, 1))
      );

      return this;
    };

    _proto.add = function add(slides, index) {
      this._C.Slides.add(slides, index);

      return this;
    };

    _proto.remove = function remove(matcher) {
      this._C.Slides.remove(matcher);

      return this;
    };

    _proto.is = function is(type) {
      return this._o.type === type;
    };

    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };

    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }

      var event = this.event,
        state = this.state;

      if (state.is(CREATED)) {
        EventInterface(this).on(
          EVENT_READY,
          this.destroy.bind(this, completely)
        );
      } else {
        forOwn(
          this._C,
          function (component) {
            component.destroy && component.destroy(completely);
          },
          true
        );
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state.set(DESTROYED);
      }

      return this;
    };

    _createClass(_Splide, [
      {
        key: "options",
        get: function get() {
          return this._o;
        },
        set: function set(options) {
          this._C.Media.set(options, true, true);
        },
      },
      {
        key: "length",
        get: function get() {
          return this._C.Slides.getLength(true);
        },
      },
      {
        key: "index",
        get: function get() {
          return this._C.Controller.getIndex();
        },
      },
    ]);

    return _Splide;
  })();

  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;
  return Splide;
});

/*!
 * @splidejs/splide-extension-grid
 * Version  : 0.4.1
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  function empty$1(array) {
    array.length = 0;
  }

  function slice$1(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply$1(func) {
    return func.bind.apply(func, [null].concat(slice$1(arguments, 1)));
  }

  function typeOf$1(type, subject) {
    return typeof subject === type;
  }

  var isArray$1 = Array.isArray;
  apply$1(typeOf$1, "function");
  apply$1(typeOf$1, "string");
  apply$1(typeOf$1, "undefined");

  function toArray$1(value) {
    return isArray$1(value) ? value : [value];
  }

  function forEach$1(values, iteratee) {
    toArray$1(values).forEach(iteratee);
  }

  var ownKeys$1 = Object.keys;

  function forOwn$1(object, iteratee, right) {
    if (object) {
      var keys = ownKeys$1(object);
      keys = right ? keys.reverse() : keys;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign$1(object) {
    slice$1(arguments, 1).forEach(function (source) {
      forOwn$1(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  var PROJECT_CODE$1 = "splide";

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = "addEventListener" in target;
        var remover = isEventTarget
          ? target.removeEventListener.bind(target, event, callback, options)
          : target["removeListener"].bind(target, callback);
        isEventTarget
          ? target.addEventListener(event, callback, options)
          : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (
            listener[0] === target &&
            listener[1] === event &&
            listener[2] === namespace &&
            (!callback || listener[3] === callback)
          ) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail,
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach$1(targets, function (target) {
        target &&
          forEach$1(events, function (events2) {
            events2.split(" ").forEach(function (eventNS) {
              var fragment = eventNS.split(".");
              iteratee(target, fragment[0], fragment[1]);
            });
          });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty$1(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy,
    };
  }

  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_DESTROY = "destroy";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray$1(events).join(" "), function (e) {
        callback.apply(callback, isArray$1(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice$1(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign$1(binder, {
      bus: bus,
      on: on,
      off: apply$1(binder.unbind, bus),
      emit: emit,
    });
  }

  var CLASS_ROOT = PROJECT_CODE$1;
  var CLASS_SLIDE = PROJECT_CODE$1 + "__slide";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";

  function empty(array) {
    array.length = 0;
  }

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function isHTMLElement(subject) {
    return subject instanceof HTMLElement;
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }

  function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
  }

  function matches(elm, selector) {
    return (
      isHTMLElement(elm) &&
      (elm["msMatchesSelector"] || elm.matches).call(elm, selector)
    );
  }

  function children(parent, selector) {
    var children2 = parent ? slice(parent.children) : [];
    return selector
      ? children2.filter(function (child) {
          return matches(child, selector);
        })
      : children2;
  }

  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      var keys = ownKeys(object);
      keys = right ? keys.reverse() : keys;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function omit(object, keys) {
    toArray(keys || ownKeys(object)).forEach(function (key) {
      delete object[key];
    });
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === ""
          ? removeAttribute(elm, attrs)
          : elm.setAttribute(attrs, String(value));
      });
    }
  }

  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);

    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }

    parent && append(parent, elm);
    return elm;
  }

  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }

    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }

  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }

  function remove(nodes) {
    forEach(nodes, function (node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }

  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }

  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }

  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }

  var PROJECT_CODE = "splide";

  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }

  var min = Math.min,
    max = Math.max,
    floor = Math.floor,
    ceil = Math.ceil,
    abs = Math.abs;

  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }

  var CLASS_SLIDE_ROW = CLASS_SLIDE + "__row";
  var CLASS_SLIDE_COL = CLASS_SLIDE + "--col";
  var DEFAULTS = {
    rows: 1,
    cols: 1,
    dimensions: [],
    gap: {},
  };

  function Dimension(options) {
    function normalize() {
      var rows = options.rows,
        cols = options.cols,
        dimensions = options.dimensions;
      return isArray(dimensions) && dimensions.length
        ? dimensions
        : [[rows, cols]];
    }

    function get(index) {
      var dimensions = normalize();
      return dimensions[min(index, dimensions.length - 1)];
    }

    function getAt(index) {
      var dimensions = normalize();
      var rows,
        cols,
        aggregator = 0;

      for (var i = 0; i < dimensions.length; i++) {
        var dimension = dimensions[i];
        rows = dimension[0] || 1;
        cols = dimension[1] || 1;
        aggregator += rows * cols;

        if (index < aggregator) {
          break;
        }
      }

      assert(rows && cols, "Invalid dimension");
      return [rows, cols];
    }

    return {
      get: get,
      getAt: getAt,
    };
  }

  function Layout(Splide2, gridOptions, Dimension) {
    var _EventInterface = EventInterface(Splide2),
      on = _EventInterface.on,
      destroyEvent = _EventInterface.destroy;

    var Components = Splide2.Components,
      options = Splide2.options;
    var resolve = Components.Direction.resolve;
    var forEach = Components.Slides.forEach;

    function mount() {
      layout();

      if (options.slideFocus) {
        on(EVENT_VISIBLE, onVisible);
        on(EVENT_HIDDEN, onHidden);
      }
    }

    function destroy() {
      forEach(function (Slide) {
        var slide = Slide.slide;
        toggleTabIndex(slide, false);
        getRowsIn(slide).forEach(function (cell) {
          removeAttribute(cell, "style");
        });
        getColsIn(slide).forEach(function (colSlide) {
          cover(colSlide, true);
          removeAttribute(colSlide, "style");
        });
      });
      destroyEvent();
    }

    function layout() {
      forEach(function (Slide) {
        var slide = Slide.slide;

        var _Dimension$get = Dimension.get(
            Slide.isClone ? Slide.slideIndex : Slide.index
          ),
          rows = _Dimension$get[0],
          cols = _Dimension$get[1];

        layoutRow(rows, slide);
        layoutCol(cols, slide);
        getColsIn(Slide.slide).forEach(function (colSlide, index) {
          colSlide.id = Slide.slide.id + "-col" + pad(index + 1);

          if (Splide2.options.cover) {
            cover(colSlide);
          }
        });
      });
    }

    function layoutRow(rows, slide) {
      var rowGap = gridOptions.gap.row;
      var height =
        "calc(" +
        100 / rows +
        "%" +
        (rowGap ? " - " + unit(rowGap) + " * " + (rows - 1) / rows : "") +
        ")";
      getRowsIn(slide).forEach(function (rowElm, index, rowElms) {
        style(rowElm, "height", height);
        style(rowElm, "display", "flex");
        style(rowElm, "margin", "0 0 " + unit(rowGap) + " 0");
        style(rowElm, "padding", 0);

        if (index === rowElms.length - 1) {
          style(rowElm, "marginBottom", 0);
        }
      });
    }

    function layoutCol(cols, slide) {
      var colGap = gridOptions.gap.col;
      var width =
        "calc(" +
        100 / cols +
        "%" +
        (colGap ? " - " + unit(colGap) + " * " + (cols - 1) / cols : "") +
        ")";
      getColsIn(slide).forEach(function (colElm, index, colElms) {
        style(colElm, "width", width);

        if (index !== colElms.length - 1) {
          style(colElm, resolve("marginRight"), unit(colGap));
        }
      });
    }

    function cover(colSlide, uncover) {
      var container = child(colSlide, "." + CLASS_CONTAINER);
      var img = child(container || colSlide, "img");

      if (img && img.src) {
        style(
          container || colSlide,
          "background",
          uncover ? "" : 'center/cover no-repeat url("' + img.src + '")'
        );
        style(img, "display", uncover ? "" : "none");
      }
    }

    function getRowsIn(slide) {
      return queryAll(slide, "." + CLASS_SLIDE_ROW);
    }

    function getColsIn(slide) {
      return queryAll(slide, "." + CLASS_SLIDE_COL);
    }

    function toggleTabIndex(slide, add) {
      getColsIn(slide).forEach(function (colSlide) {
        setAttribute(colSlide, "tabindex", add ? 0 : null);
      });
    }

    function onVisible(Slide) {
      toggleTabIndex(Slide.slide, true);
    }

    function onHidden(Slide) {
      toggleTabIndex(Slide.slide, false);
    }

    return {
      mount: mount,
      destroy: destroy,
    };
  }

  function Grid(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2),
      on = _EventInterface2.on,
      off = _EventInterface2.off;

    var Elements = Components2.Elements;
    var gridOptions = {};
    var Dimension$1 = Dimension(gridOptions);
    var Layout$1 = Layout(Splide2, gridOptions, Dimension$1);
    var modifier = CLASS_ROOT + "--grid";
    var originalSlides = [];

    function mount() {
      init();
      on(EVENT_UPDATED, init);
    }

    function init() {
      omit(gridOptions);
      assign(gridOptions, DEFAULTS, options.grid || {});

      if (shouldBuild()) {
        destroy();
        push(originalSlides, Elements.slides);
        addClass(Splide2.root, modifier);
        append(Elements.list, build());
        off(EVENT_REFRESH);
        on(EVENT_REFRESH, layout);
        refresh();
      } else if (isActive()) {
        destroy();
        refresh();
      }
    }

    function destroy() {
      if (isActive()) {
        var slides = Elements.slides;
        Layout$1.destroy();
        originalSlides.forEach(function (slide) {
          removeClass(slide, CLASS_SLIDE_COL);
          append(Elements.list, slide);
        });
        remove(slides);
        removeClass(Splide2.root, modifier);
        empty(slides);
        push(slides, originalSlides);
        empty(originalSlides);
        off(EVENT_REFRESH);
      }
    }

    function refresh() {
      Splide2.refresh();
    }

    function layout() {
      if (isActive()) {
        Layout$1.mount();
      }
    }

    function build() {
      var outerSlides = [];
      var row = 0,
        col = 0;
      var outerSlide, rowSlide;
      originalSlides.forEach(function (slide, index) {
        var _Dimension$1$getAt = Dimension$1.getAt(index),
          rows = _Dimension$1$getAt[0],
          cols = _Dimension$1$getAt[1];

        if (!col) {
          if (!row) {
            outerSlide = create(slide.tagName, CLASS_SLIDE);
            outerSlides.push(outerSlide);
          }

          rowSlide = buildRow(rows, slide, outerSlide);
        }

        buildCol(cols, slide, rowSlide);

        if (++col >= cols) {
          col = 0;
          row = ++row >= rows ? 0 : row;
        }
      });
      return outerSlides;
    }

    function buildRow(rows, slide, outerSlide) {
      var tag = slide.tagName.toLowerCase() === "li" ? "ul" : "div";
      return create(tag, CLASS_SLIDE_ROW, outerSlide);
    }

    function buildCol(cols, slide, rowSlide) {
      addClass(slide, CLASS_SLIDE_COL);
      append(rowSlide, slide);
      return slide;
    }

    function shouldBuild() {
      if (options.grid) {
        var rows = gridOptions.rows,
          cols = gridOptions.cols,
          dimensions = gridOptions.dimensions;
        return (
          rows > 1 || cols > 1 || (isArray(dimensions) && dimensions.length > 0)
        );
      }

      return false;
    }

    function isActive() {
      return hasClass(Splide2.root, modifier);
    }

    return {
      mount: mount,
      destroy: destroy,
    };
  }

  if (typeof window !== "undefined") {
    window.splide = window.splide || {};
    window.splide.Extensions = window.splide.Extensions || {};
    window.splide.Extensions.Grid = Grid;
  }
});

/*!
 * @splidejs/splide-extension-auto-scroll
 * Version  : 0.5.2
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
(function (factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function () {
  "use strict";

  function empty(array) {
    array.length = 0;
  }

  function slice$1(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply$1(func) {
    return func.bind.apply(func, [null].concat(slice$1(arguments, 1)));
  }

  function raf(func) {
    return requestAnimationFrame(func);
  }

  function typeOf$1(type, subject) {
    return typeof subject === type;
  }

  var isArray$1 = Array.isArray;
  apply$1(typeOf$1, "function");
  apply$1(typeOf$1, "string");
  apply$1(typeOf$1, "undefined");

  function toArray$1(value) {
    return isArray$1(value) ? value : [value];
  }

  function forEach$1(values, iteratee) {
    toArray$1(values).forEach(iteratee);
  }

  var ownKeys$1 = Object.keys;

  function forOwn$1(object, iteratee, right) {
    if (object) {
      var keys = ownKeys$1(object);
      keys = right ? keys.reverse() : keys;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign$1(object) {
    slice$1(arguments, 1).forEach(function (source) {
      forOwn$1(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  var min$1 = Math.min;

  function EventBinder() {
    var listeners = [];

    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function (target, event, namespace) {
        var isEventTarget = "addEventListener" in target;
        var remover = isEventTarget
          ? target.removeEventListener.bind(target, event, callback, options)
          : target["removeListener"].bind(target, callback);
        isEventTarget
          ? target.addEventListener(event, callback, options)
          : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }

    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function (target, event, namespace) {
        listeners = listeners.filter(function (listener) {
          if (
            listener[0] === target &&
            listener[1] === event &&
            listener[2] === namespace &&
            (!callback || listener[3] === callback)
          ) {
            listener[4]();
            return false;
          }

          return true;
        });
      });
    }

    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;

      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles: bubbles,
          detail: detail,
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }

      target.dispatchEvent(e);
      return e;
    }

    function forEachEvent(targets, events, iteratee) {
      forEach$1(targets, function (target) {
        target &&
          forEach$1(events, function (events2) {
            events2.split(" ").forEach(function (eventNS) {
              var fragment = eventNS.split(".");
              iteratee(target, fragment[0], fragment[1]);
            });
          });
      });
    }

    function destroy() {
      listeners.forEach(function (data) {
        data[4]();
      });
      empty(listeners);
    }

    return {
      bind: bind,
      unbind: unbind,
      dispatch: dispatch,
      destroy: destroy,
    };
  }

  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_UPDATED = "updated";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_DESTROY = "destroy";

  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();

    function on(events, callback) {
      binder.bind(bus, toArray$1(events).join(" "), function (e) {
        callback.apply(callback, isArray$1(e.detail) ? e.detail : []);
      });
    }

    function emit(event) {
      binder.dispatch(bus, event, slice$1(arguments, 1));
    }

    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }

    return assign$1(binder, {
      bus: bus,
      on: on,
      off: apply$1(binder.unbind, bus),
      emit: emit,
    });
  }

  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;

    function update() {
      if (!paused) {
        rate = interval ? min$1((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);

        if (rate >= 1) {
          onInterval();
          startTime = now();

          if (limit && ++count >= limit) {
            return pause();
          }
        }

        raf(update);
      }
    }

    function start(resume) {
      !resume && cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      raf(update);
    }

    function pause() {
      paused = true;
    }

    function rewind() {
      startTime = now();
      rate = 0;

      if (onUpdate) {
        onUpdate(rate);
      }
    }

    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }

    function set(time) {
      interval = time;
    }

    function isPaused() {
      return paused;
    }

    return {
      start: start,
      rewind: rewind,
      pause: pause,
      cancel: cancel,
      set: set,
      isPaused: isPaused,
    };
  }

  function Throttle(func, duration) {
    var interval;

    function throttled() {
      if (!interval) {
        interval = RequestInterval(
          duration || 0,
          function () {
            func();
            interval = null;
          },
          null,
          1
        );
        interval.start();
      }
    }

    return throttled;
  }

  var CLASS_ACTIVE = "is-active";
  var SLIDE = "slide";
  var FADE = "fade";

  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }

  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }

  function typeOf(type, subject) {
    return typeof subject === type;
  }

  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }

  var isArray = Array.isArray;
  apply(typeOf, "function");
  apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");

  function isNull(subject) {
    return subject === null;
  }

  function toArray(value) {
    return isArray(value) ? value : [value];
  }

  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }

  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function (name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }

  var ownKeys = Object.keys;

  function forOwn(object, iteratee, right) {
    if (object) {
      var keys = ownKeys(object);
      keys = right ? keys.reverse() : keys;

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }

    return object;
  }

  function assign(object) {
    slice(arguments, 1).forEach(function (source) {
      forOwn(source, function (value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }

  function removeAttribute(elms, attrs) {
    forEach(elms, function (elm) {
      forEach(attrs, function (attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }

  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function (value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function (elm) {
        isNull(value) || value === ""
          ? removeAttribute(elm, attrs)
          : elm.setAttribute(attrs, String(value));
      });
    }
  }

  var min = Math.min,
    max = Math.max,
    floor = Math.floor,
    ceil = Math.ceil,
    abs = Math.abs;

  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }

  var DEFAULTS = {
    speed: 1,
    autoStart: true,
    pauseOnHover: true,
    pauseOnFocus: true,
  };
  var I18N = {
    startScroll: "Start auto scroll",
    pauseScroll: "Pause auto scroll",
  };

  function AutoScroll(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2),
      on = _EventInterface.on,
      off = _EventInterface.off,
      bind = _EventInterface.bind,
      unbind = _EventInterface.unbind;

    var _Components2$Move = Components2.Move,
      translate = _Components2$Move.translate,
      getPosition = _Components2$Move.getPosition,
      toIndex = _Components2$Move.toIndex,
      getLimit = _Components2$Move.getLimit;
    var _Components2$Controll = Components2.Controller,
      setIndex = _Components2$Controll.setIndex,
      getIndex = _Components2$Controll.getIndex;
    var orient = Components2.Direction.orient;
    var toggle = Components2.Elements.toggle;
    var Live = Components2.Live;
    var root = Splide2.root;
    var throttledUpdateArrows = Throttle(Components2.Arrows.update, 500);
    var autoScrollOptions = {};
    var interval;
    var stopped;
    var hovered;
    var focused;
    var busy;
    var currPosition;

    function setup() {
      var autoScroll = options.autoScroll;
      autoScrollOptions = assign(
        {},
        DEFAULTS,
        isObject(autoScroll) ? autoScroll : {}
      );
    }

    function mount() {
      if (!Splide2.is(FADE)) {
        if (!interval && options.autoScroll !== false) {
          interval = RequestInterval(0, move);
          listen();
          autoStart();
        }
      }
    }

    function destroy() {
      if (interval) {
        interval.cancel();
        interval = null;
        currPosition = void 0;
        off([
          EVENT_MOVE,
          EVENT_DRAG,
          EVENT_SCROLL,
          EVENT_MOVED,
          EVENT_SCROLLED,
        ]);
        unbind(root, "mouseenter mouseleave focusin focusout");
        unbind(toggle, "click");
      }
    }

    function listen() {
      if (autoScrollOptions.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function (e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }

      if (autoScrollOptions.pauseOnFocus) {
        bind(root, "focusin focusout", function (e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }

      if (autoScrollOptions.useToggleButton) {
        bind(toggle, "click", function () {
          stopped ? play() : pause();
        });
      }

      on(EVENT_UPDATED, update);
      on([EVENT_MOVE, EVENT_DRAG, EVENT_SCROLL], function () {
        busy = true;
        pause(false);
      });
      on([EVENT_MOVED, EVENT_DRAGGED, EVENT_SCROLLED], function () {
        busy = false;
        autoToggle();
      });
    }

    function update() {
      var autoScroll = options.autoScroll;

      if (autoScroll !== false) {
        autoScrollOptions = assign(
          {},
          autoScrollOptions,
          isObject(autoScroll) ? autoScroll : {}
        );
        mount();
      } else {
        destroy();
      }

      if (interval && !isUndefined(currPosition)) {
        translate(currPosition);
      }
    }

    function autoStart() {
      if (autoScrollOptions.autoStart) {
        if (document.readyState === "complete") {
          play();
        } else {
          bind(window, "load", play);
        }
      }
    }

    function play() {
      if (isPaused()) {
        interval.start(true);
        Live.disable(true);
        focused = hovered = stopped = false;
        updateButton();
      }
    }

    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }

      if (!stopped) {
        stopped = stop;
        updateButton();

        if (!isPaused()) {
          interval.pause();
          Live.disable(false);
        }
      }
    }

    function autoToggle() {
      if (!stopped) {
        hovered || focused || busy ? pause(false) : play();
      }
    }

    function move() {
      var position = getPosition();
      var destination = computeDestination(position);

      if (position !== destination) {
        translate(destination);
        updateIndex((currPosition = getPosition()));
      } else {
        pause(false);

        if (autoScrollOptions.rewind) {
          Splide2.go(
            autoScrollOptions.speed > 0 ? 0 : Components2.Controller.getEnd()
          );
        }
      }

      throttledUpdateArrows();
    }

    function computeDestination(position) {
      var speed = autoScrollOptions.speed || 1;
      position += orient(speed);

      if (Splide2.is(SLIDE)) {
        position = clamp(position, getLimit(false), getLimit(true));
      }

      return position;
    }

    function updateIndex(position) {
      var length = Splide2.length;
      var index = (toIndex(position) + length) % length;

      if (index !== getIndex()) {
        setIndex(index);
        Components2.Slides.update();
        Components2.Pagination.update();
        options.lazyLoad === "nearby" && Components2.LazyLoad.check();
      }
    }

    function updateButton() {
      if (toggle) {
        var key = stopped ? "startScroll" : "pauseScroll";
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(toggle, "aria-label", options.i18n[key] || I18N[key]);
      }
    }

    function isPaused() {
      return !interval || interval.isPaused();
    }

    return {
      setup: setup,
      mount: mount,
      destroy: destroy,
      play: play,
      pause: pause,
      isPaused: isPaused,
    };
  }

  if (typeof window !== "undefined") {
    window.splide = window.splide || {};
    window.splide.Extensions = window.splide.Extensions || {};
    window.splide.Extensions.AutoScroll = AutoScroll;
  }
});
//# sourceMappingURL=splide-extension-auto-scroll.js.map

/**
 * Swiper 11.0.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2024 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: February 5, 2024
 */

var Swiper=function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s,a){void 0===s&&(s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}function n(e){return void 0===e&&(e=""),e.trim().split(" ").filter((e=>!!e.trim()))}function l(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function o(){return Date.now()}function d(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function c(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function p(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let a=1;a<arguments.length;a+=1){const i=a<0||arguments.length<=a?void 0:arguments[a];if(null!=i&&(s=i,!("undefined"!=typeof window&&void 0!==window.HTMLElement?s instanceof HTMLElement:s&&(1===s.nodeType||11===s.nodeType)))){const s=Object.keys(Object(i)).filter((e=>t.indexOf(e)<0));for(let t=0,a=s.length;t<a;t+=1){const a=s[t],r=Object.getOwnPropertyDescriptor(i,a);void 0!==r&&r.enumerable&&(c(e[a])&&c(i[a])?i[a].__swiper__?e[a]=i[a]:p(e[a],i[a]):!c(e[a])&&c(i[a])?(e[a]={},i[a].__swiper__?e[a]=i[a]:p(e[a],i[a])):e[a]=i[a])}}}var s;return e}function u(e,t,s){e.style.setProperty(t,s)}function m(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}function h(e){return e.querySelector(".swiper-slide-transform")||e.shadowRoot&&e.shadowRoot.querySelector(".swiper-slide-transform")||e}function f(e,t){return void 0===t&&(t=""),[...e.children].filter((e=>e.matches(t)))}function g(e){try{return void console.warn(e)}catch(e){}}function v(e,t){void 0===t&&(t=[]);const s=document.createElement(e);return s.classList.add(...Array.isArray(t)?t:n(t)),s}function w(e){const t=r(),s=a(),i=e.getBoundingClientRect(),n=s.body,l=e.clientTop||n.clientTop||0,o=e.clientLeft||n.clientLeft||0,d=e===t?t.scrollY:e.scrollTop,c=e===t?t.scrollX:e.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}function b(e,t){return r().getComputedStyle(e,null).getPropertyValue(t)}function y(e){let t,s=e;if(s){for(t=0;null!==(s=s.previousSibling);)1===s.nodeType&&(t+=1);return t}}function E(e,t){const s=[];let a=e.parentElement;for(;a;)t?a.matches(t)&&s.push(a):s.push(a),a=a.parentElement;return s}function x(e,t){t&&e.addEventListener("transitionend",(function s(a){a.target===e&&(t.call(e,a),e.removeEventListener("transitionend",s))}))}function S(e,t,s){const a=r();return s?e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-left":"margin-bottom")):e.offsetWidth}function T(e){return(Array.isArray(e)?e:[e]).filter((e=>!!e))}let M,C,P;function L(){return M||(M=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&t.documentElement.style&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)}}()),M}function I(e){return void 0===e&&(e={}),C||(C=function(e){let{userAgent:t}=void 0===e?{}:e;const s=L(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),m=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),h="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!h&&(l.os="android",l.android=!0),(p||m||u)&&(l.os="ios",l.ios=!0),l}(e)),C}function A(){return P||(P=function(){const e=r(),t=I();let s=!1;function a(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}if(a()){const t=String(e.navigator.userAgent);if(t.includes("Version/")){const[e,a]=t.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));s=e<16||16===e&&a<2}}const i=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),n=a();return{isSafari:s||n,needPerspectiveFix:s,need3dFix:n||i&&t.ios,isWebView:i}}()),P}var z={on(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};const $=(e,t)=>{if(!e||e.destroyed||!e.params)return;const s=t.closest(e.isElement?"swiper-slide":`.${e.params.slideClass}`);if(s){let t=s.querySelector(`.${e.params.lazyPreloaderClass}`);!t&&e.isElement&&(s.shadowRoot?t=s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`):requestAnimationFrame((()=>{s.shadowRoot&&(t=s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),t&&t.remove())}))),t&&t.remove()}},k=(e,t)=>{if(!e.slides[t])return;const s=e.slides[t].querySelector('[loading="lazy"]');s&&s.removeAttribute("loading")},O=e=>{if(!e||e.destroyed||!e.params)return;let t=e.params.lazyPreloadPrevNext;const s=e.slides.length;if(!s||!t||t<0)return;t=Math.min(t,s);const a="auto"===e.params.slidesPerView?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),i=e.activeIndex;if(e.params.grid&&e.params.grid.rows>1){const s=i,r=[s-t];return r.push(...Array.from({length:t}).map(((e,t)=>s+a+t))),void e.slides.forEach(((t,s)=>{r.includes(t.column)&&k(e,s)}))}const r=i+a-1;if(e.params.rewind||e.params.loop)for(let a=i-t;a<=r+t;a+=1){const t=(a%s+s)%s;(t<i||t>r)&&k(e,t)}else for(let a=Math.max(i-t,0);a<=Math.min(r+t,s-1);a+=1)a!==i&&(a>r||a<i)&&k(e,a)};var D={updateSize:function(){const e=this;let t,s;const a=e.el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a.clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a.clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(b(a,"padding-left")||0,10)-parseInt(b(a,"padding-right")||0,10),s=s-parseInt(b(a,"padding-top")||0,10)-parseInt(b(a,"padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t,s){return parseFloat(t.getPropertyValue(e.getDirectionLabel(s))||0)}const s=e.params,{wrapperEl:a,slidesEl:i,size:r,rtlTranslate:n,wrongRTL:l}=e,o=e.virtual&&s.virtual.enabled,d=o?e.virtual.slides.length:e.slides.length,c=f(i,`.${e.params.slideClass}, swiper-slide`),p=o?e.virtual.slides.length:c.length;let m=[];const h=[],g=[];let v=s.slidesOffsetBefore;"function"==typeof v&&(v=s.slidesOffsetBefore.call(e));let w=s.slidesOffsetAfter;"function"==typeof w&&(w=s.slidesOffsetAfter.call(e));const y=e.snapGrid.length,E=e.slidesGrid.length;let x=s.spaceBetween,T=-v,M=0,C=0;if(void 0===r)return;"string"==typeof x&&x.indexOf("%")>=0?x=parseFloat(x.replace("%",""))/100*r:"string"==typeof x&&(x=parseFloat(x)),e.virtualSize=-x,c.forEach((e=>{n?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop=""})),s.centeredSlides&&s.cssMode&&(u(a,"--swiper-centered-offset-before",""),u(a,"--swiper-centered-offset-after",""));const P=s.grid&&s.grid.rows>1&&e.grid;let L;P?e.grid.initSlides(c):e.grid&&e.grid.unsetSlides();const I="auto"===s.slidesPerView&&s.breakpoints&&Object.keys(s.breakpoints).filter((e=>void 0!==s.breakpoints[e].slidesPerView)).length>0;for(let a=0;a<p;a+=1){let i;if(L=0,c[a]&&(i=c[a]),P&&e.grid.updateSlide(a,i,c),!c[a]||"none"!==b(i,"display")){if("auto"===s.slidesPerView){I&&(c[a].style[e.getDirectionLabel("width")]="");const r=getComputedStyle(i),n=i.style.transform,l=i.style.webkitTransform;if(n&&(i.style.transform="none"),l&&(i.style.webkitTransform="none"),s.roundLengths)L=e.isHorizontal()?S(i,"width",!0):S(i,"height",!0);else{const e=t(r,"width"),s=t(r,"padding-left"),a=t(r,"padding-right"),n=t(r,"margin-left"),l=t(r,"margin-right"),o=r.getPropertyValue("box-sizing");if(o&&"border-box"===o)L=e+n+l;else{const{clientWidth:t,offsetWidth:r}=i;L=e+s+a+n+l+(r-t)}}n&&(i.style.transform=n),l&&(i.style.webkitTransform=l),s.roundLengths&&(L=Math.floor(L))}else L=(r-(s.slidesPerView-1)*x)/s.slidesPerView,s.roundLengths&&(L=Math.floor(L)),c[a]&&(c[a].style[e.getDirectionLabel("width")]=`${L}px`);c[a]&&(c[a].swiperSlideSize=L),g.push(L),s.centeredSlides?(T=T+L/2+M/2+x,0===M&&0!==a&&(T=T-r/2-x),0===a&&(T=T-r/2-x),Math.abs(T)<.001&&(T=0),s.roundLengths&&(T=Math.floor(T)),C%s.slidesPerGroup==0&&m.push(T),h.push(T)):(s.roundLengths&&(T=Math.floor(T)),(C-Math.min(e.params.slidesPerGroupSkip,C))%e.params.slidesPerGroup==0&&m.push(T),h.push(T),T=T+L+x),e.virtualSize+=L+x,M=L,C+=1}}if(e.virtualSize=Math.max(e.virtualSize,r)+w,n&&l&&("slide"===s.effect||"coverflow"===s.effect)&&(a.style.width=`${e.virtualSize+x}px`),s.setWrapperSize&&(a.style[e.getDirectionLabel("width")]=`${e.virtualSize+x}px`),P&&e.grid.updateWrapperSize(L,m),!s.centeredSlides){const t=[];for(let a=0;a<m.length;a+=1){let i=m[a];s.roundLengths&&(i=Math.floor(i)),m[a]<=e.virtualSize-r&&t.push(i)}m=t,Math.floor(e.virtualSize-r)-Math.floor(m[m.length-1])>1&&m.push(e.virtualSize-r)}if(o&&s.loop){const t=g[0]+x;if(s.slidesPerGroup>1){const a=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/s.slidesPerGroup),i=t*s.slidesPerGroup;for(let e=0;e<a;e+=1)m.push(m[m.length-1]+i)}for(let a=0;a<e.virtual.slidesBefore+e.virtual.slidesAfter;a+=1)1===s.slidesPerGroup&&m.push(m[m.length-1]+t),h.push(h[h.length-1]+t),e.virtualSize+=t}if(0===m.length&&(m=[0]),0!==x){const t=e.isHorizontal()&&n?"marginLeft":e.getDirectionLabel("marginRight");c.filter(((e,t)=>!(s.cssMode&&!s.loop)||t!==c.length-1)).forEach((e=>{e.style[t]=`${x}px`}))}if(s.centeredSlides&&s.centeredSlidesBounds){let e=0;g.forEach((t=>{e+=t+(x||0)})),e-=x;const t=e-r;m=m.map((e=>e<=0?-v:e>t?t+w:e))}if(s.centerInsufficientSlides){let e=0;if(g.forEach((t=>{e+=t+(x||0)})),e-=x,e<r){const t=(r-e)/2;m.forEach(((e,s)=>{m[s]=e-t})),h.forEach(((e,s)=>{h[s]=e+t}))}}if(Object.assign(e,{slides:c,snapGrid:m,slidesGrid:h,slidesSizesGrid:g}),s.centeredSlides&&s.cssMode&&!s.centeredSlidesBounds){u(a,"--swiper-centered-offset-before",-m[0]+"px"),u(a,"--swiper-centered-offset-after",e.size/2-g[g.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(p!==d&&e.emit("slidesLengthChange"),m.length!==y&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),h.length!==E&&e.emit("slidesGridLengthChange"),s.watchSlidesProgress&&e.updateSlidesOffset(),e.emit("slidesUpdated"),!(o||s.cssMode||"slide"!==s.effect&&"fade"!==s.effect)){const t=`${s.containerModifierClass}backface-hidden`,a=e.el.classList.contains(t);p<=s.maxBackfaceHiddenSlides?a||e.el.classList.add(t):a&&e.el.classList.remove(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.slides[t.getSlideIndexByData(e)]:t.slides[e];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&(t.wrapperEl.style.height=`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let a=0;a<t.length;a+=1)t[a].swiperSlideOffset=(e.isHorizontal()?t[a].offsetLeft:t[a].offsetTop)-s-e.cssOverflowAdjustment()},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.forEach((e=>{e.classList.remove(s.slideVisibleClass,s.slideFullyVisibleClass)})),t.visibleSlidesIndexes=[],t.visibleSlides=[];let l=s.spaceBetween;"string"==typeof l&&l.indexOf("%")>=0?l=parseFloat(l.replace("%",""))/100*t.size:"string"==typeof l&&(l=parseFloat(l));for(let e=0;e<a.length;e+=1){const o=a[e];let d=o.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(d-=a[0].swiperSlideOffset);const c=(n+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),p=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-d)/(o.swiperSlideSize+l),u=-(n-d),m=u+t.slidesSizesGrid[e],h=u>=0&&u<=t.size-t.slidesSizesGrid[e];(u>=0&&u<t.size-1||m>1&&m<=t.size||u<=0&&m>=t.size)&&(t.visibleSlides.push(o),t.visibleSlidesIndexes.push(e),a[e].classList.add(s.slideVisibleClass)),h&&a[e].classList.add(s.slideFullyVisibleClass),o.progress=i?-c:c,o.originalProgress=i?-p:p}},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n,progressLoop:l}=t;const o=r,d=n;if(0===a)i=0,r=!0,n=!0;else{i=(e-t.minTranslate())/a;const s=Math.abs(e-t.minTranslate())<1,l=Math.abs(e-t.maxTranslate())<1;r=s||i<=0,n=l||i>=1,s&&(i=0),l&&(i=1)}if(s.loop){const s=t.getSlideIndexByData(0),a=t.getSlideIndexByData(t.slides.length-1),i=t.slidesGrid[s],r=t.slidesGrid[a],n=t.slidesGrid[t.slidesGrid.length-1],o=Math.abs(e);l=o>=i?(o-i)/n:(o+n-r)/n,l>1&&(l-=1)}Object.assign(t,{progress:i,progressLoop:l,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!o&&t.emit("reachBeginning toEdge"),n&&!d&&t.emit("reachEnd toEdge"),(o&&!r||d&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,slidesEl:a,activeIndex:i}=e,r=e.virtual&&s.virtual.enabled,n=e.grid&&s.grid&&s.grid.rows>1,l=e=>f(a,`.${s.slideClass}${e}, swiper-slide${e}`)[0];let o,d,c;if(t.forEach((e=>{e.classList.remove(s.slideActiveClass,s.slideNextClass,s.slidePrevClass)})),r)if(s.loop){let t=i-e.virtual.slidesBefore;t<0&&(t=e.virtual.slides.length+t),t>=e.virtual.slides.length&&(t-=e.virtual.slides.length),o=l(`[data-swiper-slide-index="${t}"]`)}else o=l(`[data-swiper-slide-index="${i}"]`);else n?(o=t.filter((e=>e.column===i))[0],c=t.filter((e=>e.column===i+1))[0],d=t.filter((e=>e.column===i-1))[0]):o=t[i];o&&(o.classList.add(s.slideActiveClass),n?(c&&c.classList.add(s.slideNextClass),d&&d.classList.add(s.slidePrevClass)):(c=function(e,t){const s=[];for(;e.nextElementSibling;){const a=e.nextElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(o,`.${s.slideClass}, swiper-slide`)[0],s.loop&&!c&&(c=t[0]),c&&c.classList.add(s.slideNextClass),d=function(e,t){const s=[];for(;e.previousElementSibling;){const a=e.previousElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(o,`.${s.slideClass}, swiper-slide`)[0],s.loop&&0===!d&&(d=t[t.length-1]),d&&d.classList.add(s.slidePrevClass))),e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{snapGrid:a,params:i,activeIndex:r,realIndex:n,snapIndex:l}=t;let o,d=e;const c=e=>{let s=e-t.virtual.slidesBefore;return s<0&&(s=t.virtual.slides.length+s),s>=t.virtual.slides.length&&(s-=t.virtual.slides.length),s};if(void 0===d&&(d=function(e){const{slidesGrid:t,params:s}=e,a=e.rtlTranslate?e.translate:-e.translate;let i;for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?a>=t[e]&&a<t[e+1]-(t[e+1]-t[e])/2?i=e:a>=t[e]&&a<t[e+1]&&(i=e+1):a>=t[e]&&(i=e);return s.normalizeSlideIndex&&(i<0||void 0===i)&&(i=0),i}(t)),a.indexOf(s)>=0)o=a.indexOf(s);else{const e=Math.min(i.slidesPerGroupSkip,d);o=e+Math.floor((d-e)/i.slidesPerGroup)}if(o>=a.length&&(o=a.length-1),d===r&&!t.params.loop)return void(o!==l&&(t.snapIndex=o,t.emit("snapIndexChange")));if(d===r&&t.params.loop&&t.virtual&&t.params.virtual.enabled)return void(t.realIndex=c(d));const p=t.grid&&i.grid&&i.grid.rows>1;let u;if(t.virtual&&i.virtual.enabled&&i.loop)u=c(d);else if(p){const e=t.slides.filter((e=>e.column===d))[0];let s=parseInt(e.getAttribute("data-swiper-slide-index"),10);Number.isNaN(s)&&(s=Math.max(t.slides.indexOf(e),0)),u=Math.floor(s/i.grid.rows)}else if(t.slides[d]){const e=t.slides[d].getAttribute("data-swiper-slide-index");u=e?parseInt(e,10):d}else u=d;Object.assign(t,{previousSnapIndex:l,snapIndex:o,previousRealIndex:n,realIndex:u,previousIndex:r,activeIndex:d}),t.initialized&&O(t),t.emit("activeIndexChange"),t.emit("snapIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&(n!==u&&t.emit("realIndexChange"),t.emit("slideChange"))},updateClickedSlide:function(e,t){const s=this,a=s.params;let i=e.closest(`.${a.slideClass}, swiper-slide`);!i&&s.isElement&&t&&t.length>1&&t.includes(e)&&[...t.slice(t.indexOf(e)+1,t.length)].forEach((e=>{!i&&e.matches&&e.matches(`.${a.slideClass}, swiper-slide`)&&(i=e)}));let r,n=!1;if(i)for(let e=0;e<s.slides.length;e+=1)if(s.slides[e]===i){n=!0,r=e;break}if(!i||!n)return s.clickedSlide=void 0,void(s.clickedIndex=void 0);s.clickedSlide=i,s.virtual&&s.params.virtual.enabled?s.clickedIndex=parseInt(i.getAttribute("data-swiper-slide-index"),10):s.clickedIndex=r,a.slideToClickedSlide&&void 0!==s.clickedIndex&&s.clickedIndex!==s.activeIndex&&s.slideToClickedSlide()}};var G={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=d(i,e);return r+=this.cssOverflowAdjustment(),s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,wrapperEl:r,progress:n}=s;let l,o=0,d=0;s.isHorizontal()?o=a?-e:e:d=e,i.roundLengths&&(o=Math.floor(o),d=Math.floor(d)),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?o:d,i.cssMode?r[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-o:-d:i.virtualTranslate||(s.isHorizontal()?o-=s.cssOverflowAdjustment():d-=s.cssOverflowAdjustment(),r.style.transform=`translate3d(${o}px, ${d}px, 0px)`);const c=s.maxTranslate()-s.minTranslate();l=0===c?0:(e-s.minTranslate())/c,l!==n&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return m({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.wrapperEl.addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd))),!0}};function N(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var H={slideTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e&&(e=parseInt(e,10));const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:f}=r;if(r.animating&&l.preventInteractionOnTransition||!f&&!a&&!i||r.destroyed)return!1;const g=Math.min(r.params.slidesPerGroupSkip,n);let v=g+Math.floor((n-g)/r.params.slidesPerGroup);v>=o.length&&(v=o.length-1);const w=-o[v];if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*w),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&(u?w>r.translate&&w>r.minTranslate():w<r.translate&&w<r.minTranslate()))return!1;if(!r.allowSlidePrev&&w>r.translate&&w>r.maxTranslate()&&(p||0)!==n)return!1}let b;if(n!==(c||0)&&s&&r.emit("beforeSlideChangeStart"),r.updateProgress(w),b=n>p?"next":n<p?"prev":"reset",u&&-w===r.translate||!u&&w===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(w),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?w:-w;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),t&&!r._cssModeVirtualInitialSet&&r.params.initialSlide>0?(r._cssModeVirtualInitialSet=!0,requestAnimationFrame((()=>{h[e?"scrollLeft":"scrollTop"]=s}))):h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._immediateVirtual=!1}))}else{if(!r.support.smoothScroll)return m({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(w),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.wrapperEl.addEventListener("transitionend",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e){e=parseInt(e,10)}const i=this;if(i.destroyed)return;const r=i.grid&&i.params.grid&&i.params.grid.rows>1;let n=e;if(i.params.loop)if(i.virtual&&i.params.virtual.enabled)n+=i.virtual.slidesBefore;else{let e;if(r){const t=n*i.params.grid.rows;e=i.slides.filter((e=>1*e.getAttribute("data-swiper-slide-index")===t))[0].column}else e=i.getSlideIndexByData(n);const t=r?Math.ceil(i.slides.length/i.params.grid.rows):i.slides.length,{centeredSlides:s}=i.params;let a=i.params.slidesPerView;"auto"===a?a=i.slidesPerViewDynamic():(a=Math.ceil(parseFloat(i.params.slidesPerView,10)),s&&a%2==0&&(a+=1));let l=t-e<a;if(s&&(l=l||e<Math.ceil(a/2)),l){const a=s?e<i.activeIndex?"prev":"next":e-i.activeIndex-1<i.params.slidesPerView?"next":"prev";i.loopFix({direction:a,slideTo:!0,activeSlideIndex:"next"===a?e+1:e-t+1,slideRealIndex:"next"===a?i.realIndex:void 0})}if(r){const e=n*i.params.grid.rows;n=i.slides.filter((t=>1*t.getAttribute("data-swiper-slide-index")===e))[0].column}else n=i.getSlideIndexByData(n)}return requestAnimationFrame((()=>{i.slideTo(n,t,s,a)})),i},slideNext:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{enabled:i,params:r,animating:n}=a;if(!i||a.destroyed)return a;let l=r.slidesPerGroup;"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<r.slidesPerGroupSkip?1:l,d=a.virtual&&r.virtual.enabled;if(r.loop){if(n&&!d&&r.loopPreventsSliding)return!1;if(a.loopFix({direction:"next"}),a._clientLeft=a.wrapperEl.clientLeft,a.activeIndex===a.slides.length-1&&r.cssMode)return requestAnimationFrame((()=>{a.slideTo(a.activeIndex+o,e,t,s)})),!0}return r.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{params:i,snapGrid:r,slidesGrid:n,rtlTranslate:l,enabled:o,animating:d}=a;if(!o||a.destroyed)return a;const c=a.virtual&&i.virtual.enabled;if(i.loop){if(d&&!c&&i.loopPreventsSliding)return!1;a.loopFix({direction:"prev"}),a._clientLeft=a.wrapperEl.clientLeft}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const u=p(l?a.translate:-a.translate),m=r.map((e=>p(e)));let h=r[m.indexOf(u)-1];if(void 0===h&&i.cssMode){let e;r.forEach(((t,s)=>{u>=t&&(e=s)})),void 0!==e&&(h=r[e>0?e-1:e])}let f=0;if(void 0!==h&&(f=n.indexOf(h),f<0&&(f=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(f=f-a.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return i.loop&&0===a.activeIndex&&i.cssMode?(requestAnimationFrame((()=>{a.slideTo(f,e,t,s)})),!0):a.slideTo(f,e,t,s)},slideReset:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this;if(!a.destroyed)return a.slideTo(a.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;if(i.destroyed)return;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this;if(e.destroyed)return;const{params:t,slidesEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;const n=e.isElement?"swiper-slide":`.${t.slideClass}`;if(t.loop){if(e.animating)return;i=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=e.getSlideIndex(f(s,`${n}[data-swiper-slide-index="${i}"]`)[0]),l((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=e.getSlideIndex(f(s,`${n}[data-swiper-slide-index="${i}"]`)[0]),l((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var X={loopCreate:function(e){const t=this,{params:s,slidesEl:a}=t;if(!s.loop||t.virtual&&t.params.virtual.enabled)return;const i=()=>{f(a,`.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t)}))},r=t.grid&&s.grid&&s.grid.rows>1,n=s.slidesPerGroup*(r?s.grid.rows:1),l=t.slides.length%n!=0,o=r&&t.slides.length%s.grid.rows!=0,d=e=>{for(let a=0;a<e;a+=1){const e=t.isElement?v("swiper-slide",[s.slideBlankClass]):v("div",[s.slideClass,s.slideBlankClass]);t.slidesEl.append(e)}};if(l){if(s.loopAddBlankSlides){d(n-t.slides.length%n),t.recalcSlides(),t.updateSlides()}else g("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");i()}else if(o){if(s.loopAddBlankSlides){d(s.grid.rows-t.slides.length%s.grid.rows),t.recalcSlides(),t.updateSlides()}else g("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");i()}else i();t.loopFix({slideRealIndex:e,direction:s.centeredSlides?void 0:"next"})},loopFix:function(e){let{slideRealIndex:t,slideTo:s=!0,direction:a,setTranslate:i,activeSlideIndex:r,byController:n,byMousewheel:l}=void 0===e?{}:e;const o=this;if(!o.params.loop)return;o.emit("beforeLoopFix");const{slides:d,allowSlidePrev:c,allowSlideNext:p,slidesEl:u,params:m}=o,{centeredSlides:h}=m;if(o.allowSlidePrev=!0,o.allowSlideNext=!0,o.virtual&&m.virtual.enabled)return s&&(m.centeredSlides||0!==o.snapIndex?m.centeredSlides&&o.snapIndex<m.slidesPerView?o.slideTo(o.virtual.slides.length+o.snapIndex,0,!1,!0):o.snapIndex===o.snapGrid.length-1&&o.slideTo(o.virtual.slidesBefore,0,!1,!0):o.slideTo(o.virtual.slides.length,0,!1,!0)),o.allowSlidePrev=c,o.allowSlideNext=p,void o.emit("loopFix");let f=m.slidesPerView;"auto"===f?f=o.slidesPerViewDynamic():(f=Math.ceil(parseFloat(m.slidesPerView,10)),h&&f%2==0&&(f+=1));const v=m.slidesPerGroupAuto?f:m.slidesPerGroup;let w=v;w%v!=0&&(w+=v-w%v),w+=m.loopAdditionalSlides,o.loopedSlides=w;const b=o.grid&&m.grid&&m.grid.rows>1;d.length<f+w?g("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"):b&&"row"===m.grid.fill&&g("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");const y=[],E=[];let x=o.activeIndex;void 0===r?r=o.getSlideIndex(d.filter((e=>e.classList.contains(m.slideActiveClass)))[0]):x=r;const S="next"===a||!a,T="prev"===a||!a;let M=0,C=0;const P=b?Math.ceil(d.length/m.grid.rows):d.length,L=(b?d[r].column:r)+(h&&void 0===i?-f/2+.5:0);if(L<w){M=Math.max(w-L,v);for(let e=0;e<w-L;e+=1){const t=e-Math.floor(e/P)*P;if(b){const e=P-t-1;for(let t=d.length-1;t>=0;t-=1)d[t].column===e&&y.push(t)}else y.push(P-t-1)}}else if(L+f>P-w){C=Math.max(L-(P-2*w),v);for(let e=0;e<C;e+=1){const t=e-Math.floor(e/P)*P;b?d.forEach(((e,s)=>{e.column===t&&E.push(s)})):E.push(t)}}if(o.__preventObserver__=!0,requestAnimationFrame((()=>{o.__preventObserver__=!1})),T&&y.forEach((e=>{d[e].swiperLoopMoveDOM=!0,u.prepend(d[e]),d[e].swiperLoopMoveDOM=!1})),S&&E.forEach((e=>{d[e].swiperLoopMoveDOM=!0,u.append(d[e]),d[e].swiperLoopMoveDOM=!1})),o.recalcSlides(),"auto"===m.slidesPerView?o.updateSlides():b&&(y.length>0&&T||E.length>0&&S)&&o.slides.forEach(((e,t)=>{o.grid.updateSlide(t,e,o.slides)})),m.watchSlidesProgress&&o.updateSlidesOffset(),s)if(y.length>0&&T){if(void 0===t){const e=o.slidesGrid[x],t=o.slidesGrid[x+M]-e;l?o.setTranslate(o.translate-t):(o.slideTo(x+M,0,!1,!0),i&&(o.touchEventsData.startTranslate=o.touchEventsData.startTranslate-t,o.touchEventsData.currentTranslate=o.touchEventsData.currentTranslate-t))}else if(i){const e=b?y.length/m.grid.rows:y.length;o.slideTo(o.activeIndex+e,0,!1,!0),o.touchEventsData.currentTranslate=o.translate}}else if(E.length>0&&S)if(void 0===t){const e=o.slidesGrid[x],t=o.slidesGrid[x-C]-e;l?o.setTranslate(o.translate-t):(o.slideTo(x-C,0,!1,!0),i&&(o.touchEventsData.startTranslate=o.touchEventsData.startTranslate-t,o.touchEventsData.currentTranslate=o.touchEventsData.currentTranslate-t))}else{const e=b?E.length/m.grid.rows:E.length;o.slideTo(o.activeIndex-e,0,!1,!0)}if(o.allowSlidePrev=c,o.allowSlideNext=p,o.controller&&o.controller.control&&!n){const e={slideRealIndex:t,direction:a,setTranslate:i,activeSlideIndex:r,byController:!0};Array.isArray(o.controller.control)?o.controller.control.forEach((t=>{!t.destroyed&&t.params.loop&&t.loopFix({...e,slideTo:t.params.slidesPerView===m.slidesPerView&&s})})):o.controller.control instanceof o.constructor&&o.controller.control.params.loop&&o.controller.control.loopFix({...e,slideTo:o.controller.control.params.slidesPerView===m.slidesPerView&&s})}o.emit("loopFix")},loopDestroy:function(){const e=this,{params:t,slidesEl:s}=e;if(!t.loop||e.virtual&&e.params.virtual.enabled)return;e.recalcSlides();const a=[];e.slides.forEach((e=>{const t=void 0===e.swiperSlideIndex?1*e.getAttribute("data-swiper-slide-index"):e.swiperSlideIndex;a[t]=e})),e.slides.forEach((e=>{e.removeAttribute("data-swiper-slide-index")})),a.forEach((e=>{s.append(e)})),e.recalcSlides(),e.slideTo(e.realIndex,0)}};function Y(e,t,s){const a=r(),{params:i}=e,n=i.edgeSwipeDetection,l=i.edgeSwipeThreshold;return!n||!(s<=l||s>=a.innerWidth-l)||"prevent"===n&&(t.preventDefault(),!0)}function B(e){const t=this,s=a();let i=e;i.originalEvent&&(i=i.originalEvent);const n=t.touchEventsData;if("pointerdown"===i.type){if(null!==n.pointerId&&n.pointerId!==i.pointerId)return;n.pointerId=i.pointerId}else"touchstart"===i.type&&1===i.targetTouches.length&&(n.touchId=i.targetTouches[0].identifier);if("touchstart"===i.type)return void Y(t,i,i.targetTouches[0].pageX);const{params:l,touches:d,enabled:c}=t;if(!c)return;if(!l.simulateTouch&&"mouse"===i.pointerType)return;if(t.animating&&l.preventInteractionOnTransition)return;!t.animating&&l.cssMode&&l.loop&&t.loopFix();let p=i.target;if("wrapper"===l.touchEventsTarget&&!t.wrapperEl.contains(p))return;if("which"in i&&3===i.which)return;if("button"in i&&i.button>0)return;if(n.isTouched&&n.isMoved)return;const u=!!l.noSwipingClass&&""!==l.noSwipingClass,m=i.composedPath?i.composedPath():i.path;u&&i.target&&i.target.shadowRoot&&m&&(p=m[0]);const h=l.noSwipingSelector?l.noSwipingSelector:`.${l.noSwipingClass}`,f=!(!i.target||!i.target.shadowRoot);if(l.noSwiping&&(f?function(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===a()||s===r())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}(h,p):p.closest(h)))return void(t.allowClick=!0);if(l.swipeHandler&&!p.closest(l.swipeHandler))return;d.currentX=i.pageX,d.currentY=i.pageY;const g=d.currentX,v=d.currentY;if(!Y(t,i,g))return;Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),d.startX=g,d.startY=v,n.touchStartTime=o(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,l.threshold>0&&(n.allowThresholdMove=!1);let w=!0;p.matches(n.focusableElements)&&(w=!1,"SELECT"===p.nodeName&&(n.isTouched=!1)),s.activeElement&&s.activeElement.matches(n.focusableElements)&&s.activeElement!==p&&s.activeElement.blur();const b=w&&t.allowTouchMove&&l.touchStartPreventDefault;!l.touchStartForcePreventDefault&&!b||p.isContentEditable||i.preventDefault(),l.freeMode&&l.freeMode.enabled&&t.freeMode&&t.animating&&!l.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",i)}function R(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:l,enabled:d}=s;if(!d)return;if(!r.simulateTouch&&"mouse"===e.pointerType)return;let c,p=e;if(p.originalEvent&&(p=p.originalEvent),"pointermove"===p.type){if(null!==i.touchId)return;if(p.pointerId!==i.pointerId)return}if("touchmove"===p.type){if(c=[...p.changedTouches].filter((e=>e.identifier===i.touchId))[0],!c||c.identifier!==i.touchId)return}else c=p;if(!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",p));const u=c.pageX,m=c.pageY;if(p.preventedByNestedSwiper)return n.startX=u,void(n.startY=m);if(!s.allowTouchMove)return p.target.matches(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:u,startY:m,currentX:u,currentY:m}),i.touchStartTime=o()));if(r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(m<n.startY&&s.translate<=s.maxTranslate()||m>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(u<n.startX&&s.translate<=s.maxTranslate()||u>n.startX&&s.translate>=s.minTranslate())return;if(t.activeElement&&p.target===t.activeElement&&p.target.matches(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);i.allowTouchCallbacks&&s.emit("touchMove",p),n.previousX=n.currentX,n.previousY=n.currentY,n.currentX=u,n.currentY=m;const h=n.currentX-n.startX,f=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(h**2+f**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:h*h+f*f>=25&&(e=180*Math.atan2(Math.abs(f),Math.abs(h))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",p),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&p.cancelable&&p.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&p.stopPropagation();let g=s.isHorizontal()?h:f,v=s.isHorizontal()?n.currentX-n.previousX:n.currentY-n.previousY;r.oneWayMovement&&(g=Math.abs(g)*(l?1:-1),v=Math.abs(v)*(l?1:-1)),n.diff=g,g*=r.touchRatio,l&&(g=-g,v=-v);const w=s.touchesDirection;s.swipeDirection=g>0?"prev":"next",s.touchesDirection=v>0?"prev":"next";const b=s.params.loop&&!r.cssMode,y="next"===s.touchesDirection&&s.allowSlideNext||"prev"===s.touchesDirection&&s.allowSlidePrev;if(!i.isMoved){if(b&&y&&s.loopFix({direction:s.swipeDirection}),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});s.wrapperEl.dispatchEvent(e)}i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",p)}if((new Date).getTime(),i.isMoved&&i.allowThresholdMove&&w!==s.touchesDirection&&b&&y&&Math.abs(g)>=1)return Object.assign(n,{startX:u,startY:m,currentX:u,currentY:m,startTranslate:i.currentTranslate}),i.loopSwapReset=!0,void(i.startTranslate=i.currentTranslate);s.emit("sliderMove",p),i.isMoved=!0,i.currentTranslate=g+i.startTranslate;let E=!0,x=r.resistanceRatio;if(r.touchReleaseOnEdges&&(x=0),g>0?(b&&y&&i.allowThresholdMove&&i.currentTranslate>(r.centeredSlides?s.minTranslate()-s.slidesSizesGrid[s.activeIndex+1]:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>s.minTranslate()&&(E=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+g)**x))):g<0&&(b&&y&&i.allowThresholdMove&&i.currentTranslate<(r.centeredSlides?s.maxTranslate()+s.slidesSizesGrid[s.slidesSizesGrid.length-1]:s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-("auto"===r.slidesPerView?s.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<s.maxTranslate()&&(E=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-g)**x))),E&&(p.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(g)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),r.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function F(e){const t=this,s=t.touchEventsData;let a,i=e;i.originalEvent&&(i=i.originalEvent);if("touchend"===i.type||"touchcancel"===i.type){if(a=[...i.changedTouches].filter((e=>e.identifier===s.touchId))[0],!a||a.identifier!==s.touchId)return}else{if(null!==s.touchId)return;if(i.pointerId!==s.pointerId)return;a=i}if(["pointercancel","pointerout","pointerleave","contextmenu"].includes(i.type)){if(!(["pointercancel","contextmenu"].includes(i.type)&&(t.browser.isSafari||t.browser.isWebView)))return}s.pointerId=null,s.touchId=null;const{params:r,touches:n,rtlTranslate:d,slidesGrid:c,enabled:p}=t;if(!p)return;if(!r.simulateTouch&&"mouse"===i.pointerType)return;if(s.allowTouchCallbacks&&t.emit("touchEnd",i),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&r.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);r.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const u=o(),m=u-s.touchStartTime;if(t.allowClick){const e=i.path||i.composedPath&&i.composedPath();t.updateClickedSlide(e&&e[0]||i.target,e),t.emit("tap click",i),m<300&&u-s.lastClickTime<300&&t.emit("doubleTap doubleClick",i)}if(s.lastClickTime=o(),l((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===n.diff&&!s.loopSwapReset||s.currentTranslate===s.startTranslate&&!s.loopSwapReset)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=r.followFinger?d?t.translate:-t.translate:-s.currentTranslate,r.cssMode)return;if(r.freeMode&&r.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});const f=h>=-t.maxTranslate()&&!t.params.loop;let g=0,v=t.slidesSizesGrid[0];for(let e=0;e<c.length;e+=e<r.slidesPerGroupSkip?1:r.slidesPerGroup){const t=e<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;void 0!==c[e+t]?(f||h>=c[e]&&h<c[e+t])&&(g=e,v=c[e+t]-c[e]):(f||h>=c[e])&&(g=e,v=c[c.length-1]-c[c.length-2])}let w=null,b=null;r.rewind&&(t.isBeginning?b=r.virtual&&r.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(w=0));const y=(h-c[g])/v,E=g<r.slidesPerGroupSkip-1?1:r.slidesPerGroup;if(m>r.longSwipesMs){if(!r.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(y>=r.longSwipesRatio?t.slideTo(r.rewind&&t.isEnd?w:g+E):t.slideTo(g)),"prev"===t.swipeDirection&&(y>1-r.longSwipesRatio?t.slideTo(g+E):null!==b&&y<0&&Math.abs(y)>r.longSwipesRatio?t.slideTo(b):t.slideTo(g))}else{if(!r.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(i.target===t.navigation.nextEl||i.target===t.navigation.prevEl)?i.target===t.navigation.nextEl?t.slideTo(g+E):t.slideTo(g):("next"===t.swipeDirection&&t.slideTo(null!==w?w:g+E),"prev"===t.swipeDirection&&t.slideTo(null!==b?b:g))}}function q(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e,n=e.virtual&&e.params.virtual.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const l=n&&t.loop;!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||l?e.params.loop&&!n?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0):e.slideTo(e.slides.length-1,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(e.autoplay.resizeTimeout),e.autoplay.resizeTimeout=setTimeout((()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()}),500)),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function V(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function _(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}function j(e){const t=this;$(t,e.target),t.params.cssMode||"auto"!==t.params.slidesPerView&&!t.params.autoHeight||t.update()}function W(){const e=this;e.documentTouchHandlerProceeded||(e.documentTouchHandlerProceeded=!0,e.params.touchReleaseOnEdges&&(e.el.style.touchAction="auto"))}const U=(e,t)=>{const s=a(),{params:i,el:r,wrapperEl:n,device:l}=e,o=!!i.nested,d="on"===t?"addEventListener":"removeEventListener",c=t;s[d]("touchstart",e.onDocumentTouchStart,{passive:!1,capture:o}),r[d]("touchstart",e.onTouchStart,{passive:!1}),r[d]("pointerdown",e.onTouchStart,{passive:!1}),s[d]("touchmove",e.onTouchMove,{passive:!1,capture:o}),s[d]("pointermove",e.onTouchMove,{passive:!1,capture:o}),s[d]("touchend",e.onTouchEnd,{passive:!0}),s[d]("pointerup",e.onTouchEnd,{passive:!0}),s[d]("pointercancel",e.onTouchEnd,{passive:!0}),s[d]("touchcancel",e.onTouchEnd,{passive:!0}),s[d]("pointerout",e.onTouchEnd,{passive:!0}),s[d]("pointerleave",e.onTouchEnd,{passive:!0}),s[d]("contextmenu",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[d]("click",e.onClick,!0),i.cssMode&&n[d]("scroll",e.onScroll),i.updateOnWindowResize?e[c](l.ios||l.android?"resize orientationchange observerUpdate":"resize observerUpdate",q,!0):e[c]("observerUpdate",q,!0),r[d]("load",e.onLoad,{capture:!0})};const K=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var Z={init:!0,direction:"horizontal",oneWayMovement:!1,swiperElementNodeName:"SWIPER-CONTAINER",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,eventsPrefix:"swiper",enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopAddBlankSlides:!0,loopAdditionalSlides:0,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-blank",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideFullyVisibleClass:"swiper-slide-fully-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function Q(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(!0===e[a]&&(e[a]={enabled:!0}),"navigation"===a&&e[a]&&e[a].enabled&&!e[a].prevEl&&!e[a].nextEl&&(e[a].auto=!0),["pagination","scrollbar"].indexOf(a)>=0&&e[a]&&e[a].enabled&&!e[a].el&&(e[a].auto=!0),a in e&&"enabled"in i?("object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),p(t,s)):p(t,s)):p(t,s)}}const J={eventsEmitter:z,update:D,translate:G,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`,s.wrapperEl.style.transitionDelay=0===e?"0ms":""),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),N({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),N({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:H,loop:X,grabCursor:{setGrabCursor:function(e){const t=this;if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;t.isElement&&(t.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame((()=>{t.__preventObserver__=!1}))},unsetGrabCursor:function(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame((()=>{e.__preventObserver__=!1})))}},events:{attachEvents:function(){const e=this,{params:t}=e;e.onTouchStart=B.bind(e),e.onTouchMove=R.bind(e),e.onTouchEnd=F.bind(e),e.onDocumentTouchStart=W.bind(e),t.cssMode&&(e.onScroll=_.bind(e)),e.onClick=V.bind(e),e.onLoad=j.bind(e),U(e,"on")},detachEvents:function(){U(this,"off")}},breakpoints:{setBreakpoint:function(){const e=this,{realIndex:t,initialized:s,params:a,el:i}=e,r=a.breakpoints;if(!r||r&&0===Object.keys(r).length)return;const n=e.getBreakpoint(r,e.params.breakpointsBase,e.el);if(!n||e.currentBreakpoint===n)return;const l=(n in r?r[n]:void 0)||e.originalParams,o=K(e,a),d=K(e,l),c=a.enabled;o&&!d?(i.classList.remove(`${a.containerModifierClass}grid`,`${a.containerModifierClass}grid-column`),e.emitContainerClasses()):!o&&d&&(i.classList.add(`${a.containerModifierClass}grid`),(l.grid.fill&&"column"===l.grid.fill||!l.grid.fill&&"column"===a.grid.fill)&&i.classList.add(`${a.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{if(void 0===l[t])return;const s=a[t]&&a[t].enabled,i=l[t]&&l[t].enabled;s&&!i&&e[t].disable(),!s&&i&&e[t].enable()}));const u=l.direction&&l.direction!==a.direction,m=a.loop&&(l.slidesPerView!==a.slidesPerView||u),h=a.loop;u&&s&&e.changeDirection(),p(e.params,l);const f=e.params.enabled,g=e.params.loop;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),c&&!f?e.disable():!c&&f&&e.enable(),e.currentBreakpoint=n,e.emit("_beforeBreakpoint",l),s&&(m?(e.loopDestroy(),e.loopCreate(t),e.updateSlides()):!h&&g?(e.loopCreate(t),e.updateSlides()):h&&!g&&e.loopDestroy()),e.emit("breakpoint",l)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:{addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,el:i,device:r}=e,n=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...n),i.classList.add(...t),e.emitContainerClasses()},removeClasses:function(){const{el:e,classNames:t}=this;e.classList.remove(...t),this.emitContainerClasses()}}},ee={};class te{constructor(){let e,t;for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];1===i.length&&i[0].constructor&&"Object"===Object.prototype.toString.call(i[0]).slice(8,-1)?t=i[0]:[e,t]=i,t||(t={}),t=p({},t),e&&!t.el&&(t.el=e);const n=a();if(t.el&&"string"==typeof t.el&&n.querySelectorAll(t.el).length>1){const e=[];return n.querySelectorAll(t.el).forEach((s=>{const a=p({},t,{el:s});e.push(new te(a))})),e}const l=this;l.__swiper__=!0,l.support=L(),l.device=I({userAgent:t.userAgent}),l.browser=A(),l.eventsListeners={},l.eventsAnyListeners=[],l.modules=[...l.__modules__],t.modules&&Array.isArray(t.modules)&&l.modules.push(...t.modules);const o={};l.modules.forEach((e=>{e({params:t,swiper:l,extendParams:Q(t,o),on:l.on.bind(l),once:l.once.bind(l),off:l.off.bind(l),emit:l.emit.bind(l)})}));const d=p({},Z,o);return l.params=p({},d,ee,t),l.originalParams=p({},l.params),l.passedParams=p({},t),l.params&&l.params.on&&Object.keys(l.params.on).forEach((e=>{l.on(e,l.params.on[e])})),l.params&&l.params.onAny&&l.onAny(l.params.onAny),Object.assign(l,{enabled:l.params.enabled,el:e,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===l.params.direction,isVertical:()=>"vertical"===l.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:l.params.allowSlideNext,allowSlidePrev:l.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:l.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,pointerId:null,touchId:null},allowClick:!0,allowTouchMove:l.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),l.emit("_swiper"),l.params.init&&l.init(),l}getDirectionLabel(e){return this.isHorizontal()?e:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[e]}getSlideIndex(e){const{slidesEl:t,params:s}=this,a=y(f(t,`.${s.slideClass}, swiper-slide`)[0]);return y(e)-a}getSlideIndexByData(e){return this.getSlideIndex(this.slides.filter((t=>1*t.getAttribute("data-swiper-slide-index")===e))[0])}recalcSlides(){const{slidesEl:e,params:t}=this;this.slides=f(e,`.${t.slideClass}, swiper-slide`)}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if("number"==typeof s.slidesPerView)return s.slidesPerView;if(s.centeredSlides){let e,t=a[l]?Math.ceil(a[l].swiperSlideSize):0;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=Math.ceil(a[s].swiperSlideSize),o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;if(s.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{t.complete&&$(e,t)})),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),s.freeMode&&s.freeMode.enabled&&!s.cssMode)a(),s.autoHeight&&e.updateAutoHeight();else{if(("auto"===s.slidesPerView||s.slidesPerView>1)&&e.isEnd&&!s.centeredSlides){const t=e.virtual&&s.virtual.enabled?e.virtual.slides:e.slides;i=e.slideTo(t.length-1,0,!1,!0)}else i=e.slideTo(e.activeIndex,0,!1,!0);i||a()}s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.el.classList.remove(`${s.params.containerModifierClass}${a}`),s.el.classList.add(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.forEach((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;let s=e||t.params.el;if("string"==typeof s&&(s=document.querySelector(s)),!s)return!1;s.swiper=t,s.parentNode&&s.parentNode.host&&s.parentNode.host.nodeName===t.params.swiperElementNodeName.toUpperCase()&&(t.isElement=!0);const a=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let i=(()=>{if(s&&s.shadowRoot&&s.shadowRoot.querySelector){return s.shadowRoot.querySelector(a())}return f(s,a())[0]})();return!i&&t.params.createElements&&(i=v("div",t.params.wrapperClass),s.append(i),f(s,`.${t.params.slideClass}`).forEach((e=>{i.append(e)}))),Object.assign(t,{el:s,wrapperEl:i,slidesEl:t.isElement&&!s.parentNode.host.slideSlots?s.parentNode.host:i,hostEl:t.isElement?s.parentNode.host:s,mounted:!0,rtl:"rtl"===s.dir.toLowerCase()||"rtl"===b(s,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===s.dir.toLowerCase()||"rtl"===b(s,"direction")),wrongRTL:"-webkit-box"===b(i,"display")}),!0}init(e){const t=this;if(t.initialized)return t;if(!1===t.mount(e))return t;t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(),t.attachEvents();const s=[...t.el.querySelectorAll('[loading="lazy"]')];return t.isElement&&s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),s.forEach((e=>{e.complete?$(t,e):e.addEventListener("load",(e=>{$(t,e.target)}))})),O(t),t.initialized=!0,O(t),t.emit("init"),t.emit("afterInit"),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,el:i,wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttribute("style"),r.removeAttribute("style"),n&&n.length&&n.forEach((e=>{e.classList.remove(a.slideVisibleClass,a.slideFullyVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index")}))),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.el.swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){p(ee,e)}static get extendedDefaults(){return ee}static get defaults(){return Z}static installModule(e){te.prototype.__modules__||(te.prototype.__modules__=[]);const t=te.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>te.installModule(e))),te):(te.installModule(e),te)}}function se(e,t,s,a){return e.params.createElements&&Object.keys(a).forEach((i=>{if(!s[i]&&!0===s.auto){let r=f(e.el,`.${a[i]}`)[0];r||(r=v("div",a[i]),r.className=a[i],e.el.append(r)),s[i]=r,t[i]=r}})),s}function ae(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function ie(e){const t=this,{params:s,slidesEl:a}=t;s.loop&&t.loopDestroy();const i=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,a.append(t.children[0]),t.innerHTML=""}else a.append(e)};if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&i(e[t]);else i(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update()}function re(e){const t=this,{params:s,activeIndex:a,slidesEl:i}=t;s.loop&&t.loopDestroy();let r=a+1;const n=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,i.prepend(t.children[0]),t.innerHTML=""}else i.prepend(e)};if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&n(e[t]);r=a+e.length}else n(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),t.slideTo(r,0,!1)}function ne(e,t){const s=this,{params:a,activeIndex:i,slidesEl:r}=s;let n=i;a.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.recalcSlides());const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides[t];e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&r.append(t[e]);o=n>e?n+t.length:n}else r.append(t);for(let e=0;e<d.length;e+=1)r.append(d[e]);s.recalcSlides(),a.loop&&s.loopCreate(),a.observer&&!s.isElement||s.update(),a.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function le(e){const t=this,{params:s,activeIndex:a}=t;let i=a;s.loop&&(i-=t.loopedSlides,t.loopDestroy());let r,n=i;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)r=e[s],t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1);n=Math.max(n,0)}else r=e,t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1),n=Math.max(n,0);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),s.loop?t.slideTo(n+t.loopedSlides,0,!1):t.slideTo(n,0,!1)}function oe(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function de(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l,recreateShadows:o,getEffectParams:d}=e;let c;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)})),a("transitionEnd",(()=>{if(s.params.effect===t&&o){if(!d||!d().slideShadows)return;s.slides.forEach((e=>{e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()))})),o()}})),a("virtualUpdate",(()=>{s.params.effect===t&&(s.slides.length||(c=!0),requestAnimationFrame((()=>{c&&s.slides&&s.slides.length&&(i(),c=!1)})))}))}function ce(e,t){const s=h(t);return s!==t&&(s.style.backfaceVisibility="hidden",s.style["-webkit-backface-visibility"]="hidden"),s}function pe(e){let{swiper:t,duration:s,transformElements:a,allSlides:i}=e;const{activeIndex:r}=t;if(t.params.virtualTranslate&&0!==s){let e,s=!1;e=i?a:a.filter((e=>{const s=e.classList.contains("swiper-slide-transform")?(e=>{if(!e.parentElement)return t.slides.filter((t=>t.shadowRoot&&t.shadowRoot===e.parentNode))[0];return e.parentElement})(e):e;return t.getSlideIndex(s)===r})),e.forEach((e=>{x(e,(()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});t.wrapperEl.dispatchEvent(e)}))}))}}function ue(e,t,s){const a=`swiper-slide-shadow${s?`-${s}`:""}${e?` swiper-slide-shadow-${e}`:""}`,i=h(t);let r=i.querySelector(`.${a.split(" ").join(".")}`);return r||(r=v("div",a.split(" ")),i.append(r)),r}Object.keys(J).forEach((e=>{Object.keys(J[e]).forEach((t=>{te.prototype[t]=J[e][t]}))})),te.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,s){void 0===s&&(s={});const a=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(t.__preventObserver__)return;if(1===e.length)return void i("observerUpdate",e[0]);const s=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(s):l.setTimeout(s,0)}));a.observe(e,{attributes:void 0===s.attributes||s.attributes,childList:void 0===s.childList||s.childList,characterData:void 0===s.characterData||s.characterData}),n.push(a)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=E(t.hostEl);for(let t=0;t<e.length;t+=1)o(e[t])}o(t.hostEl,{childList:t.params.observeSlideChildren}),o(t.wrapperEl,{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const me=[function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;i({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}});const l=a();s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]};const o=l.createElement("div");function d(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];let i;return a.renderSlide?(i=a.renderSlide.call(s,e,t),"string"==typeof i&&(o.innerHTML=i,i=o.children[0])):i=s.isElement?v("swiper-slide"):v("div",s.params.slideClass),i.setAttribute("data-swiper-slide-index",t),a.renderSlide||(i.innerHTML=e),a.cache&&(s.virtual.cache[t]=i),i}function c(e){const{slidesPerView:t,slidesPerGroup:a,centeredSlides:i,loop:r}=s.params,{addSlidesBefore:l,addSlidesAfter:o}=s.params.virtual,{from:c,to:p,slides:u,slidesGrid:m,offset:h}=s.virtual;s.params.cssMode||s.updateActiveIndex();const g=s.activeIndex||0;let v,w,b;v=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",i?(w=Math.floor(t/2)+a+o,b=Math.floor(t/2)+a+l):(w=t+(a-1)+o,b=(r?t:a)+l);let y=g-b,E=g+w;r||(y=Math.max(y,0),E=Math.min(E,u.length-1));let x=(s.slidesGrid[y]||0)-(s.slidesGrid[0]||0);function S(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),n("virtualUpdate")}if(r&&g>=b?(y-=b,i||(x+=s.slidesGrid[0])):r&&g<b&&(y=-b,i&&(x+=s.slidesGrid[0])),Object.assign(s.virtual,{from:y,to:E,offset:x,slidesGrid:s.slidesGrid,slidesBefore:b,slidesAfter:w}),c===y&&p===E&&!e)return s.slidesGrid!==m&&x!==h&&s.slides.forEach((e=>{e.style[v]=x-Math.abs(s.cssOverflowAdjustment())+"px"})),s.updateProgress(),void n("virtualUpdate");if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:x,from:y,to:E,slides:function(){const e=[];for(let t=y;t<=E;t+=1)e.push(u[t]);return e}()}),void(s.params.virtual.renderExternalUpdate?S():n("virtualUpdate"));const T=[],M=[],C=e=>{let t=e;return e<0?t=u.length+e:t>=u.length&&(t-=u.length),t};if(e)s.slides.filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`))).forEach((e=>{e.remove()}));else for(let e=c;e<=p;e+=1)if(e<y||e>E){const t=C(e);s.slides.filter((e=>e.matches(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`))).forEach((e=>{e.remove()}))}const P=r?-u.length:0,L=r?2*u.length:u.length;for(let t=P;t<L;t+=1)if(t>=y&&t<=E){const s=C(t);void 0===p||e?M.push(s):(t>p&&M.push(s),t<c&&T.push(s))}if(M.forEach((e=>{s.slidesEl.append(d(u[e],e))})),r)for(let e=T.length-1;e>=0;e-=1){const t=T[e];s.slidesEl.prepend(d(u[t],t))}else T.sort(((e,t)=>t-e)),T.forEach((e=>{s.slidesEl.prepend(d(u[e],e))}));f(s.slidesEl,".swiper-slide, swiper-slide").forEach((e=>{e.style[v]=x-Math.abs(s.cssOverflowAdjustment())+"px"})),S()}r("beforeInit",(()=>{if(!s.params.virtual.enabled)return;let e;if(void 0===s.passedParams.virtual.slides){const t=[...s.slidesEl.children].filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`)));t&&t.length&&(s.virtual.slides=[...t],e=!0,t.forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t),s.virtual.cache[t]=e,e.remove()})))}e||(s.virtual.slides=s.params.virtual.slides),s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,c()})),r("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{c()}),100)):c())})),r("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&u(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);c(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.getAttribute("data-swiper-slide-index");r&&a.setAttribute("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}c(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.params.virtual.cache&&(delete s.virtual.cache[e[a]],Object.keys(s.virtual.cache).forEach((t=>{t>e&&(s.virtual.cache[t-1]=s.virtual.cache[t],s.virtual.cache[t-1].setAttribute("data-swiper-slide-index",t-1),delete s.virtual.cache[t])}))),s.virtual.slides.splice(e[a],1),e[a]<t&&(t-=1),t=Math.max(t,0);else s.params.virtual.cache&&(delete s.virtual.cache[e],Object.keys(s.virtual.cache).forEach((t=>{t>e&&(s.virtual.cache[t-1]=s.virtual.cache[t],s.virtual.cache[t-1].setAttribute("data-swiper-slide-index",t-1),delete s.virtual.cache[t])}))),s.virtual.slides.splice(e,1),e<t&&(t-=1),t=Math.max(t,0);c(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),c(!0),s.slideTo(0,0)},update:c})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function d(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,m=38===i,h=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&h||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&m||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||m||h)){let e=!1;if(E(t.el,`.${t.params.slideClass}, swiper-slide`).length>0&&0===E(t.el,`.${t.params.slideActiveClass}`).length)return;const a=t.el,i=a.clientWidth,r=a.clientHeight,n=o.innerWidth,l=o.innerHeight,d=w(a);s&&(d.left-=a.scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||m||h)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||h)&&t.slideNext(),(d||m)&&t.slidePrev()),n("keyPress",i)}}function c(){t.keyboard.enabled||(l.addEventListener("keydown",d),t.keyboard.enabled=!0)}function p(){t.keyboard.enabled&&(l.removeEventListener("keydown",d),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&c()})),i("destroy",(()=>{t.keyboard.enabled&&p()})),Object.assign(t.keyboard,{enable:c,disable:p})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();let d;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null,noMousewheelClass:"swiper-no-mousewheel"}}),t.mousewheel={enabled:!1};let c,p=o();const u=[];function m(){t.enabled&&(t.mouseEntered=!0)}function h(){t.enabled&&(t.mouseEntered=!1)}function f(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&o()-p<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&o()-p<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),p=(new n.Date).getTime(),!1)))}function g(e){let s=e,a=!0;if(!t.enabled)return;if(e.target.closest(`.${t.params.mousewheel.noMousewheelClass}`))return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let n=t.el;"container"!==t.params.mousewheel.eventsTarget&&(n=document.querySelector(t.params.mousewheel.eventsTarget));const p=n&&n.contains(s.target);if(!t.mouseEntered&&!p&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let m=0;const h=t.rtlTranslate?-1:1,g=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(g.pixelX)>Math.abs(g.pixelY)))return!0;m=-g.pixelX*h}else{if(!(Math.abs(g.pixelY)>Math.abs(g.pixelX)))return!0;m=-g.pixelY}else m=Math.abs(g.pixelX)>Math.abs(g.pixelY)?-g.pixelX*h:-g.pixelY;if(0===m)return!0;r.invert&&(m=-m);let v=t.getTranslate()+m*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:o(),delta:Math.abs(m),direction:Math.sign(m)},a=c&&e.time<c.time+500&&e.delta<=c.delta&&e.direction===c.direction;if(!a){c=void 0;let n=t.getTranslate()+m*r.sensitivity;const o=t.isBeginning,p=t.isEnd;if(n>=t.minTranslate()&&(n=t.minTranslate()),n<=t.maxTranslate()&&(n=t.maxTranslate()),t.setTransition(0),t.setTranslate(n),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!o&&t.isBeginning||!p&&t.isEnd)&&t.updateSlidesClasses(),t.params.loop&&t.loopFix({direction:e.direction<0?"next":"prev",byMousewheel:!0}),t.params.freeMode.sticky){clearTimeout(d),d=void 0,u.length>=15&&u.shift();const s=u.length?u[u.length-1]:void 0,a=u[0];if(u.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))u.splice(0);else if(u.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=m>0?.8:.2;c=e,u.splice(0),d=l((()=>{t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}d||(d=l((()=>{c=e,u.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplayDisableOnInteraction&&t.autoplay.stop(),r.releaseOnEdges&&(n===t.minTranslate()||n===t.maxTranslate()))return!0}}else{const s={time:o(),delta:Math.abs(m),direction:Math.sign(m),raw:e};u.length>=2&&u.shift();const a=u.length?u[u.length-1]:void 0;if(u.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&f(s):f(s),function(e){const s=t.params.mousewheel;if(e.direction<0){if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function v(e){let s=t.el;"container"!==t.params.mousewheel.eventsTarget&&(s=document.querySelector(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",h),s[e]("wheel",g)}function w(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",g),!0):!t.mousewheel.enabled&&(v("addEventListener"),t.mousewheel.enabled=!0,!0)}function b(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,g),!0):!!t.mousewheel.enabled&&(v("removeEventListener"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&b(),t.params.mousewheel.enabled&&w()})),a("destroy",(()=>{t.params.cssMode&&w(),t.mousewheel.enabled&&b()})),Object.assign(t.mousewheel,{enable:w,disable:b})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;function r(e){let s;return e&&"string"==typeof e&&t.isElement&&(s=t.el.querySelector(e),s)?s:(e&&("string"==typeof e&&(s=[...document.querySelectorAll(e)]),t.params.uniqueNavElements&&"string"==typeof e&&s.length>1&&1===t.el.querySelectorAll(e).length&&(s=t.el.querySelector(e))),e&&!s?e:s)}function n(e,s){const a=t.params.navigation;(e=T(e)).forEach((e=>{e&&(e.classList[s?"add":"remove"](...a.disabledClass.split(" ")),"BUTTON"===e.tagName&&(e.disabled=s),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](a.lockClass))}))}function l(){const{nextEl:e,prevEl:s}=t.navigation;if(t.params.loop)return n(s,!1),void n(e,!1);n(s,t.isBeginning&&!t.params.rewind),n(e,t.isEnd&&!t.params.rewind)}function o(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&(t.slidePrev(),i("navigationPrev"))}function d(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&(t.slideNext(),i("navigationNext"))}function c(){const e=t.params.navigation;if(t.params.navigation=se(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;let s=r(e.nextEl),a=r(e.prevEl);Object.assign(t.navigation,{nextEl:s,prevEl:a}),s=T(s),a=T(a);const i=(s,a)=>{s&&s.addEventListener("click","next"===a?d:o),!t.enabled&&s&&s.classList.add(...e.lockClass.split(" "))};s.forEach((e=>i(e,"next"))),a.forEach((e=>i(e,"prev")))}function p(){let{nextEl:e,prevEl:s}=t.navigation;e=T(e),s=T(s);const a=(e,s)=>{e.removeEventListener("click","next"===s?d:o),e.classList.remove(...t.params.navigation.disabledClass.split(" "))};e.forEach((e=>a(e,"next"))),s.forEach((e=>a(e,"prev")))}s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),t.navigation={nextEl:null,prevEl:null},a("init",(()=>{!1===t.params.navigation.enabled?u():(c(),l())})),a("toEdge fromEdge lock unlock",(()=>{l()})),a("destroy",(()=>{p()})),a("enable disable",(()=>{let{nextEl:e,prevEl:s}=t.navigation;e=T(e),s=T(s),t.enabled?l():[...e,...s].filter((e=>!!e)).forEach((e=>e.classList.add(t.params.navigation.lockClass)))})),a("click",((e,s)=>{let{nextEl:a,prevEl:r}=t.navigation;a=T(a),r=T(r);const n=s.target;if(t.params.navigation.hideOnClick&&!r.includes(n)&&!a.includes(n)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===n||t.pagination.el.contains(n)))return;let e;a.length?e=a[0].classList.contains(t.params.navigation.hiddenClass):r.length&&(e=r[0].classList.contains(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),[...a,...r].filter((e=>!!e)).forEach((e=>e.classList.toggle(t.params.navigation.hiddenClass)))}}));const u=()=>{t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),p()};Object.assign(t.navigation,{enable:()=>{t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),c(),l()},disable:u,update:l,init:c,destroy:p})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),t.pagination={el:null,bullets:[]};let l=0;function o(){return!t.params.pagination.el||!t.pagination.el||Array.isArray(t.pagination.el)&&0===t.pagination.el.length}function d(e,s){const{bulletActiveClass:a}=t.params.pagination;e&&(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&(e.classList.add(`${a}-${s}`),(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&e.classList.add(`${a}-${s}-${s}`))}function c(e){const s=e.target.closest(ae(t.params.pagination.bulletClass));if(!s)return;e.preventDefault();const a=y(s)*t.params.slidesPerGroup;if(t.params.loop){if(t.realIndex===a)return;t.slideToLoop(a)}else t.slideTo(a)}function p(){const e=t.rtl,s=t.params.pagination;if(o())return;let a,r,c=t.pagination.el;c=T(c);const p=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,u=t.params.loop?Math.ceil(p/t.params.slidesPerGroup):t.snapGrid.length;if(t.params.loop?(r=t.previousRealIndex||0,a=t.params.slidesPerGroup>1?Math.floor(t.realIndex/t.params.slidesPerGroup):t.realIndex):void 0!==t.snapIndex?(a=t.snapIndex,r=t.previousSnapIndex):(r=t.previousIndex||0,a=t.activeIndex||0),"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const i=t.pagination.bullets;let o,p,u;if(s.dynamicBullets&&(n=S(i[0],t.isHorizontal()?"width":"height",!0),c.forEach((e=>{e.style[t.isHorizontal()?"width":"height"]=n*(s.dynamicMainBullets+4)+"px"})),s.dynamicMainBullets>1&&void 0!==r&&(l+=a-(r||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),o=Math.max(a-l,0),p=o+(Math.min(i.length,s.dynamicMainBullets)-1),u=(p+o)/2),i.forEach((e=>{const t=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e)).flat();e.classList.remove(...t)})),c.length>1)i.forEach((e=>{const i=y(e);i===a?e.classList.add(...s.bulletActiveClass.split(" ")):t.isElement&&e.setAttribute("part","bullet"),s.dynamicBullets&&(i>=o&&i<=p&&e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),i===o&&d(e,"prev"),i===p&&d(e,"next"))}));else{const e=i[a];if(e&&e.classList.add(...s.bulletActiveClass.split(" ")),t.isElement&&i.forEach(((e,t)=>{e.setAttribute("part",t===a?"bullet-active":"bullet")})),s.dynamicBullets){const e=i[o],t=i[p];for(let e=o;e<=p;e+=1)i[e]&&i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));d(e,"prev"),d(t,"next")}}if(s.dynamicBullets){const a=Math.min(i.length,s.dynamicMainBullets+4),r=(n*a-n)/2-u*n,l=e?"right":"left";i.forEach((e=>{e.style[t.isHorizontal()?l:"top"]=`${r}px`}))}}c.forEach(((e,r)=>{if("fraction"===s.type&&(e.querySelectorAll(ae(s.currentClass)).forEach((e=>{e.textContent=s.formatFractionCurrent(a+1)})),e.querySelectorAll(ae(s.totalClass)).forEach((e=>{e.textContent=s.formatFractionTotal(u)}))),"progressbar"===s.type){let i;i=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const r=(a+1)/u;let n=1,l=1;"horizontal"===i?n=r:l=r,e.querySelectorAll(ae(s.progressbarFillClass)).forEach((e=>{e.style.transform=`translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,e.style.transitionDuration=`${t.params.speed}ms`}))}"custom"===s.type&&s.renderCustom?(e.innerHTML=s.renderCustom(t,a+1,u),0===r&&i("paginationRender",e)):(0===r&&i("paginationRender",e),i("paginationUpdate",e)),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](s.lockClass)}))}function u(){const e=t.params.pagination;if(o())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.grid&&t.params.grid.rows>1?t.slides.length/Math.ceil(t.params.grid.rows):t.slides.length;let a=t.pagination.el;a=T(a);let r="";if("bullets"===e.type){let a=t.params.loop?Math.ceil(s/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&a>s&&(a=s);for(let s=0;s<a;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} ${t.isElement?'part="bullet"':""} class="${e.bulletClass}"></${e.bulletElement}>`}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`),t.pagination.bullets=[],a.forEach((s=>{"custom"!==e.type&&(s.innerHTML=r||""),"bullets"===e.type&&t.pagination.bullets.push(...s.querySelectorAll(ae(e.bulletClass)))})),"custom"!==e.type&&i("paginationRender",a[0])}function m(){t.params.pagination=se(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s;"string"==typeof e.el&&t.isElement&&(s=t.el.querySelector(e.el)),s||"string"!=typeof e.el||(s=[...document.querySelectorAll(e.el)]),s||(s=e.el),s&&0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&Array.isArray(s)&&s.length>1&&(s=[...t.el.querySelectorAll(e.el)],s.length>1&&(s=s.filter((e=>E(e,".swiper")[0]===t.el))[0])),Array.isArray(s)&&1===s.length&&(s=s[0]),Object.assign(t.pagination,{el:s}),s=T(s),s.forEach((s=>{"bullets"===e.type&&e.clickable&&s.classList.add(...(e.clickableClass||"").split(" ")),s.classList.add(e.modifierClass+e.type),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(s.classList.add(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.classList.add(e.progressbarOppositeClass),e.clickable&&s.addEventListener("click",c),t.enabled||s.classList.add(e.lockClass)})))}function h(){const e=t.params.pagination;if(o())return;let s=t.pagination.el;s&&(s=T(s),s.forEach((s=>{s.classList.remove(e.hiddenClass),s.classList.remove(e.modifierClass+e.type),s.classList.remove(t.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&(s.classList.remove(...(e.clickableClass||"").split(" ")),s.removeEventListener("click",c))}))),t.pagination.bullets&&t.pagination.bullets.forEach((t=>t.classList.remove(...e.bulletActiveClass.split(" "))))}a("changeDirection",(()=>{if(!t.pagination||!t.pagination.el)return;const e=t.params.pagination;let{el:s}=t.pagination;s=T(s),s.forEach((s=>{s.classList.remove(e.horizontalClass,e.verticalClass),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass)}))})),a("init",(()=>{!1===t.params.pagination.enabled?f():(m(),u(),p())})),a("activeIndexChange",(()=>{void 0===t.snapIndex&&p()})),a("snapIndexChange",(()=>{p()})),a("snapGridLengthChange",(()=>{u(),p()})),a("destroy",(()=>{h()})),a("enable disable",(()=>{let{el:e}=t.pagination;e&&(e=T(e),e.forEach((e=>e.classList[t.enabled?"remove":"add"](t.params.pagination.lockClass))))})),a("lock unlock",(()=>{p()})),a("click",((e,s)=>{const a=s.target,r=T(t.pagination.el);if(t.params.pagination.el&&t.params.pagination.hideOnClick&&r&&r.length>0&&!a.classList.contains(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r[0].classList.contains(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.forEach((e=>e.classList.toggle(t.params.pagination.hiddenClass)))}}));const f=()=>{t.el.classList.add(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=T(e),e.forEach((e=>e.classList.add(t.params.pagination.paginationDisabledClass)))),h()};Object.assign(t.pagination,{enable:()=>{t.el.classList.remove(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=T(e),e.forEach((e=>e.classList.remove(t.params.pagination.paginationDisabledClass)))),m(),u(),p()},disable:f,render:u,update:p,init:m,destroy:h})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const o=a();let d,c,p,u,m=!1,h=null,f=null;function g(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s}=t,{dragEl:a,el:i}=e,r=t.params.scrollbar,n=t.params.loop?t.progressLoop:t.progress;let l=c,o=(p-c)*n;s?(o=-o,o>0?(l=c-o,o=0):-o+c>p&&(l=p+o)):o<0?(l=c+o,o=0):o+c>p&&(l=p-o),t.isHorizontal()?(a.style.transform=`translate3d(${o}px, 0, 0)`,a.style.width=`${l}px`):(a.style.transform=`translate3d(0px, ${o}px, 0)`,a.style.height=`${l}px`),r.hide&&(clearTimeout(h),i.style.opacity=1,h=setTimeout((()=>{i.style.opacity=0,i.style.transitionDuration="400ms"}),1e3))}function b(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{dragEl:s,el:a}=e;s.style.width="",s.style.height="",p=t.isHorizontal()?a.offsetWidth:a.offsetHeight,u=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),c="auto"===t.params.scrollbar.dragSize?p*u:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s.style.width=`${c}px`:s.style.height=`${c}px`,a.style.display=u>=1?"none":"",t.params.scrollbar.hide&&(a.style.opacity=0),t.params.watchOverflow&&t.enabled&&e.el.classList[t.isLocked?"add":"remove"](t.params.scrollbar.lockClass)}function y(e){return t.isHorizontal()?e.clientX:e.clientY}function E(e){const{scrollbar:s,rtlTranslate:a}=t,{el:i}=s;let r;r=(y(e)-w(i)[t.isHorizontal()?"left":"top"]-(null!==d?d:c/2))/(p-c),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function x(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:n,dragEl:l}=a;m=!0,d=e.target===l?y(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.style.transitionDuration="100ms",l.style.transitionDuration="100ms",E(e),clearTimeout(f),n.style.transitionDuration="0ms",s.hide&&(n.style.opacity=1),t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="none"),r("scrollbarDragStart",e)}function S(e){const{scrollbar:s,wrapperEl:a}=t,{el:i,dragEl:n}=s;m&&(e.preventDefault?e.preventDefault():e.returnValue=!1,E(e),a.style.transitionDuration="0ms",i.style.transitionDuration="0ms",n.style.transitionDuration="0ms",r("scrollbarDragMove",e))}function M(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:n}=a;m&&(m=!1,t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="",i.style.transitionDuration=""),s.hide&&(clearTimeout(f),f=l((()=>{n.style.opacity=0,n.style.transitionDuration="400ms"}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function C(e){const{scrollbar:s,params:a}=t,i=s.el;if(!i)return;const r=i,n=!!a.passiveListeners&&{passive:!1,capture:!1},l=!!a.passiveListeners&&{passive:!0,capture:!1};if(!r)return;const d="on"===e?"addEventListener":"removeEventListener";r[d]("pointerdown",x,n),o[d]("pointermove",S,n),o[d]("pointerup",M,l)}function P(){const{scrollbar:e,el:s}=t;t.params.scrollbar=se(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i,r;if("string"==typeof a.el&&t.isElement&&(i=t.el.querySelector(a.el)),i||"string"!=typeof a.el)i||(i=a.el);else if(i=o.querySelectorAll(a.el),!i.length)return;t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.querySelectorAll(a.el).length&&(i=s.querySelector(a.el)),i.length>0&&(i=i[0]),i.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass),i&&(r=i.querySelector(ae(t.params.scrollbar.dragClass)),r||(r=v("div",t.params.scrollbar.dragClass),i.append(r))),Object.assign(e,{el:i,dragEl:r}),a.draggable&&t.params.scrollbar.el&&t.scrollbar.el&&C("on"),i&&i.classList[t.enabled?"remove":"add"](...n(t.params.scrollbar.lockClass))}function L(){const e=t.params.scrollbar,s=t.scrollbar.el;s&&s.classList.remove(...n(t.isHorizontal()?e.horizontalClass:e.verticalClass)),t.params.scrollbar.el&&t.scrollbar.el&&C("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),t.scrollbar={el:null,dragEl:null},i("changeDirection",(()=>{if(!t.scrollbar||!t.scrollbar.el)return;const e=t.params.scrollbar;let{el:s}=t.scrollbar;s=T(s),s.forEach((s=>{s.classList.remove(e.horizontalClass,e.verticalClass),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass)}))})),i("init",(()=>{!1===t.params.scrollbar.enabled?I():(P(),b(),g())})),i("update resize observerUpdate lock unlock changeDirection",(()=>{b()})),i("setTranslate",(()=>{g()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&(t.scrollbar.dragEl.style.transitionDuration=`${e}ms`)}(s)})),i("enable disable",(()=>{const{el:e}=t.scrollbar;e&&e.classList[t.enabled?"remove":"add"](...n(t.params.scrollbar.lockClass))})),i("destroy",(()=>{L()}));const I=()=>{t.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),t.scrollbar.el&&t.scrollbar.el.classList.add(...n(t.params.scrollbar.scrollbarDisabledClass)),L()};Object.assign(t.scrollbar,{enable:()=>{t.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)),t.scrollbar.el&&t.scrollbar.el.classList.remove(...n(t.params.scrollbar.scrollbarDisabledClass)),P(),b(),g()},disable:I,updateSize:b,setTranslate:g,init:P,destroy:L})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i="[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]",r=(e,s)=>{const{rtl:a}=t,i=a?-1:1,r=e.getAttribute("data-swiper-parallax")||"0";let n=e.getAttribute("data-swiper-parallax-x"),l=e.getAttribute("data-swiper-parallax-y");const o=e.getAttribute("data-swiper-parallax-scale"),d=e.getAttribute("data-swiper-parallax-opacity"),c=e.getAttribute("data-swiper-parallax-rotate");if(n||l?(n=n||"0",l=l||"0"):t.isHorizontal()?(n=r,l="0"):(l=r,n="0"),n=n.indexOf("%")>=0?parseInt(n,10)*s*i+"%":n*s*i+"px",l=l.indexOf("%")>=0?parseInt(l,10)*s+"%":l*s+"px",null!=d){const t=d-(d-1)*(1-Math.abs(s));e.style.opacity=t}let p=`translate3d(${n}, ${l}, 0px)`;if(null!=o){p+=` scale(${o-(o-1)*(1-Math.abs(s))})`}if(c&&null!=c){p+=` rotate(${c*s*-1}deg)`}e.style.transform=p},n=()=>{const{el:e,slides:s,progress:a,snapGrid:n,isElement:l}=t,o=f(e,i);t.isElement&&o.push(...f(t.hostEl,i)),o.forEach((e=>{r(e,a)})),s.forEach(((e,s)=>{let l=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(l+=Math.ceil(s/2)-a*(n.length-1)),l=Math.min(Math.max(l,-1),1),e.querySelectorAll(`${i}, [data-swiper-parallax-rotate]`).forEach((e=>{r(e,l)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&n()})),a("setTranslate",(()=>{t.params.parallax.enabled&&n()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{el:s,hostEl:a}=t,r=[...s.querySelectorAll(i)];t.isElement&&r.push(...a.querySelectorAll(i)),r.forEach((t=>{let s=parseInt(t.getAttribute("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.style.transitionDuration=`${s}ms`}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l,o,c=1,p=!1;const u=[],m={originX:0,originY:0,slideEl:void 0,slideWidth:void 0,slideHeight:void 0,imageEl:void 0,imageWrapEl:void 0,maxRatio:3},h={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},g={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let v=1;function b(){if(u.length<2)return 1;const e=u[0].pageX,t=u[0].pageY,s=u[1].pageX,a=u[1].pageY;return Math.sqrt((s-e)**2+(a-t)**2)}function y(e){const s=t.isElement?"swiper-slide":`.${t.params.slideClass}`;return!!e.target.matches(s)||t.slides.filter((t=>t.contains(e.target))).length>0}function x(e){if("mouse"===e.pointerType&&u.splice(0,u.length),!y(e))return;const s=t.params.zoom;if(l=!1,o=!1,u.push(e),!(u.length<2)){if(l=!0,m.scaleStart=b(),!m.slideEl){m.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`),m.slideEl||(m.slideEl=t.slides[t.activeIndex]);let a=m.slideEl.querySelector(`.${s.containerClass}`);if(a&&(a=a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=a,m.imageWrapEl=a?E(m.imageEl,`.${s.containerClass}`)[0]:void 0,!m.imageWrapEl)return void(m.imageEl=void 0);m.maxRatio=m.imageWrapEl.getAttribute("data-swiper-zoom")||s.maxRatio}if(m.imageEl){const[e,t]=function(){if(u.length<2)return{x:null,y:null};const e=m.imageEl.getBoundingClientRect();return[(u[0].pageX+(u[1].pageX-u[0].pageX)/2-e.x-n.scrollX)/c,(u[0].pageY+(u[1].pageY-u[0].pageY)/2-e.y-n.scrollY)/c]}();m.originX=e,m.originY=t,m.imageEl.style.transitionDuration="0ms"}p=!0}}function S(e){if(!y(e))return;const s=t.params.zoom,a=t.zoom,i=u.findIndex((t=>t.pointerId===e.pointerId));i>=0&&(u[i]=e),u.length<2||(o=!0,m.scaleMove=b(),m.imageEl&&(a.scale=m.scaleMove/m.scaleStart*c,a.scale>m.maxRatio&&(a.scale=m.maxRatio-1+(a.scale-m.maxRatio+1)**.5),a.scale<s.minRatio&&(a.scale=s.minRatio+1-(s.minRatio-a.scale+1)**.5),m.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`))}function T(e){if(!y(e))return;if("mouse"===e.pointerType&&"pointerout"===e.type)return;const s=t.params.zoom,a=t.zoom,i=u.findIndex((t=>t.pointerId===e.pointerId));i>=0&&u.splice(i,1),l&&o&&(l=!1,o=!1,m.imageEl&&(a.scale=Math.max(Math.min(a.scale,m.maxRatio),s.minRatio),m.imageEl.style.transitionDuration=`${t.params.speed}ms`,m.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`,c=a.scale,p=!1,a.scale>1&&m.slideEl?m.slideEl.classList.add(`${s.zoomedSlideClass}`):a.scale<=1&&m.slideEl&&m.slideEl.classList.remove(`${s.zoomedSlideClass}`),1===a.scale&&(m.originX=0,m.originY=0,m.slideEl=void 0)))}function M(e){if(!y(e)||!function(e){const s=`.${t.params.zoom.containerClass}`;return!!e.target.matches(s)||[...t.hostEl.querySelectorAll(s)].filter((t=>t.contains(e.target))).length>0}(e))return;const s=t.zoom;if(!m.imageEl)return;if(!h.isTouched||!m.slideEl)return;h.isMoved||(h.width=m.imageEl.offsetWidth,h.height=m.imageEl.offsetHeight,h.startX=d(m.imageWrapEl,"x")||0,h.startY=d(m.imageWrapEl,"y")||0,m.slideWidth=m.slideEl.offsetWidth,m.slideHeight=m.slideEl.offsetHeight,m.imageWrapEl.style.transitionDuration="0ms");const a=h.width*s.scale,i=h.height*s.scale;if(a<m.slideWidth&&i<m.slideHeight)return;h.minX=Math.min(m.slideWidth/2-a/2,0),h.maxX=-h.minX,h.minY=Math.min(m.slideHeight/2-i/2,0),h.maxY=-h.minY,h.touchesCurrent.x=u.length>0?u[0].pageX:e.pageX,h.touchesCurrent.y=u.length>0?u[0].pageY:e.pageY;if(Math.max(Math.abs(h.touchesCurrent.x-h.touchesStart.x),Math.abs(h.touchesCurrent.y-h.touchesStart.y))>5&&(t.allowClick=!1),!h.isMoved&&!p){if(t.isHorizontal()&&(Math.floor(h.minX)===Math.floor(h.startX)&&h.touchesCurrent.x<h.touchesStart.x||Math.floor(h.maxX)===Math.floor(h.startX)&&h.touchesCurrent.x>h.touchesStart.x))return void(h.isTouched=!1);if(!t.isHorizontal()&&(Math.floor(h.minY)===Math.floor(h.startY)&&h.touchesCurrent.y<h.touchesStart.y||Math.floor(h.maxY)===Math.floor(h.startY)&&h.touchesCurrent.y>h.touchesStart.y))return void(h.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),h.isMoved=!0;const r=(s.scale-c)/(m.maxRatio-t.params.zoom.minRatio),{originX:n,originY:l}=m;h.currentX=h.touchesCurrent.x-h.touchesStart.x+h.startX+r*(h.width-2*n),h.currentY=h.touchesCurrent.y-h.touchesStart.y+h.startY+r*(h.height-2*l),h.currentX<h.minX&&(h.currentX=h.minX+1-(h.minX-h.currentX+1)**.8),h.currentX>h.maxX&&(h.currentX=h.maxX-1+(h.currentX-h.maxX+1)**.8),h.currentY<h.minY&&(h.currentY=h.minY+1-(h.minY-h.currentY+1)**.8),h.currentY>h.maxY&&(h.currentY=h.maxY-1+(h.currentY-h.maxY+1)**.8),g.prevPositionX||(g.prevPositionX=h.touchesCurrent.x),g.prevPositionY||(g.prevPositionY=h.touchesCurrent.y),g.prevTime||(g.prevTime=Date.now()),g.x=(h.touchesCurrent.x-g.prevPositionX)/(Date.now()-g.prevTime)/2,g.y=(h.touchesCurrent.y-g.prevPositionY)/(Date.now()-g.prevTime)/2,Math.abs(h.touchesCurrent.x-g.prevPositionX)<2&&(g.x=0),Math.abs(h.touchesCurrent.y-g.prevPositionY)<2&&(g.y=0),g.prevPositionX=h.touchesCurrent.x,g.prevPositionY=h.touchesCurrent.y,g.prevTime=Date.now(),m.imageWrapEl.style.transform=`translate3d(${h.currentX}px, ${h.currentY}px,0)`}function C(){const e=t.zoom;m.slideEl&&t.activeIndex!==t.slides.indexOf(m.slideEl)&&(m.imageEl&&(m.imageEl.style.transform="translate3d(0,0,0) scale(1)"),m.imageWrapEl&&(m.imageWrapEl.style.transform="translate3d(0,0,0)"),m.slideEl.classList.remove(`${t.params.zoom.zoomedSlideClass}`),e.scale=1,c=1,m.slideEl=void 0,m.imageEl=void 0,m.imageWrapEl=void 0,m.originX=0,m.originY=0)}function P(e){const s=t.zoom,a=t.params.zoom;if(!m.slideEl){e&&e.target&&(m.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`)),m.slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.slideEl=f(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:m.slideEl=t.slides[t.activeIndex]);let s=m.slideEl.querySelector(`.${a.containerClass}`);s&&(s=s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=s,m.imageWrapEl=s?E(m.imageEl,`.${a.containerClass}`)[0]:void 0}if(!m.imageEl||!m.imageWrapEl)return;let i,r,l,o,d,p,u,g,v,b,y,x,S,T,M,C,P,L;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),m.slideEl.classList.add(`${a.zoomedSlideClass}`),void 0===h.touchesStart.x&&e?(i=e.pageX,r=e.pageY):(i=h.touchesStart.x,r=h.touchesStart.y);const I="number"==typeof e?e:null;1===c&&I&&(i=void 0,r=void 0),s.scale=I||m.imageWrapEl.getAttribute("data-swiper-zoom")||a.maxRatio,c=I||m.imageWrapEl.getAttribute("data-swiper-zoom")||a.maxRatio,!e||1===c&&I?(u=0,g=0):(P=m.slideEl.offsetWidth,L=m.slideEl.offsetHeight,l=w(m.slideEl).left+n.scrollX,o=w(m.slideEl).top+n.scrollY,d=l+P/2-i,p=o+L/2-r,v=m.imageEl.offsetWidth,b=m.imageEl.offsetHeight,y=v*s.scale,x=b*s.scale,S=Math.min(P/2-y/2,0),T=Math.min(L/2-x/2,0),M=-S,C=-T,u=d*s.scale,g=p*s.scale,u<S&&(u=S),u>M&&(u=M),g<T&&(g=T),g>C&&(g=C)),I&&1===s.scale&&(m.originX=0,m.originY=0),m.imageWrapEl.style.transitionDuration="300ms",m.imageWrapEl.style.transform=`translate3d(${u}px, ${g}px,0)`,m.imageEl.style.transitionDuration="300ms",m.imageEl.style.transform=`translate3d(0,0,0) scale(${s.scale})`}function L(){const e=t.zoom,s=t.params.zoom;if(!m.slideEl){t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.slideEl=f(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:m.slideEl=t.slides[t.activeIndex];let e=m.slideEl.querySelector(`.${s.containerClass}`);e&&(e=e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=e,m.imageWrapEl=e?E(m.imageEl,`.${s.containerClass}`)[0]:void 0}m.imageEl&&m.imageWrapEl&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,c=1,m.imageWrapEl.style.transitionDuration="300ms",m.imageWrapEl.style.transform="translate3d(0,0,0)",m.imageEl.style.transitionDuration="300ms",m.imageEl.style.transform="translate3d(0,0,0) scale(1)",m.slideEl.classList.remove(`${s.zoomedSlideClass}`),m.slideEl=void 0,m.originX=0,m.originY=0)}function I(e){const s=t.zoom;s.scale&&1!==s.scale?L():P(e)}function A(){return{passiveListener:!!t.params.passiveListeners&&{passive:!0,capture:!1},activeListenerWithCapture:!t.params.passiveListeners||{passive:!1,capture:!0}}}function z(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const{passiveListener:s,activeListenerWithCapture:a}=A();t.wrapperEl.addEventListener("pointerdown",x,s),t.wrapperEl.addEventListener("pointermove",S,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.addEventListener(e,T,s)})),t.wrapperEl.addEventListener("pointermove",M,a)}function $(){const e=t.zoom;if(!e.enabled)return;e.enabled=!1;const{passiveListener:s,activeListenerWithCapture:a}=A();t.wrapperEl.removeEventListener("pointerdown",x,s),t.wrapperEl.removeEventListener("pointermove",S,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.removeEventListener(e,T,s)})),t.wrapperEl.removeEventListener("pointermove",M,a)}Object.defineProperty(t.zoom,"scale",{get:()=>v,set(e){if(v!==e){const t=m.imageEl,s=m.slideEl;i("zoomChange",e,t,s)}v=e}}),a("init",(()=>{t.params.zoom.enabled&&z()})),a("destroy",(()=>{$()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;if(!m.imageEl)return;if(h.isTouched)return;s.android&&e.cancelable&&e.preventDefault(),h.isTouched=!0;const a=u.length>0?u[0]:e;h.touchesStart.x=a.pageX,h.touchesStart.y=a.pageY}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(!m.imageEl)return;if(!h.isTouched||!h.isMoved)return h.isTouched=!1,void(h.isMoved=!1);h.isTouched=!1,h.isMoved=!1;let s=300,a=300;const i=g.x*s,r=h.currentX+i,n=g.y*a,l=h.currentY+n;0!==g.x&&(s=Math.abs((r-h.currentX)/g.x)),0!==g.y&&(a=Math.abs((l-h.currentY)/g.y));const o=Math.max(s,a);h.currentX=r,h.currentY=l;const d=h.width*e.scale,c=h.height*e.scale;h.minX=Math.min(m.slideWidth/2-d/2,0),h.maxX=-h.minX,h.minY=Math.min(m.slideHeight/2-c/2,0),h.maxY=-h.minY,h.currentX=Math.max(Math.min(h.currentX,h.maxX),h.minX),h.currentY=Math.max(Math.min(h.currentY,h.maxY),h.minY),m.imageWrapEl.style.transitionDuration=`${o}ms`,m.imageWrapEl.style.transform=`translate3d(${h.currentX}px, ${h.currentY}px,0)`}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&I(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&C()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&C()})),Object.assign(t.zoom,{enable:z,disable:$,in:P,out:L,toggle:I})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{if("undefined"!=typeof window&&("string"==typeof t.params.controller.control||t.params.controller.control instanceof HTMLElement)){const e=document.querySelector(t.params.controller.control);if(e&&e.swiper)t.controller.control=e.swiper;else if(e){const s=a=>{t.controller.control=a.detail[0],t.update(),e.removeEventListener("init",s)};e.addEventListener("init",s)}}else t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&!t.controller.control.destroyed&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&!t.controller.control.destroyed&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){if(e.destroyed)return;const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid)}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),!Number.isNaN(r)&&Number.isFinite(r)||(r=1),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function n(s){s.destroyed||(s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&l((()=>{s.updateAutoHeight()})),x(s.wrapperEl,(()=>{i&&s.transitionEnd()}))))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&n(i[r]);else i instanceof a&&s!==i&&n(i)}})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group",id:null}}),t.a11y={clicked:!1};let i=null;function r(e){const t=i;0!==t.length&&(t.innerHTML="",t.innerHTML=e)}function n(e){(e=T(e)).forEach((e=>{e.setAttribute("tabIndex","0")}))}function l(e){(e=T(e)).forEach((e=>{e.setAttribute("tabIndex","-1")}))}function o(e,t){(e=T(e)).forEach((e=>{e.setAttribute("role",t)}))}function d(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-roledescription",t)}))}function c(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-label",t)}))}function p(e){(e=T(e)).forEach((e=>{e.setAttribute("aria-disabled",!0)}))}function u(e){(e=T(e)).forEach((e=>{e.setAttribute("aria-disabled",!1)}))}function m(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=e.target;t.pagination&&t.pagination.el&&(a===t.pagination.el||t.pagination.el.contains(e.target))&&!e.target.matches(ae(t.params.pagination.bulletClass))||(t.navigation&&t.navigation.nextEl&&a===t.navigation.nextEl&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?r(s.lastSlideMessage):r(s.nextSlideMessage)),t.navigation&&t.navigation.prevEl&&a===t.navigation.prevEl&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?r(s.firstSlideMessage):r(s.prevSlideMessage)),t.pagination&&a.matches(ae(t.params.pagination.bulletClass))&&a.click())}function h(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function f(){return h()&&t.params.pagination.clickable}const g=(e,t,s)=>{n(e),"BUTTON"!==e.tagName&&(o(e,"button"),e.addEventListener("keydown",m)),c(e,s),function(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-controls",t)}))}(e,t)},w=()=>{t.a11y.clicked=!0},b=()=>{requestAnimationFrame((()=>{requestAnimationFrame((()=>{t.destroyed||(t.a11y.clicked=!1)}))}))},E=e=>{if(t.a11y.clicked)return;const s=e.target.closest(`.${t.params.slideClass}, swiper-slide`);if(!s||!t.slides.includes(s))return;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents||(t.isHorizontal()?t.el.scrollLeft=0:t.el.scrollTop=0,t.slideTo(t.slides.indexOf(s),0))},x=()=>{const e=t.params.a11y;e.itemRoleDescriptionMessage&&d(t.slides,e.itemRoleDescriptionMessage),e.slideRole&&o(t.slides,e.slideRole);const s=t.slides.length;e.slideLabelMessage&&t.slides.forEach(((a,i)=>{const r=t.params.loop?parseInt(a.getAttribute("data-swiper-slide-index"),10):i;c(a,e.slideLabelMessage.replace(/\{\{index\}\}/,r+1).replace(/\{\{slidesLength\}\}/,s))}))},S=()=>{const e=t.params.a11y;t.el.append(i);const s=t.el;e.containerRoleDescriptionMessage&&d(s,e.containerRoleDescriptionMessage),e.containerMessage&&c(s,e.containerMessage);const a=t.wrapperEl,r=e.id||a.getAttribute("id")||`swiper-wrapper-${n=16,void 0===n&&(n=16),"x".repeat(n).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var n;const l=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var o;o=r,T(a).forEach((e=>{e.setAttribute("id",o)})),function(e,t){(e=T(e)).forEach((e=>{e.setAttribute("aria-live",t)}))}(a,l),x();let{nextEl:p,prevEl:u}=t.navigation?t.navigation:{};if(p=T(p),u=T(u),p&&p.forEach((t=>g(t,r,e.nextSlideMessage))),u&&u.forEach((t=>g(t,r,e.prevSlideMessage))),f()){T(t.pagination.el).forEach((e=>{e.addEventListener("keydown",m)}))}t.el.addEventListener("focus",E,!0),t.el.addEventListener("pointerdown",w,!0),t.el.addEventListener("pointerup",b,!0)};a("beforeInit",(()=>{i=v("span",t.params.a11y.notificationClass),i.setAttribute("aria-live","assertive"),i.setAttribute("aria-atomic","true")})),a("afterInit",(()=>{t.params.a11y.enabled&&S()})),a("slidesLengthChange snapGridLengthChange slidesGridLengthChange",(()=>{t.params.a11y.enabled&&x()})),a("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{nextEl:e,prevEl:s}=t.navigation;s&&(t.isBeginning?(p(s),l(s)):(u(s),n(s))),e&&(t.isEnd?(p(e),l(e)):(u(e),n(e)))}()})),a("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;h()&&t.pagination.bullets.forEach((s=>{t.params.pagination.clickable&&(n(s),t.params.pagination.renderBullet||(o(s,"button"),c(s,e.paginationBulletMessage.replace(/\{\{index\}\}/,y(s)+1)))),s.matches(ae(t.params.pagination.bulletActiveClass))?s.setAttribute("aria-current","true"):s.removeAttribute("aria-current")}))}()})),a("destroy",(()=>{t.params.a11y.enabled&&function(){i&&i.remove();let{nextEl:e,prevEl:s}=t.navigation?t.navigation:{};e=T(e),s=T(s),e&&e.forEach((e=>e.removeEventListener("keydown",m))),s&&s.forEach((e=>e.removeEventListener("keydown",m))),f()&&T(t.pagination.el).forEach((e=>{e.removeEventListener("keydown",m)}));t.el.removeEventListener("focus",E,!0),t.el.removeEventListener("pointerdown",w,!0),t.el.removeEventListener("pointerup",b,!0)}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.slides[s];let d=l(o.getAttribute("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e?`${e}/`:""}${d}`}else n.pathname.includes(e)||(d=`${e?`${e}/`:""}${d}`);t.params.history.keepQuery&&(d+=n.search);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides[i];if(l(r.getAttribute("data-history"))===s){const s=t.getSlideIndex(r);t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,n.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),n.key||n.value?(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p)):t.params.history.replaceState||e.addEventListener("popstate",p)}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),d=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1,getSlideIndex(e,s){if(t.virtual&&t.params.virtual.enabled){const e=t.slides.filter((e=>e.getAttribute("data-hash")===s))[0];if(!e)return 0;return parseInt(e.getAttribute("data-swiper-slide-index"),10)}return t.getSlideIndex(f(t.slidesEl,`.${t.params.slideClass}[data-hash="${s}"], swiper-slide[data-hash="${s}"]`)[0])}}});const c=()=>{i("hashChange");const e=o.location.hash.replace("#",""),s=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`):t.slides[t.activeIndex];if(e!==(s?s.getAttribute("data-hash"):"")){const s=t.params.hashNavigation.getSlideIndex(t,e);if(void 0===s||Number.isNaN(s))return;t.slideTo(s)}},p=()=>{if(!l||!t.params.hashNavigation.enabled)return;const e=t.virtual&&t.params.virtual.enabled?t.slidesEl.querySelector(`[data-swiper-slide-index="${t.activeIndex}"]`):t.slides[t.activeIndex],s=e?e.getAttribute("data-hash")||e.getAttribute("data-history"):"";t.params.hashNavigation.replaceState&&d.history&&d.history.replaceState?(d.history.replaceState(null,null,`#${s}`||""),i("hashSet")):(o.location.hash=s||"",i("hashSet"))};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0,a=t.params.hashNavigation.getSlideIndex(t,e);t.slideTo(a||0,s,t.params.runCallbacksOnInit,!0)}t.params.hashNavigation.watchState&&d.addEventListener("hashchange",c)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d.removeEventListener("hashchange",c)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&p()})),n("slideChange",(()=>{l&&t.params.cssMode&&p()}))},function(e){let t,s,{swiper:i,extendParams:r,on:n,emit:l,params:o}=e;i.autoplay={running:!1,paused:!1,timeLeft:0},r({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let d,c,p,u,m,h,f,g,v=o&&o.autoplay?o.autoplay.delay:3e3,w=o&&o.autoplay?o.autoplay.delay:3e3,b=(new Date).getTime();function y(e){i&&!i.destroyed&&i.wrapperEl&&e.target===i.wrapperEl&&(i.wrapperEl.removeEventListener("transitionend",y),g||C())}const E=()=>{if(i.destroyed||!i.autoplay.running)return;i.autoplay.paused?c=!0:c&&(w=d,c=!1);const e=i.autoplay.paused?d:b+w-(new Date).getTime();i.autoplay.timeLeft=e,l("autoplayTimeLeft",e,e/v),s=requestAnimationFrame((()=>{E()}))},x=e=>{if(i.destroyed||!i.autoplay.running)return;cancelAnimationFrame(s),E();let a=void 0===e?i.params.autoplay.delay:e;v=i.params.autoplay.delay,w=i.params.autoplay.delay;const r=(()=>{let e;if(e=i.virtual&&i.params.virtual.enabled?i.slides.filter((e=>e.classList.contains("swiper-slide-active")))[0]:i.slides[i.activeIndex],!e)return;return parseInt(e.getAttribute("data-swiper-autoplay"),10)})();!Number.isNaN(r)&&r>0&&void 0===e&&(a=r,v=r,w=r),d=a;const n=i.params.speed,o=()=>{i&&!i.destroyed&&(i.params.autoplay.reverseDirection?!i.isBeginning||i.params.loop||i.params.rewind?(i.slidePrev(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(i.slides.length-1,n,!0,!0),l("autoplay")):!i.isEnd||i.params.loop||i.params.rewind?(i.slideNext(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(0,n,!0,!0),l("autoplay")),i.params.cssMode&&(b=(new Date).getTime(),requestAnimationFrame((()=>{x()}))))};return a>0?(clearTimeout(t),t=setTimeout((()=>{o()}),a)):requestAnimationFrame((()=>{o()})),a},S=()=>{b=(new Date).getTime(),i.autoplay.running=!0,x(),l("autoplayStart")},T=()=>{i.autoplay.running=!1,clearTimeout(t),cancelAnimationFrame(s),l("autoplayStop")},M=(e,s)=>{if(i.destroyed||!i.autoplay.running)return;clearTimeout(t),e||(f=!0);const a=()=>{l("autoplayPause"),i.params.autoplay.waitForTransition?i.wrapperEl.addEventListener("transitionend",y):C()};if(i.autoplay.paused=!0,s)return h&&(d=i.params.autoplay.delay),h=!1,void a();const r=d||i.params.autoplay.delay;d=r-((new Date).getTime()-b),i.isEnd&&d<0&&!i.params.loop||(d<0&&(d=0),a())},C=()=>{i.isEnd&&d<0&&!i.params.loop||i.destroyed||!i.autoplay.running||(b=(new Date).getTime(),f?(f=!1,x(d)):x(),i.autoplay.paused=!1,l("autoplayResume"))},P=()=>{if(i.destroyed||!i.autoplay.running)return;const e=a();"hidden"===e.visibilityState&&(f=!0,M(!0)),"visible"===e.visibilityState&&C()},L=e=>{"mouse"===e.pointerType&&(f=!0,g=!0,i.animating||i.autoplay.paused||M(!0))},I=e=>{"mouse"===e.pointerType&&(g=!1,i.autoplay.paused&&C())};n("init",(()=>{i.params.autoplay.enabled&&(i.params.autoplay.pauseOnMouseEnter&&(i.el.addEventListener("pointerenter",L),i.el.addEventListener("pointerleave",I)),a().addEventListener("visibilitychange",P),S())})),n("destroy",(()=>{i.el.removeEventListener("pointerenter",L),i.el.removeEventListener("pointerleave",I),a().removeEventListener("visibilitychange",P),i.autoplay.running&&T()})),n("_freeModeStaticRelease",(()=>{(u||f)&&C()})),n("_freeModeNoMomentumRelease",(()=>{i.params.autoplay.disableOnInteraction?T():M(!0,!0)})),n("beforeTransitionStart",((e,t,s)=>{!i.destroyed&&i.autoplay.running&&(s||!i.params.autoplay.disableOnInteraction?M(!0,!0):T())})),n("sliderFirstMove",(()=>{!i.destroyed&&i.autoplay.running&&(i.params.autoplay.disableOnInteraction?T():(p=!0,u=!1,f=!1,m=setTimeout((()=>{f=!0,u=!0,M(!0)}),200)))})),n("touchEnd",(()=>{if(!i.destroyed&&i.autoplay.running&&p){if(clearTimeout(m),clearTimeout(t),i.params.autoplay.disableOnInteraction)return u=!1,void(p=!1);u&&i.params.cssMode&&C(),u=!1,p=!1}})),n("slideChange",(()=>{!i.destroyed&&i.autoplay.running&&(h=!0)})),Object.assign(i.autoplay,{start:S,stop:T,pause:M,resume:C})},function(e){let{swiper:t,extendParams:s,on:i}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let r=!1,n=!1;function l(){const e=t.thumbs.swiper;if(!e||e.destroyed)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&a.classList.contains(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;i=e.params.loop?parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10):s,t.params.loop?t.slideToLoop(i):t.slideTo(i)}function o(){const{thumbs:e}=t.params;if(r)return!1;r=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper.update();else if(c(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),n=!0}return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",l),!0}function d(e){const s=t.thumbs.swiper;if(!s||s.destroyed)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView;let i=1;const r=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(i=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(i=1),i=Math.floor(i),s.slides.forEach((e=>e.classList.remove(r))),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<i;e+=1)f(s.slidesEl,`[data-swiper-slide-index="${t.realIndex+e}"]`).forEach((e=>{e.classList.add(r)}));else for(let e=0;e<i;e+=1)s.slides[t.realIndex+e]&&s.slides[t.realIndex+e].classList.add(r);const n=t.params.thumbs.autoScrollOffset,l=n&&!s.params.loop;if(t.realIndex!==s.realIndex||l){const i=s.activeIndex;let r,o;if(s.params.loop){const e=s.slides.filter((e=>e.getAttribute("data-swiper-slide-index")===`${t.realIndex}`))[0];r=s.slides.indexOf(e),o=t.activeIndex>t.previousIndex?"next":"prev"}else r=t.realIndex,o=r>t.previousIndex?"next":"prev";l&&(r+="next"===o?n:-1*n),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(r)<0&&(s.params.centeredSlides?r=r>i?r-Math.floor(a/2)+1:r+Math.floor(a/2)-1:r>i&&s.params.slidesPerGroup,s.slideTo(r,e?0:void 0))}}t.thumbs={swiper:null},i("beforeInit",(()=>{const{thumbs:e}=t.params;if(e&&e.swiper)if("string"==typeof e.swiper||e.swiper instanceof HTMLElement){const s=a(),i=()=>{const a="string"==typeof e.swiper?s.querySelector(e.swiper):e.swiper;if(a&&a.swiper)e.swiper=a.swiper,o(),d(!0);else if(a){const s=i=>{e.swiper=i.detail[0],a.removeEventListener("init",s),o(),d(!0),e.swiper.update(),t.update()};a.addEventListener("init",s)}return a},r=()=>{if(t.destroyed)return;i()||requestAnimationFrame(r)};requestAnimationFrame(r)}else o(),d(!0)})),i("slideChange update resize observerUpdate",(()=>{d()})),i("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&!a.destroyed&&a.setTransition(s)})),i("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&!e.destroyed&&n&&e.destroy()})),Object.assign(t.thumbs,{init:o,update:d})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){if(t.params.cssMode)return;const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){if(t.params.cssMode)return;const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:o()})},onTouchEnd:function(e){let{currentPos:s}=e;if(t.params.cssMode)return;const{params:r,wrapperEl:n,rtlTranslate:l,snapGrid:d,touchEventsData:c}=t,p=o()-c.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<d.length?t.slideTo(d.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(c.velocities.length>1){const e=c.velocities.pop(),s=c.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||o()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,c.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let p=t.translate+s;l&&(p=-p);let u,m=!1;const h=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(p<t.maxTranslate())r.freeMode.momentumBounce?(p+t.maxTranslate()<-h&&(p=t.maxTranslate()-h),u=t.maxTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(p>t.minTranslate())r.freeMode.momentumBounce?(p-t.minTranslate()>h&&(p=t.minTranslate()+h),u=t.minTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<d.length;t+=1)if(d[t]>-p){e=t;break}p=Math.abs(d[e]-p)<Math.abs(d[e-1]-p)||"next"===t.swipeDirection?d[e]:d[e-1],p=-p}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=l?Math.abs((-p-t.translate)/t.velocity):Math.abs((p-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((l?-p:p)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&m?(t.updateProgress(u),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating=!0,x(n,(()=>{t&&!t.destroyed&&c.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(u),x(n,(()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(p),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,x(n,(()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(p),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||p>=r.longSwipesMs)&&(a("_freeModeStaticRelease"),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,i,{swiper:r,extendParams:n,on:l}=e;n({grid:{rows:1,fill:"column"}});const o=()=>{let e=r.params.spaceBetween;return"string"==typeof e&&e.indexOf("%")>=0?e=parseFloat(e.replace("%",""))/100*r.size:"string"==typeof e&&(e=parseFloat(e)),e};l("init",(()=>{i=r.params.grid&&r.params.grid.rows>1})),l("update",(()=>{const{params:e,el:t}=r,s=e.grid&&e.grid.rows>1;i&&!s?(t.classList.remove(`${e.containerModifierClass}grid`,`${e.containerModifierClass}grid-column`),a=1,r.emitContainerClasses()):!i&&s&&(t.classList.add(`${e.containerModifierClass}grid`),"column"===e.grid.fill&&t.classList.add(`${e.containerModifierClass}grid-column`),r.emitContainerClasses()),i=s})),r.grid={initSlides:e=>{const{slidesPerView:i}=r.params,{rows:n,fill:l}=r.params.grid,o=r.virtual&&r.params.virtual.enabled?r.virtual.slides.length:e.length;a=Math.floor(o/n),t=Math.floor(o/n)===o/n?o:Math.ceil(o/n)*n,"auto"!==i&&"row"===l&&(t=Math.max(t,i*n)),s=t/n},unsetSlides:()=>{r.slides&&r.slides.forEach((e=>{e.swiperSlideGridSet&&(e.style.height="",e.style[r.getDirectionLabel("margin-top")]="")}))},updateSlide:(e,i,n)=>{const{slidesPerGroup:l}=r.params,d=o(),{rows:c,fill:p}=r.params.grid,u=r.virtual&&r.params.virtual.enabled?r.virtual.slides.length:n.length;let m,h,f;if("row"===p&&l>1){const s=Math.floor(e/(l*c)),a=e-c*l*s,r=0===s?l:Math.min(Math.ceil((u-s*c*l)/c),l);f=Math.floor(a/r),h=a-f*r+s*l,m=h+f*t/c,i.style.order=m}else"column"===p?(h=Math.floor(e/c),f=e-h*c,(h>a||h===a&&f===c-1)&&(f+=1,f>=c&&(f=0,h+=1))):(f=Math.floor(e/s),h=e-f*s);i.row=f,i.column=h,i.style.height=`calc((100% - ${(c-1)*d}px) / ${c})`,i.style[r.getDirectionLabel("margin-top")]=0!==f?d&&`${d}px`:"",i.swiperSlideGridSet=!0},updateWrapperSize:(e,s)=>{const{centeredSlides:a,roundLengths:i}=r.params,n=o(),{rows:l}=r.params.grid;if(r.virtualSize=(e+n)*t,r.virtualSize=Math.ceil(r.virtualSize/l)-n,r.params.cssMode||(r.wrapperEl.style[r.getDirectionLabel("width")]=`${r.virtualSize+n}px`),a){const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];i&&(a=Math.floor(a)),s[t]<r.virtualSize+s[0]&&e.push(a)}s.splice(0,s.length),s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:ie.bind(t),prependSlide:re.bind(t),addSlide:ne.bind(t),removeSlide:le.bind(t),removeAllSlides:oe.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1}}),de({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t;t.params.fadeEffect;for(let s=0;s<e.length;s+=1){const e=t.slides[s];let a=-e.swiperSlideOffset;t.params.virtualTranslate||(a-=t.translate);let i=0;t.isHorizontal()||(i=a,a=0);const r=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e.progress),0):1+Math.min(Math.max(e.progress,-1),0),n=ce(0,e);n.style.opacity=r,n.style.transform=`translate3d(${a}px, ${i}px, 0px)`}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`})),pe({swiper:t,duration:e,transformElements:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const i=(e,t,s)=>{let a=s?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=s?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=v("div",("swiper-slide-shadow-cube swiper-slide-shadow-"+(s?"left":"top")).split(" ")),e.append(a)),i||(i=v("div",("swiper-slide-shadow-cube swiper-slide-shadow-"+(s?"right":"bottom")).split(" ")),e.append(i)),a&&(a.style.opacity=Math.max(-t,0)),i&&(i.style.opacity=Math.max(t,0))};de({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{el:e,wrapperEl:s,slides:a,width:r,height:n,rtlTranslate:l,size:o,browser:d}=t,c=t.params.cubeEffect,p=t.isHorizontal(),u=t.virtual&&t.params.virtual.enabled;let m,h=0;c.shadow&&(p?(m=t.wrapperEl.querySelector(".swiper-cube-shadow"),m||(m=v("div","swiper-cube-shadow"),t.wrapperEl.append(m)),m.style.height=`${r}px`):(m=e.querySelector(".swiper-cube-shadow"),m||(m=v("div","swiper-cube-shadow"),e.append(m))));for(let e=0;e<a.length;e+=1){const s=a[e];let r=e;u&&(r=parseInt(s.getAttribute("data-swiper-slide-index"),10));let n=90*r,d=Math.floor(n/360);l&&(n=-n,d=Math.floor(-n/360));const m=Math.max(Math.min(s.progress,1),-1);let f=0,g=0,v=0;r%4==0?(f=4*-d*o,v=0):(r-1)%4==0?(f=0,v=4*-d*o):(r-2)%4==0?(f=o+4*d*o,v=o):(r-3)%4==0&&(f=-o,v=3*o+4*o*d),l&&(f=-f),p||(g=f,f=0);const w=`rotateX(${p?0:-n}deg) rotateY(${p?n:0}deg) translate3d(${f}px, ${g}px, ${v}px)`;m<=1&&m>-1&&(h=90*r+90*m,l&&(h=90*-r-90*m),t.browser&&t.browser.need3dFix&&Math.abs(h)/90%2==1&&(h+=.001)),s.style.transform=w,c.slideShadows&&i(s,m,p)}if(s.style.transformOrigin=`50% 50% -${o/2}px`,s.style["-webkit-transform-origin"]=`50% 50% -${o/2}px`,c.shadow)if(p)m.style.transform=`translate3d(0px, ${r/2+c.shadowOffset}px, ${-r/2}px) rotateX(89.99deg) rotateZ(0deg) scale(${c.shadowScale})`;else{const e=Math.abs(h)-90*Math.floor(Math.abs(h)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=c.shadowScale,a=c.shadowScale/t,i=c.shadowOffset;m.style.transform=`scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-89.99deg)`}const f=(d.isSafari||d.isWebView)&&d.needPerspectiveFix?-o/2:0;s.style.transform=`translate3d(0px,0,${f}px) rotateX(${t.isHorizontal()?0:h}deg) rotateY(${t.isHorizontal()?-h:0}deg)`,s.style.setProperty("--swiper-cube-translate-z",`${f}px`)},setTransition:e=>{const{el:s,slides:a}=t;if(a.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),t.params.cubeEffect.shadow&&!t.isHorizontal()){const t=s.querySelector(".swiper-cube-shadow");t&&(t.style.transitionDuration=`${e}ms`)}},recreateShadows:()=>{const e=t.isHorizontal();t.slides.forEach((t=>{const s=Math.max(Math.min(t.progress,1),-1);i(t,s,e)}))},getEffectParams:()=>t.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0}});const i=(e,s)=>{let a=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=ue("flip",e,t.isHorizontal()?"left":"top")),i||(i=ue("flip",e,t.isHorizontal()?"right":"bottom")),a&&(a.style.opacity=Math.max(-s,0)),i&&(i.style.opacity=Math.max(s,0))};de({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect;for(let r=0;r<e.length;r+=1){const n=e[r];let l=n.progress;t.params.flipEffect.limitRotation&&(l=Math.max(Math.min(n.progress,1),-1));const o=n.swiperSlideOffset;let d=-180*l,c=0,p=t.params.cssMode?-o-t.translate:-o,u=0;t.isHorizontal()?s&&(d=-d):(u=p,p=0,c=-d,d=0),t.browser&&t.browser.need3dFix&&(Math.abs(d)/90%2==1&&(d+=.001),Math.abs(c)/90%2==1&&(c+=.001)),n.style.zIndex=-Math.abs(Math.round(l))+e.length,a.slideShadows&&i(n,l);const m=`translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;ce(0,n).style.transform=m}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),pe({swiper:t,duration:e,transformElements:s})},recreateShadows:()=>{t.params.flipEffect,t.slides.forEach((e=>{let s=e.progress;t.params.flipEffect.limitRotation&&(s=Math.max(Math.min(e.progress,1),-1)),i(e,s)}))},getEffectParams:()=>t.params.flipEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),de({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth;for(let e=0,s=a.length;e<s;e+=1){const s=a[e],l=i[e],p=(o-s.swiperSlideOffset-l/2)/l,u="function"==typeof r.modifier?r.modifier(p):p*r.modifier;let m=n?d*u:0,h=n?0:d*u,f=-c*Math.abs(u),g=r.stretch;"string"==typeof g&&-1!==g.indexOf("%")&&(g=parseFloat(r.stretch)/100*l);let v=n?0:g*u,w=n?g*u:0,b=1-(1-r.scale)*Math.abs(u);Math.abs(w)<.001&&(w=0),Math.abs(v)<.001&&(v=0),Math.abs(f)<.001&&(f=0),Math.abs(m)<.001&&(m=0),Math.abs(h)<.001&&(h=0),Math.abs(b)<.001&&(b=0),t.browser&&t.browser.need3dFix&&(Math.abs(m)/90%2==1&&(m+=.001),Math.abs(h)/90%2==1&&(h+=.001));const y=`translate3d(${w}px,${v}px,${f}px)  rotateX(${h}deg) rotateY(${m}deg) scale(${b})`;if(ce(0,s).style.transform=y,s.style.zIndex=1-Math.abs(Math.round(u)),r.slideShadows){let e=n?s.querySelector(".swiper-slide-shadow-left"):s.querySelector(".swiper-slide-shadow-top"),t=n?s.querySelector(".swiper-slide-shadow-right"):s.querySelector(".swiper-slide-shadow-bottom");e||(e=ue("coverflow",s,n?"left":"top")),t||(t=ue("coverflow",s,n?"right":"bottom")),e&&(e.style.opacity=u>0?u:0),t&&(t.style.opacity=-u>0?-u:0)}}},setTransition:e=>{t.slides.map((e=>h(e))).forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))}))},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;de({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides;if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.style.transform=`translateX(calc(50% - ${e}px))`}for(let s=0;s<e.length;s+=1){const a=e[s],o=a.progress,d=Math.min(Math.max(a.progress,-r.limitProgress),r.limitProgress);let c=d;l||(c=Math.min(Math.max(a.originalProgress,-r.limitProgress),r.limitProgress));const p=a.swiperSlideOffset,u=[t.params.cssMode?-p-t.translate:-p,0,0],m=[0,0,0];let h=!1;t.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,h=!0):d>0&&(f=r.prev,h=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`})),m.forEach(((e,s)=>{let a=f.rotate[s]*Math.abs(d*n);t.browser&&t.browser.need3dFix&&Math.abs(a)/90%2==1&&(a+=.001),m[s]=a})),a.style.zIndex=-Math.abs(Math.round(o))+e.length;const g=u.join(", "),v=`rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,w=c<0?`scale(${1+(1-f.scale)*c*n})`:`scale(${1-(1-f.scale)*c*n})`,b=c<0?1+(1-f.opacity)*c*n:1-(1-f.opacity)*c*n,y=`translate3d(${g}) ${v} ${w}`;if(h&&f.shadow||!h){let e=a.querySelector(".swiper-slide-shadow");if(!e&&f.shadow&&(e=ue("creative",a)),e){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e.style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const E=ce(0,a);E.style.transform=y,E.style.opacity=b,f.origin&&(E.style.transformOrigin=f.origin)}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),pe({swiper:t,duration:e,transformElements:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,rotate:!0,perSlideRotate:2,perSlideOffset:8}}),de({effect:"cards",swiper:t,on:a,setTranslate:()=>{const{slides:e,activeIndex:s,rtlTranslate:a}=t,i=t.params.cardsEffect,{startTranslate:r,isTouched:n}=t.touchEventsData,l=a?-t.translate:t.translate;for(let o=0;o<e.length;o+=1){const d=e[o],c=d.progress,p=Math.min(Math.max(c,-4),4);let u=d.swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&(t.wrapperEl.style.transform=`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(u-=e[0].swiperSlideOffset);let m=t.params.cssMode?-u-t.translate:-u,h=0;const f=-100*Math.abs(p);let g=1,v=-i.perSlideRotate*p,w=i.perSlideOffset-.75*Math.abs(p);const b=t.virtual&&t.params.virtual.enabled?t.virtual.from+o:o,y=(b===s||b===s-1)&&p>0&&p<1&&(n||t.params.cssMode)&&l<r,E=(b===s||b===s+1)&&p<0&&p>-1&&(n||t.params.cssMode)&&l>r;if(y||E){const e=(1-Math.abs((Math.abs(p)-.5)/.5))**.5;v+=-28*p*e,g+=-.5*e,w+=96*e,h=-25*e*Math.abs(p)+"%"}if(m=p<0?`calc(${m}px ${a?"-":"+"} (${w*Math.abs(p)}%))`:p>0?`calc(${m}px ${a?"-":"+"} (-${w*Math.abs(p)}%))`:`${m}px`,!t.isHorizontal()){const e=h;h=m,m=e}const x=p<0?""+(1+(1-g)*p):""+(1-(1-g)*p),S=`\n        translate3d(${m}, ${h}, ${f}px)\n        rotateZ(${i.rotate?a?-v:v:0}deg)\n        scale(${x})\n      `;if(i.slideShadows){let e=d.querySelector(".swiper-slide-shadow");e||(e=ue("cards",d)),e&&(e.style.opacity=Math.min(Math.max((Math.abs(p)-.5)/.5,0),1))}d.style.zIndex=-Math.abs(Math.round(c))+e.length;ce(0,d).style.transform=S}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),pe({swiper:t,duration:e,transformElements:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return te.use(me),te}();
//# sourceMappingURL=swiper-bundle.min.js.map
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], e)
    : e(
        ((t =
          "undefined" != typeof globalThis ? globalThis : t || self).window =
          t.window || {})
      );
})(this, function (t) {
  "use strict";
  const e = (t, e = 1e4) => (
      (t = parseFloat(t + "") || 0), Math.round((t + Number.EPSILON) * e) / e
    ),
    i = function (t) {
      if (!(t && t instanceof Element && t.offsetParent)) return !1;
      const e = t.scrollHeight > t.clientHeight,
        i = window.getComputedStyle(t).overflowY,
        n = -1 !== i.indexOf("hidden"),
        s = -1 !== i.indexOf("visible");
      return e && !n && !s;
    },
    n = function (t, e = void 0) {
      return (
        !(!t || t === document.body || (e && t === e)) &&
        (i(t) ? t : n(t.parentElement, e))
      );
    },
    s = function (t) {
      var e = new DOMParser().parseFromString(t, "text/html").body;
      if (e.childElementCount > 1) {
        for (var i = document.createElement("div"); e.firstChild; )
          i.appendChild(e.firstChild);
        return i;
      }
      return e.firstChild;
    },
    o = (t) => `${t || ""}`.split(" ").filter((t) => !!t),
    a = (t, e, i) => {
      t &&
        o(e).forEach((e) => {
          t.classList.toggle(e, i || !1);
        });
    };
  class r {
    constructor(t) {
      Object.defineProperty(this, "pageX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        Object.defineProperty(this, "pageY", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "clientX", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "clientY", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "id", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "time", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "nativePointer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.nativePointer = t),
        (this.pageX = t.pageX),
        (this.pageY = t.pageY),
        (this.clientX = t.clientX),
        (this.clientY = t.clientY),
        (this.id = self.Touch && t instanceof Touch ? t.identifier : -1),
        (this.time = Date.now());
    }
  }
  const l = { passive: !1 };
  class c {
    constructor(
      t,
      { start: e = () => !0, move: i = () => {}, end: n = () => {} }
    ) {
      Object.defineProperty(this, "element", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
        Object.defineProperty(this, "startCallback", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "moveCallback", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "endCallback", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "currentPointers", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: [],
        }),
        Object.defineProperty(this, "startPointers", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: [],
        }),
        (this.element = t),
        (this.startCallback = e),
        (this.moveCallback = i),
        (this.endCallback = n);
      for (const t of [
        "onPointerStart",
        "onTouchStart",
        "onMove",
        "onTouchEnd",
        "onPointerEnd",
        "onWindowBlur",
      ])
        this[t] = this[t].bind(this);
      this.element.addEventListener("mousedown", this.onPointerStart, l),
        this.element.addEventListener("touchstart", this.onTouchStart, l),
        this.element.addEventListener("touchmove", this.onMove, l),
        this.element.addEventListener("touchend", this.onTouchEnd),
        this.element.addEventListener("touchcancel", this.onTouchEnd);
    }
    onPointerStart(t) {
      if (!t.buttons || 0 !== t.button) return;
      const e = new r(t);
      this.currentPointers.some((t) => t.id === e.id) ||
        (this.triggerPointerStart(e, t) &&
          (window.addEventListener("mousemove", this.onMove),
          window.addEventListener("mouseup", this.onPointerEnd),
          window.addEventListener("blur", this.onWindowBlur)));
    }
    onTouchStart(t) {
      for (const e of Array.from(t.changedTouches || []))
        this.triggerPointerStart(new r(e), t);
      window.addEventListener("blur", this.onWindowBlur);
    }
    onMove(t) {
      const e = this.currentPointers.slice(),
        i =
          "changedTouches" in t
            ? Array.from(t.changedTouches || []).map((t) => new r(t))
            : [new r(t)],
        n = [];
      for (const t of i) {
        const e = this.currentPointers.findIndex((e) => e.id === t.id);
        e < 0 || (n.push(t), (this.currentPointers[e] = t));
      }
      n.length && this.moveCallback(t, this.currentPointers.slice(), e);
    }
    onPointerEnd(t) {
      (t.buttons > 0 && 0 !== t.button) ||
        (this.triggerPointerEnd(t, new r(t)),
        window.removeEventListener("mousemove", this.onMove),
        window.removeEventListener("mouseup", this.onPointerEnd),
        window.removeEventListener("blur", this.onWindowBlur));
    }
    onTouchEnd(t) {
      for (const e of Array.from(t.changedTouches || []))
        this.triggerPointerEnd(t, new r(e));
    }
    triggerPointerStart(t, e) {
      return (
        !!this.startCallback(e, t, this.currentPointers.slice()) &&
        (this.currentPointers.push(t), this.startPointers.push(t), !0)
      );
    }
    triggerPointerEnd(t, e) {
      const i = this.currentPointers.findIndex((t) => t.id === e.id);
      i < 0 ||
        (this.currentPointers.splice(i, 1),
        this.startPointers.splice(i, 1),
        this.endCallback(t, e, this.currentPointers.slice()));
    }
    onWindowBlur() {
      this.clear();
    }
    clear() {
      for (; this.currentPointers.length; ) {
        const t = this.currentPointers[this.currentPointers.length - 1];
        this.currentPointers.splice(this.currentPointers.length - 1, 1),
          this.startPointers.splice(this.currentPointers.length - 1, 1),
          this.endCallback(
            new Event("touchend", {
              bubbles: !0,
              cancelable: !0,
              clientX: t.clientX,
              clientY: t.clientY,
            }),
            t,
            this.currentPointers.slice()
          );
      }
    }
    stop() {
      this.element.removeEventListener("mousedown", this.onPointerStart, l),
        this.element.removeEventListener("touchstart", this.onTouchStart, l),
        this.element.removeEventListener("touchmove", this.onMove, l),
        this.element.removeEventListener("touchend", this.onTouchEnd),
        this.element.removeEventListener("touchcancel", this.onTouchEnd),
        window.removeEventListener("mousemove", this.onMove),
        window.removeEventListener("mouseup", this.onPointerEnd),
        window.removeEventListener("blur", this.onWindowBlur);
    }
  }
  function h(t, e) {
    return e
      ? Math.sqrt(
          Math.pow(e.clientX - t.clientX, 2) +
            Math.pow(e.clientY - t.clientY, 2)
        )
      : 0;
  }
  function d(t, e) {
    return e
      ? {
          clientX: (t.clientX + e.clientX) / 2,
          clientY: (t.clientY + e.clientY) / 2,
        }
      : t;
  }
  const u = (t) =>
      "object" == typeof t &&
      null !== t &&
      t.constructor === Object &&
      "[object Object]" === Object.prototype.toString.call(t),
    p = (t, ...e) => {
      const i = e.length;
      for (let n = 0; n < i; n++) {
        const i = e[n] || {};
        Object.entries(i).forEach(([e, i]) => {
          const n = Array.isArray(i) ? [] : {};
          t[e] || Object.assign(t, { [e]: n }),
            u(i)
              ? Object.assign(t[e], p(n, i))
              : Array.isArray(i)
              ? Object.assign(t, { [e]: [...i] })
              : Object.assign(t, { [e]: i });
        });
      }
      return t;
    },
    f = function (t, e) {
      return t
        .split(".")
        .reduce((t, e) => ("object" == typeof t ? t[e] : void 0), e);
    };
  class g {
    constructor(t = {}) {
      Object.defineProperty(this, "options", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t,
      }),
        Object.defineProperty(this, "events", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: new Map(),
        }),
        this.setOptions(t);
      for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this)))
        t.startsWith("on") &&
          "function" == typeof this[t] &&
          (this[t] = this[t].bind(this));
    }
    setOptions(t) {
      this.options = t ? p({}, this.constructor.defaults, t) : {};
      for (const [t, e] of Object.entries(this.option("on") || {}))
        this.on(t, e);
    }
    option(t, ...e) {
      let i = f(t, this.options);
      return i && "function" == typeof i && (i = i.call(this, this, ...e)), i;
    }
    optionFor(t, e, i, ...n) {
      let s = f(e, t);
      var o;
      "string" != typeof (o = s) ||
        isNaN(o) ||
        isNaN(parseFloat(o)) ||
        (s = parseFloat(s)),
        "true" === s && (s = !0),
        "false" === s && (s = !1),
        s && "function" == typeof s && (s = s.call(this, this, t, ...n));
      let a = f(e, this.options);
      return (
        a && "function" == typeof a
          ? (s = a.call(this, this, t, ...n, s))
          : void 0 === s && (s = a),
        void 0 === s ? i : s
      );
    }
    cn(t) {
      const e = this.options.classes;
      return (e && e[t]) || "";
    }
    localize(t, e = []) {
      t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t, e, i) => {
        let n = "";
        return (
          i
            ? (n = this.option(
                `${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`
              ))
            : e && (n = this.option(`l10n.${e}`)),
          n || (n = t),
          n
        );
      });
      for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
      return (t = t.replace(/\{\{(.*?)\}\}/g, (t, e) => e));
    }
    on(t, e) {
      let i = [];
      "string" == typeof t ? (i = t.split(" ")) : Array.isArray(t) && (i = t),
        this.events || (this.events = new Map()),
        i.forEach((t) => {
          let i = this.events.get(t);
          i || (this.events.set(t, []), (i = [])),
            i.includes(e) || i.push(e),
            this.events.set(t, i);
        });
    }
    off(t, e) {
      let i = [];
      "string" == typeof t ? (i = t.split(" ")) : Array.isArray(t) && (i = t),
        i.forEach((t) => {
          const i = this.events.get(t);
          if (Array.isArray(i)) {
            const t = i.indexOf(e);
            t > -1 && i.splice(t, 1);
          }
        });
    }
    emit(t, ...e) {
      [...(this.events.get(t) || [])].forEach((t) => t(this, ...e)),
        "*" !== t && this.emit("*", t, ...e);
    }
  }
  Object.defineProperty(g, "version", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: "5.0.36",
  }),
    Object.defineProperty(g, "defaults", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {},
    });
  class m extends g {
    constructor(t = {}) {
      super(t),
        Object.defineProperty(this, "plugins", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: {},
        });
    }
    attachPlugins(t = {}) {
      const e = new Map();
      for (const [i, n] of Object.entries(t)) {
        const t = this.option(i),
          s = this.plugins[i];
        s || !1 === t
          ? s && !1 === t && (s.detach(), delete this.plugins[i])
          : e.set(i, new n(this, t || {}));
      }
      for (const [t, i] of e) (this.plugins[t] = i), i.attach();
    }
    detachPlugins(t) {
      t = t || Object.keys(this.plugins);
      for (const e of t) {
        const t = this.plugins[e];
        t && t.detach(), delete this.plugins[e];
      }
      return this.emit("detachPlugins"), this;
    }
  }
  var v;
  !(function (t) {
    (t[(t.Init = 0)] = "Init"),
      (t[(t.Error = 1)] = "Error"),
      (t[(t.Ready = 2)] = "Ready"),
      (t[(t.Panning = 3)] = "Panning"),
      (t[(t.Mousemove = 4)] = "Mousemove"),
      (t[(t.Destroy = 5)] = "Destroy");
  })(v || (v = {}));
  const b = ["a", "b", "c", "d", "e", "f"],
    y = {
      PANUP: "Move up",
      PANDOWN: "Move down",
      PANLEFT: "Move left",
      PANRIGHT: "Move right",
      ZOOMIN: "Zoom in",
      ZOOMOUT: "Zoom out",
      TOGGLEZOOM: "Toggle zoom level",
      TOGGLE1TO1: "Toggle zoom level",
      ITERATEZOOM: "Toggle zoom level",
      ROTATECCW: "Rotate counterclockwise",
      ROTATECW: "Rotate clockwise",
      FLIPX: "Flip horizontally",
      FLIPY: "Flip vertically",
      FITX: "Fit horizontally",
      FITY: "Fit vertically",
      RESET: "Reset",
      TOGGLEFS: "Toggle fullscreen",
    },
    w = {
      content: null,
      width: "auto",
      height: "auto",
      panMode: "drag",
      touch: !0,
      dragMinThreshold: 3,
      lockAxis: !1,
      mouseMoveFactor: 1,
      mouseMoveFriction: 0.12,
      zoom: !0,
      pinchToZoom: !0,
      panOnlyZoomed: "auto",
      minScale: 1,
      maxScale: 2,
      friction: 0.25,
      dragFriction: 0.35,
      decelFriction: 0.05,
      click: "toggleZoom",
      dblClick: !1,
      wheel: "zoom",
      wheelLimit: 7,
      spinner: !0,
      bounds: "auto",
      infinite: !1,
      rubberband: !0,
      bounce: !0,
      maxVelocity: 75,
      transformParent: !1,
      classes: {
        content: "f-panzoom__content",
        isLoading: "is-loading",
        canZoomIn: "can-zoom_in",
        canZoomOut: "can-zoom_out",
        isDraggable: "is-draggable",
        isDragging: "is-dragging",
        inFullscreen: "in-fullscreen",
        htmlHasFullscreen: "with-panzoom-in-fullscreen",
      },
      l10n: y,
    },
    x = '<circle cx="25" cy="25" r="20"></circle>',
    E =
      '<div class="f-spinner"><svg viewBox="0 0 50 50">' +
      x +
      x +
      "</svg></div>",
    S = (t) => t && null !== t && t instanceof Element && "nodeType" in t,
    P = (t, e) => {
      t &&
        o(e).forEach((e) => {
          t.classList.remove(e);
        });
    },
    C = (t, e) => {
      t &&
        o(e).forEach((e) => {
          t.classList.add(e);
        });
    },
    T = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 },
    M = 1e5,
    O = 1e4,
    A = "mousemove",
    L = "drag",
    z = "content",
    R = "auto";
  let k = null,
    I = null;
  class D extends m {
    get fits() {
      return (
        this.contentRect.width - this.contentRect.fitWidth < 1 &&
        this.contentRect.height - this.contentRect.fitHeight < 1
      );
    }
    get isTouchDevice() {
      return null === I && (I = window.matchMedia("(hover: none)").matches), I;
    }
    get isMobile() {
      return (
        null === k &&
          (k = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
        k
      );
    }
    get panMode() {
      return this.options.panMode !== A || this.isTouchDevice ? L : A;
    }
    get panOnlyZoomed() {
      const t = this.options.panOnlyZoomed;
      return t === R ? this.isTouchDevice : t;
    }
    get isInfinite() {
      return this.option("infinite");
    }
    get angle() {
      return (180 * Math.atan2(this.current.b, this.current.a)) / Math.PI || 0;
    }
    get targetAngle() {
      return (180 * Math.atan2(this.target.b, this.target.a)) / Math.PI || 0;
    }
    get scale() {
      const { a: t, b: e } = this.current;
      return Math.sqrt(t * t + e * e) || 1;
    }
    get targetScale() {
      const { a: t, b: e } = this.target;
      return Math.sqrt(t * t + e * e) || 1;
    }
    get minScale() {
      return this.option("minScale") || 1;
    }
    get fullScale() {
      const { contentRect: t } = this;
      return t.fullWidth / t.fitWidth || 1;
    }
    get maxScale() {
      return this.fullScale * (this.option("maxScale") || 1) || 1;
    }
    get coverScale() {
      const { containerRect: t, contentRect: e } = this,
        i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
      return Math.min(this.fullScale, i);
    }
    get isScaling() {
      return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
    }
    get isContentLoading() {
      const t = this.content;
      return !!(t && t instanceof HTMLImageElement) && !t.complete;
    }
    get isResting() {
      if (this.isBouncingX || this.isBouncingY) return !1;
      for (const t of b) {
        const e = "e" == t || "f" === t ? 1e-4 : 1e-5;
        if (Math.abs(this.target[t] - this.current[t]) > e) return !1;
      }
      return !(!this.ignoreBounds && !this.checkBounds().inBounds);
    }
    constructor(t, e = {}, i = {}) {
      var n;
      if (
        (super(e),
        Object.defineProperty(this, "pointerTracker", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "resizeObserver", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "updateTimer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "clickTimer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "rAF", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "isTicking", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "ignoreBounds", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "isBouncingX", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "isBouncingY", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "clicks", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "trackingPoints", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: [],
        }),
        Object.defineProperty(this, "pwt", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "cwd", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "pmme", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "friction", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: v.Init,
        }),
        Object.defineProperty(this, "isDragging", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "container", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "content", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "spinner", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "containerRect", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: { width: 0, height: 0, innerWidth: 0, innerHeight: 0 },
        }),
        Object.defineProperty(this, "contentRect", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            fullWidth: 0,
            fullHeight: 0,
            fitWidth: 0,
            fitHeight: 0,
            width: 0,
            height: 0,
          },
        }),
        Object.defineProperty(this, "dragStart", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: { x: 0, y: 0, top: 0, left: 0, time: 0 },
        }),
        Object.defineProperty(this, "dragOffset", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: { x: 0, y: 0, time: 0 },
        }),
        Object.defineProperty(this, "current", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: Object.assign({}, T),
        }),
        Object.defineProperty(this, "target", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: Object.assign({}, T),
        }),
        Object.defineProperty(this, "velocity", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0 },
        }),
        Object.defineProperty(this, "lockedAxis", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        !t)
      )
        throw new Error("Container Element Not Found");
      (this.container = t),
        this.initContent(),
        this.attachPlugins(Object.assign(Object.assign({}, D.Plugins), i)),
        this.emit("attachPlugins"),
        this.emit("init");
      const o = this.content;
      if (
        (o.addEventListener("load", this.onLoad),
        o.addEventListener("error", this.onError),
        this.isContentLoading)
      ) {
        if (this.option("spinner")) {
          t.classList.add(this.cn("isLoading"));
          const e = s(E);
          !t.contains(o) || o.parentElement instanceof HTMLPictureElement
            ? (this.spinner = t.appendChild(e))
            : (this.spinner =
                (null === (n = o.parentElement) || void 0 === n
                  ? void 0
                  : n.insertBefore(e, o)) || null);
        }
        this.emit("beforeLoad");
      } else
        queueMicrotask(() => {
          this.enable();
        });
    }
    initContent() {
      const { container: t } = this,
        e = this.cn(z);
      let i = this.option(z) || t.querySelector(`.${e}`);
      if (
        (i ||
          ((i = t.querySelector("img,picture") || t.firstElementChild),
          i && C(i, e)),
        i instanceof HTMLPictureElement && (i = i.querySelector("img")),
        !i)
      )
        throw new Error("No content found");
      this.content = i;
    }
    onLoad() {
      const { spinner: t, container: e, state: i } = this;
      t && (t.remove(), (this.spinner = null)),
        this.option("spinner") && e.classList.remove(this.cn("isLoading")),
        this.emit("afterLoad"),
        i === v.Init ? this.enable() : this.updateMetrics();
    }
    onError() {
      this.state !== v.Destroy &&
        (this.spinner && (this.spinner.remove(), (this.spinner = null)),
        this.stop(),
        this.detachEvents(),
        (this.state = v.Error),
        this.emit("error"));
    }
    getNextScale(t) {
      const {
        fullScale: e,
        targetScale: i,
        coverScale: n,
        maxScale: s,
        minScale: o,
      } = this;
      let a = o;
      switch (t) {
        case "toggleMax":
          a = i - o < 0.5 * (s - o) ? s : o;
          break;
        case "toggleCover":
          a = i - o < 0.5 * (n - o) ? n : o;
          break;
        case "toggleZoom":
          a = i - o < 0.5 * (e - o) ? e : o;
          break;
        case "iterateZoom":
          let t = [1, e, s].sort((t, e) => t - e),
            r = t.findIndex((t) => t > i + 1e-5);
          a = t[r] || 1;
      }
      return a;
    }
    attachObserver() {
      var t;
      const e = () => {
        const { container: t, containerRect: e } = this;
        return (
          Math.abs(e.width - t.getBoundingClientRect().width) > 0.1 ||
          Math.abs(e.height - t.getBoundingClientRect().height) > 0.1
        );
      };
      this.resizeObserver ||
        void 0 === window.ResizeObserver ||
        (this.resizeObserver = new ResizeObserver(() => {
          this.updateTimer ||
            (e()
              ? (this.onResize(),
                this.isMobile &&
                  (this.updateTimer = setTimeout(() => {
                    e() && this.onResize(), (this.updateTimer = null);
                  }, 500)))
              : this.updateTimer &&
                (clearTimeout(this.updateTimer), (this.updateTimer = null)));
        })),
        null === (t = this.resizeObserver) ||
          void 0 === t ||
          t.observe(this.container);
    }
    detachObserver() {
      var t;
      null === (t = this.resizeObserver) || void 0 === t || t.disconnect();
    }
    attachEvents() {
      const { container: t } = this;
      t.addEventListener("click", this.onClick, { passive: !1, capture: !1 }),
        t.addEventListener("wheel", this.onWheel, { passive: !1 }),
        (this.pointerTracker = new c(t, {
          start: this.onPointerDown,
          move: this.onPointerMove,
          end: this.onPointerUp,
        })),
        document.addEventListener(A, this.onMouseMove);
    }
    detachEvents() {
      var t;
      const { container: e } = this;
      e.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1,
      }),
        e.removeEventListener("wheel", this.onWheel, { passive: !1 }),
        null === (t = this.pointerTracker) || void 0 === t || t.stop(),
        (this.pointerTracker = null),
        document.removeEventListener(A, this.onMouseMove),
        document.removeEventListener("keydown", this.onKeydown, !0),
        this.clickTimer &&
          (clearTimeout(this.clickTimer), (this.clickTimer = null)),
        this.updateTimer &&
          (clearTimeout(this.updateTimer), (this.updateTimer = null));
    }
    animate() {
      this.setTargetForce();
      const t = this.friction,
        e = this.option("maxVelocity");
      for (const i of b)
        t
          ? ((this.velocity[i] *= 1 - t),
            e &&
              !this.isScaling &&
              (this.velocity[i] = Math.max(
                Math.min(this.velocity[i], e),
                -1 * e
              )),
            (this.current[i] += this.velocity[i]))
          : (this.current[i] = this.target[i]);
      this.setTransform(),
        this.setEdgeForce(),
        !this.isResting || this.isDragging
          ? (this.rAF = requestAnimationFrame(() => this.animate()))
          : this.stop("current");
    }
    setTargetForce() {
      for (const t of b)
        ("e" === t && this.isBouncingX) ||
          ("f" === t && this.isBouncingY) ||
          (this.velocity[t] =
            (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]));
    }
    checkBounds(t = 0, e = 0) {
      const { current: i } = this,
        n = i.e + t,
        s = i.f + e,
        o = this.getBounds(),
        { x: a, y: r } = o,
        l = a.min,
        c = a.max,
        h = r.min,
        d = r.max;
      let u = 0,
        p = 0;
      return (
        l !== 1 / 0 && n < l
          ? (u = l - n)
          : c !== 1 / 0 && n > c && (u = c - n),
        h !== 1 / 0 && s < h
          ? (p = h - s)
          : d !== 1 / 0 && s > d && (p = d - s),
        Math.abs(u) < 1e-4 && (u = 0),
        Math.abs(p) < 1e-4 && (p = 0),
        Object.assign(Object.assign({}, o), {
          xDiff: u,
          yDiff: p,
          inBounds: !u && !p,
        })
      );
    }
    clampTargetBounds() {
      const { target: t } = this,
        { x: e, y: i } = this.getBounds();
      e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)),
        e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)),
        i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)),
        i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max));
    }
    calculateContentDim(t = this.current) {
      const { content: e, contentRect: i } = this,
        { fitWidth: n, fitHeight: s, fullWidth: o, fullHeight: a } = i;
      let r = o,
        l = a;
      if (this.option("zoom") || 0 !== this.angle) {
        const i =
            !(e instanceof HTMLImageElement) &&
            ("none" === window.getComputedStyle(e).maxWidth ||
              "none" === window.getComputedStyle(e).maxHeight),
          c = i ? o : n,
          h = i ? a : s,
          d = this.getMatrix(t),
          u = new DOMPoint(0, 0).matrixTransform(d),
          p = new DOMPoint(0 + c, 0).matrixTransform(d),
          f = new DOMPoint(0 + c, 0 + h).matrixTransform(d),
          g = new DOMPoint(0, 0 + h).matrixTransform(d),
          m = Math.abs(f.x - u.x),
          v = Math.abs(f.y - u.y),
          b = Math.abs(g.x - p.x),
          y = Math.abs(g.y - p.y);
        (r = Math.max(m, b)), (l = Math.max(v, y));
      }
      return { contentWidth: r, contentHeight: l };
    }
    setEdgeForce() {
      if (
        this.ignoreBounds ||
        this.isDragging ||
        this.panMode === A ||
        this.targetScale < this.scale
      )
        return (this.isBouncingX = !1), void (this.isBouncingY = !1);
      const { target: t } = this,
        { x: e, y: i, xDiff: n, yDiff: s } = this.checkBounds();
      const o = this.option("maxVelocity");
      let a = this.velocity.e,
        r = this.velocity.f;
      0 !== n
        ? ((this.isBouncingX = !0),
          n * a <= 0
            ? (a += 0.14 * n)
            : ((a = 0.14 * n),
              e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)),
              e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))),
          o && (a = Math.max(Math.min(a, o), -1 * o)))
        : (this.isBouncingX = !1),
        0 !== s
          ? ((this.isBouncingY = !0),
            s * r <= 0
              ? (r += 0.14 * s)
              : ((r = 0.14 * s),
                i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)),
                i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))),
            o && (r = Math.max(Math.min(r, o), -1 * o)))
          : (this.isBouncingY = !1),
        this.isBouncingX && (this.velocity.e = a),
        this.isBouncingY && (this.velocity.f = r);
    }
    enable() {
      const { content: t } = this,
        e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
      for (const t of b) this.current[t] = this.target[t] = e[t];
      this.updateMetrics(),
        this.attachObserver(),
        this.attachEvents(),
        (this.state = v.Ready),
        this.emit("ready");
    }
    onClick(t) {
      var e;
      "click" === t.type &&
        0 === t.detail &&
        ((this.dragOffset.x = 0), (this.dragOffset.y = 0)),
        this.isDragging &&
          (null === (e = this.pointerTracker) || void 0 === e || e.clear(),
          (this.trackingPoints = []),
          this.startDecelAnim());
      const i = t.target;
      if (!i || t.defaultPrevented) return;
      if (i.hasAttribute("disabled"))
        return t.preventDefault(), void t.stopPropagation();
      if (
        (() => {
          const t = window.getSelection();
          return t && "Range" === t.type;
        })() &&
        !i.closest("button")
      )
        return;
      const n = i.closest("[data-panzoom-action]"),
        s = i.closest("[data-panzoom-change]"),
        o = n || s,
        a = o && S(o) ? o.dataset : null;
      if (a) {
        const e = a.panzoomChange,
          i = a.panzoomAction;
        if (((e || i) && t.preventDefault(), e)) {
          let t = {};
          try {
            t = JSON.parse(e);
          } catch (t) {
            console && console.warn("The given data was not valid JSON");
          }
          return void this.applyChange(t);
        }
        if (i) return void (this[i] && this[i]());
      }
      if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3)
        return t.preventDefault(), void t.stopPropagation();
      if (i.closest("[data-fancybox]")) return;
      const r = this.content.getBoundingClientRect(),
        l = this.dragStart;
      if (
        l.time &&
        !this.canZoomOut() &&
        (Math.abs(r.x - l.x) > 2 || Math.abs(r.y - l.y) > 2)
      )
        return;
      this.dragStart.time = 0;
      const c = (e) => {
          this.option("zoom", t) &&
            e &&
            "string" == typeof e &&
            /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(
              e
            ) &&
            "function" == typeof this[e] &&
            (t.preventDefault(), this[e]({ event: t }));
        },
        h = this.option("click", t),
        d = this.option("dblClick", t);
      d
        ? (this.clicks++,
          1 == this.clicks &&
            (this.clickTimer = setTimeout(() => {
              1 === this.clicks
                ? (this.emit("click", t), !t.defaultPrevented && h && c(h))
                : (this.emit("dblClick", t), t.defaultPrevented || c(d)),
                (this.clicks = 0),
                (this.clickTimer = null);
            }, 350)))
        : (this.emit("click", t), !t.defaultPrevented && h && c(h));
    }
    addTrackingPoint(t) {
      const e = this.trackingPoints.filter((t) => t.time > Date.now() - 100);
      e.push(t), (this.trackingPoints = e);
    }
    onPointerDown(t, e, i) {
      var n;
      if (!1 === this.option("touch", t)) return !1;
      (this.pwt = 0),
        (this.dragOffset = { x: 0, y: 0, time: 0 }),
        (this.trackingPoints = []);
      const s = this.content.getBoundingClientRect();
      if (
        ((this.dragStart = {
          x: s.x,
          y: s.y,
          top: s.top,
          left: s.left,
          time: Date.now(),
        }),
        this.clickTimer)
      )
        return !1;
      if (this.panMode === A && this.targetScale > 1)
        return t.preventDefault(), t.stopPropagation(), !1;
      const o = t.composedPath()[0];
      if (!i.length) {
        if (
          ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(
            o.nodeName
          ) ||
          o.closest(
            "[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]"
          )
        )
          return !1;
        null === (n = window.getSelection()) ||
          void 0 === n ||
          n.removeAllRanges();
      }
      if ("mousedown" === t.type)
        ["A", "BUTTON"].includes(o.nodeName) || t.preventDefault();
      else if (Math.abs(this.velocity.a) > 0.3) return !1;
      return (
        (this.target.e = this.current.e),
        (this.target.f = this.current.f),
        this.stop(),
        this.isDragging ||
          ((this.isDragging = !0),
          this.addTrackingPoint(e),
          this.emit("touchStart", t)),
        !0
      );
    }
    onPointerMove(t, i, s) {
      if (!1 === this.option("touch", t)) return;
      if (!this.isDragging) return;
      if (
        i.length < 2 &&
        this.panOnlyZoomed &&
        e(this.targetScale) <= e(this.minScale)
      )
        return;
      if ((this.emit("touchMove", t), t.defaultPrevented)) return;
      this.addTrackingPoint(i[0]);
      const { content: o } = this,
        a = d(s[0], s[1]),
        r = d(i[0], i[1]);
      let l = 0,
        c = 0;
      if (i.length > 1) {
        const t = o.getBoundingClientRect();
        (l = a.clientX - t.left - 0.5 * t.width),
          (c = a.clientY - t.top - 0.5 * t.height);
      }
      const u = h(s[0], s[1]),
        p = h(i[0], i[1]);
      let f = u ? p / u : 1,
        g = r.clientX - a.clientX,
        m = r.clientY - a.clientY;
      (this.dragOffset.x += g),
        (this.dragOffset.y += m),
        (this.dragOffset.time = Date.now() - this.dragStart.time);
      let v =
        e(this.targetScale) === e(this.minScale) && this.option("lockAxis");
      if (v && !this.lockedAxis)
        if ("xy" === v || "y" === v || "touchmove" === t.type) {
          if (
            Math.abs(this.dragOffset.x) < 6 &&
            Math.abs(this.dragOffset.y) < 6
          )
            return void t.preventDefault();
          const e = Math.abs(
            (180 * Math.atan2(this.dragOffset.y, this.dragOffset.x)) / Math.PI
          );
          (this.lockedAxis = e > 45 && e < 135 ? "y" : "x"),
            (this.dragOffset.x = 0),
            (this.dragOffset.y = 0),
            (g = 0),
            (m = 0);
        } else this.lockedAxis = v;
      if (
        (n(t.target, this.content) && ((v = "x"), (this.dragOffset.y = 0)),
        v &&
          "xy" !== v &&
          this.lockedAxis !== v &&
          e(this.targetScale) === e(this.minScale))
      )
        return;
      t.cancelable && t.preventDefault(),
        this.container.classList.add(this.cn("isDragging"));
      const b = this.checkBounds(g, m);
      this.option("rubberband")
        ? ("x" !== this.isInfinite &&
            ((b.xDiff > 0 && g < 0) || (b.xDiff < 0 && g > 0)) &&
            (g *= Math.max(
              0,
              0.5 - Math.abs((0.75 / this.contentRect.fitWidth) * b.xDiff)
            )),
          "y" !== this.isInfinite &&
            ((b.yDiff > 0 && m < 0) || (b.yDiff < 0 && m > 0)) &&
            (m *= Math.max(
              0,
              0.5 - Math.abs((0.75 / this.contentRect.fitHeight) * b.yDiff)
            )))
        : (b.xDiff && (g = 0), b.yDiff && (m = 0));
      const y = this.targetScale,
        w = this.minScale,
        x = this.maxScale;
      y < 0.5 * w && (f = Math.max(f, w)),
        y > 1.5 * x && (f = Math.min(f, x)),
        "y" === this.lockedAxis && e(y) === e(w) && (g = 0),
        "x" === this.lockedAxis && e(y) === e(w) && (m = 0),
        this.applyChange({
          originX: l,
          originY: c,
          panX: g,
          panY: m,
          scale: f,
          friction: this.option("dragFriction"),
          ignoreBounds: !0,
        });
    }
    onPointerUp(t, e, i) {
      if (i.length)
        return (
          (this.dragOffset.x = 0),
          (this.dragOffset.y = 0),
          void (this.trackingPoints = [])
        );
      this.container.classList.remove(this.cn("isDragging")),
        this.isDragging &&
          (this.addTrackingPoint(e),
          this.panOnlyZoomed &&
            this.contentRect.width - this.contentRect.fitWidth < 1 &&
            this.contentRect.height - this.contentRect.fitHeight < 1 &&
            (this.trackingPoints = []),
          n(t.target, this.content) &&
            "y" === this.lockedAxis &&
            (this.trackingPoints = []),
          this.emit("touchEnd", t),
          (this.isDragging = !1),
          (this.lockedAxis = !1),
          this.state !== v.Destroy &&
            (t.defaultPrevented || this.startDecelAnim()));
    }
    startDecelAnim() {
      var t;
      const i = this.isScaling;
      this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
        (this.isBouncingX = !1),
        (this.isBouncingY = !1);
      for (const t of b) this.velocity[t] = 0;
      (this.target.e = this.current.e),
        (this.target.f = this.current.f),
        P(this.container, "is-scaling"),
        P(this.container, "is-animating"),
        (this.isTicking = !1);
      const { trackingPoints: n } = this,
        s = n[0],
        o = n[n.length - 1];
      let a = 0,
        r = 0,
        l = 0;
      o &&
        s &&
        ((a = o.clientX - s.clientX),
        (r = o.clientY - s.clientY),
        (l = o.time - s.time));
      const c =
        (null === (t = window.visualViewport) || void 0 === t
          ? void 0
          : t.scale) || 1;
      1 !== c && ((a *= c), (r *= c));
      let h = 0,
        d = 0,
        u = 0,
        p = 0,
        f = this.option("decelFriction");
      const g = this.targetScale;
      if (l > 0) {
        (u = Math.abs(a) > 3 ? a / (l / 30) : 0),
          (p = Math.abs(r) > 3 ? r / (l / 30) : 0);
        const t = this.option("maxVelocity");
        t &&
          ((u = Math.max(Math.min(u, t), -1 * t)),
          (p = Math.max(Math.min(p, t), -1 * t)));
      }
      u && (h = u / (1 / (1 - f) - 1)),
        p && (d = p / (1 / (1 - f) - 1)),
        ("y" === this.option("lockAxis") ||
          ("xy" === this.option("lockAxis") &&
            "y" === this.lockedAxis &&
            e(g) === this.minScale)) &&
          (h = u = 0),
        ("x" === this.option("lockAxis") ||
          ("xy" === this.option("lockAxis") &&
            "x" === this.lockedAxis &&
            e(g) === this.minScale)) &&
          (d = p = 0);
      const m = this.dragOffset.x,
        v = this.dragOffset.y,
        y = this.option("dragMinThreshold") || 0;
      Math.abs(m) < y && Math.abs(v) < y && ((h = d = 0), (u = p = 0)),
        ((this.option("zoom") &&
          (g < this.minScale - 1e-5 || g > this.maxScale + 1e-5)) ||
          (i && !h && !d)) &&
          (f = 0.35),
        this.applyChange({ panX: h, panY: d, friction: f }),
        this.emit("decel", u, p, m, v);
    }
    onWheel(t) {
      var e = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (
        t,
        e
      ) {
        return Math.abs(e) > Math.abs(t) ? e : t;
      });
      const i = Math.max(-1, Math.min(1, e));
      if ((this.emit("wheel", t, i), this.panMode === A)) return;
      if (t.defaultPrevented) return;
      const n = this.option("wheel");
      "pan" === n
        ? (t.preventDefault(),
          (this.panOnlyZoomed && !this.canZoomOut()) ||
            this.applyChange({
              panX: 2 * -t.deltaX,
              panY: 2 * -t.deltaY,
              bounce: !1,
            }))
        : "zoom" === n && !1 !== this.option("zoom") && this.zoomWithWheel(t);
    }
    onMouseMove(t) {
      this.panWithMouse(t);
    }
    onKeydown(t) {
      "Escape" === t.key && this.toggleFS();
    }
    onResize() {
      this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
    }
    setTransform() {
      this.emit("beforeTransform");
      const { current: t, target: i, content: n, contentRect: s } = this,
        o = Object.assign({}, T);
      for (const n of b) {
        const s = "e" == n || "f" === n ? O : M;
        (o[n] = e(t[n], s)),
          Math.abs(i[n] - t[n]) < ("e" == n || "f" === n ? 0.51 : 0.001) &&
            (t[n] = i[n]);
      }
      let { a: a, b: r, c: l, d: c, e: h, f: d } = o,
        u = `matrix(${a}, ${r}, ${l}, ${c}, ${h}, ${d})`,
        p = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
      if (
        (this.option("transformParent") && (p = p.parentElement || p),
        p.style.transform === u)
      )
        return;
      p.style.transform = u;
      const { contentWidth: f, contentHeight: g } = this.calculateContentDim();
      (s.width = f), (s.height = g), this.emit("afterTransform");
    }
    updateMetrics(t = !1) {
      var i;
      if (!this || this.state === v.Destroy) return;
      if (this.isContentLoading) return;
      const n = Math.max(
          1,
          (null === (i = window.visualViewport) || void 0 === i
            ? void 0
            : i.scale) || 1
        ),
        { container: s, content: o } = this,
        a = o instanceof HTMLImageElement,
        r = s.getBoundingClientRect(),
        l = getComputedStyle(this.container);
      let c = r.width * n,
        h = r.height * n;
      const d = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom),
        u = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)),
        p = h - d;
      this.containerRect = {
        width: c,
        height: h,
        innerWidth: u,
        innerHeight: p,
      };
      const f =
          parseFloat(o.dataset.width || "") ||
          ((t) => {
            let e = 0;
            return (
              (e =
                t instanceof HTMLImageElement
                  ? t.naturalWidth
                  : t instanceof SVGElement
                  ? t.width.baseVal.value
                  : Math.max(t.offsetWidth, t.scrollWidth)),
              e || 0
            );
          })(o),
        g =
          parseFloat(o.dataset.height || "") ||
          ((t) => {
            let e = 0;
            return (
              (e =
                t instanceof HTMLImageElement
                  ? t.naturalHeight
                  : t instanceof SVGElement
                  ? t.height.baseVal.value
                  : Math.max(t.offsetHeight, t.scrollHeight)),
              e || 0
            );
          })(o);
      let m = this.option("width", f) || R,
        b = this.option("height", g) || R;
      const y = m === R,
        w = b === R;
      "number" != typeof m && (m = f),
        "number" != typeof b && (b = g),
        y && (m = f * (b / g)),
        w && (b = g / (f / m));
      let x =
        o.parentElement instanceof HTMLPictureElement ? o.parentElement : o;
      this.option("transformParent") && (x = x.parentElement || x);
      const E = x.getAttribute("style") || "";
      x.style.setProperty("transform", "none", "important"),
        a && ((x.style.width = ""), (x.style.height = "")),
        x.offsetHeight;
      const S = o.getBoundingClientRect();
      let P = S.width * n,
        C = S.height * n,
        T = P,
        M = C;
      (P = Math.min(P, m)),
        (C = Math.min(C, b)),
        a
          ? ({ width: P, height: C } = ((t, e, i, n) => {
              const s = i / t,
                o = n / e,
                a = Math.min(s, o);
              return { width: (t *= a), height: (e *= a) };
            })(m, b, P, C))
          : ((P = Math.min(P, m)), (C = Math.min(C, b)));
      let O = 0.5 * (M - C),
        A = 0.5 * (T - P);
      (this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
        top: S.top - r.top + O,
        bottom: r.bottom - S.bottom + O,
        left: S.left - r.left + A,
        right: r.right - S.right + A,
        fitWidth: P,
        fitHeight: C,
        width: P,
        height: C,
        fullWidth: m,
        fullHeight: b,
      })),
        (x.style.cssText = E),
        a && ((x.style.width = `${P}px`), (x.style.height = `${C}px`)),
        this.setTransform(),
        !0 !== t && this.emit("refresh"),
        this.ignoreBounds ||
          (e(this.targetScale) < e(this.minScale)
            ? this.zoomTo(this.minScale, { friction: 0 })
            : this.targetScale > this.maxScale
            ? this.zoomTo(this.maxScale, { friction: 0 })
            : this.state === v.Init ||
              this.checkBounds().inBounds ||
              this.requestTick()),
        this.updateControls();
    }
    calculateBounds() {
      const { contentWidth: t, contentHeight: i } = this.calculateContentDim(
          this.target
        ),
        { targetScale: n, lockedAxis: s } = this,
        { fitWidth: o, fitHeight: a } = this.contentRect;
      let r = 0,
        l = 0,
        c = 0,
        h = 0;
      const d = this.option("infinite");
      if (!0 === d || (s && d === s))
        (r = -1 / 0), (c = 1 / 0), (l = -1 / 0), (h = 1 / 0);
      else {
        let { containerRect: s, contentRect: d } = this,
          u = e(o * n, O),
          p = e(a * n, O),
          { innerWidth: f, innerHeight: g } = s;
        if (
          (s.width === u && (f = s.width),
          s.width === p && (g = s.height),
          t > f)
        ) {
          (c = 0.5 * (t - f)), (r = -1 * c);
          let e = 0.5 * (d.right - d.left);
          (r += e), (c += e);
        }
        if (
          (o > f && t < f && ((r -= 0.5 * (o - f)), (c -= 0.5 * (o - f))),
          i > g)
        ) {
          (h = 0.5 * (i - g)), (l = -1 * h);
          let t = 0.5 * (d.bottom - d.top);
          (l += t), (h += t);
        }
        a > g && i < g && ((r -= 0.5 * (a - g)), (c -= 0.5 * (a - g)));
      }
      return { x: { min: r, max: c }, y: { min: l, max: h } };
    }
    getBounds() {
      const t = this.option("bounds");
      return t !== R ? t : this.calculateBounds();
    }
    updateControls() {
      const t = this,
        i = t.container,
        { panMode: n, contentRect: s, targetScale: o, minScale: r } = t;
      let l = r,
        c = t.option("click") || !1;
      c && (l = t.getNextScale(c));
      let h = t.canZoomIn(),
        d = t.canZoomOut(),
        u = n === L && !!this.option("touch"),
        p = d && u;
      if (
        (u &&
          (e(o) < e(r) && !this.panOnlyZoomed && (p = !0),
          (e(s.width, 1) > e(s.fitWidth, 1) ||
            e(s.height, 1) > e(s.fitHeight, 1)) &&
            (p = !0)),
        e(s.width * o, 1) < e(s.fitWidth, 1) && (p = !1),
        n === A && (p = !1),
        a(i, this.cn("isDraggable"), p),
        !this.option("zoom"))
      )
        return;
      let f = h && e(l) > e(o),
        g = !f && !p && d && e(l) < e(o);
      a(i, this.cn("canZoomIn"), f), a(i, this.cn("canZoomOut"), g);
      for (const t of i.querySelectorAll("[data-panzoom-action]")) {
        let e = !1,
          i = !1;
        switch (t.dataset.panzoomAction) {
          case "zoomIn":
            h ? (e = !0) : (i = !0);
            break;
          case "zoomOut":
            d ? (e = !0) : (i = !0);
            break;
          case "toggleZoom":
          case "iterateZoom":
            h || d ? (e = !0) : (i = !0);
            const n = t.querySelector("g");
            n && (n.style.display = h ? "" : "none");
        }
        e
          ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex"))
          : i &&
            (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
      }
    }
    panTo({
      x: t = this.target.e,
      y: e = this.target.f,
      scale: i = this.targetScale,
      friction: n = this.option("friction"),
      angle: s = 0,
      originX: o = 0,
      originY: a = 0,
      flipX: r = !1,
      flipY: l = !1,
      ignoreBounds: c = !1,
    }) {
      this.state !== v.Destroy &&
        this.applyChange({
          panX: t - this.target.e,
          panY: e - this.target.f,
          scale: i / this.targetScale,
          angle: s,
          originX: o,
          originY: a,
          friction: n,
          flipX: r,
          flipY: l,
          ignoreBounds: c,
        });
    }
    applyChange({
      panX: t = 0,
      panY: i = 0,
      scale: n = 1,
      angle: s = 0,
      originX: o = -this.current.e,
      originY: a = -this.current.f,
      friction: r = this.option("friction"),
      flipX: l = !1,
      flipY: c = !1,
      ignoreBounds: h = !1,
      bounce: d = this.option("bounce"),
    }) {
      const u = this.state;
      if (u === v.Destroy) return;
      this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
        (this.friction = r || 0),
        (this.ignoreBounds = h);
      const { current: p } = this,
        f = p.e,
        g = p.f,
        m = this.getMatrix(this.target);
      let y = new DOMMatrix().translate(f, g).translate(o, a).translate(t, i);
      if (this.option("zoom")) {
        if (!h) {
          const t = this.targetScale,
            e = this.minScale,
            i = this.maxScale;
          t * n < e && (n = e / t), t * n > i && (n = i / t);
        }
        y = y.scale(n);
      }
      (y = y.translate(-o, -a).translate(-f, -g).multiply(m)),
        s && (y = y.rotate(s)),
        l && (y = y.scale(-1, 1)),
        c && (y = y.scale(1, -1));
      for (const t of b)
        "e" !== t &&
        "f" !== t &&
        (y[t] > this.minScale + 1e-5 || y[t] < this.minScale - 1e-5)
          ? (this.target[t] = y[t])
          : (this.target[t] = e(y[t], O));
      (this.targetScale < this.scale ||
        Math.abs(n - 1) > 0.1 ||
        this.panMode === A ||
        !1 === d) &&
        !h &&
        this.clampTargetBounds(),
        u === v.Init
          ? this.animate()
          : this.isResting || ((this.state = v.Panning), this.requestTick());
    }
    stop(t = !1) {
      if (this.state === v.Init || this.state === v.Destroy) return;
      const e = this.isTicking;
      this.rAF && (cancelAnimationFrame(this.rAF), (this.rAF = null)),
        (this.isBouncingX = !1),
        (this.isBouncingY = !1);
      for (const e of b)
        (this.velocity[e] = 0),
          "current" === t
            ? (this.current[e] = this.target[e])
            : "target" === t && (this.target[e] = this.current[e]);
      this.setTransform(),
        P(this.container, "is-scaling"),
        P(this.container, "is-animating"),
        (this.isTicking = !1),
        (this.state = v.Ready),
        e && (this.emit("endAnimation"), this.updateControls());
    }
    requestTick() {
      this.isTicking ||
        (this.emit("startAnimation"),
        this.updateControls(),
        C(this.container, "is-animating"),
        this.isScaling && C(this.container, "is-scaling")),
        (this.isTicking = !0),
        this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()));
    }
    panWithMouse(t, i = this.option("mouseMoveFriction")) {
      if (((this.pmme = t), this.panMode !== A || !t)) return;
      if (e(this.targetScale) <= e(this.minScale)) return;
      this.emit("mouseMove", t);
      const { container: n, containerRect: s, contentRect: o } = this,
        a = s.width,
        r = s.height,
        l = n.getBoundingClientRect(),
        c = (t.clientX || 0) - l.left,
        h = (t.clientY || 0) - l.top;
      let { contentWidth: d, contentHeight: u } = this.calculateContentDim(
        this.target
      );
      const p = this.option("mouseMoveFactor");
      p > 1 && (d !== a && (d *= p), u !== r && (u *= p));
      let f = 0.5 * (d - a) - (((c / a) * 100) / 100) * (d - a);
      f += 0.5 * (o.right - o.left);
      let g = 0.5 * (u - r) - (((h / r) * 100) / 100) * (u - r);
      (g += 0.5 * (o.bottom - o.top)),
        this.applyChange({
          panX: f - this.target.e,
          panY: g - this.target.f,
          friction: i,
        });
    }
    zoomWithWheel(t) {
      if (this.state === v.Destroy || this.state === v.Init) return;
      const i = Date.now();
      if (i - this.pwt < 45) return void t.preventDefault();
      this.pwt = i;
      var n = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (
        t,
        e
      ) {
        return Math.abs(e) > Math.abs(t) ? e : t;
      });
      const s = Math.max(-1, Math.min(1, n)),
        { targetScale: o, maxScale: a, minScale: r } = this;
      let l = (o * (100 + 45 * s)) / 100;
      e(l) < e(r) && e(o) <= e(r)
        ? ((this.cwd += Math.abs(s)), (l = r))
        : e(l) > e(a) && e(o) >= e(a)
        ? ((this.cwd += Math.abs(s)), (l = a))
        : ((this.cwd = 0), (l = Math.max(Math.min(l, a), r))),
        this.cwd > this.option("wheelLimit") ||
          (t.preventDefault(), e(l) !== e(o) && this.zoomTo(l, { event: t }));
    }
    canZoomIn() {
      return (
        this.option("zoom") &&
        (e(this.contentRect.width, 1) < e(this.contentRect.fitWidth, 1) ||
          e(this.targetScale) < e(this.maxScale))
      );
    }
    canZoomOut() {
      return this.option("zoom") && e(this.targetScale) > e(this.minScale);
    }
    zoomIn(t = 1.25, e) {
      this.zoomTo(this.targetScale * t, e);
    }
    zoomOut(t = 0.8, e) {
      this.zoomTo(this.targetScale * t, e);
    }
    zoomToFit(t) {
      this.zoomTo("fit", t);
    }
    zoomToCover(t) {
      this.zoomTo("cover", t);
    }
    zoomToFull(t) {
      this.zoomTo("full", t);
    }
    zoomToMax(t) {
      this.zoomTo("max", t);
    }
    toggleZoom(t) {
      this.zoomTo(this.getNextScale("toggleZoom"), t);
    }
    toggleMax(t) {
      this.zoomTo(this.getNextScale("toggleMax"), t);
    }
    toggleCover(t) {
      this.zoomTo(this.getNextScale("toggleCover"), t);
    }
    iterateZoom(t) {
      this.zoomTo("next", t);
    }
    zoomTo(
      t = 1,
      { friction: e = R, originX: i = R, originY: n = R, event: s } = {}
    ) {
      if (this.isContentLoading || this.state === v.Destroy) return;
      const { targetScale: o, fullScale: a, maxScale: r, coverScale: l } = this;
      if (
        (this.stop(),
        this.panMode === A && (s = this.pmme || s),
        s || i === R || n === R)
      ) {
        const t = this.content.getBoundingClientRect(),
          e = this.container.getBoundingClientRect(),
          o = s ? s.clientX : e.left + 0.5 * e.width,
          a = s ? s.clientY : e.top + 0.5 * e.height;
        (i = o - t.left - 0.5 * t.width), (n = a - t.top - 0.5 * t.height);
      }
      let c = 1;
      "number" == typeof t
        ? (c = t)
        : "full" === t
        ? (c = a)
        : "cover" === t
        ? (c = l)
        : "max" === t
        ? (c = r)
        : "fit" === t
        ? (c = 1)
        : "next" === t && (c = this.getNextScale("iterateZoom")),
        (c = c / o || 1),
        (e = e === R ? (c > 1 ? 0.15 : 0.25) : e),
        this.applyChange({ scale: c, originX: i, originY: n, friction: e }),
        s && this.panMode === A && this.panWithMouse(s, e);
    }
    rotateCCW() {
      this.applyChange({ angle: -90 });
    }
    rotateCW() {
      this.applyChange({ angle: 90 });
    }
    flipX() {
      this.applyChange({ flipX: !0 });
    }
    flipY() {
      this.applyChange({ flipY: !0 });
    }
    fitX() {
      this.stop("target");
      const { containerRect: t, contentRect: e, target: i } = this;
      this.applyChange({
        panX: 0.5 * t.width - (e.left + 0.5 * e.fitWidth) - i.e,
        panY: 0.5 * t.height - (e.top + 0.5 * e.fitHeight) - i.f,
        scale: t.width / e.fitWidth / this.targetScale,
        originX: 0,
        originY: 0,
        ignoreBounds: !0,
      });
    }
    fitY() {
      this.stop("target");
      const { containerRect: t, contentRect: e, target: i } = this;
      this.applyChange({
        panX: 0.5 * t.width - (e.left + 0.5 * e.fitWidth) - i.e,
        panY: 0.5 * t.innerHeight - (e.top + 0.5 * e.fitHeight) - i.f,
        scale: t.height / e.fitHeight / this.targetScale,
        originX: 0,
        originY: 0,
        ignoreBounds: !0,
      });
    }
    toggleFS() {
      const { container: t } = this,
        e = this.cn("inFullscreen"),
        i = this.cn("htmlHasFullscreen");
      t.classList.toggle(e);
      const n = t.classList.contains(e);
      n
        ? (document.documentElement.classList.add(i),
          document.addEventListener("keydown", this.onKeydown, !0))
        : (document.documentElement.classList.remove(i),
          document.removeEventListener("keydown", this.onKeydown, !0)),
        this.updateMetrics(),
        this.emit(n ? "enterFS" : "exitFS");
    }
    getMatrix(t = this.current) {
      const { a: e, b: i, c: n, d: s, e: o, f: a } = t;
      return new DOMMatrix([e, i, n, s, o, a]);
    }
    reset(t) {
      if (this.state !== v.Init && this.state !== v.Destroy) {
        this.stop("current");
        for (const t of b) this.target[t] = T[t];
        (this.target.a = this.minScale),
          (this.target.d = this.minScale),
          this.clampTargetBounds(),
          this.isResting ||
            ((this.friction = void 0 === t ? this.option("friction") : t),
            (this.state = v.Panning),
            this.requestTick());
      }
    }
    destroy() {
      this.stop(),
        (this.state = v.Destroy),
        this.detachEvents(),
        this.detachObserver();
      const { container: t, content: e } = this,
        i = this.option("classes") || {};
      for (const e of Object.values(i)) t.classList.remove(e + "");
      e &&
        (e.removeEventListener("load", this.onLoad),
        e.removeEventListener("error", this.onError)),
        this.detachPlugins();
    }
  }
  Object.defineProperty(D, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: w,
  }),
    Object.defineProperty(D, "Plugins", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {},
    });
  const F = function (t, e) {
      let i = !0;
      return (...n) => {
        i &&
          ((i = !1),
          t(...n),
          setTimeout(() => {
            i = !0;
          }, e));
      };
    },
    j = (t, e) => {
      let i = [];
      return (
        t.childNodes.forEach((t) => {
          t.nodeType !== Node.ELEMENT_NODE || (e && !t.matches(e)) || i.push(t);
        }),
        i
      );
    },
    B = {
      viewport: null,
      track: null,
      enabled: !0,
      slides: [],
      axis: "x",
      transition: "fade",
      preload: 1,
      slidesPerPage: "auto",
      initialPage: 0,
      friction: 0.12,
      Panzoom: { decelFriction: 0.12 },
      center: !0,
      infinite: !0,
      fill: !0,
      dragFree: !1,
      adaptiveHeight: !1,
      direction: "ltr",
      classes: {
        container: "f-carousel",
        viewport: "f-carousel__viewport",
        track: "f-carousel__track",
        slide: "f-carousel__slide",
        isLTR: "is-ltr",
        isRTL: "is-rtl",
        isHorizontal: "is-horizontal",
        isVertical: "is-vertical",
        inTransition: "in-transition",
        isSelected: "is-selected",
      },
      l10n: {
        NEXT: "Next slide",
        PREV: "Previous slide",
        GOTO: "Go to slide #%d",
      },
    };
  var H;
  !(function (t) {
    (t[(t.Init = 0)] = "Init"),
      (t[(t.Ready = 1)] = "Ready"),
      (t[(t.Destroy = 2)] = "Destroy");
  })(H || (H = {}));
  const N = (t) => {
      if ("string" == typeof t || t instanceof HTMLElement) t = { html: t };
      else {
        const e = t.thumb;
        void 0 !== e &&
          ("string" == typeof e && (t.thumbSrc = e),
          e instanceof HTMLImageElement &&
            ((t.thumbEl = e), (t.thumbElSrc = e.src), (t.thumbSrc = e.src)),
          delete t.thumb);
      }
      return Object.assign(
        {
          html: "",
          el: null,
          isDom: !1,
          class: "",
          customClass: "",
          index: -1,
          dim: 0,
          gap: 0,
          pos: 0,
          transition: !1,
        },
        t
      );
    },
    _ = (t = {}) =>
      Object.assign({ index: -1, slides: [], dim: 0, pos: -1 }, t);
  class $ extends g {
    constructor(t, e) {
      super(e),
        Object.defineProperty(this, "instance", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: t,
        });
    }
    attach() {}
    detach() {}
  }
  const W = {
    classes: {
      list: "f-carousel__dots",
      isDynamic: "is-dynamic",
      hasDots: "has-dots",
      dot: "f-carousel__dot",
      isBeforePrev: "is-before-prev",
      isPrev: "is-prev",
      isCurrent: "is-current",
      isNext: "is-next",
      isAfterNext: "is-after-next",
    },
    dotTpl:
      '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
    dynamicFrom: 11,
    maxCount: 1 / 0,
    minCount: 2,
  };
  class X extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "isDynamic", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "list", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        });
    }
    onRefresh() {
      this.refresh();
    }
    build() {
      let t = this.list;
      if (!t) {
        (t = document.createElement("ul")),
          C(t, this.cn("list")),
          t.setAttribute("role", "tablist");
        const e = this.instance.container;
        e.appendChild(t), C(e, this.cn("hasDots")), (this.list = t);
      }
      return t;
    }
    refresh() {
      var t;
      const e = this.instance.pages.length,
        i = Math.min(2, this.option("minCount")),
        n = Math.max(2e3, this.option("maxCount")),
        s = this.option("dynamicFrom");
      if (e < i || e > n) return void this.cleanup();
      const o = "number" == typeof s && e > 5 && e >= s,
        r =
          !this.list || this.isDynamic !== o || this.list.children.length !== e;
      r && this.cleanup();
      const l = this.build();
      if ((a(l, this.cn("isDynamic"), !!o), r))
        for (let t = 0; t < e; t++) l.append(this.createItem(t));
      let c,
        h = 0;
      for (const e of [...l.children]) {
        const i = h === this.instance.page;
        i && (c = e),
          a(e, this.cn("isCurrent"), i),
          null === (t = e.children[0]) ||
            void 0 === t ||
            t.setAttribute("aria-selected", i ? "true" : "false");
        for (const t of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"])
          P(e, this.cn(t));
        h++;
      }
      if (((c = c || l.firstChild), o && c)) {
        const t = c.previousElementSibling,
          e = t && t.previousElementSibling;
        C(t, this.cn("isPrev")), C(e, this.cn("isBeforePrev"));
        const i = c.nextElementSibling,
          n = i && i.nextElementSibling;
        C(i, this.cn("isNext")), C(n, this.cn("isAfterNext"));
      }
      this.isDynamic = o;
    }
    createItem(t = 0) {
      var e;
      const i = document.createElement("li");
      i.setAttribute("role", "presentation");
      const n = s(
        this.instance
          .localize(this.option("dotTpl"), [["%d", t + 1]])
          .replace(/\%i/g, t + "")
      );
      return (
        i.appendChild(n),
        null === (e = i.children[0]) ||
          void 0 === e ||
          e.setAttribute("role", "tab"),
        i
      );
    }
    cleanup() {
      this.list && (this.list.remove(), (this.list = null)),
        (this.isDynamic = !1),
        P(this.instance.container, this.cn("hasDots"));
    }
    attach() {
      this.instance.on(["refresh", "change"], this.onRefresh);
    }
    detach() {
      this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
    }
  }
  Object.defineProperty(X, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: W,
  });
  const q = "disabled",
    Y = "next",
    V = "prev";
  class Z extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "container", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "prev", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "next", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "isDom", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        });
    }
    onRefresh() {
      const t = this.instance,
        e = t.pages.length,
        i = t.page;
      if (e < 2) return void this.cleanup();
      this.build();
      let n = this.prev,
        s = this.next;
      n &&
        s &&
        (n.removeAttribute(q),
        s.removeAttribute(q),
        t.isInfinite ||
          (i <= 0 && n.setAttribute(q, ""),
          i >= e - 1 && s.setAttribute(q, "")));
    }
    addBtn(t) {
      var e;
      const i = this.instance,
        n = document.createElement("button");
      n.setAttribute("tabindex", "0"),
        n.setAttribute("title", i.localize(`{{${t.toUpperCase()}}}`)),
        C(n, this.cn("button") + " " + this.cn(t === Y ? "isNext" : "isPrev"));
      const s = i.isRTL ? (t === Y ? V : Y) : t;
      var o;
      return (
        (n.innerHTML = i.localize(this.option(`${s}Tpl`))),
        (n.dataset[
          `carousel${
            ((o = t),
            o
              ? o.match("^[a-z]")
                ? o.charAt(0).toUpperCase() + o.substring(1)
                : o
              : "")
          }`
        ] = "true"),
        null === (e = this.container) || void 0 === e || e.appendChild(n),
        n
      );
    }
    build() {
      const t = this.instance.container,
        e = this.cn("container");
      let { container: i, prev: n, next: s } = this;
      i || ((i = t.querySelector("." + e)), (this.isDom = !!i)),
        i || ((i = document.createElement("div")), C(i, e), t.appendChild(i)),
        (this.container = i),
        s || (s = i.querySelector("[data-carousel-next]")),
        s || (s = this.addBtn(Y)),
        (this.next = s),
        n || (n = i.querySelector("[data-carousel-prev]")),
        n || (n = this.addBtn(V)),
        (this.prev = n);
    }
    cleanup() {
      this.isDom ||
        (this.prev && this.prev.remove(),
        this.next && this.next.remove(),
        this.container && this.container.remove()),
        (this.prev = null),
        (this.next = null),
        (this.container = null),
        (this.isDom = !1);
    }
    attach() {
      this.instance.on(["refresh", "change"], this.onRefresh);
    }
    detach() {
      this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
    }
  }
  Object.defineProperty(Z, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      classes: {
        container: "f-carousel__nav",
        button: "f-button",
        isNext: "is-next",
        isPrev: "is-prev",
      },
      nextTpl:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
      prevTpl:
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',
    },
  });
  class U extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "selectedIndex", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "target", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "nav", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        });
    }
    addAsTargetFor(t) {
      (this.target = this.instance), (this.nav = t), this.attachEvents();
    }
    addAsNavFor(t) {
      (this.nav = this.instance), (this.target = t), this.attachEvents();
    }
    attachEvents() {
      const { nav: t, target: e } = this;
      t &&
        e &&
        ((t.options.initialSlide = e.options.initialPage),
        t.state === H.Ready
          ? this.onNavReady(t)
          : t.on("ready", this.onNavReady),
        e.state === H.Ready
          ? this.onTargetReady(e)
          : e.on("ready", this.onTargetReady));
    }
    onNavReady(t) {
      t.on("createSlide", this.onNavCreateSlide),
        t.on("Panzoom.click", this.onNavClick),
        t.on("Panzoom.touchEnd", this.onNavTouch),
        this.onTargetChange();
    }
    onTargetReady(t) {
      t.on("change", this.onTargetChange),
        t.on("Panzoom.refresh", this.onTargetChange),
        this.onTargetChange();
    }
    onNavClick(t, e, i) {
      this.onNavTouch(t, t.panzoom, i);
    }
    onNavTouch(t, e, i) {
      var n, s;
      if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
      const o = i.target,
        { nav: a, target: r } = this;
      if (!a || !r || !o) return;
      const l = o.closest("[data-index]");
      if ((i.stopPropagation(), i.preventDefault(), !l)) return;
      const c = parseInt(l.dataset.index || "", 10) || 0,
        h = r.getPageForSlide(c),
        d = a.getPageForSlide(c);
      a.slideTo(d),
        r.slideTo(h, {
          friction:
            (null ===
              (s =
                null === (n = this.nav) || void 0 === n ? void 0 : n.plugins) ||
            void 0 === s
              ? void 0
              : s.Sync.option("friction")) || 0,
        }),
        this.markSelectedSlide(c);
    }
    onNavCreateSlide(t, e) {
      e.index === this.selectedIndex && this.markSelectedSlide(e.index);
    }
    onTargetChange() {
      var t, e;
      const { target: i, nav: n } = this;
      if (!i || !n) return;
      if (n.state !== H.Ready || i.state !== H.Ready) return;
      const s =
          null ===
            (e =
              null === (t = i.pages[i.page]) || void 0 === t
                ? void 0
                : t.slides[0]) || void 0 === e
            ? void 0
            : e.index,
        o = n.getPageForSlide(s);
      this.markSelectedSlide(s),
        n.slideTo(
          o,
          null === n.prevPage && null === i.prevPage ? { friction: 0 } : void 0
        );
    }
    markSelectedSlide(t) {
      const e = this.nav;
      e &&
        e.state === H.Ready &&
        ((this.selectedIndex = t),
        [...e.slides].map((e) => {
          e.el &&
            e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected");
        }));
    }
    attach() {
      const t = this;
      let e = t.options.target,
        i = t.options.nav;
      e ? t.addAsNavFor(e) : i && t.addAsTargetFor(i);
    }
    detach() {
      const t = this,
        e = t.nav,
        i = t.target;
      e &&
        (e.off("ready", t.onNavReady),
        e.off("createSlide", t.onNavCreateSlide),
        e.off("Panzoom.click", t.onNavClick),
        e.off("Panzoom.touchEnd", t.onNavTouch)),
        (t.nav = null),
        i &&
          (i.off("ready", t.onTargetReady),
          i.off("refresh", t.onTargetChange),
          i.off("change", t.onTargetChange)),
        (t.target = null);
    }
  }
  Object.defineProperty(U, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: { friction: 0.35 },
  });
  const G = { Navigation: Z, Dots: X, Sync: U },
    K = "animationend",
    J = "isSelected",
    Q = "slide";
  class tt extends m {
    get axis() {
      return this.isHorizontal ? "e" : "f";
    }
    get isEnabled() {
      return this.state === H.Ready;
    }
    get isInfinite() {
      let t = !1;
      const { contentDim: e, viewportDim: i, pages: n, slides: s } = this,
        o = s[0];
      return (
        n.length >= 2 && o && e + o.dim >= i && (t = this.option("infinite")), t
      );
    }
    get isRTL() {
      return "rtl" === this.option("direction");
    }
    get isHorizontal() {
      return "x" === this.option("axis");
    }
    constructor(t, e = {}, i = {}) {
      if (
        (super(),
        Object.defineProperty(this, "bp", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "",
        }),
        Object.defineProperty(this, "lp", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "userOptions", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: {},
        }),
        Object.defineProperty(this, "userPlugins", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: {},
        }),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: H.Init,
        }),
        Object.defineProperty(this, "page", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "prevPage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "container", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "viewport", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "track", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "slides", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: [],
        }),
        Object.defineProperty(this, "pages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: [],
        }),
        Object.defineProperty(this, "panzoom", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "inTransition", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: new Set(),
        }),
        Object.defineProperty(this, "contentDim", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "viewportDim", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        "string" == typeof t && (t = document.querySelector(t)),
        !t || !S(t))
      )
        throw new Error("No Element found");
      (this.container = t),
        (this.slideNext = F(this.slideNext.bind(this), 150)),
        (this.slidePrev = F(this.slidePrev.bind(this), 150)),
        (this.userOptions = e),
        (this.userPlugins = i),
        queueMicrotask(() => {
          this.processOptions();
        });
    }
    processOptions() {
      var t, e;
      const i = p({}, tt.defaults, this.userOptions);
      let n = "";
      const s = i.breakpoints;
      if (s && u(s))
        for (const [t, e] of Object.entries(s))
          window.matchMedia(t).matches && u(e) && ((n += t), p(i, e));
      (n === this.bp && this.state !== H.Init) ||
        ((this.bp = n),
        this.state === H.Ready &&
          (i.initialSlide =
            (null ===
              (e =
                null === (t = this.pages[this.page]) || void 0 === t
                  ? void 0
                  : t.slides[0]) || void 0 === e
              ? void 0
              : e.index) || 0),
        this.state !== H.Init && this.destroy(),
        super.setOptions(i),
        !1 === this.option("enabled")
          ? this.attachEvents()
          : setTimeout(() => {
              this.init();
            }, 0));
    }
    init() {
      (this.state = H.Init),
        this.emit("init"),
        this.attachPlugins(
          Object.assign(Object.assign({}, tt.Plugins), this.userPlugins)
        ),
        this.emit("attachPlugins"),
        this.initLayout(),
        this.initSlides(),
        this.updateMetrics(),
        this.setInitialPosition(),
        this.initPanzoom(),
        this.attachEvents(),
        (this.state = H.Ready),
        this.emit("ready");
    }
    initLayout() {
      const { container: t } = this,
        e = this.option("classes");
      C(t, this.cn("container")),
        a(t, e.isLTR, !this.isRTL),
        a(t, e.isRTL, this.isRTL),
        a(t, e.isVertical, !this.isHorizontal),
        a(t, e.isHorizontal, this.isHorizontal);
      let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
      i ||
        ((i = document.createElement("div")),
        C(i, e.viewport),
        i.append(...j(t, `.${e.slide}`)),
        t.prepend(i)),
        i.addEventListener("scroll", this.onScroll);
      let n = this.option("track") || t.querySelector(`.${e.track}`);
      n ||
        ((n = document.createElement("div")),
        C(n, e.track),
        n.append(...Array.from(i.childNodes))),
        n.setAttribute("aria-live", "polite"),
        i.contains(n) || i.prepend(n),
        (this.viewport = i),
        (this.track = n),
        this.emit("initLayout");
    }
    initSlides() {
      const { track: t } = this;
      if (!t) return;
      const e = [...this.slides],
        i = [];
      [...j(t, `.${this.cn(Q)}`)].forEach((t) => {
        if (S(t)) {
          const e = N({ el: t, isDom: !0, index: this.slides.length });
          i.push(e);
        }
      });
      for (let t of [...(this.option("slides", []) || []), ...e]) i.push(N(t));
      this.slides = i;
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      for (const t of i)
        this.emit("beforeInitSlide", t, t.index),
          this.emit("initSlide", t, t.index);
      this.emit("initSlides");
    }
    setInitialPage() {
      const t = this.option("initialSlide");
      this.page =
        "number" == typeof t
          ? this.getPageForSlide(t)
          : parseInt(this.option("initialPage", 0) + "", 10) || 0;
    }
    setInitialPosition() {
      const { track: t, pages: e, isHorizontal: i } = this;
      if (!t || !e.length) return;
      let n = this.page;
      e[n] || (this.page = n = 0);
      const s = (e[n].pos || 0) * (this.isRTL && i ? 1 : -1),
        o = i ? `${s}px` : "0",
        a = i ? "0" : `${s}px`;
      (t.style.transform = `translate3d(${o}, ${a}, 0) scale(1)`),
        this.option("adaptiveHeight") && this.setViewportHeight();
    }
    initPanzoom() {
      this.panzoom && (this.panzoom.destroy(), (this.panzoom = null));
      const t = this.option("Panzoom") || {};
      (this.panzoom = new D(
        this.viewport,
        p(
          {},
          {
            content: this.track,
            zoom: !1,
            panOnlyZoomed: !1,
            lockAxis: this.isHorizontal ? "x" : "y",
            infinite: this.isInfinite,
            click: !1,
            dblClick: !1,
            touch: (t) => !(this.pages.length < 2 && !t.options.infinite),
            bounds: () => this.getBounds(),
            maxVelocity: (t) =>
              Math.abs(t.target[this.axis] - t.current[this.axis]) <
              2 * this.viewportDim
                ? 100
                : 0,
          },
          t
        )
      )),
        this.panzoom.on("*", (t, e, ...i) => {
          this.emit(`Panzoom.${e}`, t, ...i);
        }),
        this.panzoom.on("decel", this.onDecel),
        this.panzoom.on("refresh", this.onRefresh),
        this.panzoom.on("beforeTransform", this.onBeforeTransform),
        this.panzoom.on("endAnimation", this.onEndAnimation);
    }
    attachEvents() {
      const t = this.container;
      t &&
        (t.addEventListener("click", this.onClick, {
          passive: !1,
          capture: !1,
        }),
        t.addEventListener("slideTo", this.onSlideTo)),
        window.addEventListener("resize", this.onResize);
    }
    createPages() {
      let t = [];
      const { contentDim: e, viewportDim: i } = this;
      let n = this.option("slidesPerPage");
      n =
        ("auto" === n || e <= i) && !1 !== this.option("fill")
          ? 1 / 0
          : parseFloat(n + "");
      let s = 0,
        o = 0,
        a = 0;
      for (const e of this.slides)
        (!t.length || o + e.dim - i > 0.05 || a >= n) &&
          (t.push(_()), (s = t.length - 1), (o = 0), (a = 0)),
          t[s].slides.push(e),
          (o += e.dim + e.gap),
          a++;
      return t;
    }
    processPages() {
      const t = this.pages,
        { contentDim: i, viewportDim: n, isInfinite: s } = this,
        o = this.option("center"),
        a = this.option("fill"),
        r = a && o && i > n && !s;
      if (
        (t.forEach((t, e) => {
          var s;
          (t.index = e),
            (t.pos =
              (null === (s = t.slides[0]) || void 0 === s ? void 0 : s.pos) ||
              0),
            (t.dim = 0);
          for (const [e, i] of t.slides.entries())
            (t.dim += i.dim), e < t.slides.length - 1 && (t.dim += i.gap);
          r && t.pos + 0.5 * t.dim < 0.5 * n
            ? (t.pos = 0)
            : r && t.pos + 0.5 * t.dim >= i - 0.5 * n
            ? (t.pos = i - n)
            : o && (t.pos += -0.5 * (n - t.dim));
        }),
        t.forEach((t) => {
          a &&
            !s &&
            i > n &&
            ((t.pos = Math.max(t.pos, 0)), (t.pos = Math.min(t.pos, i - n))),
            (t.pos = e(t.pos, 1e3)),
            (t.dim = e(t.dim, 1e3)),
            Math.abs(t.pos) <= 0.1 && (t.pos = 0);
        }),
        s)
      )
        return t;
      const l = [];
      let c;
      return (
        t.forEach((t) => {
          const e = Object.assign({}, t);
          c && e.pos === c.pos
            ? ((c.dim += e.dim), (c.slides = [...c.slides, ...e.slides]))
            : ((e.index = l.length), (c = e), l.push(e));
        }),
        l
      );
    }
    getPageFromIndex(t = 0) {
      const e = this.pages.length;
      let i;
      return (
        (t = parseInt((t || 0).toString()) || 0),
        (i = this.isInfinite
          ? ((t % e) + e) % e
          : Math.max(Math.min(t, e - 1), 0)),
        i
      );
    }
    getSlideMetrics(t) {
      var i, n;
      const s = this.isHorizontal ? "width" : "height";
      let o = 0,
        a = 0,
        r = t.el;
      const l = !(!r || r.parentNode);
      if (
        (r
          ? (o = parseFloat(r.dataset[s] || "") || 0)
          : ((r = document.createElement("div")),
            (r.style.visibility = "hidden"),
            (this.track || document.body).prepend(r)),
        C(r, this.cn(Q) + " " + t.class + " " + t.customClass),
        o)
      )
        (r.style[s] = `${o}px`),
          (r.style["width" === s ? "height" : "width"] = "");
      else {
        l && (this.track || document.body).prepend(r),
          (o =
            r.getBoundingClientRect()[s] *
            Math.max(
              1,
              (null === (i = window.visualViewport) || void 0 === i
                ? void 0
                : i.scale) || 1
            ));
        let t = r[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
        t - 1 > o && (o = t);
      }
      const c = getComputedStyle(r);
      return (
        "content-box" === c.boxSizing &&
          (this.isHorizontal
            ? ((o += parseFloat(c.paddingLeft) || 0),
              (o += parseFloat(c.paddingRight) || 0))
            : ((o += parseFloat(c.paddingTop) || 0),
              (o += parseFloat(c.paddingBottom) || 0))),
        (a =
          parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) ||
          0),
        l
          ? null === (n = r.parentElement) || void 0 === n || n.removeChild(r)
          : t.el || r.remove(),
        { dim: e(o, 1e3), gap: e(a, 1e3) }
      );
    }
    getBounds() {
      const { isInfinite: t, isRTL: e, isHorizontal: i, pages: n } = this;
      let s = { min: 0, max: 0 };
      if (t) s = { min: -1 / 0, max: 1 / 0 };
      else if (n.length) {
        const t = n[0].pos,
          o = n[n.length - 1].pos;
        s = e && i ? { min: t, max: o } : { min: -1 * o, max: -1 * t };
      }
      return { x: i ? s : { min: 0, max: 0 }, y: i ? { min: 0, max: 0 } : s };
    }
    repositionSlides() {
      let t,
        {
          isHorizontal: i,
          isRTL: n,
          isInfinite: s,
          viewport: o,
          viewportDim: a,
          contentDim: r,
          page: l,
          pages: c,
          slides: h,
          panzoom: d,
        } = this,
        u = 0,
        p = 0,
        f = 0,
        g = 0;
      d ? (g = -1 * d.current[this.axis]) : c[l] && (g = c[l].pos || 0),
        (t = i ? (n ? "right" : "left") : "top"),
        n && i && (g *= -1);
      for (const i of h) {
        const n = i.el;
        n
          ? ("top" === t
              ? ((n.style.right = ""), (n.style.left = ""))
              : (n.style.top = ""),
            i.index !== u
              ? (n.style[t] = 0 === p ? "" : `${e(p, 1e3)}px`)
              : (n.style[t] = ""),
            (f += i.dim + i.gap),
            u++)
          : (p += i.dim + i.gap);
      }
      if (s && f && o) {
        let n = getComputedStyle(o),
          s = "padding",
          l = i ? "Right" : "Bottom",
          c = parseFloat(n[s + (i ? "Left" : "Top")]);
        (g -= c), (a += c), (a += parseFloat(n[s + l]));
        for (const i of h)
          i.el &&
            (e(i.pos) < e(a) &&
              e(i.pos + i.dim + i.gap) < e(g) &&
              e(g) > e(r - a) &&
              (i.el.style[t] = `${e(p + f, 1e3)}px`),
            e(i.pos + i.gap) >= e(r - a) &&
              e(i.pos) > e(g + a) &&
              e(g) < e(a) &&
              (i.el.style[t] = `-${e(f, 1e3)}px`));
      }
      let m,
        v,
        b = [...this.inTransition];
      if ((b.length > 1 && ((m = c[b[0]]), (v = c[b[1]])), m && v)) {
        let i = 0;
        for (const n of h)
          n.el
            ? this.inTransition.has(n.index) &&
              m.slides.indexOf(n) < 0 &&
              (n.el.style[t] = `${e(i + (m.pos - v.pos), 1e3)}px`)
            : (i += n.dim + n.gap);
      }
    }
    createSlideEl(t) {
      const { track: e, slides: i } = this;
      if (!e || !t) return;
      if (t.el && t.el.parentNode) return;
      const n = t.el || document.createElement("div");
      C(n, this.cn(Q)), C(n, t.class), C(n, t.customClass);
      const s = t.html;
      s &&
        (s instanceof HTMLElement
          ? n.appendChild(s)
          : (n.innerHTML = t.html + ""));
      const o = [];
      i.forEach((t, e) => {
        t.el && o.push(e);
      });
      const a = t.index;
      let r = null;
      if (o.length) {
        r = i[o.reduce((t, e) => (Math.abs(e - a) < Math.abs(t - a) ? e : t))];
      }
      const l =
        r && r.el && r.el.parentNode
          ? r.index < t.index
            ? r.el.nextSibling
            : r.el
          : null;
      e.insertBefore(n, e.contains(l) ? l : null),
        (t.el = n),
        this.emit("createSlide", t);
    }
    removeSlideEl(t, e = !1) {
      const i = null == t ? void 0 : t.el;
      if (!i || !i.parentNode) return;
      const n = this.cn(J);
      if (
        (i.classList.contains(n) && (P(i, n), this.emit("unselectSlide", t)),
        t.isDom && !e)
      )
        return (
          i.removeAttribute("aria-hidden"),
          i.removeAttribute("data-index"),
          void (i.style.left = "")
        );
      this.emit("removeSlide", t);
      const s = new CustomEvent(K);
      i.dispatchEvent(s), t.el && (t.el.remove(), (t.el = null));
    }
    transitionTo(t = 0, e = this.option("transition")) {
      var i, n, s, o;
      if (!e) return !1;
      const a = this.page,
        { pages: r, panzoom: l } = this;
      t = parseInt((t || 0).toString()) || 0;
      const c = this.getPageFromIndex(t);
      if (
        !l ||
        !r[c] ||
        r.length < 2 ||
        Math.abs(
          ((null ===
            (n = null === (i = r[a]) || void 0 === i ? void 0 : i.slides[0]) ||
          void 0 === n
            ? void 0
            : n.dim) || 0) - this.viewportDim
        ) > 1
      )
        return !1;
      let h = t > a ? 1 : -1;
      this.isInfinite &&
        (0 === a && t === r.length - 1 && (h = -1),
        a === r.length - 1 && 0 === t && (h = 1));
      const d = r[c].pos * (this.isRTL ? 1 : -1);
      if (a === c && Math.abs(d - l.target[this.axis]) < 1) return !1;
      this.clearTransitions();
      const u = l.isResting;
      C(this.container, this.cn("inTransition"));
      const p =
          (null === (s = r[a]) || void 0 === s ? void 0 : s.slides[0]) || null,
        f =
          (null === (o = r[c]) || void 0 === o ? void 0 : o.slides[0]) || null;
      this.inTransition.add(f.index), this.createSlideEl(f);
      let g = p.el,
        m = f.el;
      u || e === Q || ((e = "fadeFast"), (g = null));
      const v = this.isRTL ? "next" : "prev",
        b = this.isRTL ? "prev" : "next";
      return (
        g &&
          (this.inTransition.add(p.index),
          (p.transition = e),
          g.addEventListener(K, this.onAnimationEnd),
          g.classList.add(`f-${e}Out`, `to-${h > 0 ? b : v}`)),
        m &&
          ((f.transition = e),
          m.addEventListener(K, this.onAnimationEnd),
          m.classList.add(`f-${e}In`, `from-${h > 0 ? v : b}`)),
        (l.current[this.axis] = d),
        (l.target[this.axis] = d),
        l.requestTick(),
        this.onChange(c),
        !0
      );
    }
    manageSlideVisiblity() {
      const t = new Set(),
        e = new Set(),
        i = this.getVisibleSlides(
          parseFloat(this.option("preload", 0) + "") || 0
        );
      for (const n of this.slides) i.has(n) ? t.add(n) : e.add(n);
      for (const e of this.inTransition) t.add(this.slides[e]);
      for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
      for (const i of e) t.has(i) || this.removeSlideEl(i);
      this.markSelectedSlides(), this.repositionSlides();
    }
    markSelectedSlides() {
      if (!this.pages[this.page] || !this.pages[this.page].slides) return;
      const t = "aria-hidden";
      let e = this.cn(J);
      if (e)
        for (const i of this.slides) {
          const n = i.el;
          n &&
            ((n.dataset.index = `${i.index}`),
            n.classList.contains("f-thumbs__slide")
              ? this.getVisibleSlides(0).has(i)
                ? n.removeAttribute(t)
                : n.setAttribute(t, "true")
              : this.pages[this.page].slides.includes(i)
              ? (n.classList.contains(e) ||
                  (C(n, e), this.emit("selectSlide", i)),
                n.removeAttribute(t))
              : (n.classList.contains(e) &&
                  (P(n, e), this.emit("unselectSlide", i)),
                n.setAttribute(t, "true")));
        }
    }
    flipInfiniteTrack() {
      const {
          axis: t,
          isHorizontal: e,
          isInfinite: i,
          isRTL: n,
          viewportDim: s,
          contentDim: o,
        } = this,
        a = this.panzoom;
      if (!a || !i) return;
      let r = a.current[t],
        l = a.target[t] - r,
        c = 0,
        h = 0.5 * s;
      n && e
        ? (r < -h && ((c = -1), (r += o)), r > o - h && ((c = 1), (r -= o)))
        : (r > h && ((c = 1), (r -= o)), r < -o + h && ((c = -1), (r += o))),
        c && ((a.current[t] = r), (a.target[t] = r + l));
    }
    lazyLoadImg(t, e) {
      const i = this,
        n = "f-fadeIn",
        o = "is-preloading";
      let a = !1,
        r = null;
      const l = () => {
        a ||
          ((a = !0),
          r && (r.remove(), (r = null)),
          P(e, o),
          e.complete &&
            (C(e, n),
            setTimeout(() => {
              P(e, n);
            }, 350)),
          this.option("adaptiveHeight") &&
            t.el &&
            this.pages[this.page].slides.indexOf(t) > -1 &&
            (i.updateMetrics(), i.setViewportHeight()),
          this.emit("load", t));
      };
      C(e, o),
        (e.src = e.dataset.lazySrcset || e.dataset.lazySrc || ""),
        delete e.dataset.lazySrc,
        delete e.dataset.lazySrcset,
        e.addEventListener("error", () => {
          l();
        }),
        e.addEventListener("load", () => {
          l();
        }),
        setTimeout(() => {
          const i = e.parentNode;
          i &&
            t.el &&
            (e.complete ? l() : a || ((r = s(E)), i.insertBefore(r, e)));
        }, 300);
    }
    lazyLoadSlide(t) {
      const e = t && t.el;
      if (!e) return;
      const i = new Set();
      let n = Array.from(
        e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]")
      );
      e.dataset.lazySrc && n.push(e),
        n.map((t) => {
          t instanceof HTMLImageElement
            ? i.add(t)
            : t instanceof HTMLElement &&
              t.dataset.lazySrc &&
              ((t.style.backgroundImage = `url('${t.dataset.lazySrc}')`),
              delete t.dataset.lazySrc);
        });
      for (const e of i) this.lazyLoadImg(t, e);
    }
    onAnimationEnd(t) {
      var e;
      const i = t.target,
        n = i ? parseInt(i.dataset.index || "", 10) || 0 : -1,
        s = this.slides[n],
        o = t.animationName;
      if (!i || !s || !o) return;
      const a = !!this.inTransition.has(n) && s.transition;
      a &&
        o.substring(0, a.length + 2) === `f-${a}` &&
        this.inTransition.delete(n),
        this.inTransition.size || this.clearTransitions(),
        n === this.page &&
          (null === (e = this.panzoom) || void 0 === e
            ? void 0
            : e.isResting) &&
          this.emit("settle");
    }
    onDecel(t, e = 0, i = 0, n = 0, s = 0) {
      if (this.option("dragFree")) return void this.setPageFromPosition();
      const { isRTL: o, isHorizontal: a, axis: r, pages: l } = this,
        c = l.length,
        h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
      let d = 0;
      if (((d = h > 45 && h < 135 ? (a ? 0 : i) : a ? e : 0), !c)) return;
      let u = this.page,
        p = o && a ? 1 : -1;
      const f = t.current[r] * p;
      let { pageIndex: g } = this.getPageFromPosition(f);
      Math.abs(d) > 5
        ? (l[u].dim <
            document.documentElement[
              "client" + (this.isHorizontal ? "Width" : "Height")
            ] -
              1 && (u = g),
          (u = o && a ? (d < 0 ? u - 1 : u + 1) : d < 0 ? u + 1 : u - 1))
        : (u = 0 === n && 0 === s ? u : g),
        this.slideTo(u, {
          transition: !1,
          friction: t.option("decelFriction"),
        });
    }
    onClick(t) {
      const e = t.target,
        i = e && S(e) ? e.dataset : null;
      let n, s;
      i &&
        (void 0 !== i.carouselPage
          ? ((s = "slideTo"), (n = i.carouselPage))
          : void 0 !== i.carouselNext
          ? (s = "slideNext")
          : void 0 !== i.carouselPrev && (s = "slidePrev")),
        s
          ? (t.preventDefault(),
            t.stopPropagation(),
            e && !e.hasAttribute("disabled") && this[s](n))
          : this.emit("click", t);
    }
    onSlideTo(t) {
      const e = t.detail || 0;
      this.slideTo(this.getPageForSlide(e), { friction: 0 });
    }
    onChange(t, e = 0) {
      const i = this.page;
      (this.prevPage = i),
        (this.page = t),
        this.option("adaptiveHeight") && this.setViewportHeight(),
        t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e));
    }
    onRefresh() {
      let t = this.contentDim,
        e = this.viewportDim;
      this.updateMetrics(),
        (this.contentDim === t && this.viewportDim === e) ||
          this.slideTo(this.page, { friction: 0, transition: !1 });
    }
    onScroll() {
      var t;
      null === (t = this.viewport) || void 0 === t || t.scroll(0, 0);
    }
    onResize() {
      this.option("breakpoints") && this.processOptions();
    }
    onBeforeTransform(t) {
      this.lp !== t.current[this.axis] &&
        (this.flipInfiniteTrack(), this.manageSlideVisiblity()),
        (this.lp = t.current.e);
    }
    onEndAnimation() {
      this.inTransition.size || this.emit("settle");
    }
    reInit(t = null, e = null) {
      this.destroy(),
        (this.state = H.Init),
        (this.prevPage = null),
        (this.userOptions = t || this.userOptions),
        (this.userPlugins = e || this.userPlugins),
        this.processOptions();
    }
    slideTo(
      t = 0,
      {
        friction: e = this.option("friction"),
        transition: i = this.option("transition"),
      } = {}
    ) {
      if (this.state === H.Destroy) return;
      t = parseInt((t || 0).toString()) || 0;
      const n = this.getPageFromIndex(t),
        { axis: s, isHorizontal: o, isRTL: a, pages: r, panzoom: l } = this,
        c = r.length,
        h = a && o ? 1 : -1;
      if (!l || !c) return;
      if (this.page !== n) {
        const e = new Event("beforeChange", { bubbles: !0, cancelable: !0 });
        if ((this.emit("beforeChange", e, t), e.defaultPrevented)) return;
      }
      if (this.transitionTo(t, i)) return;
      let d = r[n].pos;
      if (this.isInfinite) {
        const e = this.contentDim,
          i = l.target[s] * h;
        if (2 === c) d += e * Math.floor(parseFloat(t + "") / 2);
        else {
          d = [d, d - e, d + e].reduce(function (t, e) {
            return Math.abs(e - i) < Math.abs(t - i) ? e : t;
          });
        }
      }
      (d *= h),
        Math.abs(l.target[s] - d) < 1 ||
          (l.panTo({ x: o ? d : 0, y: o ? 0 : d, friction: e }),
          this.onChange(n));
    }
    slideToClosest(t) {
      if (this.panzoom) {
        const { pageIndex: e } = this.getPageFromPosition();
        this.slideTo(e, t);
      }
    }
    slideNext() {
      this.slideTo(this.page + 1);
    }
    slidePrev() {
      this.slideTo(this.page - 1);
    }
    clearTransitions() {
      this.inTransition.clear(), P(this.container, this.cn("inTransition"));
      const t = ["to-prev", "to-next", "from-prev", "from-next"];
      for (const e of this.slides) {
        const i = e.el;
        if (i) {
          i.removeEventListener(K, this.onAnimationEnd),
            i.classList.remove(...t);
          const n = e.transition;
          n && i.classList.remove(`f-${n}Out`, `f-${n}In`);
        }
      }
      this.manageSlideVisiblity();
    }
    addSlide(t, e) {
      var i, n, s, o;
      const a = this.panzoom,
        r =
          (null === (i = this.pages[this.page]) || void 0 === i
            ? void 0
            : i.pos) || 0,
        l =
          (null === (n = this.pages[this.page]) || void 0 === n
            ? void 0
            : n.dim) || 0,
        c = this.contentDim < this.viewportDim;
      let h = Array.isArray(e) ? e : [e];
      const d = [];
      for (const t of h) d.push(N(t));
      this.slides.splice(t, 0, ...d);
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      for (const t of d) this.emit("beforeInitSlide", t, t.index);
      if (
        (this.page >= t && (this.page += d.length), this.updateMetrics(), a)
      ) {
        const e =
            (null === (s = this.pages[this.page]) || void 0 === s
              ? void 0
              : s.pos) || 0,
          i =
            (null === (o = this.pages[this.page]) || void 0 === o
              ? void 0
              : o.dim) || 0,
          n = this.pages.length || 1,
          h = this.isRTL ? l - i : i - l,
          d = this.isRTL ? r - e : e - r;
        c && 1 === n
          ? (t <= this.page &&
              ((a.current[this.axis] -= h), (a.target[this.axis] -= h)),
            a.panTo({ [this.isHorizontal ? "x" : "y"]: -1 * e }))
          : d &&
            t <= this.page &&
            ((a.target[this.axis] -= d),
            (a.current[this.axis] -= d),
            a.requestTick());
      }
      for (const t of d) this.emit("initSlide", t, t.index);
    }
    prependSlide(t) {
      this.addSlide(0, t);
    }
    appendSlide(t) {
      this.addSlide(this.slides.length, t);
    }
    removeSlide(t) {
      const e = this.slides.length;
      t = ((t % e) + e) % e;
      const i = this.slides[t];
      if (i) {
        this.removeSlideEl(i, !0), this.slides.splice(t, 1);
        for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
        this.updateMetrics(),
          this.slideTo(this.page, { friction: 0, transition: !1 }),
          this.emit("destroySlide", i);
      }
    }
    updateMetrics() {
      const {
        panzoom: t,
        viewport: i,
        track: n,
        slides: s,
        isHorizontal: o,
        isInfinite: a,
      } = this;
      if (!n) return;
      const r = o ? "width" : "height",
        l = o ? "offsetWidth" : "offsetHeight";
      if (i) {
        let t = Math.max(i[l], e(i.getBoundingClientRect()[r], 1e3)),
          n = getComputedStyle(i),
          s = "padding",
          a = o ? "Right" : "Bottom";
        (t -= parseFloat(n[s + (o ? "Left" : "Top")]) + parseFloat(n[s + a])),
          (this.viewportDim = t);
      }
      let c,
        h = 0;
      for (const [t, i] of s.entries()) {
        let n = 0,
          o = 0;
        !i.el && c
          ? ((n = c.dim), (o = c.gap))
          : (({ dim: n, gap: o } = this.getSlideMetrics(i)), (c = i)),
          (n = e(n, 1e3)),
          (o = e(o, 1e3)),
          (i.dim = n),
          (i.gap = o),
          (i.pos = h),
          (h += n),
          (a || t < s.length - 1) && (h += o);
      }
      (h = e(h, 1e3)),
        (this.contentDim = h),
        t &&
          ((t.contentRect[r] = h),
          (t.contentRect[o ? "fullWidth" : "fullHeight"] = h)),
        (this.pages = this.createPages()),
        (this.pages = this.processPages()),
        this.state === H.Init && this.setInitialPage(),
        (this.page = Math.max(0, Math.min(this.page, this.pages.length - 1))),
        this.manageSlideVisiblity(),
        this.emit("refresh");
    }
    getProgress(t, i = !1, n = !1) {
      void 0 === t && (t = this.page);
      const s = this,
        o = s.panzoom,
        a = s.contentDim,
        r = s.pages[t] || 0;
      if (!r || !o) return t > this.page ? -1 : 1;
      let l = -1 * o.current.e,
        c = e((l - r.pos) / (1 * r.dim), 1e3),
        h = c,
        d = c;
      this.isInfinite &&
        !0 !== n &&
        ((h = e((l - r.pos + a) / (1 * r.dim), 1e3)),
        (d = e((l - r.pos - a) / (1 * r.dim), 1e3)));
      let u = [c, h, d].reduce(function (t, e) {
        return Math.abs(e) < Math.abs(t) ? e : t;
      });
      return i ? u : u > 1 ? 1 : u < -1 ? -1 : u;
    }
    setViewportHeight() {
      const { page: t, pages: e, viewport: i, isHorizontal: n } = this;
      if (!i || !e[t]) return;
      let s = 0;
      n &&
        this.track &&
        ((this.track.style.height = "auto"),
        e[t].slides.forEach((t) => {
          t.el && (s = Math.max(s, t.el.offsetHeight));
        })),
        (i.style.height = s ? `${s}px` : "");
    }
    getPageForSlide(t) {
      for (const e of this.pages)
        for (const i of e.slides) if (i.index === t) return e.index;
      return -1;
    }
    getVisibleSlides(t = 0) {
      var e;
      const i = new Set();
      let {
        panzoom: n,
        contentDim: s,
        viewportDim: o,
        pages: a,
        page: r,
      } = this;
      if (o) {
        s =
          s +
            (null === (e = this.slides[this.slides.length - 1]) || void 0 === e
              ? void 0
              : e.gap) || 0;
        let l = 0;
        (l =
          n && n.state !== v.Init && n.state !== v.Destroy
            ? -1 * n.current[this.axis]
            : (a[r] && a[r].pos) || 0),
          this.isInfinite && (l -= Math.floor(l / s) * s),
          this.isRTL && this.isHorizontal && (l *= -1);
        const c = l - o * t,
          h = l + o * (t + 1),
          d = this.isInfinite ? [-1, 0, 1] : [0];
        for (const t of this.slides)
          for (const e of d) {
            const n = t.pos + e * s,
              o = n + t.dim + t.gap;
            n < h && o > c && i.add(t);
          }
      }
      return i;
    }
    getPageFromPosition(t) {
      const {
          viewportDim: e,
          contentDim: i,
          slides: n,
          pages: s,
          panzoom: o,
        } = this,
        a = s.length,
        r = n.length,
        l = n[0],
        c = n[r - 1],
        h = this.option("center");
      let d = 0,
        u = 0,
        p = 0,
        f =
          void 0 === t
            ? -1 * ((null == o ? void 0 : o.target[this.axis]) || 0)
            : t;
      h && (f += 0.5 * e),
        this.isInfinite
          ? (f < l.pos - 0.5 * c.gap && ((f -= i), (p = -1)),
            f > c.pos + c.dim + 0.5 * c.gap && ((f -= i), (p = 1)))
          : (f = Math.max(l.pos || 0, Math.min(f, c.pos)));
      let g = c,
        m = n.find((t) => {
          const e = t.pos - 0.5 * g.gap,
            i = t.pos + t.dim + 0.5 * t.gap;
          return (g = t), f >= e && f < i;
        });
      return (
        m || (m = c),
        (u = this.getPageForSlide(m.index)),
        (d = u + p * a),
        { page: d, pageIndex: u }
      );
    }
    setPageFromPosition() {
      const { pageIndex: t } = this.getPageFromPosition();
      this.onChange(t);
    }
    destroy() {
      if ([H.Destroy].includes(this.state)) return;
      this.state = H.Destroy;
      const {
          container: t,
          viewport: e,
          track: i,
          slides: n,
          panzoom: s,
        } = this,
        o = this.option("classes");
      t.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1,
      }),
        t.removeEventListener("slideTo", this.onSlideTo),
        window.removeEventListener("resize", this.onResize),
        s && (s.destroy(), (this.panzoom = null)),
        n &&
          n.forEach((t) => {
            this.removeSlideEl(t);
          }),
        this.detachPlugins(),
        e &&
          (e.removeEventListener("scroll", this.onScroll),
          e.offsetParent &&
            i &&
            i.offsetParent &&
            e.replaceWith(...i.childNodes));
      for (const [e, i] of Object.entries(o))
        "container" !== e && i && t.classList.remove(i);
      (this.track = null),
        (this.viewport = null),
        (this.page = 0),
        (this.slides = []);
      const a = this.events.get("ready");
      (this.events = new Map()), a && this.events.set("ready", a);
    }
  }
  Object.defineProperty(tt, "Panzoom", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: D,
  }),
    Object.defineProperty(tt, "defaults", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: B,
    }),
    Object.defineProperty(tt, "Plugins", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: G,
    });
  const et = function (t) {
      if (!S(t)) return 0;
      const e = window.scrollY,
        i = window.innerHeight,
        n = e + i,
        s = t.getBoundingClientRect(),
        o = s.y + e,
        a = s.height,
        r = o + a;
      if (e > r || n < o) return 0;
      if (e < o && n > r) return 100;
      if (o < e && r > n) return 100;
      let l = a;
      o < e && (l -= e - o), r > n && (l -= r - n);
      const c = (l / i) * 100;
      return Math.round(c);
    },
    it = !(
      "undefined" == typeof window ||
      !window.document ||
      !window.document.createElement
    );
  let nt;
  const st = [
      "a[href]",
      "area[href]",
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      "select:not([disabled]):not([aria-hidden])",
      "textarea:not([disabled]):not([aria-hidden])",
      "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)",
      "iframe",
      "object",
      "embed",
      "video",
      "audio",
      "[contenteditable]",
      '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])',
    ].join(","),
    ot = (t) => {
      if (t && it) {
        void 0 === nt &&
          document.createElement("div").focus({
            get preventScroll() {
              return (nt = !0), !1;
            },
          });
        try {
          if (nt) t.focus({ preventScroll: !0 });
          else {
            const e = window.scrollY || document.body.scrollTop,
              i = window.scrollX || document.body.scrollLeft;
            t.focus(),
              document.body.scrollTo({ top: e, left: i, behavior: "auto" });
          }
        } catch (t) {}
      }
    },
    at = () => {
      const t = document;
      let e,
        i = "",
        n = "",
        s = "";
      return (
        t.fullscreenEnabled
          ? ((i = "requestFullscreen"),
            (n = "exitFullscreen"),
            (s = "fullscreenElement"))
          : t.webkitFullscreenEnabled &&
            ((i = "webkitRequestFullscreen"),
            (n = "webkitExitFullscreen"),
            (s = "webkitFullscreenElement")),
        i &&
          (e = {
            request: function (e = t.documentElement) {
              return "webkitRequestFullscreen" === i
                ? e[i](Element.ALLOW_KEYBOARD_INPUT)
                : e[i]();
            },
            exit: function () {
              return t[s] && t[n]();
            },
            isFullscreen: function () {
              return t[s];
            },
          }),
        e
      );
    },
    rt = {
      animated: !0,
      autoFocus: !0,
      backdropClick: "close",
      Carousel: {
        classes: {
          container: "fancybox__carousel",
          viewport: "fancybox__viewport",
          track: "fancybox__track",
          slide: "fancybox__slide",
        },
      },
      closeButton: "auto",
      closeExisting: !1,
      commonCaption: !1,
      compact: () =>
        window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
      contentClick: "toggleZoom",
      contentDblClick: !1,
      defaultType: "image",
      defaultDisplay: "flex",
      dragToClose: !0,
      Fullscreen: { autoStart: !1 },
      groupAll: !1,
      groupAttr: "data-fancybox",
      hideClass: "f-fadeOut",
      hideScrollbar: !0,
      idle: 3500,
      keyboard: {
        Escape: "close",
        Delete: "close",
        Backspace: "close",
        PageUp: "next",
        PageDown: "prev",
        ArrowUp: "prev",
        ArrowDown: "next",
        ArrowRight: "next",
        ArrowLeft: "prev",
      },
      l10n: Object.assign(Object.assign({}, y), {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        MODAL: "You can close this modal content with the ESC key",
        ERROR: "Something Went Wrong, Please Try Again Later",
        IMAGE_ERROR: "Image Not Found",
        ELEMENT_NOT_FOUND: "HTML Element Not Found",
        AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
        AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
        IFRAME_ERROR: "Error Loading Page",
        TOGGLE_ZOOM: "Toggle zoom level",
        TOGGLE_THUMBS: "Toggle thumbnails",
        TOGGLE_SLIDESHOW: "Toggle slideshow",
        TOGGLE_FULLSCREEN: "Toggle full-screen mode",
        DOWNLOAD: "Download",
      }),
      parentEl: null,
      placeFocusBack: !0,
      showClass: "f-zoomInUp",
      startIndex: 0,
      tpl: {
        closeButton:
          '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
        main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>',
      },
      trapFocus: !0,
      wheel: "zoom",
    };
  var lt, ct;
  !(function (t) {
    (t[(t.Init = 0)] = "Init"),
      (t[(t.Ready = 1)] = "Ready"),
      (t[(t.Closing = 2)] = "Closing"),
      (t[(t.CustomClosing = 3)] = "CustomClosing"),
      (t[(t.Destroy = 4)] = "Destroy");
  })(lt || (lt = {})),
    (function (t) {
      (t[(t.Loading = 0)] = "Loading"),
        (t[(t.Opening = 1)] = "Opening"),
        (t[(t.Ready = 2)] = "Ready"),
        (t[(t.Closing = 3)] = "Closing");
    })(ct || (ct = {}));
  let ht = "",
    dt = !1,
    ut = !1,
    pt = null;
  const ft = () => {
      let t = "",
        e = "";
      const i = Ae.getInstance();
      if (i) {
        const n = i.carousel,
          s = i.getSlide();
        if (n && s) {
          let o = s.slug || void 0,
            a = s.triggerEl || void 0;
          (e = o || i.option("slug") || ""),
            !e && a && a.dataset && (e = a.dataset.fancybox || ""),
            e &&
              "true" !== e &&
              (t =
                "#" +
                e +
                (!o && n.slides.length > 1 ? "-" + (s.index + 1) : ""));
        }
      }
      return { hash: t, slug: e, index: 1 };
    },
    gt = () => {
      const t = new URL(document.URL).hash,
        e = t.slice(1).split("-"),
        i = e[e.length - 1],
        n = (i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10)) || 1;
      return { hash: t, slug: e.join("-"), index: n };
    },
    mt = () => {
      const { slug: t, index: e } = gt();
      if (!t) return;
      let i = document.querySelector(`[data-slug="${t}"]`);
      if (
        (i &&
          i.dispatchEvent(
            new CustomEvent("click", { bubbles: !0, cancelable: !0 })
          ),
        Ae.getInstance())
      )
        return;
      const n = document.querySelectorAll(`[data-fancybox="${t}"]`);
      n.length &&
        ((i = n[e - 1]),
        i &&
          i.dispatchEvent(
            new CustomEvent("click", { bubbles: !0, cancelable: !0 })
          ));
    },
    vt = () => {
      if (!1 === Ae.defaults.Hash) return;
      const t = Ae.getInstance();
      if (!1 === (null == t ? void 0 : t.options.Hash)) return;
      const { slug: e, index: i } = gt(),
        { slug: n } = ft();
      t && (e === n ? t.jumpTo(i - 1) : ((dt = !0), t.close())), mt();
    },
    bt = () => {
      pt && clearTimeout(pt),
        queueMicrotask(() => {
          vt();
        });
    },
    yt = () => {
      window.addEventListener("hashchange", bt, !1),
        setTimeout(() => {
          vt();
        }, 500);
    };
  it &&
    (/complete|interactive|loaded/.test(document.readyState)
      ? yt()
      : document.addEventListener("DOMContentLoaded", yt));
  const wt = "is-zooming-in";
  class xt extends $ {
    onCreateSlide(t, e, i) {
      const n = this.instance.optionFor(i, "src") || "";
      i.el && "image" === i.type && "string" == typeof n && this.setImage(i, n);
    }
    onRemoveSlide(t, e, i) {
      i.panzoom && i.panzoom.destroy(),
        (i.panzoom = void 0),
        (i.imageEl = void 0);
    }
    onChange(t, e, i, n) {
      P(this.instance.container, wt);
      for (const t of e.slides) {
        const e = t.panzoom;
        e && t.index !== i && e.reset(0.35);
      }
    }
    onClose() {
      var t;
      const e = this.instance,
        i = e.container,
        n = e.getSlide();
      if (!i || !i.parentElement || !n) return;
      const { el: s, contentEl: o, panzoom: a, thumbElSrc: r } = n;
      if (
        !s ||
        !r ||
        !o ||
        !a ||
        a.isContentLoading ||
        a.state === v.Init ||
        a.state === v.Destroy
      )
        return;
      a.updateMetrics();
      let l = this.getZoomInfo(n);
      if (!l) return;
      (this.instance.state = lt.CustomClosing),
        i.classList.remove(wt),
        i.classList.add("is-zooming-out"),
        (o.style.backgroundImage = `url('${r}')`);
      const c = i.getBoundingClientRect();
      1 ===
        ((null === (t = window.visualViewport) || void 0 === t
          ? void 0
          : t.scale) || 1) &&
        Object.assign(i.style, {
          position: "absolute",
          top: `${i.offsetTop + window.scrollY}px`,
          left: `${i.offsetLeft + window.scrollX}px`,
          bottom: "auto",
          right: "auto",
          width: `${c.width}px`,
          height: `${c.height}px`,
          overflow: "hidden",
        });
      const { x: h, y: d, scale: u, opacity: p } = l;
      if (p) {
        const t = ((t, e, i, n) => {
          const s = e - t,
            o = n - i;
          return (e) => i + (((e - t) / s) * o || 0);
        })(a.scale, u, 1, 0);
        a.on("afterTransform", () => {
          o.style.opacity = t(a.scale) + "";
        });
      }
      a.on("endAnimation", () => {
        e.destroy();
      }),
        (a.target.a = u),
        (a.target.b = 0),
        (a.target.c = 0),
        (a.target.d = u),
        a.panTo({
          x: h,
          y: d,
          scale: u,
          friction: p ? 0.2 : 0.33,
          ignoreBounds: !0,
        }),
        a.isResting && e.destroy();
    }
    setImage(t, e) {
      const i = this.instance;
      (t.src = e),
        this.process(t, e).then(
          (e) => {
            const { contentEl: n, imageEl: s, thumbElSrc: o, el: a } = t;
            if (i.isClosing() || !n || !s) return;
            n.offsetHeight;
            const r = !!i.isOpeningSlide(t) && this.getZoomInfo(t);
            if (this.option("protected") && a) {
              a.addEventListener("contextmenu", (t) => {
                t.preventDefault();
              });
              const t = document.createElement("div");
              C(t, "fancybox-protected"), n.appendChild(t);
            }
            if (o && r) {
              const s = e.contentRect,
                a = Math.max(s.fullWidth, s.fullHeight);
              let c = null;
              !r.opacity &&
                a > 1200 &&
                ((c = document.createElement("img")),
                C(c, "fancybox-ghost"),
                (c.src = o),
                n.appendChild(c));
              const h = () => {
                c &&
                  (C(c, "f-fadeFastOut"),
                  setTimeout(() => {
                    c && (c.remove(), (c = null));
                  }, 200));
              };
              ((l = o),
              new Promise((t, e) => {
                const i = new Image();
                (i.onload = t), (i.onerror = e), (i.src = l);
              })).then(
                () => {
                  i.hideLoading(t),
                    (t.state = ct.Opening),
                    this.instance.emit("reveal", t),
                    this.zoomIn(t).then(
                      () => {
                        h(), this.instance.done(t);
                      },
                      () => {}
                    ),
                    c &&
                      setTimeout(
                        () => {
                          h();
                        },
                        a > 2500 ? 800 : 200
                      );
                },
                () => {
                  i.hideLoading(t), i.revealContent(t);
                }
              );
            } else {
              const n = this.optionFor(t, "initialSize"),
                s = this.optionFor(t, "zoom"),
                o = {
                  event: i.prevMouseMoveEvent || i.options.event,
                  friction: s ? 0.12 : 0,
                };
              let a = i.optionFor(t, "showClass") || void 0,
                r = !0;
              i.isOpeningSlide(t) &&
                ("full" === n
                  ? e.zoomToFull(o)
                  : "cover" === n
                  ? e.zoomToCover(o)
                  : "max" === n
                  ? e.zoomToMax(o)
                  : (r = !1),
                e.stop("current")),
                r && a && (a = e.isDragging ? "f-fadeIn" : ""),
                i.hideLoading(t),
                i.revealContent(t, a);
            }
            var l;
          },
          () => {
            i.setError(t, "{{IMAGE_ERROR}}");
          }
        );
    }
    process(t, e) {
      return new Promise((i, n) => {
        var o;
        const a = this.instance,
          r = t.el;
        a.clearContent(t), a.showLoading(t);
        let l = this.optionFor(t, "content");
        if (("string" == typeof l && (l = s(l)), !l || !S(l))) {
          if (
            ((l = document.createElement("img")), l instanceof HTMLImageElement)
          ) {
            let i = "",
              n = t.caption;
            (i =
              "string" == typeof n && n
                ? n.replace(/<[^>]+>/gi, "").substring(0, 1e3)
                : `Image ${t.index + 1} of ${
                    (null === (o = a.carousel) || void 0 === o
                      ? void 0
                      : o.pages.length) || 1
                  }`),
              (l.src = e || ""),
              (l.alt = i),
              (l.draggable = !1),
              t.srcset && l.setAttribute("srcset", t.srcset),
              this.instance.isOpeningSlide(t) && (l.fetchPriority = "high");
          }
          t.sizes && l.setAttribute("sizes", t.sizes);
        }
        C(l, "fancybox-image"), (t.imageEl = l), a.setContent(t, l, !1);
        t.panzoom = new D(
          r,
          p({ transformParent: !0 }, this.option("Panzoom") || {}, {
            content: l,
            width: (e, i) => a.optionFor(t, "width", "auto", i) || "auto",
            height: (e, i) => a.optionFor(t, "height", "auto", i) || "auto",
            wheel: () => {
              const t = a.option("wheel");
              return ("zoom" === t || "pan" == t) && t;
            },
            click: (e, i) => {
              var n, s;
              if (a.isCompact || a.isClosing()) return !1;
              if (
                t.index !==
                (null === (n = a.getSlide()) || void 0 === n ? void 0 : n.index)
              )
                return !1;
              if (i) {
                const t = i.composedPath()[0];
                if (
                  [
                    "A",
                    "BUTTON",
                    "TEXTAREA",
                    "OPTION",
                    "INPUT",
                    "SELECT",
                    "VIDEO",
                  ].includes(t.nodeName)
                )
                  return !1;
              }
              let o =
                !i ||
                (i.target &&
                  (null === (s = t.contentEl) || void 0 === s
                    ? void 0
                    : s.contains(i.target)));
              return a.option(o ? "contentClick" : "backdropClick") || !1;
            },
            dblClick: () =>
              a.isCompact ? "toggleZoom" : a.option("contentDblClick") || !1,
            spinner: !1,
            panOnlyZoomed: !0,
            wheelLimit: 1 / 0,
            on: {
              ready: (t) => {
                i(t);
              },
              error: () => {
                n();
              },
              destroy: () => {
                n();
              },
            },
          })
        );
      });
    }
    zoomIn(t) {
      return new Promise((e, i) => {
        const n = this.instance,
          s = n.container,
          { panzoom: o, contentEl: a, el: r } = t;
        o && o.updateMetrics();
        const l = this.getZoomInfo(t);
        if (!(l && r && a && o && s)) return void i();
        const { x: c, y: h, scale: d, opacity: u } = l,
          p = () => {
            t.state !== ct.Closing &&
              (u &&
                (a.style.opacity =
                  Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - d)), 0) + ""),
              o.scale >= 1 && o.scale > o.targetScale - 0.1 && e(o));
          },
          f = (t) => {
            ((t.scale < 0.99 || t.scale > 1.01) && !t.isDragging) ||
              (P(s, wt),
              (a.style.opacity = ""),
              t.off("endAnimation", f),
              t.off("touchStart", f),
              t.off("afterTransform", p),
              e(t));
          };
        o.on("endAnimation", f),
          o.on("touchStart", f),
          o.on("afterTransform", p),
          o.on(["error", "destroy"], () => {
            i();
          }),
          o.panTo({ x: c, y: h, scale: d, friction: 0, ignoreBounds: !0 }),
          o.stop("current");
        const g = {
            event:
              "mousemove" === o.panMode
                ? n.prevMouseMoveEvent || n.options.event
                : void 0,
          },
          m = this.optionFor(t, "initialSize");
        C(s, wt),
          n.hideLoading(t),
          "full" === m
            ? o.zoomToFull(g)
            : "cover" === m
            ? o.zoomToCover(g)
            : "max" === m
            ? o.zoomToMax(g)
            : o.reset(0.172);
      });
    }
    getZoomInfo(t) {
      const { el: e, imageEl: i, thumbEl: n, panzoom: s } = t,
        o = this.instance,
        a = o.container;
      if (
        !e ||
        !i ||
        !n ||
        !s ||
        et(n) < 3 ||
        !this.optionFor(t, "zoom") ||
        !a ||
        o.state === lt.Destroy
      )
        return !1;
      if ("0" === getComputedStyle(a).getPropertyValue("--f-images-zoom"))
        return !1;
      const r = window.visualViewport || null;
      if (1 !== (r ? r.scale : 1)) return !1;
      let { top: l, left: c, width: h, height: d } = n.getBoundingClientRect(),
        { top: u, left: p, fitWidth: f, fitHeight: g } = s.contentRect;
      if (!(h && d && f && g)) return !1;
      const m = s.container.getBoundingClientRect();
      (p += m.left), (u += m.top);
      const v = -1 * (p + 0.5 * f - (c + 0.5 * h)),
        b = -1 * (u + 0.5 * g - (l + 0.5 * d)),
        y = h / f;
      let w = this.option("zoomOpacity") || !1;
      return (
        "auto" === w && (w = Math.abs(h / d - f / g) > 0.1),
        { x: v, y: b, scale: y, opacity: w }
      );
    }
    attach() {
      const t = this,
        e = t.instance;
      e.on("Carousel.change", t.onChange),
        e.on("Carousel.createSlide", t.onCreateSlide),
        e.on("Carousel.removeSlide", t.onRemoveSlide),
        e.on("close", t.onClose);
    }
    detach() {
      const t = this,
        e = t.instance;
      e.off("Carousel.change", t.onChange),
        e.off("Carousel.createSlide", t.onCreateSlide),
        e.off("Carousel.removeSlide", t.onRemoveSlide),
        e.off("close", t.onClose);
    }
  }
  Object.defineProperty(xt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      initialSize: "fit",
      Panzoom: { maxScale: 1 },
      protected: !1,
      zoom: !0,
      zoomOpacity: "auto",
    },
  }),
    "function" == typeof SuppressedError && SuppressedError;
  const Et = "html",
    St = "image",
    Pt = "map",
    Ct = "youtube",
    Tt = "vimeo",
    Mt = "html5video",
    Ot = (t, e = {}) => {
      const i = new URL(t),
        n = new URLSearchParams(i.search),
        s = new URLSearchParams();
      for (const [t, i] of [...n, ...Object.entries(e)]) {
        let e = i + "";
        if ("t" === t) {
          let t = e.match(/((\d*)m)?(\d*)s?/);
          t &&
            s.set(
              "start",
              60 * parseInt(t[2] || "0") + parseInt(t[3] || "0") + ""
            );
        } else s.set(t, e);
      }
      let o = s + "",
        a = t.match(/#t=((.*)?\d+s)/);
      return a && (o += `#t=${a[1]}`), o;
    },
    At = {
      ajax: null,
      autoSize: !0,
      iframeAttr: { allow: "autoplay; fullscreen", scrolling: "auto" },
      preload: !0,
      videoAutoplay: !0,
      videoRatio: 16 / 9,
      videoTpl:
        '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
      videoFormat: "",
      vimeo: { byline: 1, color: "00adef", controls: 1, dnt: 1, muted: 0 },
      youtube: { controls: 1, enablejsapi: 1, nocookie: 1, rel: 0, fs: 1 },
    },
    Lt = [
      "image",
      "html",
      "ajax",
      "inline",
      "clone",
      "iframe",
      "map",
      "pdf",
      "html5video",
      "youtube",
      "vimeo",
    ];
  class zt extends $ {
    onBeforeInitSlide(t, e, i) {
      this.processType(i);
    }
    onCreateSlide(t, e, i) {
      this.setContent(i);
    }
    onClearContent(t, e) {
      e.xhr && (e.xhr.abort(), (e.xhr = null));
      const i = e.iframeEl;
      i &&
        ((i.onload = i.onerror = null),
        (i.src = "//about:blank"),
        (e.iframeEl = null));
      const n = e.contentEl,
        s = e.placeholderEl;
      if ("inline" === e.type && n && s)
        n.classList.remove("fancybox__content"),
          "none" !== getComputedStyle(n).getPropertyValue("display") &&
            (n.style.display = "none"),
          setTimeout(() => {
            s &&
              (n && s.parentNode && s.parentNode.insertBefore(n, s),
              s.remove());
          }, 0),
          (e.contentEl = void 0),
          (e.placeholderEl = void 0);
      else for (; e.el && e.el.firstChild; ) e.el.removeChild(e.el.firstChild);
    }
    onSelectSlide(t, e, i) {
      i.state === ct.Ready && this.playVideo();
    }
    onUnselectSlide(t, e, i) {
      var n, s;
      if (i.type === Mt) {
        try {
          null ===
            (s =
              null === (n = i.el) || void 0 === n
                ? void 0
                : n.querySelector("video")) ||
            void 0 === s ||
            s.pause();
        } catch (t) {}
        return;
      }
      let o;
      i.type === Tt
        ? (o = { method: "pause", value: "true" })
        : i.type === Ct && (o = { event: "command", func: "pauseVideo" }),
        o &&
          i.iframeEl &&
          i.iframeEl.contentWindow &&
          i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"),
        i.poller && clearTimeout(i.poller);
    }
    onDone(t, e) {
      t.isCurrentSlide(e) && !t.isClosing() && this.playVideo();
    }
    onRefresh(t, e) {
      e.slides.forEach((t) => {
        t.el && (this.resizeIframe(t), this.setAspectRatio(t));
      });
    }
    onMessage(t) {
      try {
        let e = JSON.parse(t.data);
        if ("https://player.vimeo.com" === t.origin) {
          if ("ready" === e.event)
            for (let e of Array.from(
              document.getElementsByClassName("fancybox__iframe")
            ))
              e instanceof HTMLIFrameElement &&
                e.contentWindow === t.source &&
                (e.dataset.ready = "true");
        } else if (
          t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) &&
          "onReady" === e.event
        ) {
          const t = document.getElementById(e.id);
          t && (t.dataset.ready = "true");
        }
      } catch (t) {}
    }
    loadAjaxContent(t) {
      const e = this.instance.optionFor(t, "src") || "";
      this.instance.showLoading(t);
      const i = this.instance,
        n = new XMLHttpRequest();
      i.showLoading(t),
        (n.onreadystatechange = function () {
          n.readyState === XMLHttpRequest.DONE &&
            i.state === lt.Ready &&
            (i.hideLoading(t),
            200 === n.status
              ? i.setContent(t, n.responseText)
              : i.setError(
                  t,
                  404 === n.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"
                ));
        });
      const s = t.ajax || null;
      n.open(s ? "POST" : "GET", e + ""),
        n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        n.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
        n.send(s),
        (t.xhr = n);
    }
    setInlineContent(t) {
      let e = null;
      if (S(t.src)) e = t.src;
      else if ("string" == typeof t.src) {
        const i = t.src.split("#", 2).pop();
        e = i ? document.getElementById(i) : null;
      }
      if (e) {
        if ("clone" === t.type || e.closest(".fancybox__slide")) {
          e = e.cloneNode(!0);
          const i = e.dataset.animationName;
          i && (e.classList.remove(i), delete e.dataset.animationName);
          let n = e.getAttribute("id");
          (n = n ? `${n}--clone` : `clone-${this.instance.id}-${t.index}`),
            e.setAttribute("id", n);
        } else if (e.parentNode) {
          const i = document.createElement("div");
          i.classList.add("fancybox-placeholder"),
            e.parentNode.insertBefore(i, e),
            (t.placeholderEl = i);
        }
        this.instance.setContent(t, e);
      } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}");
    }
    setIframeContent(t) {
      const { src: e, el: i } = t;
      if (!e || "string" != typeof e || !i) return;
      i.classList.add("is-loading");
      const n = this.instance,
        s = document.createElement("iframe");
      (s.className = "fancybox__iframe"),
        s.setAttribute("id", `fancybox__iframe_${n.id}_${t.index}`);
      for (const [e, i] of Object.entries(
        this.optionFor(t, "iframeAttr") || {}
      ))
        s.setAttribute(e, i);
      (s.onerror = () => {
        n.setError(t, "{{IFRAME_ERROR}}");
      }),
        (t.iframeEl = s);
      const o = this.optionFor(t, "preload");
      if ("iframe" !== t.type || !1 === o)
        return (
          s.setAttribute("src", t.src + ""),
          n.setContent(t, s, !1),
          this.resizeIframe(t),
          void n.revealContent(t)
        );
      n.showLoading(t),
        (s.onload = () => {
          if (!s.src.length) return;
          const e = "true" !== s.dataset.ready;
          (s.dataset.ready = "true"),
            this.resizeIframe(t),
            e ? n.revealContent(t) : n.hideLoading(t);
        }),
        s.setAttribute("src", e),
        n.setContent(t, s, !1);
    }
    resizeIframe(t) {
      const { type: e, iframeEl: i } = t;
      if (e === Ct || e === Tt) return;
      const n = null == i ? void 0 : i.parentElement;
      if (!i || !n) return;
      let s = t.autoSize;
      void 0 === s && (s = this.optionFor(t, "autoSize"));
      let o = t.width || 0,
        a = t.height || 0;
      o && a && (s = !1);
      const r = n && n.style;
      if (!1 !== t.preload && !1 !== s && r)
        try {
          const t = window.getComputedStyle(n),
            e = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
            s = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom),
            l = i.contentWindow;
          if (l) {
            const t = l.document,
              i = t.getElementsByTagName(Et)[0],
              n = t.body;
            (r.width = ""),
              (n.style.overflow = "hidden"),
              (o = o || i.scrollWidth + e),
              (r.width = `${o}px`),
              (n.style.overflow = ""),
              (r.flex = "0 0 auto"),
              (r.height = `${n.scrollHeight}px`),
              (a = i.scrollHeight + s);
          }
        } catch (t) {}
      if (o || a) {
        const t = { flex: "0 1 auto", width: "", height: "" };
        o && "auto" !== o && (t.width = `${o}px`),
          a && "auto" !== a && (t.height = `${a}px`),
          Object.assign(r, t);
      }
    }
    playVideo() {
      const t = this.instance.getSlide();
      if (!t) return;
      const { el: e } = t;
      if (!e || !e.offsetParent) return;
      if (!this.optionFor(t, "videoAutoplay")) return;
      if (t.type === Mt)
        try {
          const t = e.querySelector("video");
          if (t) {
            const e = t.play();
            void 0 !== e &&
              e
                .then(() => {})
                .catch((e) => {
                  (t.muted = !0), t.play();
                });
          }
        } catch (t) {}
      if (t.type !== Ct && t.type !== Tt) return;
      const i = () => {
        if (t.iframeEl && t.iframeEl.contentWindow) {
          let e;
          if ("true" === t.iframeEl.dataset.ready)
            return (
              (e =
                t.type === Ct
                  ? { event: "command", func: "playVideo" }
                  : { method: "play", value: "true" }),
              e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"),
              void (t.poller = void 0)
            );
          t.type === Ct &&
            ((e = { event: "listening", id: t.iframeEl.getAttribute("id") }),
            t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"));
        }
        t.poller = setTimeout(i, 250);
      };
      i();
    }
    processType(t) {
      if (t.html) return (t.type = Et), (t.src = t.html), void (t.html = "");
      const e = this.instance.optionFor(t, "src", "");
      if (!e || "string" != typeof e) return;
      let i = t.type,
        n = null;
      if (
        (n = e.match(
          /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i
        ))
      ) {
        const s = this.optionFor(t, Ct),
          { nocookie: o } = s,
          a = (function (t, e) {
            var i = {};
            for (var n in t)
              Object.prototype.hasOwnProperty.call(t, n) &&
                e.indexOf(n) < 0 &&
                (i[n] = t[n]);
            if (
              null != t &&
              "function" == typeof Object.getOwnPropertySymbols
            ) {
              var s = 0;
              for (n = Object.getOwnPropertySymbols(t); s < n.length; s++)
                e.indexOf(n[s]) < 0 &&
                  Object.prototype.propertyIsEnumerable.call(t, n[s]) &&
                  (i[n[s]] = t[n[s]]);
            }
            return i;
          })(s, ["nocookie"]),
          r = `www.youtube${o ? "-nocookie" : ""}.com`,
          l = Ot(e, a),
          c = encodeURIComponent(n[2]);
        (t.videoId = c),
          (t.src = `https://${r}/embed/${c}?${l}`),
          (t.thumbSrc =
            t.thumbSrc || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`),
          (i = Ct);
      } else if (
        (n = e.match(
          /^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/
        ))
      ) {
        const s = Ot(e, this.optionFor(t, Tt)),
          o = encodeURIComponent(n[1]),
          a = n[4] || "";
        (t.videoId = o),
          (t.src = `https://player.vimeo.com/video/${o}?${
            a ? `h=${a}${s ? "&" : ""}` : ""
          }${s}`),
          (i = Tt);
      }
      if (!i && t.triggerEl) {
        const e = t.triggerEl.dataset.type;
        Lt.includes(e) && (i = e);
      }
      i ||
        ("string" == typeof e &&
          ("#" === e.charAt(0)
            ? (i = "inline")
            : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
            ? ((i = Mt),
              (t.videoFormat =
                t.videoFormat || "video/" + ("ogv" === n[1] ? "ogg" : n[1])))
            : e.match(
                /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
              )
            ? (i = St)
            : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf"))),
        (n = e.match(
          /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i
        ))
          ? ((t.src = `https://maps.google.${n[1]}/?ll=${(n[2]
              ? n[2] +
                "&z=" +
                Math.floor(parseFloat(n[3])) +
                (n[4] ? n[4].replace(/^\//, "&") : "")
              : n[4] + ""
            ).replace(/\?/, "&")}&output=${
              n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"
            }`),
            (i = Pt))
          : (n = e.match(
              /(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i
            )) &&
            ((t.src = `https://maps.google.${n[1]}/maps?q=${n[2]
              .replace("query=", "q=")
              .replace("api=1", "")}&output=embed`),
            (i = Pt)),
        (i = i || this.instance.option("defaultType")),
        (t.type = i),
        i === St && (t.thumbSrc = t.thumbSrc || t.src);
    }
    setContent(t) {
      const e = this.instance.optionFor(t, "src") || "";
      if (t && t.type && e) {
        switch (t.type) {
          case Et:
            this.instance.setContent(t, e);
            break;
          case Mt:
            const i = this.option("videoTpl");
            i &&
              this.instance.setContent(
                t,
                i
                  .replace(/\{\{src\}\}/gi, e + "")
                  .replace(
                    /\{\{format\}\}/gi,
                    this.optionFor(t, "videoFormat") || ""
                  )
                  .replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || "")
              );
            break;
          case "inline":
          case "clone":
            this.setInlineContent(t);
            break;
          case "ajax":
            this.loadAjaxContent(t);
            break;
          case "pdf":
          case Pt:
          case Ct:
          case Tt:
            t.preload = !1;
          case "iframe":
            this.setIframeContent(t);
        }
        this.setAspectRatio(t);
      }
    }
    setAspectRatio(t) {
      const e = t.contentEl;
      if (!(t.el && e && t.type && [Ct, Tt, Mt].includes(t.type))) return;
      let i,
        n = t.width || "auto",
        s = t.height || "auto";
      if ("auto" === n || "auto" === s) {
        i = this.optionFor(t, "videoRatio");
        const e = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
        i =
          e && e.length > 2
            ? parseFloat(e[1]) / parseFloat(e[2])
            : parseFloat(i + "");
      } else n && s && (i = n / s);
      if (!i) return;
      (e.style.aspectRatio = ""),
        (e.style.width = ""),
        (e.style.height = ""),
        e.offsetHeight;
      const o = e.getBoundingClientRect(),
        a = o.width || 1,
        r = o.height || 1;
      (e.style.aspectRatio = i + ""),
        i < a / r
          ? ((s = "auto" === s ? r : Math.min(r, s)),
            (e.style.width = "auto"),
            (e.style.height = `${s}px`))
          : ((n = "auto" === n ? a : Math.min(a, n)),
            (e.style.width = `${n}px`),
            (e.style.height = "auto"));
    }
    attach() {
      const t = this,
        e = t.instance;
      e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide),
        e.on("Carousel.createSlide", t.onCreateSlide),
        e.on("Carousel.selectSlide", t.onSelectSlide),
        e.on("Carousel.unselectSlide", t.onUnselectSlide),
        e.on("Carousel.Panzoom.refresh", t.onRefresh),
        e.on("done", t.onDone),
        e.on("clearContent", t.onClearContent),
        window.addEventListener("message", t.onMessage);
    }
    detach() {
      const t = this,
        e = t.instance;
      e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide),
        e.off("Carousel.createSlide", t.onCreateSlide),
        e.off("Carousel.selectSlide", t.onSelectSlide),
        e.off("Carousel.unselectSlide", t.onUnselectSlide),
        e.off("Carousel.Panzoom.refresh", t.onRefresh),
        e.off("done", t.onDone),
        e.off("clearContent", t.onClearContent),
        window.removeEventListener("message", t.onMessage);
    }
  }
  Object.defineProperty(zt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: At,
  });
  const Rt = "play",
    kt = "pause",
    It = "ready";
  class Dt extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: It,
        }),
        Object.defineProperty(this, "inHover", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "timer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "progressBar", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        });
    }
    get isActive() {
      return this.state !== It;
    }
    onReady(t) {
      this.option("autoStart") &&
        (t.isInfinite || t.page < t.pages.length - 1) &&
        this.start();
    }
    onChange() {
      this.removeProgressBar(), this.pause();
    }
    onSettle() {
      this.resume();
    }
    onVisibilityChange() {
      "visible" === document.visibilityState ? this.resume() : this.pause();
    }
    onMouseEnter() {
      (this.inHover = !0), this.pause();
    }
    onMouseLeave() {
      var t;
      (this.inHover = !1),
        (null === (t = this.instance.panzoom) || void 0 === t
          ? void 0
          : t.isResting) && this.resume();
    }
    onTimerEnd() {
      const t = this.instance;
      "play" === this.state &&
        (t.isInfinite || t.page !== t.pages.length - 1
          ? t.slideNext()
          : t.slideTo(0));
    }
    removeProgressBar() {
      this.progressBar &&
        (this.progressBar.remove(), (this.progressBar = null));
    }
    createProgressBar() {
      var t;
      if (!this.option("showProgress")) return null;
      this.removeProgressBar();
      const e = this.instance,
        i =
          (null === (t = e.pages[e.page]) || void 0 === t
            ? void 0
            : t.slides) || [];
      let n = this.option("progressParentEl");
      if ((n || (n = (1 === i.length ? i[0].el : null) || e.viewport), !n))
        return null;
      const s = document.createElement("div");
      return (
        C(s, "f-progress"),
        n.prepend(s),
        (this.progressBar = s),
        s.offsetHeight,
        s
      );
    }
    set() {
      const t = this,
        e = t.instance;
      if (e.pages.length < 2) return;
      if (t.timer) return;
      const i = t.option("timeout");
      (t.state = Rt), C(e.container, "has-autoplay");
      let n = t.createProgressBar();
      n &&
        ((n.style.transitionDuration = `${i}ms`),
        (n.style.transform = "scaleX(1)")),
        (t.timer = setTimeout(() => {
          (t.timer = null), t.inHover || t.onTimerEnd();
        }, i)),
        t.emit("set");
    }
    clear() {
      const t = this;
      t.timer && (clearTimeout(t.timer), (t.timer = null)),
        t.removeProgressBar();
    }
    start() {
      const t = this;
      if ((t.set(), t.state !== It)) {
        if (t.option("pauseOnHover")) {
          const e = t.instance.container;
          e.addEventListener("mouseenter", t.onMouseEnter, !1),
            e.addEventListener("mouseleave", t.onMouseLeave, !1);
        }
        document.addEventListener("visibilitychange", t.onVisibilityChange, !1),
          t.emit("start");
      }
    }
    stop() {
      const t = this,
        e = t.state,
        i = t.instance.container;
      t.clear(),
        (t.state = It),
        i.removeEventListener("mouseenter", t.onMouseEnter, !1),
        i.removeEventListener("mouseleave", t.onMouseLeave, !1),
        document.removeEventListener(
          "visibilitychange",
          t.onVisibilityChange,
          !1
        ),
        P(i, "has-autoplay"),
        e !== It && t.emit("stop");
    }
    pause() {
      const t = this;
      t.state === Rt && ((t.state = kt), t.clear(), t.emit(kt));
    }
    resume() {
      const t = this,
        e = t.instance;
      if (e.isInfinite || e.page !== e.pages.length - 1)
        if (t.state !== Rt) {
          if (t.state === kt && !t.inHover) {
            const e = new Event("resume", { bubbles: !0, cancelable: !0 });
            t.emit("resume", e), e.defaultPrevented || t.set();
          }
        } else t.set();
      else t.stop();
    }
    toggle() {
      this.state === Rt || this.state === kt ? this.stop() : this.start();
    }
    attach() {
      const t = this,
        e = t.instance;
      e.on("ready", t.onReady),
        e.on("Panzoom.startAnimation", t.onChange),
        e.on("Panzoom.endAnimation", t.onSettle),
        e.on("Panzoom.touchMove", t.onChange);
    }
    detach() {
      const t = this,
        e = t.instance;
      e.off("ready", t.onReady),
        e.off("Panzoom.startAnimation", t.onChange),
        e.off("Panzoom.endAnimation", t.onSettle),
        e.off("Panzoom.touchMove", t.onChange),
        t.stop();
    }
  }
  Object.defineProperty(Dt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      autoStart: !0,
      pauseOnHover: !0,
      progressParentEl: null,
      showProgress: !0,
      timeout: 3e3,
    },
  });
  class Ft extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "ref", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        });
    }
    onPrepare(t) {
      const e = t.carousel;
      if (!e) return;
      const i = t.container;
      i &&
        ((e.options.Autoplay = p(
          { autoStart: !1 },
          this.option("Autoplay") || {},
          {
            pauseOnHover: !1,
            timeout: this.option("timeout"),
            progressParentEl: () => this.option("progressParentEl") || null,
            on: {
              start: () => {
                t.emit("startSlideshow");
              },
              set: (e) => {
                var n;
                i.classList.add("has-slideshow"),
                  (null === (n = t.getSlide()) || void 0 === n
                    ? void 0
                    : n.state) !== ct.Ready && e.pause();
              },
              stop: () => {
                i.classList.remove("has-slideshow"),
                  t.isCompact || t.endIdle(),
                  t.emit("endSlideshow");
              },
              resume: (e, i) => {
                var n, s, o;
                !i ||
                  !i.cancelable ||
                  ((null === (n = t.getSlide()) || void 0 === n
                    ? void 0
                    : n.state) === ct.Ready &&
                    (null ===
                      (o =
                        null === (s = t.carousel) || void 0 === s
                          ? void 0
                          : s.panzoom) || void 0 === o
                      ? void 0
                      : o.isResting)) ||
                  i.preventDefault();
              },
            },
          }
        )),
        e.attachPlugins({ Autoplay: Dt }),
        (this.ref = e.plugins.Autoplay));
    }
    onReady(t) {
      const e = t.carousel,
        i = this.ref;
      i &&
        e &&
        this.option("playOnStart") &&
        (e.isInfinite || e.page < e.pages.length - 1) &&
        i.start();
    }
    onDone(t, e) {
      const i = this.ref,
        n = t.carousel;
      if (!i || !n) return;
      const s = e.panzoom;
      s &&
        s.on("startAnimation", () => {
          t.isCurrentSlide(e) && i.stop();
        }),
        t.isCurrentSlide(e) && i.resume();
    }
    onKeydown(t, e) {
      var i;
      const n = this.ref;
      n &&
        e === this.option("key") &&
        "BUTTON" !==
          (null === (i = document.activeElement) || void 0 === i
            ? void 0
            : i.nodeName) &&
        n.toggle();
    }
    attach() {
      const t = this,
        e = t.instance;
      e.on("Carousel.init", t.onPrepare),
        e.on("Carousel.ready", t.onReady),
        e.on("done", t.onDone),
        e.on("keydown", t.onKeydown);
    }
    detach() {
      const t = this,
        e = t.instance;
      e.off("Carousel.init", t.onPrepare),
        e.off("Carousel.ready", t.onReady),
        e.off("done", t.onDone),
        e.off("keydown", t.onKeydown);
    }
  }
  Object.defineProperty(Ft, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      key: " ",
      playOnStart: !1,
      progressParentEl: (t) => {
        var e;
        return (
          (null === (e = t.instance.container) || void 0 === e
            ? void 0
            : e.querySelector(
                ".fancybox__toolbar [data-fancybox-toggle-slideshow]"
              )) || t.instance.container
        );
      },
      timeout: 3e3,
    },
  });
  const jt = {
    classes: {
      container: "f-thumbs f-carousel__thumbs",
      viewport: "f-thumbs__viewport",
      track: "f-thumbs__track",
      slide: "f-thumbs__slide",
      isResting: "is-resting",
      isSelected: "is-selected",
      isLoading: "is-loading",
      hasThumbs: "has-thumbs",
    },
    minCount: 2,
    parentEl: null,
    thumbTpl:
      '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
    type: "modern",
  };
  var Bt;
  !(function (t) {
    (t[(t.Init = 0)] = "Init"),
      (t[(t.Ready = 1)] = "Ready"),
      (t[(t.Hidden = 2)] = "Hidden");
  })(Bt || (Bt = {}));
  const Ht = "isResting",
    Nt = "thumbWidth",
    _t = "thumbHeight",
    $t = "thumbClipWidth";
  let Wt = class extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "type", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "modern",
        }),
        Object.defineProperty(this, "container", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "track", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "carousel", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "thumbWidth", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "thumbClipWidth", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "thumbHeight", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "thumbGap", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "thumbExtraGap", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: Bt.Init,
        });
    }
    get isModern() {
      return "modern" === this.type;
    }
    onInitSlide(t, e) {
      const i = e.el ? e.el.dataset : void 0;
      i &&
        ((e.thumbSrc = i.thumbSrc || e.thumbSrc || ""),
        (e[$t] = parseFloat(i[$t] || "") || e[$t] || 0),
        (e[_t] = parseFloat(i.thumbHeight || "") || e[_t] || 0)),
        this.addSlide(e);
    }
    onInitSlides() {
      this.build();
    }
    onChange() {
      var t;
      if (!this.isModern) return;
      const e = this.container,
        i = this.instance,
        n = i.panzoom,
        s = this.carousel,
        o = s ? s.panzoom : null,
        r = i.page;
      if (n && s && o) {
        if (n.isDragging) {
          P(e, this.cn(Ht));
          let n =
            (null === (t = s.pages[r]) || void 0 === t ? void 0 : t.pos) || 0;
          n += i.getProgress(r) * (this[$t] + this.thumbGap);
          let a = o.getBounds();
          -1 * n > a.x.min &&
            -1 * n < a.x.max &&
            o.panTo({ x: -1 * n, friction: 0.12 });
        } else a(e, this.cn(Ht), n.isResting);
        this.shiftModern();
      }
    }
    onRefresh() {
      this.updateProps();
      for (const t of this.instance.slides || []) this.resizeModernSlide(t);
      this.shiftModern();
    }
    isDisabled() {
      const t = this.option("minCount") || 0;
      if (t) {
        const e = this.instance;
        let i = 0;
        for (const t of e.slides || []) t.thumbSrc && i++;
        if (i < t) return !0;
      }
      const e = this.option("type");
      return ["modern", "classic"].indexOf(e) < 0;
    }
    getThumb(t) {
      const e = this.option("thumbTpl") || "";
      return {
        html: this.instance.localize(e, [
          ["%i", t.index],
          ["%d", t.index + 1],
          [
            "%s",
            t.thumbSrc ||
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          ],
        ]),
      };
    }
    addSlide(t) {
      const e = this.carousel;
      e && e.addSlide(t.index, this.getThumb(t));
    }
    getSlides() {
      const t = [];
      for (const e of this.instance.slides || []) t.push(this.getThumb(e));
      return t;
    }
    resizeModernSlide(t) {
      this.isModern &&
        (t[Nt] =
          t[$t] && t[_t] ? Math.round(this[_t] * (t[$t] / t[_t])) : this[Nt]);
    }
    updateProps() {
      const t = this.container;
      if (!t) return;
      const e = (e) =>
        parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-" + e)) || 0;
      (this.thumbGap = e("gap")),
        (this.thumbExtraGap = e("extra-gap")),
        (this[Nt] = e("width") || 40),
        (this[$t] = e("clip-width") || 40),
        (this[_t] = e("height") || 40);
    }
    build() {
      const t = this;
      if (t.state !== Bt.Init) return;
      if (t.isDisabled()) return void t.emit("disabled");
      const e = t.instance,
        i = e.container,
        n = t.getSlides(),
        s = t.option("type");
      t.type = s;
      const o = t.option("parentEl"),
        a = t.cn("container"),
        r = t.cn("track");
      let l = null == o ? void 0 : o.querySelector("." + a);
      l ||
        ((l = document.createElement("div")),
        C(l, a),
        o ? o.appendChild(l) : i.after(l)),
        C(l, `is-${s}`),
        C(i, t.cn("hasThumbs")),
        (t.container = l),
        t.updateProps();
      let c = l.querySelector("." + r);
      c ||
        ((c = document.createElement("div")),
        C(c, t.cn("track")),
        l.appendChild(c)),
        (t.track = c);
      const h = p(
          {},
          {
            track: c,
            infinite: !1,
            center: !0,
            fill: "classic" === s,
            dragFree: !0,
            slidesPerPage: 1,
            transition: !1,
            preload: 0.25,
            friction: 0.12,
            Panzoom: { maxVelocity: 0 },
            Dots: !1,
            Navigation: !1,
            classes: {
              container: "f-thumbs",
              viewport: "f-thumbs__viewport",
              track: "f-thumbs__track",
              slide: "f-thumbs__slide",
            },
          },
          t.option("Carousel") || {},
          { Sync: { target: e }, slides: n }
        ),
        d = new e.constructor(l, h);
      d.on("createSlide", (e, i) => {
        t.setProps(i.index), t.emit("createSlide", i, i.el);
      }),
        d.on("ready", () => {
          t.shiftModern(), t.emit("ready");
        }),
        d.on("refresh", () => {
          t.shiftModern();
        }),
        d.on("Panzoom.click", (e, i, n) => {
          t.onClick(n);
        }),
        (t.carousel = d),
        (t.state = Bt.Ready);
    }
    onClick(t) {
      t.preventDefault(), t.stopPropagation();
      const e = this.instance,
        { pages: i, page: n } = e,
        s = (t) => {
          if (t) {
            const e = t.closest("[data-carousel-index]");
            if (e) return [parseInt(e.dataset.carouselIndex || "", 10) || 0, e];
          }
          return [-1, void 0];
        },
        o = (t, e) => {
          const i = document.elementFromPoint(t, e);
          return i ? s(i) : [-1, void 0];
        };
      let [a, r] = s(t.target);
      if (a > -1) return;
      const l = this[$t],
        c = t.clientX,
        h = t.clientY;
      let [d, u] = o(c - l, h),
        [p, f] = o(c + l, h);
      u && f
        ? ((a =
            Math.abs(c - u.getBoundingClientRect().right) <
            Math.abs(c - f.getBoundingClientRect().left)
              ? d
              : p),
          a === n && (a = a === d ? p : d))
        : u
        ? (a = d)
        : f && (a = p),
        a > -1 && i[a] && e.slideTo(a);
    }
    getShift(t) {
      var e;
      const i = this,
        { instance: n } = i,
        s = i.carousel;
      if (!n || !s) return 0;
      const o = i[Nt],
        a = i[$t],
        r = i.thumbGap,
        l = i.thumbExtraGap;
      if (!(null === (e = s.slides[t]) || void 0 === e ? void 0 : e.el))
        return 0;
      const c = 0.5 * (o - a),
        h = n.pages.length - 1;
      let d = n.getProgress(0),
        u = n.getProgress(h),
        p = n.getProgress(t, !1, !0),
        f = 0,
        g = c + l + r;
      const m = d < 0 && d > -1,
        v = u > 0 && u < 1;
      return (
        0 === t
          ? ((f = g * Math.abs(d)), v && 1 === d && (f -= g * Math.abs(u)))
          : t === h
          ? ((f = g * Math.abs(u) * -1),
            m && -1 === u && (f += g * Math.abs(d)))
          : m || v
          ? ((f = -1 * g), (f += g * Math.abs(d)), (f += g * (1 - Math.abs(u))))
          : (f = g * p),
        f
      );
    }
    setProps(t) {
      var i;
      const n = this;
      if (!n.isModern) return;
      const { instance: s } = n,
        o = n.carousel;
      if (s && o) {
        const a = null === (i = o.slides[t]) || void 0 === i ? void 0 : i.el;
        if (a && a.childNodes.length) {
          let i = e(1 - Math.abs(s.getProgress(t))),
            o = e(n.getShift(t));
          a.style.setProperty("--progress", i ? i + "" : ""),
            a.style.setProperty("--shift", o + "");
        }
      }
    }
    shiftModern() {
      const t = this;
      if (!t.isModern) return;
      const { instance: e, track: i } = t,
        n = e.panzoom,
        s = t.carousel;
      if (!(e && i && n && s)) return;
      if (n.state === v.Init || n.state === v.Destroy) return;
      for (const i of e.slides) t.setProps(i.index);
      let o = (t[$t] + t.thumbGap) * (s.slides.length || 0);
      i.style.setProperty("--width", o + "");
    }
    cleanup() {
      const t = this;
      t.carousel && t.carousel.destroy(),
        (t.carousel = null),
        t.container && t.container.remove(),
        (t.container = null),
        t.track && t.track.remove(),
        (t.track = null),
        (t.state = Bt.Init),
        P(t.instance.container, t.cn("hasThumbs"));
    }
    attach() {
      const t = this,
        e = t.instance;
      e.on("initSlide", t.onInitSlide),
        e.state === H.Init
          ? e.on("initSlides", t.onInitSlides)
          : t.onInitSlides(),
        e.on(["change", "Panzoom.afterTransform"], t.onChange),
        e.on("Panzoom.refresh", t.onRefresh);
    }
    detach() {
      const t = this,
        e = t.instance;
      e.off("initSlide", t.onInitSlide),
        e.off("initSlides", t.onInitSlides),
        e.off(["change", "Panzoom.afterTransform"], t.onChange),
        e.off("Panzoom.refresh", t.onRefresh),
        t.cleanup();
    }
  };
  Object.defineProperty(Wt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: jt,
  });
  const Xt = Object.assign(Object.assign({}, jt), {
      key: "t",
      showOnStart: !0,
      parentEl: null,
    }),
    qt = "is-masked",
    Yt = "aria-hidden";
  class Vt extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "ref", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "hidden", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        });
    }
    get isEnabled() {
      const t = this.ref;
      return t && !t.isDisabled();
    }
    get isHidden() {
      return this.hidden;
    }
    onClick(t, e) {
      e.stopPropagation();
    }
    onCreateSlide(t, e) {
      var i, n, s;
      const o =
          (null ===
            (s =
              null ===
                (n =
                  null === (i = this.instance) || void 0 === i
                    ? void 0
                    : i.carousel) || void 0 === n
                ? void 0
                : n.slides[e.index]) || void 0 === s
            ? void 0
            : s.type) || "",
        a = e.el;
      if (a && o) {
        let t = `for-${o}`;
        ["video", "youtube", "vimeo", "html5video"].includes(o) &&
          (t += " for-video"),
          C(a, t);
      }
    }
    onInit() {
      var t;
      const e = this,
        i = e.instance,
        n = i.carousel;
      if (e.ref || !n) return;
      const s = e.option("parentEl") || i.footer || i.container;
      if (!s) return;
      const o = p({}, e.options, {
        parentEl: s,
        classes: { container: "f-thumbs fancybox__thumbs" },
        Carousel: { Sync: { friction: i.option("Carousel.friction") || 0 } },
        on: {
          ready: (t) => {
            const i = t.container;
            i &&
              this.hidden &&
              (e.refresh(),
              (i.style.transition = "none"),
              e.hide(),
              i.offsetHeight,
              queueMicrotask(() => {
                (i.style.transition = ""), e.show();
              }));
          },
        },
      });
      (o.Carousel = o.Carousel || {}),
        (o.Carousel.on = p(
          (null === (t = e.options.Carousel) || void 0 === t ? void 0 : t.on) ||
            {},
          { click: this.onClick, createSlide: this.onCreateSlide }
        )),
        (n.options.Thumbs = o),
        n.attachPlugins({ Thumbs: Wt }),
        (e.ref = n.plugins.Thumbs),
        e.option("showOnStart") || ((e.ref.state = Bt.Hidden), (e.hidden = !0));
    }
    onResize() {
      var t;
      const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
      e && (e.style.maxHeight = "");
    }
    onKeydown(t, e) {
      const i = this.option("key");
      i && i === e && this.toggle();
    }
    toggle() {
      const t = this.ref;
      if (t && !t.isDisabled())
        return t.state === Bt.Hidden
          ? ((t.state = Bt.Init), void t.build())
          : void (this.hidden ? this.show() : this.hide());
    }
    show() {
      const t = this.ref;
      if (!t || t.isDisabled()) return;
      const e = t.container;
      e &&
        (this.refresh(),
        e.offsetHeight,
        e.removeAttribute(Yt),
        e.classList.remove(qt),
        (this.hidden = !1));
    }
    hide() {
      const t = this.ref,
        e = t && t.container;
      e &&
        (this.refresh(),
        e.offsetHeight,
        e.classList.add(qt),
        e.setAttribute(Yt, "true")),
        (this.hidden = !0);
    }
    refresh() {
      const t = this.ref;
      if (!t || !t.state) return;
      const e = t.container,
        i = (null == e ? void 0 : e.firstChild) || null;
      e &&
        i &&
        i.childNodes.length &&
        (e.style.maxHeight = `${i.getBoundingClientRect().height}px`);
    }
    attach() {
      const t = this,
        e = t.instance;
      e.state === lt.Init ? e.on("Carousel.init", t.onInit) : t.onInit(),
        e.on("resize", t.onResize),
        e.on("keydown", t.onKeydown);
    }
    detach() {
      var t;
      const e = this,
        i = e.instance;
      i.off("Carousel.init", e.onInit),
        i.off("resize", e.onResize),
        i.off("keydown", e.onKeydown),
        null === (t = i.carousel) ||
          void 0 === t ||
          t.detachPlugins(["Thumbs"]),
        (e.ref = null);
    }
  }
  Object.defineProperty(Vt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Xt,
  });
  const Zt = {
    panLeft: {
      icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
      change: { panX: -100 },
    },
    panRight: {
      icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
      change: { panX: 100 },
    },
    panUp: {
      icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
      change: { panY: -100 },
    },
    panDown: {
      icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
      change: { panY: 100 },
    },
    zoomIn: {
      icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
      action: "zoomIn",
    },
    zoomOut: {
      icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
      action: "zoomOut",
    },
    toggle1to1: {
      icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
      action: "toggleZoom",
    },
    toggleZoom: {
      icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
      action: "toggleZoom",
    },
    iterateZoom: {
      icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
      action: "iterateZoom",
    },
    rotateCCW: {
      icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
      action: "rotateCCW",
    },
    rotateCW: {
      icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
      action: "rotateCW",
    },
    flipX: {
      icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
      action: "flipX",
    },
    flipY: {
      icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
      action: "flipY",
    },
    fitX: {
      icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
      action: "fitX",
    },
    fitY: {
      icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
      action: "fitY",
    },
    reset: {
      icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
      action: "reset",
    },
    toggleFS: {
      icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
      action: "toggleFS",
    },
  };
  var Ut;
  !(function (t) {
    (t[(t.Init = 0)] = "Init"),
      (t[(t.Ready = 1)] = "Ready"),
      (t[(t.Disabled = 2)] = "Disabled");
  })(Ut || (Ut = {}));
  const Gt = {
      absolute: "auto",
      display: {
        left: ["infobar"],
        middle: [],
        right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"],
      },
      enabled: "auto",
      items: {
        infobar: {
          tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>',
        },
        download: {
          tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>',
        },
        prev: {
          tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>',
        },
        next: {
          tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>',
        },
        slideshow: {
          tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>',
        },
        fullscreen: {
          tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>',
        },
        thumbs: {
          tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>',
        },
        close: {
          tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>',
        },
      },
      parentEl: null,
    },
    Kt = {
      tabindex: "-1",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
    },
    Jt = "has-toolbar",
    Qt = "fancybox__toolbar";
  class te extends $ {
    constructor() {
      super(...arguments),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: Ut.Init,
        }),
        Object.defineProperty(this, "container", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        });
    }
    onReady(t) {
      var e;
      if (!t.carousel) return;
      let i = this.option("display"),
        n = this.option("absolute"),
        s = this.option("enabled");
      if ("auto" === s) {
        const t = this.instance.carousel;
        let e = 0;
        if (t)
          for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
        e || (s = !1);
      }
      s || (i = void 0);
      let o = 0;
      const a = { left: [], middle: [], right: [] };
      if (i)
        for (const t of ["left", "middle", "right"])
          for (const n of i[t]) {
            const i = this.createEl(n);
            i && (null === (e = a[t]) || void 0 === e || e.push(i), o++);
          }
      let r = null;
      if ((o && (r = this.createContainer()), r)) {
        for (const [t, e] of Object.entries(a)) {
          const i = document.createElement("div");
          C(i, Qt + "__column is-" + t);
          for (const t of e) i.appendChild(t);
          "auto" !== n || "middle" !== t || e.length || (n = !0),
            r.appendChild(i);
        }
        !0 === n && C(r, "is-absolute"),
          (this.state = Ut.Ready),
          this.onRefresh();
      } else this.state = Ut.Disabled;
    }
    onClick(t) {
      var e, i;
      const n = this.instance,
        s = n.getSlide(),
        o = null == s ? void 0 : s.panzoom,
        a = t.target,
        r = a && S(a) ? a.dataset : null;
      if (!r) return;
      if (void 0 !== r.fancyboxToggleThumbs)
        return (
          t.preventDefault(),
          t.stopPropagation(),
          void (null === (e = n.plugins.Thumbs) || void 0 === e || e.toggle())
        );
      if (void 0 !== r.fancyboxToggleFullscreen)
        return (
          t.preventDefault(),
          t.stopPropagation(),
          void this.instance.toggleFullscreen()
        );
      if (void 0 !== r.fancyboxToggleSlideshow) {
        t.preventDefault(), t.stopPropagation();
        const e =
          null === (i = n.carousel) || void 0 === i
            ? void 0
            : i.plugins.Autoplay;
        let s = e.isActive;
        return (
          o && "mousemove" === o.panMode && !s && o.reset(),
          void (s ? e.stop() : e.start())
        );
      }
      const l = r.panzoomAction,
        c = r.panzoomChange;
      if (((c || l) && (t.preventDefault(), t.stopPropagation()), c)) {
        let t = {};
        try {
          t = JSON.parse(c);
        } catch (t) {}
        o && o.applyChange(t);
      } else l && o && o[l] && o[l]();
    }
    onChange() {
      this.onRefresh();
    }
    onRefresh() {
      if (this.instance.isClosing()) return;
      const t = this.container;
      if (!t) return;
      const e = this.instance.getSlide();
      if (!e || e.state !== ct.Ready) return;
      const i = e && !e.error && e.panzoom;
      for (const e of t.querySelectorAll("[data-panzoom-action]"))
        i
          ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex"))
          : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      let n = i && i.canZoomIn(),
        s = i && i.canZoomOut();
      for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]'))
        n
          ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex"))
          : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]'))
        s
          ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex"))
          : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      for (const e of t.querySelectorAll(
        '[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]'
      )) {
        s || n
          ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex"))
          : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
        const t = e.querySelector("g");
        t && (t.style.display = n ? "" : "none");
      }
    }
    onDone(t, e) {
      var i;
      null === (i = e.panzoom) ||
        void 0 === i ||
        i.on("afterTransform", () => {
          this.instance.isCurrentSlide(e) && this.onRefresh();
        }),
        this.instance.isCurrentSlide(e) && this.onRefresh();
    }
    createContainer() {
      const t = this.instance.container;
      if (!t) return null;
      const e = this.option("parentEl") || t;
      let i = e.querySelector("." + Qt);
      return (
        i || ((i = document.createElement("div")), C(i, Qt), e.prepend(i)),
        i.addEventListener("click", this.onClick, { passive: !1, capture: !0 }),
        t && C(t, Jt),
        (this.container = i),
        i
      );
    }
    createEl(t) {
      const e = this.instance,
        i = e.carousel;
      if (!i) return null;
      if ("toggleFS" === t) return null;
      if ("fullscreen" === t && !at()) return null;
      let n = null;
      const o = i.slides.length || 0;
      let a = 0,
        r = 0;
      for (const t of i.slides)
        (t.panzoom || "image" === t.type) && a++,
          ("image" === t.type || t.downloadSrc) && r++;
      if (o < 2 && ["infobar", "prev", "next"].includes(t)) return n;
      if (void 0 !== Zt[t] && !a) return null;
      if ("download" === t && !r) return null;
      if ("thumbs" === t) {
        const t = e.plugins.Thumbs;
        if (!t || !t.isEnabled) return null;
      }
      if ("slideshow" === t) {
        if (!i.plugins.Autoplay || o < 2) return null;
      }
      if (void 0 !== Zt[t]) {
        const e = Zt[t];
        (n = document.createElement("button")),
          n.setAttribute(
            "title",
            this.instance.localize(`{{${t.toUpperCase()}}}`)
          ),
          C(n, "f-button"),
          e.action && (n.dataset.panzoomAction = e.action),
          e.change && (n.dataset.panzoomChange = JSON.stringify(e.change)),
          n.appendChild(s(this.instance.localize(e.icon)));
      } else {
        const e = (this.option("items") || [])[t];
        e &&
          ((n = s(this.instance.localize(e.tpl))),
          "function" == typeof e.click &&
            n.addEventListener("click", (t) => {
              t.preventDefault(),
                t.stopPropagation(),
                "function" == typeof e.click && e.click.call(this, this, t);
            }));
      }
      const l = null == n ? void 0 : n.querySelector("svg");
      if (l)
        for (const [t, e] of Object.entries(Kt))
          l.getAttribute(t) || l.setAttribute(t, String(e));
      return n;
    }
    removeContainer() {
      const t = this.container;
      t && t.remove(), (this.container = null), (this.state = Ut.Disabled);
      const e = this.instance.container;
      e && P(e, Jt);
    }
    attach() {
      const t = this,
        e = t.instance;
      e.on("Carousel.initSlides", t.onReady),
        e.on("done", t.onDone),
        e.on(["reveal", "Carousel.change"], t.onChange),
        t.onReady(t.instance);
    }
    detach() {
      const t = this,
        e = t.instance;
      e.off("Carousel.initSlides", t.onReady),
        e.off("done", t.onDone),
        e.off(["reveal", "Carousel.change"], t.onChange),
        t.removeContainer();
    }
  }
  Object.defineProperty(te, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Gt,
  });
  const ee = {
      Hash: class extends $ {
        onReady() {
          dt = !1;
        }
        onChange(t) {
          pt && clearTimeout(pt);
          const { hash: e } = ft(),
            { hash: i } = gt(),
            n = t.isOpeningSlide(t.getSlide());
          n && (ht = i === e ? "" : i),
            e &&
              e !== i &&
              (pt = setTimeout(() => {
                try {
                  if (t.state === lt.Ready) {
                    let t = "replaceState";
                    n && !ut && ((t = "pushState"), (ut = !0)),
                      window.history[t](
                        {},
                        document.title,
                        window.location.pathname + window.location.search + e
                      );
                  }
                } catch (t) {}
              }, 300));
        }
        onClose(t) {
          if ((pt && clearTimeout(pt), !dt && ut))
            return (ut = !1), (dt = !1), void window.history.back();
          if (!dt)
            try {
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname + window.location.search + (ht || "")
              );
            } catch (t) {}
        }
        attach() {
          const t = this.instance;
          t.on("ready", this.onReady),
            t.on(["Carousel.ready", "Carousel.change"], this.onChange),
            t.on("close", this.onClose);
        }
        detach() {
          const t = this.instance;
          t.off("ready", this.onReady),
            t.off(["Carousel.ready", "Carousel.change"], this.onChange),
            t.off("close", this.onClose);
        }
        static parseURL() {
          return gt();
        }
        static startFromUrl() {
          mt();
        }
        static destroy() {
          window.removeEventListener("hashchange", bt, !1);
        }
      },
      Html: zt,
      Images: xt,
      Slideshow: Ft,
      Thumbs: Vt,
      Toolbar: te,
    },
    ie = "with-fancybox",
    ne = "hide-scrollbar",
    se = "--fancybox-scrollbar-compensate",
    oe = "--fancybox-body-margin",
    ae = "aria-hidden",
    re = "is-using-tab",
    le = "is-animated",
    ce = "is-compact",
    he = "is-loading",
    de = "is-opening",
    ue = "has-caption",
    pe = "disabled",
    fe = "tabindex",
    ge = "download",
    me = "href",
    ve = "src",
    be = (t) => "string" == typeof t,
    ye = function () {
      var t = window.getSelection();
      return !!t && "Range" === t.type;
    };
  let we,
    xe = null,
    Ee = null,
    Se = 0,
    Pe = 0,
    Ce = 0,
    Te = 0;
  const Me = new Map();
  let Oe = 0;
  class Ae extends m {
    get isIdle() {
      return this.idle;
    }
    get isCompact() {
      return this.option("compact");
    }
    constructor(t = [], e = {}, i = {}) {
      super(e),
        Object.defineProperty(this, "userSlides", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: [],
        }),
        Object.defineProperty(this, "userPlugins", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: {},
        }),
        Object.defineProperty(this, "idle", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "idleTimer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "clickTimer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "pwt", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "ignoreFocusChange", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "startedFs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: !1,
        }),
        Object.defineProperty(this, "state", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: lt.Init,
        }),
        Object.defineProperty(this, "id", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 0,
        }),
        Object.defineProperty(this, "container", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "caption", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "footer", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "carousel", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "lastFocus", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: null,
        }),
        Object.defineProperty(this, "prevMouseMoveEvent", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        we || (we = at()),
        (this.id = e.id || ++Oe),
        Me.set(this.id, this),
        (this.userSlides = t),
        (this.userPlugins = i),
        queueMicrotask(() => {
          this.init();
        });
    }
    init() {
      if (this.state === lt.Destroy) return;
      (this.state = lt.Init),
        this.attachPlugins(
          Object.assign(Object.assign({}, Ae.Plugins), this.userPlugins)
        ),
        this.emit("init"),
        this.emit("attachPlugins"),
        !0 === this.option("hideScrollbar") &&
          (() => {
            if (!it) return;
            const t = document,
              e = t.body,
              i = t.documentElement;
            if (e.classList.contains(ne)) return;
            let n = window.innerWidth - i.getBoundingClientRect().width;
            const s = parseFloat(window.getComputedStyle(e).marginRight);
            n < 0 && (n = 0),
              i.style.setProperty(se, `${n}px`),
              s && e.style.setProperty(oe, `${s}px`),
              e.classList.add(ne);
          })(),
        this.initLayout(),
        this.scale();
      const t = () => {
        this.initCarousel(this.userSlides),
          (this.state = lt.Ready),
          this.attachEvents(),
          this.emit("ready"),
          setTimeout(() => {
            this.container && this.container.setAttribute(ae, "false");
          }, 16);
      };
      this.option("Fullscreen.autoStart") && we && !we.isFullscreen()
        ? we
            .request()
            .then(() => {
              (this.startedFs = !0), t();
            })
            .catch(() => t())
        : t();
    }
    initLayout() {
      var t, e;
      const i = this.option("parentEl") || document.body,
        n = s(this.localize(this.option("tpl.main") || ""));
      if (n) {
        if (
          (n.setAttribute("id", `fancybox-${this.id}`),
          n.setAttribute("aria-label", this.localize("{{MODAL}}")),
          n.classList.toggle(ce, this.isCompact),
          C(n, this.option("mainClass") || ""),
          C(n, de),
          (this.container = n),
          (this.footer = n.querySelector(".fancybox__footer")),
          i.appendChild(n),
          C(document.documentElement, ie),
          (xe && Ee) ||
            ((xe = document.createElement("span")),
            C(xe, "fancybox-focus-guard"),
            xe.setAttribute(fe, "0"),
            xe.setAttribute(ae, "true"),
            xe.setAttribute("aria-label", "Focus guard"),
            (Ee = xe.cloneNode()),
            null === (t = n.parentElement) ||
              void 0 === t ||
              t.insertBefore(xe, n),
            null === (e = n.parentElement) || void 0 === e || e.append(Ee)),
          n.addEventListener("mousedown", (t) => {
            (Se = t.pageX), (Pe = t.pageY), P(n, re);
          }),
          this.option("closeExisting"))
        )
          for (const t of Me.values()) t.id !== this.id && t.close();
        else
          this.option("animated") &&
            (C(n, le),
            setTimeout(() => {
              this.isClosing() || P(n, le);
            }, 350));
        this.emit("initLayout");
      }
    }
    initCarousel(t) {
      const e = this.container;
      if (!e) return;
      const n = e.querySelector(".fancybox__carousel");
      if (!n) return;
      const s = (this.carousel = new tt(
        n,
        p(
          {},
          {
            slides: t,
            transition: "fade",
            Panzoom: {
              lockAxis: this.option("dragToClose") ? "xy" : "x",
              infinite: !!this.option("dragToClose") && "y",
            },
            Dots: !1,
            Navigation: {
              classes: {
                container: "fancybox__nav",
                button: "f-button",
                isNext: "is-next",
                isPrev: "is-prev",
              },
            },
            initialPage: this.option("startIndex"),
            l10n: this.option("l10n"),
          },
          this.option("Carousel") || {}
        )
      ));
      s.on("*", (t, e, ...i) => {
        this.emit(`Carousel.${e}`, t, ...i);
      }),
        s.on(["ready", "change"], () => {
          this.manageCaption();
        }),
        this.on("Carousel.removeSlide", (t, e, i) => {
          this.clearContent(i), (i.state = void 0);
        }),
        s.on("Panzoom.touchStart", () => {
          var t, e;
          this.isCompact || this.endIdle(),
            (null === (t = document.activeElement) || void 0 === t
              ? void 0
              : t.closest(".f-thumbs")) &&
              (null === (e = this.container) || void 0 === e || e.focus());
        }),
        s.on("settle", () => {
          this.idleTimer ||
            this.isCompact ||
            !this.option("idle") ||
            this.setIdle(),
            this.option("autoFocus") && !this.isClosing && this.checkFocus();
        }),
        this.option("dragToClose") &&
          (s.on("Panzoom.afterTransform", (t, e) => {
            const n = this.getSlide();
            if (n && i(n.el)) return;
            const s = this.container;
            if (s) {
              const t = Math.abs(e.current.f),
                i =
                  t < 1
                    ? ""
                    : Math.max(
                        0.5,
                        Math.min(1, 1 - (t / e.contentRect.fitHeight) * 1.5)
                      );
              s.style.setProperty("--fancybox-ts", i ? "0s" : ""),
                s.style.setProperty("--fancybox-opacity", i + "");
            }
          }),
          s.on("Panzoom.touchEnd", (t, e, n) => {
            var s;
            const o = this.getSlide();
            if (o && i(o.el)) return;
            if (
              e.isMobile &&
              document.activeElement &&
              -1 !==
                ["TEXTAREA", "INPUT"].indexOf(
                  null === (s = document.activeElement) || void 0 === s
                    ? void 0
                    : s.nodeName
                )
            )
              return;
            const a = Math.abs(e.dragOffset.y);
            "y" === e.lockedAxis &&
              (a >= 200 || (a >= 50 && e.dragOffset.time < 300)) &&
              (n && n.cancelable && n.preventDefault(),
              this.close(n, "f-throwOut" + (e.current.f < 0 ? "Up" : "Down")));
          })),
        s.on("change", (t) => {
          var e;
          let i =
            null === (e = this.getSlide()) || void 0 === e
              ? void 0
              : e.triggerEl;
          if (i) {
            const e = new CustomEvent("slideTo", {
              bubbles: !0,
              cancelable: !0,
              detail: t.page,
            });
            i.dispatchEvent(e);
          }
        }),
        s.on(["refresh", "change"], (t) => {
          const e = this.container;
          if (!e) return;
          for (const i of e.querySelectorAll("[data-fancybox-current-index]"))
            i.innerHTML = t.page + 1;
          for (const i of e.querySelectorAll("[data-fancybox-count]"))
            i.innerHTML = t.pages.length;
          if (!t.isInfinite) {
            for (const i of e.querySelectorAll("[data-fancybox-next]"))
              t.page < t.pages.length - 1
                ? (i.removeAttribute(pe), i.removeAttribute(fe))
                : (i.setAttribute(pe, ""), i.setAttribute(fe, "-1"));
            for (const i of e.querySelectorAll("[data-fancybox-prev]"))
              t.page > 0
                ? (i.removeAttribute(pe), i.removeAttribute(fe))
                : (i.setAttribute(pe, ""), i.setAttribute(fe, "-1"));
          }
          const i = this.getSlide();
          if (!i) return;
          let n = i.downloadSrc || "";
          n || "image" !== i.type || i.error || !be(i[ve]) || (n = i[ve]);
          for (const t of e.querySelectorAll("[data-fancybox-download]")) {
            const e = i.downloadFilename;
            n
              ? (t.removeAttribute(pe),
                t.removeAttribute(fe),
                t.setAttribute(me, n),
                t.setAttribute(ge, e || n),
                t.setAttribute("target", "_blank"))
              : (t.setAttribute(pe, ""),
                t.setAttribute(fe, "-1"),
                t.removeAttribute(me),
                t.removeAttribute(ge));
          }
        }),
        this.emit("initCarousel");
    }
    attachEvents() {
      const t = this,
        e = t.container;
      if (!e) return;
      e.addEventListener("click", t.onClick, { passive: !1, capture: !1 }),
        e.addEventListener("wheel", t.onWheel, { passive: !1, capture: !1 }),
        document.addEventListener("keydown", t.onKeydown, {
          passive: !1,
          capture: !0,
        }),
        document.addEventListener("visibilitychange", t.onVisibilityChange, !1),
        document.addEventListener("mousemove", t.onMousemove),
        t.option("trapFocus") &&
          document.addEventListener("focus", t.onFocus, !0),
        window.addEventListener("resize", t.onResize);
      const i = window.visualViewport;
      i &&
        (i.addEventListener("scroll", t.onResize),
        i.addEventListener("resize", t.onResize));
    }
    detachEvents() {
      const t = this,
        e = t.container;
      if (!e) return;
      document.removeEventListener("keydown", t.onKeydown, {
        passive: !1,
        capture: !0,
      }),
        e.removeEventListener("wheel", t.onWheel, { passive: !1, capture: !1 }),
        e.removeEventListener("click", t.onClick, { passive: !1, capture: !1 }),
        document.removeEventListener("mousemove", t.onMousemove),
        window.removeEventListener("resize", t.onResize);
      const i = window.visualViewport;
      i &&
        (i.removeEventListener("resize", t.onResize),
        i.removeEventListener("scroll", t.onResize)),
        document.removeEventListener(
          "visibilitychange",
          t.onVisibilityChange,
          !1
        ),
        document.removeEventListener("focus", t.onFocus, !0);
    }
    scale() {
      const t = this.container;
      if (!t) return;
      const e = window.visualViewport,
        i = Math.max(1, (null == e ? void 0 : e.scale) || 1);
      let n = "",
        s = "",
        o = "";
      if (e && i > 1) {
        let t = `${e.offsetLeft}px`,
          a = `${e.offsetTop}px`;
        (n = e.width * i + "px"),
          (s = e.height * i + "px"),
          (o = `translate3d(${t}, ${a}, 0) scale(${1 / i})`);
      }
      (t.style.transform = o), (t.style.width = n), (t.style.height = s);
    }
    onClick(t) {
      var e;
      const { container: i, isCompact: n } = this;
      if (!i || this.isClosing()) return;
      !n && this.option("idle") && this.resetIdle();
      const s = t.composedPath()[0];
      if (s.closest(".fancybox-spinner") || s.closest("[data-fancybox-close]"))
        return t.preventDefault(), void this.close(t);
      if (s.closest("[data-fancybox-prev]"))
        return t.preventDefault(), void this.prev();
      if (s.closest("[data-fancybox-next]"))
        return t.preventDefault(), void this.next();
      if ("click" === t.type && 0 === t.detail) return;
      if (Math.abs(t.pageX - Se) > 30 || Math.abs(t.pageY - Pe) > 30) return;
      const o = document.activeElement;
      if (ye() && o && i.contains(o)) return;
      if (
        n &&
        "image" ===
          (null === (e = this.getSlide()) || void 0 === e ? void 0 : e.type)
      )
        return void (this.clickTimer
          ? (clearTimeout(this.clickTimer), (this.clickTimer = null))
          : (this.clickTimer = setTimeout(() => {
              this.toggleIdle(), (this.clickTimer = null);
            }, 350)));
      if ((this.emit("click", t), t.defaultPrevented)) return;
      let a = !1;
      if (s.closest(".fancybox__content")) {
        if (o) {
          if (o.closest("[contenteditable]")) return;
          s.matches(st) || o.blur();
        }
        if (ye()) return;
        a = this.option("contentClick");
      } else s.closest(".fancybox__carousel") && !s.matches(st) && (a = this.option("backdropClick"));
      "close" === a
        ? (t.preventDefault(), this.close(t))
        : "next" === a
        ? (t.preventDefault(), this.next())
        : "prev" === a && (t.preventDefault(), this.prev());
    }
    onWheel(t) {
      const e = t.target;
      let i = this.option("wheel", t);
      e.closest(".fancybox__thumbs") && (i = "slide");
      const s = "slide" === i,
        o = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (
          t,
          e
        ) {
          return Math.abs(e) > Math.abs(t) ? e : t;
        }),
        a = Math.max(-1, Math.min(1, o)),
        r = Date.now();
      this.pwt && r - this.pwt < 300
        ? s && t.preventDefault()
        : ((this.pwt = r),
          this.emit("wheel", t, a),
          t.defaultPrevented ||
            ("close" === i
              ? (t.preventDefault(), this.close(t))
              : "slide" === i &&
                (n(e) ||
                  (t.preventDefault(), this[a > 0 ? "prev" : "next"]()))));
    }
    onScroll() {
      window.scrollTo(Ce, Te);
    }
    onKeydown(t) {
      if (!this.isTopmost()) return;
      this.isCompact ||
        !this.option("idle") ||
        this.isClosing() ||
        this.resetIdle();
      const e = t.key,
        i = this.option("keyboard");
      if (!i) return;
      const n = t.composedPath()[0],
        s = document.activeElement && document.activeElement.classList,
        o =
          (s && s.contains("f-button")) ||
          n.dataset.carouselPage ||
          n.dataset.carouselIndex;
      if ("Escape" !== e && !o && S(n)) {
        if (
          n.isContentEditable ||
          -1 !==
            ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(
              n.nodeName
            )
        )
          return;
      }
      if (
        ("Tab" === t.key ? C(this.container, re) : P(this.container, re),
        t.ctrlKey || t.altKey || t.shiftKey)
      )
        return;
      this.emit("keydown", e, t);
      const a = i[e];
      a && "function" == typeof this[a] && (t.preventDefault(), this[a]());
    }
    onResize() {
      const t = this.container;
      if (!t) return;
      const e = this.isCompact;
      t.classList.toggle(ce, e),
        this.manageCaption(this.getSlide()),
        this.isCompact ? this.clearIdle() : this.endIdle(),
        this.scale(),
        this.emit("resize");
    }
    onFocus(t) {
      this.isTopmost() && this.checkFocus(t);
    }
    onMousemove(t) {
      (this.prevMouseMoveEvent = t),
        !this.isCompact && this.option("idle") && this.resetIdle();
    }
    onVisibilityChange() {
      "visible" === document.visibilityState
        ? this.checkFocus()
        : this.endIdle();
    }
    manageCloseBtn(t) {
      const e = this.optionFor(t, "closeButton") || !1;
      if ("auto" === e) {
        const t = this.plugins.Toolbar;
        if (t && t.state === Ut.Ready) return;
      }
      if (!e) return;
      if (!t.contentEl || t.closeBtnEl) return;
      const i = this.option("tpl.closeButton");
      if (i) {
        const e = s(this.localize(i));
        (t.closeBtnEl = t.contentEl.appendChild(e)),
          t.el && C(t.el, "has-close-btn");
      }
    }
    manageCaption(t = void 0) {
      var e, i;
      const n = "fancybox__caption",
        s = this.container;
      if (!s) return;
      P(s, ue);
      const o = this.isCompact || this.option("commonCaption"),
        a = !o;
      if (
        (this.caption && this.stop(this.caption),
        a && this.caption && (this.caption.remove(), (this.caption = null)),
        o && !this.caption)
      )
        for (const t of (null === (e = this.carousel) || void 0 === e
          ? void 0
          : e.slides) || [])
          t.captionEl &&
            (t.captionEl.remove(),
            (t.captionEl = void 0),
            P(t.el, ue),
            null === (i = t.el) ||
              void 0 === i ||
              i.removeAttribute("aria-labelledby"));
      if ((t || (t = this.getSlide()), !t || (o && !this.isCurrentSlide(t))))
        return;
      const r = t.el;
      let l = this.optionFor(t, "caption", "");
      if (!l)
        return void (
          o &&
          this.caption &&
          this.animate(this.caption, "f-fadeOut", () => {
            this.caption && (this.caption.innerHTML = "");
          })
        );
      let c = null;
      if (a) {
        if (((c = t.captionEl || null), r && !c)) {
          const e = n + `_${this.id}_${t.index}`;
          (c = document.createElement("div")),
            C(c, n),
            c.setAttribute("id", e),
            (t.captionEl = r.appendChild(c)),
            C(r, ue),
            r.setAttribute("aria-labelledby", e);
        }
      } else {
        if (((c = this.caption), c || (c = s.querySelector("." + n)), !c)) {
          (c = document.createElement("div")),
            (c.dataset.fancyboxCaption = ""),
            C(c, n);
          (this.footer || s).prepend(c);
        }
        C(s, ue), (this.caption = c);
      }
      c &&
        ((c.innerHTML = ""),
        be(l) || "number" == typeof l
          ? (c.innerHTML = l + "")
          : l instanceof HTMLElement && c.appendChild(l));
    }
    checkFocus(t) {
      this.focus(t);
    }
    focus(t) {
      var e;
      if (this.ignoreFocusChange) return;
      const i = document.activeElement || null,
        n = (null == t ? void 0 : t.target) || null,
        s = this.container,
        o = null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport;
      if (!s || !o) return;
      if (!t && i && s.contains(i)) return;
      const a = this.getSlide(),
        r = a && a.state === ct.Ready ? a.el : null;
      if (!r || r.contains(i) || s === i) return;
      t && t.cancelable && t.preventDefault(), (this.ignoreFocusChange = !0);
      const l = Array.from(s.querySelectorAll(st));
      let c = [],
        h = null;
      for (let t of l) {
        const e = !t.offsetParent || !!t.closest('[aria-hidden="true"]'),
          i = r && r.contains(t),
          n = !o.contains(t);
        if (t === s || ((i || n) && !e)) {
          c.push(t);
          const e = t.dataset.origTabindex;
          void 0 !== e && e && (t.tabIndex = parseFloat(e)),
            t.removeAttribute("data-orig-tabindex"),
            (!t.hasAttribute("autoFocus") && h) || (h = t);
        } else {
          const e =
            void 0 === t.dataset.origTabindex
              ? t.getAttribute("tabindex") || ""
              : t.dataset.origTabindex;
          e && (t.dataset.origTabindex = e), (t.tabIndex = -1);
        }
      }
      let d = null;
      t
        ? (!n || c.indexOf(n) < 0) &&
          ((d = h || s),
          c.length &&
            (i === Ee
              ? (d = c[0])
              : (this.lastFocus !== s && i !== xe) || (d = c[c.length - 1])))
        : (d = a && "image" === a.type ? s : h || s),
        d && ot(d),
        (this.lastFocus = document.activeElement),
        (this.ignoreFocusChange = !1);
    }
    next() {
      const t = this.carousel;
      t && t.pages.length > 1 && t.slideNext();
    }
    prev() {
      const t = this.carousel;
      t && t.pages.length > 1 && t.slidePrev();
    }
    jumpTo(...t) {
      this.carousel && this.carousel.slideTo(...t);
    }
    isTopmost() {
      var t;
      return (
        (null === (t = Ae.getInstance()) || void 0 === t ? void 0 : t.id) ==
        this.id
      );
    }
    animate(t = null, e = "", i) {
      if (!t || !e) return void (i && i());
      this.stop(t);
      const n = (s) => {
        s.target === t &&
          t.dataset.animationName &&
          (t.removeEventListener("animationend", n),
          delete t.dataset.animationName,
          i && i(),
          P(t, e));
      };
      (t.dataset.animationName = e),
        t.addEventListener("animationend", n),
        C(t, e);
    }
    stop(t) {
      t &&
        t.dispatchEvent(
          new CustomEvent("animationend", {
            bubbles: !1,
            cancelable: !0,
            currentTarget: t,
          })
        );
    }
    setContent(t, e = "", i = !0) {
      if (this.isClosing()) return;
      const n = t.el;
      if (!n) return;
      let o = null;
      if (
        (S(e)
          ? (o = e)
          : ((o = s(e + "")),
            S(o) ||
              ((o = document.createElement("div")), (o.innerHTML = e + ""))),
        ["img", "picture", "iframe", "video", "audio"].includes(
          o.nodeName.toLowerCase()
        ))
      ) {
        const t = document.createElement("div");
        t.appendChild(o), (o = t);
      }
      S(o) && t.filter && !t.error && (o = o.querySelector(t.filter)),
        o && S(o)
          ? (C(o, "fancybox__content"),
            t.id && o.setAttribute("id", t.id),
            n.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`),
            n.prepend(o),
            "none" === o.style.display && (o.style.display = ""),
            "none" === getComputedStyle(o).getPropertyValue("display") &&
              (o.style.display =
                t.display || this.option("defaultDisplay") || "flex"),
            (t.contentEl = o),
            i && this.revealContent(t),
            this.manageCloseBtn(t),
            this.manageCaption(t))
          : this.setError(t, "{{ELEMENT_NOT_FOUND}}");
    }
    revealContent(t, e) {
      const i = t.el,
        n = t.contentEl;
      i &&
        n &&
        (this.emit("reveal", t),
        this.hideLoading(t),
        (t.state = ct.Opening),
        (e = this.isOpeningSlide(t)
          ? void 0 === e
            ? this.optionFor(t, "showClass")
            : e
          : "f-fadeIn")
          ? this.animate(n, e, () => {
              this.done(t);
            })
          : this.done(t));
    }
    done(t) {
      this.isClosing() ||
        ((t.state = ct.Ready),
        this.emit("done", t),
        C(t.el, "is-done"),
        this.isCurrentSlide(t) &&
          this.option("autoFocus") &&
          queueMicrotask(() => {
            var e;
            null === (e = t.panzoom) || void 0 === e || e.updateControls(),
              this.option("autoFocus") && this.focus();
          }),
        this.isOpeningSlide(t) &&
          (P(this.container, de),
          !this.isCompact && this.option("idle") && this.setIdle()));
    }
    isCurrentSlide(t) {
      const e = this.getSlide();
      return !(!t || !e) && e.index === t.index;
    }
    isOpeningSlide(t) {
      var e, i;
      return (
        null ===
          (null === (e = this.carousel) || void 0 === e
            ? void 0
            : e.prevPage) &&
        t &&
        t.index ===
          (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index)
      );
    }
    showLoading(t) {
      t.state = ct.Loading;
      const e = t.el;
      if (!e) return;
      C(e, he),
        this.emit("loading", t),
        t.spinnerEl ||
          setTimeout(() => {
            if (!this.isClosing() && !t.spinnerEl && t.state === ct.Loading) {
              let i = s(E);
              C(i, "fancybox-spinner"),
                (t.spinnerEl = i),
                e.prepend(i),
                this.animate(i, "f-fadeIn");
            }
          }, 250);
    }
    hideLoading(t) {
      const e = t.el;
      if (!e) return;
      const i = t.spinnerEl;
      this.isClosing()
        ? null == i || i.remove()
        : (P(e, he),
          i &&
            this.animate(i, "f-fadeOut", () => {
              i.remove();
            }),
          t.state === ct.Loading &&
            (this.emit("loaded", t), (t.state = ct.Ready)));
    }
    setError(t, e) {
      if (this.isClosing()) return;
      const i = new Event("error", { bubbles: !0, cancelable: !0 });
      if ((this.emit("error", i, t), i.defaultPrevented)) return;
      (t.error = e), this.hideLoading(t), this.clearContent(t);
      const n = document.createElement("div");
      n.classList.add("fancybox-error"),
        (n.innerHTML = this.localize(e || "<p>{{ERROR}}</p>")),
        this.setContent(t, n);
    }
    clearContent(t) {
      if (void 0 === t.state) return;
      this.emit("clearContent", t),
        t.contentEl && (t.contentEl.remove(), (t.contentEl = void 0));
      const e = t.el;
      e &&
        (P(e, "has-error"),
        P(e, "has-unknown"),
        P(e, `has-${t.type || "unknown"}`)),
        t.closeBtnEl && t.closeBtnEl.remove(),
        (t.closeBtnEl = void 0),
        t.captionEl && t.captionEl.remove(),
        (t.captionEl = void 0),
        t.spinnerEl && t.spinnerEl.remove(),
        (t.spinnerEl = void 0);
    }
    getSlide() {
      var t;
      const e = this.carousel;
      return (
        (null ===
          (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) ||
        void 0 === t
          ? void 0
          : t.slides[0]) || void 0
      );
    }
    close(t, e) {
      if (this.isClosing()) return;
      const i = new Event("shouldClose", { bubbles: !0, cancelable: !0 });
      if ((this.emit("shouldClose", i, t), i.defaultPrevented)) return;
      t && t.cancelable && (t.preventDefault(), t.stopPropagation());
      const n = () => {
        this.proceedClose(t, e);
      };
      this.startedFs && we && we.isFullscreen()
        ? Promise.resolve(we.exit()).then(() => n())
        : n();
    }
    clearIdle() {
      this.idleTimer && clearTimeout(this.idleTimer), (this.idleTimer = null);
    }
    setIdle(t = !1) {
      const e = () => {
        this.clearIdle(),
          (this.idle = !0),
          C(this.container, "is-idle"),
          this.emit("setIdle");
      };
      if ((this.clearIdle(), !this.isClosing()))
        if (t) e();
        else {
          const t = this.option("idle");
          t && (this.idleTimer = setTimeout(e, t));
        }
    }
    endIdle() {
      this.clearIdle(),
        this.idle &&
          !this.isClosing() &&
          ((this.idle = !1),
          P(this.container, "is-idle"),
          this.emit("endIdle"));
    }
    resetIdle() {
      this.endIdle(), this.setIdle();
    }
    toggleIdle() {
      this.idle ? this.endIdle() : this.setIdle(!0);
    }
    toggleFullscreen() {
      we &&
        (we.isFullscreen()
          ? we.exit()
          : we.request().then(() => {
              this.startedFs = !0;
            }));
    }
    isClosing() {
      return [lt.Closing, lt.CustomClosing, lt.Destroy].includes(this.state);
    }
    proceedClose(t, e) {
      var i, n;
      (this.state = lt.Closing), this.clearIdle(), this.detachEvents();
      const s = this.container,
        o = this.carousel,
        a = this.getSlide(),
        r =
          a && this.option("placeFocusBack")
            ? a.triggerEl || this.option("triggerEl")
            : null;
      if (
        (r && (et(r) ? ot(r) : r.focus()),
        s &&
          (P(s, de),
          C(s, "is-closing"),
          s.setAttribute(ae, "true"),
          this.option("animated") && C(s, le),
          (s.style.pointerEvents = "none")),
        o)
      ) {
        o.clearTransitions(),
          null === (i = o.panzoom) || void 0 === i || i.destroy(),
          null === (n = o.plugins.Navigation) || void 0 === n || n.detach();
        for (const t of o.slides) {
          (t.state = ct.Closing), this.hideLoading(t);
          const e = t.contentEl;
          e && this.stop(e);
          const i = null == t ? void 0 : t.panzoom;
          i && (i.stop(), i.detachEvents(), i.detachObserver()),
            this.isCurrentSlide(t) || o.emit("removeSlide", t);
        }
      }
      (Ce = window.scrollX),
        (Te = window.scrollY),
        window.addEventListener("scroll", this.onScroll),
        this.emit("close", t),
        this.state !== lt.CustomClosing
          ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")),
            e && a
              ? (this.animate(a.contentEl, e, () => {
                  o && o.emit("removeSlide", a);
                }),
                setTimeout(() => {
                  this.destroy();
                }, 500))
              : this.destroy())
          : setTimeout(() => {
              this.destroy();
            }, 500);
    }
    destroy() {
      var t;
      if (this.state === lt.Destroy) return;
      window.removeEventListener("scroll", this.onScroll),
        (this.state = lt.Destroy),
        null === (t = this.carousel) || void 0 === t || t.destroy();
      const e = this.container;
      e && e.remove(), Me.delete(this.id);
      const i = Ae.getInstance();
      i
        ? i.focus()
        : (xe && (xe.remove(), (xe = null)),
          Ee && (Ee.remove(), (Ee = null)),
          P(document.documentElement, ie),
          (() => {
            if (!it) return;
            const t = document,
              e = t.body;
            e.classList.remove(ne),
              e.style.setProperty(oe, ""),
              t.documentElement.style.setProperty(se, "");
          })(),
          this.emit("destroy"));
    }
    static bind(t, e, i) {
      if (!it) return;
      let n,
        s = "",
        o = {};
      if (
        (void 0 === t
          ? (n = document.body)
          : be(t)
          ? ((n = document.body),
            (s = t),
            "object" == typeof e && (o = e || {}))
          : ((n = t), be(e) && (s = e), "object" == typeof i && (o = i || {})),
        !n || !S(n))
      )
        return;
      s = s || "[data-fancybox]";
      const a = Ae.openers.get(n) || new Map();
      a.set(s, o),
        Ae.openers.set(n, a),
        1 === a.size && n.addEventListener("click", Ae.fromEvent);
    }
    static unbind(t, e) {
      let i,
        n = "";
      if (
        (be(t) ? ((i = document.body), (n = t)) : ((i = t), be(e) && (n = e)),
        !i)
      )
        return;
      const s = Ae.openers.get(i);
      s && n && s.delete(n),
        (n && s) ||
          (Ae.openers.delete(i), i.removeEventListener("click", Ae.fromEvent));
    }
    static destroy() {
      let t;
      for (; (t = Ae.getInstance()); ) t.destroy();
      for (const t of Ae.openers.keys())
        t.removeEventListener("click", Ae.fromEvent);
      Ae.openers = new Map();
    }
    static fromEvent(t) {
      if (t.defaultPrevented) return;
      if (t.button && 0 !== t.button) return;
      if (t.ctrlKey || t.metaKey || t.shiftKey) return;
      let e = t.composedPath()[0];
      const i = e.closest("[data-fancybox-trigger]");
      if (i) {
        const t = i.dataset.fancyboxTrigger || "",
          n = document.querySelectorAll(`[data-fancybox="${t}"]`),
          s = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
        e = n[s] || e;
      }
      if (!(e && e instanceof Element)) return;
      let n, s, o, a;
      if (
        ([...Ae.openers].reverse().find(
          ([t, i]) =>
            !(
              !t.contains(e) ||
              ![...i].reverse().find(([i, r]) => {
                let l = e.closest(i);
                return !!l && ((n = t), (s = i), (o = l), (a = r), !0);
              })
            )
        ),
        !n || !s || !o)
      )
        return;
      (a = a || {}), t.preventDefault(), (e = o);
      let r = [],
        l = p({}, rt, a);
      (l.event = t), (l.triggerEl = e), (l.delegate = i);
      const c = l.groupAll,
        h = l.groupAttr,
        d = h && e ? e.getAttribute(`${h}`) : "";
      if (
        ((!e || d || c) && (r = [].slice.call(n.querySelectorAll(s))),
        e &&
          !c &&
          (r = d ? r.filter((t) => t.getAttribute(`${h}`) === d) : [e]),
        !r.length)
      )
        return;
      const u = Ae.getInstance();
      return u && u.options.triggerEl && r.indexOf(u.options.triggerEl) > -1
        ? void 0
        : (e && (l.startIndex = r.indexOf(e)), Ae.fromNodes(r, l));
    }
    static fromSelector(t, e, i) {
      let n = null,
        s = "",
        o = {};
      if (
        (be(t)
          ? ((n = document.body),
            (s = t),
            "object" == typeof e && (o = e || {}))
          : t instanceof HTMLElement &&
            be(e) &&
            ((n = t), (s = e), "object" == typeof i && (o = i || {})),
        !n || !s)
      )
        return !1;
      const a = Ae.openers.get(n);
      return (
        !!a &&
        ((o = p({}, a.get(s) || {}, o)),
        !!o && Ae.fromNodes(Array.from(n.querySelectorAll(s)), o))
      );
    }
    static fromNodes(t, e) {
      e = p({}, rt, e || {});
      const i = [];
      for (const n of t) {
        const t = n.dataset || {},
          s =
            t[ve] ||
            n.getAttribute(me) ||
            n.getAttribute("currentSrc") ||
            n.getAttribute(ve) ||
            void 0;
        let o;
        const a = e.delegate;
        let r;
        a &&
          i.length === e.startIndex &&
          (o =
            a instanceof HTMLImageElement
              ? a
              : a.querySelector("img:not([aria-hidden])")),
          o ||
            (o =
              n instanceof HTMLImageElement
                ? n
                : n.querySelector("img:not([aria-hidden])")),
          o &&
            ((r = o.currentSrc || o[ve] || void 0),
            !r &&
              o.dataset &&
              (r = o.dataset.lazySrc || o.dataset[ve] || void 0));
        const l = {
          src: s,
          triggerEl: n,
          thumbEl: o,
          thumbElSrc: r,
          thumbSrc: r,
        };
        for (const e in t) {
          let i = t[e] + "";
          (i = "false" !== i && ("true" === i || i)), (l[e] = i);
        }
        i.push(l);
      }
      return new Ae(i, e);
    }
    static getInstance(t) {
      if (t) return Me.get(t);
      return (
        Array.from(Me.values())
          .reverse()
          .find((t) => !t.isClosing() && t) || null
      );
    }
    static getSlide() {
      var t;
      return (
        (null === (t = Ae.getInstance()) || void 0 === t
          ? void 0
          : t.getSlide()) || null
      );
    }
    static show(t = [], e = {}) {
      return new Ae(t, e);
    }
    static next() {
      const t = Ae.getInstance();
      t && t.next();
    }
    static prev() {
      const t = Ae.getInstance();
      t && t.prev();
    }
    static close(t = !0, ...e) {
      if (t) for (const t of Me.values()) t.close(...e);
      else {
        const t = Ae.getInstance();
        t && t.close(...e);
      }
    }
  }
  Object.defineProperty(Ae, "version", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: "5.0.36",
  }),
    Object.defineProperty(Ae, "defaults", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: rt,
    }),
    Object.defineProperty(Ae, "Plugins", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ee,
    }),
    Object.defineProperty(Ae, "openers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Map(),
    }),
    (t.Carousel = tt),
    (t.Fancybox = Ae),
    (t.Panzoom = D);
});

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, h) {
          var u = a.data(h, i);
          if (!u)
            return void s(
              i + " not initialized. Cannot call methods, i.e. " + r
            );
          var d = u[e];
          if (!d || "_" == e.charAt(0))
            return void s(r + " is not a valid method");
          var l = d.apply(u, n);
          o = void 0 === o ? l : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      "undefined" == typeof r
        ? function () {}
        : function (t) {
            r.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || {});
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], o = 0;
            o < i.length;
            o++
          ) {
            var r = i[o],
              s = n && n[r];
            s && (this.off(t, r), delete n[r]), r.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (s = 200 == Math.round(t(o.width))),
          (r.isBoxSizeOuter = s),
          i.removeChild(e);
      }
    }
    function r(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var r = n(e);
        if ("none" == r.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == r.boxSizing), l = 0;
          u > l;
          l++
        ) {
          var c = h[l],
            f = r[c],
            m = parseFloat(f);
          a[c] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          z = a.borderTopWidth + a.borderBottomWidth,
          E = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (E ? 0 : p + _));
        var x = t(r.height);
        return (
          x !== !1 && (a.height = x + (E ? 0 : g + z)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + z)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var s,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      u = h.length,
      d = !1;
    return r;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var n = Array.prototype.slice;
    (i.makeArray = function (t) {
      if (Array.isArray(t)) return t;
      if (null === t || void 0 === t) return [];
      var e = "object" == typeof t && "number" == typeof t.length;
      return e ? n.call(t) : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                o.push(i[r]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var o = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var r = i.toDashed(n),
            s = "data-" + r,
            a = document.querySelectorAll("[" + s + "]"),
            h = document.querySelectorAll(".js-" + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + "-options",
            l = t.jQuery;
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d);
            try {
              i = r && JSON.parse(r);
            } catch (a) {
              return void (
                o &&
                o.error("Error parsing " + s + " on " + t.className + ": " + a)
              );
            }
            var h = new e(t, i);
            l && l.data(t, n, h);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function n(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function o(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var r = document.documentElement.style,
      s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
      a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
      h = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[s],
      u = {
        transform: a,
        transition: s,
        transitionDuration: s + "Duration",
        transitionProperty: s + "Property",
        transitionDelay: s + "Delay",
      },
      d = (n.prototype = Object.create(t.prototype));
    (d.constructor = n),
      (d._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (d.getSize = function () {
        this.size = e(this.element);
      }),
      (d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = u[i] || i;
          e[n] = t[i];
        }
      }),
      (d.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          r = parseFloat(n),
          s = parseFloat(o),
          a = this.layout.size;
        -1 != n.indexOf("%") && (r = (r / 100) * a.width),
          -1 != o.indexOf("%") && (s = (s / 100) * a.height),
          (r = isNaN(r) ? 0 : r),
          (s = isNaN(s) ? 0 : s),
          (r -= e ? a.paddingLeft : a.paddingRight),
          (s -= i ? a.paddingTop : a.paddingBottom),
          (this.position.x = r),
          (this.position.y = s);
      }),
      (d.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          r = i ? "left" : "right",
          s = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[r] = this.getXValue(a)), (e[s] = "");
        var h = n ? "paddingTop" : "paddingBottom",
          u = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          l = this.position.y + t[h];
        (e[u] = this.getYValue(l)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), o && !this.isTransitioning))
          return void this.layoutPosition();
        var r = t - i,
          s = e - n,
          a = {};
        (a.transform = this.getTranslate(r, s)),
          this.transition({
            to: a,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (d.moveTo = d._transitionTo),
      (d.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + o(a);
    (d.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: l,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(h, this, !1);
      }
    }),
      (d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (d.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var c = { "-webkit-transform": "transform" };
    (d.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          n = c[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[n],
          i(e.ingProperties) && this.disableTransition(),
          n in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[n]),
          n in e.onEnd)
        ) {
          var o = e.onEnd[n];
          o.call(this), delete e.onEnd[n];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (d.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(h, this, !1),
          (this.isTransitioning = !1);
      }),
      (d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var f = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (d.removeTransitionStyles = function () {
        this.css(f);
      }),
      (d.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (d.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (d.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (d.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (d.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (d.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      n
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          h &&
          h.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        u && (this.$element = u(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++l;
      (this.element.outlayerGUID = o), (c[o] = this), this._create();
      var r = this._getOption("initLayout");
      r && this.layout();
    }
    function s(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    function a(t) {
      if ("number" == typeof t) return t;
      var e = t.match(/(^\d*\.?\d*)(\w*)/),
        i = e && e[1],
        n = e && e[2];
      if (!i.length) return 0;
      i = parseFloat(i);
      var o = m[n] || 1;
      return i * o;
    }
    var h = t.console,
      u = t.jQuery,
      d = function () {},
      l = 0,
      c = {};
    (r.namespace = "outlayer"),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var f = r.prototype;
    n.extend(f, e.prototype),
      (f.option = function (t) {
        n.extend(this.options, t);
      }),
      (f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (f._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (f.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (f._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this);
          n.push(s);
        }
        return n;
      }),
      (f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (f.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (f._init = f.layout),
      (f._resetLayout = function () {
        this.getSize();
      }),
      (f.getSize = function () {
        this.size = i(this.element);
      }),
      (f._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (f.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (f._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (f._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (f._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t
          ? void (this.stagger = 0)
          : ((this.stagger = a(t)), this.stagger);
      }),
      (f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
      }),
      (f._postLayout = function () {
        this.resizeContainer();
      }),
      (f.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (f._getContainerSize = d),
      (f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (f._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          s++, s == r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), u))
          if (((this.$element = this.$element || u(this.element)), e)) {
            var o = u.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (f.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (f.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (f._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (f._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (f._manageStamp = d),
      (f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (f.handleEvent = n.handleEvent),
      (f.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (f.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (f.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(r, "onresize", 100),
      (f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (f.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (f.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (f.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (f.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          u && u.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (r.create = function (t, e) {
        var i = s(r);
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          u && u.bridget && u.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (r.Item = o), r;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return (
      (n._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (n.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? "round" : "floor";
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (n.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? "round" : "ceil",
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this.options.horizontalOrder
              ? "_getHorizontalColPosition"
              : "_getTopColPosition",
            r = this[o](n, t),
            s = { x: this.columnWidth * r.col, y: r.y },
            a = r.y + t.size.outerHeight,
            h = n + r.col,
            u = r.col;
          h > u;
          u++
        )
          this.colYs[u] = a;
        return s;
      }),
      (n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)
          e[n] = this._getColGroupY(n, t);
        return e;
      }),
      (n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
          n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = o ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (n._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft"),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var u = this._getOption("originTop"),
            d = (u ? n.top : n.bottom) + i.outerHeight,
            l = a;
          h >= l;
          l++
        )
          this.colYs[l] = Math.max(d, this.colYs[l]);
      }),
      (n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  });


document.addEventListener("DOMContentLoaded", function () {


    /* Swiper */
new Swiper(".footerPaySwiper", {
  slidesPerView: 9,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 8,
    },
    1250: {
      slidesPerView: 11,
    },
  },
});

new Swiper(".footerBrandSwiper", {
  slidesPerView: "auto",
  spaceBetween: 40,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      loop: true,
      spaceBetween: 20,
    },
    1250: {},
  },
});

new Swiper(".home-blog-swiper .swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  loop: true,

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

new Swiper(".catalog-slider__best .swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".catalog-slider__best .swiper-button-next",
    prevEl: ".catalog-slider__best .swiper-button-prev",
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  pagination: {
    el: ".catalog-slider__best .swiper-pagination",
    clickable: true,
  },
});

new Swiper(".catalog-slider__sold_slider .swiper", {
  direction: "vertical",
  slidesPerView: 2,
  spaceBetween: 10,
  navigation: {
    nextEl: ".catalog-slider__sold_slider .swiper-button-next",
    prevEl: ".catalog-slider__sold_slider .swiper-button-prev",
  },
  pagination: {
    type: "fraction",
    el: ".catalog-slider__sold_slider .swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
});

new Swiper(".screen-swiper .swiper", {
  slidesPerView: 3,
  grid: {
    rows: 2,
  },
  spaceBetween: 10,
  navigation: {
    nextEl: ".screen-swiper .swiper-button-next",
    prevEl: ".screen-swiper .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 2,
      grid: {
        rows: 1,
      },
    },
    992: {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
    },
    1200: {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
    },
  },
});

new Swiper(".steam-bonus .swiper", {
  loop: false,
  slidesPerView: 3,
  spaceBetween: 10,
  navigation: {
    nextEl: ".steam-bonus .swiper-button-next",
    prevEl: ".steam-bonus .swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    980: {
      slidesPerView: 3,
    },
  },
});

new Swiper(".steam-slider .swiper", {
  spaceBetween: 12,
  loop: true,
  navigation: {
    nextEl: ".steam-slider .swiper-button-next",
    prevEl: ".steam-slider .swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: "auto",
      centeredSlides: true,
    },
    1290: {
      slidesPerView: 5,
    },
  },
});

new Swiper(".home-main-slider .swiper", {
  spaceBetween: 12,
  loop: true,
  breakpoints: {
    0: {},
  },
  pagination: {
    el: ".home-main-slider .swiper-pagination",
  },
});

function gameSwiper(selector) {
  return new Swiper(selector + " .swiper", {
    spaceBetween: 25,
    loop: true,
    navigation: {
      nextEl: selector + " .swiper-button-next",
      prevEl: selector + " .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 5,
      },
      1290: {
        slidesPerView: 5,
      },
    },
  });
}

gameSwiper(".game-swiper-1");
gameSwiper(".game-swiper-2");
gameSwiper(".game-swiper-3");
gameSwiper(".game-swiper-4");
gameSwiper(".game-swiper-5");
gameSwiper(".game-swiper-6");
gameSwiper(".game-swiper-7");
gameSwiper(".game-swiper-8");

let steamGiftsBottom = new Swiper(".steam-gifts-bottom", {
  spaceBetween: 8,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  direction: "vertical",
  breakpoints: {
    0: {
      direction: "horizontal",
    },
    1200: {
      direction: "vertical",
    },
  },
});
let steamGiftsTop = new Swiper(".steam-gifts-top", {
  spaceBetween: 10,
  thumbs: {
    swiper: steamGiftsBottom,
  },
  pagination: {
    el: ".steam-gifts-top .swiper-pagination",
  },
});

/* Splide */

let homeMarkets = document.querySelector(".home-markets .splide");
if (homeMarkets) {
  let homeMarketsSplide = new Splide(".home-markets .splide", {
    type: "loop",
    focus: "center",
    autoWidth: true,
    perPage: 4,
    gap: 50,
    breakpoints: {
      768: {
        perPage: 1,
      },
    },
    arrows: false,
    pagination: false,
    autoScroll: {
      speed: 1,
    },
  });
  homeMarketsSplide.mount(window.splide.Extensions);
}

let homeReviews = document.querySelector(".home-reviews .splide");
if (homeReviews) {
  let homeReviewsSplide = new Splide(".home-reviews .splide", {
    type: "loop",
    focus: "center",
    perPage: 4,
    gap: 20,
    mediaQuery: "min",
    breakpoints: {
      0: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      979: {
        perPage: 3,
      },
      1200: {
        perPage: 4,
      },
    },
    arrows: false,
    pagination: false,
  });
  homeReviewsSplide.mount(window.splide.Extensions);
}

let homeBlog = document.querySelector(".home-blog .splide");
if (homeBlog) {
  let homeBlogSplide = new Splide(".home-blog .splide", {
    type: "loop",
    perPage: 2,
    arrows: false,
    pagination: false,
    gap: 22,
    mediaQuery: "min",
    breakpoints: {
      0: {
        perPage: 1,
        focus: "center",
        autoWidth: true,
      },
      768: {
        focus: "center",
        perPage: 1,
        autoWidth: true,
      },
      1200: {
        focus: 1,
        perPage: 2,
        autoWidth: false,
      },
    },
  });
  homeBlogSplide.mount();
}

let homeStatics = document.querySelector(".home-statics .splide");
if (homeStatics) {
  let homeStaticsSplide = new Splide(".home-statics .splide", {
    type: "loop",
    focus: "center",
    perPage: 3,
    arrows: false,
    pagination: false,
    gap: 20,
    breakpoints: {
      979: {
        perPage: 1,
        gap: -52,
      },
    },
  });
  homeStaticsSplide.mount();
}

let steamHistory = document.querySelector(".steam-history .splide");
if (steamHistory) {
  let steamHistorySplide = new Splide(".steam-history .splide", {
    type: "loop",
    focus: "center",
    autoWidth: true,
    perPage: 4,
    gap: 10,
    breakpoints: {
      0: {
        perPage: 1,
      },
      768: {
        perPage: 2,
      },
      979: {
        perPage: 3,
      },
      1200: {
        perPage: 4,
      },
    },
    arrows: false,
    pagination: false,
    autoScroll: {
      speed: 1,
    },
  });
  steamHistorySplide.mount(window.splide.Extensions);
}

    /* Аккордион */
const accordions = document.querySelectorAll(".accordion");
const openAccordion = (accordion) => {
  const content = accordion.querySelector(".accordion__content");
  accordion.classList.add("accordion__active");
  content.style.maxHeight = content.scrollHeight + 40 + "px";
};
const closeAccordion = (accordion) => {
  const content = accordion.querySelector(".accordion__content");
  accordion.classList.remove("accordion__active");
  content.style.maxHeight = null;
};
accordions.forEach((accordion) => {
  const intro = accordion.querySelector(".accordion__intro");
  const content = accordion.querySelector(".accordion__content");

  intro.onclick = () => {
    if (content.style.maxHeight) {
      closeAccordion(accordion);
    } else {
      accordions.forEach((accordion) => closeAccordion(accordion));
      openAccordion(accordion);
    }
  };
});

/* Копия не работает пока */
let copyBtn = document.querySelector(".copy-js");

/* Таймер */
const formatNumber = (number) => {
  return `<div class="timer__wrapper">${number
    .toString()
    .split("")
    .map(
      (digit) =>
        `<span class="timer__digit"><span class="timer__digit_num">${digit}</span></span>`
    )
    .join("")}</div>`;
};

const updateTimer = (timer, deadline) => {
  const now = new Date().getTime();
  const distance = deadline - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);

  const daysContainer = timer.querySelector(".timer__day");
  const hoursContainer = timer.querySelector(".timer__hours");
  const minsContainer = timer.querySelector(".timer__minutes");
  const secsContainer = timer.querySelector(".timer__seconds");
  const timerInfo = timer.querySelector(".timer__info");
  const messageContainer = timer.querySelector(".timer__message");

  if (daysContainer)
    daysContainer.innerHTML =
      formatNumber(days) + '<h3 class="timer__label">Дней</h3>';
  if (hoursContainer)
    hoursContainer.innerHTML =
      formatNumber(hours) + '<h3 class="timer__label">Часов</h3>';
  if (minsContainer)
    minsContainer.innerHTML =
      formatNumber(mins) + '<h3 class="timer__label">Минут</h3>';
  if (secsContainer)
    secsContainer.innerHTML =
      formatNumber(secs) + '<h3 class="timer__label">Секунд</h3>';

  if (distance < 0) {
    clearInterval(timer.interval);
    if (timerInfo) timerInfo.classList.add("is-hidden");
    if (messageContainer) messageContainer.classList.add("is-visible");
  }
};

const timers = document.querySelectorAll(".timer");

timers.forEach((timer) => {
  const deadline = new Date(timer.getAttribute("data-deadline")).getTime();

  timer.interval = setInterval(() => {
    updateTimer(timer, deadline);
  }, 1000);

  updateTimer(timer, deadline);
});

/* Hamburger menu */
const headerMenu = document.querySelector(".header__menu");
const hamburgerButton = document.querySelector(".js-hamburger");
const hamburgerMenu = document.querySelector(".js-hamburger-menu");
const hamburgerMenuClose = document.querySelector(".js-hamburger-close");

if (hamburgerButton)
  hamburgerButton.addEventListener("click", function () {
    this.classList.toggle("_active");
    hamburgerMenu.classList.toggle("active");
    headerMenu.classList.toggle("active");
  });

if (hamburgerMenuClose)
  hamburgerMenuClose.addEventListener("click", function () {
    hamburgerMenu.classList.remove("active");
    hamburgerButton.classList.remove("_active");
    headerMenu.classList.remove("active");
  });

/* Header Game */
const headerGameBtns = document.querySelectorAll(".js-header-game-open");

if (headerGameBtns)
  headerGameBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("remove");
    });
  });

/* Header Admin */
const headerAdminBtn = document.querySelector(".header__actions_admin_open");
const headerAdminDrop = document.querySelector(".header__actions_admin_drop");

if (headerAdminBtn)
  headerAdminBtn.addEventListener("click", () => {
    headerAdminBtn.classList.toggle("_active");
    headerAdminDrop.classList.toggle("_active");
  });

/* Language button */
const langButton = document.querySelector(".header__lang_button");
const langDropdown = document.querySelector(".header__lang_dropdown");

if (langButton)
  langButton.addEventListener("click", function () {
    langDropdown.classList.toggle("active");
  });

// Init JS
const ReadSmore = window.readSmore;

const readMoreEls = document.querySelectorAll(".js-read-smore");

ReadSmore(readMoreEls).init();

/* Select */

function createCustomSelects() {
  const customSelects = document.querySelectorAll(".custom-select");
  customSelects.forEach((customSelect) => {
    const selectElement = customSelect.querySelector("select");
    createSelectContainer(customSelect, selectElement);
    createOptionsList(customSelect, selectElement);
    addSelectEventListeners(customSelect);
  });
}

function createSelectContainer(customSelect, selectElement) {
  const selectedContainer = document.createElement("DIV");
  selectedContainer.classList.add("select-selected");
  selectedContainer.innerHTML =
    selectElement.options[selectElement.selectedIndex].innerHTML;
  customSelect.appendChild(selectedContainer);
}

function createOptionsList(customSelect, selectElement) {
  const optionsList = document.createElement("DIV");
  optionsList.classList.add("select-items", "select-hide");
  for (let i = 1; i < selectElement.length; i++) {
    const optionItem = document.createElement("DIV");
    optionItem.innerHTML = selectElement.options[i].innerHTML;
    optionItem.addEventListener("click", function (event) {
      updateSelectBox(this);
    });
    optionsList.appendChild(optionItem);
  }
  customSelect.appendChild(optionsList);
}

function updateSelectBox(selectedItem) {
  const selectBox = selectedItem.parentNode.parentNode.querySelector("select");
  const selectedContainer = selectedItem.parentNode.previousSibling;
  selectBox.selectedIndex = Array.from(selectBox.options).findIndex(
    (option) => option.innerHTML === selectedItem.innerHTML
  );
  selectedContainer.innerHTML = selectedItem.innerHTML;
  const sameAsSelected =
    selectedItem.parentNode.querySelectorAll(".same-as-selected");
  sameAsSelected.forEach((item) => item.classList.remove("same-as-selected"));
  selectedItem.classList.add("same-as-selected");
  selectedContainer.click();
}

function addSelectEventListeners(customSelect) {
  const selectedContainer = customSelect.querySelector(".select-selected");
  selectedContainer.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllSelects(this);
    const optionsList = this.nextSibling;
    optionsList.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelects(currentSelect) {
  const allOptionsLists = document.querySelectorAll(".select-items");
  const allSelectedContainers = document.querySelectorAll(".select-selected");
  allOptionsLists.forEach((optionsList) => {
    if (optionsList.previousSibling !== currentSelect) {
      optionsList.classList.add("select-hide");
    }
  });
  allSelectedContainers.forEach((selectedContainer) => {
    if (selectedContainer !== currentSelect) {
      selectedContainer.classList.remove("select-arrow-active");
    }
  });
}

document.addEventListener("click", function () {
  closeAllSelects(null);
});

createCustomSelects();

/* Tabs */

function setupTabs(tabButtonsClass, tabContentClass) {
  const tabButtons = document.querySelectorAll(tabButtonsClass);

  tabButtons.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabClicked(tab, tabButtonsClass, tabContentClass);
    });
  });
}

function tabClicked(tab, tabButtonsClass, tabContentClass) {
  const allTabButtons = document.querySelectorAll(tabButtonsClass);
  allTabButtons.forEach((tab) => {
    tab.classList.remove("_active");
  });
  tab.classList.add("_active");

  const contents = document.querySelectorAll(tabContentClass);
  contents.forEach((content) => {
    content.classList.remove("_active");
  });

  const contentId = tab.getAttribute("content-id");
  const contentSelected = document.getElementById(contentId);

  contentSelected.classList.add("_active");
}

setupTabs(".tab-btn", ".tab-content");
setupTabs(".tab-btn-second", ".tab-content-second");
setupTabs(".tab-btn-third", ".tab-content-third");
setupTabs(".tab-btn-fourth", ".tab-content-fourth");

window.addEventListener("scroll", function () {
  let fixedCard = document.querySelector(".fixed-card");

  if (fixedCard)
    if (window.scrollY >= 600) {
      fixedCard.classList.add("active");
    } else {
      fixedCard.classList.remove("active");
    }
});

const scrollToTop = document.querySelector(".footer-to-top");

if (scrollToTop)
  scrollToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

/* Basket Counter */
const minusBtns = document.querySelectorAll(
  ".basket-page__items .basket-page__card_minus"
);
const plusBtns = document.querySelectorAll(
  ".basket-page__items .basket-page__card_plus"
);
const valueEls = document.querySelectorAll(
  ".basket-page__items .basket-page__card_value"
);

if (minusBtns)
  minusBtns.forEach(function (minusBtn, index) {
    minusBtn.addEventListener("click", function () {
      let count = parseInt(valueEls[index].textContent);
      if (count > 1) {
        count--;
        valueEls[index].textContent = count;
      }
    });
  });
if (plusBtns)
  plusBtns.forEach(function (plusBtn, index) {
    plusBtn.addEventListener("click", function () {
      let count = parseInt(valueEls[index].textContent);
      count++;
      valueEls[index].textContent = count;
    });
  });

/* Basket Delete */
const basketDeleteBtns = document.querySelectorAll(".basket-page__card_delete");
const basketOverlays = document.querySelectorAll(".basket-page__card_over");
const basketOverlayNos = document.querySelectorAll(
  ".basket-page__card_over_no"
);
if (basketDeleteBtns)
  basketDeleteBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const overlay = btn
        .closest(".basket-page__card")
        .querySelector(".basket-page__card_over");
      if (overlay) {
        overlay.classList.add("_active");
      }
    });
  });
if (basketOverlayNos)
  basketOverlayNos.forEach(function (overlayNo) {
    overlayNo.addEventListener("click", function () {
      const overlay = overlayNo
        .closest(".basket-page__card")
        .querySelector(".basket-page__card_over");
      if (overlay) {
        overlay.classList.remove("_active");
      }
    });
  });

/* Cart Add */
const newCards = document.querySelectorAll(".new-card");

if (newCards)
  newCards.forEach((item) => {
    item.addEventListener("click", function (event) {
      if (event.target.closest(".new-card__btn")) {
        const button = event.target.closest(".new-card__btn");
        const parentBlock = button.closest(".new-card__btn_block");
        if (parentBlock) {
          parentBlock.classList.toggle("_active");
        }
      }
    });
  });

/* Search Block */
const searchButton = document.querySelector(".js-search-open");
const searchBlock = document.querySelector(".js-search-menu");

if (searchButton)
  searchButton.addEventListener("click", function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    searchButton.classList.toggle("active"); // Добавляем или удаляем класс active на ссылку
    searchBlock.classList.toggle("active"); // Добавляем или удаляем класс active на div
  });

/* FancyBox */
Fancybox.bind();

/* Steam */
const steamPrices = document.querySelectorAll(".steam-discount__price");
const steamDots = document.querySelectorAll(".steam-discount__dot");
const steamBtns = document.querySelectorAll(".steam-discount__btn");
const lineColor = document.querySelector(".steam-discount__line_color");

function updateButtonClasses(index) {
  steamDots.forEach((dot, i) => {
    if (i <= index) {
      dot.classList.add("_active");
    } else {
      dot.classList.remove("_active");
    }
  });

  steamBtns.forEach((btn, i) => {
    if (i <= index) {
      btn.classList.add("_active");
    } else {
      btn.classList.remove("_active");
    }
  });

  if (lineColor) {
    const newWidth = (index + 1) * 25; // Calculate new width percentage
    lineColor.style.width = `${newWidth}%`;
  }
}

function togglePriceClass(index) {
  steamPrices.forEach((price, i) => {
    if (i === index) {
      price.classList.add("_active");
    } else {
      price.classList.remove("_active");
    }
  });
}

steamBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    updateButtonClasses(index);
    togglePriceClass(index);
  });
});

steamDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateButtonClasses(index);
    togglePriceClass(index);
  });
});

/* Steam Slider Line */

function updateSwiperLineWidth() {
  const swiperSlides = document.querySelectorAll(
    ".steam-bonus__slider .swiper-slide"
  );
  const swiperLine = document.querySelector(
    ".steam-bonus__slider .swiper-line"
  );

  if (swiperSlides.length > 0 && swiperLine) {
    const slideCount = swiperSlides.length;
    const baseWidth = window.innerWidth < 980 ? 2 : 3;
    const baseWidthPercentage = 100;
    const additionalWidthPercentage =
      ((slideCount - baseWidth) / baseWidth) * 100;
    const finalWidthPercentage =
      baseWidthPercentage + additionalWidthPercentage;

    swiperLine.style.width = `calc(${finalWidthPercentage}%)`;
  }
}

function updateSwiperLineColorWidth() {
  const cards = document.querySelectorAll(
    ".steam-bonus__slider .swiper-slide .steam-bonus__card"
  );
  const activeCards = document.querySelectorAll(
    ".steam-bonus__slider .swiper-slide .steam-bonus__card._active"
  );
  const totalCards = cards.length;
  const percentagePerCard = 100 / totalCards;
  let activePercentage = 0;

  activeCards.forEach(() => {
    activePercentage += percentagePerCard;
  });

  const swiperLineColor = document.querySelector(
    ".steam-bonus__slider .swiper-line__color"
  );
  if (swiperLineColor) {
    swiperLineColor.style.transition = "width 0.2s ease";
    swiperLineColor.style.width = `${activePercentage}%`;
  }
}

function updateSwiperLine() {
  updateSwiperLineWidth();
  updateSwiperLineColorWidth();
}

window.addEventListener("resize", updateSwiperLine);
updateSwiperLine();

/* Trofei Progress */
function updateTrofeiProgressBar() {
  const trofeiColor = document.querySelector(
    ".admin-trofei__statics_progress_color"
  );
  const trofeiCurrentValue = document.querySelector(
    ".admin-trofei__statics_progress_count ._current"
  );
  const trofeiAllValue = document.querySelector(
    ".admin-trofei__statics_progress_count ._all"
  );

  if (trofeiColor && trofeiCurrentValue && trofeiAllValue) {
    const current = parseInt(trofeiCurrentValue.textContent, 10);
    const all = parseInt(trofeiAllValue.textContent, 10);

    if (!isNaN(current) && !isNaN(all) && all > 0) {
      const percentage = (current / all) * 100;
      trofeiColor.style.width = `${percentage}%`;
    }
  }
}

// Call the function to update the progress bar initially
updateTrofeiProgressBar();

function updateDoingProgressBars() {
  const cards = document.querySelectorAll(".doing-card");

  cards.forEach((card) => {
    const percentElement = card.querySelector(".doing-card__percent");
    const progressBar = card.querySelector(".doing-card__progress");

    if (percentElement && progressBar) {
      const percent = parseInt(percentElement.textContent, 10);

      if (!isNaN(percent)) {
        progressBar.style.width = `${percent}%`;
      }
    }
  });
}

// Call the function to update all progress bars initially
updateDoingProgressBars();

const mainLogin = document.querySelector(".main-login");
const closeButton = document.querySelector(".main-login__close");
const exitButton = document.querySelector(".header__actions_admin_item_exit");

if (mainLogin && closeButton) {
  closeButton.addEventListener("click", () => {
    mainLogin.classList.remove("_active");
  });
}

if (mainLogin && exitButton) {
  exitButton.addEventListener("click", () => {
    mainLogin.classList.add("_active");
  });
}

/* Form Select */
const formSelects = document.querySelectorAll(".form-select");

formSelects.forEach((formSelect) => {
  const searchInput = formSelect.querySelector(".form-input");
  const selectOptions = formSelect.querySelector(".form-select__options");
  const options = formSelect.querySelectorAll(".form-select__option");

  searchInput.addEventListener("focus", () => {
    selectOptions.style.display = "block";
  });

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    options.forEach((option) => {
      const text = option.textContent.toLowerCase();
      if (text.includes(filter)) {
        option.classList.remove("hidden");
      } else {
        option.classList.add("hidden");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".form-select")) {
      selectOptions.style.display = "none";
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      searchInput.value = option.textContent;
      selectOptions.style.display = "none";
    });
  });

  if (options.length > 4) {
    selectOptions.style.maxHeight = "150px";
    selectOptions.style.overflowY = "scroll";
  } else {
    selectOptions.style.maxHeight = "";
    selectOptions.style.overflowY = "";
  }
});

/* Catalog */
const catalogTabWrapper = document.querySelectorAll(".catalog__tabs");
const catalogButtons = document.querySelectorAll(".catalog__btn");
const catalogContents = document.querySelectorAll(".catalog__tabs_content");
const catalogBgs = document.querySelectorAll(".catalog__bg");

catalogButtons.forEach((button, index) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    catalogContents[index].classList.toggle("active");
    catalogBgs[index].classList.toggle("active");
    catalogTabWrapper[index].classList.toggle("active");
  });
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".catalog__tabs")) {
    catalogContents.forEach((content) => {
      content.classList.remove("active");
    });
    catalogBgs.forEach((bg) => {
      bg.classList.remove("active");
    });
    catalogTabWrapper.forEach((wrap) => {
      wrap.classList.remove("active");
    });
  }
});

const catalogTabsContent = document.querySelector(".catalog__tabs_content");
if (catalogTabsContent) {
  const catalogTabs = catalogTabsContent.querySelectorAll(".catalog__tab");
  const catalogTabReturns = catalogTabsContent.querySelectorAll(
    ".catalog__tab_drop_return"
  );

  catalogTabs.forEach((tab) => {
    const catalogTabBtn = tab.querySelector(".catalog__tab_btn");
    const catalogTabDrop = tab.querySelector(".catalog__tab_drop");

    catalogTabBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const isActive = catalogTabBtn.classList.contains("_active");

      catalogTabs.forEach((innerTab) => {
        innerTab.classList.remove("_active");
        innerTab.querySelector(".catalog__tab_btn").classList.remove("_active");
        innerTab
          .querySelector(".catalog__tab_drop")
          .classList.remove("_active");
      });

      if (!isActive) {
        tab.classList.add("_active");
        catalogTabBtn.classList.add("_active");
        catalogTabDrop.classList.add("_active");
      }
    });

    catalogTabReturns.forEach((returnBtn) => {
      returnBtn.addEventListener("click", () => {
        catalogTabs.forEach((tab) => {
          tab.classList.remove("_active");
          tab.querySelector(".catalog__tab_btn").classList.remove("_active");
          tab.querySelector(".catalog__tab_drop").classList.remove("_active");
        });
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!catalogTabsContent.contains(event.target)) {
      catalogTabs.forEach((tab) => {
        tab.classList.remove("_active");
        tab.querySelector(".catalog__tab_btn").classList.remove("_active");
        tab.querySelector(".catalog__tab_drop").classList.remove("_active");
      });
    }
  });
}

    document.querySelectorAll("[data-custom-select]").forEach((selectElement) => {
  const trigger = selectElement.querySelector("[data-select-trigger]");
  const optionsContainer = selectElement.querySelector("[data-select-options]");
  const options = selectElement.querySelectorAll("[data-select-option]");
  const hiddenInput = selectElement.querySelector("[data-select-input]");

  trigger.addEventListener("click", () => {
    const isOpen = optionsContainer.style.display === "block";
    document
      .querySelectorAll("[data-custom-select] [data-select-options]")
      .forEach((container) => (container.style.display = "none"));
    document
      .querySelectorAll("[data-custom-select] [data-select-trigger]")
      .forEach((trg) => trg.classList.remove("open"));
    if (!isOpen) {
      optionsContainer.style.display = "block";
      trigger.classList.add("open");
    }
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      const flagSrc = option.getAttribute("data-flag");

      trigger.querySelector("img").setAttribute("src", flagSrc);
      hiddenInput.value = value;

      optionsContainer.style.display = "none";
      trigger.classList.remove("open");

      options.forEach((opt) => opt.classList.remove("active"));
      option.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!selectElement.contains(e.target)) {
      optionsContainer.style.display = "none";
      trigger.classList.remove("open");
    }
  });

  const firstOption = options[0];
  trigger
    .querySelector("img")
    .setAttribute("src", firstOption.getAttribute("data-flag"));
  hiddenInput.value = firstOption.getAttribute("data-value");
  firstOption.classList.add("active");
});


});



