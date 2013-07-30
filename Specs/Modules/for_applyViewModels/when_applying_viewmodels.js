describe("when applying viewmodels", ["ordnung/applyViewModels"], function(applyViewModels){


	function functionName(m){
		return m.name || m.toString().match(/function\s+([^(]+)/)[1];
	}

	var dummyVM,
		when;

	beforeEach(function(done){

		when = sinon.spy();

		var elm = document.createElement("div");
		var div = document.createElement("div");
		div.setAttribute("data-viewmodel", "dummyVM");
		div.setAttribute("data-model", '{"a":true}');
		elm.appendChild(div);

		dummyVM = sinon.spy();

		define("dummyVM", [], function(){
			return function DummyVM(){
				dummyVM(this, arguments);
			};
		});

		because: {
			applyViewModels(elm, when).then(done);
		}
	});

	it("should find all the viewmodels in the dom tree", function(){
		expect(dummyVM.callCount).toBe(1);
	});

	it("should call the viewmodule as a constructor", function(){
		expect(functionName(dummyVM.getCall(0).args[0].constructor)).toBe("DummyVM");
	});

	it("should call the viewmodule with the model as the first argument", function(){
		expect(dummyVM.getCall(0).args[1][0]).toEqual({a: true});
	});

	it("should call the viewmodule with the when function as the second argument", function(){
		expect(dummyVM.getCall(0).args[1][1]).toEqual(when);
	});
});