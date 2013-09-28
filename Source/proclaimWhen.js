define([], function () {

	function publish(name, event, data) {
		event.subscribers.forEach(function (item) {
			item.apply(item, data);
		});
	}

	function subscribeTo(name, event, subscriber) {
		var index = event.subscribers.indexOf(subscriber);
		if(index < 0)
			event.subscribers.push(subscriber);
	}
	
	function unsubscribeFrom(name, event, subscriber){
		var index = event.subscribers.indexOf(subscriber);
		if(index >= 0)
			event.subscribers.splice(index, 1);
	}
	function extendEvent(name, event){
		event.subscribers = [];

		var extendedEvent = function(){
			if(arguments.length == 1 && typeof arguments[0] === "function"){
				subscribeTo(name, event, arguments[0]);
			}else{
				publish(name, event, arguments);
			}
		}

		extendedEvent.dont = function(subscriber){
			unsubscribeFrom(name, event, subscriber);
		};

		return extendedEvent;
	}
	
	function extend(events){
		for(var i in events){
			events[i] = extendEvent(i, events[i]);
		}
		return events;
	}

	function create(arg1, arg2){
		if(arg2)
			return extendEvent(arg1, arg2);
		else
			return extendEvent("anonymous event", arg1)
	}

	return {
		extend: extend,
		create: create
	};
	
});
