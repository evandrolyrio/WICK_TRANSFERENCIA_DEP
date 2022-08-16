sap.ui.define([
	"sap/ui/Device"
], function(Device) {
	"use strict";

	return {

		numberToLocale: function(sNumber) {
			return (Math.round(sNumber * 1000) / 1000).toLocaleString();
		}

	};
});