sap.ui.define([
	// "sap/ui/core/mvc/Controller",
	"transferencia/depositoZ_TRANSF_DEP/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/GroupHeaderListItem",
	"sap/ui/Device",
	"transferencia/depositoZ_TRANSF_DEP/model/formatter"	
], function(Controller, JSONModel, formatter, Filter) {
	"use strict";

	return Controller.extend("transferencia.depositoZ_TRANSF_DEP.controller.FiltroReserva", {
		
		onInit : function () {
		
				this.setModel(this.getOwnerComponent().getModel());
				//Set the View Model;
	
				this.setModel(new JSONModel({
					busy: false,
					//FilterData
					ReservaSet: [],
					Aufnr: ""
				}), "viewModel");
		},
		readReservas: function() {
			var oModel = this.getModel();
			var oViewModelData = this.getModel("viewModel").getData("/");
			// this.getModel("reportModel").setProperty("/ReservaSet", []);
			this.getModel("viewModel").setProperty("/busy", true);
			oModel.invalidate();
			oModel.callFunction("/GetReservas", {
				method: "GET",
				urlParameters: {
					Aufnr: oViewModelData.Aufnr
				},
				"$expand": "Items",
				success: (oData) => {
					this.getModel("viewModel").setProperty("/ReservaSet", oData.results);
					this.getView().byId("tbReservas").getBinding("items").refresh();
					this.getModel("viewModel").setProperty("/busy", false);
				},
				error: () => {
					// alert(this.oResourceBundle.getText("ErrorReadingProfile"));
					// oGeneralModel.setProperty("/sideListBusy", false);
					this.getModel("viewModel").setProperty("/busy", false);
				}
			});

		},
		displayReserva: function (oEvent) {
			var OBoundItem = oEvent.getSource().getBindingContext("viewModel").getObject();
			if (OBoundItem) {

				this.getRouter().navTo("ProcessarReserva", {
					aufnr: OBoundItem.AUFNR,
					rsnum: OBoundItem.RSNUM,
					rspos: OBoundItem.RSPOS,
					layout: this.getNextUiState(1).layout
				});
			}
		},
		novo: function () {

			this.getRouter().navTo("ProcessarReserva", {
				aufnr: "0",
				rsnum: "0",
				rspos: "0",
				layout: this.getNextUiState(1).layout
			});
		},

	});
});