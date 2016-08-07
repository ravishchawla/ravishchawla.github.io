"use strict";
! function(e, t) {
    function i(e) {
        var t = e.indexOf("#"),
            i = e.indexOf("?"),
            n = Math.min(t > 0 ? t : e.length, i > 0 ? i : e.length);
        return e.substring(e.lastIndexOf("/", n) + 1, n)
    }

    function n(t) {
        var i = e.devicePixelRatio || 1,
            n = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1,
            r = i / n;
        return {
            sx: r,
            sy: r,
            scaled: 1 !== r
        }
    }

    function r(e, t) {
        var i = e.offsetParent,
            n = e.offsetTop + e.clientTop,
            r = e.offsetLeft + e.clientLeft;
        if (!i) return void console.error("offsetParent is not set -- cannot scroll");
        for (; i.clientHeight === i.scrollHeight;)
            if (i.dataset._scaleY && (n /= i.dataset._scaleY, r /= i.dataset._scaleX), n += i.offsetTop, r += i.offsetLeft, i = i.offsetParent, !i) return;
        t && (void 0 !== t.top && (n += t.top), void 0 !== t.left && (r += t.left, i.scrollLeft = r)), i.scrollTop = n
    }

    function s(t, i) {
        var n = function(n) {
                s || (s = e.requestAnimationFrame(function() {
                    s = null;
                    var e = t.scrollTop,
                        n = r.lastY;
                    e !== n && (r.down = e > n), r.lastY = e, i(r)
                }))
            },
            r = {
                down: !0,
                lastY: t.scrollTop,
                _eventHandler: n
            },
            s = null;
        return t.addEventListener("scroll", n, !0), r
    }

    function a(e, t) {
        var i = 0,
            n = e.length - 1;
        if (0 === e.length || !t(e[n])) return e.length;
        if (t(e[i])) return i;
        for (; n > i;) {
            var r = i + n >> 1,
                s = e[r];
            t(s) ? n = r : i = r + 1
        }
        return i
    }

    function o(e, t, i) {
        function n(e) {
            var t = e.div,
                i = t.offsetTop + t.clientTop + t.clientHeight;
            return i > f
        }
        for (var r, s, o, l, d, h, c, u, f = e.scrollTop, g = f + e.clientHeight, p = e.scrollLeft, v = p + e.clientWidth, m = [], w = 0 === t.length ? 0 : a(t, n), b = w, P = t.length; P > b && (r = t[b], s = r.div, o = s.offsetTop + s.clientTop, l = s.clientHeight, !(o > g)); b++) c = s.offsetLeft + s.clientLeft, u = s.clientWidth, p > c + u || c > v || (d = Math.max(0, f - o) + Math.max(0, o + l - g), h = 100 * (l - d) / l | 0, m.push({
            id: r.id,
            x: c,
            y: o,
            view: r,
            percent: h
        }));
        var y = m[0],
            S = m[m.length - 1];
        return i && m.sort(function(e, t) {
            var i = e.percent - t.percent;
            return Math.abs(i) > .001 ? -i : e.id - t.id
        }), {
            first: y,
            last: S,
            views: m
        }
    }

    function l(e) {
        e.preventDefault()
    }

    function d(e) {
        var t = /^(?:([^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/,
            i = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i,
            n = t.exec(e),
            r = i.exec(n[1]) || i.exec(n[2]) || i.exec(n[3]);
        if (r && (r = r[0], -1 !== r.indexOf("%"))) try {
            r = i.exec(decodeURIComponent(r))[0]
        } catch (s) {}
        return r || "document.pdf"
    }

    function h(e) {
        return !V.test(e)
    }

    function c() {}

    function u() {
        q.initialize().then(f)
    }

    function f(i) {
        var n = t.location.search.substring(1),
            r = q.parseQueryString(n),
            i = r.file || "",
            s = r.download || !1,
            a = PDFJS.locale || navigator.language;
        Q.setLanguage(a), q.supportsPrinting || t.getElementById("print").classList.add("hidden"), PDFJS.UnsupportedManager.listen(q.fallback.bind(q));
        var o = t.getElementById("mainContainer"),
            l = t.getElementById("outerContainer");
        if (o.addEventListener("transitionend", function(i) {
                if (i.target === o) {
                    var n = t.createEvent("UIEvents");
                    n.initUIEvent("resize", !1, !1, e, 0), e.dispatchEvent(n), l.classList.remove("sidebarMoving")
                }
            }, !0), t.getElementById("zoomIn").addEventListener("click", function() {
                q.zoomIn()
            }), t.getElementById("zoomOut").addEventListener("click", function() {
                q.zoomOut()
            }), s ? (t.getElementById("print").addEventListener("click", function() {
                e.print()
            }), t.getElementById("download").addEventListener("click", q.download.bind(q))) : (t.getElementById("print").remove(), t.getElementById("download").remove()), i && 0 === i.lastIndexOf("file:", 0)) {
            q.setTitleUsingUrl(i);
            var d = new XMLHttpRequest;
            d.onload = function() {
                q.open(new Uint8Array(d.response), 0)
            };
            try {
                d.open("GET", i), d.responseType = "arraybuffer", d.send()
            } catch (h) {
                q.error(Q.get("loading_error", null, "An error occurred while loading the PDF."), h)
            }
        } else i && q.open(i, z)
    }

    function g() {
        q.initialized && q.pdfViewer.update()
    }

    function p(e) {
        var t = 40;
        "DOMMouseScroll" === e.type ? -e.detail : e.wheelDelta / t
    }
    var v = {
            showPreviousViewOnLoad: !0,
            defaultZoomValue: "",
            sidebarViewOnLoad: 0,
            enableHandToolOnLoad: !1,
            enableWebGL: !1,
            pdfBugEnabled: !1,
            disableRange: !1,
            disableStream: !1,
            disableAutoFetch: !1,
            disableFontFace: !1,
            disableTextLayer: !1,
            useOnlyCssZoom: !1
        },
        m = 96 / 72,
        w = "auto",
        b = 0,
        P = 1.25,
        y = 40,
        S = 5,
        E = function() {
            function e() {}
            var i = ["ms", "Moz", "Webkit", "O"],
                n = {};
            return e.getProp = function(e, r) {
                if (1 === arguments.length && "string" == typeof n[e]) return n[e];
                r = r || t.documentElement;
                var s, a, o = r.style;
                if ("string" == typeof o[e]) return n[e] = e;
                a = e.charAt(0).toUpperCase() + e.slice(1);
                for (var l = 0, d = i.length; d > l; l++)
                    if (s = i[l] + a, "string" == typeof o[s]) return n[e] = s;
                return n[e] = "undefined"
            }, e.setProp = function(e, t, i) {
                var n = this.getProp(e);
                "undefined" !== n && (t.style[n] = i)
            }, e
        }(),
        x = function() {
            function e(e, t, i) {
                return Math.min(Math.max(e, t), i)
            }

            function i(e, i) {
                this.visible = !0, this.div = t.querySelector(e + " .progress"), this.bar = this.div.parentNode, this.height = i.height || 100, this.width = i.width || 100, this.units = i.units || "%", this.div.style.height = this.height + this.units, this.percent = 0
            }
            return i.prototype = {
                updateBar: function() {
                    if (this._indeterminate) return this.div.classList.add("indeterminate"), void(this.div.style.width = this.width + this.units);
                    this.div.classList.remove("indeterminate");
                    var e = this.width * this._percent / 100;
                    this.div.style.width = e + this.units
                },
                get percent() {
                    return this._percent
                },
                set percent(t) {
                    this._indeterminate = isNaN(t), this._percent = e(t, 0, 100), this.updateBar()
                },
                setWidth: function(e) {
                    if (e) {
                        var t = e.parentNode,
                            i = t.offsetWidth - e.offsetWidth;
                        i > 0 && this.bar.setAttribute("style", "width: calc(100% - " + i + "px);")
                    }
                },
                hide: function() {
                    this.visible && (this.visible = !1, this.bar.classList.add("hidden"), t.body.classList.remove("loadingInProgress"))
                },
                show: function() {
                    this.visible || (this.visible = !0, t.body.classList.add("loadingInProgress"), this.bar.classList.remove("hidden"))
                }
            }, i
        }(),
        L = {
            prefs: Object.create(v),
            isInitializedPromiseResolved: !1,
            initializedPromise: null,
            initialize: function() {
                return this.initializedPromise = this._readFromStorage(v).then(function(e) {
                    this.isInitializedPromiseResolved = !0, e && (this.prefs = e)
                }.bind(this))
            },
            _writeToStorage: function(e) {
                return Promise.resolve()
            },
            _readFromStorage: function(e) {
                return Promise.resolve()
            },
            reset: function() {
                return this.initializedPromise.then(function() {
                    return this.prefs = Object.create(v), this._writeToStorage(v)
                }.bind(this))
            },
            reload: function() {
                return this.initializedPromise.then(function() {
                    this._readFromStorage(v).then(function(e) {
                        e && (this.prefs = e)
                    }.bind(this))
                }.bind(this))
            },
            set: function(e, t) {
                return this.initializedPromise.then(function() {
                    if (void 0 === v[e]) throw new Error("preferencesSet: '" + e + "' is undefined.");
                    if (void 0 === t) throw new Error("preferencesSet: no value is specified.");
                    var i = typeof t,
                        n = typeof v[e];
                    if (i !== n) {
                        if ("number" !== i || "string" !== n) throw new Error("Preferences_set: '" + t + "' is a \"" + i + '", expected "' + n + '".');
                        t = t.toString()
                    } else if ("number" === i && (0 | t) !== t) throw new Error("Preferences_set: '" + t + '\' must be an "integer".');
                    return this.prefs[e] = t, this._writeToStorage(this.prefs)
                }.bind(this))
            },
            get: function(e) {
                return this.initializedPromise.then(function() {
                    var t = v[e];
                    if (void 0 === t) throw new Error("preferencesGet: '" + e + "' is undefined.");
                    var i = this.prefs[e];
                    return void 0 !== i ? i : t
                }.bind(this))
            }
        };
    L._writeToStorage = function(e) {
        return new Promise(function(t) {
            localStorage.setItem("pdfjs.preferences", JSON.stringify(e)), t()
        })
    }, L._readFromStorage = function(e) {
        return new Promise(function(e) {
            var t = JSON.parse(localStorage.getItem("pdfjs.preferences"));
            e(t)
        })
    };
    var C = function() {
            function i(i, n) {
                var r = t.createElement("a");
                if (r.click) r.href = i, r.target = "_parent", "download" in r && (r.download = n), (t.body || t.documentElement).appendChild(r), r.click(), r.parentNode.removeChild(r);
                else {
                    if (e.top === e && i.split("#")[0] === e.location.href.split("#")[0]) {
                        var s = -1 === i.indexOf("?") ? "?" : "&";
                        i = i.replace(/#|$/, s + "$&")
                    }
                    e.open(i, "_parent")
                }
            }

            function n() {}
            return n.prototype = {
                downloadUrl: function(e, t) {
                    PDFJS.isValidUrl(e, !0) && i(e + "#pdfjs.action=download", t)
                },
                downloadData: function(e, t, n) {
                    if (navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([e], {
                        type: n
                    }), t);
                    var r = PDFJS.createObjectURL(e, n);
                    i(r, t)
                },
                download: function(e, t, n) {
                    if (!URL) return void this.downloadUrl(t, n);
                    if (navigator.msSaveBlob) return void(navigator.msSaveBlob(e, n) || this.downloadUrl(t, n));
                    var r = URL.createObjectURL(e);
                    i(r, n)
                }
            }, n
        }(),
        D = 3e4,
        I = {
            INITIAL: 0,
            RUNNING: 1,
            PAUSED: 2,
            FINISHED: 3
        },
        F = function() {
            function e() {
                this.pdfViewer = null, this.pdfThumbnailViewer = null, this.onIdle = null, this.highestPriorityPage = null, this.idleTimeout = null, this.printing = !1, this.isThumbnailViewEnabled = !1
            }
            return e.prototype = {
                setViewer: function(e) {
                    this.pdfViewer = e
                },
                setThumbnailViewer: function(e) {
                    this.pdfThumbnailViewer = e
                },
                isHighestPriority: function(e) {
                    return this.highestPriorityPage === e.renderingId
                },
                renderHighestPriority: function(e) {
                    this.idleTimeout && (clearTimeout(this.idleTimeout), this.idleTimeout = null), this.pdfViewer.forceRendering(e) || this.pdfThumbnailViewer && this.isThumbnailViewEnabled && this.pdfThumbnailViewer.forceRendering() || this.printing || this.onIdle && (this.idleTimeout = setTimeout(this.onIdle.bind(this), D))
                },
                getHighestPriority: function(e, t, i) {
                    var n = e.views,
                        r = n.length;
                    if (0 === r) return !1;
                    for (var s = 0; r > s; ++s) {
                        var a = n[s].view;
                        if (!this.isViewFinished(a)) return a
                    }
                    if (i) {
                        var o = e.last.id;
                        if (t[o] && !this.isViewFinished(t[o])) return t[o]
                    } else {
                        var l = e.first.id - 2;
                        if (t[l] && !this.isViewFinished(t[l])) return t[l]
                    }
                    return null
                },
                isViewFinished: function(e) {
                    return e.renderingState === I.FINISHED
                },
                renderView: function(e) {
                    var t = e.renderingState;
                    switch (t) {
                        case I.FINISHED:
                            return !1;
                        case I.PAUSED:
                            this.highestPriorityPage = e.renderingId, e.resume();
                            break;
                        case I.RUNNING:
                            this.highestPriorityPage = e.renderingId;
                            break;
                        case I.INITIAL:
                            this.highestPriorityPage = e.renderingId;
                            var i = function() {
                                this.renderHighestPriority()
                            }.bind(this);
                            e.draw().then(i, i)
                    }
                    return !0
                }
            }, e
        }(),
        T = 200,
        N = function() {
            function e(e) {
                var i = e.container,
                    n = e.id,
                    r = e.scale,
                    s = e.defaultViewport,
                    a = e.renderingQueue,
                    o = e.textLayerFactory;
                this.id = n, this.renderingId = "page" + n, this.rotation = 0, this.scale = r || 1, this.viewport = s, this.pdfPageRotate = s.rotation, this.hasRestrictedScaling = !1, this.renderingQueue = a, this.textLayerFactory = o, this.renderingState = I.INITIAL, this.resume = null, this.onBeforeDraw = null, this.onAfterDraw = null, this.textLayer = null, this.zoomLayer = null, this.annotationLayer = null;
                var l = t.createElement("div");
                l.id = "pageContainer" + this.id, l.className = "page", l.style.width = Math.floor(this.viewport.width) + "px", l.style.height = Math.floor(this.viewport.height) + "px", l.setAttribute("data-page-number", this.id), this.div = l, i.appendChild(l)
            }
            return e.prototype = {
                setPdfPage: function(e) {
                    this.pdfPage = e, this.pdfPageRotate = e.rotate;
                    var t = (this.rotation + this.pdfPageRotate) % 360;
                    this.viewport = e.getViewport(this.scale * m, t), this.stats = e.stats, this.reset()
                },
                destroy: function() {
                    this.zoomLayer = null, this.reset(), this.pdfPage && this.pdfPage.destroy()
                },
                reset: function(e) {
                    this.renderTask && this.renderTask.cancel(), this.resume = null, this.renderingState = I.INITIAL;
                    var i = this.div;
                    i.style.width = Math.floor(this.viewport.width) + "px", i.style.height = Math.floor(this.viewport.height) + "px";
                    for (var n = i.childNodes, r = this.zoomLayer || null, s = e && this.annotationLayer && this.annotationLayer.div || null, a = n.length - 1; a >= 0; a--) {
                        var o = n[a];
                        r !== o && s !== o && i.removeChild(o)
                    }
                    i.removeAttribute("data-loaded"), e ? this.annotationLayer && this.annotationLayer.hide() : this.annotationLayer = null, this.canvas && (this.canvas.width = 0, this.canvas.height = 0, delete this.canvas), this.loadingIconDiv = t.createElement("div"), this.loadingIconDiv.className = "loadingIcon", i.appendChild(this.loadingIconDiv)
                },
                update: function(e, t) {
                    this.scale = e || this.scale, "undefined" != typeof t && (this.rotation = t);
                    var i = (this.rotation + this.pdfPageRotate) % 360;
                    this.viewport = this.viewport.clone({
                        scale: this.scale * m,
                        rotation: i
                    });
                    var r = !1;
                    if (this.canvas && PDFJS.maxCanvasPixels > 0) {
                        var s = this.canvas.getContext("2d"),
                            a = n(s),
                            o = this.viewport.width * this.viewport.height;
                        Math.sqrt(PDFJS.maxCanvasPixels / o);
                        (Math.floor(this.viewport.width) * a.sx | 0) * (Math.floor(this.viewport.height) * a.sy | 0) > PDFJS.maxCanvasPixels && (r = !0)
                    }
                    return this.canvas && (PDFJS.useOnlyCssZoom || this.hasRestrictedScaling && r) ? void this.cssTransform(this.canvas, !0) : (this.canvas && !this.zoomLayer && (this.zoomLayer = this.canvas.parentNode, this.zoomLayer.style.position = "absolute"), this.zoomLayer && this.cssTransform(this.zoomLayer.firstChild), void this.reset(!0))
                },
                updatePosition: function() {
                    this.textLayer && this.textLayer.render(T)
                },
                cssTransform: function(e, t) {
                    var i = this.viewport.width,
                        n = this.viewport.height,
                        r = this.div;
                    e.style.width = e.parentNode.style.width = r.style.width = Math.floor(i) + "px", e.style.height = e.parentNode.style.height = r.style.height = Math.floor(n) + "px";
                    var s = this.viewport.rotation - e._viewport.rotation,
                        a = Math.abs(s),
                        o = 1,
                        l = 1;
                    (90 === a || 270 === a) && (o = n / i, l = i / n);
                    var d = "rotate(" + s + "deg) scale(" + o + "," + l + ")";
                    if (E.setProp("transform", e, d), this.textLayer) {
                        var h = this.textLayer.viewport,
                            c = this.viewport.rotation - h.rotation,
                            u = Math.abs(c),
                            f = i / h.width;
                        (90 === u || 270 === u) && (f = i / h.height);
                        var g, p, v = this.textLayer.textLayerDiv;
                        switch (u) {
                            case 0:
                                g = p = 0;
                                break;
                            case 90:
                                g = 0, p = "-" + v.style.height;
                                break;
                            case 180:
                                g = "-" + v.style.width, p = "-" + v.style.height;
                                break;
                            case 270:
                                g = "-" + v.style.width, p = 0;
                                break;
                            default:
                                console.error("Bad rotation value.")
                        }
                        E.setProp("transform", v, "rotate(" + u + "deg) scale(" + f + ", " + f + ") translate(" + g + ", " + p + ")"), E.setProp("transformOrigin", v, "0% 0%")
                    }
                    t && this.annotationLayer && this.annotationLayer.setupAnnotations(this.viewport)
                },
                get width() {
                    return this.viewport.width
                },
                get height() {
                    return this.viewport.height
                },
                getPagePoint: function(e, t) {
                    return this.viewport.convertToPdfPoint(e, t)
                },
                draw: function() {
                    function e(e) {
                        if (S === b.renderTask && (b.renderTask = null), "cancelled" === e) return void v(e);
                        b.renderingState = I.FINISHED, b.loadingIconDiv && (s.removeChild(b.loadingIconDiv), delete b.loadingIconDiv), b.zoomLayer && (s.removeChild(b.zoomLayer), b.zoomLayer = null), b.error = e, b.stats = i.stats, b.onAfterDraw && b.onAfterDraw();
                        var n = t.createEvent("CustomEvent");
                        n.initCustomEvent("pagerendered", !0, !0, {
                            pageNumber: b.id
                        }), s.dispatchEvent(n);
                        var r = t.createEvent("CustomEvent");
                        r.initCustomEvent("pagerender", !0, !0, {
                            pageNumber: i.pageNumber
                        }), s.dispatchEvent(r), e ? v(e) : p(void 0)
                    }
                    this.renderingState !== I.INITIAL && console.error("Must be in new state before drawing"), this.renderingState = I.RUNNING;
                    var i = this.pdfPage,
                        r = this.viewport,
                        s = this.div,
                        a = t.createElement("div");
                    a.style.width = s.style.width, a.style.height = s.style.height, a.classList.add("canvasWrapper");
                    var o = t.createElement("canvas");
                    o.id = "page" + this.id, a.appendChild(o), this.annotationLayer ? s.insertBefore(a, this.annotationLayer.div) : s.appendChild(a), this.canvas = o;
                    var l = o.getContext("2d"),
                        d = n(l);
                    if (PDFJS.useOnlyCssZoom) {
                        var h = r.clone({
                            scale: m
                        });
                        d.sx *= h.width / r.width, d.sy *= h.height / r.height, d.scaled = !0
                    }
                    if (PDFJS.maxCanvasPixels > 0) {
                        var c = r.width * r.height,
                            u = Math.sqrt(PDFJS.maxCanvasPixels / c);
                        d.sx > u || d.sy > u ? (d.sx = u, d.sy = u, d.scaled = !0, this.hasRestrictedScaling = !0) : this.hasRestrictedScaling = !1
                    }
                    o.width = Math.floor(r.width) * d.sx | 0, o.height = Math.floor(r.height) * d.sy | 0, o.style.width = Math.floor(r.width) + "px", o.style.height = Math.floor(r.height) + "px", o._viewport = r;
                    var f = null,
                        g = null;
                    this.textLayerFactory && (f = t.createElement("div"), f.className = "textLayer", f.style.width = o.style.width, f.style.height = o.style.height, this.annotationLayer ? s.insertBefore(f, this.annotationLayer.div) : s.appendChild(f), g = this.textLayerFactory.createTextLayerBuilder(f, this.id - 1, this.viewport)), this.textLayer = g, l._scaleX = d.sx, l._scaleY = d.sy, d.scaled && l.scale(d.sx, d.sy);
                    var p, v, w = new Promise(function(e, t) {
                            p = e, v = t
                        }),
                        b = this,
                        P = null;
                    this.renderingQueue && (P = function(e) {
                        return b.renderingQueue.isHighestPriority(b) ? void e() : (b.renderingState = I.PAUSED, void(b.resume = function() {
                            b.renderingState = I.RUNNING, e()
                        }))
                    });
                    var y = {
                            canvasContext: l,
                            viewport: this.viewport,
                            continueCallback: P
                        },
                        S = this.renderTask = this.pdfPage.render(y);
                    return this.renderTask.promise.then(function() {
                        e(null), g && b.pdfPage.getTextContent().then(function(e) {
                            g.setTextContent(e), g.render(T)
                        })
                    }, function(t) {
                        e(t)
                    }), s.setAttribute("data-loaded", !0), b.onBeforeDraw && b.onBeforeDraw(), w
                },
                beforePrint: function() {
                    var e = this.pdfPage,
                        i = e.getViewport(1),
                        n = 2,
                        r = t.createElement("canvas");
                    r.width = Math.floor(i.width) * n, r.height = Math.floor(i.height) * n, r.style.width = n * i.width + "pt", r.style.height = n * i.height + "pt";
                    var s = "scale(" + 1 / n + ", " + 1 / n + ")";
                    E.setProp("transform", r, s), E.setProp("transformOrigin", r, "0% 0%");
                    var a = t.getElementById("printContainer"),
                        o = t.createElement("div");
                    o.style.width = i.width + "pt", o.style.height = i.height + "pt", o.appendChild(r), a.appendChild(o), r.mozPrintCallback = function(t) {
                        var s = t.context;
                        s.save(), s.fillStyle = "rgb(255, 255, 255)", s.fillRect(0, 0, r.width, r.height), s.restore(), s.scale(n, n);
                        var a = {
                            canvasContext: s,
                            viewport: i,
                            intent: "print"
                        };
                        e.render(a).promise.then(function() {
                            t.done()
                        }, function(e) {
                            console.error(e), "abort" in t ? t.abort() : t.done()
                        })
                    }
                }
            }, e
        }(),
        _ = 1e5,
        V = /\S/,
        M = function() {
            function e(e) {
                this.textLayerDiv = e.textLayerDiv, this.renderingDone = !1, this.divContentDone = !1, this.pageIdx = e.pageIndex, this.pageNumber = this.pageIdx + 1, this.matches = [], this.viewport = e.viewport, this.textDivs = [], this.findController = e.findController || null
            }
            return e.prototype = {
                _finishRendering: function() {
                    this.renderingDone = !0;
                    var e = t.createEvent("CustomEvent");
                    e.initCustomEvent("textlayerrendered", !0, !0, {
                        pageNumber: this.pageNumber
                    }), this.textLayerDiv.dispatchEvent(e)
                },
                renderLayer: function() {
                    var e = t.createDocumentFragment(),
                        i = this.textDivs,
                        n = i.length,
                        r = t.createElement("canvas"),
                        s = r.getContext("2d");
                    if (n > _) return void this._finishRendering();
                    for (var a, o, l = 0; n > l; l++) {
                        var d = i[l];
                        if (void 0 === d.dataset.isWhitespace) {
                            var h = d.style.fontSize,
                                c = d.style.fontFamily;
                            (h !== a || c !== o) && (s.font = h + " " + c, a = h, o = c);
                            var u = s.measureText(d.textContent).width;
                            if (u > 0) {
                                e.appendChild(d);
                                var f;
                                if (void 0 !== d.dataset.canvasWidth) {
                                    var g = d.dataset.canvasWidth / u;
                                    f = "scaleX(" + g + ")"
                                } else f = "";
                                var p = d.dataset.angle;
                                p && (f = "rotate(" + p + "deg) " + f), f && E.setProp("transform", d, f)
                            }
                        }
                    }
                    this.textLayerDiv.appendChild(e), this._finishRendering(), this.updateMatches()
                },
                render: function(e) {
                    if (this.divContentDone && !this.renderingDone)
                        if (this.renderTimer && (clearTimeout(this.renderTimer), this.renderTimer = null), e) {
                            var t = this;
                            this.renderTimer = setTimeout(function() {
                                t.renderLayer(), t.renderTimer = null
                            }, e)
                        } else this.renderLayer()
                },
                appendText: function(e, i) {
                    var n = i[e.fontName],
                        r = t.createElement("div");
                    if (this.textDivs.push(r), h(e.str)) return void(r.dataset.isWhitespace = !0);
                    var s = PDFJS.Util.transform(this.viewport.transform, e.transform),
                        a = Math.atan2(s[1], s[0]);
                    n.vertical && (a += Math.PI / 2);
                    var o = Math.sqrt(s[2] * s[2] + s[3] * s[3]),
                        l = o;
                    n.ascent ? l = n.ascent * l : n.descent && (l = (1 + n.descent) * l);
                    var d, c;
                    0 === a ? (d = s[4], c = s[5] - l) : (d = s[4] + l * Math.sin(a), c = s[5] - l * Math.cos(a)), r.style.left = d + "px", r.style.top = c + "px", r.style.fontSize = o + "px", r.style.fontFamily = n.fontFamily, r.textContent = e.str, PDFJS.pdfBug && (r.dataset.fontName = e.fontName), 0 !== a && (r.dataset.angle = a * (180 / Math.PI)), r.textContent.length > 1 && (n.vertical ? r.dataset.canvasWidth = e.height * this.viewport.scale : r.dataset.canvasWidth = e.width * this.viewport.scale)
                },
                setTextContent: function(e) {
                    this.textContent = e;
                    for (var t = e.items, i = 0, n = t.length; n > i; i++) this.appendText(t[i], e.styles);
                    this.divContentDone = !0
                },
                convertMatches: function(e) {
                    for (var t = 0, i = 0, n = this.textContent.items, r = n.length - 1, s = null === this.findController ? 0 : this.findController.state.query.length, a = [], o = 0, l = e.length; l > o; o++) {
                        for (var d = e[o]; t !== r && d >= i + n[t].str.length;) i += n[t].str.length, t++;
                        t === n.length && console.error("Could not find a matching mapping");
                        var h = {
                            begin: {
                                divIdx: t,
                                offset: d - i
                            }
                        };
                        for (d += s; t !== r && d > i + n[t].str.length;) i += n[t].str.length, t++;
                        h.end = {
                            divIdx: t,
                            offset: d - i
                        }, a.push(h)
                    }
                    return a
                },
                renderMatches: function(e) {
                    function i(e, t) {
                        var i = e.divIdx;
                        s[i].textContent = "", n(i, 0, e.offset, t)
                    }

                    function n(e, i, n, a) {
                        var o = s[e],
                            l = r[e].str.substring(i, n),
                            d = t.createTextNode(l);
                        if (a) {
                            var h = t.createElement("span");
                            return h.className = a, h.appendChild(d), void o.appendChild(h)
                        }
                        o.appendChild(d)
                    }
                    if (0 !== e.length) {
                        var r = this.textContent.items,
                            s = this.textDivs,
                            a = null,
                            o = this.pageIdx,
                            l = null === this.findController ? !1 : o === this.findController.selected.pageIdx,
                            d = null === this.findController ? -1 : this.findController.selected.matchIdx,
                            h = null === this.findController ? !1 : this.findController.state.highlightAll,
                            c = {
                                divIdx: -1,
                                offset: void 0
                            },
                            u = d,
                            f = u + 1;
                        if (h) u = 0, f = e.length;
                        else if (!l) return;
                        for (var g = u; f > g; g++) {
                            var p = e[g],
                                v = p.begin,
                                m = p.end,
                                w = l && g === d,
                                b = w ? " selected" : "";
                            if (this.findController && this.findController.updateMatchPosition(o, g, s, v.divIdx, m.divIdx), a && v.divIdx === a.divIdx ? n(a.divIdx, a.offset, v.offset) : (null !== a && n(a.divIdx, a.offset, c.offset), i(v)), v.divIdx === m.divIdx) n(v.divIdx, v.offset, m.offset, "highlight" + b);
                            else {
                                n(v.divIdx, v.offset, c.offset, "highlight begin" + b);
                                for (var P = v.divIdx + 1, y = m.divIdx; y > P; P++) s[P].className = "highlight middle" + b;
                                i(m, "highlight end" + b)
                            }
                            a = m
                        }
                        a && n(a.divIdx, a.offset, c.offset)
                    }
                },
                updateMatches: function() {
                    if (this.renderingDone) {
                        for (var e = this.matches, t = this.textDivs, i = this.textContent.items, n = -1, r = 0, s = e.length; s > r; r++) {
                            for (var a = e[r], o = Math.max(n, a.begin.divIdx), l = o, d = a.end.divIdx; d >= l; l++) {
                                var h = t[l];
                                h.textContent = i[l].str, h.className = ""
                            }
                            n = a.end.divIdx + 1
                        }
                        null !== this.findController && this.findController.active && (this.matches = this.convertMatches(null === this.findController ? [] : this.findController.pageMatches[this.pageIdx] || []), this.renderMatches(this.matches))
                    }
                }
            }, e
        }();
    c.prototype = {
        createTextLayerBuilder: function(e, t, i) {
            return new M({
                textLayerDiv: e,
                pageIndex: t,
                viewport: i
            })
        }
    };
    var R = {
            UNKNOWN: 0,
            NORMAL: 1,
            CHANGING: 2,
            FULLSCREEN: 3
        },
        B = !1,
        U = 10,
        O = function() {
            function i(e) {
                var t = [];
                this.push = function(i) {
                    var n = t.indexOf(i);
                    n >= 0 && t.splice(n, 1), t.push(i), t.length > e && t.shift().destroy()
                }, this.resize = function(i) {
                    for (e = i; t.length > e;) t.shift().destroy()
                }
            }

            function n(e) {
                this.container = e.container, this.viewer = e.viewer || e.container.firstElementChild, this.linkService = e.linkService || new k(this), this.removePageBorders = e.removePageBorders || !1, this.defaultRenderingQueue = !e.renderingQueue, this.defaultRenderingQueue ? (this.renderingQueue = new F, this.renderingQueue.setViewer(this)) : this.renderingQueue = e.renderingQueue, this.scroll = s(this.container, this._scrollUpdate.bind(this)), this.updateInProgress = !1, this.presentationModeState = R.UNKNOWN, this._resetView(), this.removePageBorders && this.viewer.classList.add("removePageBorders")
            }
            return n.prototype = {get pagesCount() {
                    return this.pages.length
                },
                getPageView: function(e) {
                    return this.pages[e]
                },
                get currentPageNumber() {
                    return this._currentPageNumber
                },
                set currentPageNumber(i) {
                    if (!this.pdfDocument) return void(this._currentPageNumber = i);
                    var n = t.createEvent("UIEvents");
                    return n.initUIEvent("pagechange", !0, !0, e, 0), n.updateInProgress = this.updateInProgress, i > 0 && i <= this.pagesCount ? (n.previousPageNumber = this._currentPageNumber, this._currentPageNumber = i, n.pageNumber = i, void this.container.dispatchEvent(n)) : (n.pageNumber = this._currentPageNumber, n.previousPageNumber = i, void this.container.dispatchEvent(n))
                },
                get currentScale() {
                    return this._currentScale
                },
                set currentScale(e) {
                    if (isNaN(e)) throw new Error("Invalid numeric scale");
                    return this.pdfDocument ? void this._setScale(e, !1) : (this._currentScale = e, void(this._currentScaleValue = e.toString()))
                },
                get currentScaleValue() {
                    return this._currentScaleValue
                },
                set currentScaleValue(e) {
                    return this.pdfDocument ? void this._setScale(e, !1) : (this._currentScale = isNaN(e) ? b : e, void(this._currentScaleValue = e))
                },
                get pagesRotation() {
                    return this._pagesRotation
                },
                set pagesRotation(e) {
                    this._pagesRotation = e;
                    for (var t = 0, i = this.pages.length; i > t; t++) {
                        var n = this.pages[t];
                        n.update(n.scale, e)
                    }
                    this._setScale(this._currentScaleValue, !0)
                },
                setDocument: function(e) {
                    if (this.pdfDocument && this._resetView(), this.pdfDocument = e, e) {
                        var i, n = e.numPages,
                            r = this.pagesRefMap = {},
                            s = this,
                            a = new Promise(function(e) {
                                i = e
                            });
                        this.pagesPromise = a, a.then(function() {
                            var e = t.createEvent("CustomEvent");
                            e.initCustomEvent("pagesloaded", !0, !0, {
                                pagesCount: n
                            }), s.container.dispatchEvent(e)
                        });
                        var o = !1,
                            l = null,
                            d = new Promise(function(e) {
                                l = e
                            });
                        this.onePageRendered = d;
                        var h = function(e) {
                                e.onBeforeDraw = function() {
                                    s._buffer.push(this)
                                }, e.onAfterDraw = function() {
                                    o || (o = !0, l())
                                }
                            },
                            c = e.getPage(1);
                        return this.firstPagePromise = c, c.then(function(a) {
                            var o = this._currentScale || 1,
                                l = a.getViewport(o * m);
                            this.viewportWidth = l.width;
                            for (var c = 1; n >= c; ++c) {
                                var u = null;
                                PDFJS.disableTextLayer || (u = this);
                                var f = new N({
                                    container: this.viewer,
                                    id: c,
                                    scale: o,
                                    defaultViewport: l.clone(),
                                    renderingQueue: this.renderingQueue,
                                    textLayerFactory: u,
                                    annotationsLayerFactory: this
                                });
                                h(f), this.pages.push(f)
                            }
                            d.then(function() {
                                if (PDFJS.disableAutoFetch) i();
                                else
                                    for (var t = n, a = 1; n >= a; ++a) e.getPage(a).then(function(e, n) {
                                        var a = s.pages[e - 1];
                                        a.pdfPage || a.setPdfPage(n);
                                        var o = n.ref.num + " " + n.ref.gen + " R";
                                        r[o] = e, t--, t || i()
                                    }.bind(null, a))
                            });
                            var g = t.createEvent("CustomEvent");
                            g.initCustomEvent("pagesinit", !0, !0, null), s.container.dispatchEvent(g), this.defaultRenderingQueue && this.update(), this.findController && this.findController.resolveFirstPage()
                        }.bind(this))
                    }
                },
                _resetView: function() {
                    this.pages = [], this._currentPageNumber = 1, this._currentScale = b, this._currentScaleValue = null, this._buffer = new i(U), this.location = null, this._pagesRotation = 0, this._pagesRequests = [];
                    for (var e = this.viewer; e.hasChildNodes();) e.removeChild(e.lastChild)
                },
                _scrollUpdate: function() {
                    if (0 !== this.pagesCount) {
                        this.update();
                        for (var e = 0, t = this.pages.length; t > e; e++) this.pages[e].updatePosition()
                    }
                },
                _setScaleDispatchEvent: function(i, n, r) {
                    var s = t.createEvent("UIEvents");
                    s.initUIEvent("scalechange", !0, !0, e, 0), s.scale = i, r && (s.presetValue = n), this.container.dispatchEvent(s)
                },
                _setScaleUpdatePages: function(e, t, i, n) {
                    if (this._currentScaleValue = t, e === this._currentScale) return void(n && this._setScaleDispatchEvent(e, t, !0));
                    for (var r = 0, s = this.pages.length; s > r; r++) this.pages[r].update(e);
                    if (this._currentScale = e, !i) {
                        var a, o = this._currentPageNumber,
                            l = this.presentationModeState === R.CHANGING || this.presentationModeState === R.FULLSCREEN;
                        !this.location || l || B || (o = this.location.pageNumber, a = [null, {
                            name: "XYZ"
                        }, this.location.left, this.location.top, null]), this.scrollPageIntoView(o, a)
                    }
                    this._setScaleDispatchEvent(e, t, n)
                },
                _setScale: function(e, t) {
                    if ("custom" !== e) {
                        var i = parseFloat(e);
                        if (i > 0) this._setScaleUpdatePages(i, e, t, !1);
                        else {
                            var n = this.pages[this._currentPageNumber - 1];
                            if (!n) return;
                            var r = this.presentationModeState === R.FULLSCREEN,
                                s = r || this.removePageBorders ? 0 : y,
                                a = r || this.removePageBorders ? 0 : S,
                                o = (this.container.clientWidth - s) / n.width * n.scale,
                                l = (this.container.clientHeight - a) / n.height * n.scale;
                            switch (e) {
                                case "page-actual":
                                    i = 1;
                                    break;
                                case "page-width":
                                    i = o;
                                    break;
                                case "page-height":
                                    i = l;
                                    break;
                                case "page-fit":
                                    i = Math.min(o, l);
                                    break;
                                case "auto":
                                    var d = n.width > n.height,
                                        h = d ? Math.min(l, o) : o;
                                    i = Math.min(P, h);
                                    break;
                                default:
                                    return void console.error("pdfViewSetScale: '" + e + "' is an unknown zoom value.")
                            }
                            this._setScaleUpdatePages(i, e, t, !0)
                        }
                    }
                },
                scrollPageIntoView: function(e, t) {
                    var i = this.pages[e - 1];
                    if (this.presentationModeState === R.FULLSCREEN) {
                        if (this.linkService.page !== i.id) return void(this.linkService.page = i.id);
                        t = null, this._setScale(this.currentScaleValue, !0)
                    }
                    if (!t) return void r(i.div);
                    var n, s, a = 0,
                        o = 0,
                        l = 0,
                        d = 0,
                        h = i.rotation % 180 === 0 ? !1 : !0,
                        c = (h ? i.height : i.width) / i.scale / m,
                        u = (h ? i.width : i.height) / i.scale / m,
                        f = 0;
                    switch (t[1].name) {
                        case "XYZ":
                            a = t[2], o = t[3], f = t[4], a = null !== a ? a : 0, o = null !== o ? o : u;
                            break;
                        case "Fit":
                        case "FitB":
                            f = "page-fit";
                            break;
                        case "FitH":
                        case "FitBH":
                            o = t[2], f = "page-width";
                            break;
                        case "FitV":
                        case "FitBV":
                            a = t[2], l = c, d = u, f = "page-height";
                            break;
                        case "FitR":
                            a = t[2], o = t[3], l = t[4] - a, d = t[5] - o;
                            var g = this.container,
                                p = this.removePageBorders ? 0 : y,
                                v = this.removePageBorders ? 0 : S;
                            n = (g.clientWidth - p) / l / m, s = (g.clientHeight - v) / d / m, f = Math.min(Math.abs(n), Math.abs(s));
                            break;
                        default:
                            return
                    }
                    if (f && f !== this.currentScale ? this.currentScaleValue = f : this.currentScale === b && (this.currentScaleValue = w), "page-fit" === f && !t[4]) return void r(i.div);
                    var P = [i.viewport.convertToViewportPoint(a, o), i.viewport.convertToViewportPoint(a + l, o + d)],
                        E = Math.min(P[0][0], P[1][0]),
                        x = Math.min(P[0][1], P[1][1]);
                    r(i.div, {
                        left: E,
                        top: x
                    })
                },
                _updateLocation: function(e) {
                    var t = this._currentScale,
                        i = this._currentScaleValue,
                        n = parseFloat(i) === t ? Math.round(1e4 * t) / 100 : i,
                        r = e.id,
                        s = "#page=" + r;
                    s += "&zoom=" + n;
                    var a = this.pages[r - 1],
                        o = this.container,
                        l = a.getPagePoint(o.scrollLeft - e.x, o.scrollTop - e.y),
                        d = Math.round(l[0]),
                        h = Math.round(l[1]);
                    s += "," + d + "," + h, this.location = {
                        pageNumber: r,
                        scale: n,
                        top: h,
                        left: d,
                        pdfOpenParams: s
                    }
                },
                update: function() {
                    var i = this._getVisiblePages(),
                        n = i.views;
                    if (0 !== n.length) {
                        this.updateInProgress = !0;
                        var r = Math.max(U, 2 * n.length + 1);
                        this._buffer.resize(r), this.renderingQueue.renderHighestPriority(i);
                        for (var s = this.currentPageNumber, a = i.first, o = 0, l = n.length, d = !1; l > o; ++o) {
                            var h = n[o];
                            if (h.percent < 100) break;
                            if (h.id === s) {
                                d = !0;
                                break
                            }
                        }
                        d || (s = n[0].id), this.presentationModeState !== R.FULLSCREEN && (this.currentPageNumber = s), this._updateLocation(a), this.updateInProgress = !1;
                        var c = t.createEvent("UIEvents");
                        c.initUIEvent("updateviewarea", !0, !0, e, 0), this.container.dispatchEvent(c)
                    }
                },
                containsElement: function(e) {
                    return this.container.contains(e)
                },
                focus: function() {
                    this.container.focus()
                },
                blur: function() {
                    this.container.blur()
                },
                get isHorizontalScrollbarEnabled() {
                    return this.presentationModeState === R.FULLSCREEN ? !1 : this.container.scrollWidth > this.container.clientWidth
                },
                _getVisiblePages: function() {
                    if (this.presentationModeState !== R.FULLSCREEN) return o(this.container, this.pages, !0);
                    var e = [],
                        t = this.pages[this._currentPageNumber - 1];
                    return e.push({
                        id: t.id,
                        view: t
                    }), {
                        first: t,
                        last: t,
                        views: e
                    }
                },
                cleanup: function() {
                    for (var e = 0, t = this.pages.length; t > e; e++) this.pages[e] && this.pages[e].renderingState !== I.FINISHED && this.pages[e].reset()
                },
                _ensurePdfPageLoaded: function(e) {
                    if (e.pdfPage) return Promise.resolve(e.pdfPage);
                    var t = e.id;
                    if (this._pagesRequests[t]) return this._pagesRequests[t];
                    var i = this.pdfDocument.getPage(t).then(function(i) {
                        return e.setPdfPage(i), this._pagesRequests[t] = null, i
                    }.bind(this));
                    return this._pagesRequests[t] = i, i
                },
                forceRendering: function(e) {
                    var t = e || this._getVisiblePages(),
                        i = this.renderingQueue.getHighestPriority(t, this.pages, this.scroll.down);
                    return i ? (this._ensurePdfPageLoaded(i).then(function() {
                        this.renderingQueue.renderView(i)
                    }.bind(this)), !0) : !1
                },
                getPageTextContent: function(e) {
                    return this.pdfDocument.getPage(e + 1).then(function(e) {
                        return e.getTextContent()
                    })
                },
                createTextLayerBuilder: function(e, t, i) {
                    var n = this.presentationModeState === R.FULLSCREEN;
                    return new M({
                        textLayerDiv: e,
                        pageIndex: t,
                        viewport: i,
                        findController: n ? null : this.findController
                    })
                },
                setFindController: function(e) {
                    this.findController = e
                }
            }, n
        }(),
        k = function() {
            function e(e) {
                this.pdfViewer = e
            }
            return e.prototype = {get page() {
                    return this.pdfViewer.currentPageNumber
                },
                set page(e) {
                    this.pdfViewer.currentPageNumber = e
                },
                navigateTo: function(e) {},
                getDestinationHash: function(e) {
                    return "#"
                },
                getAnchorUrl: function(e) {
                    return "#"
                },
                setHash: function(e) {},
                executeNamedAction: function(e) {}
            }, e
        }(),
        A = {
            overlays: {},
            active: null,
            register: function(e, i, n) {
                return new Promise(function(r) {
                    var s, a;
                    if (!(e && (s = t.getElementById(e)) && (a = s.parentNode))) throw new Error("Not enough parameters.");
                    if (this.overlays[e]) throw new Error("The overlay is already registered.");
                    this.overlays[e] = {
                        element: s,
                        container: a,
                        callerCloseMethod: i || null,
                        canForceClose: n || !1
                    }, r()
                }.bind(this))
            },
            unregister: function(e) {
                return new Promise(function(t) {
                    if (!this.overlays[e]) throw new Error("The overlay does not exist.");
                    if (this.active === e) throw new Error("The overlay cannot be removed while it is active.");
                    delete this.overlays[e], t()
                }.bind(this))
            },
            open: function(t) {
                return new Promise(function(i) {
                    if (!this.overlays[t]) throw new Error("The overlay does not exist.");
                    if (this.active) {
                        if (!this.overlays[t].canForceClose) throw this.active === t ? new Error("The overlay is already active.") : new Error("Another overlay is currently active.");
                        this._closeThroughCaller()
                    }
                    this.active = t, this.overlays[this.active].element.classList.remove("hidden"), this.overlays[this.active].container.classList.remove("hidden"), e.addEventListener("keydown", this._keyDown), i()
                }.bind(this))
            },
            close: function(t) {
                return new Promise(function(i) {
                    if (!this.overlays[t]) throw new Error("The overlay does not exist.");
                    if (!this.active) throw new Error("The overlay is currently not active.");
                    if (this.active !== t) throw new Error("Another overlay is currently active.");
                    this.overlays[this.active].container.classList.add("hidden"), this.overlays[this.active].element.classList.add("hidden"), this.active = null, e.removeEventListener("keydown", this._keyDown), i()
                }.bind(this))
            },
            _keyDown: function(e) {
                var t = A;
                t.active && 27 === e.keyCode && (t._closeThroughCaller(), e.preventDefault())
            },
            _closeThroughCaller: function() {
                this.overlays[this.active].callerCloseMethod && this.overlays[this.active].callerCloseMethod(), this.active && this.close(this.active)
            }
        },
        j = {
            overlayName: null,
            updatePassword: null,
            reason: null,
            passwordField: null,
            passwordText: null,
            passwordSubmit: null,
            passwordCancel: null,
            initialize: function(e) {
                this.overlayName = e.overlayName, this.passwordField = e.passwordField, this.passwordText = e.passwordText, this.passwordSubmit = e.passwordSubmit, this.passwordCancel = e.passwordCancel, this.passwordSubmit.addEventListener("click", this.verifyPassword.bind(this)), this.passwordCancel.addEventListener("click", this.close.bind(this)), this.passwordField.addEventListener("keydown", function(e) {
                    13 === e.keyCode && this.verifyPassword()
                }.bind(this)), A.register(this.overlayName, this.close.bind(this), !0)
            },
            open: function() {
                A.open(this.overlayName).then(function() {
                    this.passwordField.focus();
                    var e = Q.get("password_label", null, "Enter the password to open this PDF file.");
                    this.reason === PDFJS.PasswordResponses.INCORRECT_PASSWORD && (e = Q.get("password_invalid", null, "Invalid password. Please try again.")), this.passwordText.textContent = e
                }.bind(this))
            },
            close: function() {
                A.close(this.overlayName).then(function() {
                    this.passwordField.value = ""
                }.bind(this))
            },
            verifyPassword: function() {
                var e = this.passwordField.value;
                return e && e.length > 0 ? (this.close(), this.updatePassword(e)) : void 0
            }
        },
        z = 1.1,
        J = .25,
        W = 10,
        H = 5e3,
        Q = t.mozL10n || t.webL10n;
    PDFJS.cMapUrl = "../bcmaps/", PDFJS.cMapPacked = !0;
    var q = {
        initialized: !1,
        fellback: !1,
        pdfDocument: null,
        sidebarOpen: !1,
        printing: !1,
        pdfViewer: null,
        pdfRenderingQueue: null,
        updateScaleControls: !0,
        isInitialViewSet: !1,
        animationStartedPromise: null,
        mouseScrollTimeStamp: 0,
        mouseScrollDelta: 0,
        preferencePdfBugEnabled: !1,
        preferenceShowPreviousViewOnLoad: !0,
        preferenceDefaultZoomValue: "",
        isViewerEmbedded: e.parent !== e,
        url: "",
        initialize: function() {
            var e = new F;
            e.onIdle = this.cleanup.bind(this), this.pdfRenderingQueue = e;
            var i = t.getElementById("viewerContainer"),
                n = t.getElementById("viewer");
            this.pdfViewer = new O({
                container: i,
                viewer: n,
                renderingQueue: e,
                linkService: this
            }), e.setViewer(this.pdfViewer), L.initialize(), j.initialize({
                overlayName: "passwordOverlay",
                passwordField: t.getElementById("password"),
                passwordText: t.getElementById("passwordText"),
                passwordSubmit: t.getElementById("passwordSubmit"),
                passwordCancel: t.getElementById("passwordCancel")
            });
            var r = this,
                s = Promise.all([L.get("enableWebGL").then(function(e) {
                    PDFJS.disableWebGL = !e
                }), L.get("sidebarViewOnLoad").then(function(e) {
                    r.preferenceSidebarViewOnLoad = e
                }), L.get("pdfBugEnabled").then(function(e) {
                    r.preferencePdfBugEnabled = e
                }), L.get("showPreviousViewOnLoad").then(function(e) {
                    r.preferenceShowPreviousViewOnLoad = e
                }), L.get("defaultZoomValue").then(function(e) {
                    r.preferenceDefaultZoomValue = e
                }), L.get("disableTextLayer").then(function(e) {
                    PDFJS.disableTextLayer !== !0 && (PDFJS.disableTextLayer = e)
                }), L.get("disableRange").then(function(e) {
                    PDFJS.disableRange !== !0 && (PDFJS.disableRange = e)
                }), L.get("disableAutoFetch").then(function(e) {
                    PDFJS.disableAutoFetch = e
                }), L.get("disableFontFace").then(function(e) {
                    PDFJS.disableFontFace !== !0 && (PDFJS.disableFontFace = e)
                }), L.get("useOnlyCssZoom").then(function(e) {
                    PDFJS.useOnlyCssZoom = e
                })])["catch"](function(e) {});
            return s.then(function() {
                q.initialized = !0
            })
        },
        zoomIn: function(e) {
            var t = this.pdfViewer.currentScale;
            do t = (t * z).toFixed(2), t = Math.ceil(10 * t) / 10, t = Math.min(W, t); while (--e && W > t);
            this.setScale(t, !0), g()
        },
        zoomOut: function(e) {
            var t = this.pdfViewer.currentScale;
            do t = (t / z).toFixed(2), t = Math.floor(10 * t) / 10, t = Math.max(J, t); while (--e && t > J);
            this.setScale(t, !0), g()
        },
        get currentScaleValue() {
            return this.pdfViewer.currentScaleValue
        },
        get pagesCount() {
            return this.pdfDocument.numPages
        },
        set page(e) {
            this.pdfViewer.currentPageNumber = e
        },
        get page() {
            return this.pdfViewer.currentPageNumber
        },
        get supportsPrinting() {
            t.createElement("canvas");
            return !0
        },
        get supportsDocumentColors() {
            var e = !0;
            return PDFJS.shadow(this, "supportsDocumentColors", e)
        },
        get loadingBar() {
            var e = new x("#loadingBar", {});
            return PDFJS.shadow(this, "loadingBar", e)
        },
        setTitleUsingUrl: function(e) {
            this.url = e;
            try {
                this.setTitle(decodeURIComponent(i(e)) || e)
            } catch (t) {
                this.setTitle(e)
            }
        },
        setTitle: function(e) {
            this.isViewerEmbedded || (t.title = e)
        },
        close: function() {
            var e = t.getElementById("errorWrapper");
            e.setAttribute("hidden", "true"), this.pdfDocument && (this.pdfDocument.destroy(), this.pdfDocument = null, this.pdfViewer.setDocument(null), "undefined" != typeof PDFBug && PDFBug.cleanup())
        },
        open: function(t, i, n, r, s) {
            function a(e) {
                d.progress(e.loaded / e.total)
            }
            this.pdfDocument && L.reload(), this.close();
            var o = {
                password: n
            };
            if ("string" == typeof t ? (this.setTitleUsingUrl(t), o.url = t) : t && "byteLength" in t ? o.data = t : t.url && t.originalUrl && (this.setTitleUsingUrl(t.originalUrl), o.url = t.url), s)
                for (var l in s) o[l] = s[l];
            var d = this;
            d.loading = !0, d.downloadComplete = !1;
            var h = function(e, t) {
                j.updatePassword = e, j.reason = t, j.open()
            };
            PDFJS.getDocument(o, r, h, a).then(function(e) {
                d.load(e, i), d.loading = !1
            }, function(t) {
                var i = t && t.message,
                    n = Q.get("loading_error", null, "An error occurred while loading the PDF.");
                t instanceof PDFJS.InvalidPDFException ? n = Q.get("invalid_file_error", null, "Invalid or corrupted PDF file.") : t instanceof PDFJS.MissingPDFException ? n = Q.get("missing_file_error", null, "Missing PDF file.") : t instanceof PDFJS.UnexpectedResponseException && (n = Q.get("unexpected_response_error", null, "Unexpected server response."));
                var r = {
                    message: i
                };
                parent !== e && "function" == typeof e.postMessage ? parent.window.postMessage(n, "*") : (d.error(n, r), d.loading = !1)
            })
        },
        download: function() {
            function e() {
                n.downloadUrl(t, i)
            }
            var t = this.url.split("#")[0],
                i = d(t),
                n = new C;
            return n.onerror = function(e) {
                q.error("PDF failed to download.")
            }, this.pdfDocument && this.downloadComplete ? void this.pdfDocument.getData().then(function(e) {
                var r = PDFJS.createBlob(e, "application/pdf");
                n.download(r, t, i)
            }, e).then(null, e) : void e()
        },
        fallback: function(e) {},
        getAnchorUrl: function(e) {
            return e
        },
        error: function(e, i) {
            var n = Q.get("error_version_info", {
                version: PDFJS.version || "?",
                build: PDFJS.build || "?"
            }, "PDF.js v{{version}} (build: {{build}})") + "\n";
            i && (n += Q.get("error_message", {
                message: i.message
            }, "Message: {{message}}"), i.stack ? n += "\n" + Q.get("error_stack", {
                stack: i.stack
            }, "Stack: {{stack}}") : (i.filename && (n += "\n" + Q.get("error_file", {
                file: i.filename
            }, "File: {{file}}")), i.lineNumber && (n += "\n" + Q.get("error_line", {
                line: i.lineNumber
            }, "Line: {{line}}"))));
            var r = t.getElementById("errorWrapper");
            r.removeAttribute("hidden");
            var s = t.getElementById("errorMessage");
            s.textContent = e;
            var a = t.getElementById("errorClose");
            a.onclick = function() {
                r.setAttribute("hidden", "true")
            };
            var o = t.getElementById("errorMoreInfo"),
                d = t.getElementById("errorShowMore"),
                h = t.getElementById("errorShowLess");
            d.onclick = function() {
                o.removeAttribute("hidden"), d.setAttribute("hidden", "true"), h.removeAttribute("hidden"), o.style.height = o.scrollHeight + "px"
            }, h.onclick = function() {
                o.setAttribute("hidden", "true"), d.removeAttribute("hidden"), h.setAttribute("hidden", "true")
            }, d.oncontextmenu = l, h.oncontextmenu = l, a.oncontextmenu = l, d.removeAttribute("hidden"), h.setAttribute("hidden", "true"), o.value = n
        },
        progress: function(e) {
            var t = Math.round(100 * e);
            (t > this.loadingBar.percent || isNaN(t)) && (this.loadingBar.percent = t, PDFJS.disableAutoFetch && t && (this.disableAutoFetchLoadingBarTimeout && (clearTimeout(this.disableAutoFetchLoadingBarTimeout), this.disableAutoFetchLoadingBarTimeout = null), this.loadingBar.show(), this.disableAutoFetchLoadingBarTimeout = setTimeout(function() {
                this.loadingBar.hide(), this.disableAutoFetchLoadingBarTimeout = null
            }.bind(this), H)))
        },
        load: function(i, n) {
            var r = this;
            n = n || b, this.pdfDocument = i;
            var s = i.getDownloadInfo().then(function() {
                    r.downloadComplete = !0, r.loadingBar.hide(), t.querySelector(".toolbar").style.opacity = 1
                }),
                a = (i.numPages, this.documentFingerprint = i.fingerprint, this.pdfViewer);
            a.currentScale = n, a.setDocument(i);
            var o = a.firstPagePromise,
                l = a.pagesPromise;
            a.onePageRendered;
            this.isInitialViewSet = !1, this.pagesRefMap = a.pagesRefMap, o.then(function(i) {
                s.then(function() {
                    var i = t.createEvent("CustomEvent");
                    i.initCustomEvent("documentload", !0, !0, {}), e.dispatchEvent(i)
                }), r.loadingBar.setWidth(t.getElementById("viewer")), r.setInitialView(null, n)
            }), l.then(function() {
                r.supportsPrinting && i.getJavaScript().then(function(t) {
                    t.length && (console.warn("Warning: JavaScript is not supported"), r.fallback(PDFJS.UNSUPPORTED_FEATURES.javaScript));
                    for (var i = /\bprint\s*\(/g, n = 0, s = t.length; s > n; n++) {
                        var a = t[n];
                        if (a && i.test(a)) return void setTimeout(function() {
                            e.print()
                        })
                    }
                })
            }), i.getMetadata().then(function(e) {
                var n = e.info,
                    s = e.metadata;
                r.documentInfo = n, r.metadata = s, console.log("PDF " + i.fingerprint + " [" + n.PDFFormatVersion + " " + (n.Producer || "-").trim() + " / " + (n.Creator || "-").trim() + "] (PDF.js: " + (PDFJS.version || "-") + (PDFJS.disableWebGL ? "" : " [WebGL]") + ")");
                var a;
                if (s && s.has("dc:title")) {
                    var o = s.get("dc:title");
                    "Untitled" !== o && (a = o)
                }!a && n && n.Title && (a = n.Title), a && r.setTitle(a + " - " + t.title), n.IsAcroFormPresent && (console.warn("Warning: AcroForm/XFA is not supported"), r.fallback(PDFJS.UNSUPPORTED_FEATURES.forms))
            })
        },
        setInitialView: function(e, i) {
            this.isInitialViewSet = !0, this.setScale(i, !0), this.page = 1;
            var n = t.location.search.substring(1),
                r = q.parseQueryString(n);
            if (r.width) {
                var s = r.width / this.pdfViewer.viewportWidth;
                this.setScale(s, !0)
            }
            this.pdfViewer.currentScale === b && this.setScale(w, !0)
        },
        cleanup: function() {
            this.pdfViewer.cleanup(), this.pdfDocument.cleanup()
        },
        forceRendering: function() {
            this.pdfRenderingQueue.printing = this.printing, this.pdfRenderingQueue.isThumbnailViewEnabled = this.sidebarOpen, this.pdfRenderingQueue.renderHighestPriority()
        },
        parseQueryString: function(e) {
            for (var t = e.split("&"), i = {}, n = 0, r = t.length; r > n; ++n) {
                var s = t[n].split("="),
                    a = s[0].toLowerCase(),
                    o = s.length > 1 ? s[1] : null;
                o = o.replace(/\/$/g, ""), i[decodeURIComponent(a)] = decodeURIComponent(o)
            }
            return i
        },
        beforePrint: function() {
            if (!this.supportsPrinting) {
                var i = Q.get("printing_not_supported", null, "Warning: Printing is not fully supported by this browser.");
                return void this.error(i)
            }
            var n, r, s = !1;
            if (this.pagesCount) {
                for (n = 0, r = this.pagesCount; r > n; ++n)
                    if (!this.pdfViewer.getPageView(n).pdfPage) {
                        s = !0;
                        break
                    }
            } else s = !0;
            if (s) {
                var a = Q.get("printing_not_ready", null, "Warning: The PDF is not fully loaded for printing.");
                return void e.alert(a)
            }
            this.printing = !0, this.forceRendering();
            var o = t.querySelector("body");
            for (o.setAttribute("data-mozPrintCallback", !0), n = 0, r = this.pagesCount; r > n; ++n) this.pdfViewer.getPageView(n).beforePrint()
        },
        afterPrint: function() {
            for (var e = t.getElementById("printContainer"); e.hasChildNodes();) e.removeChild(e.lastChild);
            this.printing = !1, this.forceRendering()
        },
        setScale: function(e, t) {
            this.updateScaleControls = !!t, this.pdfViewer.currentScaleValue = e, this.updateScaleControls = !0
        },
        mouseScroll: function(e) {
            var t = 50,
                i = (new Date).getTime(),
                n = this.mouseScrollTimeStamp;
            if (!(i > n && t > i - n)) {
                (this.mouseScrollDelta > 0 && 0 > e || this.mouseScrollDelta < 0 && e > 0) && this.clearMouseScrollState(), this.mouseScrollDelta += e;
                var r = 120;
                if (Math.abs(this.mouseScrollDelta) >= r) {
                    var s = {
                            UP: -1,
                            DOWN: 1
                        },
                        a = this.mouseScrollDelta > 0 ? s.UP : s.DOWN;
                    this.clearMouseScrollState();
                    var o = this.page;
                    if (1 === o && a === s.UP || o === this.pagesCount && a === s.DOWN) return;
                    this.page += a, this.mouseScrollTimeStamp = i
                }
            }
        },
        clearMouseScrollState: function() {
            this.mouseScrollTimeStamp = 0, this.mouseScrollDelta = 0
        }
    };
    t.addEventListener("pagerendered", function(e) {
            var t = e.detail.pageNumber,
                i = t - 1,
                n = q.pdfViewer.getPageView(i);
            PDFJS.pdfBug && Stats.enabled && n.stats && Stats.add(t, n.stats), n.error && q.error(Q.get("rendering_error", null, "An error occurred while rendering the page."), n.error)
        }, !0), t.addEventListener("textlayerrendered", function(e) {
            var t = e.detail.pageNumber - 1;
            q.pdfViewer.getPageView(t)
        }, !0), e.addEventListener("updateviewarea", function() {
            if (q.initialized) {
                q.pdfViewer.location, q.pdfViewer.getPageView(q.page - 1)
            }
        }, !0), e.addEventListener("resize", function(e) {
            q.initialized && q.setScale(1, !1), g()
        }), e.addEventListener("change", function(e) {
            var i = e.target.files;
            if (i && 0 !== i.length) {
                var n = i[0];
                if (!PDFJS.disableCreateObjectURL && "undefined" != typeof URL && URL.createObjectURL) q.open(URL.createObjectURL(n), 0);
                else {
                    var r = new FileReader;
                    r.onload = function(e) {
                        var t = e.target.result,
                            i = new Uint8Array(t);
                        q.open(i, 0)
                    }, r.readAsArrayBuffer(n)
                }
                q.setTitleUsingUrl(n.name), t.getElementById("download").setAttribute("hidden", "true")
            }
        }, !0), e.addEventListener("localized", function(e) {
            t.getElementsByTagName("html")[0].dir = Q.getDirection()
        }, !0), e.addEventListener("scalechange", function(e) {
            t.getElementById("zoomOut").disabled = e.scale === J, t.getElementById("zoomIn").disabled = e.scale === W
        }, !0), e.addEventListener("pagechange", function(e) {
            var t = e.pageNumber;
            q.pagesCount;
            if (PDFJS.pdfBug && Stats.enabled) {
                var i = q.pdfViewer.getPageView(t - 1);
                i.stats && Stats.add(t, i.stats)
            }
            e.updateInProgress || this.loading && 1 === t || q.pdfViewer.scrollPageIntoView(t)
        }, !0), e.addEventListener("DOMMouseScroll", p), e.addEventListener("mousewheel", p), e.addEventListener("beforeprint", function(e) {
            q.beforePrint()
        }), e.addEventListener("afterprint", function(e) {
            q.afterPrint()
        }),
        function() {
            q.animationStartedPromise = new Promise(function(t) {
                e.requestAnimationFrame(t)
            })
        }(), e.addEventListener("DOMContentLoaded", u, !0)
}(window, document);