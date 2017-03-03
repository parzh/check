"use strict";

let check = {};

// MULTIPLE

/** Returns a multidimensional array of input-method verifications
	@param inputs An array of test values
	@param methodNames An array of 'check' object methods names
	*/
check.bundle = function(inputs = [], methodNames = []) {

	function getMethodByName(methodName) {
		let method = check[methodName];

		if (!method)
			throw new ReferenceError(`'check.${methodName}' is not a function`);

		else if (method.length > 1)
			throw new SyntaxError(`Not enough arguments for method 'check.${methodName}' to proceed`);

		else return method;
	}

	let methods = methodNames.map(getMethodByName);

	return inputs.map(input => methods.map(method => method(input)));
};

/** Returns 'true' if all of the verifications return 'true'
	@param input Test value
	@param methodNames An array of 'check' object methods names
	*/
check.everyMethod = function(input, methodNames) {
	return check.bundle([input], methodNames)[0].every(Boolean);
};

/** Returns 'true' if any of provided verifications returns 'true'
	@param input Test value
	@param methodNames An array of 'check' object methods names
	*/
check.someMethod = function(input, methodNames) {
	return check.bundle([input], methodNames)[0].some(Boolean);
};

/** Returns 'true' if all input values comply with requirement.
	Consider the order of arguments.
	@param method Function name without 'check.' part
	@param inputs An array of test values
	*/
check.everyInput = function(method, inputs) {
	return check.bundle(inputs, [method]).map(result => result[0]).every(Boolean);
};

/** Returns 'true' if any of input values complies with requirement.
	Consider the order of arguments.
	@param method Function name without 'check.' part
	@param inputs An array of test values
	*/
check.someInput = function(method, inputs) {
	return check.bundle(inputs, [method]).map(result => result[0]).some(Boolean);
};