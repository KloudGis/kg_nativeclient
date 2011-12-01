/* ===========================================================================
   BPM Combined Asset File
   MANIFEST: kloudgis ()
   This file is generated automatically by the bpm (http://www.bpmjs.org)
   =========================================================================*/

spade.register("kloudgis/core/lib/core_date", function(require, exports, __module, ARGV, ENV, __filename){
KG.core_date = SC.Object.create({
	
	formatDate: function(timeMillis){
        if (timeMillis) {
			//date from millis
            var d = new Date(timeMillis);
            var day = d.getDate();
            var month = d.getMonth() + 1; //months are zero based
            var year = d.getFullYear();		
			//now	
            var today = new Date();
			var curr_day = today.getDate();
	        var curr_month = today.getMonth() + 1; //months are zero based
	        var curr_year = today.getFullYear();
			//add zeros			
			var hour = d.getHours();
			if(hour < 10){
				hour = '0' + hour;
			}
			var min = d.getMinutes();
			if(min < 10){
				min = '0' + min;
			}
			if(curr_day === day && curr_month === month && curr_year == year){			
				return "%@:%@".fmt(hour, min);
			}else{
				if(month < 10){
					month = '0' + month;
				}
				if(day < 10){
					day = '0' + day;
				}
				return "%@-%@-%@ %@:%@".fmt(year, month, day, hour, min);
			}
        }
	}
});

});spade.register("kloudgis/core/lib/data_sources/store", function(require, exports, __module, ARGV, ENV, __filename){
//datasource
KG.Store = SC.DataSource.extend({

    // ..........................................................
    // QUERY SUPPORT
    // 
    /**

    Invoked by the store whenever it needs to retrieve data matching a
    specific query, triggered by find().  This method is called anytime
    you invoke SC.Store#find() with a query or SC.RecordArray#refresh().  You
    should override this method to actually retrieve data from the server
    needed to fulfill the query.  If the query is a remote query, then you
    will also need to provide the contents of the query as well.

    ### Handling Local Queries

    Most queries you create in your application will be local queries.  Local
    queries are populated automatically from whatever data you have in memory.
    When your fetch() method is called on a local queries, all you need to do
    is load any records that might be matched by the query into memory.

    The way you choose which queries to fetch is up to you, though usually it
    can be something fairly straightforward such as loading all records of a
    specified type.

    When you finish loading any data that might be required for your query,
    you should always call SC.Store#dataSourceDidFetchQuery() to put the query
    back into the READY state.  You should call this method even if you choose
    not to load any new data into the store in order to notify that the store
    that you think it is ready to return results for the query.

    ### Handling Remote Queries

    Remote queries are special queries whose results will be populated by the
    server instead of from memory.  Usually you will only need to use this
    type of query when loading large amounts of data from the server.

    Like Local queries, to fetch a remote query you will need to load any data
    you need to fetch from the server and add the records to the store.  Once
    you are finished loading this data, however, you must also call
    SC.Store#loadQueryResults() to actually set an array of storeKeys that
    represent the latest results from the server.  This will implicitly also
    call dataSourceDidFetchQuery() so you don't need to call this method
    yourself.

    If you want to support incremental loading from the server for remote
    queries, you can do so by passing a SC.SparseArray instance instead of
    a regular array of storeKeys and then populate the sparse array on demand.

    ### Handling Errors and Cancelations

    If you encounter an error while trying to fetch the results for a query
    you can call SC.Store#dataSourceDidErrorQuery() instead.  This will put
    the query results into an error state.

    If you had to cancel fetching a query before the results were returned,
    you can instead call SC.Store#dataSourceDidCancelQuery().  This will set
    the query back into the state it was in previously before it started
    loading the query.

    ### Return Values

    When you return from this method, be sure to return a Boolean.  YES means
    you handled the query, NO means you can't handle the query.  When using
    a cascading data source, returning NO will mean the next data source will
    be asked to fetch the same results as well.

    @param {SC.Store} store the requesting store
    @param {SC.Query} query query describing the request
    @returns {Boolean} YES if you can handle fetching the query, NO otherwise
  */
    fetch: function(store, query) {
        console.log('fetch url:%@'.fmt(query.get('query_url')));
        if (!SC.none(query.get('query_url'))) {
            $.ajax({
                type: 'GET',
                url: query.get('query_url'),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                context: this,
                headers: KG.core_auth.createAjaxRequestHeaders(),
                async: YES,
                error: function(jqXHR, textStatus, errorThrown) {
                    SC.run.begin();
                    SC.Logger.error('Load error: HTTP error status code: ' + jqXHR.status);
                    store.dataSourceDidErrorQuery(query, errorThrown);
					if (KG.statechart) {
	                    KG.statechart.sendAction('httpError', jqXHR.status);
	                }
                    SC.run.end();
                },
                success: function(data, textStatus, jqXHR) {
                    SC.run.begin();
                    console.log('fetch success');
                    var raw = data ? data.records: null;
                    var storeKeys;
                    if (!SC.none(raw)) {
                        storeKeys = store.loadRecords(query.get('recordType'), raw);
                    }
                    if (query.get('isLocal')) {
                        store.dataSourceDidFetchQuery(query);
                    } else {
                        store.loadQueryResults(query, storeKeys);
                    }
                    SC.run.end();
                }
            });
            return YES;
        }
        return NO;
    },

    // ..........................................................
    // RECORD SUPPORT
    // 
    retrieveRecord: function(store, storeKey) {
        var rtype = store.recordTypeFor(storeKey);
        var id = store.idFor(storeKey);
        var url;
        if (!SC.none(id)) {
            if (rtype === KG.Note) {
                url = 'http://localhost/api_data/protected/notes/%@?sandbox=%@'.fmt(id, KG.get('activeSandboxKey'));
            } else if (rtype === KG.Comment) {
                url = 'http://localhost/api_data/protected/comments/%@?sandbox=%@'.fmt(id, KG.get('activeSandboxKey'));
            }
            if (url) {
                this.ajaxSupport(store, storeKey, 'GET', url);
                return YES;
            }
        }
        return NO; // return YES if you handled the storeKey
    },

    createRecord: function(store, storeKey) {
        var rtype = store.recordTypeFor(storeKey);
        if (rtype === KG.Note) {
            url = 'http://localhost/api_data/protected/notes?sandbox=%@'.fmt(KG.get('activeSandboxKey'));
        } else if (rtype === KG.Comment) {
            url = 'http://localhost/api_data/protected/comments?sandbox=%@'.fmt(KG.get('activeSandboxKey'));
        }
        if (url) {
            this.ajaxSupport(store, storeKey, 'POST', url, JSON.stringify(store.readDataHash(storeKey)));
            return YES;
        }
        return NO;
    },

    updateRecord: function(store, storeKey, params) {
        var rtype = store.recordTypeFor(storeKey);
        var id = store.idFor(storeKey);
        var url;
        if (!SC.none(id)) {
            if (rtype === KG.Note) {
                url = 'http://localhost/api_data/protected/notes/%@?sandbox=%@'.fmt(id, KG.get('activeSandboxKey'));
            } else if (rtype === KG.Comment) {
                url = 'http://localhost/api_data/protected/comments/%@?sandbox=%@'.fmt(id, KG.get('activeSandboxKey'));
            }
        }
        if (url) {
            this.ajaxSupport(store, storeKey, 'PUT', url, JSON.stringify(store.readDataHash(storeKey)));
            return YES;
        }
        return NO;
    },

    destroyRecord: function(store, storeKey, params) {
        var rtype = store.recordTypeFor(storeKey);
        var id = store.idFor(storeKey);
        var url;
        if (!SC.none(id)) {
            if (rtype === KG.Note) {
                url = 'http://localhost/api_data/protected/notes/%@?sandbox=%@'.fmt(id, KG.get('activeSandboxKey'));
            } else if (rtype === KG.Comment) {
                url = 'http://localhost/api_data/protected/comments/%@?sandbox=%@'.fmt(id, KG.get('activeSandboxKey'));
            }
        }
        if (url) {
            this.ajaxSupport(store, storeKey, 'DELETE', url);
            return YES;
        }
        return NO;
    },

    ajaxSupport: function(store, storeKey, type, url, data) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            context: this,
            headers: KG.core_auth.createAjaxRequestHeaders(),
            async: YES,
            error: function(jqXHR, textStatus, errorThrown) {
                SC.Logger.error('Ajax error: HTTP error status code: ' + jqXHR.status);
                store.dataSourceDidError(storeKey, errorThrown);
                if (KG.statechart) {
                    KG.statechart.sendAction('httpError', jqXHR.status);
                }
            },
            success: function(data, textStatus, jqXHR) {
                console.log(type + ' success');
                var raw = data;
                var storeKeys;
                if (type === 'DELETE') {
                    store.dataSourceDidDestroy(storeKey);
                } else {
                    if (!SC.none(raw) && raw.guid) {
                        store.dataSourceDidComplete(storeKey, raw, raw.guid);
                    } else {
                        store.dataSourceDidComplete(storeKey);
                    }
                }
            }
        });
    }
});

});spade.register("kloudgis/core/lib/main_ds", function(require, exports, __module, ARGV, ENV, __filename){
require("sproutcore-datastore");
require("./data_sources/store");
require("./models/record");
require("./models/note");
require("./models/comment");

KG.store = SC.Store.create({
    commitRecordsAutomatically: NO
}).from('KG.Store');


//SC.RECORDARRAY
//add onReady, onError support to RecordArrays
SC.RecordArray.reopen({
    _readyQueue: null,
    _errorQuery: null,

    onReady: function(target, method, params) {
        if (this.get('status') & SC.Record.READY) {
            method.call(target, this, params);
        } else {
            var queue = this._readyQueue;
            if (!this._readyQueue) {
                queue = [];
                this._readyQueue = queue;
                this.addObserver('status', this, this._onReady);
            }
            var rec = this;
            queue.push(function() {
                method.call(target, rec, params);
            });
        }
    },

    _onReady: function() {
        if (this.get('status') & SC.Record.READY) {
            var queue = this._readyQueue;
            var idx, len;
            for (idx = 0, len = queue.length; idx < len; idx++) {
                queue[idx].call();
            }
            this.removeObserver('status', this, this._onReady);
            this._readyQueue = null;
        }
    },

    offReady: function() {
        this.removeObserver('status', this, this._onReady);
    },

    onError: function(target, method, params) {
        if (this.get('status') & SC.Record.ERROR) {
            method.call(target, this, params);
        } else {
            var queue = this._errorQueue;
            if (!this._errorQueue) {
                queue = [];
                this._errorQueue = queue;
                this.addObserver('status', this, this._onError);
            }
            var rec = this;
            queue.push(function() {
                method.call(target, rec, params);
            });
        }
    },

    _onError: function() {
        if (this.get('status') & SC.Record.ERROR) {
            var queue = this._errorQueue;
            var idx, len;
            for (idx = 0, len = queue.length; idx < len; idx++) {
                queue[idx].call();
            }
            this.removeObserver('status', this, this._onError);
            this._errorQueue = null;
        }
    },

    offError: function() {
        this.removeObserver('status', this, this._onError);
    }
});

//SC.RECORD
//add onReady, onError support to Record
SC.Record.reopen({
    _readyQueue: null,
    _errorQueue: null,
	_destroyQueue: null,

    onReady: function(target, method, params) {
        if (this.get('status') & SC.Record.READY) {
            method.call(target, this, params);
        } else {
            var queue = this._readyQueue;
            if (!queue) {
                queue = [];
                this._readyQueue = queue;
                this.addObserver('status', this, this._onReady);
            }
            var rec = this;
            queue.push(function() {
                method.call(target, rec, params);
            });
        }
    },

    _onReady: function() {
	//	console.log('onReady status is '  + this.get('status'));
        if (this.get('status') & SC.Record.READY) {
            var queue = this._readyQueue;
            var idx, len;
            for (idx = 0, len = queue.length; idx < len; idx++) {
                queue[idx].call();
            }
            this.removeObserver('status', this, this._onReady);
            this._readyQueue = null;
        }
    },

    offReady: function() {
        this.removeObserver('status', this, this._onReady);
    },

    onError: function(target, method, params) {
        if (this.get('status') & SC.Record.ERROR) {
            method.call(target, this, params);
        } else {
            var queue = this._errorQueue;
            if (!queue) {
                queue = [];
                this._errorQueue = queue;
                this.addObserver('status', this, this._onError);
            }
            var rec = this;
            queue.push(function() {
                method.call(target, rec, params);
            });
        }
    },

    _onError: function() {
        if (this.get('status') & SC.Record.ERROR) {
            var queue = this._errorQueue;
            var idx, len;
            for (idx = 0, len = queue.length; idx < len; idx++) {
                queue[idx].call();
            }
            this.removeObserver('status', this, this._onError);
            this._errorQueue = null;
        }
    },

    offError: function() {
        this.removeObserver('status', this, this._onError);
    },

	onDestroyedClean: function(target, method, params) {
        if (this.get('status') === SC.Record.DESTROYED_CLEAN) {
            method.call(target, this, params);
        } else {
            var queue = this._destroyQueue;
            if (!queue) {
                queue = [];
                this._destroyQueue = queue;
                this.addObserver('status', this, this._onDestroyedClean);
            }
            var rec = this;
            queue.push(function() {
                method.call(target, rec, params);
            });
        }
    },

    _onDestroyedClean: function() {
        if (this.get('status') === SC.Record.DESTROYED_CLEAN) {
            var queue = this._destroyQueue;
            var idx, len;
            for (idx = 0, len = queue.length; idx < len; idx++) {
                queue[idx].call();
            }
            this.removeObserver('status', this, this._onDestroyedClean);
            this._destroyQueue = null;
        }
    },

    offDestroyedClean: function() {
        this.removeObserver('status', this, this._onDestroyedClean);
    }
});


});spade.register("kloudgis/core/lib/models/attribute", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Feature attribute.  Similar to AttributeEntry in Space.
**/

KG.Attribute = SC.Object.extend({
	
	name: null,
	value: null,
	renderer: null,// 'text-renderer',
	isDirty: NO,
	
	charCount: function(){
		var v = this.get('value');
		if(v && v.length){
			return v.length; 
		}
		return 0;
	}.property('value'),
	
	valueDidChange: function(){
		this.set('isDirty', YES);
	}.observes('value')
});

});spade.register("kloudgis/core/lib/models/bounds", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Geometry bounds.  South-West and North-East envelope.
**/

KG.Bounds = SC.Object.extend({
	
	sw: null,
	ne: null,
	
	contains: function(obj){
		var sw = this.get('sw');
		var ne = this.get('ne');
		
		var sw2 = obj.get('sw');
		var ne2 = obj.get('ne');
		if(!sw2){
			sw2 = ne2 = obj;
		}
		return (sw2.get('lat') >= sw.get('lat')) && (ne2.get('lat') <= ne.get('lat')) &&
						(sw2.get('lon') >= sw.get('lon')) && (ne2.get('lon') <= ne.get('lon'));
	},
		
	toString: function() {
		return "sw:%@ ne:%@".fmt(this.get('sw'), this.get('ne'));
	}
});

});spade.register("kloudgis/core/lib/models/comment", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Comment for a Note.
**/

KG.Comment = KG.Record.extend({
	
	value: SC.Record.attr(String),
	author: SC.Record.attr(Number),
	author_descriptor: SC.Record.attr(String),
	date: SC.Record.attr(Number),
	note: SC.Record.toOne('KG.Note', {inverse: 'comments', isMaster: YES}),
	
	formattedDate: function(){
		var date = this.getPath('date');
        if (date) {
            return KG.core_date.formatDate(date);
        }
	}.property('date')
});

});spade.register("kloudgis/core/lib/models/feature", function(require, exports, __module, ARGV, ENV, __filename){
require('./attribute');
require('./lon_lat');
require('./record');
/**
* The Feature class with the feature id (fid), featuretype (ft), attributes (attrs), ...
**/
KG.Feature = KG.Record.extend({

    fid: SC.Record.attr(Number),
    ft: SC.Record.attr(String),
    date: SC.Record.attr(Number),
    geo_type: SC.Record.attr(String),
    coords: SC.Record.attr(Array),
    attrs: SC.Record.attr(Object),
    title_attr: SC.Record.attr(String),
    centroid: SC.Record.attr(Object),

    isSelectable: YES,
    isInspectorSelectable: YES,

    center: function() {
        var center;
        var centroid = this.get('centroid');
        if (!SC.none(centroid)) {
            center = centroid;
        } else {
            var coords = this.get('coords');
            if (!SC.none(coords) && coords.length > 0) {
                center = coords[0];
            }
        }
        if (!SC.none(center)) {
            return KG.LonLat.create({
                lon: center.x,
                lat: center.y
            });
        }
        return NO;
    }.property('coords', 'centroid'),

    title: function() {
        var attrs = this.get('attrs');
        return attrs[this.get('title_attr')];
    }.property('title_column'),

    getClosestCoord: function(coord) {
        var coords = this.get('coords');
        if (!SC.none(coords) && coords.length > 0) {
            if (!coord) {
                return coords[0];
            }
            var inLonLat = KG.LonLat.create({
                lon: coord.x,
                lat: coord.y
            });
            var len = coords.length,
            i, dist, closest;
            for (i = 0; i < len; i++) {
                var lonLat = KG.LonLat.create({
                    lon: coords[i].x,
                    lat: coords[i].y
                });
                var d = lonLat.distance(inLonLat);
                if (!dist || d < dist) {
                    dist = d;
                    closest = lonLat;
                }
            }
            return closest;
        }
        return NO;
    },

    getAttributes: function() {
        var ret = [];
        var attrs = this.get('attrs');
        if (!SC.none(attrs)) {
            for (var key in attrs) {
                var at = KG.Attribute.create({
                    name: key,
                    value: attrs[key]
                });
                ret.pushObject(at);
            }
        }
        return ret;
    }
});

});spade.register("kloudgis/core/lib/models/lon_lat", function(require, exports, __module, ARGV, ENV, __filename){
/**
* A position in Longitude/Latitude. 
**/

KG.LonLat = SC.Object.extend({
	lon:null,
	lat:null,
	
	distance: function(lonLat){
		var lon1 = this.get('lon'), lat1 = this.get('lat'), lon2 = lonLat.get('lon'), lat2 = lonLat.get('lat');
		var x = (lon2-lon1);
		var y = (lat2-lat1);
		var d = Math.sqrt(x*x + y*y);
		return d;
	},
	
	distanceKm: function(lonLat){
		var lon1 = this.get('lon'), lat1 = this.get('lat'), lon2 = lonLat.get('lon'), lat2 = lonLat.get('lat');
		var R = 6371; // km
		var dLat = this.toRad(lat2-lat1);
		var dLon = this.toRad(lon2-lon1);
		var lat1 = this.toRad(lat1);
		var lat2 = this.toRad(lat2);

		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c;
		return d;
	},
	
	toRad: function(Value) {
	    /** Converts numeric degrees to radians */
	    return Value * Math.PI / 180;
	}
});

});spade.register("kloudgis/core/lib/models/note", function(require, exports, __module, ARGV, ENV, __filename){
/**
* The class for Note. A note have a position (coordinate), a title, a description, a list comments, ...
**/

KG.Note = KG.Record.extend({
	
	title: SC.Record.attr(String),
	description: SC.Record.attr(String),
	author: SC.Record.attr(Number),
	author_descriptor: SC.Record.attr(String),
	date: SC.Record.attr(Number),
	coordinate: SC.Record.attr(Object),
	comments: SC.Record.toMany('KG.Comment', {inverse: 'note', isMaster: NO}),
	
	isSelectable: YES,
	isInspectorSelectable: NO,
	
	center: function(){
		var coordinate = this.get('coordinate');
		if(!SC.none(coordinate)){
			return KG.LonLat.create({
                lon: coordinate.x,
                lat: coordinate.y
            });
		}
	}.property('coordinate'),
	
	formattedDate: function() {
        var date = this.get('date');
        if (date) {
            var date = this.getPath('date');
	        if (date) {
	            return KG.core_date.formatDate(date);
	        }
        }
        return '';
    }.property('date'),

	authorFormatted: function() {
        var a = this.getPath('author_descriptor');
        if (a) {
            return "_author".loc(a);
        }
        return '';
    }.property('content.author_descriptor')
});

});spade.register("kloudgis/core/lib/models/record", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Extend SC.Record.  For the future.
**/

KG.Record = SC.Record.extend({});

});spade.register("kloudgis/core/lib/models/search_category", function(require, exports, __module, ARGV, ENV, __filename){
/**
* Search count result. Category with result count.
**/

KG.SearchCategory = KG.Record.extend({

    category: SC.Record.attr(String),
    categoryLabel: SC.Record.attr(String),
    count: SC.Record.attr(Number),
	search: SC.Record.attr(String),

    title: function() {
    	var cat = this.get('categoryLabel');
		if(!SC.none(cat)){
			if(cat.charAt(0) === '_'){
				return cat.loc();
			}else{
				return cat;
			}
		}
    }.property('categoryLabel'),

    records: function() {
		var recordType = KG.Feature;
		if(this.get('category') === '_notes_'){
			recordType = KG.Note;
		}
        var query = SC.Query.remote(recordType, {
            query_url: 'http://localhost/api_data/protected/features/search?category=%@&search_string=%@&sandbox=%@'.fmt(this.get('category'), this.get('search'), KG.get('activeSandboxKey')),
            conditions: 'count > 0'
        });
        return KG.store.find(query);
    }.property(),

});

});