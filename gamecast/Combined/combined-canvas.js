/** GENERATED: Fri May 23 01:00:34 PDT 2014 **/
/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */
(function( window, undefined ) {

// Use the correct document accordingly with window argument (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function() {

// Define a local copy of jQuery
var jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// A simple way to check for HTML strings or ID strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

	// Check if a string has a non-whitespace character in it
	rnotwhite = /\S/,

	// Used for trimming whitespace
	trimLeft = /^\s+/,
	trimRight = /\s+$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	// Useragent RegExp
	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	// Matches dashed string for camelizing
	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	// Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent,

	// For matching the engine and version of the browser
	browserMatch,

	// The deferred used on DOM ready
	readyList,

	// The ready event handler
	DOMContentLoaded,

	// Save a reference to some core methods
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> type pairs
	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handle $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// If a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );

						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}

					} else {
						ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}

					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The current version of jQuery being used
	jquery: "1.7.1",

	// The default length of a jQuery object is 0
	length: 0,

	// The number of elements contained in the matched element set
	size: function() {
		return this.length;
	},

	toArray: function() {
		return slice.call( this, 0 );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems, name, selector ) {
		// Build a new jQuery matched element set
		var ret = this.constructor();

		if ( jQuery.isArray( elems ) ) {
			push.apply( ret, elems );

		} else {
			jQuery.merge( ret, elems );
		}

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		ret.context = this.context;

		if ( name === "find" ) {
			ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
		} else if ( name ) {
			ret.selector = this.selector + "." + name + "(" + selector + ")";
		}

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Attach the listeners
		jQuery.bindReady();

		// Add the callback
		readyList.add( fn );

		return this;
	},

	eq: function( i ) {
		i = +i;
		return i === -1 ?
			this.slice( i ) :
			this.slice( i, i + 1 );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ),
			"slice", slice.call(arguments).join(",") );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {
		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	},

	bindReady: function() {
		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	// A crude way of determining if an object is a window
	isWindow: function( obj ) {
		return obj && typeof obj === "object" && "setInterval" in obj;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	},

	isPlainObject: function( obj ) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		for ( var name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	parseJSON: function( data ) {
		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	// args is for internal usage only
	each: function( object, callback, args ) {
		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	},

	// Use native String.trim function wherever possible
	trim: trim ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
		},

	// results is for internal usage only
	makeArray: function( array, results ) {
		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	},

	inArray: function( elem, array, i ) {
		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	},

	// Mutifunctional method to get and set values to a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, key, value, exec, fn, pass ) {
		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// Use of jQuery.browser is frowned upon.
	// More details: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function( ua ) {
		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	},

	sub: function() {
		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	},

	browser: {}
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

browserMatch = jQuery.uaMatch( userAgent );
if ( browserMatch.browser ) {
	jQuery.browser[ browserMatch.browser ] = true;
	jQuery.browser.version = browserMatch.version;
}

// Deprecated, use jQuery.browser.webkit instead
if ( jQuery.browser.webkit ) {
	jQuery.browser.safari = true;
}

// IE doesn't match non-breaking spaces with \s
if ( rnotwhite.test( "\xA0" ) ) {
	trimLeft = /^[\s\xA0]+/;
	trimRight = /[\s\xA0]+$/;
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);

// Cleanup functions for the document ready method
if ( document.addEventListener ) {
	DOMContentLoaded = function() {
		document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
		jQuery.ready();
	};

} else if ( document.attachEvent ) {
	DOMContentLoaded = function() {
		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( document.readyState === "complete" ) {
			document.detachEvent( "onreadystatechange", DOMContentLoaded );
			jQuery.ready();
		}
	};
}

// The DOM ready check for Internet Explorer
function doScrollCheck() {
	if ( jQuery.isReady ) {
		return;
	}

	try {
		// If IE is used, use the trick by Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll("left");
	} catch(e) {
		setTimeout( doScrollCheck, 1 );
		return;
	}

	// and execute any waiting functions
	jQuery.ready();
}

return jQuery;

})();


// String to Object flags format cache
var flagsCache = {};

// Convert String-formatted flags into Object-formatted ones and store in cache
function createFlags( flags ) {
	var object = flagsCache[ flags ] = {},
		i, length;
	flags = flags.split( /\s+/ );
	for ( i = 0, length = flags.length; i < length; i++ ) {
		object[ flags[i] ] = true;
	}
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	flags:	an optional list of space-separated flags that will change how
 *			the callback list behaves
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible flags:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( flags ) {

	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!memory;
			}
		};

	return self;
};




var // Static reference to slice
	sliceDeferred = [].slice;

jQuery.extend({

	Deferred: function( func ) {
		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( firstParam ) {
		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	}
});




jQuery.support = (function() {

	var support,
		all,
		a,
		select,
		opt,
		input,
		marginDiv,
		fragment,
		tds,
		events,
		eventName,
		i,
		isSupported,
		div = document.createElement( "div" ),
		documentElement = document.documentElement;

	// Preliminary tests
	div.setAttribute("className", "t");
	div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";

	all = div.getElementsByTagName( "*" );
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Can't get basic test support
	if ( !all || !all.length || !a ) {
		return {};
	}

	// First batch of supports tests
	select = document.createElement( "select" );
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName( "input" )[ 0 ];

	support = {
		// IE strips leading whitespace when .innerHTML is used
		leadingWhitespace: ( div.firstChild.nodeType === 3 ),

		// Make sure that tbody elements aren't automatically inserted
		// IE will insert them into empty tables
		tbody: !div.getElementsByTagName("tbody").length,

		// Make sure that link elements get serialized correctly by innerHTML
		// This requires a wrapper element in IE
		htmlSerialize: !!div.getElementsByTagName("link").length,

		// Get the style information from getAttribute
		// (IE uses .cssText instead)
		style: /top/.test( a.getAttribute("style") ),

		// Make sure that URLs aren't manipulated
		// (IE normalizes it by default)
		hrefNormalized: ( a.getAttribute("href") === "/a" ),

		// Make sure that element opacity exists
		// (IE uses filter instead)
		// Use a regex to work around a WebKit issue. See #5145
		opacity: /^0.55/.test( a.style.opacity ),

		// Verify style float existence
		// (IE uses styleFloat instead of cssFloat)
		cssFloat: !!a.style.cssFloat,

		// Make sure that if no value is specified for a checkbox
		// that it defaults to "on".
		// (WebKit defaults to "" instead)
		checkOn: ( input.value === "on" ),

		// Make sure that a selected-by-default option has a working selected property.
		// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
		optSelected: opt.selected,

		// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
		getSetAttribute: div.className !== "t",

		// Tests for enctype support on a form(#6743)
		enctype: !!document.createElement("form").enctype,

		// Makes sure cloning an html5 element does not cause problems
		// Where outerHTML is undefined, this still works
		html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",

		// Will be defined later
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Test to see if it's possible to delete an expando from an element
	// Fails in Internet Explorer
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
		div.attachEvent( "onclick", function() {
			// Cloning a node shouldn't copy over any
			// bound event handlers (IE does this)
			support.noCloneEvent = false;
		});
		div.cloneNode( true ).fireEvent( "onclick" );
	}

	// Check if a radio maintains its value
	// after being appended to the DOM
	input = document.createElement("input");
	input.value = "t";
	input.setAttribute("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute("checked", "checked");
	div.appendChild( input );
	fragment = document.createDocumentFragment();
	fragment.appendChild( div.lastChild );

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	fragment.removeChild( input );
	fragment.appendChild( div );

	div.innerHTML = "";

	// Check if div with explicit width and no margin-right incorrectly
	// gets computed margin-right based on width of container. For more
	// info see bug #3333
	// Fails in WebKit before Feb 2011 nightlies
	// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	if ( window.getComputedStyle ) {
		marginDiv = document.createElement( "div" );
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.style.width = "2px";
		div.appendChild( marginDiv );
		support.reliableMarginRight =
			( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
	}

	// Technique from Juriy Zaytsev
	// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
	// We only care about the case where non-standard event systems
	// are used, namely in IE. Short-circuiting here helps us to
	// avoid an eval call (in setAttribute) which can cause CSP
	// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
	if ( div.attachEvent ) {
		for( i in {
			submit: 1,
			change: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = ( eventName in div );
			if ( !isSupported ) {
				div.setAttribute( eventName, "return;" );
				isSupported = ( typeof div[ eventName ] === "function" );
			}
			support[ i + "Bubbles" ] = isSupported;
		}
	}

	fragment.removeChild( div );

	// Null elements to avoid leaks in IE
	fragment = select = opt = marginDiv = div = input = null;

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, outer, inner, table, td, offsetSupport,
			conMarginTop, ptlm, vb, style, html,
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		conMarginTop = 1;
		ptlm = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;";
		vb = "visibility:hidden;border:0;";
		style = "style='" + ptlm + "border:5px solid #000;padding:0;'";
		html = "<div " + style + "><div></div></div>" +
			"<table " + style + " cellpadding='0' cellspacing='0'>" +
			"<tr><td></td></tr></table>";

		container = document.createElement("div");
		container.style.cssText = vb + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
		body.insertBefore( container, body.firstChild );

		// Construct the test element
		div = document.createElement("div");
		container.appendChild( div );

		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		// (only IE 8 fails this test)
		div.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName( "td" );
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Check if empty table cells still have offsetWidth/Height
		// (IE <= 8 fail this test)
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Figure out if the W3C box model works as expected
		div.innerHTML = "";
		div.style.width = div.style.paddingLeft = "1px";
		jQuery.boxModel = support.boxModel = div.offsetWidth === 2;

		if ( typeof div.style.zoom !== "undefined" ) {
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			// (IE < 8 does this)
			div.style.display = "inline";
			div.style.zoom = 1;
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 2 );

			// Check if elements with layout shrink-wrap their children
			// (IE 6 does this)
			div.style.display = "";
			div.innerHTML = "<div style='width:4px;'></div>";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 2 );
		}

		div.style.cssText = ptlm + vb;
		div.innerHTML = html;

		outer = div.firstChild;
		inner = outer.firstChild;
		td = outer.nextSibling.firstChild.firstChild;

		offsetSupport = {
			doesNotAddBorder: ( inner.offsetTop !== 5 ),
			doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
		};

		inner.style.position = "fixed";
		inner.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
		inner.style.position = inner.style.top = "";

		outer.style.overflow = "hidden";
		outer.style.position = "relative";

		offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
		offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );

		body.removeChild( container );
		div  = container = null;

		jQuery.extend( support, offsetSupport );
	});

	return support;
})();




var rbrace = /^(?:\{.*\}|\[.*\])$/,
	rmultiDash = /([A-Z])/g;

jQuery.extend({
	cache: {},

	// Please use with caution
	uuid: 0,

	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	},

	removeData: function( elem, name, pvt /* Internal Use Only */ ) {
		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ internalKey ] : internalKey;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return jQuery.data( elem, name, data, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var parts, attr, name,
			data = null;

		if ( typeof key === "undefined" ) {
			if ( this.length ) {
				data = jQuery.data( this[0] );

				if ( this[0].nodeType === 1 && !jQuery._data( this[0], "parsedAttrs" ) ) {
					attr = this[0].attributes;
					for ( var i = 0, l = attr.length; i < l; i++ ) {
						name = attr[i].name;

						if ( name.indexOf( "data-" ) === 0 ) {
							name = jQuery.camelCase( name.substring(5) );

							dataAttr( this[0], name, data[ name ] );
						}
					}
					jQuery._data( this[0], "parsedAttrs", true );
				}
			}

			return data;

		} else if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		parts = key.split(".");
		parts[1] = parts[1] ? "." + parts[1] : "";

		if ( value === undefined ) {
			data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);

			// Try to fetch any internally stored data first
			if ( data === undefined && this.length ) {
				data = jQuery.data( this[0], key );
				data = dataAttr( this[0], key, data );
			}

			return data === undefined && parts[1] ?
				this.data( parts[0] ) :
				data;

		} else {
			return this.each(function() {
				var self = jQuery( this ),
					args = [ parts[0], value ];

				self.triggerHandler( "setData" + parts[1] + "!", args );
				jQuery.data( this, key, value );
				self.triggerHandler( "changeData" + parts[1] + "!", args );
			});
		}
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
				data === "false" ? false :
				data === "null" ? null :
				jQuery.isNumeric( data ) ? parseFloat( data ) :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	for ( var name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}




function handleQueueMarkDefer( elem, type, src ) {
	var deferDataKey = type + "defer",
		queueDataKey = type + "queue",
		markDataKey = type + "mark",
		defer = jQuery._data( elem, deferDataKey );
	if ( defer &&
		( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
		( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
		// Give room for hard-coded callbacks to fire first
		// and eventually mark/queue something else on the element
		setTimeout( function() {
			if ( !jQuery._data( elem, queueDataKey ) &&
				!jQuery._data( elem, markDataKey ) ) {
				jQuery.removeData( elem, deferDataKey, true );
				defer.fire();
			}
		}, 0 );
	}
}

jQuery.extend({

	_mark: function( elem, type ) {
		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	},

	_unmark: function( force, elem, type ) {
		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	},

	queue: function( elem, type, data ) {
		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
		}

		if ( data === undefined ) {
			return jQuery.queue( this[0], type );
		}
		return this.each(function() {
			var queue = jQuery.queue( this, type, data );

			if ( type === "fx" && queue[0] !== "inprogress" ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, object ) {
		if ( typeof type !== "string" ) {
			object = type;
			type = undefined;
		}
		type = type || "fx";
		var defer = jQuery.Deferred(),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			tmp;
		function resolve() {
			if ( !( --count ) ) {
				defer.resolveWith( elements, [ elements ] );
			}
		}
		while( i-- ) {
			if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
					( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
						jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
					jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
				count++;
				tmp.add( resolve );
			}
		}
		resolve();
		return defer.promise();
	}
});




var rclass = /[\n\t\r]/g,
	rspace = /\s+/,
	rreturn = /\r/g,
	rtype = /^(?:button|input)$/i,
	rfocusable = /^(?:button|input|object|select|textarea)$/i,
	rclickable = /^a(?:rea)?$/i,
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	nodeHook, boolHook, fixSpecified;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.attr );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, name, value, true, jQuery.prop );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, i, l, elem, className, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call(this, j, this.className) );
			});
		}

		if ( (value && typeof value === "string") || value === undefined ) {
			classNames = ( value || "" ).split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 && elem.className ) {
					if ( value ) {
						className = (" " + elem.className + " ").replace( rclass, " " );
						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							className = className.replace(" " + classNames[ c ] + " ", " ");
						}
						elem.className = jQuery.trim( className );

					} else {
						elem.className = "";
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isBool = typeof stateVal === "boolean";

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					state = stateVal,
					classNames = value.split( rspace );

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space seperated list
					state = isBool ? state : !self.hasClass( className );
					self[ state ? "addClass" : "removeClass" ]( className );
				}

			} else if ( type === "undefined" || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// toggle whole className
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.nodeName.toLowerCase() ] || jQuery.valHooks[ elem.type ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var self = jQuery(this), val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, self.val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.nodeName.toLowerCase() ] || jQuery.valHooks[ this.type ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return jQuery( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = jQuery.makeArray( value );

				jQuery(elem).find("option").each(function() {
					this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attrFn: {
		val: true,
		css: true,
		html: true,
		text: true,
		data: true,
		width: true,
		height: true,
		offset: true
	},

	attr: function( elem, name, value, pass ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var propName, attrNames, name, l,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;

					// See #9699 for explanation of this approach (setting first, then removal)
					jQuery.attr( elem, name, "" );
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( rboolean.test( name ) && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
					jQuery.error( "type property can't be changed" );
				} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to it's default in case type is set after value
					// This is for element creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		},
		// Use the value property for back compat
		// Use the nodeHook for button elements in IE6/7 (#1954)
		value: {
			get: function( elem, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
					return nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;

// Hook for boolean attributes
boolHook = {
	get: function( elem, name ) {
		// Align boolean attributes with corresponding properties
		// Fall back to attribute presence where some booleans are not supported
		var attrNode,
			property = jQuery.prop( elem, name );
		return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
			name.toLowerCase() :
			undefined;
	},
	set: function( elem, value, name ) {
		var propName;
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			// value is true since we know at this point it's type boolean and not false
			// Set boolean attributes to the same name and set the DOM property
			propName = jQuery.propFix[ name ] || name;
			if ( propName in elem ) {
				// Only set the IDL specifically if it already exists on the element
				elem[ propName ] = true;
			}

			elem.setAttribute( name, name.toLowerCase() );
		}
		return name;
	}
};

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	fixSpecified = {
		name: true,
		id: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
				ret.nodeValue :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.nodeValue = value + "" );
		}
	};

	// Apply the nodeHook to tabindex
	jQuery.attrHooks.tabindex.set = nodeHook.set;

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		});
	});

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		get: nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			nodeHook.set( elem, value, name );
		}
	};
}


// Some attributes require a special call on IE
if ( !jQuery.support.hrefNormalized ) {
	jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
			get: function( elem ) {
				var ret = elem.getAttribute( name, 2 );
				return ret === null ? undefined : ret;
			}
		});
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Normalize to lowercase since IE uppercases css property names
			return elem.style.cssText.toLowerCase() || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = "" + value );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	});
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
if ( !jQuery.support.checkOn ) {
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	});
});




var rformElems = /^(?:textarea|input|select)$/i,
	rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
	rhoverHack = /\bhover(\.\S+)?\b/,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
	quickParse = function( selector ) {
		var quick = rquickIs.exec( selector );
		if ( quick ) {
			//   0  1    2   3
			// [ _, tag, id, class ]
			quick[1] = ( quick[1] || "" ).toLowerCase();
			quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
		}
		return quick;
	},
	quickIs = function( elem, m ) {
		var attrs = elem.attributes || {};
		return (
			(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
			(!m[2] || (attrs.id || {}).value === m[2]) &&
			(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
		);
	},
	hoverHack = function( events ) {
		return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
	};

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	add: function( elem, types, handler, data, selector ) {

		var elemData, eventHandle, events,
			t, tns, type, namespaces, handleObj,
			handleObjIn, quick, handlers, special;

		// Don't attach events to noData or text/comment nodes (allow plain objects tho)
		if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		events = elemData.events;
		if ( !events ) {
			elemData.events = events = {};
		}
		eventHandle = elemData.handle;
		if ( !eventHandle ) {
			elemData.handle = eventHandle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		// jQuery(...).bind("mouseover mouseout", fn);
		types = jQuery.trim( hoverHack(types) ).split( " " );
		for ( t = 0; t < types.length; t++ ) {

			tns = rtypenamespace.exec( types[t] ) || [];
			type = tns[1];
			namespaces = ( tns[2] || "" ).split( "." ).sort();

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: tns[1],
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				quick: quickParse( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			handlers = events[ type ];
			if ( !handlers ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	global: {},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
			t, tns, type, origType, namespaces, origCount,
			j, events, special, handle, eventType, handleObj;

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
		for ( t = 0; t < types.length; t++ ) {
			tns = rtypenamespace.exec( types[t] ) || [];
			type = origType = tns[1];
			namespaces = tns[2];

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector? special.delegateType : special.bindType ) || type;
			eventType = events[ type ] || [];
			origCount = eventType.length;
			namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;

			// Remove matching events
			for ( j = 0; j < eventType.length; j++ ) {
				handleObj = eventType[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					 ( !handler || handler.guid === handleObj.guid ) &&
					 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
					 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					eventType.splice( j--, 1 );

					if ( handleObj.selector ) {
						eventType.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( eventType.length === 0 && origCount !== eventType.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			handle = elemData.handle;
			if ( handle ) {
				handle.elem = null;
			}

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery.removeData( elem, [ "events", "handle" ], true );
		}
	},

	// Events that are safe to short-circuit if no handlers are attached.
	// Native DOM events should not be added, they may have inline handlers.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		// Don't do events on text and comment nodes
		if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
			return;
		}

		// Event object or event type
		var type = event.type || event,
			namespaces = [],
			cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "!" ) >= 0 ) {
			// Exclusive events trigger only for the exact event (no namespaces)
			type = type.slice(0, -1);
			exclusive = true;
		}

		if ( type.indexOf( "." ) >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}

		if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
			// No jQuery handlers for this event type, and it can't have inline handlers
			return;
		}

		// Caller can pass in an Event, Object, or just an event type string
		event = typeof event === "object" ?
			// jQuery.Event object
			event[ jQuery.expando ] ? event :
			// Object literal
			new jQuery.Event( type, event ) :
			// Just the event type (string)
			new jQuery.Event( type );

		event.type = type;
		event.isTrigger = true;
		event.exclusive = exclusive;
		event.namespace = namespaces.join( "." );
		event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
		ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";

		// Handle a global trigger
		if ( !elem ) {

			// TODO: Stop taunting the data cache; remove global events and always attach to document
			cache = jQuery.cache;
			for ( i in cache ) {
				if ( cache[ i ].events && cache[ i ].events[ type ] ) {
					jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
				}
			}
			return;
		}

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data != null ? jQuery.makeArray( data ) : [];
		data.unshift( event );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		eventPath = [[ elem, special.bindType || type ]];
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
			old = null;
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push([ cur, bubbleType ]);
				old = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( old && old === elem.ownerDocument ) {
				eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
			}
		}

		// Fire handlers on the event path
		for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {

			cur = eventPath[i][0];
			event.type = eventPath[i][1];

			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}
			// Note that this is a bare JS function and not a jQuery handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
				!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				// IE<9 dies on focus/blur to hidden element (#1486)
				if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					old = elem[ ontype ];

					if ( old ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( old ) {
						elem[ ontype ] = old;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event || window.event );

		var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
			delegateCount = handlers.delegateCount,
			args = [].slice.call( arguments, 0 ),
			run_all = !event.exclusive && !event.namespace,
			handlerQueue = [],
			i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Determine handlers that should run if there are delegated events
		// Avoid disabled elements in IE (#6911) and non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && !event.target.disabled && !(event.button && event.type === "click") ) {

			// Pregenerate a single jQuery object for reuse with .is()
			jqcur = jQuery(this);
			jqcur.context = this.ownerDocument || this;

			for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
				selMatch = {};
				matches = [];
				jqcur[0] = cur;
				for ( i = 0; i < delegateCount; i++ ) {
					handleObj = handlers[ i ];
					sel = handleObj.selector;

					if ( selMatch[ sel ] === undefined ) {
						selMatch[ sel ] = (
							handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
						);
					}
					if ( selMatch[ sel ] ) {
						matches.push( handleObj );
					}
				}
				if ( matches.length ) {
					handlerQueue.push({ elem: cur, matches: matches });
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( handlers.length > delegateCount ) {
			handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
		}

		// Run delegates first; they may want to stop propagation beneath us
		for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
			matched = handlerQueue[ i ];
			event.currentTarget = matched.elem;

			for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
				handleObj = matched.matches[ j ];

				// Triggered event must either 1) be non-exclusive and have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {

					event.data = handleObj.data;
					event.handleObj = handleObj;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						event.result = ret;
						if ( ret === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		return event.result;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
	props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop,
			originalEvent = event,
			fixHook = jQuery.event.fixHooks[ event.type ] || {},
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = jQuery.Event( originalEvent );

		for ( i = copy.length; i; ) {
			prop = copy[ --i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Target should not be a text node (#504, Safari)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
		if ( event.metaKey === undefined ) {
			event.metaKey = event.ctrlKey;
		}

		return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		ready: {
			// Make sure the ready event is setup
			setup: jQuery.bindReady
		},

		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},

		focus: {
			delegateType: "focusin"
		},
		blur: {
			delegateType: "focusout"
		},

		beforeunload: {
			setup: function( data, namespaces, eventHandle ) {
				// We only want to do this special case on windows
				if ( jQuery.isWindow( this ) ) {
					this.onbeforeunload = eventHandle;
				}
			},

			teardown: function( namespaces, eventHandle ) {
				if ( this.onbeforeunload === eventHandle ) {
					this.onbeforeunload = null;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{ type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

// Some plugins are using, but it's undocumented/deprecated and will be removed.
// The 1.7 special event interface should provide all the hooks needed now.
jQuery.event.handle = jQuery.event.dispatch;

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		if ( elem.detachEvent ) {
			elem.detachEvent( "on" + type, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

function returnFalse() {
	return false;
}
function returnTrue() {
	return true;
}

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function() {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	},
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj,
				selector = handleObj.selector,
				ret;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !form._submit_attached ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						// If form was submitted by the user, bubble the event up the tree
						if ( this.parentNode && !event.isTrigger ) {
							jQuery.event.simulate( "submit", this.parentNode, event, true );
						}
					});
					form._submit_attached = true;
				}
			});
			// return undefined since we don't need an event listener
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
							jQuery.event.simulate( "change", this, event, true );
						}
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					elem._change_attached = true;
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on.call( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			var handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace? handleObj.type + "." + handleObj.namespace : handleObj.type,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( var type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	live: function( types, data, fn ) {
		jQuery( this.context ).on( types, this.selector, data, fn );
		return this;
	},
	die: function( types, fn ) {
		jQuery( this.context ).off( types, this.selector || "**", fn );
		return this;
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		if ( this[0] ) {
			return jQuery.event.trigger( type, data, this[0], true );
		}
	},

	toggle: function( fn ) {
		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	},

	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
});

jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};

	if ( jQuery.attrFn ) {
		jQuery.attrFn[ name ] = true;
	}

	if ( rkeyEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
	}

	if ( rmouseEvent.test( name ) ) {
		jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
	}
});



/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){

var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
	expando = "sizcache" + (Math.random() + '').replace('.', ''),
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = /\\/g,
	rReturn = /\r\n/g,
	rNonWord = /\W/;

// Here we check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
	baseHasDuplicate = false;
	return 0;
});

var Sizzle = function( selector, context, results, seed ) {
	results = results || [];
	context = context || document;

	var origContext = context;

	if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
		return [];
	}
	
	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		prune = true,
		contextXML = Sizzle.isXML( context ),
		parts = [],
		soFar = selector;
	
	// Reset the position of the chunker regexp (start from head)
	do {
		chunker.exec( "" );
		m = chunker.exec( soFar );

		if ( m ) {
			soFar = m[3];
		
			parts.push( m[1] );
		
			if ( m[2] ) {
				extra = m[3];
				break;
			}
		}
	} while ( m );

	if ( parts.length > 1 && origPOS.exec( selector ) ) {

		if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
			set = posProcess( parts[0] + parts[1], context, seed );

		} else {
			set = Expr.relative[ parts[0] ] ?
				[ context ] :
				Sizzle( parts.shift(), context );

			while ( parts.length ) {
				selector = parts.shift();

				if ( Expr.relative[ selector ] ) {
					selector += parts.shift();
				}
				
				set = posProcess( selector, set, seed );
			}
		}

	} else {
		// Take a shortcut and set the context if the root selector is an ID
		// (but not if it'll be faster if the inner selector is an ID)
		if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
				Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {

			ret = Sizzle.find( parts.shift(), context, contextXML );
			context = ret.expr ?
				Sizzle.filter( ret.expr, ret.set )[0] :
				ret.set[0];
		}

		if ( context ) {
			ret = seed ?
				{ expr: parts.pop(), set: makeArray(seed) } :
				Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );

			set = ret.expr ?
				Sizzle.filter( ret.expr, ret.set ) :
				ret.set;

			if ( parts.length > 0 ) {
				checkSet = makeArray( set );

			} else {
				prune = false;
			}

			while ( parts.length ) {
				cur = parts.pop();
				pop = cur;

				if ( !Expr.relative[ cur ] ) {
					cur = "";
				} else {
					pop = parts.pop();
				}

				if ( pop == null ) {
					pop = context;
				}

				Expr.relative[ cur ]( checkSet, pop, contextXML );
			}

		} else {
			checkSet = parts = [];
		}
	}

	if ( !checkSet ) {
		checkSet = set;
	}

	if ( !checkSet ) {
		Sizzle.error( cur || selector );
	}

	if ( toString.call(checkSet) === "[object Array]" ) {
		if ( !prune ) {
			results.push.apply( results, checkSet );

		} else if ( context && context.nodeType === 1 ) {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
					results.push( set[i] );
				}
			}

		} else {
			for ( i = 0; checkSet[i] != null; i++ ) {
				if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
					results.push( set[i] );
				}
			}
		}

	} else {
		makeArray( checkSet, results );
	}

	if ( extra ) {
		Sizzle( extra, origContext, results, seed );
		Sizzle.uniqueSort( results );
	}

	return results;
};

Sizzle.uniqueSort = function( results ) {
	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};

Sizzle.matches = function( expr, set ) {
	return Sizzle( expr, null, null, set );
};

Sizzle.matchesSelector = function( node, expr ) {
	return Sizzle( expr, null, null, [node] ).length > 0;
};

Sizzle.find = function( expr, context, isXML ) {
	var set, i, len, match, type, left;

	if ( !expr ) {
		return [];
	}

	for ( i = 0, len = Expr.order.length; i < len; i++ ) {
		type = Expr.order[i];
		
		if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
			left = match[1];
			match.splice( 1, 1 );

			if ( left.substr( left.length - 1 ) !== "\\" ) {
				match[1] = (match[1] || "").replace( rBackslash, "" );
				set = Expr.find[ type ]( match, context, isXML );

				if ( set != null ) {
					expr = expr.replace( Expr.match[ type ], "" );
					break;
				}
			}
		}
	}

	if ( !set ) {
		set = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( "*" ) :
			[];
	}

	return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
	var match, anyFound,
		type, found, item, filter, left,
		i, pass,
		old = expr,
		result = [],
		curLoop = set,
		isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );

	while ( expr && set.length ) {
		for ( type in Expr.filter ) {
			if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
				filter = Expr.filter[ type ];
				left = match[1];

				anyFound = false;

				match.splice(1,1);

				if ( left.substr( left.length - 1 ) === "\\" ) {
					continue;
				}

				if ( curLoop === result ) {
					result = [];
				}

				if ( Expr.preFilter[ type ] ) {
					match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

					if ( !match ) {
						anyFound = found = true;

					} else if ( match === true ) {
						continue;
					}
				}

				if ( match ) {
					for ( i = 0; (item = curLoop[i]) != null; i++ ) {
						if ( item ) {
							found = filter( item, match, i, curLoop );
							pass = not ^ found;

							if ( inplace && found != null ) {
								if ( pass ) {
									anyFound = true;

								} else {
									curLoop[i] = false;
								}

							} else if ( pass ) {
								result.push( item );
								anyFound = true;
							}
						}
					}
				}

				if ( found !== undefined ) {
					if ( !inplace ) {
						curLoop = result;
					}

					expr = expr.replace( Expr.match[ type ], "" );

					if ( !anyFound ) {
						return [];
					}

					break;
				}
			}
		}

		// Improper expression
		if ( expr === old ) {
			if ( anyFound == null ) {
				Sizzle.error( expr );

			} else {
				break;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};

var Expr = Sizzle.selectors = {
	order: [ "ID", "NAME", "TAG" ],

	match: {
		ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
		NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
		ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
		CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
		POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
	},

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	},

	attrHandle: {
		href: function( elem ) {
			return elem.getAttribute( "href" );
		},
		type: function( elem ) {
			return elem.getAttribute( "type" );
		}
	},

	relative: {
		"+": function(checkSet, part){
			var isPartStr = typeof part === "string",
				isTag = isPartStr && !rNonWord.test( part ),
				isPartStrNotTag = isPartStr && !isTag;

			if ( isTag ) {
				part = part.toLowerCase();
			}

			for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
				if ( (elem = checkSet[i]) ) {
					while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

					checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
						elem || false :
						elem === part;
				}
			}

			if ( isPartStrNotTag ) {
				Sizzle.filter( part, checkSet, true );
			}
		},

		">": function( checkSet, part ) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0,
				l = checkSet.length;

			if ( isPartStr && !rNonWord.test( part ) ) {
				part = part.toLowerCase();

				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						var parent = elem.parentNode;
						checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
					}
				}

			} else {
				for ( ; i < l; i++ ) {
					elem = checkSet[i];

					if ( elem ) {
						checkSet[i] = isPartStr ?
							elem.parentNode :
							elem.parentNode === part;
					}
				}

				if ( isPartStr ) {
					Sizzle.filter( part, checkSet, true );
				}
			}
		},

		"": function(checkSet, part, isXML){
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
		},

		"~": function( checkSet, part, isXML ) {
			var nodeCheck,
				doneName = done++,
				checkFn = dirCheck;

			if ( typeof part === "string" && !rNonWord.test( part ) ) {
				part = part.toLowerCase();
				nodeCheck = part;
				checkFn = dirNodeCheck;
			}

			checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
		}
	},

	find: {
		ID: function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		},

		NAME: function( match, context ) {
			if ( typeof context.getElementsByName !== "undefined" ) {
				var ret = [],
					results = context.getElementsByName( match[1] );

				for ( var i = 0, l = results.length; i < l; i++ ) {
					if ( results[i].getAttribute("name") === match[1] ) {
						ret.push( results[i] );
					}
				}

				return ret.length === 0 ? null : ret;
			}
		},

		TAG: function( match, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( match[1] );
			}
		}
	},
	preFilter: {
		CLASS: function( match, curLoop, inplace, result, not, isXML ) {
			match = " " + match[1].replace( rBackslash, "" ) + " ";

			if ( isXML ) {
				return match;
			}

			for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
				if ( elem ) {
					if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
						if ( !inplace ) {
							result.push( elem );
						}

					} else if ( inplace ) {
						curLoop[i] = false;
					}
				}
			}

			return false;
		},

		ID: function( match ) {
			return match[1].replace( rBackslash, "" );
		},

		TAG: function( match, curLoop ) {
			return match[1].replace( rBackslash, "" ).toLowerCase();
		},

		CHILD: function( match ) {
			if ( match[1] === "nth" ) {
				if ( !match[2] ) {
					Sizzle.error( match[0] );
				}

				match[2] = match[2].replace(/^\+|\s*/g, '');

				// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
				var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
					match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
					!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);

				// calculate the numbers (first)n+(last) including if they are negative
				match[2] = (test[1] + (test[2] || 1)) - 0;
				match[3] = test[3] - 0;
			}
			else if ( match[2] ) {
				Sizzle.error( match[0] );
			}

			// TODO: Move to normal caching system
			match[0] = done++;

			return match;
		},

		ATTR: function( match, curLoop, inplace, result, not, isXML ) {
			var name = match[1] = match[1].replace( rBackslash, "" );
			
			if ( !isXML && Expr.attrMap[name] ) {
				match[1] = Expr.attrMap[name];
			}

			// Handle if an un-quoted value was used
			match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );

			if ( match[2] === "~=" ) {
				match[4] = " " + match[4] + " ";
			}

			return match;
		},

		PSEUDO: function( match, curLoop, inplace, result, not ) {
			if ( match[1] === "not" ) {
				// If we're dealing with a complex expression, or a simple one
				if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
					match[3] = Sizzle(match[3], null, null, curLoop);

				} else {
					var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);

					if ( !inplace ) {
						result.push.apply( result, ret );
					}

					return false;
				}

			} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
				return true;
			}
			
			return match;
		},

		POS: function( match ) {
			match.unshift( true );

			return match;
		}
	},
	
	filters: {
		enabled: function( elem ) {
			return elem.disabled === false && elem.type !== "hidden";
		},

		disabled: function( elem ) {
			return elem.disabled === true;
		},

		checked: function( elem ) {
			return elem.checked === true;
		},
		
		selected: function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		},

		parent: function( elem ) {
			return !!elem.firstChild;
		},

		empty: function( elem ) {
			return !elem.firstChild;
		},

		has: function( elem, i, match ) {
			return !!Sizzle( match[3], elem ).length;
		},

		header: function( elem ) {
			return (/h\d/i).test( elem.nodeName );
		},

		text: function( elem ) {
			var attr = elem.getAttribute( "type" ), type = elem.type;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc) 
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
		},

		radio: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
		},

		checkbox: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
		},

		file: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
		},

		password: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
		},

		submit: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "submit" === elem.type;
		},

		image: function( elem ) {
			return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
		},

		reset: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && "reset" === elem.type;
		},

		button: function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && "button" === elem.type || name === "button";
		},

		input: function( elem ) {
			return (/input|select|textarea|button/i).test( elem.nodeName );
		},

		focus: function( elem ) {
			return elem === elem.ownerDocument.activeElement;
		}
	},
	setFilters: {
		first: function( elem, i ) {
			return i === 0;
		},

		last: function( elem, i, match, array ) {
			return i === array.length - 1;
		},

		even: function( elem, i ) {
			return i % 2 === 0;
		},

		odd: function( elem, i ) {
			return i % 2 === 1;
		},

		lt: function( elem, i, match ) {
			return i < match[3] - 0;
		},

		gt: function( elem, i, match ) {
			return i > match[3] - 0;
		},

		nth: function( elem, i, match ) {
			return match[3] - 0 === i;
		},

		eq: function( elem, i, match ) {
			return match[3] - 0 === i;
		}
	},
	filter: {
		PSEUDO: function( elem, match, i, array ) {
			var name = match[1],
				filter = Expr.filters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );

			} else if ( name === "contains" ) {
				return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;

			} else if ( name === "not" ) {
				var not = match[3];

				for ( var j = 0, l = not.length; j < l; j++ ) {
					if ( not[j] === elem ) {
						return false;
					}
				}

				return true;

			} else {
				Sizzle.error( name );
			}
		},

		CHILD: function( elem, match ) {
			var first, last,
				doneName, parent, cache,
				count, diff,
				type = match[1],
				node = elem;

			switch ( type ) {
				case "only":
				case "first":
					while ( (node = node.previousSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					if ( type === "first" ) { 
						return true; 
					}

					node = elem;

				case "last":
					while ( (node = node.nextSibling) )	 {
						if ( node.nodeType === 1 ) { 
							return false; 
						}
					}

					return true;

				case "nth":
					first = match[2];
					last = match[3];

					if ( first === 1 && last === 0 ) {
						return true;
					}
					
					doneName = match[0];
					parent = elem.parentNode;
	
					if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
						count = 0;
						
						for ( node = parent.firstChild; node; node = node.nextSibling ) {
							if ( node.nodeType === 1 ) {
								node.nodeIndex = ++count;
							}
						} 

						parent[ expando ] = doneName;
					}
					
					diff = elem.nodeIndex - last;

					if ( first === 0 ) {
						return diff === 0;

					} else {
						return ( diff % first === 0 && diff / first >= 0 );
					}
			}
		},

		ID: function( elem, match ) {
			return elem.nodeType === 1 && elem.getAttribute("id") === match;
		},

		TAG: function( elem, match ) {
			return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
		},
		
		CLASS: function( elem, match ) {
			return (" " + (elem.className || elem.getAttribute("class")) + " ")
				.indexOf( match ) > -1;
		},

		ATTR: function( elem, match ) {
			var name = match[1],
				result = Sizzle.attr ?
					Sizzle.attr( elem, name ) :
					Expr.attrHandle[ name ] ?
					Expr.attrHandle[ name ]( elem ) :
					elem[ name ] != null ?
						elem[ name ] :
						elem.getAttribute( name ),
				value = result + "",
				type = match[2],
				check = match[4];

			return result == null ?
				type === "!=" :
				!type && Sizzle.attr ?
				result != null :
				type === "=" ?
				value === check :
				type === "*=" ?
				value.indexOf(check) >= 0 :
				type === "~=" ?
				(" " + value + " ").indexOf(check) >= 0 :
				!check ?
				value && result !== false :
				type === "!=" ?
				value !== check :
				type === "^=" ?
				value.indexOf(check) === 0 :
				type === "$=" ?
				value.substr(value.length - check.length) === check :
				type === "|=" ?
				value === check || value.substr(0, check.length + 1) === check + "-" :
				false;
		},

		POS: function( elem, match, i, array ) {
			var name = match[2],
				filter = Expr.setFilters[ name ];

			if ( filter ) {
				return filter( elem, i, match, array );
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = function(all, num){
		return "\\" + (num - 0 + 1);
	};

for ( var type in Expr.match ) {
	Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
	Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
}

var makeArray = function( array, results ) {
	array = Array.prototype.slice.call( array, 0 );

	if ( results ) {
		results.push.apply( results, array );
		return results;
	}
	
	return array;
};

// Perform a simple check to determine if the browser is capable of
// converting a NodeList to an array using builtin methods.
// Also verifies that the returned array holds DOM nodes
// (which is not the case in the Blackberry browser)
try {
	Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;

// Provide a fallback method if it does not work
} catch( e ) {
	makeArray = function( array, results ) {
		var i = 0,
			ret = results || [];

		if ( toString.call(array) === "[object Array]" ) {
			Array.prototype.push.apply( ret, array );

		} else {
			if ( typeof array.length === "number" ) {
				for ( var l = array.length; i < l; i++ ) {
					ret.push( array[i] );
				}

			} else {
				for ( ; array[i]; i++ ) {
					ret.push( array[i] );
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if ( document.documentElement.compareDocumentPosition ) {
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
			return a.compareDocumentPosition ? -1 : 1;
		}

		return a.compareDocumentPosition(b) & 4 ? -1 : 1;
	};

} else {
	sortOrder = function( a, b ) {
		// The nodes are identical, we can exit early
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Fallback to using sourceIndex (in IE) if it's available on both nodes
		} else if ( a.sourceIndex && b.sourceIndex ) {
			return a.sourceIndex - b.sourceIndex;
		}

		var al, bl,
			ap = [],
			bp = [],
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// If the nodes are siblings (or identical) we can do a quick check
		if ( aup === bup ) {
			return siblingCheck( a, b );

		// If no parents were found then the nodes are disconnected
		} else if ( !aup ) {
			return -1;

		} else if ( !bup ) {
			return 1;
		}

		// Otherwise they're somewhere else in the tree so we need
		// to build up a full list of the parentNodes for comparison
		while ( cur ) {
			ap.unshift( cur );
			cur = cur.parentNode;
		}

		cur = bup;

		while ( cur ) {
			bp.unshift( cur );
			cur = cur.parentNode;
		}

		al = ap.length;
		bl = bp.length;

		// Start walking down the tree looking for a discrepancy
		for ( var i = 0; i < al && i < bl; i++ ) {
			if ( ap[i] !== bp[i] ) {
				return siblingCheck( ap[i], bp[i] );
			}
		}

		// We ended someplace up the tree so do a sibling check
		return i === al ?
			siblingCheck( a, bp[i], -1 ) :
			siblingCheck( ap[i], b, 1 );
	};

	siblingCheck = function( a, b, ret ) {
		if ( a === b ) {
			return ret;
		}

		var cur = a.nextSibling;

		while ( cur ) {
			if ( cur === b ) {
				return -1;
			}

			cur = cur.nextSibling;
		}

		return 1;
	};
}

// Check to see if the browser returns elements by name when
// querying by getElementById (and provide a workaround)
(function(){
	// We're going to inject a fake input element with a specified name
	var form = document.createElement("div"),
		id = "script" + (new Date()).getTime(),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Inject it into the root element, check its status, and remove it quickly
	root.insertBefore( form, root.firstChild );

	// The workaround has to do additional checks after a getElementById
	// Which slows things down for other browsers (hence the branching)
	if ( document.getElementById( id ) ) {
		Expr.find.ID = function( match, context, isXML ) {
			if ( typeof context.getElementById !== "undefined" && !isXML ) {
				var m = context.getElementById(match[1]);

				return m ?
					m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
						[m] :
						undefined :
					[];
			}
		};

		Expr.filter.ID = function( elem, match ) {
			var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");

			return elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild( form );

	// release memory in IE
	root = form = null;
})();

(function(){
	// Check to see if the browser returns only elements
	// when doing getElementsByTagName("*")

	// Create a fake element
	var div = document.createElement("div");
	div.appendChild( document.createComment("") );

	// Make sure no comments are found
	if ( div.getElementsByTagName("*").length > 0 ) {
		Expr.find.TAG = function( match, context ) {
			var results = context.getElementsByTagName( match[1] );

			// Filter out possible comments
			if ( match[1] === "*" ) {
				var tmp = [];

				for ( var i = 0; results[i]; i++ ) {
					if ( results[i].nodeType === 1 ) {
						tmp.push( results[i] );
					}
				}

				results = tmp;
			}

			return results;
		};
	}

	// Check to see if an attribute returns normalized href attributes
	div.innerHTML = "<a href='#'></a>";

	if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
			div.firstChild.getAttribute("href") !== "#" ) {

		Expr.attrHandle.href = function( elem ) {
			return elem.getAttribute( "href", 2 );
		};
	}

	// release memory in IE
	div = null;
})();

if ( document.querySelectorAll ) {
	(function(){
		var oldSizzle = Sizzle,
			div = document.createElement("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class='TEST'></p>";

		// Safari can't handle uppercase or unicode characters when
		// in quirks mode.
		if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
			return;
		}
	
		Sizzle = function( query, context, extra, seed ) {
			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};

		for ( var prop in oldSizzle ) {
			Sizzle[ prop ] = oldSizzle[ prop ];
		}

		// release memory in IE
		div = null;
	})();
}

(function(){
	var html = document.documentElement,
		matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if ( matches ) {
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node (IE 9 fails this)
		var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
			pseudoWorks = false;

		try {
			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( document.documentElement, "[test!='']:sizzle" );
	
		} catch( pseudoError ) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function( node, expr ) {
			// Make sure that attribute selectors are quoted
			expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");

			if ( !Sizzle.isXML( node ) ) {
				try { 
					if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
						var ret = matches.call( node, expr );

						// IE 9's matchesSelector returns false on disconnected nodes
						if ( ret || !disconnectedMatch ||
								// As well, disconnected nodes are said to be in a document
								// fragment in IE 9, so check for that
								node.document && node.document.nodeType !== 11 ) {
							return ret;
						}
					}
				} catch(e) {}
			}

			return Sizzle(expr, null, null, [node]).length > 0;
		};
	}
})();

(function(){
	var div = document.createElement("div");

	div.innerHTML = "<div class='test e'></div><div class='test'></div>";

	// Opera can't find a second classname (in 9.6)
	// Also, make sure that getElementsByClassName actually exists
	if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
		return;
	}

	// Safari caches class attributes, doesn't catch changes (in 3.2)
	div.lastChild.className = "e";

	if ( div.getElementsByClassName("e").length === 1 ) {
		return;
	}
	
	Expr.order.splice(1, 0, "CLASS");
	Expr.find.CLASS = function( match, context, isXML ) {
		if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
			return context.getElementsByClassName(match[1]);
		}
	};

	// release memory in IE
	div = null;
})();

function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;

			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 && !isXML ){
					elem[ expando ] = doneName;
					elem.sizset = i;
				}

				if ( elem.nodeName.toLowerCase() === cur ) {
					match = elem;
					break;
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
	for ( var i = 0, l = checkSet.length; i < l; i++ ) {
		var elem = checkSet[i];

		if ( elem ) {
			var match = false;
			
			elem = elem[dir];

			while ( elem ) {
				if ( elem[ expando ] === doneName ) {
					match = checkSet[elem.sizset];
					break;
				}

				if ( elem.nodeType === 1 ) {
					if ( !isXML ) {
						elem[ expando ] = doneName;
						elem.sizset = i;
					}

					if ( typeof cur !== "string" ) {
						if ( elem === cur ) {
							match = true;
							break;
						}

					} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
						match = elem;
						break;
					}
				}

				elem = elem[dir];
			}

			checkSet[i] = match;
		}
	}
}

if ( document.documentElement.contains ) {
	Sizzle.contains = function( a, b ) {
		return a !== b && (a.contains ? a.contains(b) : true);
	};

} else if ( document.documentElement.compareDocumentPosition ) {
	Sizzle.contains = function( a, b ) {
		return !!(a.compareDocumentPosition(b) & 16);
	};

} else {
	Sizzle.contains = function() {
		return false;
	};
}

Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

var posProcess = function( selector, context, seed ) {
	var match,
		tmpSet = [],
		later = "",
		root = context.nodeType ? [context] : context;

	// Position selectors must be done after the filter
	// And so must :not(positional) so we move all PSEUDOs to the end
	while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
		later += match[0];
		selector = selector.replace( Expr.match.PSEUDO, "" );
	}

	selector = Expr.relative[selector] ? selector + "*" : selector;

	for ( var i = 0, l = root.length; i < l; i++ ) {
		Sizzle( selector, root[i], tmpSet, seed );
	}

	return Sizzle.filter( later, tmpSet );
};

// EXPOSE
// Override sizzle attribute retrieval
Sizzle.attr = jQuery.attr;
Sizzle.selectors.attrMap = {};
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})();


var runtil = /Until$/,
	rparentsprev = /^(?:parents|prevUntil|prevAll)/,
	// Note: This RegExp should be improved, or likely pulled from Sizzle
	rmultiselector = /,/,
	isSimple = /^.[^:#\[\.,]*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var self = this,
			i, l;

		if ( typeof selector !== "string" ) {
			return jQuery( selector ).filter(function() {
				for ( i = 0, l = self.length; i < l; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack( "", "find", selector ),
			length, n, r;

		for ( i = 0, l = this.length; i < l; i++ ) {
			length = ret.length;
			jQuery.find( selector, this[i], ret );

			if ( i > 0 ) {
				// Make sure that the results are unique
				for ( n = length; n < ret.length; n++ ) {
					for ( r = 0; r < length; r++ ) {
						if ( ret[r] === ret[n] ) {
							ret.splice(n--, 1);
							break;
						}
					}
				}
			}
		}

		return ret;
	},

	has: function( target ) {
		var targets = jQuery( target );
		return this.filter(function() {
			for ( var i = 0, l = targets.length; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector, false), "not", selector);
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector, true), "filter", selector );
	},

	is: function( selector ) {
		return !!selector && ( 
			typeof selector === "string" ?
				// If this is a positional selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				POS.test( selector ) ? 
					jQuery( selector, this.context ).index( this[0] ) >= 0 :
					jQuery.filter( selector, this ).length > 0 :
				this.filter( selector ).length > 0 );
	},

	closest: function( selectors, context ) {
		var ret = [], i, l, cur = this[0];
		
		// Array (deprecated as of jQuery 1.7)
		if ( jQuery.isArray( selectors ) ) {
			var level = 1;

			while ( cur && cur.ownerDocument && cur !== context ) {
				for ( i = 0; i < selectors.length; i++ ) {

					if ( jQuery( cur ).is( selectors[ i ] ) ) {
						ret.push({ selector: selectors[ i ], elem: cur, level: level });
					}
				}

				cur = cur.parentNode;
				level++;
			}

			return ret;
		}

		// String
		var pos = POS.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( i = 0, l = this.length; i < l; i++ ) {
			cur = this[i];

			while ( cur ) {
				if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
					ret.push( cur );
					break;

				} else {
					cur = cur.parentNode;
					if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
						break;
					}
				}
			}
		}

		ret = ret.length > 1 ? jQuery.unique( ret ) : ret;

		return this.pushStack( ret, "closest", selectors );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	},

	andSelf: function() {
		return this.add( this.prevObject );
	}
});

// A painfully simple check to see if an element is disconnected
// from a document (should be improved, where feasible).
function isDisconnected( node ) {
	return !node || !node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return jQuery.nth( elem, 2, "nextSibling" );
	},
	prev: function( elem ) {
		return jQuery.nth( elem, 2, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( elem.parentNode.firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.makeArray( elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	nth: function( cur, result, dir, elem ) {
		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return ( elem === qualifier ) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
	});
}




function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
	safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style)/i,
	rnocache = /<(?:script|object|embed|option|style)/i,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")", "i"),
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /\/(java|ecma)script/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		area: [ 1, "<map>", "</map>" ],
		_default: [ 0, "", "" ]
	},
	safeFragment = createSafeFragment( document );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// IE can't serialize <link> and <script> tags normally
if ( !jQuery.support.htmlSerialize ) {
	wrapMap._default = [ 1, "div<div>", "</div>" ];
}

jQuery.fn.extend({
	text: function( text ) {
		if ( jQuery.isFunction(text) ) {
			return this.each(function(i) {
				var self = jQuery( this );

				self.text( text.call(this, i, self.text()) );
			});
		}

		if ( typeof text !== "object" && text !== undefined ) {
			return this.empty().append( (this[0] && this[0].ownerDocument || document).createTextNode( text ) );
		}

		return jQuery.text( this );
	},

	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	},

	append: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.insertBefore( elem, this.firstChild );
			}
		});
	},

	before: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	},

	after: function() {
		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
					jQuery.cleanData( [ elem ] );
				}

				if ( elem.parentNode ) {
					elem.parentNode.removeChild( elem );
				}
			}
		}

		return this;
	},

	empty: function() {
		for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( elem.getElementsByTagName("*") );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		if ( value === undefined ) {
			return this[0] && this[0].nodeType === 1 ?
				this[0].innerHTML.replace(rinlinejQuery, "") :
				null;

		// See if we can take a shortcut and just use innerHTML
		} else if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
			(jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value )) &&
			!wrapMap[ (rtagName.exec( value ) || ["", ""])[1].toLowerCase() ] ) {

			value = value.replace(rxhtmlTag, "<$1></$2>");

			try {
				for ( var i = 0, l = this.length; i < l; i++ ) {
					// Remove element nodes and prevent memory leaks
					if ( this[i].nodeType === 1 ) {
						jQuery.cleanData( this[i].getElementsByTagName("*") );
						this[i].innerHTML = value;
					}
				}

			// If using innerHTML throws an exception, use the fallback method
			} catch(e) {
				this.empty().append( value );
			}

		} else if ( jQuery.isFunction( value ) ) {
			this.each(function(i){
				var self = jQuery( this );

				self.html( value.call(this, i, self.html()) );
			});

		} else {
			this.empty().append( value );
		}

		return this;
	},

	replaceWith: function( value ) {
		if ( this[0] && this[0].parentNode ) {
			// Make sure that the elements are removed from the DOM before they are inserted
			// this can help fix replacing a parent with child elements
			if ( jQuery.isFunction( value ) ) {
				return this.each(function(i) {
					var self = jQuery(this), old = self.html();
					self.replaceWith( value.call( this, i, old ) );
				});
			}

			if ( typeof value !== "string" ) {
				value = jQuery( value ).detach();
			}

			return this.each(function() {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery( this ).remove();

				if ( next ) {
					jQuery(next).before( value );
				} else {
					jQuery(parent).append( value );
				}
			});
		} else {
			return this.length ?
				this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
				this;
		}
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, table, callback ) {
		var results, first, fragment, parent,
			value = args[0],
			scripts = [];

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
			return this.each(function() {
				jQuery(this).domManip( args, table, callback, true );
			});
		}

		if ( jQuery.isFunction(value) ) {
			return this.each(function(i) {
				var self = jQuery(this);
				args[0] = value.call(this, i, table ? self.html() : undefined);
				self.domManip( args, table, callback );
			});
		}

		if ( this[0] ) {
			parent = value && value.parentNode;

			// If we're in a fragment, just use that instead of building a new one
			if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
				results = { fragment: parent };

			} else {
				results = jQuery.buildFragment( args, this, scripts );
			}

			fragment = results.fragment;

			if ( fragment.childNodes.length === 1 ) {
				first = fragment = fragment.firstChild;
			} else {
				first = fragment.firstChild;
			}

			if ( first ) {
				table = table && jQuery.nodeName( first, "tr" );

				for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
					callback.call(
						table ?
							root(this[i], first) :
							this[i],
						// Make sure that we do not leak memory by inadvertently discarding
						// the original fragment (which might have attached data) instead of
						// using it; in addition, use the original fragment object for the last
						// item instead of first because it can end up being emptied incorrectly
						// in certain situations (Bug #8070).
						// Fragments from the fragment cache must always be cloned and never used
						// in place.
						results.cacheable || ( l > 1 && i < lastIndex ) ?
							jQuery.clone( fragment, true, true ) :
							fragment
					);
				}
			}

			if ( scripts.length ) {
				jQuery.each( scripts, evalScript );
			}
		}

		return this;
	}
});

function root( elem, cur ) {
	return jQuery.nodeName(elem, "table") ?
		(elem.getElementsByTagName("tbody")[0] ||
		elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
		elem;
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type + ( events[ type ][ i ].namespace ? "." : "" ) + events[ type ][ i ].namespace, events[ type ][ i ], events[ type ][ i ].data );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function cloneFixAttributes( src, dest ) {
	var nodeName;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	// clearAttributes removes the attributes, which we don't want,
	// but also removes the attachEvent events, which we *do* want
	if ( dest.clearAttributes ) {
		dest.clearAttributes();
	}

	// mergeAttributes, in contrast, only merges back on the
	// original attributes, not the events
	if ( dest.mergeAttributes ) {
		dest.mergeAttributes( src );
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 fail to clone children inside object elements that use
	// the proprietary classid attribute value (rather than the type
	// attribute) to identify the type of content to display
	if ( nodeName === "object" ) {
		dest.outerHTML = src.outerHTML;

	} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set
		if ( src.checked ) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( typeof elem.getElementsByTagName !== "undefined" ) {
		return elem.getElementsByTagName( "*" );

	} else if ( typeof elem.querySelectorAll !== "undefined" ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	var nodeName = ( elem.nodeName || "" ).toLowerCase();
	if ( nodeName === "input" ) {
		fixDefaultChecked( elem );
	// Skip scripts, get other children
	} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
function shimCloneNode( elem ) {
	var div = document.createElement( "div" );
	safeFragment.appendChild( div );

	div.innerHTML = elem.outerHTML;
	return div.firstChild;
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var srcElements,
			destElements,
			i,
			// IE<=8 does not properly clone detached, unknown element nodes
			clone = jQuery.support.html5Clone || !rnoshimcache.test( "<" + elem.nodeName ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}




var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^([\-+])=([\-+.\de]+)/,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there there is no filter style applied in a css rule, we are done
				if ( currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( (defaultView = elem.ownerDocument.defaultView) &&
				(computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left, rsLeft, uncomputed,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret === null && style && (uncomputed = style[ name ]) ) {
			ret = uncomputed;
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {

			// Remember the original values
			left = style.left;
			rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ( ret || 0 );
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight,
		i = 0,
		len = which.length;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			for ( ; i < len; i++ ) {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
				}
			}
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		for ( ; i < len; i++ ) {
			val += parseFloat( jQuery.css( elem, "padding" + which[ i ] ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + which[ i ] + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + which[ i ] ) ) || 0;
			}
		}
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts,

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = ["*/"] + ["*"];

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for ( ; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};
	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.on( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": allTypes
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			context: true,
			url: true
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for ( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for ( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for ( key in s.converters ) {
				if ( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if ( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for ( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback );

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css(elem, "display") === "none" ) {
						jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[ i ];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			var elem, display,
				i = 0,
				j = this.length;

			for ( ; i < j; i++ ) {
				elem = this[i];
				if ( elem.style ) {
					display = jQuery.css( elem, "display" );

					if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
						jQuery._data( elem, "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},

	stop: function( type, clearQueue, gotoEnd ) {
		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var index,
				hadTimers = false,
				timers = jQuery.timers,
				data = jQuery._data( this );

			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}

			function stopQueue( elem, data, index ) {
				var hooks = data[ index ];
				jQuery.removeData( elem, index, true );
				hooks.stop( gotoEnd );
			}

			if ( type == null ) {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
						stopQueue( this, data, index );
					}
				}
			} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
				stopQueue( this, data, index );
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					if ( gotoEnd ) {

						// force the next step to be the last
						timers[ index ]( true );
					} else {
						timers[ index ].saveState();
					}
					hadTimers = true;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( !( gotoEnd && hadTimers ) ) {
				jQuery.dequeue( this, type );
			}
		});
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx( "show", 1 ),
	slideUp: genFx( "hide", 1 ),
	slideToggle: genFx( "toggle", 1 ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ( ( -Math.cos( p*Math.PI ) / 2 ) + 0.5 ) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx;

		this.startTime = fxNow || createFxNow();
		this.end = to;
		this.now = this.start = from;
		this.pos = this.state = 0;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );

		function t( gotoEnd ) {
			return self.step( gotoEnd );
		}

		t.queue = this.options.queue;
		t.elem = this.elem;
		t.saveState = function() {
			if ( self.options.hide && jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
				jQuery._data( self.elem, "fxshow" + self.prop, self.start );
			}
		};

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			timerId = setInterval( fx.tick, fx.interval );
		}
	},

	// Simple 'show' function
	show: function() {
		var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );

		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any flash of content
		if ( dataShow !== undefined ) {
			// This show is picking up where a previous hide or show left off
			this.custom( this.cur(), dataShow );
		} else {
			this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
		}

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom( this.cur(), 0 );
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var p, n, complete,
			t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( p in options.animatedProperties ) {
				if ( options.animatedProperties[ p ] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function( index, value ) {
						elem.style[ "overflow" + value ] = options.overflow[ index ];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery( elem ).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[ p ] );
						jQuery.removeData( elem, "fxshow" + p, true );
						// Toggle data is no longer needed
						jQuery.removeData( elem, "toggle" + p, true );
					}
				}

				// Execute the complete function
				// in the event that the complete function throws an exception
				// we must ensure it won't be called twice. #5684

				complete = options.complete;
				if ( complete ) {

					options.complete = false;
					complete.call( elem );
				}
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ( (this.end - this.start) * this.pos );
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		var timer,
			timers = jQuery.timers,
			i = 0;

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = fx.now + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

// Adds width/height step functions
// Do not set anything below 0
jQuery.each([ "width", "height" ], function( i, prop ) {
	jQuery.fx.step[ prop ] = function( fx ) {
		jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
	};
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );
		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );
			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			this[ type ]() :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem ?
			elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			this[ type ]() :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ],
				body = elem.document.body;
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				body && body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNumeric( ret ) ? ret : orig;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});




// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;

// Expose jQuery as an AMD module, but only for AMD loaders that
// understand the issues with loading multiple versions of jQuery
// in a page that all might call define(). The loader will indicate
// they have special allowances for multiple jQuery versions by
// specifying define.amd.jQuery = true. Register as a named module,
// since jQuery can be concatenated with other files that may use define,
// but not use a proper concatenation script that understands anonymous
// AMD modules. A named AMD is safest and most robust way to register.
// Lowercase jquery is used because AMD module names are derived from
// file names, and jQuery is normally delivered in a lowercase file name.
// Do this after creating the global so that if an AMD module wants to call
// noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
	define( "jquery", [], function () { return jQuery; } );
}



})( window );
var tooltip=function(){
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt,t,c,b,h;
	var ie = document.all ? true : false;
	return{
		show:function(v,w){
			if(tt == null){
				tt = document.createElement('div');
				tt.setAttribute('id',id);
				t = document.createElement('div');
				t.setAttribute('id',id + 'top');
				c = document.createElement('div');
				c.setAttribute('id',id + 'cont');
				b = document.createElement('div');
				b.setAttribute('id',id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
				document.onmousemove = this.pos;
			}
			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = w ? w + 'px' : 'auto';
			if(!w && ie){
				t.style.display = 'none';
				b.style.display = 'none';
				tt.style.width = tt.offsetWidth;
				t.style.display = 'block';
				b.style.display = 'block';
			}
			if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(1)},timer);
		},
		pos:function(e){
			var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
			var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
			tt.style.top = (u - h) + 'px';
			tt.style.left = (l + left) + 'px';
		},
		fade:function(d){
			var a = alpha;
			if((a != endalpha && d == 1) || (a != 0 && d == -1)){
				var i = speed;
				if(endalpha - a < speed && d == 1){
					i = endalpha - a;
				}else if(alpha < speed && d == -1){
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			}else{
				clearInterval(tt.timer);
				if(d == -1){tt.style.display = 'none'}
			}
		},
		hide:function(){
			clearInterval(tt.timer);
			tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
		}
	};
}();

/*!
 * JavaScript Debug - v0.4 - 6/22/2010
 * http://benalman.com/projects/javascript-debug-console-log/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 * With lots of help from Paul Irish!
 * http://paulirish.com/
 */

// Script: JavaScript Debug: A simple wrapper for console.log
//
// *Version: 0.4, Last Updated: 6/22/2010*
// 
// Tested with Internet Explorer 6-8, Firefox 3-3.6, Safari 3-4, Chrome 3-5, Opera 9.6-10.5
// 
// Home       - http://benalman.com/projects/javascript-debug-console-log/
// GitHub     - http://github.com/cowboy/javascript-debug/
// Source     - http://github.com/cowboy/javascript-debug/raw/master/ba-debug.js
// (Minified) - http://github.com/cowboy/javascript-debug/raw/master/ba-debug.min.js (1.1kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Support and Testing
// 
// Information about what browsers this code has been tested in.
// 
// Browsers Tested - Internet Explorer 6-8, Firefox 3-3.6, Safari 3-4, Chrome
// 3-5, Opera 9.6-10.5
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Examples - http://benalman.com/code/projects/javascript-debug/examples/debug/
// 
// About: Revision History
// 
// 0.4 - (6/22/2010) Added missing passthrough methods: exception,
//       groupCollapsed, table
// 0.3 - (6/8/2009) Initial release
// 
// Topic: Pass-through console methods
// 
// assert, clear, count, dir, dirxml, exception, group, groupCollapsed,
// groupEnd, profile, profileEnd, table, time, timeEnd, trace
// 
// These console methods are passed through (but only if both the console and
// the method exists), so use them without fear of reprisal. Note that these
// methods will not be passed through if the logging level is set to 0 via
// <debug.setLevel>.

window.debug = (function(){
  var window = this,
    
    // Some convenient shortcuts.
    aps = Array.prototype.slice,
    con = window.console,
    
    // Public object to be returned.
    that = {},
    
    callback_func,
    callback_force,
    
    // Default logging level, show everything.
    log_level = 9,
    
    // Logging methods, in "priority order". Not all console implementations
    // will utilize these, but they will be used in the callback passed to
    // setCallback.
    log_methods = [ 'error', 'warn', 'info', 'debug', 'log' ],
    
    // Pass these methods through to the console if they exist, otherwise just
    // fail gracefully. These methods are provided for convenience.
    pass_methods = 'assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace'.split(' '),
    idx = pass_methods.length,
    
    // Logs are stored here so that they can be recalled as necessary.
    logs = [];
  
  while ( --idx >= 0 ) {
    (function( method ){
      
      // Generate pass-through methods. These methods will be called, if they
      // exist, as long as the logging level is non-zero.
      that[ method ] = function() {
        log_level !== 0 && con && con[ method ]
          && con[ method ].apply( con, arguments );
      }
      
    })( pass_methods[idx] );
  }
  
  idx = log_methods.length;
  while ( --idx >= 0 ) {
    (function( idx, level ){
      
      // Method: debug.log
      // 
      // Call the console.log method if available. Adds an entry into the logs
      // array for a callback specified via <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.log( object [, object, ...] );                               - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.debug
      // 
      // Call the console.debug method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.debug( object [, object, ...] );                             - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.info
      // 
      // Call the console.info method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.info( object [, object, ...] );                              - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.warn
      // 
      // Call the console.warn method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.warn( object [, object, ...] );                              - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      // Method: debug.error
      // 
      // Call the console.error method if available, otherwise call console.log.
      // Adds an entry into the logs array for a callback specified via
      // <debug.setCallback>.
      // 
      // Usage:
      // 
      //  debug.error( object [, object, ...] );                             - -
      // 
      // Arguments:
      // 
      //  object - (Object) Any valid JavaScript object.
      
      that[ level ] = function() {
        var args = aps.call( arguments ),
          log_arr = [ level ].concat( args );
        
        logs.push( log_arr );
        exec_callback( log_arr );
        
        if ( !con || !is_level( idx ) ) { return; }
        
        con.firebug ? con[ level ].apply( window, args )
          : con[ level ] ? con[ level ]( args )
          : con.log( args );
      };
      
    })( idx, log_methods[idx] );
  }
  
  // Execute the callback function if set.
  function exec_callback( args ) {
    if ( callback_func && (callback_force || !con || !con.log) ) {
      callback_func.apply( window, args );
    }
  };
  
  // Method: debug.setLevel
  // 
  // Set a minimum or maximum logging level for the console. Doesn't affect
  // the <debug.setCallback> callback function, but if set to 0 to disable
  // logging, <Pass-through console methods> will be disabled as well.
  // 
  // Usage:
  // 
  //  debug.setLevel( [ level ] )                                            - -
  // 
  // Arguments:
  // 
  //  level - (Number) If 0, disables logging. If negative, shows N lowest
  //    priority levels of log messages. If positive, shows N highest priority
  //    levels of log messages.
  //
  // Priority levels:
  // 
  //   log (1) < debug (2) < info (3) < warn (4) < error (5)
  
  that.setLevel = function( level ) {
    log_level = typeof level === 'number' ? level : 9;
  };
  
  // Determine if the level is visible given the current log_level.
  function is_level( level ) {
    return log_level > 0
      ? log_level > level
      : log_methods.length + log_level <= level;
  };
  
  // Method: debug.setCallback
  // 
  // Set a callback to be used if logging isn't possible due to console.log
  // not existing. If unlogged logs exist when callback is set, they will all
  // be logged immediately unless a limit is specified.
  // 
  // Usage:
  // 
  //  debug.setCallback( callback [, force ] [, limit ] )
  // 
  // Arguments:
  // 
  //  callback - (Function) The aforementioned callback function. The first
  //    argument is the logging level, and all subsequent arguments are those
  //    passed to the initial debug logging method.
  //  force - (Boolean) If false, log to console.log if available, otherwise
  //    callback. If true, log to both console.log and callback.
  //  limit - (Number) If specified, number of lines to limit initial scrollback
  //    to.
  
  that.setCallback = function() {
    var args = aps.call( arguments ),
      max = logs.length,
      i = max;
    
    callback_func = args.shift() || null;
    callback_force = typeof args[0] === 'boolean' ? args.shift() : false;
    
    i -= typeof args[0] === 'number' ? args.shift() : max;
    
    while ( i < max ) {
      exec_callback( logs[i++] );
    }
  };
  
  return that;
})();

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();/* flashObj wrapper / smart loader - we can't rely on 3rd party js libs here */
(function(window, document, undefined) {
	
	// set up our vars here for compression
	var cId, head, script, s, headCheck, libCheck, preExistingElement, genID, displayCache,
	asset_path = ("https:" === document.location.protocol) ? 'https://a248.e.akamai.net/f/12/621/5m/proxy.espn.go.com/prod/' : 'http://a.espncdn.com/prod/';

	// load the swfobject library
	if(!window.swfobject && !window.__FLASH_JS_DONE__) {
		window.__FLASH_JS_DONE__ = false;
		
    // insert swfobject onto the page
		script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
		script.src = asset_path+'scripts/swfobject/2.2/swfobject.js'; // the path the the flash library
    s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script,s); 

    (function libCheck() {
      if(!!window.swfobject) {
        window.__FLASH_JS_DONE__ = true;
      } else {
        setTimeout(libCheck,10);
      }
    })();

  } else if(!!window.swfobject) {
		window.__FLASH_JS_DONE__ = true;
	}

	function renderObject(render) {
		var args = arguments, self = this, libCheck, frag, params, attrs, swf=null, div, divID, altContent;
		self.compiled = false;
		self.src = undefined;
		// we check for our library

		(function libCheck() {

    //libCheck = setInterval(function() {
			if(!!window.__FLASH_JS_DONE__) {
				// we have a lib
				//clearInterval(libCheck);
				// we only want to do this if they have the correct flash version
				if(!window.swfobject.hasFlashPlayerVersion(''+self.FlashVer)) {
					// we should render the self.altTxt and self.altImg
					if (self.altTxt){
						altContent = self.altTxt;
					} else {
						altContent="<IMG SRC="+self.altImg+" WIDTH="+self.width+" HEIGHT="+self.height+" BORDER=0>";
					}
					div = document.createElement('DIV');
					div.setAttribute('id',divID);
					div.innerHTML = altContent;
					if(self._currentBlock && self._currentBlock.parentNode && self._currentBlock.parentNode.nodeName !== 'HEAD') {
						self._currentBlock.parentNode.insertBefore(div,self._currentBlock);
					} else {
						document.getElementsByTagName('body')[0].appendChild(div);
					}
					//self._currentBlock.parentNode.insertBefore(div,self._currentBlock);
					return undefined;
				}
				// let's set up our flash object
				params = {
					'flashVars': self.flashVars,
					'bgcolor': self.bgcolor,
					'wmode': self.wmode,
					'allowscriptaccess': self.allowScriptAccess,
					'allownetworking': self.allowNetworking,
					'quality': self.quality,
					'scale': self.scale,
					'align': self.align,
					'salign': self.salign,
					'swliveconnect': self.LiveConnect,
					'menu': self.menu,
					'play': self.play,
					'allowfullscreen': self.allowfullscreen,
					'seamlesstabbing': self.seamlesstabbing,
					'devicefont': self.deviceFont
				};
				attrs = {
					'data': self.flashFile,
					'height': self.height,
					'width': self.width,
					'id': self.ID
				};
				divID = 'swfDiv'+ +new Date();
				div = document.createElement('DIV');
				div.setAttribute('id',divID);
				
				if(self.useDOM) {
					document.getElementById(self.targetElement).appendChild(div);
				} else {
					if(self._currentBlock && self._currentBlock.parentNode && self._currentBlock.parentNode.nodeName !== 'HEAD') {
						self._currentBlock.parentNode.insertBefore(div,self._currentBlock);
					} else {
						document.getElementsByTagName('body')[0].appendChild(div);
					}
				}
				
				// let's see if an element exists on the page already
				preExistingElement = document.getElementById(self.ID);
				if(preExistingElement && render !== true) {
					// we need to do some quick surgery to prevent an IE issue
					genID = '_____TEMP_SWF_REPLACEMENT_' + +new Date + '_____';
					preExistingElement.setAttribute('id',genID);
				}
				
				swf = swfobject.createSWF(attrs, params, divID);
				self.compiled = true;
				
				if(render !== true) {
					self.src = swf;
					// check the src for display: none; and remove it
					if(preExistingElement) {
						// we need to do some quick surgery to prevent an IE issue
						preExistingElement.setAttribute('id',self.ID);
					}
          // remove the swf from the page
					swfobject.removeSWF(self.ID);
				}
			} else {
        setTimeout(libCheck,10);
      }
		})(); //, 10);
		
    if(render !== true) {
			return self; // return this object
		}
		return undefined; // return undefined
	};
  
  window.____FLASH_RENDERER_____ = renderObject;


/* we need to define this in the global space for backwards compatibility - make sure it's only defined once */
if(!window.flashObj) {
	window.flashObj = function() {
		// get our place in the dom.
		var scripts = document.getElementsByTagName('script'),
		currentBlock = scripts[scripts.length-1],
		self = this;

		cId = +new Date();
		self._currentBlock = currentBlock; // private - do not edit
		self.play = true; // new
		self.flashFile = "/flash/blank.swf";
		self.LiveConnect = "FALSE";
		self.IEonly = null;
		self.wmode = "opaque";
		self.redirect = null;
		self.DenyIEdl = "FALSE";
		self.altImg = "/blank.gif";
		self.bgcolor = null;
		self.altTxt = null;
		self.height = "1";
		self.width = "1";
		self.scale = "exactfit";
		self.salign="lt";
		self.align="left";
		self.flashVars = null;
		self.ID = "flash"+ cId;
		self.name = "flash"+ cId;
		self.webTV = "true";
		self.quality = "best";
		self.menu = "false";
		self.deviceFont = "false";
		self.FlashVer = 8;
		self.cabVersion = "8,0,0,0";
		self.allowScriptAccess = "Always";
		self.allowNetworking = "All";
		self.useDOM = false;
		self.targetElement = null;
		self.render = renderObject;
		self.allowfullscreen = true; // new
		self.seamlesstabbing = true; // new
	};
} 


})(this, document);
/*  File: ESPN Video Barebones Library
    Contains basic video related functionality
  
  File  Details:
    ID - $Id: //vss_espneng/Templates/FrontEnd/scripts/espn.video.barebones.js#10 $
    DateTime - $DateTime: 2012/04/30 14:09:36 $
    Revision - $Revision: #10 $

	Requirements:
		* jquery
*/ 
(function($, window) {
	
	// make sure all player js calls are cached
	$.ajaxSetup({ cache: true });
	
    window.espn = window.espn || {};
	
	var playerReady = false,
	analyticsParams = {},
	freewheelParams = {},
	uiParams = {},
	externalId = null,
	pcode = '1kNG061cgaoolOncv54OAO1ceO-I',
	playerBrandingId = 'a28f1994885a41098953d166c34cf81c',
	adPlayerBrandingId = '7d9dcfef73364b40b3f96f6ffc37baa6',
	adSetCode = '91cDU6NuXTGKz3OdjOxFdAgJVtQcKJnI',
	cms = 'espn',
	targetReplaceId = 'videoPlayer',
	staging = false,
	adPlaying = false,
	contentPlaying = false;
	
	function _cleanMediaId(id) {			
		id += "";
		id = parseInt(id.replace(/\D/g, ""));
		if (isNaN(id)) { id = null; }
		
		return id;
	}
	
	espn.video = {
		/*
			Function: espn.video.embed
				Exposed method, makes JS call to Ooyala which injects the script tags that embed the video player. Note these same parameters are wrapped as apply to the options parameter for the espn.video.play method.
			
			Parameters:
				settings.autostart - (Boolean) This value dictates whether or not the video begins playing back without awaiting user interaction. Note the user's cookie and personalization settings will override this value.
				settings.cms - (String) CMS identifier. Can be "espn", "deportes", or "intl".
				settings.externalId - (String) - Colon-delimitted cms and id combo.
				settings.height - (Number) The pixel height of the player. Defaults to 324.
				settings.id - (Integer) The Content Editor Id of the Media object.
				settings.targetReplaceId - (String) The id attribute of the element to be targeted and replaced with the video player element. Defaults to "videoPlayer". If no element is found, the video player will be inserted at the bottom of the page.
				settings.staging - (Boolean) Determines whether or not to use the production or staging version of the Backlot account. Defaults to "false".
				settings.width - (Number) The pixel width of the player. Defaults to 576.
			
			Usage:
			> var settings = {
			>		'id': "7394686",
			>		'width': "768",
			>		'height': "432",
			>		'playerType': "videoHub09",
			>		'autoplay': "true",
			>		'cms': "espn"
			>	};
			>
			> espn.video.embed(settings);
		*/
		"embed":function(settings){
			if(settings===undefined){
				settings = {};
			}			
			if(settings.cms!==undefined){
				cms = settings.cms;
				setOoyalaValues(cms);
			}
			if(settings.externalId!==undefined){
				externalId = settings.externalId;
			}
			else if(settings.id!==undefined){
				externalId=cms+':'+_cleanMediaId(settings.id);
			}
			if(settings.autostart!==undefined){
				settings.autoPlay = settings.autostart+'';
			}
			if(externalId==null){
				settings.autostart = "false";
				settings.autoPlay = "false";
			}
			if(settings.targetReplaceId!==undefined){
				targetReplaceId = settings.targetReplaceId;
			}			
			if(settings.staging!==undefined && settings.staging===true){
				staging = true;
			}
	
			var playerjs = "http://player.ooyala.com/player.js?";
			if(staging){
				playerjs = "http://player-staging.ooyala.com/player.js?";
			}
			
			var flashVars = [];
			flashVars.push("callback=espn.video.handleEvents");
			flashVars.push("wmode=opaque");
			if(externalId!=null){
				flashVars.push("externalId=" + externalId);
				flashVars.push("pcode=" + pcode);
			}
			else{
				flashVars.push("adSetCode=" + adSetCode);
			}
			
			settings = setupDefaultValues(settings);
			
			flashVars.push("width=" + settings.width);
			flashVars.push("height=" + settings.height);
			flashVars.push("targetReplaceId=" + targetReplaceId);
			flashVars.push("playerBrandingId=" + playerBrandingId);
			flashVars.push("hasModuleParams=1");
			
			playerjs+=flashVars.join('&');
			$.getScript(playerjs);
			
			buildModuleParams(settings);
		},
		/*
			Function: espn.video.insertAd
				Exposed method, insert an ad into the video player.
			
			Parameters:
				adParams.adUnit - (String)
				adParams.maxDuration - (Integer)
				adParams.midSequence - (Integer)
				adParams.minDuration - (Integer)
				adParams.siteSection - (String) Colon-delimitted list of three or less sections of the omniPageName.
				adParams.videoID - (String) Same as siteSection.
				playerCMS - (String) CMS identifier, can be "espn", "deportes", or "intl". Defaults to "espn".
			
			Usage:
				> var adParams = {
				>		'adUnit': "",
				>		'maxDuration': 60,
				>		'midSequence': 0,
				>		'minDuration': 60,
				>		'siteSection': "espn:gamecast:nba",
				>		'videoID': "espn:gamecast:nba"
				>	};
				>
				>	espn.video.insertAd( adParams, "espn" );
		*/
		"insertAd":function(adParams, playerCMS){
			if(playerReady && adParams!==undefined && adParams.adUnit!==undefined){
				adParams.SWID = freewheelParams.SWID;
				adParams.FRMSegment = freewheelParams.FRMSegment;
				if(adParams.siteSection!==undefined){
					adParams.fw_site_section_id = adParams.siteSection;
					delete (adParams.siteSection);
				}
				if(adParams.videoID!==undefined){
					adParams.videoId = adParams.videoID;
					delete (adParams.videoID);
				}
				
				if(playerCMS!==undefined){
					cms = playerCMS;
					setOoyalaValues(cms);
				}
				
				document.getElementById(targetReplaceId).setModuleParams({
					"freewheel-ads-manager":adParams
				});
				
				document.getElementById(targetReplaceId).setQueryStringParameters({
					"playerBrandingId":adPlayerBrandingId,
					"adSetCode":adSetCode,
					"thruParam_espn-ui[autoPlay]":"true",
					"thruParam_espn-ui[endCard]":"false"
				});
			}
		},
		"skipAd":function(){
			if(playerReady){
				document.getElementById(targetReplaceId).skipAd();
			}
		},
		/*
			Function: espn.video.play
				Exposed method, plays the current video, or switches to another if different video requested.
			
			Parameters:
				id - (Integer) Optional, the CE id of the media requested. If none passed, will attempt to "play" the current media.
				options - (Object) Optional, set of options to be passed to the video player. Option parameters are: autoplay (Boolean), cms (String), and thumbnail (String). Defaults to empty object.
		
			Usage:
				>	espn.video.play(7394686, { 'endCard': "false" }); // embed the video player with media object id 7394686
				>	espn.video.play(); // play the video when in a paused state
				>	espn.video.play(6578945); // switch the video from media object id 7394686 to 6578945
		*/
		"play":function(id, options){
			var id = _cleanMediaId(id);
			if(playerReady){
				if (arguments.length === 0) {
					try{
						document.getElementById(targetReplaceId).playMovie();
					}
					catch(e){}
				}
				else{
					var autoplay = "true",
					thumbnail = '';
					if(options===undefined){
						options = {};
					}
					if(options.autoplay!==undefined){
						autoplay = options.autoplay+"";
					}
					uiParams.autoPlay = autoplay;
					
					if(options.thumbnail!==undefined){
						thumbnail = options.thumbnail;
					}
					uiParams.thumbnail = thumbnail;
					
					if(options.cms!==undefined){
						cms = options.cms;
						setOoyalaValues(cms);
					}
					
					var externalId = cms + ':' + id;
					try {
						freewheelParams.videoId='';
						document.getElementById(targetReplaceId).setModuleParams({
							"freewheel-ads-manager":freewheelParams,
							"espn-ui": uiParams,
							"espn-analytics": analyticsParams
						});

						document.getElementById(targetReplaceId).setQueryStringParameters({
							"externalId": externalId,
							"pcode": pcode,
							"playerBrandingId": playerBrandingId,
							"thruParam_espn-ui[autoPlay]":autoplay,
							"thruParam_espn-ui[endCard]":uiParams.endCard
						});
					}
					catch(e) { }
				}
			}
		},
		
		/*
			Function: espn.video.pause
				Exposed method; Pauses the video.
		
			Usage:
				> espn.video.pause();
		*/
		"pause":function(){
			if(playerReady){
				try{
					document.getElementById(targetReplaceId).pauseMovie();
				}
				catch(e){}
			}
		},
		"subscribe":function(topic, handler){
			return jQuery.sub(topic, handler);
		},
		"handleEvents":function(playerId, eventName, parameters) {
			if (eventName == "playerEmbedded"){
				setModuleParams(playerId);
			}
			else if(eventName == "apiReady"){
				if(!playerReady){
					playerReady = true;
					jQuery.pub('espn.video.ready');
					jQuery.pub('espn.video.init');
				}
			}
			else if(eventName == "playComplete"){
				contentPlaying = false;
				jQuery.pub('espn.video.complete');
				jQuery.pub('espn.video.playlist.ended');
			}
			else if(eventName=="adStarted"){
				if(parameters.adDuration!==undefined && parameters.adDuration>0){	
					adPlaying = true;
					jQuery.pub('espn.video.ad.start', [Math.round(parameters.adDuration/1000)]);
				}
			}
			else if(eventName=="adCompleted"){
				if(adPlaying){
					adPlaying = false;
					jQuery.pub('espn.video.ad.end');
				}
			}
			else if(eventName=="stateChanged"){
				if(!contentPlaying && parameters.state=="playing"){
					contentPlaying = true;
					jQuery.pub('espn.video.play');
				}
				else if(contentPlaying && parameters.state=="paused"){
					contentPlaying = false;
					jQuery.pub('espn.video.pause');
				}
			}
			//"autostartEnabled"
			//"autostartDisabled"
			//"embedCodeChanged"
		}
	};
	
	
	function setupDefaultValues(settings){
		
		var defaults = {
			"width":"576",
			"height":"324",
			"endCard":"false",
			"autoPlay":"true"
		};
		
		for(var key in defaults){
			var item = defaults[key];
			
			if(settings[key]===undefined){
				if(typeof(item)==='object'){
					settings[item.name] = item.value
				}
				else{
					settings[key] = item;
				}
			}
		}

		return settings;
	}
	
	function buildModuleParams(params) {
		if(params!==undefined && typeof(params)==='object'){
			if(params['player']!==undefined && params['trackingName']===undefined){
				params['trackingName'] = params['player'];
			}
			
			var name,
			// thruParam ESPN analytics
			varNames = ['trackingName','SWID','omnitureAccount','localSite'],
			i=varNames.length;

			while(i--) {
				name = varNames[i];
				if (typeof params[name] !== 'undefined') {
					analyticsParams[name] = params[name];
				}
			}

			// thruParam ESPN freewheel
			varNames = ['videoId', 'SWID', 'midSequence', 'minDuration', 'maxDuration', 'fw_site_section_id', 'FRMSegment', 'adUnit'];
			i=varNames.length;
			while(i--) {
				name = varNames[i];
				if (typeof params[name] !== 'undefined') {
					freewheelParams[name] = params[name];
				}
			}

			// thruParam ESPN UI
			varNames = ['useJS', 'thumbnail', 'showWaterMark', 'shareButtons', 'saveButton', 'playRelatedExternally', 'playbackButtonLocation', 'htmlFunction', 'endCard', 'enableTranscript', 'autoPlayButton', 'autoPlay'];
			i=varNames.length;
			while(i--) {
				name = varNames[i];
				if (typeof params[name] !== 'undefined') {
					uiParams[name] = params[name];
				}
			}
		}
	}
	
	function setOoyalaValues(cms){
		if(cms=="deportes"){
			playerBrandingId = '5a6c62581b2c413583896ee4c0782fc0';
			pcode = '1kNG061cgaoolOncv54OAO1ceO-I';
			adPlayerBrandingId = '17f3a5a4e70b4bff9cd0b5f369f6ab27';
			adSetCode = 'c36b9d45d5a34800944308541b5f32e0';
		}
		else if(cms=="espn"){
			playerBrandingId = 'a28f1994885a41098953d166c34cf81c';
			pcode = '1kNG061cgaoolOncv54OAO1ceO-I';
			adPlayerBrandingId = '7d9dcfef73364b40b3f96f6ffc37baa6';
			adSetCode = '91cDU6NuXTGKz3OdjOxFdAgJVtQcKJnI';
		}
		else if (cms=="intl") {
			playerBrandingId = 'fe0488488a284ab0b12b700cf5896867';
			pcode = 'B4a3E63GKeEtO92XK7NI067ak980';
			adPlayerBrandingId = 'eb9628d6542b47d4b11161f585477567';
			adSetCode = '5d80a8f4a1f545b0944606ef39cf05e2';
		}
	}
	
	function setModuleParams(playerId) {		
		try {
			
			// return three or less colon-delimitted sections of the omniPageName for freewheel
			var getSiteSection = function(str) {
				var siteSection = '', temp = str.split(':');
				if (temp.length <= 2) {
					siteSection = str;
				}
				else {
					for (i=0; i<=2; i++) {
						siteSection += temp[i];
						if (i!=2) {siteSection += ':'; }
					}
				}
				return siteSection;
			};
			
			// analytics
			if (!analyticsParams.omnitureAccount && window.s_account!==undefined && typeof(window.s_account) === 'string'){
				analyticsParams.omnitureAccount = window.s_account;
			}
			var userSWID = $.cookie('SWID');
			if(userSWID===null){
				userSWID = '';
			}
			if (!analyticsParams.SWID){
				analyticsParams.SWID = userSWID;
			}
			
			// freewheel
			if (!freewheelParams.FRMSegment){
				if(window.espn.core!==undefined && window.espn.core.ad_segments!==undefined && typeof(window.espn.core.ad_segments) == 'function') {
					freewheelParams.FRMSegment = window.espn.core.ad_segments();
				}
				else{
					freewheelParams.FRMSegment = ad_segments();
				}
			}
			if (!!freewheelParams.fw_site_section_id) {
				freewheelParams.fw_site_section_id = getSiteSection(freewheelParams.fw_site_section_id);
			}
			else if (!freewheelParams.fw_site_section_id && window.omniPageName!==undefined && typeof(window.omniPageName) === 'string') {
				freewheelParams.fw_site_section_id = getSiteSection(window.omniPageName);
			}
			if (!freewheelParams.SWID){
				freewheelParams.SWID = userSWID;
			}
						
			var moduleParams = {
				'espn-ui': uiParams,
				'freewheel-ads-manager': freewheelParams,
				'espn-analytics': analyticsParams
			};
			document.getElementById(playerId).setModuleParams(moduleParams);
		}
		catch(e) {}
	}
	
	
	if(jQuery.cookie===undefined){
		jQuery.cookie = function(key,value,options) {
		  // set up variables used later in this method
		  var settings = jQuery.extend({
		      'domain':'.espn.go.com',
		      'path': '/',
		      'secure': window.location.protocol === 'https:',
		      'expires': null
		    },options),
		    regex, r, date, expires,
		    path = settings.path !== null ? '; path='+settings.path : '',
		    domain = settings.domain !== null ? '; domain='+settings.domain : '',
		    secure = settings.path === true ? '; secure=' : '';

		  // if only a key was passed in, look to see if we have that cookie and pass back the value.
		  if (typeof value === 'undefined') {
		    regex = new RegExp('(^|;) ?' + key + '=([^;]+)(;|$)','g');
		    r = regex.exec(document.cookie);
		    if (r !== null) {
		      return decodeURIComponent(r[2]);
		    }
		    return null;
		  }

		  // set the value of a cookie down here
		  if (settings.expires !== null && (typeof settings.expires === 'number' || settings.expires.toUTCString)) {
		    if (typeof settings.expires === 'number') {
		      date = new Date();
		      date.setTime(date.getTime() + (settings.expires * 24 * 60 * 60 * 1000));
		    } else {
		      date = settings.expires;
		    }
		    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
		  }
		  document.cookie = [key, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		  return document.cookie;
		};
	}
	
	
	function ad_segments() {
		// Real cookie.
		var o = "",
			c = jQuery.cookie('CRBLM');

		// 709=10,56=1
		//var o="",c="CBLM-001:AsUAAAAKADgAAAAB";
		// 0=1, 37=100, 698=1, 75=2, 757=1, 758=1, 699=1, 709=1, 792=1, 800=1, 818=1, 826=1 var o="",c="CBLM-001:AAAAAAABACUAAABkAroAAAABAEsAAAACAvUAAAABAvYAAAABArsAAAABAsUAAAABAxgAAAABAyAAAAABAzIAAAABAzoAAAAB";
		if (c) {
			var c = c.substring(9);
			var index = 0,
				value = 0,
				count = 0,
				key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			// Ensure input is a multiple of 4 bytes.
			for (var i = 0, n = c.length, nn = n - (n % 4); i < nn;) {
				var enc1 = key.indexOf(c.charAt(i++));
				var enc2 = key.indexOf(c.charAt(i++));
				// Base64 decode and shift 0 or 8 bits. Increment index.
				value |= (enc1 << 2 | enc2 >> 4) << (index++ ? 0 : 8);
				// Add value to output if index is not 2.
				if (!(index - 2) && value) {
					o += "seg=" + value + ";";
					if (++count == 12) break; // Quit after 6 segments.
				}
				// If index is 6, set to 0. If index is 0 (segment value) or 2 (segment ID), set value to 0.
				value *= (index %= 6) && index - 2 ? 1 : 0;
				var enc3 = key.indexOf(c.charAt(i++));
				if (enc3 != 64) {
					value |= ((enc2 & 15) << 4 | enc3 >> 2) << (index++ ? 0 : 8);
					if (!(index - 2) && value) {
						o += "seg=" + value + ";";
						if (++count == 12) break;
					}
					value *= (index %= 6) && index - 2 ? 1 : 0;
				}
				var enc4 = key.indexOf(c.charAt(i++));
				if (enc4 != 64) {
					value |= ((enc3 & 3) << 6 | enc4) << (index++ ? 0 : 8);
					if (!(index - 2) && value) {
						o += "seg=" + value + ";";
						if (++count == 12) break;
					}
					value *= (index %= 6) && index - 2 ? 1 : 0;
				}
			}
		}
		return o;
	}
	
	;(function(d){
		/*	
		jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)
		Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.
		Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
		http://dojofoundation.org/license for more information.
		*/	

		// the topic/subscription hash
		var cache = {};

		d.pub = function(/* String */topic, /* Array? */args){
			// summary: 
			//		Publish some data on a named topic.
			// topic: String
			//		The channel to publish on
			// args: Array?
			//		The data to publish. Each array item is converted into an ordered
			//		arguments on the subscribed functions. 
			//
			// example:
			//		Publish stuff on '/some/topic'. Anything subscribed will be called
			//		with a function signature like: function(a,b,c){ ... }
			//
			//	|		$.publish("/some/topic", ["a","b","c"]);
			cache[topic] && d.each(cache[topic], function(){
				this.apply(d, args || []);
			});
		};

		d.sub = function(/* String */topic, /* Function */callback){
			// summary:
			//		Register a callback on a named topic.
			// topic: String
			//		The channel to subscribe to
			// callback: Function
			//		The handler event. Anytime something is $.publish'ed on a 
			//		subscribed channel, the callback will be called with the
			//		published array as ordered arguments.
			//
			// returns: Array
			//		A handle which can be used to unsubscribe this particular subscription.
			//	
			// example:
			//	|	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
			//
			if(!cache[topic]){
				cache[topic] = [];
			}
			cache[topic].push(callback);
			return [topic, callback]; // Array
		};

		d.unsub = function(/* Array */handle){
			// summary:
			//		Disconnect a subscribed function for a topic.
			// handle: Array
			//		The return value from a $.subscribe call.
			// example:
			//	|	var handle = $.subscribe("/something", function(){});
			//	|	$.unsubscribe(handle);
			
			var t = handle[0];
			cache[t] && d.each(cache[t], function(idx){
				if(this == handle[1]){
					cache[t].splice(idx, 1);
				}
			});
		};
	})(jQuery);
	
	/*
	
	Section: PubSub Topics
		This library publishes the following topics:
		
		Topic: espn.video.ad.end
			This topic is published when an ad stops playing.
		
		Usage:
			>	espn.video.subscribe('espn.video.ad.end', function() {  });
		
		
		Topic: espn.video.ad.start
			This topic is published when an ad starts playing.
		
		Parameters:
			adDuration - (Number) Duration of the ad in seconds.
		
		Usage:
			>	espn.video.subscribe('espn.video.ad.start', function(adDuration) {  });
			
		
		Topic: espn.video.complete
			This topic is published when the video playback is complete.
		
		Usage:
			>	espn.video.subscribe('espn.video.complete', function() {  });
			
		
		Topic: espn.video.init
			This topic is published when the video player is initialized and ready for API calls.
		
		Usage:
			>	espn.video.subscribe('espn.video.init', function() {  });
		

		Topic: espn.video.pause
			This topic is published when a video has been paused.
		
		Usage:
			>	espn.video.subscribe('espn.video.pause', function() {  });
			
		
		Topic: espn.video.play
			This topic is published when the player begins playing an ad or video.
		
		Usage:
			>	espn.video.subscribe('espn.video.play', function() {  });		
		
		
		Topic: espn.video.playlist.ended
			This topic is published when the channel/playlist is complete.
			
		Usage:
			>	espn.video.subscribe('espn.video.playlist.ended', function() {  });
			
		
		Topic: espn.video.ready
			This topic is published when the video player is initialized and ready for API calls. Previously indicated that the playlist.xml had loaded for the old Disney MPF player.
		
		Usage:
			>	espn.video.subscribe('espn.video.ready', function() {  });

	*/
	
})(jQuery, window);/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
(function(j){var c=function(){throw"UID cannot be instantiated";};c._nextID=0;c.get=function(){return c._nextID++};j.UID=c})(window);(function(j){var c=function(){throw"Ticker cannot be instantiated.";};c.useRAF=null;c.animationTarget=null;c._listeners=null;c._pauseable=null;c._paused=false;c._inited=false;c._startTime=0;c._pausedTime=0;c._ticks=0;c._pausedTickers=0;c._interval=50;c._lastTime=0;c._times=null;c._tickTimes=null;c._rafActive=false;c._timeoutID=null;c.addListener=function(a,b){a!=null&&(c._inited||c.init(),c.removeListener(a),c._pauseable[c._listeners.length]=b==null?true:b,c._listeners.push(a))};c.init=function(){c._inited=
true;c._times=[];c._tickTimes=[];c._pauseable=[];c._listeners=[];c._times.push(c._lastTime=c._startTime=c._getTime());c.setInterval(c._interval)};c.removeListener=function(a){c._listeners!=null&&(a=c._listeners.indexOf(a),a!=-1&&(c._listeners.splice(a,1),c._pauseable.splice(a,1)))};c.removeAllListeners=function(){c._listeners=[];c._pauseable=[]};c.setInterval=function(a){c._interval=a;c._inited&&c._setupTick()};c.getInterval=function(){return c._interval};c.setFPS=function(a){c.setInterval(1E3/a)};
c.getFPS=function(){return 1E3/c._interval};c.getMeasuredFPS=function(a){if(c._times.length<2)return-1;a==null&&(a=c.getFPS()|0);a=Math.min(c._times.length-1,a);return 1E3/((c._times[0]-c._times[a])/a)};c.setPaused=function(a){c._paused=a};c.getPaused=function(){return c._paused};c.getTime=function(a){return c._getTime()-c._startTime-(a?c._pausedTime:0)};c.getTicks=function(a){return c._ticks-(a?c._pausedTickers:0)};c._handleAF=function(a){c._rafActive=false;c._setupTick();a-c._lastTime>=c._interval-
1&&c._tick()};c._handleTimeout=function(){c.timeoutID=null;c._setupTick();c._tick()};c._setupTick=function(){if(!(c._rafActive||c.timeoutID!=null)){if(c.useRAF){var a=j.requestAnimationFrame||j.webkitRequestAnimationFrame||j.mozRequestAnimationFrame||j.oRequestAnimationFrame||j.msRequestAnimationFrame;if(a){a(c._handleAF,c.animationTarget);c._rafActive=true;return}}c.timeoutID=setTimeout(c._handleTimeout,c._interval)}};c._tick=function(){c._ticks++;var a=c._getTime(),b=a-c._lastTime,p=c._paused;p&&
(c._pausedTickers++,c._pausedTime+=b);c._lastTime=a;for(var h=c._pauseable,e=c._listeners.slice(),d=e?e.length:0,f=0;f<d;f++){var g=e[f];g==null||p&&h[f]||(g.tick?g.tick(b,p):g instanceof Function&&g(b,p))}for(c._tickTimes.unshift(c._getTime()-a);c._tickTimes.length>100;)c._tickTimes.pop();for(c._times.unshift(a);c._times.length>100;)c._times.pop()};c._getTime=function(){return(new Date).getTime()};j.Ticker=c})(window);(function(j){var c=function(b,a,h,c,d){this.initialize(b,a,h,c,d)},a=c.prototype;a.stageX=0;a.stageY=0;a.type=null;a.nativeEvent=null;a.onMouseMove=null;a.onMouseUp=null;a.target=null;a.initialize=function(b,a,h,c,d){this.type=b;this.stageX=a;this.stageY=h;this.target=c;this.nativeEvent=d};a.clone=function(){return new c(this.type,this.stageX,this.stageY,this.target,this.nativeEvent)};a.toString=function(){return"[MouseEvent (type="+this.type+" stageX="+this.stageX+" stageY="+this.stageY+")]"};j.MouseEvent=
c})(window);(function(j){var c=function(b,a,h,c,d,f){this.initialize(b,a,h,c,d,f)},a=c.prototype;c.identity=null;c.DEG_TO_RAD=Math.PI/180;a.a=1;a.b=0;a.c=0;a.d=1;a.tx=0;a.ty=0;a.alpha=1;a.shadow=null;a.compositeOperation=null;a.initialize=function(b,a,h,c,d,f){if(b!=null)this.a=b;this.b=a||0;this.c=h||0;if(c!=null)this.d=c;this.tx=d||0;this.ty=f||0};a.prepend=function(b,a,h,c,d,f){var g=this.tx;if(b!=1||a!=0||h!=0||c!=1){var k=this.a,i=this.c;this.a=k*b+this.b*h;this.b=k*a+this.b*c;this.c=i*b+this.d*h;this.d=
i*a+this.d*c}this.tx=g*b+this.ty*h+d;this.ty=g*a+this.ty*c+f};a.append=function(b,a,h,c,d,f){var g=this.a,k=this.b,i=this.c,l=this.d;this.a=b*g+a*i;this.b=b*k+a*l;this.c=h*g+c*i;this.d=h*k+c*l;this.tx=d*g+f*i+this.tx;this.ty=d*k+f*l+this.ty};a.prependMatrix=function(b){this.prepend(b.a,b.b,b.c,b.d,b.tx,b.ty);this.prependProperties(b.alpha,b.shadow,b.compositeOperation)};a.appendMatrix=function(b){this.append(b.a,b.b,b.c,b.d,b.tx,b.ty);this.appendProperties(b.alpha,b.shadow,b.compositeOperation)};
a.prependTransform=function(b,a,h,e,d,f,g,k,i){if(d%360)var l=d*c.DEG_TO_RAD,d=Math.cos(l),l=Math.sin(l);else d=1,l=0;if(k||i)this.tx-=k,this.ty-=i;f||g?(f*=c.DEG_TO_RAD,g*=c.DEG_TO_RAD,this.prepend(d*h,l*h,-l*e,d*e,0,0),this.prepend(Math.cos(g),Math.sin(g),-Math.sin(f),Math.cos(f),b,a)):this.prepend(d*h,l*h,-l*e,d*e,b,a)};a.appendTransform=function(b,a,h,e,d,f,g,k,i){if(d%360)var l=d*c.DEG_TO_RAD,d=Math.cos(l),l=Math.sin(l);else d=1,l=0;f||g?(f*=c.DEG_TO_RAD,g*=c.DEG_TO_RAD,this.append(Math.cos(g),
Math.sin(g),-Math.sin(f),Math.cos(f),b,a),this.append(d*h,l*h,-l*e,d*e,0,0)):this.append(d*h,l*h,-l*e,d*e,b,a);if(k||i)this.tx-=k*this.a+i*this.c,this.ty-=k*this.b+i*this.d};a.rotate=function(b){var a=Math.cos(b),b=Math.sin(b),h=this.a,c=this.c,d=this.tx;this.a=h*a-this.b*b;this.b=h*b+this.b*a;this.c=c*a-this.d*b;this.d=c*b+this.d*a;this.tx=d*a-this.ty*b;this.ty=d*b+this.ty*a};a.skew=function(b,a){b*=c.DEG_TO_RAD;a*=c.DEG_TO_RAD;this.append(Math.cos(a),Math.sin(a),-Math.sin(b),Math.cos(b),0,0)};a.scale=
function(b,a){this.a*=b;this.d*=a;this.tx*=b;this.ty*=a};a.translate=function(b,a){this.tx+=b;this.ty+=a};a.identity=function(){this.alpha=this.a=this.d=1;this.b=this.c=this.tx=this.ty=0;this.shadow=this.compositeOperation=null};a.invert=function(){var b=this.a,a=this.b,h=this.c,c=this.d,d=this.tx,f=b*c-a*h;this.a=c/f;this.b=-a/f;this.c=-h/f;this.d=b/f;this.tx=(h*this.ty-c*d)/f;this.ty=-(b*this.ty-a*d)/f};a.isIdentity=function(){return this.tx==0&&this.ty==0&&this.a==1&&this.b==0&&this.c==0&&this.d==
1};a.decompose=function(b){b==null&&(b={});b.x=this.tx;b.y=this.ty;b.scaleX=Math.sqrt(this.a*this.a+this.b*this.b);b.scaleY=Math.sqrt(this.c*this.c+this.d*this.d);var a=Math.atan2(-this.c,this.d),h=Math.atan2(this.b,this.a);a==h?(b.rotation=h/c.DEG_TO_RAD,this.a<0&&this.d>=0&&(b.rotation+=b.rotation<=0?180:-180),b.skewX=b.skewY=0):(b.skewX=a/c.DEG_TO_RAD,b.skewY=h/c.DEG_TO_RAD);return b};a.reinitialize=function(b,a,h,c,d,f,g,k,i){this.initialize(b,a,h,c,d,f);this.alpha=g||1;this.shadow=k;this.compositeOperation=
i;return this};a.appendProperties=function(b,a,h){this.alpha*=b;this.shadow=a||this.shadow;this.compositeOperation=h||this.compositeOperation};a.prependProperties=function(b,a,h){this.alpha*=b;this.shadow=this.shadow||a;this.compositeOperation=this.compositeOperation||h};a.clone=function(){var b=new c(this.a,this.b,this.c,this.d,this.tx,this.ty);b.shadow=this.shadow;b.alpha=this.alpha;b.compositeOperation=this.compositeOperation;return b};a.toString=function(){return"[Matrix2D (a="+this.a+" b="+this.b+
" c="+this.c+" d="+this.d+" tx="+this.tx+" ty="+this.ty+")]"};c.identity=new c(1,0,0,1,0,0);j.Matrix2D=c})(window);(function(j){var c=function(b,a){this.initialize(b,a)},a=c.prototype;a.x=0;a.y=0;a.initialize=function(b,a){this.x=b==null?0:b;this.y=a==null?0:a};a.clone=function(){return new c(this.x,this.y)};a.toString=function(){return"[Point (x="+this.x+" y="+this.y+")]"};j.Point=c})(window);(function(j){var c=function(b,a,h,c){this.initialize(b,a,h,c)},a=c.prototype;a.x=0;a.y=0;a.width=0;a.height=0;a.initialize=function(b,a,c,e){this.x=b==null?0:b;this.y=a==null?0:a;this.width=c==null?0:c;this.height=e==null?0:e};a.clone=function(){return new c(this.x,this.y,this.width,this.height)};a.toString=function(){return"[Rectangle (x="+this.x+" y="+this.y+" width="+this.width+" height="+this.height+")]"};j.Rectangle=c})(window);(function(j){var c=function(b,a,c,e){this.initialize(b,a,c,e)},a=c.prototype;c.identity=null;a.color=null;a.offsetX=0;a.offsetY=0;a.blur=0;a.initialize=function(b,a,c,e){this.color=b;this.offsetX=a;this.offsetY=c;this.blur=e};a.toString=function(){return"[Shadow]"};a.clone=function(){return new c(this.color,this.offsetX,this.offsetY,this.blur)};c.identity=new c("transparent",0,0,0);j.Shadow=c})(window);(function(j){var c=function(b){this.initialize(b)},a=c.prototype;a.complete=true;a.onComplete=null;a._animations=null;a._frames=null;a._images=null;a._data=null;a._loadCount=0;a._frameHeight=0;a._frameWidth=0;a._numFrames=0;a._regX=0;a._regY=0;a.initialize=function(b){var a,c,e;if(b!=null){if(b.images&&(c=b.images.length)>0){e=this._images=[];for(a=0;a<c;a++){var d=b.images[a];if(!(d instanceof Image)){var f=d,d=new Image;d.src=f}e.push(d);if(!d.getContext&&!d.complete)this._loadCount++,this.complete=
false,function(b){d.onload=function(){b._handleImageLoad()}}(this)}}if(b.frames!=null)if(b.frames instanceof Array){this._frames=[];e=b.frames;for(a=0,c=e.length;a<c;a++)f=e[a],this._frames.push({image:this._images[f[4]?f[4]:0],rect:new Rectangle(f[0],f[1],f[2],f[3]),regX:f[5]||0,regY:f[6]||0})}else c=b.frames,this._frameWidth=c.width,this._frameHeight=c.height,this._regX=c.regX||0,this._regY=c.regY||0,this._numFrames=c.count,this._loadCount==0&&this._calculateFrames();if((c=b.animations)!=null){this._animations=
[];this._data={};for(var g in c){b={name:g};f=c[g];if(isNaN(f))if(f instanceof Array){b.frequency=f[3];b.next=f[2];e=b.frames=[];for(a=f[0];a<=f[1];a++)e.push(a)}else b.frequency=f.frequency,b.next=f.next,e=b.frames=f.frames.slice(0);else e=b.frames=[f];b.next=e.length<2||b.next==false?null:b.next==null||b.next==true?g:b.next;if(!b.frequency)b.frequency=1;this._animations.push(g);this._data[g]=b}}}};a.getNumFrames=function(b){return b==null?this._frames?this._frames.length:this._numFrames:(b=this._data[b],
b==null?0:b.frames.length)};a.getAnimations=function(){return this._animations.slice(0)};a.getAnimation=function(b){return this._data[b]};a.getFrame=function(b){return this.complete&&this._frames&&(frame=this._frames[b])?frame:null};a.toString=function(){return"[SpriteSheet]"};a.clone=function(){var b=new c;b.complete=this.complete;b._animations=this._animations;b._frames=this._frames;b._images=this._images;b._data=this._data;b._frameHeight=this._frameHeight;b._frameWidth=this._frameWidth;b._numFrames=
this._numFrames;b._loadCount=this._loadCount;return b};a._handleImageLoad=function(){if(--this._loadCount==0)this._calculateFrames(),this.complete=true,this.onComplete&&this.onComplete()};a._calculateFrames=function(){if(!(this._frames||this._frameWidth==0)){this._frames=[];for(var b=0,a=this._frameWidth,c=this._frameHeight,e=0,d=this._images;e<d.length;e++){for(var f=d[e],g=(f.width+1)/a|0,k=(f.height+1)/c|0,k=this._numFrames>0?Math.min(this._numFrames-b,g*k):g*k,i=0;i<k;i++)this._frames.push({image:f,
rect:new Rectangle(i%g*a,(i/g|0)*c,a,c),regX:this._regX,regY:this._regY});b+=k}this._numFrames=b}};j.SpriteSheet=c})(window);(function(j){function c(b,a){this.f=b;this.params=a}c.prototype.exec=function(b){this.f.apply(b,this.params)};var a=function(){this.initialize()},b=a.prototype;a.getRGB=function(b,a,c,d){b!=null&&c==null&&(d=a,c=b&255,a=b>>8&255,b=b>>16&255);return d==null?"rgb("+b+","+a+","+c+")":"rgba("+b+","+a+","+c+","+d+")"};a.getHSL=function(b,a,c,d){return d==null?"hsl("+b%360+","+a+"%,"+c+"%)":"hsla("+b%360+","+a+"%,"+c+"%,"+d+")"};a.BASE_64={A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,
P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,"+":62,"/":63};a.STROKE_CAPS_MAP=["butt","round","square"];a.STROKE_JOINTS_MAP=["miter","round","bevel"];a._ctx=document.createElement("canvas").getContext("2d");a.beginCmd=new c(a._ctx.beginPath,[]);a.fillCmd=new c(a._ctx.fill,[]);a.strokeCmd=new c(a._ctx.stroke,[]);
b._strokeInstructions=null;b._strokeStyleInstructions=null;b._fillInstructions=null;b._instructions=null;b._oldInstructions=null;b._activeInstructions=null;b._active=false;b._dirty=false;b.initialize=function(){this.clear();this._ctx=a._ctx};b.draw=function(b){this._dirty&&this._updateInstructions();for(var a=this._instructions,c=0,d=a.length;c<d;c++)a[c].exec(b)};b.moveTo=function(b,a){this._activeInstructions.push(new c(this._ctx.moveTo,[b,a]));return this};b.lineTo=function(b,a){this._dirty=this._active=
true;this._activeInstructions.push(new c(this._ctx.lineTo,[b,a]));return this};b.arcTo=function(b,a,e,d,f){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.arcTo,[b,a,e,d,f]));return this};b.arc=function(b,a,e,d,f,g){this._dirty=this._active=true;g==null&&(g=false);this._activeInstructions.push(new c(this._ctx.arc,[b,a,e,d,f,g]));return this};b.quadraticCurveTo=function(b,a,e,d){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.quadraticCurveTo,
[b,a,e,d]));return this};b.bezierCurveTo=function(b,a,e,d,f,g){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.bezierCurveTo,[b,a,e,d,f,g]));return this};b.rect=function(b,a,e,d){this._dirty=this._active=true;this._activeInstructions.push(new c(this._ctx.rect,[b,a,e,d]));return this};b.closePath=function(){if(this._active)this._dirty=true,this._activeInstructions.push(new c(this._ctx.closePath,[]));return this};b.clear=function(){this._instructions=[];this._oldInstructions=
[];this._activeInstructions=[];this._strokeStyleInstructions=this._strokeInstructions=this._fillInstructions=null;this._active=this._dirty=false;return this};b.beginFill=function(b){this._active&&this._newPath();this._fillInstructions=b?[new c(this._setProp,["fillStyle",b])]:null;return this};b.beginLinearGradientFill=function(b,a,e,d,f,g){this._active&&this._newPath();e=this._ctx.createLinearGradient(e,d,f,g);d=0;for(f=b.length;d<f;d++)e.addColorStop(a[d],b[d]);this._fillInstructions=[new c(this._setProp,
["fillStyle",e])];return this};b.beginRadialGradientFill=function(b,a,e,d,f,g,k,i){this._active&&this._newPath();e=this._ctx.createRadialGradient(e,d,f,g,k,i);d=0;for(f=b.length;d<f;d++)e.addColorStop(a[d],b[d]);this._fillInstructions=[new c(this._setProp,["fillStyle",e])];return this};b.beginBitmapFill=function(b,a){this._active&&this._newPath();var e=this._ctx.createPattern(b,a||"");this._fillInstructions=[new c(this._setProp,["fillStyle",e])];return this};b.endFill=function(){this.beginFill();
return this};b.setStrokeStyle=function(b,h,e,d){this._active&&this._newPath();this._strokeStyleInstructions=[new c(this._setProp,["lineWidth",b==null?"1":b]),new c(this._setProp,["lineCap",h==null?"butt":isNaN(h)?h:a.STROKE_CAPS_MAP[h]]),new c(this._setProp,["lineJoin",e==null?"miter":isNaN(e)?e:a.STROKE_JOINTS_MAP[e]]),new c(this._setProp,["miterLimit",d==null?"10":d])];return this};b.beginStroke=function(b){this._active&&this._newPath();this._strokeInstructions=b?[new c(this._setProp,["strokeStyle",
b])]:null;return this};b.beginLinearGradientStroke=function(b,a,e,d,f,g){this._active&&this._newPath();e=this._ctx.createLinearGradient(e,d,f,g);d=0;for(f=b.length;d<f;d++)e.addColorStop(a[d],b[d]);this._strokeInstructions=[new c(this._setProp,["strokeStyle",e])];return this};b.beginRadialGradientStroke=function(b,a,e,d,f,g,k,i){this._active&&this._newPath();e=this._ctx.createRadialGradient(e,d,f,g,k,i);d=0;for(f=b.length;d<f;d++)e.addColorStop(a[d],b[d]);this._strokeInstructions=[new c(this._setProp,
["strokeStyle",e])];return this};b.beginBitmapStroke=function(b,a){this._active&&this._newPath();var e=this._ctx.createPattern(b,a||"");this._strokeInstructions=[new c(this._setProp,["strokeStyle",e])];return this};b.endStroke=function(){this.beginStroke();return this};b.curveTo=b.quadraticCurveTo;b.drawRect=b.rect;b.drawRoundRect=function(b,a,c,d,f){this.drawRoundRectComplex(b,a,c,d,f,f,f,f);return this};b.drawRoundRectComplex=function(b,a,e,d,f,g,k,i){this._dirty=this._active=true;var l=Math.PI,
j=this._ctx.arc,m=this._ctx.lineTo;this._activeInstructions.push(new c(this._ctx.moveTo,[b+f,a]),new c(m,[b+e-g,a]),g>=0?new c(j,[b+e-g,a+g,g,-l/2,0]):new c(j,[b+e,a,-g,l,l/2,true]),new c(m,[b+e,a+d-k]),i>=0?new c(j,[b+e-k,a+d-k,k,0,l/2]):new c(j,[b+e,a+d,-k,-l/2,l,true]),new c(m,[b+i,a+d]),i>=0?new c(j,[b+i,a+d-i,i,l/2,l]):new c(j,[b,a+d,-i,0,-l/2,true]),new c(m,[b,a+f]),f>=0?new c(j,[b+f,a+f,f,l,-l/2]):new c(j,[b,a,-f,l/2,0,true]));return this};b.drawCircle=function(b,a,c){this.arc(b,a,c,0,Math.PI*
2);return this};b.drawEllipse=function(b,a,e,d){this._dirty=this._active=true;var f=e/2*0.5522848,g=d/2*0.5522848,k=b+e,i=a+d,e=b+e/2,d=a+d/2;this._activeInstructions.push(new c(this._ctx.moveTo,[b,d]),new c(this._ctx.bezierCurveTo,[b,d-g,e-f,a,e,a]),new c(this._ctx.bezierCurveTo,[e+f,a,k,d-g,k,d]),new c(this._ctx.bezierCurveTo,[k,d+g,e+f,i,e,i]),new c(this._ctx.bezierCurveTo,[e-f,i,b,d+g,b,d]));return this};b.drawPolyStar=function(b,a,e,d,f,g){this._dirty=this._active=true;f==null&&(f=0);f=1-f;g==
null?g=0:g/=180/Math.PI;var k=Math.PI/d;this._activeInstructions.push(new c(this._ctx.moveTo,[b+Math.cos(g)*e,a+Math.sin(g)*e]));for(var i=0;i<d;i++)g+=k,f!=1&&this._activeInstructions.push(new c(this._ctx.lineTo,[b+Math.cos(g)*e*f,a+Math.sin(g)*e*f])),g+=k,this._activeInstructions.push(new c(this._ctx.lineTo,[b+Math.cos(g)*e,a+Math.sin(g)*e]));return this};b.p=b.decodePath=function(b){for(var c=[this.moveTo,this.lineTo,this.quadraticCurveTo,this.bezierCurveTo],e=[2,2,4,6],d=0,f=b.length,g=[],k=0,
i=0,l=a.BASE_64;d<f;){var j=l[b.charAt(d)],m=j>>3,q=c[m];if(!q||j&3)throw"bad path data";var r=e[m];m||(k=i=0);g.length=0;d++;j=(j>>2&1)+2;for(m=0;m<r;m++){var n=l[b.charAt(d)],s=n>>5?-1:1,n=(n&31)<<6|l[b.charAt(d+1)];j==3&&(n=n<<6|l[b.charAt(d+2)]);n=s*n/10;m%2?k=n+=k:i=n+=i;g[m]=n;d+=j}q.apply(this,g)}return this};b.clone=function(){var b=new a;b._instructions=this._instructions.slice();b._activeInstructions=this._activeInstructions.slice();b._oldInstructions=this._oldInstructions.slice();if(this._fillInstructions)b._fillInstructions=
this._fillInstructions.slice();if(this._strokeInstructions)b._strokeInstructions=this._strokeInstructions.slice();if(this._strokeStyleInstructions)b._strokeStyleInstructions=this._strokeStyleInstructions.slice();b._active=this._active;b._dirty=this._dirty;return b};b.toString=function(){return"[Graphics]"};b.mt=b.moveTo;b.lt=b.lineTo;b.at=b.arcTo;b.bt=b.bezierCurveTo;b.qt=b.quadraticCurveTo;b.a=b.arc;b.r=b.rect;b.cp=b.closePath;b.c=b.clear;b.f=b.beginFill;b.lf=b.beginLinearGradientFill;b.rf=b.beginRadialGradientFill;
b.bf=b.beginBitmapFill;b.ef=b.endFill;b.ss=b.setStrokeStyle;b.s=b.beginStroke;b.ls=b.beginLinearGradientStroke;b.rs=b.beginRadialGradientStroke;b.bs=b.beginBitmapStroke;b.es=b.endStroke;b.dr=b.drawRect;b.rr=b.drawRoundRect;b.rc=b.drawRoundRectComplex;b.dc=b.drawCircle;b.de=b.drawEllipse;b.dp=b.drawPolyStar;b._updateInstructions=function(){this._instructions=this._oldInstructions.slice();this._instructions.push(a.beginCmd);this._fillInstructions&&this._instructions.push.apply(this._instructions,this._fillInstructions);
this._strokeInstructions&&(this._instructions.push.apply(this._instructions,this._strokeInstructions),this._strokeStyleInstructions&&this._instructions.push.apply(this._instructions,this._strokeStyleInstructions));this._instructions.push.apply(this._instructions,this._activeInstructions);this._fillInstructions&&this._instructions.push(a.fillCmd);this._strokeInstructions&&this._instructions.push(a.strokeCmd)};b._newPath=function(){this._dirty&&this._updateInstructions();this._oldInstructions=this._instructions;
this._activeInstructions=[];this._active=this._dirty=false};b._setProp=function(b,a){this[b]=a};j.Graphics=a})(window);(function(j){var c=function(){this.initialize()},a=c.prototype;c.suppressCrossDomainErrors=false;c._hitTestCanvas=document.createElement("canvas");c._hitTestCanvas.width=c._hitTestCanvas.height=1;c._hitTestContext=c._hitTestCanvas.getContext("2d");c._nextCacheID=1;a.alpha=1;a.cacheCanvas=null;a.id=-1;a.mouseEnabled=true;a.name=null;a.parent=null;a.regX=0;a.regY=0;a.rotation=0;a.scaleX=1;a.scaleY=1;a.skewX=0;a.skewY=0;a.shadow=null;a.visible=true;a.x=0;a.y=0;a.compositeOperation=null;a.snapToPixel=
false;a.onPress=null;a.onClick=null;a.onDoubleClick=null;a.onMouseOver=null;a.onMouseOut=null;a.onTick=null;a.filters=null;a.cacheID=0;a._cacheOffsetX=0;a._cacheOffsetY=0;a._cacheDataURLID=0;a._cacheDataURL=null;a._matrix=null;a.initialize=function(){this.id=UID.get();this._matrix=new Matrix2D};a.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0};a.draw=function(b,a){if(a||!this.cacheCanvas)return false;b.drawImage(this.cacheCanvas,this._cacheOffsetX,this._cacheOffsetY);
return true};a.cache=function(b,a,h,e){var d=this.cacheCanvas;if(d==null)d=this.cacheCanvas=document.createElement("canvas");var f=d.getContext("2d");d.width=h;d.height=e;f.setTransform(1,0,0,1,-b,-a);f.clearRect(b,a,d.width,d.height);this.draw(f,true,this._matrix.reinitialize(1,0,0,1,-b,-a));this._cacheOffsetX=b;this._cacheOffsetY=a;this._applyFilters();this.cacheID=c._nextCacheID++};a.updateCache=function(b){var a=this.cacheCanvas,h=this._cacheOffsetX,e=this._cacheOffsetY;if(a==null)throw"cache() must be called before updateCache()";
var d=a.getContext("2d");d.setTransform(1,0,0,1,-h,-e);b?d.globalCompositeOperation=b:d.clearRect(h,e,a.width,a.height);this.draw(d,true);if(b)d.globalCompositeOperation="source-over";this._applyFilters();this.cacheID=c._nextCacheID++};a.uncache=function(){this._cacheDataURL=this.cacheCanvas=null;this.cacheID=this._cacheOffsetX=this._cacheOffsetY=0};a.getCacheDataURL=function(){if(!this.cacheCanvas)return null;if(this.cacheID!=this._cacheDataURLID)this._cacheDataURL=this.cacheCanvas.toDataURL();return this._cacheDataURL};
a.getStage=function(){for(var b=this;b.parent;)b=b.parent;return b instanceof Stage?b:null};a.localToGlobal=function(b,a){var c=this.getConcatenatedMatrix(this._matrix);if(c==null)return null;c.append(1,0,0,1,b,a);return new Point(c.tx,c.ty)};a.globalToLocal=function(b,a){var c=this.getConcatenatedMatrix(this._matrix);if(c==null)return null;c.invert();c.append(1,0,0,1,b,a);return new Point(c.tx,c.ty)};a.localToLocal=function(b,a,c){b=this.localToGlobal(b,a);return c.globalToLocal(b.x,b.y)};a.setTransform=
function(b,a,c,e,d,f,g,k,i){this.x=b||0;this.y=a||0;this.scaleX=c==null?1:c;this.scaleY=e==null?1:e;this.rotation=d||0;this.skewX=f||0;this.skewY=g||0;this.regX=k||0;this.regY=i||0};a.getConcatenatedMatrix=function(b){b?b.identity():b=new Matrix2D;for(var a=this;a!=null;)b.prependTransform(a.x,a.y,a.scaleX,a.scaleY,a.rotation,a.skewX,a.skewY,a.regX,a.regY),b.prependProperties(a.alpha,a.shadow,a.compositeOperation),a=a.parent;return b};a.hitTest=function(b,a){var h=c._hitTestContext,e=c._hitTestCanvas;
h.setTransform(1,0,0,1,-b,-a);this.draw(h);h=this._testHit(h);e.width=0;e.width=1;return h};a.clone=function(){var b=new c;this.cloneProps(b);return b};a.toString=function(){return"[DisplayObject (name="+this.name+")]"};a.cloneProps=function(b){b.alpha=this.alpha;b.name=this.name;b.regX=this.regX;b.regY=this.regY;b.rotation=this.rotation;b.scaleX=this.scaleX;b.scaleY=this.scaleY;b.shadow=this.shadow;b.skewX=this.skewX;b.skewY=this.skewY;b.visible=this.visible;b.x=this.x;b.y=this.y;b.mouseEnabled=
this.mouseEnabled;b.compositeOperation=this.compositeOperation;if(this.cacheCanvas)b.cacheCanvas=this.cacheCanvas.cloneNode(true),b.cacheCanvas.getContext("2d").putImageData(this.cacheCanvas.getContext("2d").getImageData(0,0,this.cacheCanvas.width,this.cacheCanvas.height),0,0)};a.applyShadow=function(b,a){a=a||Shadow.identity;b.shadowColor=a.color;b.shadowOffsetX=a.offsetX;b.shadowOffsetY=a.offsetY;b.shadowBlur=a.blur};a._tick=function(b){if(this.onTick)this.onTick(b)};a._testHit=function(b){try{var a=
b.getImageData(0,0,1,1).data[3]>1}catch(h){if(!c.suppressCrossDomainErrors)throw"An error has occured. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";}return a};a._applyFilters=function(){if(this.filters&&this.filters.length!=0&&this.cacheCanvas)for(var b=this.filters.length,a=this.cacheCanvas.getContext("2d"),c=this.cacheCanvas.width,e=this.cacheCanvas.height,d=0;d<b;d++)this.filters[d].applyFilter(a,0,0,c,e)};j.DisplayObject=c})(window);(function(j){var c=function(){this.initialize()},a=c.prototype=new DisplayObject;a.children=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(){this.DisplayObject_initialize();this.children=[]};a.isVisible=function(){return this.visible&&this.alpha>0&&this.children.length&&this.scaleX!=0&&this.scaleY!=0};a.DisplayObject_draw=a.draw;a.draw=function(b,a,h){var e=Stage._snapToPixelEnabled;if(this.DisplayObject_draw(b,a))return true;for(var h=h||this._matrix.reinitialize(1,0,0,1,0,0,
this.alpha,this.shadow,this.compositeOperation),a=this.children.length,d=this.children.slice(0),f=0;f<a;f++){var g=d[f];if(g.isVisible()){var k=false,i=g._matrix.reinitialize(h.a,h.b,h.c,h.d,h.tx,h.ty,h.alpha,h.shadow,h.compositeOperation);i.appendTransform(g.x,g.y,g.scaleX,g.scaleY,g.rotation,g.skewX,g.skewY,g.regX,g.regY);i.appendProperties(g.alpha,g.shadow,g.compositeOperation);if(!(g instanceof c&&g.cacheCanvas==null))e&&g.snapToPixel&&i.a==1&&i.b==0&&i.c==0&&i.d==1?b.setTransform(i.a,i.b,i.c,
i.d,i.tx+0.5|0,i.ty+0.5|0):b.setTransform(i.a,i.b,i.c,i.d,i.tx,i.ty),b.globalAlpha=i.alpha,b.globalCompositeOperation=i.compositeOperation||"source-over",(k=i.shadow)&&this.applyShadow(b,k);g.draw(b,false,i);k&&this.applyShadow(b)}}return true};a.addChild=function(b){if(b==null)return b;var a=arguments.length;if(a>1){for(var c=0;c<a;c++)this.addChild(arguments[c]);return arguments[a-1]}b.parent&&b.parent.removeChild(b);b.parent=this;this.children.push(b);return b};a.addChildAt=function(b,a){var c=
arguments.length;if(c>2){for(var a=arguments[e-1],e=0;e<c-1;e++)this.addChildAt(arguments[e],a+e);return arguments[c-2]}b.parent&&b.parent.removeChild(b);b.parent=this;this.children.splice(a,0,b);return b};a.removeChild=function(b){var a=arguments.length;if(a>1){for(var c=true,e=0;e<a;e++)c=c&&this.removeChild(arguments[e]);return c}return this.removeChildAt(this.children.indexOf(b))};a.removeChildAt=function(b){var a=arguments.length;if(a>1){for(var c=[],e=0;e<a;e++)c[e]=arguments[e];c.sort(function(b,
a){return a-b});for(var d=true,e=0;e<a;e++)d=d&&this.removeChildAt(c[e]);return d}if(b<0||b>this.children.length-1)return false;a=this.children[b];if(a!=null)a.parent=null;this.children.splice(b,1);return true};a.removeAllChildren=function(){for(var b=this.children;b.length;)b.pop().parent=null};a.getChildAt=function(b){return this.children[b]};a.sortChildren=function(b){this.children.sort(b)};a.getChildIndex=function(b){return this.children.indexOf(b)};a.getNumChildren=function(){return this.children.length};
a.swapChildrenAt=function(b,a){var c=this.children,e=c[b],d=c[a];e&&d&&(c[b]=d,c[a]=e)};a.swapChildren=function(b,a){for(var c=this.children,e,d,f=0,g=c.length;f<g;f++)if(c[f]==b&&(e=f),c[f]==a&&(d=f),e!=null&&d!=null)break;f!=g&&(c[e]=a,c[d]=b)};a.setChildIndex=function(b,a){for(var c=this.children,e=0,d=c.length;e<d;e++)if(c[e]==b)break;e==d||a<0||a>d||e==a||(c.splice(a,1),a<e&&e--,c.splice(b,e,0))};a.contains=function(b){for(;b;){if(b==this)return true;b=b.parent}return false};a.hitTest=function(b,
a){return this.getObjectUnderPoint(b,a)!=null};a.getObjectsUnderPoint=function(b,a){var c=[],e=this.localToGlobal(b,a);this._getObjectsUnderPoint(e.x,e.y,c);return c};a.getObjectUnderPoint=function(b,a){var c=this.localToGlobal(b,a);return this._getObjectsUnderPoint(c.x,c.y)};a.clone=function(b){var a=new c;this.cloneProps(a);if(b)for(var h=a.children=[],e=0,d=this.children.length;e<d;e++){var f=this.children[e].clone(b);f.parent=a;h.push(f)}return a};a.toString=function(){return"[Container (name="+
this.name+")]"};a._tick=function(b){for(var a=this.children.length-1;a>=0;a--){var c=this.children[a];c._tick&&c._tick(b)}if(this.onTick)this.onTick(b)};a._getObjectsUnderPoint=function(b,a,h,e){var d=DisplayObject._hitTestContext,f=DisplayObject._hitTestCanvas,g=this._matrix,k=e&1&&(this.onPress||this.onClick||this.onDoubleClick)||e&2&&(this.onMouseOver||this.onMouseOut);if(this.cacheCanvas)if(this.getConcatenatedMatrix(g),d.setTransform(g.a,g.b,g.c,g.d,g.tx-b,g.ty-a),d.globalAlpha=g.alpha,this.draw(d),
this._testHit(d)){if(f.width=0,f.width=1,k)return this}else return null;for(var i=this.children.length-1;i>=0;i--){var l=this.children[i];if(l.isVisible()&&l.mouseEnabled)if(l instanceof c)if(k){if(l=l._getObjectsUnderPoint(b,a))return this}else{if(l=l._getObjectsUnderPoint(b,a,h,e),!h&&l)return l}else if(!e||k||e&1&&(l.onPress||l.onClick||l.onDoubleClick)||e&2&&(l.onMouseOver||l.onMouseOut))if(l.getConcatenatedMatrix(g),d.setTransform(g.a,g.b,g.c,g.d,g.tx-b,g.ty-a),d.globalAlpha=g.alpha,l.draw(d),
this._testHit(d))if(f.width=0,f.width=1,k)return this;else if(h)h.push(l);else return l}return null};j.Container=c})(window);(function(j){var c=function(b){this.initialize(b)},a=c.prototype=new Container;c._snapToPixelEnabled=false;a.autoClear=true;a.canvas=null;a.mouseX=null;a.mouseY=null;a.onMouseMove=null;a.onMouseUp=null;a.onMouseDown=null;a.snapToPixelEnabled=false;a.mouseInBounds=false;a.tickOnUpdate=true;a._activeMouseEvent=null;a._activeMouseTarget=null;a._mouseOverIntervalID=null;a._mouseOverX=0;a._mouseOverY=0;a._mouseOverTarget=null;a.Container_initialize=a.initialize;a.initialize=function(b){this.Container_initialize();
this.canvas=b instanceof HTMLCanvasElement?b:document.getElementById(b);this._enableMouseEvents(true)};a.update=function(b){if(this.canvas)this.autoClear&&this.clear(),c._snapToPixelEnabled=this.snapToPixelEnabled,this.tickOnUpdate&&this._tick(b),this.draw(this.canvas.getContext("2d"),false,this.getConcatenatedMatrix(this._matrix))};a.tick=a.update;a.clear=function(){if(this.canvas){var b=this.canvas.getContext("2d");b.setTransform(1,0,0,1,0,0);b.clearRect(0,0,this.canvas.width,this.canvas.height)}};
a.toDataURL=function(b,a){a||(a="image/png");var c=this.canvas.getContext("2d"),e=this.canvas.width,d=this.canvas.height,f;if(b){f=c.getImageData(0,0,e,d);var g=c.globalCompositeOperation;c.globalCompositeOperation="destination-over";c.fillStyle=b;c.fillRect(0,0,e,d)}var k=this.canvas.toDataURL(a);if(b)c.clearRect(0,0,e,d),c.putImageData(f,0,0),c.globalCompositeOperation=g;return k};a.enableMouseOver=function(b){if(this._mouseOverIntervalID)clearInterval(this._mouseOverIntervalID),this._mouseOverIntervalID=
null;if(b==null)b=20;else if(b<=0)return;var a=this;this._mouseOverIntervalID=setInterval(function(){a._testMouseOver()},1E3/Math.min(50,b));this._mouseOverX=NaN;this._mouseOverTarget=null};a.clone=function(){var b=new c(null);this.cloneProps(b);return b};a.toString=function(){return"[Stage (name="+this.name+")]"};a._enableMouseEvents=function(){var b=this,a=j.addEventListener?j:document;a.addEventListener("mouseup",function(a){b._handleMouseUp(a)},false);a.addEventListener("mousemove",function(a){b._handleMouseMove(a)},
false);a.addEventListener("dblclick",function(a){b._handleDoubleClick(a)},false);this.canvas&&this.canvas.addEventListener("mousedown",function(a){b._handleMouseDown(a)},false)};a._handleMouseMove=function(b){if(this.canvas){if(!b)b=j.event;var a=this.mouseInBounds;this._updateMousePosition(b.pageX,b.pageY);if(a||this.mouseInBounds){b=new MouseEvent("onMouseMove",this.mouseX,this.mouseY,this,b);if(this.onMouseMove)this.onMouseMove(b);if(this._activeMouseEvent&&this._activeMouseEvent.onMouseMove)this._activeMouseEvent.onMouseMove(b)}}else this.mouseX=
this.mouseY=null};a._updateMousePosition=function(b,a){var c=this.canvas;do b-=c.offsetLeft,a-=c.offsetTop;while(c=c.offsetParent);if(this.mouseInBounds=b>=0&&a>=0&&b<this.canvas.width&&a<this.canvas.height)this.mouseX=b,this.mouseY=a};a._handleMouseUp=function(b){var a=new MouseEvent("onMouseUp",this.mouseX,this.mouseY,this,b);if(this.onMouseUp)this.onMouseUp(a);if(this._activeMouseEvent&&this._activeMouseEvent.onMouseUp)this._activeMouseEvent.onMouseUp(a);if(this._activeMouseTarget&&this._activeMouseTarget.onClick&&
this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,true,this._mouseOverIntervalID?3:1)==this._activeMouseTarget)this._activeMouseTarget.onClick(new MouseEvent("onClick",this.mouseX,this.mouseY,this._activeMouseTarget,b));this._activeMouseEvent=this._activeMouseTarget=null};a._handleMouseDown=function(b){if(this.onMouseDown)this.onMouseDown(new MouseEvent("onMouseDown",this.mouseX,this.mouseY,this,b));var a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,this._mouseOverIntervalID?3:1);
if(a){if(a.onPress instanceof Function&&(b=new MouseEvent("onPress",this.mouseX,this.mouseY,a,b),a.onPress(b),b.onMouseMove||b.onMouseUp))this._activeMouseEvent=b;this._activeMouseTarget=a}};a._testMouseOver=function(){if(!(this.mouseX==this._mouseOverX&&this.mouseY==this._mouseOverY&&this.mouseInBounds)){var b=null;if(this.mouseInBounds)b=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,3),this._mouseOverX=this.mouseX,this._mouseOverY=this.mouseY;if(this._mouseOverTarget!=b){if(this._mouseOverTarget&&
this._mouseOverTarget.onMouseOut)this._mouseOverTarget.onMouseOut(new MouseEvent("onMouseOut",this.mouseX,this.mouseY,this._mouseOverTarget));if(b&&b.onMouseOver)b.onMouseOver(new MouseEvent("onMouseOver",this.mouseX,this.mouseY,b));this._mouseOverTarget=b}}};a._handleDoubleClick=function(b){if(this.onDoubleClick)this.onDoubleClick(new MouseEvent("onDoubleClick",this.mouseX,this.mouseY,this,b));var a=this._getObjectsUnderPoint(this.mouseX,this.mouseY,null,this._mouseOverIntervalID?3:1);if(a&&a.onDoubleClick instanceof
Function)a.onDoubleClick(new MouseEvent("onPress",this.mouseX,this.mouseY,a,b))};j.Stage=c})(window);(function(j){var c=function(b){this.initialize(b)},a=c.prototype=new DisplayObject;a.image=null;a.snapToPixel=true;a.sourceRect=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){this.DisplayObject_initialize();typeof b=="string"?(this.image=new Image,this.image.src=b):this.image=b};a.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.image&&(this.image.complete||this.image.getContext||this.image.readyState>=2)};a.DisplayObject_draw=a.draw;
a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return true;var c=this.sourceRect;c?b.drawImage(this.image,c.x,c.y,c.width,c.height,0,0,c.width,c.height):b.drawImage(this.image,0,0);return true};a.clone=function(){var b=new c(this.image);this.cloneProps(b);return b};a.toString=function(){return"[Bitmap (name="+this.name+")]"};j.Bitmap=c})(window);(function(j){var c=function(b){this.initialize(b)},a=c.prototype=new DisplayObject;a.onAnimationEnd=null;a.currentFrame=-1;a.currentAnimation=null;a.paused=true;a.spriteSheet=null;a.snapToPixel=true;a.offset=0;a.currentAnimationFrame=0;a._advanceCount=0;a._animation=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){this.DisplayObject_initialize();this.spriteSheet=b};a.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.spriteSheet.complete&&
this.currentFrame>=0};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return true;this._normalizeFrame();var c=this.spriteSheet.getFrame(this.currentFrame);if(c!=null){var e=c.rect;b.drawImage(c.image,e.x,e.y,e.width,e.height,-c.regX,-c.regY,e.width,e.height);return true}};a.play=function(){this.paused=false};a.stop=function(){this.paused=true};a.gotoAndPlay=function(b){this.paused=false;this._goto(b)};a.gotoAndStop=function(b){this.paused=true;this._goto(b)};a.advance=
function(){this._animation?this.currentAnimationFrame++:this.currentFrame++;this._normalizeFrame()};a.clone=function(){var b=new c(this.spriteSheet);this.cloneProps(b);return b};a.toString=function(){return"[BitmapAnimation (name="+this.name+")]"};a._tick=function(b){var a=this._animation?this._animation.frequency:1;!this.paused&&(++this._advanceCount+this.offset)%a==0&&this.advance();if(this.onTick)this.onTick(b)};a._normalizeFrame=function(){var b=this._animation;if(b)if(this.currentAnimationFrame>=
b.frames.length){if(b.next?this._goto(b.next):(this.paused=true,this.currentAnimationFrame=b.frames.length-1,this.currentFrame=b.frames[this.currentAnimationFrame]),this.onAnimationEnd)this.onAnimationEnd(this,b.name)}else this.currentFrame=b.frames[this.currentAnimationFrame];else if(this.currentFrame>=this.spriteSheet.getNumFrames()&&(this.currentFrame=0,this.onAnimationEnd))this.onAnimationEnd(this,null)};a.DisplayObject_cloneProps=a.cloneProps;a.cloneProps=function(b){this.DisplayObject_cloneProps(b);
b.onAnimationEnd=this.onAnimationEnd;b.currentFrame=this.currentFrame;b.currentAnimation=this.currentAnimation;b.paused=this.paused;b.offset=this.offset;b._animation=this._animation;b.currentAnimationFrame=this.currentAnimationFrame};a._goto=function(b){if(isNaN(b)){var a=this.spriteSheet.getAnimation(b);if(a)this.currentAnimationFrame=0,this._animation=a,this.currentAnimation=b,this._normalizeFrame()}else this.currentAnimation=this._animation=null,this.currentFrame=b};j.BitmapAnimation=c})(window);(function(j){var c=function(b){this.initialize(b)},a=c.prototype=new DisplayObject;a.graphics=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){this.DisplayObject_initialize();this.graphics=b?b:new Graphics};a.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0&&this.graphics};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return true;this.graphics.draw(b);return true};a.clone=function(b){b=new c(b&&this.graphics?
this.graphics.clone():this.graphics);this.cloneProps(b);return b};a.toString=function(){return"[Shape (name="+this.name+")]"};j.Shape=c})(window);(function(j){var c=function(b,a,c){this.initialize(b,a,c)},a=c.prototype=new DisplayObject;c._workingContext=document.createElement("canvas").getContext("2d");a.text="";a.font=null;a.color=null;a.textAlign=null;a.textBaseline=null;a.maxWidth=null;a.outline=false;a.lineHeight=null;a.lineWidth=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b,a,c){this.DisplayObject_initialize();this.text=b;this.font=a;this.color=c?c:"#000"};a.isVisible=function(){return Boolean(this.visible&&this.alpha>
0&&this.scaleX!=0&&this.scaleY!=0&&this.text!=null&&this.text!="")};a.DisplayObject_draw=a.draw;a.draw=function(b,a){if(this.DisplayObject_draw(b,a))return true;this.outline?b.strokeStyle=this.color:b.fillStyle=this.color;b.font=this.font;b.textAlign=this.textAlign?this.textAlign:"start";b.textBaseline=this.textBaseline?this.textBaseline:"alphabetic";for(var c=String(this.text).split(/(?:\r\n|\r|\n)/),e=this.lineHeight==null?this.getMeasuredLineHeight():this.lineHeight,d=0,f=0,g=c.length;f<g;f++){var k=
b.measureText(c[f]).width;if(this.lineWidth==null||k<this.lineWidth)this._drawTextLine(b,c[f],d);else{for(var k=c[f].split(/(\s)/),i=k[0],l=1,j=k.length;l<j;l+=2)b.measureText(i+k[l]+k[l+1]).width>this.lineWidth?(this._drawTextLine(b,i,d),d+=e,i=k[l+1]):i+=k[l]+k[l+1];this._drawTextLine(b,i,d)}d+=e}return true};a.getMeasuredWidth=function(){return this._getWorkingContext().measureText(this.text).width};a.getMeasuredLineHeight=function(){return this._getWorkingContext().measureText("M").width*1.2};
a.clone=function(){var b=new c(this.text,this.font,this.color);this.cloneProps(b);return b};a.toString=function(){return"[Text (text="+(this.text.length>20?this.text.substr(0,17)+"...":this.text)+")]"};a.DisplayObject_cloneProps=a.cloneProps;a.cloneProps=function(b){this.DisplayObject_cloneProps(b);b.textAlign=this.textAlign;b.textBaseline=this.textBaseline;b.maxWidth=this.maxWidth;b.outline=this.outline;b.lineHeight=this.lineHeight;b.lineWidth=this.lineWidth};a._getWorkingContext=function(){var b=
c._workingContext;b.font=this.font;b.textAlign=this.textAlign?this.textAlign:"start";b.textBaseline=this.textBaseline?this.textBaseline:"alphabetic";return b};a._drawTextLine=function(b,a,c){this.outline?b.strokeText(a,0,c,this.maxWidth):b.fillText(a,0,c,this.maxWidth||65535)};j.Text=c})(window);(function(j){var c=function(){throw"SpriteSheetUtils cannot be instantiated";};c._workingCanvas=document.createElement("canvas");c._workingContext=c._workingCanvas.getContext("2d");c.addFlippedFrames=function(a,b,j,h){if(b||j||h){var e=0;b&&c._flip(a,++e,true,false);j&&c._flip(a,++e,false,true);h&&c._flip(a,++e,true,true)}};c.extractFrame=function(a,b){isNaN(b)&&(b=a.getAnimation(b).frames[0]);var j=a.getFrame(b);if(!j)return null;var h=j.rect,e=c._workingCanvas;e.width=h.width;e.height=h.height;
c._workingContext.drawImage(j.image,h.x,h.y,h.width,h.height,0,0,h.width,h.height);j=new Image;j.src=e.toDataURL("image/png");return j};c._flip=function(a,b,j,h){for(var e=a._images,d=c._workingCanvas,f=c._workingContext,g=e.length/b,k=0;k<g;k++){var i=e[k];i.__tmp=k;d.width=i.width;d.height=i.height;f.setTransform(j?-1:1,0,0,h?-1:1,j?i.width:0,h?i.height:0);f.drawImage(i,0,0);var l=new Image;l.src=d.toDataURL("image/png");l.width=i.width;l.height=i.height;e.push(l)}f=a._frames;d=f.length/b;for(k=
0;k<d;k++){var i=f[k],o=i.rect.clone(),l=e[i.image.__tmp+g*b],m={image:l,rect:o,regX:i.regX,regY:i.regY};if(j)o.x=l.width-o.x-o.width,m.regX=o.width-i.regX;if(h)o.y=l.height-o.y-o.height,m.regY=o.height-i.regY;f.push(m)}j="_"+(j?"h":"")+(h?"v":"");h=a._animations;a=a._data;e=h.length/b;for(k=0;k<e;k++){f=h[k];i=a[f];g={name:f+j,frequency:i.frequency,next:i.next,frames:[]};i.next&&(g.next+=j);f=i.frames;i=0;for(l=f.length;i<l;i++)g.frames.push(f[i]+d*b);a[g.name]=g;h.push(g.name)}};j.SpriteSheetUtils=
c})(window);(function(j){var c=function(b){this.initialize(b)},a=c.prototype=new DisplayObject;a.htmlElement=null;a._style=null;a.DisplayObject_initialize=a.initialize;a.initialize=function(b){typeof b=="string"&&(b=document.getElementById(b));this.DisplayObject_initialize();this.mouseEnabled=false;if(this.htmlElement=b)this._style=b.style,this._style.position="absolute",this._style.transformOrigin=this._style.webkitTransformOrigin=this._style.msTransformOrigin=this._style.MozTransformOrigin="0% 0%"};a.isVisible=
function(){return this.htmlElement!=null};a.draw=function(){if(this.htmlElement!=null){var b=this._matrix,a=this.htmlElement;a.style.opacity=""+b.alpha;a.style.visibility=this.visible?"visible":"hidden";a.style.transform=a.style.webkitTransform=a.style.oTransform=a.style.msTransform=["matrix("+b.a,b.b,b.c,b.d,b.tx,b.ty+")"].join(",");a.style.MozTransform=["matrix("+b.a,b.b,b.c,b.d,b.tx+"px",b.ty+"px)"].join(",");return true}};a.cache=function(){};a.uncache=function(){};a.updateCache=function(){};
a.hitTest=function(){};a.localToGlobal=function(){};a.globalToLocal=function(){};a.localToLocal=function(){};a.clone=function(){var a=new c;this.cloneProps(a);return a};a.toString=function(){return"[DOMElement (name="+this.name+")]"};a._tick=function(a){if(this.htmlElement!=null&&(this.htmlElement.style.visibility="hidden",this.onTick))this.onTick(a)};j.DOMElement=c})(window);(function(j){var c=function(){this.initialize()},a=c.prototype;a.initialize=function(){};a.getBounds=function(){return new Rectangle(0,0,0,0)};a.applyFilter=function(){};a.toString=function(){return"[Filter]"};a.clone=function(){return new c};j.Filter=c})(window);(function(j){var c=function(){throw"Touch cannot be instantiated";};c.isSupported=function(){return"ontouchstart"in j};c.enable=function(a){if(a!=null&&c.isSupported())a._primaryTouchId=-1,a._handleTouchMoveListener=null,a.canvas.addEventListener("touchstart",function(b){c._handleTouchStart(a,b)},false),document.addEventListener("touchend",function(b){c._handleTouchEnd(a,b)},false)};c._handleTouchStart=function(a,b){b.preventDefault();if(a._primaryTouchId==-1){a._handleTouchMoveListener=a._handleTouchMoveListener||
function(b){c._handleTouchMove(a,b)};document.addEventListener("touchmove",a._handleTouchMoveListener,false);var j=b.changedTouches[0];a._primaryTouchId=j.identifier;a._updateMousePosition(j.pageX,j.pageY);a._handleMouseDown(j)}};c._handleTouchMove=function(a,b){var j=c._findPrimaryTouch(a,b.changedTouches);j&&a._handleMouseMove(j)};c._handleTouchEnd=function(a,b){var j=c._findPrimaryTouch(a,b.changedTouches);if(j)a._primaryTouchId=-1,a._handleMouseUp(j),document.removeEventListener("touchmove",a._handleTouchMoveListener),
a._handleTouchMoveListener=null};c._findPrimaryTouch=function(a,b){for(var c=b.length,h=0;h<c;h++){var e=b[h];if(e.identifier==a._primaryTouchId)return e}return null};j.Touch=c})(window);
/*
* TweenJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
(function(k){var b=function(g,a){this.initialize(g,a)},a=b.prototype;b.NONE=0;b.LOOP=1;b.REVERSE=2;b.IGNORE={};b._tweens=[];b._plugins={};b.get=function(g,a,c){return new b(g,a,c)};b.tick=function(g,a){for(var c=b._tweens,e=c.length-1;e>=0;e--){var d=c[e];if(!a||d.ignoreGlobalPause)d.tick(d._useTicks?1:g)}};Ticker&&Ticker.addListener(b,false);b.removeTweens=function(g){if(g.tweenjs_count){for(var a=b._tweens,c=a.length-1;c>=0;c--)a[c]._target==g&&a.splice(c,1);g.tweenjs_count=0}};b.installPlugin=
function(g,a){var c=g.priority;if(c==null)g.priority=c=0;for(var e=0,d=a.length,f=b._plugins;e<d;e++){var i=a[e];if(f[i]){for(var l=f[i],j=0,k=l.length;j<k;j++)if(c<l[j].priority)break;f[i].splice(j,0,g)}else f[i]=[g]}};b._register=function(g,a){var c=g._target;if(a){if(c)c.tweenjs_count=c.tweenjs_count?c.tweenjs_count+1:1;b._tweens.push(g)}else c&&c.tweenjs_count--,c=b._tweens.indexOf(g),c!=-1&&b._tweens.splice(c,1)};a.ignoreGlobalPause=false;a.loop=false;a.duration=0;a.pluginData=null;a._paused=
false;a._curQueueProps=null;a._initQueueProps=null;a._steps=null;a._actions=null;a._prevPosition=0;a._stepPosition=0;a._prevPos=-1;a._target=null;a._useTicks=false;a.initialize=function(g,a,c){this._target=g;if(a)this._useTicks=a.useTicks,this.ignoreGlobalPause=a.ignoreGlobalPause,this.loop=a.loop,a.override&&b.removeTweens(g);this.pluginData=c||{};this._curQueueProps={};this._initQueueProps={};this._steps=[];this._actions=[];a&&a.paused?this._paused=true:b._register(this,true);a&&a.position!=null&&
this.setPosition(a.position,b.NONE)};a.wait=function(g){if(g==null||g<=0)return this;var a=this._cloneProps(this._curQueueProps);return this._addStep({d:g,p0:a,e:this._linearEase,p1:a})};a.to=function(a,b,c){if(isNaN(b)||b<0)b=0;return this._addStep({d:b||0,p0:this._cloneProps(this._curQueueProps),e:c,p1:this._cloneProps(this._appendQueueProps(a))})};a.call=function(a,b,c){return this._addAction({f:a,p:b?b:[this],o:c?c:this._target})};a.set=function(a,b){return this._addAction({f:this._set,o:this,
p:[a,b?b:this._target]})};a.play=function(a){return this.call(a.setPaused,[false],a)};a.pause=function(a){a||(a=this);return this.call(a.setPaused,[true],a)};a.setPosition=function(a,b){a<0&&(a=0);b==null&&(b=1);var c=a,e=false;if(c>=this.duration)this.loop?c%=this.duration:(c=this.duration,e=true);if(c==this._prevPos)return e;if(this._target)if(e)this._updateTargetProps(null,1);else if(this._steps.length>0){for(var d=0,f=this._steps.length;d<f;d++)if(this._steps[d].t>c)break;d=this._steps[d-1];this._updateTargetProps(d,
(this._stepPosition=c-d.t)/d.d,c)}d=this._prevPos;this._prevPos=c;this._prevPosition=a;b!=0&&this._actions.length>0&&(this._useTicks?this._runActions(c,c):b==1&&c<d?(d!=this.duration&&this._runActions(d,this.duration),this._runActions(0,c,true)):this._runActions(d,c));e&&this.setPaused(true);return e};a.tick=function(a){this._paused||this.setPosition(this._prevPosition+a)};a.setPaused=function(a){if(this._paused!=!!a)this._paused=!!a,b._register(this,!a);return this};a.w=a.wait;a.t=a.to;a.c=a.call;
a.s=a.set;a.toString=function(){return"[Tween]"};a.clone=function(){throw"Tween can not be cloned.";};a._updateTargetProps=function(a,h,c){var e,d,f,i;!a&&h==1?e=d=this._curQueueProps:(a.e&&(h=a.e(h,0,1,1)),e=a.p0,d=a.p1);for(n in this._initQueueProps){if((f=e[n])==null)e[n]=f=this._initQueueProps[n];if((i=d[n])==null)d[n]=i=f;f=f==i||h==0||h==1||typeof f!="number"?h==1?i:f:f+(i-f)*h;var l=false;if(i=b._plugins[n])for(var j=0,k=i.length;j<k;j++){var m=i[j].tween(this,n,f,e,d,h,c,!a);m==b.IGNORE?l=
true:f=m}l||(this._target[n]=f)}};a._runActions=function(a,b,c){var e=a,d=b,f=-1,i=this._actions.length,k=1;a>b&&(e=b,d=a,f=i,i=k=-1);for(;(f+=k)!=i;){var b=this._actions[f],j=b.t;(j==d||j>e&&j<d||c&&j==a)&&b.f.apply(b.o,b.p)}};a._appendQueueProps=function(a){var h,c,e,d;for(d in a){if(this._initQueueProps[d]==null){c=this._target[d];if(h=b._plugins[d])for(var f=0,i=h.length;f<i;f++)e=h[f].init(this,d,c),e!=b.IGNORE&&(c=e);this._initQueueProps[d]=c}this._curQueueProps[d]=a[d]}return this._curQueueProps};
a._cloneProps=function(a){var b={},c;for(c in a)b[c]=a[c];return b};a._addStep=function(a){if(a.d>0)this._steps.push(a),a.t=this.duration,this.duration+=a.d;return this};a._addAction=function(a){a.t=this.duration;this._actions.push(a);return this};a._set=function(a,b){for(var c in a)b[c]=a[c]};k.Tween=b})(window);(function(k){var b=function(a,b,c){this.initialize(a,b,c)},a=b.prototype;a.ignoreGlobalPause=false;a.duration=0;a.loop=false;a._paused=true;a._tweens=null;a._labels=null;a._prevPosition=0;a._prevPos=-1;a._useTicks=false;a.initialize=function(a,b,c){this._tweens=[];if(c)this._useTicks=c.useTicks,this.loop=c.loop,this.ignoreGlobalPause=c.ignoreGlobalPause;a&&this.addTween.apply(this,a);this.setLabels(b);(!c||!c.paused)&&Tween._register(this,true);c&&c.position!=null&&this.setPosition(c.position,Tween.NONE)};
a.addTween=function(a){var b=arguments.length;if(b>1){for(var c=0;c<b;c++)this.addTween(arguments[c]);return arguments[0]}else if(b==0)return null;this.removeTween(a);this._tweens.push(a);a.setPaused(true);a._paused=false;a._useTicks=this._useTicks;if(a.duration>this.duration)this.duration=a.duration;this._prevPos>=0&&a.setPosition(this._prevPos,Tween.NONE);return a};a.removeTween=function(a){var b=arguments.length;if(b>1){for(var c=true,e=0;e<b;e++)c=c&&this.removeTween(arguments[e]);return c}else if(b==
0)return false;b=this._tweens.indexOf(a);return b!=-1?(this._tweens.splice(b,1),a.duration>=this.duration&&this.updateDuration(),true):false};a.addLabel=function(a,b){this._labels[a]=b};a.setLabels=function(a){this._labels=a?a:{}};a.gotoAndPlay=function(a){this.setPaused(false);this._goto(a)};a.gotoAndStop=function(a){this.setPaused(true);this._goto(a)};a.setPosition=function(a,b){a<0&&(a=0);var c=this.loop?a%this.duration:a,e=!this.loop&&a>=this.duration;if(c==this._prevPos)return e;this._prevPosition=
a;this._prevPos=c;for(var d=0,f=this._tweens.length;d<f;d++)if(this._tweens[d].setPosition(c,b),c!=this._prevPos)return false;e&&this.setPaused(true);return e};a.setPaused=function(a){if(this._paused!=!!a)this._paused=!!a,Tween._register(this,!a)};a.updateDuration=function(){for(var a=this.duration=0,b=this._tweens.length;a<b;a++)if(tween=this._tweens[a],tween.duration>this.duration)this.duration=tween.duration};a.tick=function(a){this.setPosition(this._prevPosition+a)};a.resolve=function(a){var b=
parseFloat(a);isNaN(b)&&(b=this._labels[a]);return b};a.toString=function(){return"[Timeline]"};a.clone=function(){throw"Timeline can not be cloned.";};a._goto=function(a){a=this.resolve(a);a!=null&&this.setPosition(a)};k.Timeline=b})(window);(function(k){var b=function(){throw"Ease cannot be instantiated.";};b.linear=function(a){return a};b.none=b.linear;b.get=function(a){a<-1&&(a=-1);a>1&&(a=1);return function(b){return a==0?b:a<0?b*(b*-a+1+a):b*((2-b)*a+(1-a))}};b.getPowIn=function(a){return function(b){return Math.pow(b,a)}};b.getPowOut=function(a){return function(b){return 1-Math.pow(1-b,a)}};b.getPowInOut=function(a){return function(b){return(b*=2)<1?0.5*Math.pow(b,a):1-0.5*Math.abs(Math.pow(2-b,a))}};b.quadIn=b.getPowIn(2);b.quadOut=
b.getPowOut(2);b.quadInOut=b.getPowInOut(2);b.cubicIn=b.getPowIn(3);b.cubicOut=b.getPowOut(3);b.cubicInOut=b.getPowInOut(3);b.quartIn=b.getPowIn(4);b.quartOut=b.getPowOut(4);b.quartInOut=b.getPowInOut(4);b.quintIn=b.getPowIn(5);b.quintOut=b.getPowOut(5);b.quintInOut=b.getPowInOut(5);b.sineIn=function(a){return 1-Math.cos(a*Math.PI/2)};b.sineOut=function(a){return Math.sin(a*Math.PI/2)};b.sineInOut=function(a){return-0.5*(Math.cos(Math.PI*a)-1)};b.getBackIn=function(a){return function(b){return b*
b*((a+1)*b-a)}};b.backIn=b.getBackIn(1.7);b.getBackOut=function(a){return function(b){return--b*b*((a+1)*b+a)+1}};b.backOut=b.getBackOut(1.7);b.getBackInOut=function(a){a*=1.525;return function(b){return(b*=2)<1?0.5*b*b*((a+1)*b-a):0.5*((b-=2)*b*((a+1)*b+a)+2)}};b.backInOut=b.getBackInOut(1.7);b.circIn=function(a){return-(Math.sqrt(1-a*a)-1)};b.circOut=function(a){return Math.sqrt(1- --a*a)};b.circInOut=function(a){return(a*=2)<1?-0.5*(Math.sqrt(1-a*a)-1):0.5*(Math.sqrt(1-(a-=2)*a)+1)};b.bounceIn=
function(a){return 1-b.bounceOut(1-a)};b.bounceOut=function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375};b.bounceInOut=function(a){return a<0.5?b.bounceIn(a*2)*0.5:b.bounceOut(a*2-1)*0.5+0.5};b.getElasticIn=function(a,b){var h=Math.PI*2;return function(c){if(c==0||c==1)return c;var e=b/h*Math.asin(1/a);return-(a*Math.pow(2,10*(c-=1))*Math.sin((c-e)*h/b))}};b.elasticIn=b.getElasticIn(1,0.3);b.getElasticOut=
function(a,b){var h=Math.PI*2;return function(c){if(c==0||c==1)return c;var e=b/h*Math.asin(1/a);return a*Math.pow(2,-10*c)*Math.sin((c-e)*h/b)+1}};b.elasticOut=b.getElasticOut(1,0.3);b.getElasticInOut=function(a,b){var h=Math.PI*2;return function(c){var e=b/h*Math.asin(1/a);return(c*=2)<1?-0.5*a*Math.pow(2,10*(c-=1))*Math.sin((c-e)*h/b):a*Math.pow(2,-10*(c-=1))*Math.sin((c-e)*h/b)*0.5+1}};b.elasticInOut=b.getElasticInOut(1,0.3*1.5);k.Ease=b})(window);
window.makeCasterConnection = function(isDev, sessionName) {
    var sessionId = sessionName || "uefa.euro-gp10",
        snapshotId = Gamecast.snapshotId || 0,
        pollDuration = 10000,
        containerName = "casterListener",
        flashString = "http://assets.espn.go.com/swf/caster/snapshotCasterClientv2.swf",
        baseURL = "soccernet.espn.go.com/caster/gamecast/snapshot",
        casterHost = "site.caster.espn.go.com",
        casterPort = 80,
        devFauxCasterDomain = "",
        isDev = isDev || 0,
        flashVersion = swfobject.getFlashPlayerVersion(),
        casterObj,
        casterInterval,
        snapshotURL,
        firstUpdate;
    if (isDev) {
        baseURL = "proxy.espn.go.com/sports/caster/snapshot";
        casterHost = "vldchadoop02.corp.espn3.com";
        casterPort = 2223;
        devFauxCasterDomain = "/soccernet";
    }
    if (flashVersion !== undefined && flashVersion.major !== undefined && flashVersion.major >= 8) {
        casterObj = new flashObj();
        casterObj.flashFile = flashString;
        casterObj.flashVars = "&sessionName=" + sessionId + "&duration=" + pollDuration + "&pollMode=absolute&baseURL=" + baseURL + "&host=" + casterHost + "&port=" + casterPort + "&SnapshotId=" + snapshotId;
        casterObj.wmode = "window";
        casterObj.width = "1";
        casterObj.height = "1";
        casterObj.quality = "best";
        casterObj.FlashVer = 8;
        casterObj.DenyIEdl = "TRUE";
        casterObj.cabVersion = "8,0,0,0";
        casterObj.useDOM = true;
        casterObj.targetElement = containerName;
        $(casterObj.render(true));
    } else {
        $(fauxCast());
    }
    casterInterval;

    function fauxCast() {
        snapshotURL = devFauxCasterDomain + "/caster/gamecast/json?sessionId=" + sessionId + "&masterSnap=" + snapshotId + "&rand=" + new Date()
            .getTime();
        $.ajax({
            type: "GET",
            url: snapshotURL,
            dataType: "json",
            success: function(data) {
                if (data !== undefined && data.snapshotId !== undefined) {
                    handleCasterMessage(data.snapshotId, data.snapshots);
                    snapshotId = data.snapshotId;
                }
                casterInterval = setTimeout(fauxCast, pollDuration);
            },
            error: function() {
                casterInterval = setTimeout(fauxCast, pollDuration);
            }
        });
    }
    var prevGameId = "0";
};

var editionMap = new Object();
editionMap['Global'] = 0;
editionMap['uk'] = 0;
editionMap['es'] = 1;
editionMap['us'] = 6;

function setGameData(nodeName, attribute, value) {

    //header gets updated everywhere, rest of the data only on match page

    var listArray = nodeName.split('-')

    if (listArray.length == 2) {
        if (activeGameId == listArray[1]) {

            switch (attribute) {
            case "0":
                //updateMatchElement(activeGameId + 'headerScore', value)
                break
            case "1":
                updateMatchElement('home-shots', value);
                break
            case "2":
                updateMatchElement('away-shots', value);
                break
            case "3":
                updateMatchElement('home-fouls', value);
                break
            case "4":
                updateMatchElement('away-fouls', value);
                break
            case "5":
                updateMatchElement('home-corner-kicks', value);
                break
            case "6":
                updateMatchElement('away-corner-kicks', value);
                break
            case "7":
                updateMatchElement('home-offsides', value);
                break
            case "8":
                updateMatchElement('away-offsides', value);
                break
            case "9":
                updateMatchElement('home-possession', value);
                break
            case "10":
                updateMatchElement('away-possession', value);
                break
            case "11":
                updateMatchElement('home-yellow-cards', value);
                break
            case "12":
                updateMatchElement('away-yellow-cards', value);
                break
            case "13":
                updateMatchElement('home-red-cards', value);
                break
            case "14":
                updateMatchElement('away-red-cards', value);
                break
            case "15":
                updateMatchElement('home-saves', value);
                break
            case "16":
                updateMatchElement('away-saves', value);
                break
            case "17":
                //updateTimeDisplay(activeGameId, value)
                break
            case "18":
                //updateStatusTextTab(activeGameId, value, 'EN')
                break
            case "19":
                //updateStatusTextTab(activeGameId, value, 'ES')
                break
            case "20":
                //updateStatusTextTab(activeGameId, value, 'US')
                break
                //case "21":
                //updateStatusTextTab(activeGameId, value, 'DE')
                //break
                //case "22":
                //updateStatusTextTab(activeGameId, value, 'IT')
                //break
            case "21":
                //updateGameNote(value, 'EN')
                //updateGameNote(value, 'US') //use the same value for en/us
                break
            case "22":
                //updateGameNote(value, 'ES')
                break

            case "23":
                updateMatchElement('home-tackles', value);
                break
            case "24":
                updateMatchElement('away-tackles', value);
                break

            default:
                break
            }
        }
    }

}

window.updateData = function(node, attribute, value) {

    // ONLY EXECUTE EVENTS FOR THIS GAME
    if (node.indexOf("-" + activeGameId) != -1) {

        // MATCH STATS
        if (node.indexOf("GC-") != -1) {
            setGameData(node, attribute + "", value);

            // GOALS
        } else if (node.indexOf('s-' + activeGameId + '-add') != -1) {
            setGoalScorer(value);

            // RED AND YELLOW CARDS
        } else if (node.indexOf('t-' + activeGameId + '-add') != -1) {
            setEvent(value);

            // CIL COMMENTARY
        } else if (node.indexOf('COMMENT-CIL-' + activeGameId + '-' + editionMap[Gamecast.edition]) != -1) {
            setCoverItLiveComment(node, value);


            // LIVE COMMENTARY GLOBAL
            //}else if (node.indexOf('COMMENT-'+ activeGameId + '-' + editionMap[Gamecast.edition]) != -1) {
        } else if (node.indexOf('COMMENT-' + activeGameId + '-0') != -1) {
            setCommentaryComment(node, value);

            // LIVE COMMENTARY US
        } else if (node.indexOf('COMMENT-' + activeGameId + '-6') != -1) {
            //setCommentaryComment(node, value);

        } else if (node.indexOf("gameInfo-" + activeGameId) != -1) {
            createGameInfoObj(node, value);

        }

    }
};

var debugCaster = false;

window.handleCasterMessage = function(message, updateObj) {
    //Testing
    for (var k = 0, len = updateObj.length; k < len; k++) {

        var update = updateObj[k]['objId'].split('-');

        if(update[0] === 'OOT'){            
            espn.oot.consume_update(updateObj[k]);
        }

        if (update[0] == 't') {
            Gamecast.Caster.addEventToTimeline(updateObj[k]['objId'], updateObj[k][0]);
        }

        if (update[0] == 's') {
            Gamecast.Caster.updateEvents(updateObj[k]['objId'], updateObj[k][0]);
        }
    }
    //testing 
    for (var k = 0, len = updateObj.length; k < len; k++) {

        var update = updateObj[k]['objId'].split('-');

        if (update[1] == "lineup") {
            Gamecast.Caster.updateAttacks(updateObj[k]["objId"], updateObj[k][0]);
        }
    }

    for (var i = 0, max = updateObj.length; i < max; i++) {

        // ONLY EXECUTE EVENTS FOR THIS GAME
        if (updateObj[i]["objId"].indexOf("-" + activeGameId) != -1) {

            var update = updateObj[i]["objId"].split("-");
            // if (update[0] == "t") {
            // Gamecast.Caster.addEventToTimeline(updateObj[i]["objId"], updateObj[i][0]);
            // }
            // if (update[0] == "s") {
            // Gamecast.Caster.updateEvents(updateObj[i]["objId"], updateObj[i][0]);
            // }
            if (update[1] == "lineup") {
                //Gamecast.Caster.updateAttacks(updateObj[i]["objId"], updateObj[i][0]);
                lineupObject(updateObj[i]["objId"], updateObj[i][0]);
            }
            if (update[0] == "OOT" && updateObj[i]) {
                Gamecast.Caster.updateMarker(updateObj[i]["objId"], updateObj[i]);
            }
            if (update[0] == "gameInfo" && updateObj[i]) {
                Gamecast.Caster.updateTimelinePos(updateObj[i]["objId"], updateObj[i][0]);
            }
        }
    }
    if (message != "connectionStatus" && message != "system") {

        for (var i in updateObj) {
            for (var j in updateObj[i]) {
                if (j != "objId") {
                    if (updateObj[i]["objId"] != null && j != null && updateObj[i][j] != null) {
                        if (debugCaster) {
                            console.log("Message: " + message + "node: " + updateObj[i]['objId'] + ", attribute: " + j + ", value: " + updateObj[i][j]);
                        }
                        updateData(updateObj[i]["objId"], j, updateObj[i][j]);
                    }
                }
            }
        }
    }
};(function(){
	/* 
	*
	*	Soccernet Gamecast
	*	@version 1.0
	*	@author Nihar Kabinittal, nihar.kabinittal@espn.com
	*
	*/
	"use strict";
	/*
	*	@constructor
	*/
	function Gamecast(options){

		// confirm if the function is called as a constructor
		if( !(this instanceof Gamecast) ){
			return new Gamecast(options);
		}

		var modules = options.modules || '*',
		callback = options.callback,
		module,
		i,
		len,
		sport = options.sport,
		lang = options.language || 'en';

		this.config = options.config || Gamecast.config;

		// Add modules to the core
		if( !modules || (modules && modules.length == 0) || modules == '*' ){
			modules = [];	
			for(i in Gamecast.Modules[sport]){
				if(Gamecast.Modules[sport].hasOwnProperty(i)){
					modules.push(i);
				}
			}
		}

		//Initialize required modules
		for( i = 0, len = modules.length; i < len; i++ ){
			module = modules[i];
			Gamecast.Modules[sport][module](this);
		}
		
		this['sport'] = sport;
		
		this['language'] = lang;

		if( typeof callback == 'function' ){
			callback(this);
		}

	}

	Gamecast.Modules = {};
	
	Gamecast.Modules.Soccer = {};
	
	var daddyUrl = '/assets/img/gamecast/';
	
	if( window.location.href.indexOf('http://www.espnfc.com') != -1 || window.location.href.indexOf('http://espnfc.com') != -1 ){
		var daddyUrl = '/i/gamecast/';
	}
	
	//localdev
	if( window.location.href.indexOf('http://gc.espn.go.com') != -1 ){
		var daddyUrl = './images/';
	}

	Gamecast.Modules.Soccer.Watch = function(game){
		function init(){
			
			return false;
			
			var config = game.config && game.config.Watch || {},
			url = config.url;
			
			fetch(url,function(data){
				
				updateMatchData(data);
				updateTimelineData(data);
				
				var justShots = function(play){ if( play.shootout == 'f'){ return true; } };
				var filtered = {};
				filtered.set = Gamecast.Field.filterSection(Gamecast._match.set,justShots)
				filtered.home = Gamecast._match.home;
				filtered.away = Gamecast._match.away;
				
				//Update Views
				Gamecast.Field.renderViewport(filtered);
				Gamecast.Timeline.renderEvents();
				
			},config.xdomain)
		}
		
		function updateTimelineData(data){
			var events = Gamecast && Gamecast._timelineData && Gamecast._timelineData.events,
			ev,
			hasPlay;
			
			for( var i=0, len = events.length; i < len; i++ ){
				ev = events[i];
				hasPlay = playHasVideo(data,ev.id);
				if(hasPlay){
					//TODO: update if Id has video;
					ev.watch = hasPlay;
				}
			}
		}
		
		function updateMatchData(data){
			var sets = Gamecast._match.set,
			set,
			hasPlay;
			for( var i=0, len = sets.length; i < len; i++ ){
				set = sets[i];
				hasPlay = playHasVideo(data,set.id);
				if(hasPlay){
					//TODO: update if Id has video;
					set.watch = hasPlay;
				}
			}
		}
		
		function playHasVideo(plays,videoId){
			var play;
			
			for( var i=0, len = plays.length; i < len; i++ ){
				play = plays[i];
				//TODO to change from not eq to eq
				if( parseInt(play.id) == parseInt(videoId)){
					return play;
				}
			}
			return false;
		}
		
		function fetch(url,callback,xdomain){
			game.get(url,function(data){
				if(xdomain){
					// data = data.firstChild || data;
				}
				buildDataSet(data,callback);
			},xdomain)
		}
		
		function buildDataSet(data,callback){
			var markers = $('marker',data);
			
			var watchData = [];
			
			for( var i=0, len = markers.length; i < len; i++ ){
				var marker = markers[i];
				marker = $(marker);
				var id = marker.attr('id');
				var playId = marker.attr("playId");
				var color = marker.attr("color");
				var playText = $('>playText',marker).text();
				var thumbnailURL = $('>thumbnailURL',marker).text();
				
				var temp = {
					id : id,
					playId : playId,
					color : color,
					playText : playText,
					thumbnailURL : thumbnailURL
				};
				
				var playbackScenarios = $('playbackScenario',marker);
				var playback = [];
				
				for( var j=0, length = playbackScenarios.length; j < length; j ++){
					var playbackScenario = playbackScenarios[j];
					playbackScenario = $(playbackScenario)
					var id  = playbackScenario.attr('id');
					var name = playbackScenario.attr('name');
					var url = playbackScenario.attr('url');
					playback.push( { id : id, name : name, url : url } )
				}
				
				temp.playbackScenarios = playback;
				watchData.push(temp);
			}
			
			if(typeof callback == 'function'){
				callback(watchData);
			}
		}
		
		/*
		*	APIs
		*/
		
		game.Watch = {
			init : init
		}
	}
	
	Gamecast.Modules.Soccer.Field = function(game){
		
		var baseConfig = {
			wrapper : 'soccerGameCast',
			canvas : 'gcField',
			width : 585,
			height : 374,
			leftGutter : 34, 
			topMargin : 19,
			url : "./data/gamecast_2.xml",
			logoUrl : 'http://soccernet-akamai.espn.go.com/design05/i/clubhouse/badges/',
			logo:{
				path : daddyUrl + 'espn-logo.png',
				width : 171,
				height : 43,
				opacity : 0.15 
			},
			fieldImage : daddyUrl + 'field.jpg',
			player : {
				colors : {
					shadow : '#434343',
					fill : 'transparent',
					number : '#fff'
				}
			},
			ball : {
				colors : {
					color : '#333',
					stroke : '#fff'
				}
			},
			fonts : {
				jersey : '11px Arial'
			},
			colors : {
				heatMap : {
					start : 'FFFF11',
					end : 'CC1100'
				},
				penalties : {
					noshot : "#fff"
				}
			},
			images : {
				ball : daddyUrl + 'ball.png',
				ballMiss : daddyUrl + 'ball_miss.png',
				ballIcon : daddyUrl + 'ball_ico.png'
			},
			goalsRadius : 8,
			shotsRadius : 7,
			playerRadius : 7,
			fauxRadius : 5,
			ballRadius : 6,
			roundLabelWidth : 19,
			roundLabelHeight : 19,
			roundLabelRadius : 1,
			classNames : {
				popup : 'viewportPopup',
				fieldClone : 'fieldClone',
				ball_front : 'ball_front',
				perspective_container : 'goalAnimation',
				anim_2 : 'anim-2',
				anim_1 : 'anim-1'
			}
		},
		_stage,
		_match,
		_container,
		overlayIsSet = false,
		lastVideoPlayed;
		
		Gamecast._isPlaying = false;
		Gamecast._queue = [];
		Gamecast._playedAnim = {};
		
		function init(callback){
			var canvas = baseConfig.canvas,
			config = game.config && game.config.Field || {},
			stage,
			background,
			container,
			field,
			logo = config.logo.path || baseConfig.logo.path,
			enableLogo = config.enableLogo || false,
			logoWidth = config.logo.width || baseConfig.logo.width,
			logoHeight = config.logo.height || baseConfig.logo.height,
			logoOpacity = config.logo.opacity || baseConfig.logo.opacity,
			url = config.url || baseConfig.url,
			lang = game.config.language || 'en';
			
			stage = new Stage(baseConfig.canvas);
			
			_stage = stage;
			
			Gamecast._stage = _stage;
			
			stage.mouseEventsEnabled = true;
			
			stage.onMouseMove = function(e){
				showLabels(e,stage)
			};
			
			stage.autoClear = true;
			
			Ticker.setFPS(60);
			
			Ticker.addListener(stage);
			
			container = new Container();
			
			_container = container;

			field = new Bitmap(baseConfig.fieldImage);
			
			container.addChild(field);
			
			if(enableLogo){
				logo = new Bitmap(logo);

				logo.x = baseConfig.width/2 - logoWidth/2;

				logo.y = baseConfig.height/2 - logoHeight/2;

				logo.alpha = logoOpacity;

				container.addChild(logo);
			}
			
			stage.addChild(container);
					
			fetch(url,function(match){
				
				_match = match;
				
				Gamecast._match = _match;
				
				if(Gamecast.langId == "es"){
					$('.gamecastKey').html($('.gamecastKey').html().replace('Shot','Disparo').replace('Goal','Gol'));
				}
				
				if(Gamecast.edition == 'us' && window.country == 'united states'){

					$('.videoIcon').css('display','inline');

					$('.tabs.rounded li:first a').click(function(){
						$('.closeWatch').trigger('click');
					});

					$('.tabs.rounded li:last a').click(function(){
						if(!Gamecast._playedAd){

							if(Gamecast._videoInit){
								insertAdCode();
							}else{
								espn.video.subscribe('espn.video.init', function() {
									insertAdCode();
								});
							}
						}
					});

					espn.video.subscribe('espn.video.init', function() {
						Gamecast._videoInit = true;
					});

					espn.video.subscribe('espn.video.complete', function(){
						if($('.videoplayer').height() == 374){
							$('.closeWatch').trigger('click');
						}
					});

				}
				
				var filtered = game.extendDeep(match);
				var penalties = filterSection(match.set,function(play){ if( play.shootout == 't'){ return true; } });
				if(penalties.length){
					Gamecast.Field.renderPenalties();
				}else if(!penalties.length && Gamecast._match.gameStatus == "SHOOTOUT"){
					renderPenalties(1);
				}else{
					filtered.set = filterSection(match.set,function(play){ if( play.shootout == 'f'){ return true; } });
					renderViewport(filtered);					
				}
				
				if(typeof callback == 'function'){
					callback(match,stage);
				}
				
				buildNavs(penalties.length);
				
			},config.xdomain);
			
		}

		function insertAdCode(){
			$('.videoplayer').css({'height':'374px','zIndex':10});
			var adParams = {
			 'adUnit': "Pre-Roll",
			 'maxDuration': 60,
			 'midSequence': 0,
			 'minDuration': 60,
			 'siteSection': "espnfc:gamecast:soccer",
			 'videoID': "espnfc:gamecast:soccer"
			};

			espn.video.insertAd(adParams);

			$('.closeWatch').show();
			Gamecast._playedAd = true;
		}
		
		function showLabels(e,stage){
			var offset = $('#' + baseConfig.canvas).position(),
			allPlayers = stage.getObjectsUnderPoint(e.stageX,e.stageY),
			player = allPlayers[0],
			popup = $('.' + baseConfig.classNames.popup),
			disableSort = (player && typeof player.disableSort == 'undefined') ? false : true,
			left;

			if(player && player.player || player && player.info){
				left = (player.x || player.x_);
				if(left == 34 || left == 54){
					left = 77;
				}
				popup.html(player.result || player.info).css({ left: left + offset.left - (popup.outerWidth()/2), top: (player.y || player.y_) + offset.top - popup.outerHeight() - 10 }).fadeIn('fast');
				$('#' + baseConfig.canvas).css('cursor','pointer');
				if(player.color){
					$('b',popup).css('color',player.teamColor || player.color);
				}

			}else{
				$('#' + baseConfig.canvas).css('cursor','default');
				popup.fadeOut();
			}
		}
		
		function fetch(url,callback,xdomain){
			game.get(url,function(data){
				if(xdomain){
					//Get the results from YQL
					// data = data.firstChild || data;
				}
				buildDataSet(data,callback);
			},xdomain)
		}
		
		function buildDataSet(data,callback){
			
			var plays = $('play',data), play, i, len, j, length, parts, part, obj, partObj, array, set = [], home, away, match = {}, entry,
			temp, cur, grid, player, gridMax, optionsNode, options = [], option, max, subNav, subNavOpts, homeColor, awayColor;

			homeColor = /*game.rgb2hex($('.country h2:first').css('color')) ||*/ $('home',data).attr('color');

			awayColor = /*game.rgb2hex($('.country h2:last').css('color')) ||*/ $('away',data).attr('color');
			
			home = { id: $('home',data).attr('id'), name : $('home',data).text(), color : /*'2b579e'*/ homeColor};
			
			match.home = home;
			
			away = { id: $('away',data).attr('id'), name : $('away',data).text(), color : /*'da2932'*/ awayColor};
			
			match.away = away;
			
			match.homeScore = $('homeScore',data).text();
			
			match.awayScore = $('awayScore',data).text();
			
			match.clock = $('clock',data).text();
			
			match.period = $('period',data).text();
			
			match.gameStatus = $('gameStatus',data).text();
			
			match.gameStatusText = $('gameStatusText',data).text();
			
			match.pregameWhen = $('pregameWhen',data).text();
			
			optionsNode = $('option',data);
			
			for( i = 0, len = optionsNode.length; i < len; i++ ){
				option = $(optionsNode[i]);
				subNav = $('subNav',option).children();
				subNavOpts = [];
				for( j=0, max = subNav.length; j < max; j++ ){
					temp = {};
					temp[subNav[j].nodeName] = $(subNav[j]).text();
					subNavOpts.push(temp);
				}
				options.push({ id : option.attr('id'), label : $('>label',option).text(), subNav : subNavOpts });
			}
			
			match.options = options;
			
			for( i = 0, len = plays.length; i < len; i++ ){
				
				play = $(plays[i]);
				
				obj = {
				    id: play.attr('id'),
				    clock: play.attr('clock'),
				    addedTime: play.attr('addedTime'),
				    period: play.attr('period'),
				    startX: play.attr('startX'),
				    startY: play.attr('startY'),
				    teamId: play.attr('teamId'),
				    goal: play.attr('goal'),
				    ownGoal: play.attr('ownGoal'),
				    videoId: play.attr('videoId'),
				    shootout: play.attr('shootout'),
					player : $('>player',play).text(),
					result : $('>result',play).text(),
					shotbytext : $('shotbytext',play).text(),
					topscoretext : $('topscoretext',play).text()
				};
				
				parts = $('part',play);
				
				array = [];
				
				for( j = 0, length = parts.length; j < length; j ++ ){
					part = $(parts[j]);
					
					partObj = {
					    pId: part.attr('pId'),
					    jersey: part.attr('jersey'),
					    startX: part.attr('startX'),
					    startY: part.attr('startY'),
					    endX: part.attr('endX'),
					    endY: part.attr('endY'),
					    endZ: part.attr('endZ'),
					    player: $('player', part).text(),
					    result: $('result', part).text(),
					    resulttext: part.children('resulttext').text()
					}
					array.push(partObj)
				}
				obj.parts = array;
				set.push(obj);
				match.set = set;
			}
			
			match.set = match.set || [];
			
			entry = $('entry',data);
			
			array = [];
			
			var gridsVailable = false;
			var tactAvailable = false;
			match.heatMapEnabled = false;
			match.tacticalEnabled = false;
			
			for( i = 0, len = entry.length; i < len; i++ ){
				cur = $(entry[i]);
				grid = $('grid',cur).text();
				gridMax = $('grid',cur).attr('max')
				cur.children().remove();
				player = cur.text();
				
				temp = {
					player : player,
					grid : grid,
					gridMax : gridMax,
					jersey : cur.attr('jersey'),
					avgX : cur.attr('avgX'),
					avgY : cur.attr('avgY'),
					posX : cur.attr('posX'), 
					posY : cur.attr('posY'),
					left : cur.attr('left'),
					middle : cur.attr('middle'),
					right : cur.attr('right'),
					playerId : cur.attr('playerId'),
					teamId : cur.attr('teamId'),
					position : cur.attr('position') 
				}
				array.push(temp);
				
				if(grid.length){
					gridsVailable = true;
				}
				
				if(parseFloat(temp.posX) > 0 && parseFloat(temp.posY) > 0){
					tactAvailable = true;
				}
			}
			
			if(gridsVailable){
				match.heatMapEnabled = true;
			}

			if(tactAvailable){
				match.tacticalEnabled = true;
			}
			
			match.attack = array;
			
			if(typeof callback == 'function'){
				callback(match);
			}
		}
		
		function getLocalizedLabel(label){
			for( var i =0, max = _match.options.length; i < max; i ++ ){
				var option  = _match.options[i];
				if(option.id == label){					
					return option.label;
				}
				for ( var j =0, len = option.subNav.length; j < len; j ++ ){
					if(option.subNav[j][label]){					
						return option.subNav[j][label]
					}
				}
			}
		}
		
		function buildNavs(pens){
			
			$('li[data-div=filterShots]').text(getLocalizedLabel('shots'));
			
			$('li[data-div=filterGoals]').text(getLocalizedLabel('goals'));
			
			$('li[data-div=showTacticalInformation]').text(getLocalizedLabel('tactical'));
			
			if(!_match.tacticalEnabled){
				$('li[data-div=showTacticalInformation]').hide();				
			}
			
			$('li[data-div=showHeatMaps]').text(getLocalizedLabel('heatMap'));
			
			if(!_match.heatMapEnabled){
				$('li[data-div=showHeatMaps]').hide();
			}
			
			$('li[class^=reset]').text(getLocalizedLabel('total'));
			
			$('li[class^=firstHalf]').text(getLocalizedLabel('firstHalf'));
			
			$('li[class^=secondHalf]').text(getLocalizedLabel('secondHalf'));
			
			$('li[class^=extra]').text(getLocalizedLabel('extra'));
			
			$('li[class^=showPenalties]').text(getLocalizedLabel('penalty'));
			
			if(pens){
				$('li[class^=showPenalties]').addClass('appliedFilter');
			}else{
				$('.filterShots li:first-child').addClass('appliedFilter')
			}
			
			$('td:contains("Start Position")').text(getLocalizedLabel("startFormation"));
			
			$('td:contains("Average Position")').text(getLocalizedLabel("avgFormation"));
			
			$('td:contains("COMPLETE TEAM")').text(game.getLocalizedText(game.language,'COMPLETE TEAM'))
		}
		
		function updateHeatMap(attack,x,y){
			var emptyGrid = "0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~";
			var grid;
			
			//Heatmap cal;
			if(!attack.grid){
				grid = emptyGrid;
			}else{
				grid = attack.grid;
			}
			var pos = getUpdatePosition(x,y);
			
			if(pos >=0 && pos <=704){
				var gridArray = grid.split('~');
				var updateNode = parseInt(gridArray[pos]);
				
				updateNode = parseInt(updateNode) + 1;

				gridArray[pos] = updateNode;

				//TODO: update team map;
				
				attack.gridMax = maxInArray(gridArray);
				
				if(_match.attack[0].teamId == attack.teamId){
					updateCompleteTeam(_match.attack[0],pos)
				}else{
					updateCompleteTeam(_match.attack[1],pos)
				}

				attack.grid = gridArray.join('~');
				
				addAttack(attack);
				
				return true;				
			}
		
		}
		
		function updateCompleteTeam(attack,pos){
			var emptyGrid = "0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~0~";
			var grid;
			var gridArray;
			
			if(!attack.grid){
				grid = emptyGrid;
			}else{
				grid = attack.grid;
			}
			
			gridArray = grid.split('~');
			
			var updateNode = gridArray[pos];
			
			attack.gridMax = maxInArray(gridArray);
			
			updateNode = parseInt(updateNode) + 1;
			
			gridArray[pos] = updateNode;
			
			attack.grid = gridArray.join('~');
			
			addAttack(attack,1);
			
			return true;
		}
		
		function maxInArray(arr){
			var max = 0;
			for( var i=0, len = arr.length; i < len; i ++){
				if(parseInt(arr[i]) > max){
					max = arr[i];
				}
			}
			return max;
		}
		
		function getUpdatePosition(x,y){
			x = x || 1;
			y = y || 1;
			
			var height = (374 - 19);
			var blockHeight = (374 - (19 * 2))/22;
			var t = y * ( 374 - (19 * 2) ) + 19;
			
			var width = (585 - 34);
			var blockWidth = (585 - (34 * 2) )/32;
			var left = x * ( 585 - (34 * 2) ) + 34;
			
			var xPos, yPos;
			
			for( var i=1; i <= 32; i++ ){
				var prev = (i-1 < 0) ? 0 : i-1;
				if( (blockWidth * i) + 34 >= left && (blockWidth * prev) + 34 <= left){
					xPos = i;
					break;
				}
			}
			
			if(x <= 0){
				xPos = 1;
			}
			
			for( var i=1; i <= 22; i++ ){
				var prev = (i-1 < 0) ? 0 : i-1;
				if( (blockHeight * i) + 19 >= t && (blockHeight * prev) + 19 <= t){
					yPos = i;
					break;
				}
			}
			
			if(y <= 0){
				yPos = 1
			}
			
			var endPos = ((22 - yPos) * 32) + xPos;
			
			return endPos;
		}
		
		function addPlay(play,sNode){
			var set = _match.set;
			for(var i=0, len = set.length; i < len; i ++){
				var cur = set[i];
				if(parseInt(cur.id) == parseInt(play.id)){
					//has updated passes already, skip
					if(sNode && cur.parts.length && cur.videoId){
						return false;
					}
					set[i] = play;
					var videoId = cur.videoId;
					if(videoId){
						set[i].videoId = videoId;
					}
					return false;
				}
			}
			return _match.set.push(play);
		}
		
		function removePlay(id){
			var set = _match.set;
			for(var i=0, len = set.length; i < len; i ++){
				var cur = set[i];
				if(parseInt(cur.id) == parseInt(id)){
					var arr = game.removeElementFromArray(set,cur);
					_match.set = arr;
					//check this
					return true;
				}
			}
			return false;
		}
		
		function addAttack(obj,team){
			var attack = _match.attack;
			for(var i=0, len = attack.length; i < len; i ++){
				var cur = attack[i];
				if(team){
					if(parseInt(cur.teamId) == parseInt(obj.teamId)){
						attack[i] = obj;
						return false;
					}
				}else{
					if(parseInt(cur.playerId) == parseInt(obj.playerId)){
						attack[i] = obj;
						return false;
					}					
				}
			}
			_match.attack.push(attack);
		}
		
		function updateScores(homeScore,awayScore){
			_match.homeScore = homeScore;
			_match.awayScore = awayScore;
		}
		
		function updateClock(clock){
			_match.clock = clock;
		}
		
		function updateGameStatus(gameStatus){
			_match.gameStatus = gameStatus;
		}
		
		function updateGameStatusText(gameStatusText){
			_match.gameStatusText = gameStatusText;
		}
		
		function clearViewport(){
			// Clear container, only retain the background - child at 0 is background image
			_stage.children = [_stage.children[0]];
		}
		
		/*
		*	@param {object} grid
		*	@return void
		*/
		
		function renderHeatMap(gridMap){
			
			var i, len, cur, row, col, player, x, y, width, height, container = new Container(), color, value;
			
			stopAnimation();
			
			clearViewport();
			
			Gamecast._isPlaying = false;
			
			if(_container.children.length > 1){
				_container.children = [_container.children[0]];
			}
			
			$('.' + baseConfig.classNames.perspective_container).hide();
			
			width = ( baseConfig.width - (baseConfig.leftGutter * 2) )/32;
			height = ( baseConfig.height - (baseConfig.topMargin * 2) )/22;
			
			for ( i = 0, len = gridMap.length; i < len; i ++){
				value = gridMap[i];
				color = ((value * 40) <= 100) ? value * 40 : 100;
				color = game.getColorPercent(baseConfig.colors.heatMap.start,baseConfig.colors.heatMap.end,color);
				if(value > 0){
					cur = i+1;
					row = Math.ceil(cur/32);
					col = cur - (Math.floor(cur/32) * 32) || 32
					player = new Shape();
					player.graphics.beginFill(color);
					player.graphics.beginStroke(color);
					player.graphics.setStrokeStyle(1);
					player.alpha = 0.7;
					// player.shadow = new Shadow ( color , 1 , 1 , 2 );
					x = (col * width) - width + baseConfig.leftGutter;
					y = baseConfig.height - (height * row) - baseConfig.topMargin;
					
					player.graphics.drawRoundRect( x, y , width, height, 7);
					container.addChild(player);
				}
			}
			_stage.addChild(container);
		}
		
		function getGrid(attacks,id,isTeam){
			var i, len, attack;
			
			for( i=0, len = attacks.length; i < len; i ++){
				attack = attacks[i];
				if( (isTeam && (attack.teamId == id)) || attack.playerId == id ){
					return attack.grid.split('~');
				}
			}
			return null;
		}
		
		/*
		* @param {array} attacks
		* @param {function} filter
		*/
		
		function getPlayers(attacks,filter){
			var i, len, attack, players = {}, filter = filter || function(){ return true };
			
			for( i=0, len = attacks.length; i < len; i++ ){
				attack = attacks[i];
				if(typeof players[attack.teamId] != 'object'){
					players[attack.teamId] = [];
				}
				//Filter complete teams
				if(attack.playerId != -1 && (filter && filter(attack)) ){
					players[attack.teamId].push({ id: attack.playerId, name : attack.player, position: attack.position });
				}
			}
			
			return players;
		}
		
		function renderTacticalInformation(teamId,position){
			
			var container = new Container(), attack, posX, posY, left, top, player, text, match = _match, color;
			
			stopAnimation();
			
			_stage.children = [_stage.getChildAt(0)];
			
			Gamecast._isPlaying = false;
			
			$('.' + baseConfig.classNames.perspective_container).hide();
			
			if(_container.children.length > 1){
				_container.children = [_container.children[0]];
			}
			
			for( var i=0, len = match.attack.length; i < len; i++ ){
				attack = match.attack[i];
				posX = attack.posX;
				posY = attack.posY;
				color = (match.home.id == attack.teamId) ? '#' + match.home.color : '#' + match.away.color;
				
				if(position == 'average'){
					posX = attack.avgX;
					posY = attack.avgY;
				}
				
				if(!( posX == 0 && posY == 0 ) && attack.jersey){
					
					if(teamId && attack.teamId == teamId){
						left = posX * baseConfig.width;
						
						//Move players inside the canvas to prevent them getting clipped
						if(posX == 1){
							left = baseConfig.width - 10 - baseConfig.leftGutter;
						}else if(posX == 0){
							left = 10 + baseConfig.leftGutter;
						}
						
						top = posY * baseConfig.height;
						
						if(posY == 0){
							top = 10;
						}else if( posY == 1 ){
							top = baseConfi.height - 10;
						}

						player = new Shape();
						player.graphics.beginFill(color);
						player.graphics.drawRoundRect(left-9, top-9, baseConfig.roundLabelWidth, baseConfig.roundLabelHeight, baseConfig.roundLabelRadius);
						player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 2 );
						player.info = '<b>' + attack.player + '</b><br/>' + attack.position;
						player.x_ = left;
						player.y_ = top;
						player.disableSort = true;
						player.color = color;

						text = new Text(attack.jersey);
						text.x = left;
						text.y = top + 4.5;
						text.info = '<b>' + attack.player + '</b><br/>' + attack.position;
						text.font = baseConfig.fonts.jersey;
						text.textAlign = 'center';
						text.color = baseConfig.player.colors.number;
						text.teamColor = color;
						
						container.addChild(player,text);
					}
				}
			}
			_stage.addChild(container);
			
			_stage.update();
		}
		
		function renderViewport(match){
			
			var match = match || _match, parts, part, i, len, left, top, id, obj = match.set, color, container = new Container(), isGoal, player, status, logo, bg, playerBg, coords, playArrow;
			
			if(match.gameStatus == "SCHEDULED" && match.pregameWhen){
				
				var localTime = $('.game-status').contents().filter(function(){ return(this.nodeType == 3); }).text().trim() || $('.match-details span').contents().filter(function(){ return(this.nodeType == 3); }).text().replace('*','').trim();
				var localTimeArray = localTime && localTime.split(' ');
				var localTimeString;
				
				if(localTimeArray.length == 2){
					localTimeString = 'Game starts on ' + localTimeArray[0] + ' at ' + localTimeArray[1];
					if(Gamecast.langId == "es"){
						localTimeString = 'El partido inicia en ' + localTimeArray[0] + ' a las ' + localTimeArray[1];
					}
				}else{
					localTimeString = match.pregameWhen
				}
				
				status = new Text(localTimeString);
				status.x = (baseConfig.width/2);
				status.y = 65;
				status.color = "#fff";
				status.shadow = new Shadow ('#333' , 1 , 1 , 2 );
				status.font = '25px Arial';
				status.textAlign = 'center';
				
				bg = new Shape();
				bg.graphics.beginFill('#111');
				bg.graphics.drawRoundRect((baseConfig.width/2 - status.getMeasuredWidth()/2 -10 ), 35, status.getMeasuredWidth() + 22, 40,4);
				bg.alpha = 0.7;
				_stage.addChild(bg);
				
				_stage.addChild(status);
				
				status = new Text(match.home.name.toUpperCase());
				status.x = 50;
				status.y = 330;
				status.color = "#fff";
				status.shadow = new Shadow ('#333' , 1 , 1 , 2 );
				status.font = '15px Arial';
				status.textAlign = 'left';
				_stage.addChild(status);
				
				// logo = new Bitmap( baseConfig.logoUrl + match.home.id + '.gif');
				// logo.x = (status.getMeasuredWidth()/2)  + 50 - 27.5; //1.5 logo width
				// logo.y = 250;
				// _stage.addChild(logo);
				
				status = new Text(match.away.name.toUpperCase());
				status.x = 535;
				status.y = 330;
				status.color = "#fff";
				status.shadow = new Shadow ('#333' , 1 , 1 , 2 );
				status.font = '15px Arial';
				status.textAlign = 'right';
				_stage.addChild(status);
				
				logo = new Bitmap( baseConfig.logoUrl + match.away.id + '.gif');
				logo.x = 535 - (status.getMeasuredWidth()/2) - 27.5;
				logo.y = 250;
				// _stage.addChild(logo);
				
				Gamecast.started = false;
				
			}else{
				
				Gamecast.started = true;
				
				// activateFilters();
				
				clearViewport();
				
				stopAnimation();
				
				renderViewport.cache = {};
				
				if(_container.children.length > 1){
					_container.children = [_container.children[0]];
				}
				
				$('.' + baseConfig.classNames.perspective_container).hide();
				
				for (i = 0, len = obj && obj.length; i < len; i++) {
						
					parts = obj[i].parts;

					color = (match.home.id == obj[i].teamId) ? '#' + match.home.color : '#' + match.away.color;

					isGoal = (obj[i].goal == 't');

					if( parts.length > 0 ){

						//Last Player position
					    part = parts[ parts.length - 1 ];
						id = obj[i].id;

					    left = part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter;
					    top = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;
					
						coords = left + '|' + top;
					
						if(!renderViewport.cache[coords]){
							renderViewport.cache[coords] = 0;
							renderViewport.cache[coords]++;
						}else{
							renderViewport.cache[coords]++; 
						}
						
						if(renderViewport.cache[coords] > 1){
							left = left + (renderViewport.cache[coords] - 1) * 3;
							top = top + (renderViewport.cache[coords] - 1) * 3;
						}
						
						playerBg = new Shape();
						playerBg.graphics.beginFill('#000');
						playerBg.alpha = 0.07;						
						playerBg.graphics.drawCircle(0, 0,baseConfig.fauxRadius);
						playerBg.x = left;
						playerBg.y = top;
						playerBg.playId = parseInt(id);
						playerBg.player = part.player;
						playerBg.result = obj[i].result;
						playerBg.color = color;

						player = new Shape();
						player.graphics.beginFill(isGoal ? color : baseConfig.player.colors.fill);
						if(!isGoal){
							player.graphics.beginStroke(color);
							player.graphics.setStrokeStyle(2);	
							container.addChild(playerBg);
						}
						player.graphics.drawCircle(0, 0, isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius);
						player.x = left;
						player.y = top;
						player.shadow = new Shadow ( baseConfig.player.colors.shadow , 2 , 2 , 2 );

						//Add custom property
						player.playId = parseInt(id);
						player.player = part.player;
						player.result = obj[i].result;
						player.color = color;

						player.onPress = playerBg.onPress = function(){
							var play = filterPlay(obj,this.playId);
							if(play){
								renderPlay(play);
							}
						}
						
						container.addChild(player);
						
						if(obj[i].videoId && Gamecast.edition == 'us' && window.country == 'united states'){
							playArrow = new Shape();
							playArrow.graphics.beginFill('#fff');
							playArrow.graphics.drawPolyStar( left + 0.5, top, 3.5, 3, 0.5, 0 );
							playArrow.playId = parseInt(id);
							playArrow.player = part.player;
							playArrow.result = obj[i].result;
							playArrow.color = color;
							var videoId = obj[i].videoId;
							
							(function(videoId){
								//TODO : add video function
								playArrow.onPress = function(){
									playWatch(videoId);
								};
							})(videoId)

							container.addChild(playArrow);
							player.onPress = playerBg.onPress = playArrow.onPress;							
						}
					}
				}
				
				_stage.addChild(container);
			}
		}
		
		function playWatch(id,playId){
			//TODO : update test case
			var id = parseInt(id) || '100494'
			var canvas = $('#' + baseConfig.canvas);
			$('.videoplayer').height('374px');
			
			stopAnimation();
			
			$('.playerList, .tactList').slideUp();
			
			$('.selectedPlayerMap').hide();
			
			$('.' + baseConfig.classNames.perspective_container).hide();
			
			if(!playWatch.embeded){
				var position = canvas.position();
				$('.videoplayer').css({ top: position.top, left : position.left });
				playWatch.embeded = true;
			}
			
			var opts = {'endCard': "false", 'cms': 'intl'};

			if(Gamecast.sessionId == 'uefa.euro-gp10' && Gamecast.season == "2012"){
				//videos for euros come from ESPN cms
				opts.cms = 'espn';
			}

			espn.video.play(id,opts);

			if(playId){
				lastVideoPlayed = parseInt(playId);
			}
			
			canvas.css('visibility','hidden');
			Gamecast.Field.clearViewport();
			$('.closeWatch').show();
		}
		
		function activateFilters(){
			var filters = $('.gamecastFilters');
			if(!filters.hasClass('activeGame') || filters.hasClass('inactiveGame')){
				filters.addClass('activeGame');
				filters.removeClass('inactiveGame');
			}
			return true;
		}
		
		function renderPenalties(start,playLast,playedId,update){
			
			var match = _match, filtered = {}, parts, part, i, len, id, obj , color, container = new Container(), isGoal, player, isHome, homeCount = 0, awayCount = 0, max, playerBg;
			
			stopAnimation();
			
			container.name = 'renderePens';

			if(!update){
				
				clearViewport();
			
				var goal = new Bitmap(daddyUrl + 'goal-bg7b.jpg');
			
				_container.addChild(goal);
				
			}
			
			Gamecast.Timeline.removeChildObject(_stage,'renderePens');			
			
			Gamecast._container = _container;

			filtered.set = filterSection(match.set,function(play){
				if(play.shootout == 't'){
					return true;
				}
			});
						
			obj = filtered.set;
			
			var text = new Text(match.home.name.toUpperCase());
			text.x = (homeCount * 20) - 8 + baseConfig.leftGutter;
			text.y = baseConfig.height - 72;
			text.color = '#fff';
			text.textAlign = "left";
			text.font = 'bold 12px Arial';
			container.addChild(text);
			
			var text = new Text(match.away.name.toUpperCase());
			text.x = ( baseConfig.width + 5 - baseConfig.leftGutter) - (awayCount * 20);
			text.y = baseConfig.height - 72;
			text.color = '#fff';
			text.textAlign = "right";
			text.font = 'bold 12px Arial';
			container.addChild(text);
				
			for (i = 0, len = obj && obj.length; i < len; i++) {
				
				isHome = (match.home.id == obj[i].teamId);
					
				parts = obj[i].parts;

				color = isHome ? '#' + match.home.color : '#' + match.away.color;

				isGoal = (obj[i].goal == 't');
				
				if(isHome){
					homeCount++
					var row = (homeCount > 13) ? 2 : 1;
					var count = (homeCount > 13) ? homeCount - 13 : homeCount;
				}else{
					awayCount++
					var row = (awayCount > 13) ? 2 : 1;
					var count = (awayCount > 13) ? awayCount - 13 : awayCount;
				}
				
				if( parts.length > 0 ){

					//Last Player position
				    part = parts[ parts.length - 1 ];
					id = obj[i].id;
					
					playerBg = new Shape();
					playerBg.graphics.beginFill('#000');
					playerBg.alpha = 0.1;						
					playerBg.graphics.drawCircle(0, 0, isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius);
					playerBg.x = isHome ? (count * 20) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) ;
					playerBg.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );//baseConfig.height - 55;
					
					playerBg.playId = parseInt(id);
					playerBg.player = part.player || obj[i].player;
					playerBg.result = obj[i].result;
					playerBg.color = color;

					player = new Shape();
					player.graphics.beginFill( isGoal ? color : baseConfig.player.colors.fill);
					player.graphics.beginStroke(color);
					player.graphics.setStrokeStyle(2);
					player.graphics.drawCircle(0, 0, isGoal ? baseConfig.goalsRadius : baseConfig.shotsRadius);
					player.x = isHome ? (count * 20) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) ;
					player.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );//baseConfig.height - 55;
					// player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 1 );

					//Add custom property
					player.playId = parseInt(id);
					player.player = part.player || obj[i].player;
					player.result = obj[i].result;
					player.color = color;
					player.videoId = obj[i].videoId;
					
					container.addChild(playerBg);
					container.addChild(player);
					
					(function(i){
						player.onPress = playerBg.onPress = function(){
							renderPlay(String(obj[i].id),true);
						}
						
						if(obj[i].videoId && Gamecast.edition == 'us' && window.country == 'united states'){
							var playArrow = new Shape();
							playArrow.graphics.beginFill('#fff');
							playArrow.graphics.drawPolyStar( player.x + 0.5, player.y, 3.5, 3, 0.5, 0 );
							playArrow.playId = player.playId;
							playArrow.player = player.player;
							playArrow.result = player.result;
							playArrow.color = color;
							var videoId = obj[i].videoId;

							if(videoId){
								playArrow.onPress = function(){
									playWatch(obj[i].videoId,obj[i].id);
								};
								container.addChild(playArrow);
								player.onPress = playerBg.onPress = playArrow.onPress;
							}	
						}
						
					})(i)
					
					
					if(update){
						playedId = renderPenalties.lastShot;
					}

					if( (playedId == player.playId && !lastVideoPlayed ) || (lastVideoPlayed == player.playId) || ( !renderPenalties.lastShot && i+1 == len && !update )){
						player = new Shape();
						player.graphics.beginFill('transparent');
						player.graphics.beginStroke(color);
						player.graphics.setStrokeStyle(1);
						player.graphics.drawCircle(0, 0, 11);
						player.x = isHome ? (count * 20) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter) - (count * 20) ;
						player.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );//baseConfig.height - 55;
						container.addChild(player);
						if(playLast){
							renderPlay(String(id),true);
						}
						renderPenalties.lastShot = id;
						lastVideoPlayed = null;
					}
				}
			}
			
			var penalties = filterSection(_match.set,function(play){ if( play.shootout == 't'){ return true; } });
			
			if(start && !penalties.length){
				renderEmptyPenaltyMarker( { container : container, count : 0, home : true} );
				renderEmptyPenaltyMarker( { container : container, count : 0, home : false} );
			}
			
			renderEmptyPenaltyMarker( { container : container, count : homeCount, home : true} );
			renderEmptyPenaltyMarker( { container : container, count : awayCount, home : false} );
			
			_stage.addChild(container);
		}
		
		function renderEmptyPenaltyMarker(options){
			
			var home = options.home,
			color = home ? '#' + _match.home.color : '#' + _match.away.color,
			// color = baseConfig.colors.penalties.noshot,
			container = options.container,
			count = options.count,
			player, i, max;
			
			for( i = 0, max = (5 - count); i < max; i++ ){
				var row = Math.ceil((i + 1 + options.count)/13) || 1;
				player = new Shape();
				player.graphics.beginFill(color);
				// player.graphics.beginStroke(color);
				// player.graphics.setStrokeStyle(2);
				if(count == 13){
					// reset row
					count = 0;
				}
				player.graphics.drawCircle(0, 0, 10);
				player.x = home ? ( ++count * 20 ) - 20 + baseConfig.leftGutter : ( baseConfig.width + 20 - baseConfig.leftGutter ) - ( ++count * 20 ) ;
				player.y = baseConfig.height - (55 * ((row == 2) ? 0.5 : row) );
				player.alpha = 0.3;
				// player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 1 );

				container.addChild(player);
			}
			return container;
		}
		
		function filterGoals(obj){
			
			var i, len, play, set = [];
			
			for( i = 0, len = obj && obj.length; i < len; i ++){
				play = obj[i];
				if(play.goal == 't'){
					set.push(play);
				}
			}
			return set;			
		}
		
		function getGoals(side){
			
			var i, len, set, goals = {}, teamId, team, isHome, match = _match, temp, key;
			
			set = filterGoals(match.set);
			
			for( i = 0, len = set.length; i < len; i ++){
				teamId = set[i].teamId;
				isHome = (match.home.id == teamId) ? 'home' : 'away';
				team = isHome ? match.home.name : match.away.name;
				key = side ? isHome : team;
				if(!goals[key]){
					goals[key] = [];
				}
				goals[key].push({ player : set[i].player, clock : set[i].clock, shootout : set[i].shootout })
			}
			
			return goals;
		}
		
		function getTeams(){
			return { home : { id : _match.home.id , name : _match.home.name, color : '#' + _match.home.color } , away: { id: _match.away.id, name : _match.away.name, color : '#' + _match.away.color } }
		}
		
		function filterSection(obj,filter){
			var i, len, play, set = [], filter = filter || function(){ return true; };
			
			for( i = 0, len = obj && obj.length; i < len; i ++){
				play = obj[i];
				if(filter && filter(play)){
					set.push(play);
				}
			}
			return set;
		}
		
		function filterPlay(obj,id){
			
			var i, len, play;
			
			for( i = 0, len = obj.length; i < len; i ++){
				play = obj[i];
				if(play.id == id){
					return play;
				}
			}
			return null;
		}
		
		Gamecast.Modules.Soccer.Field.renderPlay = renderPlay;
		
		function animate(part,isHome){
			
			var txt = part.resulttext,
			player = part.player,
			bottom = (part.endZ * 154) + 130,
			bottom = (bottom > 350) ? 350 : bottom, //bring inside the viewport
			endY = part.endY,
			y,
			left,
			prevLeft,
			prevY,
			me = $('.' + baseConfig.classNames.fieldClone);
			Gamecast._isPlaying = true;
			
			// if(!overlayIsSet){
				// overlap the anim on canvas
				var animTop = $('#' + baseConfig.canvas).position().top;	
				$('.goalAnimation').css('top', animTop + 'px');
				overlayIsSet = true;
			// }
			
			if(isHome){
				y = endY;
				prevY = part.y;
			}else{
				y = (374-endY);
				prevY = (374-part.y);
			}
			
			left = y - 187; //187 = 374/2
			prevLeft = prevY - 187;
			left = left * 10.10; //10.10 = scale
			prevLeft = prevLeft * 10.10;
			left = left + 292.5 - 52; //292 = 585/2, (zoom goal center line), 51 is dist between edge of image and goal post
			prevLeft = prevLeft + 292.5 - 52; 
			
			$('.' + baseConfig.classNames.ball_front).css({ bottom: '-70px', left: prevLeft || '275px',  height : '52px', width : '52px' }).attr('src',baseConfig.images.ball);
			
			// txt = (part.goal == "t") ? txt += '!!!' : txt;
			
			$('.' + baseConfig.classNames.perspective_container).fadeIn('fast');
			
			$('.' + baseConfig.classNames.anim_1 + ', .' + baseConfig.classNames.anim_2).hide();
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.anim_1).fadeIn('fast');				
			},350);
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.anim_2).fadeIn('slow').children().html( (Gamecast.langId == "es" ? 'Disparo de ' : 'Shot by ') + player);
			},1500);
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.ball_front).css({ bottom : bottom , left : left,  height : '26px', width : '26px' });
			},2700);
			
			setTimeout(function(){
				if(part.goal != "t"){
					$('.' + baseConfig.classNames.ball_front).attr('src',baseConfig.images.ballMiss);
				}
			},3400);
			
			setTimeout(function(){
				$('.' + baseConfig.classNames.anim_2).children().append("<br><br><br><div style='display:none'></div><b class='js-playResult' style='display:none'>" + txt + "</b>");
				$('.' + baseConfig.classNames.anim_2 + ' div').show().css('height',$('.anim-2 b').height());
				$('.' + baseConfig.classNames.anim_2 + ' b.js-playResult').fadeIn('slow');
			},3800);
			// return 0;
			setTimeout(function(){
				// $('.' + baseConfig.classNames.perspective_container).fadeOut('slow');
				
				Gamecast._isPlaying = false;
				
				if(part.shootout == "t"){
					renderPenalties(null,null,part.id);
					$('.appliedFilter').removeClass('appliedFilter');
					$('.showPenalties').addClass('appliedFilter');
					$('.' + baseConfig.classNames.perspective_container).css({overflow:'hidden',height:'280px'});
				}else{
					$('.' + baseConfig.classNames.perspective_container).fadeOut('slow');
					$('li.appliedFilter').trigger('click');
					$('.' + baseConfig.classNames.perspective_container).css({overflow:'auto',height:'374px'});
					// $('li[data-div=filterShots]').trigger('click');
				}
				
				if(Gamecast._queue.length){
					for (var play; Gamecast._queue.length && (play = Gamecast._queue.shift());) {
						var id = play.id;
						var isShootout = play.isShootout;
						var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
						var playShot = true;
						
						if(shootoutInProgress && !isShootout){
							playShot = false;
						}
						
						if(!Gamecast._playedAnim[id]){
							Gamecast._playedAnim[id] = 0;
						}

						if(Gamecast._playedAnim[id] < 1 && playShot){
							renderPlay(String(id),isShootout);
							Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
							return false;
						}
					}
				}
			},6100);
			
		}
		
		/*
		*	@param {Object} match
		*	@param {array} play
		*/
		
		function renderPlay(play,anim){
			
			play = (typeof play == 'string') ? filterPlay(_match.set,play) : play ;
			var isHome = (_match.home.id == play.teamId) ? true : false;
			var match = _match, parts = play && play.parts, part, i, len, left, top, id = play && play.id, coords = [], container = new Container(), color, player, ball;
			
			color = isHome ? '#' + _match.home.color : '#' + _match.away.color;
			
			$('.' + baseConfig.classNames.popup).hide();
			
			$('.' + baseConfig.classNames.perspective_container).hide();
						
			clearViewport();
			
			for (i = 0, len = parts.length; i < len; i++) {
			    part = parts[i];

			    left = part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter;
				
			    top = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;
			
				coords.push({ id: play.id, videoId : play.videoId, shootout : play.shootout, goal : play.goal, player: part.player, resulttext : part.resulttext , result : part.result, x :part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter, y : part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin, endX: part.endX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter, endY: part.endY * baseConfig.height, endZ : part.endZ });
				
				//Skip the player pointer if the next has same coords
				if( ! ( ( parseFloat(part.startX) == parseFloat(parts[i-1] && parts[i-1].startX)) && (parseFloat(parts[i-1] && parts[i-1].startY) == parseFloat(part.startY) ) ) ){
					
					player = new Shape();
					player.graphics.beginFill(color);
					// player.graphics.beginStroke(color);
					// player.graphics.setStrokeStyle(2);
					player.graphics.drawCircle(0.3, 0.3, baseConfig.playerRadius);
					player.x = left;
					player.y = top;
					player.shadow = new Shadow ( baseConfig.player.colors.shadow , 1 , 1 , 2 )
					player.result = part.result;
					player.color = color;

					//Add custom property
					player.playId = parseInt(id);

					//Place on Canvas
					container.addChild(player);
				}
				
				//Add ball and an event handler
				if(i == 0){
					
					//Push the starting point
					coords.unshift( {x: left, y: top, endX: part.endX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter, endY: part.endY * baseConfig.height} );
					
					ball = new Shape();
					ball.graphics.beginFill(color);
					ball.graphics.beginStroke(baseConfig.ball.colors.stroke);
					ball.graphics.setStrokeStyle(2);
					ball.graphics.drawCircle(0.4, 0.4, baseConfig.ballRadius);
					ball.x = part.startX * ( baseConfig.width - (baseConfig.leftGutter * 2) ) + baseConfig.leftGutter;
					ball.y = part.startY * (baseConfig.height - (baseConfig.topMargin * 2)) + baseConfig.topMargin;
					ball.snapToPixel = true;
					ball.shadow = new Shadow ( baseConfig.ball.colors.shadow , 1 , 1 , 1 );
					ball.color = color;

					//Add custom property
					ball.playId = parseInt(id);
					ball.player = part.player;
					ball.result = part.result;

					container.addChild(ball);
					
					ball.onPress = function(){
						playParts(this,coords,container,play);
					}
				}
			}
			
			if(anim){
				animate(coords[1],isHome);
				
				return 0;
			}else{
				_stage.addChild(container);

				playParts(ball,coords,container,play);

				_stage.update();
			}
			
		}
		
		/*
		*	@return {Boolean} True if the animation was stopped
		*/
		
		function stopAnimation(){
			if(playParts._ball){
				Tween.removeTweens(playParts._ball);
				$('.' + baseConfig.classNames.popup).fadeOut('fast');
				return true;
			}
			return false;
		}
		
		function removeContainerByName(name){
			for( var i = 0, len = _stage.children.length; i < len; i++ ){
				if( _stage.children[i] && (_stage.children[i].name == name) ){
					_stage.removeChildAt(i);
				}
			}
			return false;
		}
		
		function addCloseLink(){
			var l, label, container = new Container();
			
			removeContainerByName('close');
			
			l = new Shape();
			l.graphics.beginFill('#111');
			l.graphics.drawRoundRect((baseConfig.width/2 - 28) + 2, 335, 60,15,4);
			l.alpha = 0.7;
			l.disableSort = true;

			label = new Text('CLOSE X');
			label.x = (baseConfig.width/2 - 28) + 9;
			label.y = 346;
			label.color = "#fff";
			label.shadow = new Shadow ('#333' , 1 , 1 , 2 );
			label.font = 'bold 10px Arial';
			label.disableSort = true;

			label.onPress = l.onPress = function(){
				stopAnimation();
				Gamecast._isPlaying = false;
				if($('.showPenalties').hasClass('appliedFilter')){
					renderPenalties();
				}else{
					$('li.appliedFilter').trigger('click');
					// $('li[data-div=filterShots]').trigger('click');
				}
			}

			container.name = 'close';

			container.addChild(l);

			container.addChild(label);

			_stage.addChild(container);
		}
		
		/*
		*	@param {object} match
		*	@param {object} ball
		*	@param {array} parts
		*	@param {object} stage
		*	@param {object} container
		*	@return {object}
		*/
		
		function playParts(ball,parts,container,obj){
			
			var i, len, pos, posEnd, part, path, lineSet = new Container(), ballTween, color, label, isHome;
			
			addCloseLink();
			
			isHome = (_match.home.id == obj.teamId);
			
			color = isHome ? '#' + _match.home.color : '#' + _match.away.color;
			
			stopAnimation();
			
			if(_container.children.length > 1){
				_container.children = [_container.children[0]];
			}
			
			container.children.reverse();
			
			$('.' + baseConfig.classNames.fieldClone).hide();
			
			$('.playerList, .tactList').slideUp();
			
			$('.selectedPlayerMap').hide();
			
			Gamecast._isPlaying = true;
			
			//Cache the prev ball, to stop previously running anim
			playParts._ball = ball;
			
			ballTween = Tween.get(ball);
			
			for( i = 1, len = parts.length; i < len; i++ ){
				part = parts[i];
				pos = { x: part.x, y: part.y };
				posEnd = { x: (!isNaN(part.endX)) ? part.endX : part.x , y: (!isNaN(part.endY)) ? part.endY : part.y };
				// posEnd = { x: part.endX, y: part.endY };
				
				/* i want the i, so lets do some Closure Magic! */
				
				(function(i){
					
					path = new Shape();
					
					ballTween
					.wait(100)
					.to(pos,1000)
					.call(function(){
						path.graphics.beginStroke(color);
						(i > 1)	? path.graphics.moveTo(parts[i-1].x,parts[i-1].y) : path.graphics.moveTo(ball.x,ball.y);			
						path.graphics.lineTo(parts[i].x,parts[i].y);
						path.alpha = 1;
						lineSet.addChild(path);
					})
					.wait(100)
					.call(function(){
						var offset = $('#' + baseConfig.canvas).position(),
						popup = $('.' + baseConfig.classNames.popup);
						
						popup.html(parts[i].result).css({ left: this.x + offset.left - (popup.outerWidth()/2), top: this.y + offset.top - popup.outerHeight() - 15 }).fadeIn('fast');
						if(this.color){
							$('b',popup).css('color',this.color);
						}
					})
					.wait(1000).call(function(){
						if( i+1 == len ){
							path.graphics.moveTo(parts[i].x,parts[i].y)
							path.graphics.lineTo(parts[i].endX,parts[i].endY)
						}
						$('.' + baseConfig.classNames.popup).fadeOut();
					});
										
					if( i+1 == len ){
						ballTween
						.to(posEnd,250)
						.call(function(){
							container.children.reverse();
						})
						.wait(500)
						.call(function(){
							animate(part,isHome);
						});
					}
				}(i))
			}
			
			_stage.addChild(lineSet);
			
			ballTween
			.wait(1500)
			.call(function(){
				path.alpha = 0;
			})
			.to({alpha:0},100)
			.to({ x: parts[0].x ,y: parts[0].y, alpha : 1 });
			
			return { ballTween : ballTween }
		}
		
		function getPlayersSide(name){
			var attack = _match && _match.attack; 
			for( var i=0, len = attack.length; i < len; i++ ){
				if( attack[i].player.toLowerCase() == name.toLowerCase() ){
					return ( parseInt(_match.home.id) == parseInt(attack[i].teamId) ) ? 'home' : 'away';
				}
			}
			return null;
		}
		
		function getPlayerAttack(id){
			var attack = _match && _match.attack; 
			for( var i=0, len = attack.length; i < len; i++ ){
				if( parseInt(attack[i].playerId) == parseInt(id) ){
					return attack[i];
				}
			}
			return null;
		}
		
		/*
		*	APIs
		*/
		game.Field = {
			init : init,
			filterPlay : filterPlay,
			renderPlay : renderPlay,
			renderTacticalInformation : renderTacticalInformation,
			filterSection : filterSection,
			renderViewport : renderViewport,
			renderPenalties : renderPenalties,
			filterGoals : filterGoals,
			getGoals : getGoals,
			getGrid : getGrid,
			getPlayers : getPlayers,
			getPlayersSide : getPlayersSide,
			getPlayerAttack : getPlayerAttack,
			updateHeatMap : updateHeatMap,
			renderHeatMap : renderHeatMap,
			stopAnimation : stopAnimation,
			getTeams : getTeams,
			addAttack : addAttack,
			addPlay : addPlay,
			removePlay : removePlay,
			updateScores : updateScores,
			updateClock : updateClock,
			updateGameStatusText : updateGameStatusText,
			updateGameStatus : updateGameStatus,
			clearViewport : clearViewport,
			playWatch : playWatch
		}
	}
	
	Gamecast.Modules.Soccer.Timeline = function(game){
		
		var baseConfig = {
			canvas : 'gcTimelineCanvas',
			height : 100,
			width : 930,
			url : './data/timeline_2.xml',
			timebar : {
				height : 19,
				width : 900,
				leftPadding : 15
			},
			teams : {
				home : {
					topPadding : 17	
				},
				away : {
					topPadding : 65
				}
			},
			popupPadding : 25,
			classNames : {
				timeline : 'gcTimeline',
				popup : 'timelinePopup',
				timebar : 'timebar'
			},
			colors : {
				controls : '#fff',
				background : '#fff',
				halfTime : {
					stroke : '#dbdbdb',
					shadow : '#555',
					background : '#dbdbdb',
					color : '#666'
				},
				fullTime : {
					stroke : '#111',
					background : '#333',
					color : '#fff'
				},
				eventShadow : '#555'
			},
			fonts : {
				fullTime : 'bold 10px Arial',
				teams : 'bold 15px Arial',
				axis : "bold 12px Arial"
			},
			images : {
				axis : daddyUrl + 'timebar.jpg'
			}
		},
		_timelineStage,
		_timelineData,
		_holder,
		_axis,
		_numbers,
		_events;
		
		/*
		*	
		*/
		function init(callback){
			
			var timelineStage,
			background,
			config = game.config && game.config.Timeline || {},
			canvas = config.canvas || baseConfig.canvas,
			url = config.url || baseConfig.url,
			label,
			baseContainer = new Container(),
			holder = new Container();
			
			holder.name = 'holder';
			
			_holder = holder;
			
			_events = new Container();
			
			_events.name = '_eventsContainer';
			
			_holder.addChild(_events);
			
			Gamecast._holder = holder;

			timelineStage = new Stage(canvas);
			
			_timelineStage = timelineStage;
			
			Gamecast._timelineStage = timelineStage;
			
			_timelineStage.offsetLeft = 0;

			timelineStage.mouseEventsEnabled = true;

			timelineStage.onMouseMove = function(e){
				showLabels(e)
			};

			timelineStage.autoClear = true;

			Ticker.setFPS(60);

			Ticker.addListener(timelineStage);

			fetch(url,function(data){
				
				var data = buildDataSet(data),
				clock = parseInt(data.clock);
				
				_timelineData = data;
				
				Gamecast._timelineData = _timelineData;
				
				buildAxis(clock);
				
				renderEvents(data.events, { home: "#" + data.home.color ,away: "#" + data.away.color });
				
				renderTimeline();
				
				setClockMarker( { clock : clock, gameStatusText : data.gameStatusText, gameStatus : data.gameStatus });
				
			},config.xdomain);
			
			baseContainer.name = 'base';
						
			background = new Shape();
			background.graphics.beginFill(baseConfig.colors.background);
			background.graphics.drawRect(0, 0, baseConfig.width, baseConfig.height);

			baseContainer.addChild(background);
			
			timelineStage.addChild(baseContainer);
			
			if(typeof callback == 'function'){
				callback(timelineStage)
			}
			
		}
		
		function buildAxis(clock){
			
			var timelineStage = _timelineStage, i, len, container = _axis || new Container(), background, numbers = new Container();
			
			container.name = 'axis';
			
			for( i = 0, len = (clock < 90) ? 90 : clock; i < len; i = i + 5 ){
				if( i > 0 ){
					var label = new Text(i);
					label.x = (10 * i) + baseConfig.timebar.leftPadding - 7;
					label.y = 56;
					label.font = baseConfig.fonts.axis;
					
					numbers.addChild(label);
				}
			}
			
			_axis = container;
			_numbers = numbers;
			
			_axis.addChild(numbers);
			_holder.addChildAt(_axis,0);
		}
		
		function fetch(url,callback,xdomain){
			game.get(url,function(data){
				if(xdomain){
					//Get the results from YQL
					// data = data.firstChild || data;
				}
				if( typeof callback == 'function'){
					callback(data);
				}
			},xdomain)
		}

		function buildDataSet(data){
			
			var home, away, events = [], clock, video, gameStatus, gameStatusText, obj, i, len, eventNode, eventNodes, eventObj, homeColor, awayColor;

			homeColor = /*game.rgb2hex($('.country h2:first').css('color')) ||*/ $('home',data).attr('color');

			awayColor = /*game.rgb2hex($('.country h2:last').css('color')) || */$('away',data).attr('color');

			home = { name : $('home',data).text(), color : /*'2b579e'*/ homeColor };
			away = { name : $('away',data).text(), color : /*'da2932'*/ awayColor };
			gameStatus = $('gameStatus',data).text();
			gameStatusText = $('gameStatusText',data).text();
			clock = $(data).attr('clock') || $('timeline',data).attr('clock');
			video = $(data).attr('videoEnabled') || $('timeline',data).attr('videoEnabled');
			eventNodes = $('event',data);

			for( i = 0, len = eventNodes.length; i < len ; i ++ ){
				eventNode = $(eventNodes[i]);
				eventObj = {
				    id: eventNode.attr('id'),
				    clock: eventNode.attr('clock'),
				    side: eventNode.attr('side'),
				    type: eventNode.attr('type'),
				    addedTime: eventNode.attr('addedTime'),
				    videoId: eventNode.attr('videoId'),
					result: $('result',eventNode).text()
				}
				events.push(eventObj);
			}

			obj = {
				home : home,
				away : away,
				gameStatus : gameStatus,
				gameStatusText : gameStatusText,
				clock : clock,
				video : video,
				events : events
			};
			
			return obj;
		}
		
		function showLabels(e){
			var offset = $('#' + baseConfig.canvas).position(),
			player = _timelineStage.getObjectsUnderPoint(e.stageX,e.stageY)[0],
			popup = $('.' + baseConfig.classNames.popup);
			
			if(player && player.info){
				popup.html(player.info).css({ left: (player.x) + offset.left - (popup.outerWidth()/2) - _timelineStage.offsetLeft, top: (player.top) + offset.top - popup.outerHeight() - 5 }).fadeIn('fast');
				if(player.goal === true){
					$('#' + baseConfig.canvas).css('cursor','pointer');
				}
				if(player.color){
					$('b',popup).css('color',player.color);
				}
			}else{
				$('#' + baseConfig.canvas).css('cursor','default');
				popup.fadeOut();
			}
		}
		
		function renderTimeline(){
			
			var data = _timelineData, timelineStage = _timelineStage, container, i, len, label, halfTime, halfTimeBg, fullTime, fullTimeBg, teamColor, container = new Container();


			teamColor = new Shape();
			teamColor.graphics.beginFill('#' + data.home.color);
			teamColor.graphics.drawRect(0,17,10,15);

			container.addChild(teamColor);
			
			label = new Text($('<div>' + (data.home.name).toUpperCase() + '</div>').text());
			label.x = 15;
			label.y = 30;
			label.color = "#666";//'#' + data.home.color;
			label.font = baseConfig.fonts.teams;
						
			container.addChild(label);

			teamColor = new Shape();
			teamColor.graphics.beginFill('#' + data.away.color);
			teamColor.graphics.drawRect(0,72,10,15);

			container.addChild(teamColor);
			
			label = new Text($('<div>' + (data.away.name).toUpperCase() + '</div>').text());
			label.x = 15;
			label.y = 85;
			label.color = "#666";//'#' + data.away.color;
			label.font = baseConfig.fonts.teams;
			
			container.addChild(label);
						
			timelineStage.addChild(container);
			
			container = new Container();
			container.name = 'halftime';
			
			halfTime = new Shape();
			halfTime.graphics.beginStroke(baseConfig.colors.halfTime.stroke);
			halfTime.graphics.moveTo(baseConfig.width/2 + 1,0);	
			halfTime.graphics.lineTo(baseConfig.width/2 + 1,100);
			// halfTime.shadow = new Shadow (baseConfig.colors.halfTime.shadow , 1 , 0 , 1 );
			
			container.addChild(halfTime);
			
			halfTimeBg = new Shape();
			halfTimeBg.graphics.beginFill(baseConfig.colors.halfTime.background);
			halfTimeBg.graphics.drawRoundRect(baseConfig.width/2 - 30,85,60,15,3);
			
			container.addChild(halfTimeBg);
			
			label = new Text('HALFTIME');
			label.x = (baseConfig.width/2 - 30) + 9;
			label.y = 96;
			label.color = baseConfig.colors.halfTime.color;
			label.font = '9px Arial'
			
			container.addChild(label);
			
			_axis.addChildAt(container,0);
			
		}
		
		function flushAxisNumbers(){
			return _numbers.parent.children.pop();
		}
		
		function removeChildObject(parent,childName){
			for( var i=0, max = parent.children.length; i < max; i++ ){
				if(parent.children[i] && parent.children[i].name == childName){
					parent.removeChildAt(i);
					return 1;
				}
			}
		}
		
		function setClockMarker(marker){
			
			var timelineStage = _timelineStage, fullTime, holder = _holder, controls, statusMarker = new Container(), label, fullTimeBg, timeBar, background,
			clock = marker.clock, gameStatusText = marker.gameStatusText || _timelineData.gameStatusText, gameStatus = marker.gameStatus || _timelineData.gameStatus;
			
			//Flush Old markers
			
			var ctrls = removeChildObject(timelineStage,'controls');
			
			removeChildObject(holder,'statusMarker');
			
			removeChildObject(_axis,'axisImage');
			
			timeBar = new Bitmap(baseConfig.images.axis);
			// timeBar.x = ((clock * 10) - baseConfig.timebar.width - baseConfig.timebar.leftPadding) - 600;
			timeBar.x = ((clock * 10) - baseConfig.timebar.width + baseConfig.timebar.leftPadding) - 600;
			timeBar.y = 42;
			timeBar.name = 'axisImage';
									
			_axis.addChildAt(timeBar,1);
						
			statusMarker.name = 'statusMarker';
			
			// label = new Text( ( gameStatus && gameStatus.indexOf("FINAL") != -1 || gameStatus && gameStatus == "HT" ) ? gameStatusText : clock + "'");
			label = new Text( gameStatusText );
			label.x = (clock * 10) - (label.getMeasuredWidth()/20) + baseConfig.timebar.leftPadding;
			label.y = 15;
			label.color = baseConfig.colors.fullTime.color;
			label.font = baseConfig.fonts.fullTime;
			label.textAlign = 'center';
			
			fullTime = new Shape();
			fullTime.graphics.beginStroke(baseConfig.colors.fullTime.stroke)
			fullTime.graphics.moveTo((clock * 10) + baseConfig.timebar.leftPadding,0);	
			fullTime.graphics.lineTo((clock * 10) + baseConfig.timebar.leftPadding,100);
			
			statusMarker.addChild(fullTime);
			
			fullTimeBg = new Shape();
			fullTimeBg.graphics.beginFill(baseConfig.colors.fullTime.background);
			fullTimeBg.graphics.drawRoundRect(label.x - (label.getMeasuredWidth() / 2) - 3 ,2,label.getMeasuredWidth() + 6,18,3);
			
			statusMarker.addChild(fullTimeBg);
			
			statusMarker.addChild(label);
			
			holder.addChild(statusMarker);
			
			timelineStage.addChild(holder);
			
			if(ctrls == 1 && clock < 91){
				var test = Tween.get(_holder);
				test.to( {x : 0},750);
				timelineStage.offsetLeft = 0;
			}
						
			if(clock > 90){
				controls = new Container();

				controls.name = 'controls';

				var left = new Shape();

				left.graphics.beginFill(baseConfig.colors.controls);
				left.graphics.drawPolyStar( 40, 51, 8, 3, 0.5, 180 );
				left.alpha = 0;
				left.shadow = new Shadow ( baseConfig.colors.eventShadow , 1 , 1 , 2 );
				left.onClick = function(){
					var test = Tween.get(_holder);
					test.to( {x : 0},750);
					timelineStage.offsetLeft = 0;
					right.alpha = 0.9;
					left.alpha = 0;
				}

				controls.addChild(left);

				var right = new Shape();

				right.graphics.beginFill(baseConfig.colors.controls);
				right.graphics.drawPolyStar( 930, 51, 8, 3, 0.5, 0 );
				right.alpha = 0.9;
				right.shadow = new Shadow ( baseConfig.colors.eventShadow , 1 , 1 , 2 );
				right.leftOffset = right.x;
				
				right.onClick = function(){
					var test = Tween.get(_holder),
					leftOffset = this.leftOffset - ( (clock * 10) - baseConfig.timebar.width );
					test.to( {x : leftOffset },750);
					timelineStage.offsetLeft = - (this.x - ( (clock * 10) - baseConfig.timebar.width ));
					left.alpha = 0.9;
					right.alpha = 0;
				}

				controls.addChild(right);

				timelineStage.addChildAt(controls,4);
								
				//move to the current pos and slide timer
				if(clock > 90){
					right.onClick();
				}
			}
			
		}
		
		function addEvent(eventObject){
			_timelineData.events.push(eventObject);
		}
		
		function updateClock(clock){
			_timelineData.clock = clock;
		}
		
		function updateGameStatusText(gameStatusText){
			_timelineData.gameStatusText = gameStatusText;
		}
		
		function updateGameStatus(gameStatus){
			_timelineData.gameStatus = gameStatus;
		}

		function renderEvents(events,colors){
			
			var timelineStage = _timelineStage, i, len, eventNode, y, x, type, color, isHome, eventsContainer = _holder || new Container(), events = events || _timelineData.events,
			colors = colors || { home: "#" + _timelineData.home.color ,away: "#" + _timelineData.away.color };
			
			//flush cache
			_events.children = [];
			Gamecast.Modules.Soccer.Timeline.renderedEvent['home'] = null;
			Gamecast.Modules.Soccer.Timeline.renderedEvent['away'] = null;
			
			for( i = 0, len = events.length; i < len; i++ ){
				eventNode = events[i];
				isHome = (eventNode.side == 'home') ? true : false;
				y =  isHome ? baseConfig.teams.home.topPadding : baseConfig.teams.away.topPadding;
				x = parseInt(eventNode.clock) * 10 + baseConfig.timebar.leftPadding - 7;
				type = eventNode.type;
				color = isHome ? colors.home : colors.away;
				eventNode.x = x;
				eventNode.y = y;
				eventNode.color = color;
				eventNode.eventsContainer = eventsContainer;
				renderEvent(eventNode)
			}
			
		}
				
		/*
		*	@param {object} eventNode
		*/
		
		function renderEvent(eventNode){
			
			var text = eventNode.result,
			timelineStage = _timelineStage,
			x = eventNode.x,
			y = eventNode.y,
			id = eventNode.id,
			type = eventNode.type,
			clock = eventNode.clock,
			count,
			image,
			renderedEvent,
			eventImg,
			pointer,
			pointerY,
			isAway = (eventNode.side == 'away') ? true : false,
			color = (isAway) ? _timelineData.away.color : _timelineData.home.color,
			container = _events || new Container(),
			lang = game.language || 'en';
			
			switch(type){
				case 'goal':
					image = daddyUrl + 'goal_icon.png';
					if(text.toLowerCase().indexOf('own goal') != -1){
						image = daddyUrl + 'goal_icon_red.png';
					}
				break;
				case 'substitution':
					image = daddyUrl + 'substitution.png';					
				break;
				case 'yellowCard':
					image = daddyUrl + 'yellowCard.png';					
				break;
				case 'redCard':	
					image = daddyUrl + 'redCard.png';					
				break;
				default:
				break;
			}
			
			renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
			
			if(!renderedEvent[eventNode.side]){
				renderedEvent[eventNode.side] = {};
			}
			
			if(!renderedEvent[eventNode.side][clock]){
				renderedEvent[eventNode.side][clock] = [];
			}
			
			renderedEvent[eventNode.side][clock].push(id);
			
			count = renderedEvent[eventNode.side][clock].length;
			
			x = x + (count * 5);
			
			y = isAway ? y + (count * 5) - 5 : y - (count * 5) + 5;
			
			if(count == 1){
				pointer = new Shape();
				pointer.name = eventNode.side + '-' + clock;
				pointer.graphics.beginFill(color);
				pointerY = (isAway) ? y - 1 : y + 23;
				pointer.graphics.drawPolyStar( x + 3, pointerY, 5, 3, 0.5, (isAway) ? -90 : 90 );
				container.addChild(pointer);	
			}
						
			eventImg = new Bitmap(image);
			eventImg.x = x + 3 - 8 + 0.5;  //(x+3) : x of pointer , 0.5 pointer of radius, 8: 1/2 img w
			eventImg.y = y + 5;
			eventImg.info = text;
			eventImg.id = id;
			eventImg.top = eventImg.y;
			eventImg.color = (!isAway) ? '#' + _timelineData.home.color : '#' + _timelineData.away.color;
			eventImg.clock = clock;
			eventImg.side = eventNode.side;
			
			if(eventNode.videoId && Gamecast.edition == 'us' && window.country == 'united states'){
				var play = new Bitmap(daddyUrl + 'play_icon.png');
				play.x = x + 3 - 8 + 2;  //(x+3) : x of pointer , 0.5 pointer of radius, 8: 1/2 img w
				play.y = y + 5 - 15;
				play.info = text;
				play.id = id;
				play.top = eventImg.y - 15;
				play.color = (!isAway) ? '#' + _timelineData.home.color : '#' + _timelineData.away.color;
				play.clock = clock;
				play.side = eventNode.side;
				
				if(isAway){
					play.x = x - 1.5;
					play.y = y + 17 + 5;
					play.top = eventImg.y + 10;
				}
				container.addChild(play);
			}
			
			if(!isAway){
				eventImg.rotation = 180;
				eventImg.x = x + 8 + 2;
				eventImg.y = y + 17;
			}
			
			if(type == 'goal'){
				eventImg.goal = true;
				eventImg.onPress = function(){
					if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
						$('li[data-div="filterGoals"]').trigger('click');
						Gamecast.Modules.Soccer.Field.renderPlay(eventImg.id);
					}
				}
			}
			
			//TODO : add watch function
			if(play){
				play.goal = true;
				eventImg.onPress = play.onPress = function(){
					if(!Gamecast._isPlaying){
						Gamecast.Field.playWatch(eventNode.videoId);
					}
				};
			}
			
			container.addChild(eventImg);
			
		}
		
		function removeEvent(id){
			var events = _timelineData.events;
			for( var i=0, len = events.length; i < len; i++){
				var ev = events[i];
				if(parseInt(id) == parseInt(ev.id)){
					var newEvents = game.removeElementFromArray(events,ev);
					_timelineData.events = newEvents;
					return ev;
				}
			}			
		}
		
		/*
		*	APIs
		*/
		game.Timeline = {
			init : init,
			renderEvent : renderEvent,
			renderEvents : renderEvents,
			addEvent : addEvent,
			buildAxis : buildAxis,
			updateClock : updateClock,
			updateGameStatus : updateGameStatus,
			updateGameStatusText : updateGameStatusText,
			setClockMarker : setClockMarker,
			removeChildObject : removeChildObject,
			flushAxisNumbers : flushAxisNumbers,
			removeEvent : removeEvent
		};
		
		Gamecast.Modules.Soccer.Timeline.renderedEvent = {};
	};

	Gamecast.prototype = {
		init : function(){
			// console.log('1377')
		},
		getColorPercent : function(start, end, percent){
			function hex2dec(hex){return(parseInt(hex,16));}
			function dec2hex(dec){return (dec < 16 ? "0" : "") + dec.toString(16);}
			var r1 = hex2dec(start.slice(0,2)), g1=hex2dec(start.slice(2,4)), b1=hex2dec(start.slice(4,6));
			var r2 = hex2dec(end.slice(0,2)),   g2=hex2dec(end.slice(2,4)),   b2=hex2dec(end.slice(4,6));
			var pc = percent/100;
			var r  = Math.floor(r1+(pc*(r2-r1)) + .5), g=Math.floor(g1+(pc*(g2-g1)) + .5), b=Math.floor(b1+(pc*(b2-b1)) + .5);
			return("#" + dec2hex(r) + dec2hex(g) + dec2hex(b));
		},
		toTitleCase : function(str){
			return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		},
		getLocalizedText : function(language,text){
			
			// text = $.trim(text.toLowerCase());
			
			var languageMap = {
				"COMPLETE TEAM" : {
					"es" : "PLANTEL COMPLETO"
				}
			};
			
			return languageMap[text] && languageMap[text][language] && this.toTitleCase(languageMap[text][language]) || text;
		},
		wait : (function(){
		  var timer = 0;
		  return function(callback, ms){
		    clearTimeout (timer);
		    timer = setTimeout(callback, ms);
		  };
		})(),
		sortArray : function(array,index){
			var x = [];
			for( var i=0, len = array.length; i <len; i++ ){
				if(i !== index){
					x.push(array[i])
				}
			}
			x.push(array[index]);
			return x;
		},
		get : function(url,callback,xdomain){
			if(xdomain){
				if ((navigator.userAgent.toLowerCase().indexOf('msie') != -1) && window.XDomainRequest) {					
				    // Use Microsoft XDR
				    var xdr = new XDomainRequest();
				    xdr.open("get", 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url + '"'));
				    xdr.onload = function() {
						callback($.parseXML(xdr.responseText));
				    };
				    xdr.send();
				    return 1;
				}
				return $.get('http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + url +'"') ,callback);
			}else{
				return $.get(url,callback);
			}
		},
		removeElementFromArray : function(arr,child){
			var x = [];
			for( var i=0, len = arr.length; i < len; i++){
				if(arr[i] != child){
					x.push(arr[i])
				}
			}
			return x;
		},
		rgb2hex: function(rgb) {
			if(!rgb){
				return null;
			}
		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    function hex(x) {
		        return ("0" + parseInt(x).toString(16)).slice(-2);
		    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		},
		extendDeep : function(parent, child) {
		    var i,
		    toStr = Object.prototype.toString,
		    astr = "[object Array]",
		    child = child || {};
		
		    for (i in parent) {
		        if (parent.hasOwnProperty(i)) {
		            if (typeof parent[i] === "object") {
		                child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
		                this.extendDeep(parent[i], child[i]);
		            } else {
		                child[i] = parent[i];
		            }
		        }
		    }
		    return child;
		},
		name : 'Gamecast',
		version : '1.0',
		getName : function(){
			return this.sport + ' ' + this.name;
		},
		copyrights : "© ESPN International",
		author : 'Nihar.Kabinittal@espn.com'
	}
	window.Gamecast = Gamecast;
}());$(document).ready(function(){
	
	"use strict";
	
	var params = getParams(),
	isDev = params.dev || 0,
	sessionName = Gamecast.sessionId || params.sessionName;
	
	makeCasterConnection(isDev,sessionName,params);
	
	if(!isCanvasSupported()){
		$('#gcField').replaceWith('<div id="gcFieldVector" width="585" height="374" class="left clearBoth"></div>');
		$('#gcTimelineCanvas').replaceWith('<div id="gcTimelineVector" width="970" height="100" class="left clearBoth"></div>');
	}
	
	var matchId = Gamecast.matchId || params.id || 318146,
	lang = params.lang || 'en',
	langId = (Gamecast.langId == "es") ? 1 : 0,
	gameCastOptions = {
		language : Gamecast.langId,
		sport : 'Soccer',
		modules : ["Timeline","Field"], //or use "*" to load all modules
		callback : onLoadGameCast,
		config : {
			Timeline : {
				url : 'http://www.espnfc.com/gamepackage10/data/timeline?gameId=' + matchId +  '&langId=' + langId + '&snap=0',
				xdomain : true
			},
			Field : {
				url : 'http://www.espnfc.com/gamepackage10/data/gamecast?gameId=' + matchId + '&langId=' + langId + '&snap=0',
				xdomain : true,
				logo:{
					path : './images/espn-logo.png',
					width : 171,
					height : 43,
					opacity : 0.15
				},
				enableLogo : false
			},
			Watch : {
				url : 'http://espn.go.com/espn3/feeds/marker/getMarkers?gameId=303630012', //should pass match id
				xdomain : true,
				width : 768, 
				height : 432
			}
		}
	};
	
	//disable cross domain request on prod
	if(window.location.href.indexOf('http://www.espnfc.com') != -1 || window.location.href.indexOf('http://espnfc.com') != -1){
		gameCastOptions.config.Timeline.url = '/gamepackage10/data/timeline?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Timeline.xdomain = false;
		gameCastOptions.config.Field.url = '/gamepackage10/data/gamecast?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Field.xdomain = false;
	}
	
	if(window.location.href.indexOf('http://test.espn.go.com') != -1){
		gameCastOptions.config.Timeline.url = '/soccernet/gamepackage10/data/timeline?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Timeline.xdomain = false;
		gameCastOptions.config.Field.url = '/soccernet/gamepackage10/data/gamecast?gameId=' + matchId +  '&langId=' + langId + '&snap=0';
		gameCastOptions.config.Field.xdomain = false;
	}
	
	new Gamecast(gameCastOptions);
	
	function onLoadGameCast(gamecast){
				
		// console.log(gamecast, 'HTML5 ' + gamecast.getName() + ' ' + gamecast.version + ' ' + gamecast.copyrights + ', author ' + gamecast.author);
		
		var timeline = gamecast.Timeline,
		gamecastDiv = $('#soccerGameCast');
		
		Gamecast.Timeline = gamecast.Timeline;
		Gamecast.Field = gamecast.Field;
		
		timeline.init(function(timelineStage){
			Gamecast.setClock = timeline.setClockMarker;
			Gamecast.renderEvent = timeline.renderEvent;
		});
		
		var field = gamecast.Field,
		firstHalf = function(play){ if(play.clock <= 45 && play.shootout == 'f'){ return true; } },
		secondHalf = function(play){ if(play.clock > 45 && play.clock <= 90 && play.shootout == 'f'){ return true; } },
		extraTime = function(play){ if(play.clock > 90 && play.shootout == 'f'){ return true; } },
		justGoals = function(play){ if( play.goal == 't' && play.shootout == 'f'){ return true; } },
		justShots = function(play){ if( play.shootout == 'f'){ return true; } };
		
		field.init(function(match,stage){
			
			gamecastDiv
			.delegate('.closeWatch','click',function(){
				espn.video.pause();
				$('#gcField, #gcFieldVector').css('visibility','visible');
				$('.videoplayer').height('0px');
				$(this).hide();
				//$('li[data-div=filterShots]').trigger('click');
				if(Gamecast._match.gameStatusText != "V"){
					$('li.appliedFilter').filter(':visible').trigger('click');
				}
			})
			.delegate('.activeGame .reset','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					filtered.set = field.filterSection(Gamecast._match.set,justShots)
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
					$('.soccerGameCast .selectedPlayerMap').hide();
				}
			})
			.delegate('.activeGame .resetGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					filtered.set = field.filterSection(Gamecast._match.set,justGoals)
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
					$('.soccerGameCast .selectedPlayerMap').hide();
				}
			})
			.delegate('.activeGame .showPenalties','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					field.clearViewport();
					var penalties = Gamecast.Field.filterSection(Gamecast._match.set,function(play){ if( play.shootout == 't'){ return true; } });
					if(penalties.length){
						field.renderPenalties();
					}
				}
			})
			.delegate('.activeGame .firstHalf','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					filtered.set = field.filterSection(Gamecast._match.set,firstHalf);
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
					$('.soccerGameCast .selectedPlayerMap').hide();
				}
			})
			.delegate('.activeGame .secondHalfGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					var set = field.filterSection(Gamecast._match.set,secondHalf);
					filtered.set = field.filterGoals(set);
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .firstHalfGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var set = field.filterSection(Gamecast._match.set,firstHalf);
				
					var filtered = {
						home : match.home,
						away : match.away,
						set : field.filterGoals(set)
					};
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .extraGoals','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {};
					var set = field.filterSection(Gamecast._match.set,extraTime);
					filtered.set = field.filterGoals(set);
					filtered.home = match.home;
					filtered.away = match.away;
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .extraShots','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {
						home : match.home,
						away : match.away,
						set : field.filterSection(Gamecast._match.set,extraTime)
					};
				
					field.renderViewport(filtered);
				}
			})					
			.delegate('.activeGame .secondHalf','click',function(){
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
					var filtered = {
						home : match.home,
						away : match.away,
						set : field.filterSection(Gamecast._match.set,secondHalf)
					};
				
					field.renderViewport(filtered);
				}
			})
			.delegate('.activeGame .homeTacticalInfoStart','click',function(){
				field.renderTacticalInformation(match.home.id);
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .homeTacticalInfoAvg','click',function(){
				field.renderTacticalInformation(Gamecast._match.home.id,'average');
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .awayTacticalInfoStart','click',function(){
				field.renderTacticalInformation(match.away.id);
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .awayTacticalInfoAvg','click',function(){
				field.renderTacticalInformation(Gamecast._match.away.id,'average');
				$('.soccerGameCast .selectedPlayerMap').hide();
			})
			.delegate('.activeGame .heatMapHome','click',function(){
				var sel = $('.soccerGameCast .selectedPlayerMap'); 
				var map = match.attack[0].grid.split('~');
				field.renderHeatMap(map);
				$('.soccerGameCast .selectedPlayerMap').show().text($(this).text()).css({'left':(585/2)-(sel.outerWidth()/2),color: '#' + Gamecast._match.home.color});
			})
			.delegate('.activeGame .heatMapAway','click',function(){
				var sel = $('.soccerGameCast .selectedPlayerMap'); 
				var map = match.attack[1].grid.split('~');
				field.renderHeatMap(map);
				$('.soccerGameCast .selectedPlayerMap').show().text($(this).text()).css({'left':(585/2)-(sel.outerWidth()/2),color: '#' + Gamecast._match.away.color});
			})
			.delegate('.activeGame .heatMap','click',function(){
				var sel = $('.soccerGameCast .selectedPlayerMap');
				var id = $(this).data('player-id');
				var grid = field.getGrid(match.attack,id);
				if(grid){
					field.renderHeatMap(grid);
					$('.soccerGameCast .selectedPlayerMap').show().text($(this).text()).css({'left':(585/2)-(sel.outerWidth()/2),color:$(this).parents('table').css('borderTopColor')});
				}
			})
			.delegate('.activeGame .tabWrap table','click',function(){
				$(this).parents('.playerList, .tactList').slideUp();
			})
			.delegate('.activeGame .tabWrap li','click',function(){
				$('.tabWrap li').removeClass('appliedFilter');
				$(this).addClass('appliedFilter');
			})
			.delegate('.activeGame .perspective-container','click',function(){
				$(this).fadeOut();
			})
			.delegate('.activeGame .filterTabs li','click',function(){
				var self = $(this),
				div = self.data('div'),
				txt = self.text();
				
				$('.filterTabs li.selected').removeClass('selected');
				self.addClass('selected');
				$('.tabWrap div').removeClass('active');
				
				if(txt == "Goals" || txt == "Shots" || txt == "Disparos" || txt == "Goles"){
					$('.' + div + ' li:first').addClass('appliedFilter').trigger('click');
					$('.' + div).addClass('active');
				}else{
					if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
						$('.' + div).addClass('active');
						field.stopAnimation();
						field.clearViewport();
						Gamecast.Field.update();
						$('.soccerGameCast .playerList, .soccerGameCast .tactList').hide().slideDown();	
						$('.soccerGameCast .selectedPlayerMap').hide();
					}
				}
			});
			
			var teams = field.getTeams(),
			table;

			table = '<div class="tactList"><table class="homeTeam top-mark" style="border-top-color:' + teams.home.color + '">'
						+ '<tbody>' 
							+ '<tr class="homeTacticalInfoStart"><td>Start Position</td></tr>'
							+ '<tr class="homeTacticalInfoAvg"><td>Average Position</td></tr>'
						+ '</tbody>'
					+ '</table>'
					+ '<table class="awayTeam top-mark" style="border-top-color:' + teams.away.color + '">'
						+ '<tbody>' 
							+ '<tr class="awayTacticalInfoStart"><td>Start Position</td></tr>'
							+ '<tr class="awayTacticalInfoAvg"><td>Average Position</td></tr>'
						+ '</tbody>'
					+ '</table></div>';

			$('.showTacticalInformation',gamecastDiv).append(table);
			
			Gamecast.Field.update = function(){
				
				var players,
				list = '<div class="fauxTopBorder"></div>',
				goals = field.getGoals(true),
				str,
				i,
				j,
				leng,
				player,
				position,
				team,
				isHome,
				teamName,
				color,
				time;
				
				var t1 = $('.stat-table:first tr');
				var t2 = $('.stat-table:last tr');
				var comp = (Gamecast.langId == 'es') ? 'PLANTEL COMPLETO' : 'COMPLETE TEAM';
				
				if(t1.length && t2.length){
					list += buildPlayerList(t1,'home') + buildPlayerList(t2,'away');
				}else{
					players = field.getPlayers(Gamecast._match.attack,function(attack){ if(attack.grid){ return true; }else{ return false; } });
					
					for( j in players ){
						team = players[j];
						isHome = (match.home.id == j);
						teamName = (isHome) ? match.home.name : match.away.name;
						color = (isHome) ? match.home.color : match.away.color;
						list += '<table class="top-mark ' + (isHome ? '_home' : '_away') + '" style="border-top-color: #' + color + '">';
						list += '<tr><td class="' + (isHome ? 'heatMapHome' : 'heatMapAway') + '" >' + comp + '</td></tr>';
						for( i=0, leng = team.length;i < leng; i++ ){
							player = team[i];
							position = player.position ? "<em>" + player.position + " - </em>" : '';
							list +=	'<tr><td class="heatMap" data-player-id="' + player.id + '">' + position + player.name + '</em></td></tr>'
						}
						list += '</table>';
					}
				}
				
				function buildPlayerList(rows,side){
					var cache = {};
					var color = (side == 'home') ? match.home.color : match.away.color;
					var classMark = (side == 'home') ? '_home' : '_away';
					var list = '<table class="top-mark ' + classMark + '" style="border-top-color: #' + color + '">';
					var className = (side == 'home') ? 'heatMapHome' : 'heatMapAway';
					var comp = (Gamecast.langId == 'es') ? 'PLANTEL COMPLETO' : 'COMPLETE TEAM';
					list += '<tr><td class="' + className + '" >' + comp + '</td></tr>';

					for (var i = 0, max = rows.length; i < max; i++) {
						var pos = "<em>" + $('.first', rows[i]).text() + " - </em>";
						var anchor = $('.last a', rows[i]);
						var name = anchor.text();
						var href = anchor.attr('href');
						var id;
						if(href){
							id = parseInt(href.split('/')[3]);
							id = (isNaN(id)) ? parseInt(href.split('/')[4]) : id;
							id = (isNaN(id)) ? parseInt(href.split('/')[6]) : id;
						}
						if(id && name && pos){
							if(!cache[id]){
								cache[id] = 1;
								list +=	'<tr><td class="heatMap" data-player-id="' + id + '">' + pos + name + '</em></td></tr>'
							}
						}
					}
					list += '</table>';
					
					return list;
				}

				$('.showHeatMaps',gamecastDiv).html('<div class="playerList">' + list + '</div>');
				
				$('.fauxTopBorder',gamecastDiv).css('background-color','#' + match.away.color);
				
			}
			
		})
	}
	
	function updateMarker(gameId,obj){
		if(gameId.split('-')[2] != matchId){
			return false;
		}
		var values = obj[2].split('|');
		var clock = parseInt(values[0].replace("'",''));
		if($.trim(obj[3]) == 'live' && clock == 1){
			Gamecast.Field.clearViewport();
		}
		if(obj[3] && $.trim(obj[3]) != 'pregame' && (clock > 0)){
			Gamecast.setClock( { clock: clock, gameStatusText:values[0] } );
			if(!Gamecast.started){
				Gamecast.started = true;
				Gamecast.Field.clearViewport();
			}
		}
	}
	
	function updateAttacks(gameId,value){
		var gameVals = gameId.split('-');
		if(gameVals[0] != matchId){
			return false;
		}
		var values = value.split('|');
		var jersey = values[0];
		var player = values[1];
		var playerId = parseInt(gameVals[3]);
		var teamId = gameVals[2];
		var position = values[3];
		var x = values[12];
		var y = values[13];
		var avgX = values[10];
		var avgY = values[11];
		var grid = '';
		var old = Gamecast.Field.getPlayerAttack(gameVals[3]);
		if(old.grid){
			grid = old.grid
		}
		var obj = { avgX : avgX, avgY : avgY, grid : grid, gridMax : null, jersey : jersey, left : '0' , middle : '0' , player: player, playerId : playerId , posX : x, posY : y , right:'0' , position : position , teamId : teamId };
		Gamecast.Field.addAttack(obj);
		if(avgX >0 && avgY > 0){
			Gamecast.Field.updateHeatMap(obj,avgX,avgY);
			var vis = $('li[data-div=showHeatMaps],li[data-div=showTacticalInformation]').is(':visible');
			if(!updateAttacks.enabled && !vis){
				$('li[data-div=showHeatMaps],li[data-div=showTacticalInformation]').show();
				updateAttacks.enabled = true;
			}
			if(vis && !updateAttacks.enabled){
				updateAttacks.enabled = true;
			}
		}
	}
	updateAttacks.enabled = false;
	
	function updateTimelinePos(gameId,value){
		
		if(matchId != gameId.split('-')[1]){
			return false;
		}

		var values = value.split('|'),
		clock = values[2],
		gameStatus = values[4],
		gameStatusText = values[5],
		homeScore = values[0],
		awayScore = values[1],
		pens = values[3];
		
		//penalties - change the field, add empty markers
		if(pens == 'p'){
			$('li[data-div=filterShots]').trigger('click');
			$('.showPenalties:first').trigger('click');
			Gamecast.Field.renderPenalties(1);
		}

		if(clock > 90){
			//rebuild axis
			Gamecast.Timeline.flushAxisNumbers();
			Gamecast.Timeline.buildAxis(120);
		}
		
		if(gameStatus == 'INPROGRESS' || gameStatus == 'SHOOTOUT' || gameStatus.indexOf('FINAL') != -1 || gameStatus == 'FINAL/SHOOTOUT'){
			Gamecast.setClock( {clock:clock, gameStatus:gameStatus, gameStatusText:gameStatusText } );

			if(!Gamecast.started){
				Gamecast.started = true;
				Gamecast.Field.clearViewport();
			}

			//update the object
			Gamecast._match.gameStatus = gameStatus;
			Gamecast._match.gameStatusText = gameStatusText;
			Gamecast._match.clock = clock;
			Gamecast._match.homeScore = homeScore;
			Gamecast._match.awayScore = awayScore;			
		}
	}
	
	function addEventToTimeline(gameId,value){
		if(matchId != gameId.split('-')[1]){
			return false;
		}
		var values = value.split('|');
		if(gameId.indexOf('t') != -1){
			
			var type = values[3];
			
			if( type == 'substitution' || type == 'yellowCard' || type == 'redCard' ){
				var id = values[0];
				var clock = values[1];
				var extra = values[2];
				if(type == 'substitution'){ extra = '' }
				var side = values[2];
				var y = (side == 'home') ? 17 : 65;
				var x = parseInt(clock) * 10 + 15 - 7;//parseInt(clock) * 10 - 7;
				var type = values[3];
				var res;
				var text = (langId == 0) ? values[4] : values[5];
				var pens = values[12];
				
				if(type == 'substitution'){
					var on = (langId == 0) ? 'On': 'Cambio-Entra';
					var off = (langId == 0) ? 'Off': 'Cambio-Sale';
					res = "<b>" + on + ": " + values[8] + '</b> - ' + clock + "'" + extra + "<br>" + off + ': ' + values[10];	
				}else if( type == 'yellowCard' || type == 'redCard' ){
					res = '<b>' + values[8] + '</b> - ' + clock + "'<br>" + text;
				}
				
				if(addEventToTimeline.cache[id]){
					var old = Gamecast.Timeline.removeEvent(values[0]);
					Gamecast.Timeline.renderEvents();
					delete addEventToTimeline.cache[values[0]];
				}
					
				var renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
				var alreadyAdded = false;
				for (var i in renderedEvent[side]) {
					if($.inArray(id,renderedEvent[side][i]) != -1){
						//already added
						alreadyAdded = true;
					}
				}
				if(!alreadyAdded){
					addEventToTimeline.cache[id] = 1;
					var ev = { result : res , x: x , y: y, id: id, type: type, clock: clock , side: side, videoId : values[12] || old && old.videoId || '' };
					Gamecast.Timeline.addEvent(ev);
					Gamecast.renderEvent(ev);						
				}
			}
			
			if( values[7].indexOf('Goal') != -1 && pens != 'p' && values[11] != 't'){
				var id = values[0];
				var clock = values[1];
				var extra = values[2];
				var side = Gamecast.Field.getPlayersSide(values[6]);
				var y = (side == 'home') ? 17 : 65;
				var x = parseInt(clock) * 10 + 15 - 7;
				var type = 'goal';
				var text = (langId == 0) ? values[7] : values[8];
				var res = '<b>' + values[6] + '</b> - ' + clock + "'" + extra + "<br>" + text;
				
				if(addEventToTimeline.cache[id]){
					var old = Gamecast.Timeline.removeEvent(values[0]);
					Gamecast.Timeline.renderEvents();
					delete addEventToTimeline.cache[values[0]];
				}
				
				var renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
				var alreadyAdded = false;
				for (var i in renderedEvent[side]) {
					if($.inArray(id,renderedEvent[side][i]) != -1){
						//already added
						alreadyAdded = true;
					}
				}
				if(!alreadyAdded){
					addEventToTimeline.cache[id] = 1;
					var ev = { result : res , x: x , y: y, id: id, type: type, clock: clock , side: side, videoId: values[10] || old && old.videoId || '' };
					Gamecast.Timeline.addEvent(ev);
					Gamecast.renderEvent(ev);
				}
			}
			
			if( values[7].indexOf('Goal') != -1 || values[7].indexOf('Shot') != -1 || values[7].indexOf('Free Kick') != -1 || values[7].indexOf('Penalty') != -1 ){
				
				var allParts = values.slice(19);
				var partsAr = [];
				
				for( var i=0, len = allParts.length; i < len ; i++){
					if(allParts[i]){
						var parts = allParts[i].split('^');
						var text = (langId == 0) ? parts[9] : parts[11];
						var resultText = (langId == 0) ? parts[10] : parts[12];
						var temp = {
					        "pId": parts[0],
					        "jersey": parts[1],
					        "startX": parts[2],
					        "startY": parts[3],
					        "endX": parts[5],
					        "endY": parts[6],
					        "endZ": parts[7],
					        "player": parts[8],
					        "result": "<b>" + parts[8] + "</b><br>" + text,
					        "resulttext": resultText
					    };
						partsAr.push(temp);
						if(parts[0]){
							var playerAttack = Gamecast.Field.getPlayerAttack(parts[0]);
							if(playerAttack && parts[2] && parts[3]){
								Gamecast.Field.updateHeatMap(playerAttack,parts[2],parts[3]);
							}	
						}	
					}
				}
				
				var text = (langId == 0) ? values[7] : values[8];

				var newPlay = {
				    "id": values[0],
				    "clock": values[1],
				    "addedTime": values[2],
				    "period": values[12],
				    "startX": parts[2],
				    "startY": parts[3],
				    "teamId": values[3],
				    "goal": values[4],
				    "ownGoal": values[5],
				    "videoId": values[10],
				    "shootout": values[11],
				    "player": values[6],
				    "result": "<b>" + values[6] + " </b> - " + values[1] + "'" + values[2] + "<br>" + text,
				    "shotbytext": "",
				    "topscoretext": "",
				    "parts": partsAr
				}
				Gamecast.Field.addPlay(newPlay);
				
				var id = values[0];
				
				var isShootout = (values[11] == 't') ? true : false;
				
				var isGoal = values[4];
				
				if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){	
					
					if(!Gamecast._playedAnim[id]){
						Gamecast._playedAnim[id] = 0;
					}
					
					var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
					var playShot = true;

					if(shootoutInProgress && !isShootout){
						playShot = false;
					}

					if(!shootoutInProgress){
						$('li.appliedFilter').trigger('click');
					}
					
					if(Gamecast._playedAnim[id] < 2 && Gamecast._match.gameStatus.indexOf('FINAL') == -1 && playShot && Gamecast._match.gameStatus != 'FINAL/SHOOTOUT'){
						Gamecast.Field.renderPlay(values[0],isShootout);
						Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
					}
					
					if(isShootout && (Gamecast._playedAnim[id] >= 1) && values[10]){
						Gamecast.Field.renderPenalties(null,null,id,true);
					}
				}
				if(Gamecast._isPlaying && $('.videoplayer').height() == 0 && (isGoal == 't' || isShootout) && Gamecast._match.gameStatus.indexOf('FINAL') == -1){
					Gamecast._queue.push({id:id,isShootout:isShootout});
				}
			}			
		}
	}
	addEventToTimeline.cache = {}
	
	function updateEvents(gameId,value){
		var details = gameId.split('-')
		if(matchId != details[1]){
			return false;
		}
		var values = value.split('|');
		
		if(details[2] == 'add'){
			var id = values[0];
			var clock = values[1];
			var added = values[2];
			var teamId = values[3];
			var playerId = values[7];
			var jersey = values[8];
			var x = values[9];
			var y = values[10];
			var player = values[11];
			var result = (langId == 0) ? values[12] : values[13]; //18,20
			var resultText = (langId == 0) ? values[12] : values[13];
			var shootout = values[6];
			var isGoal = values[4];
			var ownGoal = values[5];
			var videoId = values[16];
			
			var newPlay = {
			    "id": id,
			    "clock": clock,
			    "addedTime": "",
			    "period": "",
			    "startX": x,
			    "startY": y,
			    "teamId": teamId,
			    "goal": isGoal,
			    "ownGoal": ownGoal,
			    "videoId": videoId,
			    "shootout": shootout,
			    "player": player,
			    "result": "<b>" + player + " </b> - " + clock + "'" + "<br>" + result,
			    "shotbytext": "",
			    "topscoretext": "",
			    "parts": [{
			        "pId": playerId,
			        "jersey": jersey,
			        "startX": x,
			        "startY": y,
			        "endX": x,
			        "endY": y,
			        "endZ": "",
			        "player": player,
			        "result": "<b>" + player + "</b><br>" + result,
			        "resulttext": resultText
			    }]
			}
			
			Gamecast.Field.addPlay(newPlay,true);
			
			var isShootout = (shootout == 't') ? true : false;
			
			// if(videoId && Gamecast.edition == 'us' && ($('.videoplayer').height() == 0)){
			// 	Gamecast.Field.playWatch(videoId);
			// }else if
			if(!Gamecast._isPlaying && ($('.videoplayer').height() == 0)){
				
				if(!Gamecast._playedAnim[id]){
					Gamecast._playedAnim[id] = 0;
				}
				
				var shootoutInProgress = (Gamecast._match.gameStatus.toLowerCase().indexOf('shootout') != -1);
				var playShot = true;

				if(shootoutInProgress && !isShootout){
					playShot = false;
				}

				if(!shootoutInProgress){
					$('li.appliedFilter').trigger('click');
				}

				if(Gamecast._playedAnim[id] < 1 && (isGoal == 't' || isShootout) && playShot && Gamecast._match.gameStatus.indexOf('FINAL') == -1 && Gamecast._match.gameStatus != 'FINAL/SHOOTOUT'){
					Gamecast.Field.renderPlay(id,isShootout);
					Gamecast._playedAnim[id] = Gamecast._playedAnim[id] + 1;
				}
				
				if(isShootout && (Gamecast._playedAnim[id] >= 1) && videoId){
					Gamecast.Field.renderPenalties(null,null,id,true);
				}
			}
			
			if(Gamecast._isPlaying && $('.videoplayer').height() == 0 && (isGoal == 't' || isShootout) && Gamecast._match.gameStatus.indexOf('FINAL') == -1){
				Gamecast._queue.push({id:id,isShootout:isShootout});
			}
			
			//add to timeline
			if(isGoal == 't'){
				var side = (teamId == Gamecast._match.home.id) ? 'home' : 'away';
				var y = (side == 'home') ? 17 : 65;
				var x = parseInt(clock) * 10 + 15 - 7;
				var type = 'goal';
				var res = '<b>' + player + '</b> - ' + clock + "'" + "<br>" + result;
				
				if(addEventToTimeline.cache[id]){
					var old = Gamecast.Timeline.removeEvent(values[0]);
					Gamecast.Timeline.renderEvents();
					delete addEventToTimeline.cache[values[0]];
				}
				
				if(added != 'p'){
					var renderedEvent = Gamecast.Modules.Soccer.Timeline.renderedEvent;
					var alreadyAdded = false;
					for (var i in renderedEvent[side]) {
						if($.inArray(id,renderedEvent[side][i]) != -1){
							//already added
							alreadyAdded = true;
						}
					}
					if(!alreadyAdded){
						addEventToTimeline.cache[id] = 1;
						var ev = { result : res , x: x , y: y, id: id, type: type, clock: clock , side: side, videoId: videoId || old && old.videoId || '' };
						Gamecast.Timeline.addEvent(ev);
						Gamecast.renderEvent(ev);
					}
				}
			}
			
		}
		
		if(details[2] == 'remove' && values[0] && values[0] != "null"){
			//Remove shot/s and icon 
			Gamecast.Field.removePlay(values[0]);
			$('.gamecastFilters .appliedFilter').trigger('click');
			
			Gamecast.Timeline.removeEvent(values[0]);
			Gamecast.Timeline.renderEvents();
			
			delete addEventToTimeline.cache[values[0]];
		}
		
	}
	
	/*
	*	APIs
	*/
	Gamecast.Caster = {
		updateMarker : updateMarker,
		updateAttacks : updateAttacks,
		updateTimelinePos : updateTimelinePos,
		addEventToTimeline : addEventToTimeline,
		updateEvents : updateEvents
	};
	
	function getParams(){
		var params = {}, param, val, paramStr = location.search.replace('?','');

		paramStr = paramStr.split('&');

		for( var i =0, max = paramStr.length; i < max; i++ ){
			param = paramStr[i].split('=');
			val = param[1];
			param = param[0];
			
			params[param] = val;
		}
		return params;
	}
	
	function isCanvasSupported(){
	  var elem = document.createElement('canvas');
	  return !!(elem.getContext && elem.getContext('2d'));
	}
})