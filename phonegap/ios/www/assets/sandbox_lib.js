/* ===========================================================================
   BPM Combined Asset File
   MANIFEST: kloudgis ()
   This file is generated automatically by the bpm (http://www.bpmjs.org)
   =========================================================================*/

spade.register("kloudgis/sandbox/lib/controllers/active_comments", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of note Comments for the active note.
**/

KG.activeCommentsController = SC.ArrayProxy.create({
	content: null,
	showComments: NO,
	showing: NO,
	isLoading: NO,
	
	sortByDate: function(array){
		//sort by date
		if(SC.none(array)){
			return [];
		}
		return array.sort(function(a,b){
			var d1 = a.get('date');
			var d2 = b.get('date');
			return d1-d2;
		});
	},
	
	showButtonVisible: function(){
		if(!this.get('showComments')){
			return NO;
		}
		return this.get('showing');
	}.property('showing', 'showComments'),
	
	hideButtonVisible: function(){
		if(!this.get('showComments')){
			return NO;
		}
		return !this.get('showing');
	}.property('showing', 'showComments'),
	
	isCommentsReady: function(){
		return this.getPath('content.status') & SC.Record.READY;
	}.property('content.status'),
});

});spade.register("kloudgis/sandbox/lib/controllers/active_note", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Wrap the active note.
**/

KG.activeNoteController = SC.Object.create({
    content: null,

    titleLabel: function() {
        return "_noteTitle".loc();
    }.property(),

    descriptionLabel: function() {
        return "_noteDescription".loc();
    }.property(),

    isOldRecord: function() {
        if (this.getPath('content.status') === SC.Record.READY_NEW) {
            return NO;
        }
        return YES;
    }.property('content.status'),

    confirmLabel: function() {
        if (this.get('isOldRecord')) {
            return "_noteUpdate".loc();
        } else {
            return "_noteConfirm".loc();
        }
    }.property('isOldRecord'),

    deleteLabel: function() {
        return "_Delete".loc();
    }.property('content.status'),

    titleValue: function(key, value) {
        if (value != undefined) {
            this.get('content').set('title', value);
        }
        var val = this.getPath('content.title');
        if (!val) {
            val = '';
        }
        return val;
    }.property('content.title'),

    isDisabled: function() {
        if (this.getPath('content.status') & SC.Record.BUSY) {
            return YES;
        }
        var auth = this.getPath('content.author');
        if (!auth || auth === KG.core_auth.get('activeUser').id) {
            return NO;
        }
        return YES;
    }.property('content.status', 'content.author'),

    isUpdateVisible: function() {
        return ! this.get('isDisabled');
    }.property('isDisabled'),

    isDeleteVisible: function() {
        var auth = this.getPath('content.author');
        if (this.getPath('content.status') !== SC.Record.READY_NEW && (!auth || auth === KG.core_auth.get('activeUser').id || KG.core_sandbox.get('isSandboxOwner'))) {
            return YES;
        }
        return NO;
    }.property('content.status', 'content.author', 'KG.core_sandbox.isSandboxOwner'),

    commentsLabel: function() {
        var len = this.getPath('content.comments.length');
        if (len === 0) {
            return "_0comment".loc();
        } else if (len === 1) {
            return "_1comment".loc();
        } else {
            return "_comments".loc(len);
        }
    }.property('content.comments.length'),

    hideCommentsLabel: function() {
        var len = this.getPath('content.comments.length');
        if (len === 0) {
            return "_0hideComment".loc();
        } else if (len === 1) {
            return "_1hideComment".loc();
        } else {
            return "_hideComments".loc(len);
        }
    }.property('content.comments.length'),

});

});spade.register("kloudgis/sandbox/lib/controllers/delete_comment", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Wrap the comment that is marked to Delete. The user may click a button to confirm the delete.
**/

KG.deleteCommentController = SC.Object.create({
	content: null,	
});

});spade.register("kloudgis/sandbox/lib/controllers/info", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of features found while doing a FeatureInfo.
**/

KG.infoController = SC.ArrayProxy.create({
	content: [],
	
	//show/hide the other possible features 
	listVisible: NO,
	
	featureCount: function(){
		return this.getPath('content.length');
	}.property('content.length'),
	
	multipleFeatures:function(){
		return this.get('featureCount') > 1;
	}.property('featureCount')
});

});spade.register("kloudgis/sandbox/lib/controllers/inspector", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of feature attributes to render in the inspector.
**/

KG.inspectorController = SC.ArrayProxy.create({
	//attributes
	content: [],
	feature: null,
	
	title: function() {
        var f = this.get('feature');
		if(f){
			return f.get('ft') || f.get('title');
		}
    }.property('feature'),

	closeLabel: "_closeInspector".loc()
});

});spade.register("kloudgis/sandbox/lib/controllers/layers", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of WMS layers
**/

KG.layersController = SC.ArrayProxy.create({
	content: null
});

});spade.register("kloudgis/sandbox/lib/controllers/new_comment", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Wrap the comment being created.
**/

KG.newCommentController = SC.Object.create({
    content: null,
});

});spade.register("kloudgis/sandbox/lib/controllers/note_markers", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of note markers.
**/

KG.noteMarkersController = SC.ArrayProxy.create({
	content: null
});

});spade.register("kloudgis/sandbox/lib/controllers/notes_popup", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Multiples notes list for the popup.
**/

KG.notesPopupController = SC.ArrayProxy.create({
	content: [],
	marker: null,
	popupTitle: function(){
		var m = this.get('marker');
		if(m){
			return m.get('title');
		}
		return '';
	}.property('marker')
});

});spade.register("kloudgis/sandbox/lib/controllers/notifications", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of KG.Message
**/

KG.notificationsController = SC.ArrayProxy.create({
	content: [],
	
	activePopup: NO,
	
	hasNotification: function(){
		return this.get('length') > 0;
	}.property('length')
});

});spade.register("kloudgis/sandbox/lib/controllers/search", function(require, exports, __module, ARGV, ENV, __filename){
/**
* List of Search categories upon search request.
**/

KG.searchController = SC.ArrayProxy.create({
	content: [],
	searchHistorySize: 5,
	searchValue: null,
	
	hasResults: function(){
		return this.getPath('content.length') > 0;
	}.property('content.length'),
	
});

});spade.register("kloudgis/sandbox/lib/controllers/search_results", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Features found on search category selection.
**/

KG.searchResultsController = SC.ArrayProxy.create({
	content: [],
	closeLabel: "_closeSearch".loc(),
	listVisible: NO,
	category: null,
	plugin: null,
	
	listTitle: function(){
		if(SC.none(this.get('content'))){
			return '';
		}else{
			var cat = this.get('category');
			if(SC.none(cat)){
				var plugin = this.get('plugin');
				if(!SC.none(plugin)){
					return "_searchResult".loc(this.getPath('content.length'), plugin.get('searchValue'), plugin.get('pluginName'));
				}
			}else{
				return "_searchResult".loc(this.getPath('content.length'), cat.get('search'), cat.get('title'));
			}
		}
	}.property('content.length'),
	
	hasResults: function(){
		return this.getPath('content.length') > 0;
	}.property('content.length')
})

});spade.register("kloudgis/sandbox/lib/controllers/send_notification", function(require, exports, __module, ARGV, ENV, __filename){
KG.sendNotificationController = SC.Object.create({
	
	showing: NO,
	content: '',
	sendOnEnterValue: YES,
	feedbackMessage: '',
	
	pendingNotification: null,
	
	notificationLabel: function(){
		return '_notificationSendText'.loc();
	}.property(),
	
	sendLabel: function(){
		return '_notificationSendButton'.loc();
	}.property(),
	
	sendOnEnterTooltip: function(){
		return '_sendOnEnterTooltip'.loc();
	}.property(),
	
	hasNotificationPending: function(){
		return !SC.none(this.get('pendingNotification'));
	}.property('pendingNotification')
	
});

});spade.register("kloudgis/sandbox/lib/core_highlight", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Core functions to perform highlights
**/

KG.core_highlight = SC.Object.create({

    clearHighlight: function(hl) {
        if (hl) {
            KG.core_leaflet.removeHighlight(hl);
        }
    },

    highlightFeature: function(feature) {
        if (!feature) {
            return NO;
        }
        try {
            return KG.core_leaflet.addHighlight(feature.get('coords'), feature.get('geo_type'));
        } catch(e) {
            return null;
        }
    },

    clearHighlightMarker: function(hlMarker) {
        if (hlMarker) {
            KG.core_leaflet.removeMarker(hlMarker);
        }
    },

    addHighlightMarker: function(lonLat) {
        if (!lonLat) {
            return NO;
        }
        try {
            return KG.core_leaflet.addHighlightMarker(lonLat);
        } catch(e) {
            return NO;
        }
    }
})

});spade.register("kloudgis/sandbox/lib/core_info", function(require, exports, __module, ARGV, ENV, __filename){
//predefined queries
KG.INFO_QUERY = SC.Query.remote(KG.Feature, {
    query_url: 'to_override'
});
/**
* Core functions to perform feature info.
**/
KG.core_info = SC.Object.create({

    limit_query: 10,

    highlight: null,

    _finding: NO,
    _timeout: null,

    findFeaturesAt: function(lonLat) {
        if (this._finding) {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }
            var self = this;
            this._timeout = setTimeout(function() {
                SC.run.begin();
                if (KG.infoController.get('status') & SC.Record.ERROR) {
                    this._finding = NO;
                }
                self.findFeaturesAt(lonLat);
                SC.run.end();
            },
            1000);
            return NO;
        }
        this._finding = YES;
        var onePixel = KG.core_leaflet.pixelsToWorld(1);
        var sLayers = KG.core_layer.getLayersSelection();
        var layers = sLayers.map(function(item, index, self) {
            return item.get('id');
        }).join(',');
        if (KG.infoController.get('content') && KG.infoController.get('content').destroy) {
            var content = KG.infoController.get('content');
            content.destroy();
            console.log('info controller did destroy content');
        }
        if (layers.length > 0) {
            var url = 'http://localhost/api_data/protected/features/features_at?sandbox=%@&lat=%@&lon=%@&one_pixel=%@&limit=%@&layers=%@'.fmt(KG.get('activeSandboxKey'), lonLat.get('lat'), lonLat.get('lon'), onePixel, this.get('limit_query'), layers);
            KG.INFO_QUERY.set('query_url', url);
            KG.INFO_QUERY._lonLat = lonLat;
            var records = KG.store.find(KG.INFO_QUERY);
            KG.infoController.set('content', records);
            records.onReady(this, this.infoReady);
        } else {
            console.log('No valid layer to do a F_INFO');
            KG.infoController.set('content', []);
        }
        if (SC.none(this._div_info)) {
            this._div_info = document.createElement('div');         
        }
		this.clearViewInfo();
		this._view_info = SC.View.create({
            templateName: 'info-popup',
        });
        this._view_info.appendTo(this._div_info);
    },

    infoReady: function(records) {
        records.offReady();
        if (records.get('length') > 0) {
            KG.statechart.sendAction('featureInfoReady');
        }
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        this._finding = NO;
    },

    showInfoPopup: function() {
        var records = KG.infoController.get('content');
        if (records.get('length') > 0) {
			var center = records.getPath('firstObject.center');
            if (center) {
                var div = this._div_info;
                KG.core_leaflet.showPopupInfo(center, div);
            }
        }

    },

    hideInfoPopup: function() {
        KG.core_leaflet.closePopup();
		this.clearViewInfo();
    },

    expandPopupDidChange: function() {
        setTimeout(function() {
            SC.run.begin();
            KG.core_leaflet.updatePopupInfo();
            SC.run.end();
        },
        1);
    }.observes('KG.infoController.listVisible'),

	clearViewInfo: function(){
		if(!SC.none(this._view_info)){
			this._view_info.destroy();
		}
	}
});

});spade.register("kloudgis/sandbox/lib/core_inspector", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Core functions to manage the inspector.
**/

KG.core_inspector = SC.Object.create({
	
	_highlight: null,
	
    selectFeature: function(feature) {
		//refresh the map size after the anim
        var center = feature.get('center');
        setTimeout(function() {
            KG.core_leaflet.mapSizeDidChange(center);
        },
        600);
        KG.core_highlight.clearHighlight(this._highlight);
        this._highlight = KG.core_highlight.highlightFeature(feature);
        KG.inspectorController.set('feature', feature);
        KG.inspectorController.set('content', feature.getAttributes());
    },

    cleanSelectFeature: function() {
        KG.core_highlight.clearHighlight(this._highlight);
		this._highlight = null;
		//refresh the map size after the anim
        var center = KG.core_leaflet.getCenter();     
        setTimeout(function() {
            KG.core_leaflet.mapSizeDidChange(center)
        },
        600);
    },
});

});spade.register("kloudgis/sandbox/lib/core_layer", function(require, exports, __module, ARGV, ENV, __filename){
//predefined queries
KG.LAYER_QUERY = SC.Query.local(KG.Layer, {query_url: 'to_override'});

/**
* Core functions to manage the layers
**/
KG.core_layer = SC.Object.create({
	
	loadLayers:function(){
		KG.LAYER_QUERY.set('query_url', 'http://localhost/api_data/protected/layers?sandbox=%@'.fmt(KG.get('activeSandboxKey')));
		var layers = KG.store.find(KG.LAYER_QUERY);
		KG.layersController.set('content', layers);
		layers.onReady(this, this._layersReady);
	},
	
	_layersReady: function(layers){
		//FIXME: sortProperty is not yet implemented in beta3
		var ordered = layers;//layers.sortProperty('renderOrder'); 
		
		ordered.filterProperty('visibility', YES).filterProperty('canRender', YES).forEach(function(layer){
			KG.core_leaflet.addWMSLayer(layer);
		});
	},
	
	getLayersSelection: function(){
		var layers = KG.layersController.get('content');
		if(!SC.none(layers) && layers.get('length') > 0){
			var sel = layers.filterProperty('visibility', YES).filterProperty('isSelectable', YES);
			return sel;
		}
		return [];
	}
	
});

});spade.register("kloudgis/sandbox/lib/core_leaflet", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Core functions to manage the map (leaflet framework)
**/

KG.core_leaflet = SC.Object.create({

    map: null,

    //private variables
    _popupInfo: null,
    _popupMarker: null,

    //icons
    noteIcon: new L.Icon(),
    groupIcon: new L.Icon('resources/images/group.png'),
    newNoteIcon: new L.Icon('resources/images/new.png'),
    hlNoteIcon: new L.Icon('resources/images/highlight.png'),

    //	layerControl: new L.Control.Layers(),
    addToDocument: function(lon, lat, zoom) {
	
	
	
		//patch to make the popup hide on Safari Mac.
        if ($.browser.safari && navigator.platform.indexOf('Mac') == 0) {
            L.Popup.prototype._close = function() {
                if (this._opened) {
                    this._map.removeLayer(this);
                    var element = $(".leaflet-popup-pane")[0];
                    if (element.style.width == '1px') {
                        element.style.width = '0px';
                    } else {
                        element.style.width = '1px';
                    }
                }
            };
        }

		var baseLayer;
		var key = 'Anvn3DMhTFsggcirvNz1TNQrxCzksEg-b47gtD7AO1iOzZicEiF2mFZoleYMkX8z';
		baseLayer = new L.BingLayer(key);
		
	
		
/*        var osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var at = 'OSM';
		baseLayer = new L.TileLayer(osmURL, {
		    maxZoom: 20,
		    attribution: at
		});
		*/
		
	/*	var key = '8ccaf9c293f247d6b18a30fce375e298';
        var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/' + key + '/997/256/{z}/{x}/{y}.png',
        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
        baseLayer = new L.TileLayer(cloudmadeUrl, {
            maxZoom: 18,
            attribution: cloudmadeAttribution
        });
   *?
        /*var mapquestUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
        mapquestAttribution = "Data CC-By-SA by <a href='http://openstreetmap.org/' target='_blank'>OpenStreetMap</a>, Tiles Courtesy of <a href='http://open.mapquest.com' target='_blank'>MapQuest</a>",
        baseLayer = new L.TileLayer(mapquestUrl, {
            maxZoom: 18,
            attribution: mapquestAttribution,
            subdomains: ['1', '2', '3', '4']
        });*/

        // initialize the map on the "map" div
        var map = new L.Map('map', {});
        //	map.addControl(this.layerControl);
		lon = lon || -72;
		lat = lat || 46;
		zoom = zoom || 8;
        map.setView(new L.LatLng(lat, lon), zoom).addLayer(baseLayer);

        //this.layerControl.addBaseLayer(layer, "Base");
        this.map = map;
        this.map.on('zoomend', this.onZoom, this);
        this.map.on('moveend', this.onMove, this);
        this.map.on('click', this.onClick, this);
        this.map.on('layeradd', this.onLayerAdd, this);
        this.map.on('layerremove', this.onLayerRemove, this);
        //2 reasons:
        //- If touch, no need to track the "mouse" position, there is no mouse.
        //- On mobile safari (4.3.2), the input textfield in a popup cannot take the focus is the mouseMove event is set in the map.
        if (!L.Browser.touch) {
            this.map.on('mousemove', this.onMouseMove, this);
        }

        this._popupInfo = new L.Popup({
            closeButton: false
        });
        this._popupMarker = new L.Popup({
            closeButton: true,
            offset: new L.Point(0, -33),
        });
        //disable interaction with the map over the popup
        this._popupInfo._initLayout();
        if (L.Browser.touch) {
            L.DomEvent.addListener(this._popupInfo._wrapper, L.Draggable.START, KG.core_leaflet.stopPropagation);
            L.DomEvent.addListener(this._popupInfo._wrapper, L.Draggable.END, KG.core_leaflet.stopPropagation);
            L.DomEvent.addListener(this._popupInfo._wrapper, L.Draggable.MOVE, KG.core_leaflet.stopPropagation);
        }
        L.DomEvent.addListener(this._popupInfo._wrapper, 'mousewheel', L.DomEvent.stopPropagation);

        this._popupMarker._initLayout();
        if (L.Browser.touch) {
            L.DomEvent.addListener(this._popupMarker._wrapper, L.Draggable.START, KG.core_leaflet.stopPropagation);
            L.DomEvent.addListener(this._popupMarker._wrapper, L.Draggable.END, KG.core_leaflet.stopPropagation);
            L.DomEvent.addListener(this._popupMarker._wrapper, L.Draggable.MOVE, KG.core_leaflet.stopPropagation);
        }
        L.DomEvent.addListener(this._popupMarker._wrapper, 'mousewheel', KG.core_leaflet.stopPropagation);
        L.DomEvent.addListener(this.map._container, 'mousedown', this._onMouseDown, this);
        L.DomEvent.addListener(this.map._container, 'mouseup', this._onMouseUp, this);
        L.DomEvent.addListener(this.map._container, 'click', this._onMouseClick, this);
    },

    /** store the shift down status to bypass the next click event and therefore do not make a selection on shift drag  zoom **/
    _shiftDown: NO,

    _onMouseDown: function(e) {
        if (!e.shiftKey || ((e.which != 1) && (e.button != 1))) {
            return false;
        }
        this._shiftDown = YES;
    },

    _onMouseUp: function(e) {
        setTimeout(function() {
            KG.core_leaflet._shiftDown = NO;
        },
        300);
    },

    _onMouseClick: function(e) {
        this._shiftDown = NO;
    },

    stopPropagation: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    },

    onZoom: function(e) {
        SC.run.begin();
        KG.statechart.sendAction('mapZoomedAction', this);		
        KG.core_sandbox.setCenter(this.getCenter(), this.getZoom());
        SC.run.end();
    },

    onMove: function(e) {
        //  console.log('on Move');
        SC.run.begin();
        KG.statechart.sendAction('mapMovedAction', this);
        KG.core_sandbox.setCenter(this.getCenter(), this.getZoom());
        SC.run.end();
    },

    onClick: function(e) {
        if (this._shiftDown) {
            return NO;
        }
        SC.run.begin();
        KG.statechart.sendAction('clickOnMapAction', KG.LonLat.create({
            lon: e.latlng.lng,
            lat: e.latlng.lat
        }));
        SC.run.end();
    },

    onMouseMove: function(e) {
        //	console.log('on MouseMove');
        SC.run.begin();
        KG.core_sandbox.set('mousePosition', KG.LonLat.create({
            lon: e.latlng.lng,
            lat: e.latlng.lat
        }));
        SC.run.end();
    },

    onLayerAdd: function(e) {
        SC.run.begin();
        if (e.layer === this._popupInfo) {
            $(this._popupInfo._container).addClass('info-popup');
        }
        SC.run.end();
    },

    onLayerRemove: function(e) {
        SC.run.begin();
        var self = KG.core_leaflet;
        if (self._popupMarker && self._popupMarker === e.layer) {
            console.log('popup closed');
            //popup closed
            KG.statechart.sendAction('hideMarkerPopupAction', self);
            e.layer.off('click', e.layer.openPopup, e.layer);
        } else if (self._popupInfo && self._popupInfo === e.layer) {
            //popup closed
            KG.statechart.sendAction('hideInfoPopupAction', self);
        }
        SC.run.end();
    },

    pixelsToWorld: function(pixels) {
        var center = this.getCenter();
        var centerOff = this.getCenterOffsetPixels(pixels);
        var dLat = centerOff.lat - center.lat;
        var dLon = centerOff.lon - center.lon;
        return Math.sqrt(dLat * dLat + dLon * dLon);
    },

    getCenter: function() {
        var center = this.map.getCenter();
        return KG.LonLat.create({
            lon: center.lng,
            lat: center.lat
        });
    },

    getCenterOffsetPixels: function(pixels) {
        var viewHalf = this.map.getSize().divideBy(2);
        var centerPoint = this.map._getTopLeftPoint().add(viewHalf);
        var pointOff = centerPoint.add(new L.Point(pixels, pixels));
        var offcenter = this.map.unproject(pointOff);
        return KG.LonLat.create({
            lon: offcenter.lng,
            lat: offcenter.lat
        });
    },

    getZoom: function() {
        return this.map.getZoom();
    },

    getFatBounds: function() {
        return this._getBounds(this.pixelsToWorld(this.map.getSize().divideBy(6).x));
    },

    getBounds: function() {
        return this._getBounds(0);
    },

    getBoundsA: function() {
        var lbounds = this.map.getBounds();
        var lcenter = this.map.getCenter();
        var sw = lbounds._southWest;
        var ne = lbounds._northEast;
        var b = [];
        if (!lbounds.contains(lcenter)) {
            b[0] = KG.Bounds.create({
                sw: KG.LonLat.create({
                    lon: -179.9999,
                    lat: sw.lat
                }),
                ne: KG.LonLat.create({
                    lon: sw.lng,
                    lat: ne.lat
                })
            });
            b[1] = KG.Bounds.create({
                sw: KG.LonLat.create({
                    lon: ne.lng,
                    lat: sw.lat
                }),
                ne: KG.LonLat.create({
                    lon: 179.9999,
                    lat: ne.lat
                })
            });
        } else {
            b[0] = KG.Bounds.create({
                sw: KG.LonLat.create({
                    lon: sw.lng,
                    lat: sw.lat
                }),
                ne: KG.LonLat.create({
                    lon: ne.lng,
                    lat: ne.lat
                })
            });
        }
        return b;
    },

    _getBounds: function(fat) {
        var bounds = this.getBoundsA();
        var lcenter = this.map.getCenter();
        var sw, ne;
        sw = bounds[0].sw;
        ne = bounds[0].ne;
        if (bounds[1]) {
            var center = KG.LonLat.create({
                lon: lcenter.lng,
                lat: lcenter.lat
            });
            if (bounds[1].contains(center)) {
                sw = bounds[1].sw;
                ne = bounds[1].ne;
            }
        }

        sw.lat = Math.max(sw.lat - fat, -90);
        sw.lon = Math.max(sw.lon - fat, -179.9999);
        ne.lat = Math.min(ne.lat + fat, 90);
        ne.lon = Math.min(ne.lon + fat, 179.9999);

        var bounds = KG.Bounds.create({
            sw: KG.LonLat.create({
                lon: sw.lon,
                lat: sw.lat
            }),
            ne: KG.LonLat.create({
                lon: ne.lon,
                lat: ne.lat
            })
        });
        return bounds;
    },

    setCenter: function(center, zoom) {
        if (!center) {
            return NO;
        }
        if (!zoom) {
            zoom = this.map.getZoom();
        }
        SC.Logger.debug('setting the map center to: Lat:' + center.get('lat') + ' Lon:' + center.get('lon'));
        this.map.setView(new L.LatLng(center.get('lat'), center.get('lon')), zoom);
        return YES;
    },

    addMarker: function(marker, click_target, click_cb) {
        var lmarkerLocation = new L.LatLng(marker.get('lat'), marker.get('lon'));
        var icon = this.noteIcon;
        if (marker.get('featureCount') > 1) {
            icon = this.groupIcon;
        }
        var lmarker = new L.Marker(lmarkerLocation, {
            draggable: false,
            title: marker.get('tooltip'),
            icon: icon
        });
        this.map.addLayer(lmarker);
        lmarker.on('click',
        function() {
            SC.run.begin();
            click_cb.call(click_target, marker);
            SC.run.end();
        });
        marker._native_marker = lmarker;
    },

    reAddMarker: function(marker) {
        if (marker._native_marker) {
            this.map.removeLayer(marker._native_marker);
            this.map.addLayer(marker._native_marker);
        }
    },

    removeMarker: function(marker) {
        if (marker._native_marker) {
            this.map.removeLayer(marker._native_marker);
            marker._native_marker = null;
        }
    },

    addNewNoteMarker: function(popupContent, pos) {
        var lpos;
        if (pos) {
            lpos = new L.LatLng(pos.get('lat'), pos.get('lon'));
        } else {
            lpos = this.map.getCenter();
        }
        var lmarker = new L.Marker(lpos, {
            draggable: true,
            title: "_newNote".loc(),
            icon: this.newNoteIcon
        });
        lmarker.on('dragend',
        function() {
            SC.run.begin();
            KG.statechart.sendAction('notePositionSetAction');
            SC.run.end();
        })
        lmarker.bindPopup(popupContent);
        this.map.addLayer(lmarker);
        lmarker.openPopup();
        var marker = SC.Object.create({
            _native_marker: lmarker,
            isNewNote: YES,
            lon: function() {
                if (SC.none(this._native_marker)) {
                    return NO;
                }
                return this._native_marker._latlng.lng;
            }.property(),
            lat: function() {
                if (SC.none(this._native_marker)) {
                    return NO;
                }
                return this._native_marker._latlng.lat;
            }.property()
        });
        return marker;
    },

    disableDraggableMarker: function(marker) {
        if (marker && marker._native_marker) {
            var nativ = marker._native_marker;
            nativ.options.draggable = false;
            if (nativ.dragging) {
                nativ.dragging.disable();
            }
        }
    },

    addHighlightMarker: function(pos) {
        var lpos = new L.LatLng(pos.get('lat'), pos.get('lon'));
        var lmarker = new L.Marker(lpos, {
            draggable: false,
            icon: this.hlNoteIcon
        });
        var marker = SC.Object.create({
            _native_marker: lmarker,
            lon: function() {
                return this._native_marker._latlng.lng;
            }.property(),
            lat: function() {
                return this._native_marker._latlng.lat;
            }.property()
        });
        this.map.addLayer(lmarker);
        return marker;
    },

    addWMSLayer: function(layer) {
        var wms = new L.TileLayer.WMS(layer.get('url'), {
            layers: layer.get('name'),
            transparent: YES,
            format: 'image/png',
			tiled: YES,
			tilesorigin:'0,0',
			//set to YES to by pass geowebcache
            no_gwc: NO,
            kg_layer: layer.get('id'),
            kg_sandbox: KG.get('activeSandboxKey'),
			auth_token: KG.core_auth.get('authenticationToken')
        });
        layer._native_layer = wms;
        this.map.addLayer(wms);
        //	this.layerControl.addOverlay(wms, layer.get('label'));
    },

    mapSizeDidChange: function(center) {
        this.map.invalidateSize();
        if (center) {
            this.map.setView(new L.LatLng(center.get('lat'), center.get('lon')), this.map.getZoom());
        }
    },

    showPopupMarker: function(marker, content) {
        var popup = this._popupMarker;
        popup.setLatLng(new L.LatLng(marker.get('lat'), marker.get('lon')));
        popup.setContent(content);
        if (!popup._opened) {
            this.map.openPopup(popup);
        }
        setTimeout(function() {
            popup._update();
            //to secure the update, re-do it even later
            setTimeout(function() {
                popup._update()
            },
            100);
        },
        1);
    },

    closePopup: function() {
        this.map.closePopup();
    },

    showPopupInfo: function(latLon, content) {
        var popup = this._popupInfo;
        popup.setLatLng(new L.LatLng(latLon.get('lat'), latLon.get('lon')));
        popup.setContent(content);
        this.map.openPopup(popup);
        setTimeout(function() {
            popup._update();
            //to secure the update, re-do it even later
            setTimeout(function() {
                popup._update()
            },
            100);
        },
        1);
    },

    updatePopupInfo: function() {
        if (this._popupInfo) {
            this._popupInfo._updateLayout();
            this._popupInfo._updatePosition();
            this._popupInfo._adjustPan();
        }
    },

    addHighlight: function(coords, geo_type) {
        if (!coords) {
            return NO;
        }
        var options = {
            color: '#0033ff',
            weight: 5,
            opacity: 0.5,
            fillColor: null,
            //same as color by default
            fillOpacity: 0.2,
            clickable: false
        };
        var layer = this.createLayerFromCoordinates(coords, geo_type, options);
        this.map.addLayer(layer);
        return SC.Object.create({
            coords: coords,
            geo_type: geo_type,
            _native_hl: layer
        });
    },

    removeHighlight: function(hl) {
        if (hl && hl._native_hl) {
            this.map.removeLayer(hl._native_hl);
            return YES;
        }
        return NO;
    },

    createLayerFromCoordinates: function(coordinates, geo_type, options) {
        var layer;
        if (geo_type) {
            geo_type = geo_type.toLowerCase();
        } else {
            geo_type = 'point';
        }
        //TODO Better support for multigeo
        if (geo_type === 'point' || geo_type === 'multipoint') {
            var circleLocation = new L.LatLng(coordinates[0].y, coordinates[0].x);
            //8 pixels radius circle
            options.radius = 7;
            options.weight = 2;
            options.fill = YES;
            layer = new L.CircleMarker(circleLocation, options);
        } else if (geo_type === 'linestring' || geo_type === 'multilinestring') {
            var latlngs = [];
            coordinates.forEach(function(c) {
                var coord = new L.LatLng(c.y, c.x);
                latlngs.push(coord);
            });
            layer = new L.Polyline(latlngs, options);
        } else if (geo_type === 'polygon' || geo_type === 'multipolygon') {
            var latlngs = [];
            coordinates.forEach(function(c) {
                var coord = new L.LatLng(c.y, c.x);
                latlngs.push(coord);
            });
            layer = new L.Polygon(latlngs, options);
        }
        return layer;
    },

    _temp: null, _temp2: null, printBoundsA: function() {
        if (!SC.none(this._temp)) {
            this.map.removeLayer(this._temp);
        }
        if (!SC.none(this._temp2)) {
            this.map.removeLayer(this._temp2);
        }
        console.log(this.map.getBounds());
        var bounds = this.getBoundsA()[0];
        var sw = bounds.sw;
        var ne = bounds.ne;
        var p1 = new L.LatLng(sw.lat, sw.lon);
        var p2 = new L.LatLng(ne.lat, sw.lon);
        var p3 = new L.LatLng(ne.lat, ne.lon);
        var p4 = new L.LatLng(sw.lat, ne.lon);
        var pts = [p1, p2, p3, p4];
        this._temp = new L.Polygon(pts);
        this.map.addLayer(this._temp);
        bounds = this.getBoundsA()[1];
        if (bounds) {
            sw = bounds.sw;
            ne = bounds.ne;
            p1 = new L.LatLng(sw.lat, sw.lon);
            p2 = new L.LatLng(ne.lat, sw.lon);
            p3 = new L.LatLng(ne.lat, ne.lon);
            p4 = new L.LatLng(sw.lat, ne.lon);
            pts = [p1, p2, p3, p4];
            this._temp2 = new L.Polygon(pts, {
                color: 'red'
            });
            this.map.addLayer(this._temp2);
        }
        return this.getBoundsA();
    },

    printBounds: function() {
        if (!SC.none(this._temp)) {
            this.map.removeLayer(this._temp);
        }
        var bounds = this.getBounds();
        var sw = bounds.sw;
        var ne = bounds.ne;
        var p1 = new L.LatLng(sw.lat, sw.lon);
        var p2 = new L.LatLng(ne.lat, sw.lon);
        var p3 = new L.LatLng(ne.lat, ne.lon);
        var p4 = new L.LatLng(sw.lat, ne.lon);
        var pts = [p1, p2, p3, p4];
        this._temp = new L.Polygon(pts);
        this.map.addLayer(this._temp);
        return bounds;
    }

});

//***********************************
// From a pull request not yet integrated
// https://github.com/CloudMade/Leaflet/pull/291
// to remove when included in Leaflet

L.BingLayer = L.TileLayer.extend({
	options: {
		subdomains: [0, 1, 2, 3],
		attribution: 'Bing',
	},

	initialize: function(key, options) {
		L.Util.setOptions(this, options);

		this._key = key;
		this._url = null;
		this.meta = {};
		this._update_tile = this._update;
		this._update = function() {
			if (this._url == null) return;
			this._update_attribution();
			this._update_tile();
		};
		this.loadMetadata();
	},

	tile2quad: function(x, y, z) {
		var quad = '';
		for (var i = z; i > 0; i--) {
			var digit = 0;
			var mask = 1 << (i - 1);
			if ((x & mask) != 0) digit += 1;
			if ((y & mask) != 0) digit += 2;
			quad = quad + digit;
		}
		return quad;
	},

	getTileUrl: function(p, z) {
		var subdomains = this.options.subdomains,
			s = this.options.subdomains[(p.x + p.y) % subdomains.length];
		return this._url.replace('{subdomain}', s)
				.replace('{quadkey}', this.tile2quad(p.x, p.y, z))
				.replace('{culture}', '');
	},

	loadMetadata: function() {
		var _this = this;
		var cbid = '_bing_metadata';
		window[cbid] = function (meta) {
			_this.meta = meta;
			window[cbid] = undefined;
			var e = document.getElementById(cbid);
			e.parentNode.removeChild(e);
			if (meta.errorDetails) {
				alert("Got metadata" + meta.errorDetails);
				return;
			}
			_this.initMetadata();
		};
		//AerialWithLabels,Aerial or Road
		var url = "http://dev.virtualearth.net/REST/v1/Imagery/Metadata/Road?include=ImageryProviders&jsonp=" + cbid + "&key=" + this._key;
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		script.id = cbid;
		document.getElementsByTagName("head")[0].appendChild(script);
	},

	initMetadata: function() {
		var r = this.meta.resourceSets[0].resources[0];
		this.options.subdomains = r.imageUrlSubdomains;
		this._url = r.imageUrl;
		this._providers = [];
		for (var i = 0; i < r.imageryProviders.length; i++) {
			var p = r.imageryProviders[i];
			for (var j = 0; j < p.coverageAreas.length; j++) {
				var c = p.coverageAreas[j];
				var coverage = {zoomMin: c.zoomMin, zoomMax: c.zoomMax, active: false};
				var bounds = new L.LatLngBounds(
						new L.LatLng(c.bbox[0]+0.01, c.bbox[1]+0.01),
						new L.LatLng(c.bbox[2]-0.01, c.bbox[3]-0.01)
				);
				coverage.bounds = bounds;
				coverage.attrib = p.attribution;
				this._providers.push(coverage);
			}
		}
		this._update();
	},

	_update_attribution: function() {
		var bounds = this._map.getBounds();
		var zoom = this._map.getZoom();
		for (var i = 0; i < this._providers.length; i++) {
			var p = this._providers[i];
			if ((zoom <= p.zoomMax && zoom >= p.zoomMin) &&
				this._intersects(bounds, p.bounds)) {
				if (!p.active)
					this._map.attributionControl.addAttribution(p.attrib);
				p.active = true;
			} else {
				if (p.active)
					this._map.attributionControl.removeAttribution(p.attrib);
				p.active = false;
			}
		}
	},

	_intersects: function(obj1, obj2) /*-> Boolean*/ {
		var sw = obj1.getSouthWest(),
			ne = obj1.getNorthEast(),
			sw2 = obj2.getSouthWest(),
			ne2 = obj2.getNorthEast();

		return (sw2.lat <= ne.lat) && (sw2.lng <= ne.lng) &&
				(sw.lat <= ne2.lat) && (sw.lng <= ne2.lng);
	}
});

});spade.register("kloudgis/sandbox/lib/core_note", function(require, exports, __module, ARGV, ENV, __filename){
KG.createNoteImagePath = 'resources/images/note_32.png';
KG.cancelCreateNoteImagePath = 'resources/images/note_32_cancel.png';

/**
* Core functions to manage the Notes
**/
KG.core_note = SC.Object.create({

    /* cache for refreshMarkers*/
    _bounds: null,
    _zoom: null,

    /* elements for the active note view*/
    _div_active_note: null,
    _view_active_note: null,
    _new_note_marker: null,

    /* Super element to put in a note marker popup */
    _div_multiple_notes: null,
    /* SC view to generate html bind on the  KG.notesPopupController*/
    _view_multiple_notes: null,

    /* label and image for the create note control*/
    createNoteLabel: "_createNote".loc(),
    createNoteImg: KG.createNoteImagePath,

    /* chained store to perform modifications*/
    _store: null,

    //feature to use to create a new note
    featureTemplate: null,

    _removeOnCloseMarker: null,

    /**
	* Create a nested store with chain() to start doing modifications
	**/
    beginModifications: function() {
        this.rollbackModifications();
        this._store = KG.store.chain();
        var note = KG.activeNoteController.get('content');
        if (!SC.none(note) && note.get('status') !== SC.Record.READY_NEW) {
            KG.activeNoteController.set('content', this._store.find(note));
        }
    },

    /**
	* Commit the nested store into the main store and commits all the changes to the server
	**/
    commitModifications: function() {
        this._store.commitChanges().destroy();
        this._store = null;
        KG.store.commitRecords();
    },

    /**
	* Discard the changes made in the nested store.
	**/
    rollbackModifications: function() {
        if (this._store) {
            this._store.discardChanges();
            this._store.destroy();
            this._store = null;
        }
    },

    /**
	* The user quit the not edtion view.  Rollback the unsaved changes and clean up.
	**/
    postEdition: function() {
        this.rollbackModifications();
        if (this._highlightMarker) {
            KG.core_leaflet.removeMarker(this._highlightMarker);
        }
        this.cleanUpActiveNoteElements();
    },

    /**
	* Zoom and center the map on the active note
	**/
    zoomActiveNote: function() {
        var note = KG.activeNoteController.get('content');
        if (note) {
            var coord = note.get('coordinate');
            if (coord) {
                KG.core_leaflet.closePopup();
                KG.core_leaflet.setCenter(KG.LonLat.create({
                    lon: coord.x,
                    lat: coord.y
                }), 14);
            }
        }
    },

    /**
	* Create a temp marker to let the user drag it to the wanted position
	**/
    locateNote: function() {
        this.cancelLocateNote();
        var center = KG.core_leaflet.getCenter();
        this._new_note_marker = KG.core_leaflet.addNewNoteMarker("_moveNote".loc());
        return YES;
    },

    /**
	* Cancel locate note : Remove the temp marker
	**/
    cancelLocateNote: function() {
        if (!SC.none(this._new_note_marker)) {
            KG.core_leaflet.removeMarker(this._new_note_marker);
            this._new_note_marker = null;
        }
    },

    /**
	* Create a new note record and activate it.
	**/
    createNote: function() {
        this.beginModifications();
        var note;
        if (!SC.none(this.get('featureTemplate'))) {
            var feature = this.get('featureTemplate');
            var center = feature.get('center');
            if (!SC.none(center) && center.get('lon') && center.get('lat')) {
                note = this._store.createRecord(KG.Note, {
                    coordinate: {
                        x: feature.get('center').get('lon'),
                        y: feature.get('center').get('lat'),
                    },
                    description: feature.get('title')
                });
                this._new_note_marker = KG.core_leaflet.addNewNoteMarker("", feature.get('center'));
            }
        } else {
            if (this._new_note_marker.get('lon') && this._new_note_marker.get('lat')) {
                note = this._store.createRecord(KG.Note, {
                    coordinate: {
                        x: this._new_note_marker.get('lon'),
                        y: this._new_note_marker.get('lat')
                    }
                });
            }
        }
        if (note) {
            var marker = this._new_note_marker;
            KG.core_leaflet.disableDraggableMarker(marker);
            this.activateNote(note, {
                marker: marker
            });
        } else {
            KG.statechart.sendAction('cancelCreateNoteAction');
        }
    },

    /**
	* Cleanup the temp marker used to locate the new note and other resources.
	**/
    clearCreateNote: function() {
        if (!SC.none(this._new_note_marker)) {
            KG.core_leaflet.removeMarker(this._new_note_marker);
            this._new_note_marker = null;
            this.set('featureTemplate', null);
        }
    },

    /**
	* attempt to activate a note.  If not fresh, the note is refreshed before.
	**/
    activateNote: function(inNote, params) {
        if (!inNote) {
            return NO;
        }
        if (inNote.get('status') === SC.Record.READY_NEW || params.isFresh) {
            this.continueActivateNote(inNote, params.marker);
        } else {
            inNote.refresh(YES,
            function() {
                KG.core_note.continueActivateNote(inNote, params.marker)
            });
        }
        return YES;
    },

    /**
	* activate note is accepted, set the active note controller and show the popup marker
	**/
    continueActivateNote: function(note, marker) {
        this.cleanUpActiveNoteElements();
        var noteDiv = this._div_active_note;
        if (SC.none(noteDiv)) {
            var noteDiv = this._div_active_note = document.createElement('div');
        }
        this._view_active_note = SC.View.create({
            templateName: 'active-note-popup',
        });
        this._view_active_note.appendTo(noteDiv);
        KG.activeNoteController.set('marker', marker);
        KG.activeNoteController.set('content', note);
        setTimeout(function() {
            if (!SC.none(marker)) {
                SC.run.begin();
                KG.core_leaflet.showPopupMarker(marker, noteDiv);
                SC.run.end();
            }
        },
        1);
    },

    /**
	* cleanup the view used to render the active note.
	**/
    cleanUpActiveNoteElements: function() {
        if (!SC.none(this._view_active_note)) {
            this._view_active_note.destroy();
        }
    },

    setHighlightMarker: function(marker) {
        this._highlightMarker = marker;
    },

    /**
	* More then one note to activate. Show a list of notes.
	**/
    activateMultipleNotes: function(notes, marker) {
        KG.notesPopupController.set('marker', marker);
        KG.notesPopupController.set('content', notes);
        if (SC.none(this._div_multiple_notes)) {
            this._div_multiple_notes = document.createElement('div');
            this._view_multiple_notes = SC.View.create({
                templateName: 'notes-marker-popup',
            });
            this._view_multiple_notes.appendTo(this._div_multiple_notes);
        }
        var div = this._div_multiple_notes;
        setTimeout(function() {
            SC.run.begin();
            KG.core_leaflet.showPopupMarker(marker, div);
            SC.run.end();
        },
        1);
    },

    /**
	* The user hit the Create or Update button. 
	**/
    confirmCreateNote: function() {
        var note = KG.activeNoteController.get('content');
        note = KG.store.find(note);
        note.onReady(null,
        function() {
            KG.core_note.refreshMarkers(YES);
        });
    },

    /**
	* The user hit the Delete button.
	**/
    deleteActiveNote: function() {
        var note = KG.activeNoteController.get('content');
        if (note) {
            var origin_note = KG.store.find(note);
            origin_note.onDestroyedClean(null,
            function() {
                console.log('destroyed completed');
                KG.core_note.refreshMarkers(YES);
            })
            note.destroy();
        }
    },

    /**
	* flush and recalculate the note clusters
	**/
    refreshMarkers: function(force) {
        var bounds = KG.core_leaflet.getBounds();
        var zoom = KG.core_leaflet.getZoom();
        if (force || SC.none(this._zoom) || this._zoom != zoom || SC.none(this._bounds) || !this._bounds.contains(bounds)) {
            var fatBounds = KG.core_leaflet.getFatBounds();
            var dist = KG.core_leaflet.pixelsToWorld(20); //cluster within 20 pixels
            if (KG.noteMarkersController.get('content')) {
                var content = KG.noteMarkersController.get('content');
                content.destroy();
            }
            var query = SC.Query.remote(KG.NoteMarker, {
                query_url: 'http://localhost/api_data/protected/notes/clusters?sw_lon=%@&ne_lat=%@&ne_lon=%@&sw_lat=%@&distance=%@&sandbox=%@'.fmt(fatBounds.getPath('sw.lon'), fatBounds.getPath('sw.lat'), fatBounds.getPath('ne.lon'), fatBounds.getPath('ne.lat'), dist, KG.get('activeSandboxKey'))
            });
            var newMarkers = KG.store.find(query);
            newMarkers.onReady(this, this.markersReady);
            KG.noteMarkersController.set('content', newMarkers);
            this._bounds = fatBounds;
            this._zoom = zoom;
            return YES;
        }
        return NO;
    },

    /**
	* Markers from the server are now READY
	**/
    markersReady: function(markers) {
        markers.offReady();
        KG.notesPopupController.set('marker', null);
        var rtype = markers.getPath('query.recordType');
        var loadedMarkers = KG.store.find(rtype);
        loadedMarkers.forEach(function(old) {
            KG.core_leaflet.removeMarker(old);
            old.set('isOnMap', NO);
            if (markers.indexOf(old) === -1) {
                KG.store.unloadRecord(rtype, old.get('id'));
            }
        });
        var i;
        for (i = 0; i < markers.get('length'); i++) {
            var marker = KG.noteMarkersController.objectAt(i);
            if (marker) {
                if (!marker.get('isOnMap')) {
                    KG.core_leaflet.addMarker(marker, this, this.markerClicked);
                    marker.set('isOnMap', YES);
                }
            }
        }
        //readd the hl marker if any (to put it on top)
        if (this._highlightMarker) {
            KG.core_leaflet.reAddMarker(this._highlightMarker);
        }
    },

    /**
	* The user just click a marker. Try to continue.
	**/
    markerClicked: function(marker) {
        KG.statechart.sendAction('clickMarkerAction', marker);
    },

    /**
	* Find the notes bind to this marker and wait until its READY.
	**/
    continueMarkerClicked: function(marker) {
        if (SC.none(marker)) {
            return NO;
        }
        var notes = marker.get('features');
        var len = notes.get('length');
        var params = {
            count: 0,
            length: len,
            marker: marker
        }
        for (i = 0; i < len; i++) {
            var note = notes.objectAt(i);
            params.isFresh = note.get('status') & SC.Record.BUSY;
            if (note.get('status') === SC.Record.ERROR) {
                note.refresh(YES,
                function() {
                    KG.core_note.noteReady(note, params);
                });
            } else {
                note.onReady(this, this.noteReady, params);
            }
        }
    },

    /**
	* A note from the marker is READY.  If no more note, try to continue.
	**/
    noteReady: function(note, params) {
        params.count++;
        if (params.count === params.length) {
            if (params.count === 1) {
                KG.statechart.sendAction('noteSelectedAction', note, params);
            } else {
                KG.statechart.sendAction('multipleNotesSelectedAction', params.marker.get('features'), params.marker);
            }
        }
    },

    /**
	* Fetch the comments for the active note.
	**/
    fetchComments: function() {
        console.log('refresh comments');
        var nested_note = KG.activeNoteController.get('content');
        if (!SC.none(nested_note)) {
            var note = KG.store.find(nested_note);
            note.onReady(null,
            function() {
                KG.activeCommentsController.set('isLoading', YES);
                KG.activeCommentsController.set('content', []);
                var comments = note.get('comments');
                var params = {
                    count: 0,
                    length: nested_note.getPath('comments.length'),
                    records: [],
                }
                if (params.length > 0) {
                    console.log('comments count:' + params.length);
                    comments.forEach(function(comment) {
                        comment.onReady(KG.core_note, KG.core_note.commentReady, params);

                    });
                } else {
                    console.log('NO comments');
                    KG.activeCommentsController.set('isLoading', NO);
                    KG.statechart.sendAction('commentsReadyEvent');
                }
            });
        }
    },

    /**
	* A comment from the active note is READY.  If no more comment, try to continue.
	**/
    commentReady: function(comment, params) {
        params.count++;
        params.records.pushObject(comment);
        if (params.count === params.length) {
            KG.statechart.sendAction('commentsReadyEvent');
            KG.activeCommentsController.set('content', KG.activeCommentsController.sortByDate(params.records));
            KG.activeCommentsController.set('isLoading', NO);
        }
    },

    /**
	* Create a new Comment record.
	**/
    addCommentToActiveNote: function(comment) {
        var nested_note = KG.activeNoteController.get('content');
        if (nested_note) {
            var rec_comment = KG.store.createRecord(KG.Comment, {
                value: comment,
                note: nested_note.get('id')
            });
            //commit only this record
            KG.store.commitRecords(null, null, [rec_comment.get('storeKey')]);
            rec_comment.onReady(null,
            function() {
                nested_note.get('comments').get('editableStoreIds').pushObject(rec_comment.get('id'));
                KG.activeCommentsController.get('content').pushObject(rec_comment);
                KG.statechart.sendAction('commentsReadyEvent');
            });
        }
    },

    /**
	* Delete a commment record and commit it to the server.
	**/
    deleteComment: function(comment) {
        var nested_note = KG.activeNoteController.get('content');
        nested_note.get('comments').get('editableStoreIds').removeObject(comment.get('id'));
        comment.destroy();
        KG.activeCommentsController.get('content').removeObject(comment);
        //commit only on record
        KG.store.commitRecords(null, null, [comment.get('storeKey')]);
    }
});

});spade.register("kloudgis/sandbox/lib/core_notification", function(require, exports, __module, ARGV, ENV, __filename){
//must include jquery.atmosphere.js ext dependency
KG.core_notification = SC.Object.create({
	
    connectedEndpoint: null,
    callbackAdded: NO,
    postCallbackAdded: NO,

    listen: function() {
        var sandbox = KG.get('activeSandboxKey');
        var location = 'http://localhost/api_notification/general?sandbox=%@'.fmt(sandbox);
        //close active if any to avoid multiple open stream
        this.stopListen();
        $.atmosphere.subscribe(location, !this.callbackAdded ? this.atmosphereCallback: null, $.atmosphere.request = {
            transport: 'streaming',
            //enable websocket when tomcat (server side) supports it
            //	transport: 'websocket',
            headers: KG.core_auth.createAjaxRequestHeaders()
        });
        this.callbackAdded = YES;
        this.connectedEndpoint = $.atmosphere.response;
        //renew the listen after 8 hours
        this.timerId = setTimeout(function() {
            KG.core_notification.listen();
        },
        8 * 60 * 60 * 1000);
    },

    stopListen: function() {
        $.atmosphere.close();
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    },

    atmosphereCallback: function(response) {
        // Websocket events.
        $.atmosphere.log('info', ["response.state: " + response.state]);
        $.atmosphere.log('info', ["response.transport: " + response.transport]);
        $.atmosphere.log('info', ["response.status: " + response.status]);

        detectedTransport = response.transport;
        if (response.transport != 'polling' && response.state != 'connected' && response.state != 'closed' && response.state != 'messagePublished') {
            $.atmosphere.log('info', ["response.responseBody: " + response.responseBody]);
            if (response.status == 200) {
                var data = response.responseBody;
                if (!data || data.charAt(0) !== '{') {
                    console.log('Message ignored - Must be JSON format');
                } else {
                    try {
                        var oData = JSON.parse(data);
                        var messageData = KG.Message.create(oData);
                        console.log('Message received');
                        console.log(messageData);
						if(messageData.get('author') !== KG.core_auth.get('activeUser').user){
							if(messageData.get('type') === 'text'){
								KG.notificationsController.insertAt(0, messageData);
							}else if(messageData.get('type') === 'trx'){
								if(messageData.content.featuretype === 'sys_note'){
									//note modified : refresh
									console.log('Transaction on Note => Refresh');
									KG.core_note.refreshMarkers(YES);
								}else if(messageData.content.featuretype === 'sys_note_comment'){
									console.log('Transaction on Comments => Fetch comments');
									KG.core_note.fetchComments();
								}
							}							
						}else{
							KG.statechart.sendAction('notificationSent', messageData);
						}
                    } catch(e) {
                        console.log('NOTIFICATION: ' + e);
                    }
                }
            }
        }
    },

    postMessage: function(
    /*KG.Message*/
    message) {
        if (!this.connectedEndpoint) {
            return NO;
        }
        var sandbox = KG.get('activeSandboxKey');
        var location = 'http://localhost/api_notification/general?sandbox=%@'.fmt(sandbox);
        this.connectedEndpoint.push(location, null, $.atmosphere.request = {
            data: JSON.stringify(message.toDataHash()),
            headers: KG.core_auth.createAjaxRequestHeaders()
        });
		
		return YES;
    }

});

});spade.register("kloudgis/sandbox/lib/core_sandbox", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Core functions for the Sandbox page
**/

KG.core_sandbox = SC.Object.create({

    sandboxMeta: {},
    membership: null,
    isSandboxOwner: NO,

    mousePosition: null,

    setCenter: function(lonLat, zoom) {
        window.location.hash = 'lon:%@;lat:%@;zoom:%@'.fmt(lonLat.get('lon').toFixed(4), lonLat.get('lat').toFixed(4), zoom);
    },

    authenticate: function() {
        var success = KG.core_auth.load(this, this.authenticateCallback);
        return success;
    },

    authenticateCallback: function(message) {
        if (message === "_success") {
            //attempt to login to map service first to make the map rendering ready quickly
            $.ajax({
                type: 'POST',
                url: 'http://localhost/api_map/public/login?sandbox=%@'.fmt(KG.get('activeSandboxKey')),
                dataType: 'json',
                headers: KG.core_auth.createAjaxRequestHeaders(),
                contentType: 'application/json; charset=utf-8',
                context: this,
                error: function(jqXHR, textStatus, errorThrown) {
                    SC.Logger.error('Map login error: HTTP error status code: ' + jqXHR.status);
                },
                success: function(data, textStatus, jqXHR) {
                    console.log('Map login success.');
                    KG.statechart.sendAction('mapLoginSucceeded', this);
                },
                async: YES
            });
            KG.statechart.sendAction('authenticationSucceeded', this);
        } else {
            KG.statechart.sendAction('authenficationFailed', this);
        }
    },

    membershipCheck: function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost/api_data/protected/members/logged_member?sandbox=%@'.fmt(KG.get('activeSandboxKey')),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: KG.core_auth.createAjaxRequestHeaders(),
            context: this,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('Membership error: HTTP error status code: ' + jqXHR.status);
                KG.statechart.sendAction('membershipFailed', this);
            },
            success: function(data, textStatus, jqXHR) {
                console.log('SB Meta success.');
                this.set('membership', data);
                KG.statechart.sendAction('membershipSucceeded', this);
            },
            async: YES
        });
    },

    fetchSandboxMeta: function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost/api_sandbox/protected/sandboxes/%@/meta'.fmt(KG.get('activeSandboxKey')),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: KG.core_auth.createAjaxRequestHeaders(),
            context: this,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('SB Meta error: HTTP error status code: ' + jqXHR.status);
                if (KG.statechart) {
                    KG.statechart.sendAction('httpError', jqXHR.status);
                }
            },
            success: function(data, textStatus, jqXHR) {
                console.log('SB Meta success.');
                this.set('sandboxMeta', data);
				var lat = data.lat;
				var lon = data.lon;
				var zoom = data.zoom;
				if(lat && lon){
					KG.core_leaflet.setCenter(KG.LonLat.create({lon: lon, lat:lat}), zoom);
				}
            },
            async: YES
        });
    },

    metaDidChange: function() {
        console.log('Meta changed.');
        $('#active-sandbox-label span').text(this.get('sandboxMeta').name);
        this.set('isSandboxOwner', KG.core_auth.get('activeUser').id === this.get('sandboxMeta').owner)
    }.observes('sandboxMeta'),

    addMap: function() {
        var hashLoc = window.location.hash;
        var lat, lon, zoom
        if (hashLoc && hashLoc.length > 0) {
            var tokens = hashLoc.split(';');
            if (tokens.length === 3) {
                lon = parseFloat(tokens[0].substring(5));
                lat = parseFloat(tokens[1].substring(4));
                zoom = parseInt(tokens[2].substring(5));
            }
        }	
        KG.core_leaflet.addToDocument(lon, lat, zoom);
    },

    createNote: function() {
        KG.statechart.sendAction('createNoteAction');
    },

    latitudeLabel: function() {
        var pos = this.get('mousePosition');
        if (pos) {
            return 'Lat: %@'.fmt(pos.get('lat').toFixed(4));
        } else {
            return 'Lat: ?';
        }
    }.property('mousePosition'),

    longitudeLabel: function() {
        var pos = this.get('mousePosition');
        if (pos) {
            return 'Lon: %@'.fmt(pos.get('lon').toFixed(4));
        } else {
            return 'Lon: ?';
        }
    }.property('mousePosition'),

    autosize: function(element) {
        var el = $(element);
        if (el[0]) {
            el.autoResize({
                extraSpace: 20
            });
        } else {
            var self = this;
            setTimeout(function() {
                self.autosize(element)
            },
            300);
        }
    },

	destroyAutosize: function(element){
		var autoR = $(element).data('AutoResizer');
		if(autoR){
			autoR.destroy();
		}
	}
});

$(document).ready(function() {
    KG.statechart.initStatechart();
    if ($.browser.isIphone) {
		//tweaks to hide the address bar
        $('#box').addClass('mobile');
        setTimeout(function() {
            window.scrollTo(0, 1);
        },
        1000);
    }
});

});spade.register("kloudgis/sandbox/lib/core_search", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Core functions to perform searches
**/

KG.core_search = SC.Object.create({

    plugins: [],
	searchAsked: NO,

    addPlugin: function(plugin) {
        this.plugins.pushObject(plugin);
    },

    searchFeatures: function() {
        var search = KG.searchController.get('searchValue');
        var content = KG.searchController.get('content');
        var store = KG.store;
        if (content && content.destroy) {
            content.forEach(function(cat) {
                store.unloadRecord(KG.SearchCategory, cat.get('id'), cat.get('storeKey'))
            });
            content.destroy();
        }
        console.log('search for:' + search);
        var query = SC.Query.local(KG.SearchCategory, {
            query_url: 'http://localhost/api_data/protected/features/count_search?search_string=%@&sandbox=%@'.fmt(search, KG.get('activeSandboxKey')),
            conditions: 'count > 0 OR count = -1',
            orderBy: 'categoryLabel'
        });
        var records = store.find(query);
        KG.searchController.set('content', records);
        this.plugins.forEach(function(plugin) {
            plugin.set('searchValue', search);
        });
		this.set('searchAsked', YES);
    },

    clearSearchFeatures: function() {
        KG.searchController.set('searchValue', '');
        var content = KG.searchController.get('content');
        var store = KG.store;
        if (content && content.destroy) {
            content.forEach(function(cat) {
                store.unloadRecord(KG.SearchCategory, cat.get('id'), cat.get('storeKey'))
            });
            content.destroy();
        }
        KG.searchController.set('content', []);
		this.set('searchAsked', NO);
    },

    showResults: function() {
        KG.searchResultsController.set('listVisible', YES);
        var cat = KG.searchResultsController.get('category');
        if (SC.none(cat)) {
            var plugin = KG.searchResultsController.get('plugin');
            if (!SC.none(plugin)) {
                plugin.loadRecords(null, function(records) {
                    KG.searchResultsController.set('content', records);
                });
            }
        } else {
            var records = cat.get('records');
            KG.searchResultsController.set('content', records);
        }
    },

    hideResults: function() {
        KG.searchResultsController.set('listVisible', NO);
        setTimeout(function() {
            var content = KG.searchResultsController.get('content');
            if (content && content.destroy) {
                content.destroy();
            }
            KG.searchResultsController.set('category', null);
            KG.searchResultsController.set('content', []);
            //hide bottom list too.
            KG.core_search.clearSearchFeatures();
        },
        600);
    }
});

});spade.register("kloudgis/sandbox/lib/core_statechart", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Statechart for the sandbox page
**/

SC.mixin(KG, {
    //sandbox page state chart
    statechart: SC.Statechart.create({
        //log trace
        trace: NO,

        rootState: SC.State.extend({

            initialSubstate: 'tryAuthenticateState',

            //******************************
            // transient state to check 
            // if the user is logged in
            //******************************
            tryAuthenticateState: SC.State.extend({
                enterState: function() {
                    var sb = $.getQueryString('sandbox');
                    KG.set('activeSandboxKey', sb);

                    setTimeout(function() {
                        SC.run.begin();
                        KG.core_sandbox.authenticate();
                        SC.run.end();
                    },
                    1);
                },

                authenticationSucceeded: function() {
                    this.gotoState('tryMembershipState');
                },

                authenficationFailed: function() {
                    window.location.href = "index.html";
                }
            }),

            //******************************
            // transient state to check 
            // if the user is a member of 
            // the selected sandbox
            //******************************
            tryMembershipState: SC.State.extend({

                enterState: function() {
                    //show the map to not slow down the app
                    KG.core_sandbox.addMap();
                    KG.core_sandbox.membershipCheck();
                    KG.core_sandbox.fetchSandboxMeta();
                },

                membershipSucceeded: function() {
                    this.gotoState('runningState');
                },

                membershipFailed: function() {
                    window.location.href = "home.html?message=_wrong-membership";
                }
            }),

            //login successful on the map service.  We can add the layers
            mapLoginSucceeded: function() {
                KG.core_layer.loadLayers();
            },

            //******************************
            // Running 
            // The user can now use the App.
            //******************************
            runningState: SC.State.extend({

                substatesAreConcurrent: YES,

                enterState: function() {
                    KG.core_notification.listen();
                },

                //******************************
                // Concurrent state for Inpector
                // Inspector 
                //******************************
                inspectorState: SC.State.extend({
                    initialSubstate: 'inspectorHiddenState',

                    //******************************
                    // Inspector is Hidden 
                    //******************************
                    inspectorHiddenState: SC.State.extend({

                        selectFeatureInspectorAction: function(feature) {
                            if (feature && feature.get('isSelectable') && feature.get('isInspectorSelectable')) {
                                this.gotoState('inspectorVisibleState');
                                KG.core_inspector.selectFeature(feature);
                            }
                        }
                    }),

                    //******************************
                    // Inspector is visible
                    //******************************
                    inspectorVisibleState: SC.State.extend({

                        enterState: function() {
                            var panel = $('#left-side-panel');
                            panel.addClass('active');
                        },

                        exitState: function() {
                            var panel = $('#left-side-panel');
                            panel.removeClass('active');
                            KG.core_inspector.cleanSelectFeature();
                        },

                        selectFeatureInspectorAction: function(feature) {
                            if (feature && feature.get('isSelectable') && feature.get('isInspectorSelectable')) {
                                KG.core_inspector.selectFeature(feature);
                            }
                        },

                        closeInspectorAction: function() {
                            this.gotoState('inspectorHiddenState');
                        }
                    })
                }),

                //******************************
                // Concurrent state for Map Interaction
                // Map Interaction
                //******************************
                mapInteractionState: SC.State.extend({

                    initialSubstate: 'navigationState',

                    mapMovedAction: function() {
                        KG.core_note.refreshMarkers();
                    },

                    mapZoomedAction: function() {
                        KG.core_note.refreshMarkers();
                    },

                    //anytime, the user can perfrom a search
                    searchAction: function() {
                        KG.core_search.searchFeatures();
                    },

                    //select a search category from the list -> activate the result dialog
                    selectSearchCategoryAction: function(cat) {
                        KG.searchResultsController.set('category', cat);
                        this.gotoState('searchResultsState');
                    },

                    //select a search plugin from the list
                    selectSearchPluginAction: function(plugin) {
                        KG.searchResultsController.set('category', null);
                        KG.searchResultsController.set('plugin', plugin);
                        this.gotoState('searchResultsState');
                    },

                    //wipe the search category results
                    clearSearchAction: function() {
                        KG.core_search.clearSearchFeatures();
                    },

                    //a note as been clicked -> activate the note
                    clickMarkerAction: function(marker) {
                        this.gotoState('navigationState');
                        KG.core_note.continueMarkerClicked(marker);
                    },

                    //an ajax error happen... if 401, validate the login state
                    httpError: function(code) {
                        if (code === 401) {
                            KG.core_sandbox.authenticate();
                        }
                    },

                    //the user if definitly not logged in -> bring him back to the login page
                    authenficationFailed: function() {
                        window.location.href = "index.html";
                    },

                    toggleNotificationPopupAction: function() {
                        KG.notificationsController.set('activePopup', !KG.notificationsController.get('activePopup'));
                    },

                    clearNotificationAction: function() {
                        KG.notificationsController.set('content', []);
                        KG.notificationsController.set('activePopup', NO);
                    },

                    sendTextNotificationAction: function() {
                        this.gotoState('sendNotificationState');
                    },

                    //******************************
                    // Default state - Navigation
                    //******************************
                    navigationState: SC.State.extend({

                        _ignoreMouseClicked: YES,

                        enterState: function() {
                            console.log('enter navigation state');
                            //enable search field
                            KG.searchController.set('fieldDisabled', NO);
                            //refresh markers
                            KG.core_note.refreshMarkers();
                            var self = this;
                            setTimeout(function() {
                                self._ignoreMouseClicked = NO
                            },
                            100);
                        },

                        exitState: function() {
                            //disable search field
                            KG.searchController.set('fieldDisabled', YES);
                            this._ignoreMouseClicked = YES;
                        },

                        clickOnMapAction: function(lonLat) {
                            if (!this._ignoreMouseClicked) {
                                KG.core_sandbox.set('mousePosition', lonLat);
                                KG.core_info.findFeaturesAt(lonLat);
                            }
                        },

                        featureInfoReady: function() {
                            this.gotoState("popupFeatureInfoState");
                        },

                        clickMarkerAction: function(marker) {
                            KG.core_note.continueMarkerClicked(marker);
                        },

                        noteSelectedAction: function(note, params) {
                            KG.core_note.activateNote(note, params);
                            this.gotoState('editNoteState');
                        },

                        multipleNotesSelectedAction: function(notes, marker) {
                            KG.core_note.activateMultipleNotes(notes, marker);
                            this.gotoState('multipleNotesState');
                        },

                        createNoteAction: function() {
                            this.gotoState('locateNoteState');
                        }
                    }),

                    //******************************
                    // Show the search result
                    //******************************
                    searchResultsState: SC.State.extend({

                        _highlight: null,
                        _hlMarker: null,

                        enterState: function() {
                            console.log('show results state');
                            KG.core_search.showResults();
                        },

                        exitState: function() {
                            KG.core_search.hideResults();
                            KG.core_highlight.clearHighlight(this._highlight);
                            this._highlight = null;
                            KG.core_highlight.clearHighlightMarker(this._hlMarker);
                            this._hlMarker = null;
                        },

                        selectSearchCategoryAction: function(cat) {
                            KG.searchResultsController.set('category', cat);
                            KG.core_search.showResults();
                        },

                        selectSearchPluginAction: function(plugin) {
                            KG.searchResultsController.set('category', null);
                            KG.searchResultsController.set('plugin', plugin);
                            KG.core_search.showResults();
                        },

                        hideSearchResultAction: function() {
                            this.gotoState('navigationState');
                        },

                        createNoteFromFeatureAction: function(feature) {
                            //create the note and put it in edit mode
                            if (feature) {
                                KG.core_leaflet.setCenter(feature.get('center'));
                                KG.core_note.set('featureTemplate', feature);
                                this.gotoState('createNoteState');
                            }
                        },

                        featureZoomAction: function(feature) {
                            KG.core_highlight.clearHighlightMarker(this._hlMarker);
                            KG.core_highlight.clearHighlight(this._highlight);
                            this._highlight = KG.core_highlight.highlightFeature(feature);
                            if (KG.store.recordTypeFor(feature.get('storeKey')) === KG.Note) {
                                this._hlMarker = KG.core_highlight.addHighlightMarker(feature.get('center'));
                                KG.core_note.setHighlightMarker(this._hlMarker);
                            }
                            KG.core_leaflet.setCenter(feature.get('center'));

                        },

                        selectFeatureInspectorAction: function(feature) {
                            KG.core_highlight.clearHighlightMarker(this._hlMarker);
                            if (KG.store.recordTypeFor(feature.get('storeKey')) === KG.Note) {
                                var marker = KG.core_highlight.addHighlightMarker(feature.get('center'));
                                KG.core_note.setHighlightMarker(marker);
                                KG.core_note.activateNote(feature, {
                                    marker: marker
                                });
                                this.gotoState('editNoteState');
                            }
                        }
                    }),

                    //******************************
                    // Show the Feature Info result
                    //******************************
                    popupFeatureInfoState: SC.State.extend({

                        _highlight: null,

                        enterState: function() {
                            console.log('enter popupFeatureInfoState');
                            KG.core_info.showInfoPopup();
                        },

                        exitState: function() {
                            KG.core_highlight.clearHighlight(this._highlight);
                            this._highlight = null;
                            KG.core_info.hideInfoPopup();
                        },

                        hideInfoPopupAction: function() {
                            this.gotoState('navigationState');
                        },

                        selectFeatureInspectorAction: function() {
                            //the concurrent inspector state take care of showing the inspector
                            this.gotoState('navigationState');
                        },

                        featureInfoMouseUpAction: function(feature) {
                            KG.core_highlight.clearHighlight(this._highlight);
                            this._highlight = KG.core_highlight.highlightFeature(feature);
                        },

                        featureInfoMouseEnterAction: function(feature) {
                            KG.core_highlight.clearHighlight(this._highlight);
                            this._highlight = KG.core_highlight.highlightFeature(feature);
                        },

                        featureInfoMouseLeaveAction: function(feature) {
                            KG.core_highlight.clearHighlight(this._highlight);
                        }
                    }),

                    //******************************
                    // Show a popup dialog for note
                    //******************************
                    popupNoteState: SC.State.extend({

                        initialSubstate: 'locateNoteState',

                        exitState: function() {
                            KG.core_leaflet.closePopup();
                            KG.core_note.clearCreateNote();
                        },

                        mapMovedAction: function() {
                            //override map interaction action
                        },

                        mapZoomedAction: function() {
                            //override map interaction action
                        },

                        hideMarkerPopupAction: function() {
                            console.log('marker popup closed, go back to navigation...');
                            this.gotoState('navigationState');
                        },

                        clickOnMapAction: function(lonLat) {
                            console.log('click outside the popup');
                            this.gotoState('navigationState');
                        },

                        //******************************
                        // As the user to locate the note
                        // to create
                        //******************************
                        locateNoteState: SC.State.extend({

                            enterState: function() {
                                console.log('enter locatenotestate');
                                this._ignoreCancel = YES;
                                var self = this;
                                setTimeout(function() {
                                    self._ignoreCancel = NO;
                                },
                                500);
                                KG.core_note.locateNote();
                                KG.core_note.set('createNoteLabel', "_cancelCreateNote".loc());
                                KG.core_note.set('createNoteImg', KG.get('cancelCreateNoteImagePath'));
                            },

                            exitState: function() {
                                KG.core_note.set('createNoteLabel', "_createNote".loc());
                                KG.core_note.set('createNoteImg', KG.get('createNoteImagePath'));
                            },

                            hideMarkerPopupAction: function() {},

                            notePositionSetAction: function() {
                                console.log('note position is now set');
                                this.gotoState('createNoteState');
                            },

                            createNoteAction: function() {
                                if (!this._ignoreCancel) {
                                    console.log('cancel create note!');
                                    //cancel
                                    KG.core_note.cancelLocateNote();
                                    this.gotoState('navigationState');
                                }
                            }
                        }),

                        //******************************
                        // Show the form to enter the 
                        // note properties
                        //******************************
                        createNoteState: SC.State.extend({

                            enterState: function() {
                                console.log('enter createNoteState');
                                KG.core_note.createNote();
                                KG.core_sandbox.autosize('#note-description-area');
                            },

                            exitState: function() {
                                console.log('exit createNoteState');
                                KG.core_note.rollbackModifications();
                                KG.activeNoteController.set('content', null);
                                KG.core_note.clearCreateNote();
								KG.core_sandbox.destroyAutosize('#note-description-area');
                            },

                            confirmNoteAction: function() {
                                var note = KG.activeNoteController.get('content');
                                KG.core_note.commitModifications();
                                KG.core_note.confirmCreateNote();
                                this.gotoState('navigationState');
                            },

                            cancelCreateNoteAction: function() {
                                this.gotoState('navigationState');
                            }

                        }),

                        //******************************
                        // Show a dialog with a list
                        // of notes to let the user pick one.
                        //******************************
                        multipleNotesState: SC.State.extend({

                            enterState: function() {
                                console.log('enter multiple notes');
                            },

                            exitState: function() {
                                console.log('exit multiple notes');
                                KG.notesPopupController.set('marker', null);
                                KG.notesPopupController.set('content', []);
                            },

                            noteSelectedAction: function(note, params) {
                                KG.core_note.activateNote(note, params);
                                this.gotoState('editNoteState');
                            }
                        }),

                        //******************************
                        // Edit note popup.
                        // Detail view on the active Note
                        //******************************
                        editNoteState: SC.State.extend({

                            enterState: function() {
                                console.log('enter editNoteState');
                                KG.core_note.beginModifications();
                                KG.newCommentController.set('content', '');
                                KG.activeCommentsController.set('showComments', YES);
                                KG.activeCommentsController.set('showing', NO);
                                KG.activeCommentsController.set('isLoading', NO);
                                KG.core_sandbox.autosize('#note-description-area');
                            },

                            exitState: function() {
                                console.log('exit editNoteState');
                                KG.core_note.postEdition();
                                KG.activeNoteController.set('content', null);
                                KG.activeCommentsController.set('content', null);
                                KG.activeCommentsController.set('showComments', NO);
                                KG.activeCommentsController.set('showing', NO);
                                KG.deleteCommentController.set('content', null);
								KG.core_sandbox.destroyAutosize('#note-description-area');
                            },

                            showCommentsAction: function() {
                                console.log('show comments');
                                //show comment section
                                if (KG.activeCommentsController.get('length') === 0) {
                                    KG.core_note.fetchComments();
                                }
                                KG.activeCommentsController.set('showing', YES);
                                setTimeout(function() {
                                    KG.core_sandbox.autosize('#note-new-comment-area');
                                    var area = $("#note-new-comment-area");
                                    if (KG.activeCommentsController.getPath('content.length') === 0) {
                                        area.focus();
                                    }
                                },
                                1);

                            },

                            hideCommentsAction: function() {
                                //hide comment section
                                KG.activeCommentsController.set('showing', NO);
                            },

                            addCommentAction: function() {
                                var comment = KG.newCommentController.get('content');
                                if (!SC.none(comment)) {
                                    comment = comment.replace("\n", '');
                                    if (comment.length > 0) {
                                        KG.core_note.addCommentToActiveNote(comment);
                                    }
                                }
								KG.newCommentController.set('content', '');
                            },

                            commentsReadyEvent: function() {
                                setTimeout(function() {
                                    console.log('scroll to bottom');
                                    var container = $('.note-comments-container');
                                    if (container[0]) {
                                        container.scrollTop(container[0].scrollHeight);
                                    }
                                },
                                1);
                            },

                            toggleDeleteCommentButtonAction: function(comment) {
                                if (KG.deleteCommentController.get('content') === comment) {
                                    KG.deleteCommentController.set('content', null);
                                } else {
                                    KG.deleteCommentController.set('content', comment);
                                }
                            },

                            deleteCommentButtonAction: function(comment) {
                                if (KG.deleteCommentController.get('content') == comment) {
                                    KG.core_note.deleteComment(comment);
                                    KG.deleteCommentController.set('content', null);
                                }
                            },

                            confirmNoteAction: function() {
                                var note = KG.activeNoteController.get('content');
                                console.log('status is' + note.get('status'));
                                KG.core_note.commitModifications();
                                this.gotoState('navigationState');
                            },

                            deleteNoteAction: function() {
                                KG.core_note.deleteActiveNote();
                                KG.core_note.commitModifications();
                                this.gotoState('navigationState');
                            },

                            zoomNoteAction: function() {
                                KG.core_note.zoomActiveNote();
                                this.gotoState('navigationState');
                            }
                        })
                    }),
                    //******************************
                    // Show a popup dialog to send a notification
                    //******************************
                    sendNotificationState: SC.State.extend({

                        view: null,
                        timeout: null,

                        enterState: function() {
                            KG.sendNotificationController.set('showing', YES);
                            view = SC.View.create({
                                templateName: 'send-text-notification'
                            });
                            view.append();
                            KG.core_sandbox.autosize('#send-notification-panel textarea');
							this.focusArea();							
                        },

                        exitState: function() {
                            KG.sendNotificationController.set('showing', NO);
							KG.core_sandbox.destroyAutosize('#send-notification-panel textarea');
                            view.destroy();
                            view = null;
                            if (this.timeout) {
                                clearTimeout(this.timeout);
                                this.timeout = null;
                            }
                            KG.sendNotificationController.set('pendingMessage', null);
                            KG.sendNotificationController.set('feedbackMessage', '');
							KG.sendNotificationController.set('content', '');							
                        },

						focusArea:function(){
							setTimeout(function(){$('#send-notification-panel textarea').focus();},300);
						},

						sendNotificationButtonAction: function(){
							setTimeout(function(){$('#send-notification-panel textarea').data('AutoResizer').check();},305);	
							this.sendNotificationAction();
							this.focusArea();
						},

                        sendNotificationAction: function() {
                            var message = KG.sendNotificationController.get('content');
                            if (message && message.length > 0) {
								KG.sendNotificationController.set('content', '');															
                                if (this.timeout) {
                                    clearTimeout(this.timeout);
                                }
                                var notification = KG.Message.create({
                                    type: 'text',
                                    author: KG.core_auth.get('activeUser').user,
                                    content: {text:message},
                                    dateMillis: new Date().getTime()
                                });
                                KG.sendNotificationController.set('pendingNotification', notification);
                                var ret = KG.core_notification.postMessage(notification);
                                if (!ret) {
                                    KG.sendNotificationController.set('feedbackMessage', '_failedToSendMessage'.loc());
                                } else {
                                    KG.sendNotificationController.set('feedbackMessage', '');
									//10s timeout
									this.timeout = setTimeout(function(){										
										KG.sendNotificationController.set('pendingNotification', null);
										KG.sendNotificationController.set('feedbackMessage', '_timeoutSendMessage'.loc());},10000);
                                }								
                            }
                        },

						notificationSent: function(message){
							var pending = KG.sendNotificationController.get('pendingNotification');
							if(message && pending && SC.isEqual(message, pending)){
								KG.sendNotificationController.set('pendingNotification', null);
								KG.sendNotificationController.set('feedbackMessage', '_sendMessageSuccessful'.loc());
								if (this.timeout) {
                                    clearTimeout(this.timeout);
                                }
							}
						},

                        closeSendNotificationAction: function() {
                            this.gotoState('navigationState');
                        }
                    })
                })
            })
        })
    })
});

});spade.register("kloudgis/sandbox/lib/main", function(require, exports, __module, ARGV, ENV, __filename){
require("kloudgis/app/lib/main");
require("kloudgis/app/lib/views/button");
require("kloudgis/app/lib/views/text_field");
require("kloudgis/app/lib/views/text_area");
require("kloudgis/app/lib/views/loading_image");
require("kloudgis/auth/lib/main");
require("kloudgis/core/lib/main_ds");
require("kloudgis/core/lib/models/feature");
require("kloudgis/core/lib/models/bounds");
require("kloudgis/core/lib/core_date");
require("./strings");
require("./core_statechart");
require("./core_sandbox");
require("./core_leaflet");

require("./core_highlight");

//search
require("kloudgis/core/lib/models/search_category");
require("./core_search");
require("./controllers/search");
require("./controllers/search_results");
require("./views/search_field");
require("./views/search_result_label");
//search plugins
require("./search_plugins/core_google");
require("./search_plugins/core_geonames");
require("./search_plugins/core_osm");
require("./search_plugins/core_yahoo");

//inspector
require("./core_inspector");
require("./controllers/inspector");
require("./views/inspector_attribute");

//info
require("./controllers/info");
require("./core_info");
require("./views/feature_info_popup_item");
require("./views/expand_button");

//notes
require("./controllers/note_markers");
require("./controllers/notes_popup");
require("./controllers/active_note");
require("./controllers/active_comments");
require("./controllers/new_comment");
require("./controllers/delete_comment");
require("./core_note");
require("./models/note_marker");
require("./views/note_popup_item");
require("./views/comment_area");
require("./views/author");
require("./views/delete_comment");

//layers
require("./controllers/layers");
require("./models/layer");
require("./core_layer");

//notification
require("./models/message");
require("./core_notification");
require("./controllers/notifications");
require("./controllers/send_notification");
require("./views/notification");
require("./views/notification_button");
require("./views/text_notification_area");


});spade.register("kloudgis/sandbox/lib/models/layer", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Layer class definition.
**/

KG.Layer = KG.Record.extend(
/** @scope CoreKG.Layer.prototype */
{
	//options
	label: SC.Record.attr(String),
    renderOrder: SC.Record.attr(Number),
    isSelectable: SC.Record.attr(Boolean),
    canRender: SC.Record.attr(Boolean),
	featuretype: SC.Record.attr(String),
	//wms param
    name: SC.Record.attr(String),
    url: SC.Record.attr(String),
    visibility: SC.Record.attr(Boolean),
    buffer: SC.Record.attr(Number),
});

});spade.register("kloudgis/sandbox/lib/models/message", function(require, exports, __module, ARGV, ENV, __filename){
KG.Message = SC.Object.extend({
	
	author: null,
	type: null,
	content: null,
	dateMillis: null,
	
	formattedContent: function(){
		var content = this.getPath('content.text');
		if(content){
			//replace \n with <br> to enforce line break
			return content.replace(/\n/g, '<br>');
		}
		return content;
	}.property('content'),
	
	toDataHash:function(){
		return {
			author: this.author,
			type : this.type,
			content: this.content,
			dateMillis: this.dateMillis
		};
	},
	
	formattedDate: function(){
		  var date = this.get('dateMillis');
	        if (date) {
	            return KG.core_date.formatDate(date);
	        }
	        return '';
	}.property('dateMillis'),
	
	/* to be used by SC.isEqual*/
	isEqual: function(b){
		if(b.toDataHash){
			var aH = this.toDataHash();
			var bH = b.toDataHash();
			return JSON.stringify(aH) === JSON.stringify(bH);
		}
		return NO;
	}
	
});

});spade.register("kloudgis/sandbox/lib/models/note_marker", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Note marker definition.  A marker is rendered on the map.
**/

KG.NoteMarker = KG.Record.extend({

	lon: SC.Record.attr(Number),
    lat: SC.Record.attr(Number),

	tip: SC.Record.attr(String),
	
	isOnMap: NO,
	
	features: SC.Record.toMany('KG.Note',{
			isMaster: YES
	}),
	
	featureCount: function(){
		return this.getPath('features.length');
	}.property('features.length'),
	
	title: function(){
		var count = this.get('featureCount');
		var title;
		if(count > 1){
			title = '_Notes'.loc(count);
		}else{
			title = '_Note'.loc();
		}
		return title;
	}.property('featureCount'),
	
	tooltip: function(){
		var tip = this.get('tip');
		if(tip){
			if(tip.charAt(0) === '_'){
				var count = this.get('featureCount');
				return tip.loc(count);
			}else{
				return tip;
			}
		}
	}.property('tip', 'featureCount')
});

});spade.register("kloudgis/sandbox/lib/search_plugins/core_geonames", function(require, exports, __module, ARGV, ENV, __filename){
KG.core_geonames = SC.Object.create({

    title: '_searchGeonames'.loc(),

	pluginName: 'Geonames',

    searchValue: '',

    loadRecords: function(cb_target, cb) {
        var search = this.get('searchValue');
        $.ajax({
            type: 'GET',
            url: encodeURI('http://ws.geonames.org/searchJSON?q=%@&maxRows=10'.fmt(search)),
            dataType: 'json',
            context: this,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('Geonames error: HTTP error status code: ' + jqXHR.status);
            },
            success: function(data, textStatus, jqXHR) {
                console.log('Geonames success.');
                var records = [];
                if (data && data.geonames && data.geonames.length > 0) {
                    var results = data.geonames,
                    i;
                    for (i = 0; i < results.length; i++) {
                        var geo = {
                            x: results[i].lng,
                            y: results[i].lat
                        };
                        var lonLat = KG.LonLat.create({
                            lon: geo.x,
                            lat: geo.y
                        });
                        records.pushObject(SC.Object.create({
                            title: "%@, %@".fmt(results[i].toponymName, results[i].countryName),
                            coords: [geo],
                            center: lonLat,
                            hasCreateNote: YES
                        }));
                    }
                }
                cb.call(cb_target, records);
            },
            async: YES
        });
    },
});

KG.core_search.addPlugin(KG.core_geonames);

});spade.register("kloudgis/sandbox/lib/search_plugins/core_google", function(require, exports, __module, ARGV, ENV, __filename){
KG.core_google = SC.Object.create({

    title: "_searchGoogle".loc(),

	pluginName: 'Google',
	
    searchValue: '',

    loadRecords: function(cb_target, cb) {
        var search = this.get('searchValue');
        $.ajax({
            type: 'GET',
            url: encodeURI('/maps/api/geocode/json?address=%@&sensor=true'.fmt(search)),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            context: this,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('Google error: HTTP error status code: ' + jqXHR.status);
            },
            success: function(data, textStatus, jqXHR) {
                console.log('Google success.');
				var records = [];
                if (data && data.results && data.results.length > 0) {
                    var results = data.results,
                    i;
                    for (i = 0; i < results.length; i++) {
                        var geo = {
                            x: results[i].geometry.location.lng,
                            y: results[i].geometry.location.lat
                        };
                        var lonLat = KG.LonLat.create({
                            lon: geo.x,
                            lat: geo.y
                        });
                        records.pushObject(SC.Object.create({
                            title: results[i].formatted_address,
                            coords: [geo],
                            center: lonLat,
                            hasCreateNote: YES
                        }));
                    }                
                }
				cb.call(cb_target, records);
            },
            async: YES
        });
    },
});

KG.core_search.addPlugin(KG.core_google);

});spade.register("kloudgis/sandbox/lib/search_plugins/core_osm", function(require, exports, __module, ARGV, ENV, __filename){
KG.core_osm = SC.Object.create({

    title: '_searchOSM'.loc(),

	pluginName: 'OSM',

    searchValue: '',

    loadRecords: function(cb_target, cb) {
        var search = this.get('searchValue');
        $.ajax({
            type: 'GET',
            url: encodeURI('http://nominatim.openstreetmap.org/search?q=%@&format=json&limit=10'.fmt(search)),
            dataType: 'json',
            context: this,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('OSM error: HTTP error status code: ' + jqXHR.status);
            },
            success: function(data, textStatus, jqXHR) {
                console.log('OSM success.');
                var records = [];
                if (data && data.length > 0) {
                    var results = data,
                    i;
                    for (i = 0; i < results.length; i++) {
                        var geo = {
                            x: results[i].lon,
                            y: results[i].lat
                        };
                        var lonLat = KG.LonLat.create({
                            lon: geo.x,
                            lat: geo.y
                        });
                        records.pushObject(SC.Object.create({
                            title: "%@, %@".fmt(results[i].display_name),
                            coords: [geo],
                            center: lonLat,
                            hasCreateNote: YES
                        }));
                    }
                }
                cb.call(cb_target, records);
            },
            async: YES
        });
    },
});

KG.core_search.addPlugin(KG.core_osm);

});spade.register("kloudgis/sandbox/lib/search_plugins/core_yahoo", function(require, exports, __module, ARGV, ENV, __filename){
KG.core_yahoo = SC.Object.create({

    title: '_searchYahoo'.loc(),

    pluginName: 'Yahoo',

    searchValue: '',

    //jeanfelixg@yahoo.ca with domain http://kloudgis.org
    appId: '7w0MZN32',

    loadRecords: function(cb_target, cb) {
        var search = this.get('searchValue');
        $.ajax({
            type: 'GET',
            url: encodeURI('http://where.yahooapis.com/geocode?q=%@&appid=%@&flags=J&count=10&locale=%@_CA'.fmt(search, this.appId, KG.lang)),
            dataType: 'json',
            context: this,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('Yahoo error: HTTP error status code: ' + jqXHR.status);
            },
            success: function(data, textStatus, jqXHR) {
                console.log('Yahoo success.');
                var records = [];
                if (data && data.ResultSet && data.ResultSet.Results) {
                    var results = data.ResultSet.Results,
                    i;
                    for (i = 0; i < results.length; i++) {
                        var geo = {
                            x: results[i].longitude,
                            y: results[i].latitude
                        };
                        var lonLat = KG.LonLat.create({
                            lon: geo.x,
                            lat: geo.y
                        });
                        var props = ['line1', 'line2', 'line3', 'line4'];
                        var vals = [];
                        props.forEach(function(prop) {
							var val = results[i][prop];
							if(val && val.length > 0){
								vals.push(val);
							}
						});

                        records.pushObject(SC.Object.create({
                            title: vals.join(","),
                            coords: [geo],
                            center: lonLat,
                            hasCreateNote: YES
                        }));
                    }
                }
                cb.call(cb_target, records);
            },
            async: YES
        });
    },
});

KG.core_search.addPlugin(KG.core_yahoo);

});spade.register("kloudgis/sandbox/lib/strings", function(require, exports, __module, ARGV, ENV, __filename){
var fr = { 
	"_me": "Moi",
	"_Map": "Carte",
	"_Note": "Note",
	"_Notes": "%@ Notes",
	"_createNote": "Créer une note",
	"_cancelCreateNote": "Annuler la création",
	"_newNote" : "Nouvelle note",
	"_Delete": "Supprimer",
	"_backHome": "Retour",
	"_noteTitle": "Titre:",
	"_noteDescription": "Description:",
	"_noteConfirm": "Créer",
	"_noteUpdate": "Mise à jour",
	"_noteTitlePlaceholder": "Votre note",
	"_moveNote": "Glisser la note où vous le voulez.",
	"_author": "Par %@",
	"_0comment": "Ajouter un commentaire",
	"_1comment": "Un Commentaire",
	"_comments": "%@ Commentaires",
	"_0hideComment": "Cacher",
	"_1hideComment": "Cacher le commentaire",
	"_hideComments": "Cacher les %@ commentaires",
	"_commentPlaceholder": "Écrire un commentaire...",
	"_closeInspector": "Fermer l'inspecteur",
	"_closeSearch": "Fermer la fenêtre de résultat",	
	"_search": "Recherche...",
	"_searchResult": "%@ Résultats pour %@ dans %@",
	"_unknown" : "Élément",
	"_searchGoogle": "Rechercher Google",
	"_searchGeonames": "Rechercher Geonames",
	"_searchOSM": "Rechercher OSM",
	"_searchYahoo" : "Rechercher Yahoo",
	"_notificationTitle": "Notifications",
	"_notificationClear": "Effacer",
	"_notificationSendText": "Envoyer un message",
	"_notificationSendButton": "Envoyer",
	"_textMessageTitle": " a envoyé un message à ",
	"_sendOnEnterTooltip" : "Envoyer le message en appuyant sur Retour",
	"_failedToSendMessage": "Impossible d'envoyer le message.",
	"_timeoutSendMessage" : "Erreur lors de l'envoi du message.",
	"_sendMessageSuccessful" : "Message envoyé."
};

var en = {
	"_me": "Me",
	"_Map": "Map",
	"_Note": "Note",
	"_Notes": "%@ Notes",
	"_createNote": "Create Note",
	"_cancelCreateNote": "Cancel create note",
	"_newNote" : "New note",
	"_Delete": "Delete",
	"_backHome": "Return",
	"_noteTitle": "Title:",
	"_noteDescription": "Description:",
	"_noteConfirm": "Create",
	"_noteUpdate": "Update",
	"_noteTitlePlaceholder": "Your note",
	"_moveNote": "Drag where you want it.",
	"_author": "By %@",
	"_0comment": "Add a comment",
	"_1comment": "One comment",
	"_comments": "%@ comments",
	"_0hideComment": "Hide",
	"_1hideComment": "Hide the comment",
	"_hideComments": "Hide the %@ comments",
	"_commentPlaceholder": "Write a comment...",
	"_closeInspector": "Close the inspector",
	"_closeSearch": "Close the result window",
	"_search": "Search...",
	"_searchResult": "%@ Results for %@ in %@",
	"_unknown" : "Feature",
	"_searchGoogle": "Search Google",
	"_searchGeonames": "Search Geonames",
	"_searchOSM": "Search OSM",
	"_searchYahoo" : "Search Yahoo",
	"_notificationTitle": "Notifications",
	"_notificationClear": "Clear",
	"_notificationSendText": "Send a Message",
	"_notificationSendButton": "Send",
	"_textMessageTitle": " send a text message at ",
	"_sendOnEnterTooltip" : "Send the message on Enter",
	"_failedToSendMessage": "Cannot send the message.",
	"_timeoutSendMessage" : "Failed to send message.",
	"_sendMessageSuccessful" : "Message envoyé."	
};

if(KG.lang === 'fr'){
	SC.STRINGS = fr;
}else{
	SC.STRINGS = en;
}

//do the localize after the rendering
SC.run.schedule('render',null, function(){
	console.log('localize page');
	$('#back-home a').text("_backHome".loc());
	$('#create-note a').text("_createNote".loc());
	$('.notification-label').text("_notificationTitle".loc());
	$('#notification-clear-button').text("_notificationClear".loc());
	$('#notification-send-button').text("_notificationSendText".loc());	
});

});spade.register("kloudgis/sandbox/lib/views/author", function(require, exports, __module, ARGV, ENV, __filename){
/**
* View to show the author descriptor in a collectionview.
**/

KG.AuthorView = SC.View.extend({

	authorLabel: function(){
		var content = this.getPath('itemView.content');
		if(SC.none(content)){
			return '';
		}
		if (content.get('author') === KG.core_auth.activeUser.id){
			return '_me'.loc();
		}else{
			return content.get('author_descriptor');
		}
	}.property('itemView.content')
});

});spade.register("kloudgis/sandbox/lib/views/comment_area", function(require, exports, __module, ARGV, ENV, __filename){
/**
* View (TextArea) to add comment.
**/

KG.CommentAreaView = KG.TextArea.extend({

    insertNewline: function(event) {
        KG.statechart.sendAction('addCommentAction');
        var self = this;
        setTimeout(function() {
			self.$().data('AutoResizer').check()
        },
        205);
    },

    cancel: function() {
        this.set('value', '');
        this.$().blur();
    }

});

});spade.register("kloudgis/sandbox/lib/views/delete_comment", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Button to delete a note comment.  
**/

KG.DeleteCommentView = KG.Button.extend({
	
	isVisible: function(){
		var content = this.getPath('itemView.content');
		if(content === KG.deleteCommentController.get('content')){
			var auth = content.get('author');
	        if (!auth || auth === KG.core_auth.get('activeUser').id || KG.core_sandbox.get('isSandboxOwner')) {
	            return YES;
	        }
		}
		return NO;
	}.property('itemView.content', 'KG.deleteCommentController.content'),
	
	label: function(){
		return "_Delete".loc()
	}.property()
});

});spade.register("kloudgis/sandbox/lib/views/expand_button", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Toggle Button to expend/collapse.  
**/

KG.ExpandButtonView = SC.Button.extend({
	
	tagName: 'div',
	
	expanded: NO,
	
	logo: function(){
		if(this.get("expanded")){
			return 'resources/images/down_arrow_32.png';
		}else{
			return 'resources/images/up_arrow_32.png';
		}
	}.property('expanded'),
	
	mouseUp: function(e){
		this.set('expanded', !this.get('expanded'));
		return NO;
	}
});

});spade.register("kloudgis/sandbox/lib/views/feature_info_popup_item", function(require, exports, __module, ARGV, ENV, __filename){
/**
*  One Feature in the featureinfo popup.
**/

KG.FeatureInfoPopupItemView = SC.Button.extend({
	
	classNames: 'info-popup-item'.w(),
	
	tagName: 'div',
	
	isVisible: function(){
		if(this.get('ignoreIfFirst')){
			if(this.getPath('itemView.contentIndex') === 0){
				return NO;
			}
		}
		return YES;
	}.property('ignoreIfFirst'),

	
	mouseUp: function(e){
		var content = this.get('content') || this.getPath('itemView.content');
		KG.statechart.sendAction('featureInfoMouseUpAction', content);
		return NO;
	},
	
	mouseEnter: function(e){
		var content = this.get('content') || this.getPath('itemView.content');
		KG.statechart.sendAction('featureInfoMouseEnterAction', content);
		return NO;
	},
	
	mouseLeave: function(e){
		var content = this.get('content') || this.getPath('itemView.content');
		KG.statechart.sendAction('featureInfoMouseLeaveAction', content);
		return NO;
	}
});

});spade.register("kloudgis/sandbox/lib/views/inspector_attribute", function(require, exports, __module, ARGV, ENV, __filename){
/**
* View to render an attribute in the inspector.  Use the renderer propertie to set the renderer template.  read-only-renderer by default.
**/

KG.InspectorAttributeView = SC.View.extend({
	
	_renderer: null,
	
	destroy: function() {
		//console.log('inspector attribute destroy!!');
		this._super();
		if(!SC.none(this._renderer)){
			this._renderer.destroy();
			this._renderer = null;
		}
	},
	
	didInsertElement: function(){
		var ren;
		if(!SC.none(this._renderer)){
			this._renderer.destroy();
		}
		var renderer = this.getPath('itemView.content.renderer');
		if(renderer && SC.TEMPLATES[renderer]){
			ren = SC.View.create({templateName: renderer, parentView: this});
		}else{
			ren = SC.View.create({templateName: 'read-only-renderer', parentView: this});
		}
		ren.appendTo(this.get('element'));
		this._renderer = ren;
	}
});

});spade.register("kloudgis/sandbox/lib/views/note_popup_item", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Render a note item in a list (such as the "multiple notes popup")
**/

KG.NotePopupItemView = SC.Button.extend({
	
	classNames: 'popup-note-item'.w(),
	
	tagName: 'div',
	
	mouseUp: function(e){
		this._super(e);
		KG.statechart.sendAction('noteSelectedAction', this.getPath('itemView.content'), {marker: KG.notesPopupController.get('marker')});
		return NO;
	}
});

});spade.register("kloudgis/sandbox/lib/views/notification", function(require, exports, __module, ARGV, ENV, __filename){
KG.NotificationView = SC.View.extend({
	
	authorValue:function(){
		return this.getPath('contentView.content.author');
	}.property('content'),
	
	authorMailTo: function(){
		return 'mailto:%@'.fmt(this.getPath('contentView.content.author'));
	}.property('content'),
	
	titleValue:function(){
		return '_textMessageTitle'.loc();
	}.property('content'),
	
	dateValue:function(){
		return this.getPath('contentView.content.formattedDate');
	}.property('content'),
	
	messageValue:function(){
		return this.getPath('contentView.content.formattedContent');
	}.property('content')
})

});spade.register("kloudgis/sandbox/lib/views/notification_button", function(require, exports, __module, ARGV, ENV, __filename){
KG.NotificationButtonView = KG.Button.extend({
	notificationPath: 'resources/images/notification.png',
	notificationActivePath:  'resources/images/notification_active.png',
	
	activatedBinding: "KG.notificationsController.activePopup",
	
	notificationCountBinding: "KG.notificationsController.length",
	
	notificationImg: function(){
		if(this.get('activated')){
			return this.get('notificationActivePath');
		}else{
			return this.get('notificationPath');
		}
	}.property('activated')
	
	
});

});spade.register("kloudgis/sandbox/lib/views/search_field", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Search text field to perform a search of feature.
**/

KG.SearchField = KG.TextField.extend({
    type: "search",

    insertNewline: function() {
		KG.statechart.sendAction('searchAction');
	},
	
	cancel: function(){
		this.set('value', '');
		this.$().blur();
	},
	
	valueDidChange: function(){
		if(this.get('value') === ''){
			KG.statechart.sendAction('clearSearchAction');
		}
	}.observes('value')
});

});spade.register("kloudgis/sandbox/lib/views/search_result_label", function(require, exports, __module, ARGV, ENV, __filename){
/**
* View to renderer a feature in the search result list.
**/

KG.SearchResultLabelView = KG.Button.extend({
	
	tagName:'div',
	
	mouseUp: function(e){
		KG.statechart.sendAction('featureZoomAction', this.getPath('itemView.content'));
		return NO;
	}
});

});spade.register("kloudgis/sandbox/lib/views/text_notification_area", function(require, exports, __module, ARGV, ENV, __filename){
KG.TextNotificationAreaView = KG.TextArea.extend({

    insertNewline: function(event) {
        if (KG.sendNotificationController.get('sendOnEnterValue')) {
            KG.statechart.sendAction('sendNotificationAction');
        }
    },
});

});