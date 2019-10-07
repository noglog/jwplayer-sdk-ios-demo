function jwIsLocalUrl(t){return t&&t.toLowerCase().startsWith("file://")}var jwcallbacks={},jwXhrCallbacks={},jwOldOpen=window.XMLHttpRequest.prototype.open,jwOldSend=window.XMLHttpRequest.prototype.send;window.XMLHttpRequest.prototype.open=function(){var t=arguments[1];return jwIsLocalUrl(t)?void(this.jwRequestedUrl=t):jwOldOpen.apply(this,[].slice.call(arguments))},window.XMLHttpRequest.prototype.send=function(){var t=this.jwRequestedUrl;if(!jwIsLocalUrl(t))return jwOldSend.apply(this,[].slice.call(arguments));var e=function(t){var e=Object.create(this);Object.defineProperties(e,{readyState:{get:function(){return t.readyState},enumerable:!0},status:{get:function(){return t.status},enumerable:!0},responseXML:{get:function(){return t.responseXML},enumerable:!0},responseType:{get:function(){return t.responseType},enumerable:!0},responseText:{get:function(){return t.responseText},enumerable:!0}});var i={currentTarget:e,target:e};t.responseText?this.onreadystatechange(i):this.onerror(i)}.bind(this),i=Math.random().toString(36).substr(2,9);jwXhrCallbacks[i]=e,SDKRouter.parseLocalFile(t,i)},window.jwOnLocalFileParsed=function(t,e){jwXhrCallbacks[t](e),delete jwXhrCallbacks[t]},window.jwTriggerEvent=function(){var t=arguments[0],e=arguments[1],i=jwcallbacks[t][e];if(2==arguments.length)i();else{var s=[];Array.prototype.push.apply(s,arguments),s.shift(),s.shift(),i.apply(null,s)}},window.jwOn=function(t,e,i){void 0===jwcallbacks[t]&&(jwcallbacks[t]=[]),void 0===jwcallbacks[t][e]&&jwcallbacks[t].push(e),jwcallbacks[t][e]=i},window.jwOff=function(t,e){jwcallbacks[t][e]=null},window.jwAdjustFullscreenForIPhoneXSeries=function(t){const e=jwplayer(),i=e.getContainer();if(i){const s=i.querySelector(".jw-controls");s&&s.setAttribute("style",t+"background-color: transparent;");const r=i.querySelector(".jw-related.jw-overlay");r&&r.setAttribute("style",t)}},function(t){function e(e,h){function d(){}function l(){}var _=t(e).Events;i.extend(this,_,{_position:0,_currentTime:0,_duration:0,_restorePosition:-1,_beforecompleted:!1,_attached:!0,_canSeek:!0,_currentQuality:-1,_levels:[],_currentAudioTrack:-1,_audioTracks:[],_captionsList:[],_currentCaptions:-1,_providerId:"id-"+c++,_previouslyLoadedItem:null,_currentItem:null,_currentFile:"",_seekableRange:{},supportsPlaybackRate:!0,_currentPlaybackRate:1},{init:function(t){if(this._attached)if(this._levels=t.sources,this._currentQuality=this._pickInitialQuality(t.sources),this._position=t.starttime||0,this._currentTime=this._position,this._duration=t.duration||0,"instream"===t.adType){var e=Object.assign({},t);delete e.vastAd,e.preload="none",this._completeLoad(e)}else t.preload&&"none"==t.preload||this._completeLoad(t)},play:function(){if(this._attached){var t=this._previouslyLoadedItem;return!this._currentItem&&t&&this.load(t),a.play(),Promise.resolve()}},pause:function(){if(this._attached)return a.pause(),Promise.resolve()},load:function(t){if(this._attached)return this.sendMediaType(t.sources),this.setState(n.LOADING),t.starttime=this._restorePosition,this._completeLoad(t),this._restorePosition=-1,Promise.resolve()},stop:function(){if(this._attached)return a.stop(),this._unloadPlaylistItem(),this.setState(n.IDLE),Promise.resolve()},seek:function(t){if(this._attached)return this.trigger(r.JWPLAYER_MEDIA_SEEK,{position:this._position,offset:t}),a.seek(t),Promise.resolve()},fastSeek:function(t){if(this._attached)return this.trigger(r.JWPLAYER_MEDIA_SEEK,{position:this._position,offset:t}),a.fastSeek(t),Promise.resolve()},setVisibility:d,setContainer:l,supportsFullscreen:s.constant(!0),getName:function(){return{name:u}},getCurrentTime:function(){return this._currentTime},getQualityLevels:function(){return this._levels},getCurrentQuality:function(){return this._currentQuality},setCurrentQuality:function(t){var e=this._currentItem;if(e&&this._hasMultipleSources(e)&&this._currentQuality!==t&&!(t<0)){var i=this._levels;if(i&&i.length>t){this._currentQuality=t,this.trigger(r.JWPLAYER_MEDIA_LEVEL_CHANGED,{currentQuality:t,levels:this._getPublicLevels(i)});var s=i[t];s.starttime=this._position,a.load(s,this._providerId)}}},getPlaybackRate:function(){return this._currentPlaybackRate},setPlaybackRate:function(t){this._currentPlaybackRate!==t&&(a.setPlaybackRate(t),this._currentPlaybackRate=t)},getAudioTracks:function(){return this._audioTracks},getCurrentAudioTrack:function(){return this._currentAudioTrack},setCurrentAudioTrack:function(t){if(this._audioTracks.length>0){if(this._currentAudioTrack===t)return;t>=0&&this._audioTracks&&this._audioTracks.length>t&&(a.setCurrentAudioTrack(t),this._currentAudioTrack=t)}},getCaptionsList:function(){return this._captionsList},getCurrentCaptions:function(){return this._currentCaptions},setSubtitlesTrack:function(t){a.setCurrentEmbeddedCaption(t),this._currentCaptions=t},checkComplete:function(){return this._beforecompleted},attachMedia:function(t){this._attached=!0,this._restorePosition=this._position,t||(this._canSeek=!1),this._beforecompleted&&this._playbackComplete()},detachMedia:function(){return this._attached=!1,this._currentItem=null,this._currentFile="",a}},{sdkItemLoaded:function(t){this._attached&&(this._position=t,this._currentTime=t,this._duration=0,this.trigger(r.JWPLAYER_MEDIA_BUFFER_FULL))},sdkStateChanged:function(t){if(this._attached)if(t=o[t],inBeforeCompleteState=t==n.COMPLETE&&this.state!==n.IDLE&&this.state!==n.COMPLETE,inBeforeCompleteState){if(this._beforecompleted=!0,!this._attached)return;this._playbackComplete()}else this.setState(t),t===n.PLAYING&&this.trigger(r.JWPLAYER_PROVIDER_FIRST_FRAME,{})},sdkTimeChanged:function(t,e,i){this._attached&&(this._position=t,this._duration=i,this._currentTime=e,this.trigger(r.JWPLAYER_MEDIA_TIME,{position:t,duration:i,currentTime:e,seekRange:this._seekableRange}))},sdkStartOnSeek:function(t){this._attached&&(this._position=t,this._currentTime=t,this._restorePosition=t)},sdkMetadata:function(t){t.seekRange=this._seekableRange,this.trigger(r.JWPLAYER_MEDIA_META,{metadata:t})},sdkBufferChange:function(t){this.trigger(r.JWPLAYER_MEDIA_BUFFER,{bufferPercent:t,position:this._position,duration:this._duration,currentTime:this._currentTime,seekRange:this._seekableRange})},sdkFirstFrame:function(){this.trigger(r.JWPLAYER_PROVIDER_FIRST_FRAME,{})},sdkQualityLevels:function(t,e){this._levels=t,this.trigger(r.JWPLAYER_MEDIA_LEVELS,{levels:t,currentQuality:e})},sdkQualityChanged:function(t,e){this.trigger(r.JWPLAYER_MEDIA_LEVEL_CHANGED,{currentQuality:e,levels:t})},sdkSeeked:function(t){this._position=t,this._currentTime=t,this.trigger(r.JWPLAYER_MEDIA_TIME,{position:t,duration:this._duration,currentTime:t,seekRange:this._seekableRange}),this.trigger(r.JWPLAYER_MEDIA_SEEKED,{position:t})},sdkSeekableRangeChanged:function(t,e){this._seekableRange={start:t,end:e}},sdkAudioTracks:function(t,e){this._setAudioTracks(t,e),this._audioTracks=t,this.trigger(r.JWPLAYER_AUDIO_TRACKS,{tracks:t,currentTrack:e})},sdkAudioTrackChange:function(t,e){this.trigger(r.JWPLAYER_AUDIO_TRACK_CHANGED,{tracks:t,currentTrack:e})},sdkPlaybackRateChanged:function(t){this.trigger("ratechange",{playbackRate:t})},sdkCaptionsList:function(t,e){this._setCaptionsList(t,e),this.trigger("subtitlesTracks",{tracks:t,track:e})},sdkError:function(t){this.trigger(r.JWPLAYER_MEDIA_ERROR,{message:t})},sdkCastingChanged:function(e){i.toggleClass(t().getContainer(),"jw-flag-casting",e)},sdkWarning:function(t){this.trigger("warning",{message:t})}},{_getPublicLevels:function(t){var e;return e=s.map(t,function(t,e){return{label:t.label||e}})},_setLevels:function(t){t=t&&t.length>0?t:[],this._levels=t,this._currentQuality=this._pickInitialQuality(t);var e=this._getPublicLevels(t);e&&this.trigger(r.JWPLAYER_MEDIA_LEVELS,{levels:e,currentQuality:this._currentQuality})},_pickInitialQuality:function(t){var e=Math.max(0,this._currentQuality),i=h.qualityLabel;if(t)for(var s=0;s<t.length;s++)if(t[s].default&&(e=s),i&&t[s].label===i)return s;return e},_completeLoad:function(e){if(!this._isSamePlaylistItem(e)){this._setLevels(e.sources);var i=this._hasMultipleSources(e)?this._currentQuality:0;e.file=e.sources[i].file;const s=t().getContainer(),r=s.querySelector(".jw-video");r&&s.querySelector(".jw-media").removeChild(r),this._previouslyLoadedItem=this._currentItem||e,a.load(e,this._providerId),this._currentItem=e,this._currentFile=e.file}},_setAudioTracks:function(t,e){this._audioTracks=t,this._currentAudioTrack=e},_setCaptionsList:function(t,e){this._captionsList=t,this._currentCaptions=e},_playbackComplete:function(){this._unloadPlaylistItem(),this.trigger(r.JWPLAYER_MEDIA_COMPLETE),this.setState(n.COMPLETE)},_unloadPlaylistItem:function(){this._currentItem=null,this._currentFile="",this._beforecompleted=!1,this._position=-1,this._currentTime=-1,this._restorePosition=-1},_isSamePlaylistItem:function(t){return t===this._currentItem&&t.file===this._currentFile},_hasMultipleSources:function(t){return t.sources&&t.sources.length>1}}),window.jwOn("itemLoaded",this._providerId,this.sdkItemLoaded.bind(this)),window.jwOn("stateChange",this._providerId,this.sdkStateChanged.bind(this)),window.jwOn("timeChanged",this._providerId,this.sdkTimeChanged.bind(this)),window.jwOn("startOnSeek",this._providerId,this.sdkStartOnSeek.bind(this)),window.jwOn("seekableRangeUpdated",this._providerId,this.sdkSeekableRangeChanged.bind(this)),window.jwOn("metadata",this._providerId,this.sdkMetadata.bind(this)),window.jwOn("bufferChange",this._providerId,this.sdkBufferChange.bind(this)),window.jwOn("firstFrame",this._providerId,this.sdkFirstFrame.bind(this)),window.jwOn("qualityLevels",this._providerId,this.sdkQualityLevels.bind(this)),window.jwOn("qualityChanged",this._providerId,this.sdkQualityChanged.bind(this)),window.jwOn("audioTracks",this._providerId,this.sdkAudioTracks.bind(this)),window.jwOn("audioTrackChanged",this._providerId,this.sdkAudioTrackChange.bind(this)),window.jwOn("playbackRateChanged",this._providerId,this.sdkPlaybackRateChanged.bind(this)),window.jwOn("subtitlesTracks",this._providerId,this.sdkCaptionsList.bind(this)),window.jwOn("seeked",this._providerId,this.sdkSeeked.bind(this)),window.jwOn("error",this._providerId,this.sdkError.bind(this)),window.jwOn("castingChanged",this._providerId,this.sdkCastingChanged.bind(this)),window.jwOn("warning",this._providerId,this.sdkWarning.bind(this)),this.trigger=function(t,e){if(this._attached)return _.trigger.call(this,t,e)}}var i=t.utils,s=t._,r=t.events,n=r.state,a=window.SDKRouter,o={};o["states.LOADING"]=n.LOADING,o["states.BUFFERING"]=n.BUFFERING,o["states.STALLED"]=n.STALLED,o["states.PLAYING"]=n.PLAYING,o["states.PAUSED"]=n.PAUSED,o["states.IDLE"]=n.IDLE,o["states.COMPLETE"]=n.COMPLETE;var u="SDKProvider",c=0;e.supports=function(t){return!["webm","flv","ism","mpd","avi"].includes(t.type.toLowerCase())},e.getName=function(){return{name:u}},t.api.registerProvider(e)}(jwplayer);
