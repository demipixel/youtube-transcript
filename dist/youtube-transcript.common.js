'use strict';Object.defineProperty(exports,'__esModule',{value:true});var Axios=require('axios');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Axios__default=/*#__PURE__*/_interopDefaultLegacy(Axios);/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}var RE_YOUTUBE = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
var YoutubeTranscriptError = /** @class */ (function (_super) {
    __extends(YoutubeTranscriptError, _super);
    function YoutubeTranscriptError(message) {
        return _super.call(this, "[YoutubeTranscript] \uD83D\uDEA8 " + message) || this;
    }
    return YoutubeTranscriptError;
}(Error));
/**
 * Class to retrieve transcript if exist
 */
var YoutubeTranscript = /** @class */ (function () {
    function YoutubeTranscript() {
    }
    /**
     * Fetch transcript from YTB Video
     * @param videoId Video url or video identifier
     * @param config Get transcript in another country and language ISO
     */
    YoutubeTranscript.fetchTranscript = function (videoId, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var axiosClient, identifier, videoPageBody, innerTubeApiKey, body, transcripts, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        axiosClient = ((_a = config === null || config === void 0 ? void 0 : config.AxiosClient) !== null && _a !== void 0 ? _a : Axios__default['default']);
                        identifier = this.retrieveVideoId(videoId);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, axiosClient("https://www.youtube.com/watch?v=" + identifier)];
                    case 2:
                        videoPageBody = (_b.sent()).data;
                        innerTubeApiKey = videoPageBody
                            .toString()
                            .split('"INNERTUBE_API_KEY":"')[1]
                            .split('"')[0];
                        if (!(innerTubeApiKey && innerTubeApiKey.length > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, axiosClient({
                                url: "https://www.youtube.com/youtubei/v1/get_transcript?key=" + innerTubeApiKey,
                                method: 'POST',
                                data: this.generateRequest(videoPageBody.toString(), config),
                            })];
                    case 3:
                        body = (_b.sent()).data;
                        if (body.responseContext) {
                            if (!body.actions) {
                                throw new Error('Transcript is disabled on this video');
                            }
                            transcripts = body.actions[0].updateEngagementPanelAction.content
                                .transcriptRenderer.body.transcriptBodyRenderer.cueGroups;
                            return [2 /*return*/, transcripts.map(function (cue) { return ({
                                    text: cue.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer
                                        .cue.simpleText,
                                    duration: parseInt(cue.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer
                                        .durationMs),
                                    offset: parseInt(cue.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer
                                        .startOffsetMs),
                                }); })];
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _b.sent();
                        throw new YoutubeTranscriptError(e_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generate tracking params for YTB API
     * @param page
     * @param config
     */
    YoutubeTranscript.generateRequest = function (page, config) {
        var _a, _b, _c, _d;
        var params = (_a = page.split('"serializedShareEntity":"')[1]) === null || _a === void 0 ? void 0 : _a.split('"')[0];
        var visitorData = (_b = page.split('"VISITOR_DATA":"')[1]) === null || _b === void 0 ? void 0 : _b.split('"')[0];
        var sessionId = (_c = page.split('"sessionId":"')[1]) === null || _c === void 0 ? void 0 : _c.split('"')[0];
        var clickTrackingParams = (_d = page === null || page === void 0 ? void 0 : page.split('"clickTrackingParams":"')[1]) === null || _d === void 0 ? void 0 : _d.split('"')[0];
        return {
            context: {
                client: {
                    hl: (config === null || config === void 0 ? void 0 : config.lang) || 'fr',
                    gl: (config === null || config === void 0 ? void 0 : config.country) || 'FR',
                    visitorData: visitorData,
                    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)',
                    clientName: 'WEB',
                    clientVersion: '2.20200925.01.00',
                    osName: 'Macintosh',
                    osVersion: '10_15_4',
                    browserName: 'Chrome',
                    browserVersion: '85.0f.4183.83',
                    screenWidthPoints: 1440,
                    screenHeightPoints: 770,
                    screenPixelDensity: 2,
                    utcOffsetMinutes: 120,
                    userInterfaceTheme: 'USER_INTERFACE_THEME_LIGHT',
                    connectionType: 'CONN_CELLULAR_3G',
                },
                request: {
                    sessionId: sessionId,
                    internalExperimentFlags: [],
                    consistencyTokenJars: [],
                },
                user: {},
                clientScreenNonce: this.generateNonce(),
                clickTracking: {
                    clickTrackingParams: clickTrackingParams,
                },
            },
            params: params,
        };
    };
    /**
     *  'base.js' function
     */
    YoutubeTranscript.generateNonce = function () {
        var rnd = Math.random().toString();
        var alphabet = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghjijklmnopqrstuvwxyz0123456789';
        var jda = [
            alphabet + '+/=',
            alphabet + '+/',
            alphabet + '-_=',
            alphabet + '-_.',
            alphabet + '-_',
        ];
        var b = jda[3];
        var a = [];
        for (var i = 0; i < rnd.length - 1; i++) {
            a.push(rnd[i].charCodeAt(i));
        }
        var c = '';
        var d = 0;
        var m, n, q, r, f, g;
        while (d < a.length) {
            f = a[d];
            g = d + 1 < a.length;
            if (g) {
                m = a[d + 1];
            }
            else {
                m = 0;
            }
            n = d + 2 < a.length;
            if (n) {
                q = a[d + 2];
            }
            else {
                q = 0;
            }
            r = f >> 2;
            f = ((f & 3) << 4) | (m >> 4);
            m = ((m & 15) << 2) | (q >> 6);
            q &= 63;
            if (!n) {
                q = 64;
                if (!q) {
                    m = 64;
                }
            }
            c += b[r] + b[f] + b[m] + b[q];
            d += 3;
        }
        return c;
    };
    /**
     * Retrieve video id from url or string
     * @param videoId video url or video id
     */
    YoutubeTranscript.retrieveVideoId = function (videoId) {
        if (videoId.length === 11) {
            return videoId;
        }
        var matchId = videoId.match(RE_YOUTUBE);
        if (matchId && matchId.length) {
            return matchId[1];
        }
        throw new YoutubeTranscriptError('Impossible to retrieve Youtube video ID.');
    };
    return YoutubeTranscript;
}());exports.YoutubeTranscript=YoutubeTranscript;exports.YoutubeTranscriptError=YoutubeTranscriptError;