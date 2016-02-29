module.exports = function (input, maxLength) {
	var result = [];
	var part = [];

	for (var i = 0; i < input.length; i++) {
		part.push(input[i]);

		// check if we reached the maximum amount of items in a partial
		// or just if we reached the last item
		if (part.length === maxLength || i === input.length - 1) {
			result.push(part);
			part = [];
		}
	}

	return result;
};
