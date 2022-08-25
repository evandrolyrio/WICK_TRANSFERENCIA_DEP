sap.ui.define([
	// "sap/ui/core/mvc/Controller"
	"transferencia/depositoZ_TRANSF_DEP/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"transferencia/depositoZ_TRANSF_DEP/model/formatter"
], function(Controller, JSONModel, formatter) {
	"use strict";

	return Controller.extend("transferencia.depositoZ_TRANSF_DEP.controller.ProcessarReserva", {

		onInit: function() {
			this.setModel(new JSONModel({
				busy: false,
				showFooter: false,
				saveEnabled: false,
				hasValidationError: false,
				showToolbars: true
			}), "viewModel");

			// set message model
			this.setModel(this.getMessageModel(), "message");
			this.getMessageManager().registerObject(this.getView(), true);

			this.setModel(this.getOwnerComponent().getModel());

			this.getRouter().getRoute("ProcessarReserva").attachPatternMatched((oEvent) => {
				var _params = oEvent.getParameters();
				this._reserva = _params.arguments.rsnum;
				this._item    = _params.arguments.rspos;
				this._ordem   = _params.arguments.aufnr;
				this.initView();
			});
		},
		initView: function() {
			if (!this._reserva) {
				throw new Error("Reserva está vazia");
			}
			const sKey = this.getModel().createKey("/ItemReservaSet", {
				AUFNR: this._ordem,
				RSNUM: this._reserva,
				RSPOS: this._item
				
			});
			const oCurrentBind = this.getView().getBindingContext();
			if (oCurrentBind) {
				// If the view is already bound, force it to refresh the data from Server next time   
				this.getModel().invalidateEntry(oCurrentBind);
			}
			this.getView().bindElement({
				path: sKey,
				// parameters: {
				// 	"expand": "Items"
				// },
				// groupId: "Reserva",
				refreshAfterChange: true,
				events: {
					change: (oEvent) => {

					}

				}
			});
			// Set Deferred Groups for Changes (Two Way odataModel);
			let oModel = this.getModel();
			oModel.setUseBatch(true);

			// Concatenate the desired Deferred Groups, so that, the default 'changes' deferred group is not overwritten.
			oModel.setDeferredGroups(oModel.getDeferredGroups().concat(["ItemReserva"]));
			oModel.setChangeGroups({
				"ItemReserva": {
					groupId: "ItemReserva",
					single: false
				}
			});
			this.getView().getElementBinding().attachDataReceived((data) => {
				this.getModel("viewModel").setProperty("/busy", false);

			});
		},

	});
});