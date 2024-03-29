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
