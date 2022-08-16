jQuery.sap.declare("transferencia.depositoZ_TRANSF_DEP.Component");
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"transferencia/depositoZ_TRANSF_DEP/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/f/FlexibleColumnLayoutSemanticHelper"	
], function(UIComponent, Device, models, JSONModel, FCLSHelper) {
	"use strict";

	return UIComponent.extend("transferencia.depositoZ_TRANSF_DEP.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(new JSONModel(), "routing");

			this.getRouter().initialize();

			this.oMessageManager = sap.ui.getCore().getMessageManager();
			this.setModel(this.oMessageManager.getMessageModel(), "message");			
		},
		createContent: function() {
			return sap.ui.view({
				viewName: "transferencia.depositoZ_TRANSF_DEP.view.App",
				type: "XML"
			});
		},
		getMessageManager: function() {
			return this.oMessageManager;
		},
		getRoutingModel: function() {
			return this.getModel("routing");
		},
		getHelper: function() {
			var oFCL = this.getRootControl().byId("fcl"),

				oSettings = {
					defaultTwoColumnLayoutType: sap.f.LayoutType.TwoColumnsMidExpanded,
					// defaultThreeColumnLayoutType: sap.f.LayoutType.ThreeColumnsEndExpanded,
					initialColumnsCount: 1,
					maxColumnsCount: 2
				};

			return FCLSHelper.getInstanceFor(oFCL, oSettings);
		}		
	});
});