sap.ui.define([
	// "sap/ui/core/mvc/Controller"
	"transferencia/depositoZ_TRANSF_DEP/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"transferencia/depositoZ_TRANSF_DEP/model/formatter",
	"sap/m/MessageBox"
], function(Controller, JSONModel, formatter, MessageBox) {
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
			
			var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({
    							pattern: "ddMMYY"
				});

			oDateFormat.format(new Date()); //string in the same format as "Thu, Jan 29, 2017"
			
			this.getView().setModel(new JSONModel({
				busy: false,
				AUFNR: "",
				DATA_DOC: oDateFormat.format(new Date()),
				DATA_LANC: oDateFormat.format(new Date()),				
				BWART: "311",
				BTEXT: "",
				LGORT: "MP",
				LGOBE: "",				
				UMLGO: "",
				LGOBE_R: "",
				MATNR: "",
				MAKTX: "",
				POSNR: "",
				WERKS: "",
				NAME1: "",
				XCHPF: "",
				CHARG: "",
				ERFMG: "",
				MEINS: "",
				NOVO: "X",
			}), "viewModels");			

			// this.getModel("viewModel").setProperty("/busy", true);
			// // set message model
			// this.setModel(this.getMessageModel(), "message");
			// this.getMessageManager().registerObject(this.getView(), true);

			this.setModel(this.getOwnerComponent().getModel());
			// this.getView().unbindElement();
			// this.getRouter().getRoute("ProcessarReserva").attachPatternMatched((oEvent) => {
			// 	var _params = oEvent.getParameters();
			// 	this._reserva = _params.arguments.rsnum;
			// 	this._item    = _params.arguments.rspos;
			// 	this._ordem   = _params.arguments.aufnr;
			// 	this.getModel("viewModels").setProperty("/NOVO", "");
			// 	if (this._reserva == "0") {
			// 	  this.getModel("viewModels").setProperty("/NOVO", "X");
			// 	}
				// this.initView();
			// });
		},
		initView: function() {
			this.getModel("viewModel").setProperty("/busy", true);
			if (!this._reserva) {
				throw new Error("Reserva está vazia");
			}
			// const sKey = this.getModel().createKey("/ItemReservaSet", {
			// 	AUFNR: this._ordem,
			// 	RSNUM: this._reserva,
			// 	RSPOS: this._item
				
			// });
			// const oCurrentBind = this.getView().getBindingContext();
			// if (oCurrentBind) {
			// 	// If the view is already bound, force it to refresh the data from Server next time   
			// 	this.getModel().invalidateEntry(oCurrentBind);
			// 	this.getModel().invalidateEntry(sKey);
			// }
			// this.getView().bindElement({
			// 	path: sKey,
			// 	// parameters: {
			// 	// 	"expand": "Items"
			// 	// },
			// 	groupId: "ItemReserva",
			// 	refreshAfterChange: true,
			// 	events: {
			// 		change: (oEvent) => {

			// 		}

			// 	}
			// });
			// // Set Deferred Groups for Changes (Two Way odataModel);
			// let oModel = this.getModel();
			// oModel.setUseBatch(true);

			// // Concatenate the desired Deferred Groups, so that, the default 'changes' deferred group is not overwritten.
			// oModel.setDeferredGroups(oModel.getDeferredGroups().concat(["ItemReserva"]));
			// oModel.setChangeGroups({
			// 	"ItemReserva": {
			// 		groupId: "ItemReserva",
			// 		single: false
			// 	}
			// });
			// this.getView().getElementBinding().attachDataReceived((data) => {
			// 	this.getModel("viewModel").setProperty("/busy", false);

			// });
			
			var oModel = this.getView().getModel();
		
			oModel.callFunction("/GetItem", {
				method: "GET",
				urlParameters: {
					Aufnr: this._ordem,
					Rsnum: this._reserva,
					Rspos: this._item
				},
				success: (oData) => {
					this.getView().getModel("viewModels").setProperty("/AUFNR", oData.AUFNR);
					this.getView().getModel("viewModels").setProperty("/POSNR", oData.POSNR);
					this.getView().getModel("viewModels").setProperty("/BWART", oData.BWART);
					this.getView().getModel("viewModels").setProperty("/MATNR", oData.MATNR);
					this.getView().getModel("viewModels").setProperty("/WERKS", oData.WERKS);
					this.getView().getModel("viewModels").setProperty("/LGORT", oData.LGORT);
					this.getView().getModel("viewModels").setProperty("/UMLGO", oData.UMLGO);
					this.getView().getModel("viewModels").setProperty("/BTEXT", oData.BTEXT);
					this.getView().getModel("viewModels").setProperty("/DATA_DOC", oData.DATA_DOC);
					this.getView().getModel("viewModels").setProperty("/DATA_LANC", oData.DATA_LANC);
					this.getView().getModel("viewModels").setProperty("/XCHPF", oData.XCHPF);
					this.getView().getModel("viewModels").setProperty("/MAKTX", oData.MAKTX);
					this.getView().getModel("viewModels").setProperty("/NAME1", oData.NAME1);
					this.getView().getModel("viewModels").setProperty("/LGOBE", oData.LGOBE);
					this.getView().getModel("viewModels").setProperty("/LGOBE_R", oData.LGOBE_R);
					this.getView().getModel("viewModels").setProperty("/CHARG", oData.CHARG);
					this.getView().getModel("viewModels").setProperty("/ERFMG", oData.ERFMG);
					this.getView().getModel("viewModels").setProperty("/MEINS", oData.MEINS);
					
					this.getModel("viewModel").setProperty("/busy", false);
					
				},
				error: (error) => {
					// sap.m.MessageToast.show(JSON.parse(error.responseText).error.message.value);
					this.getModel("viewModel").setProperty("/busy", false);
					MessageBox.error(JSON.parse(error.responseText).error.message.value, {
						title: "Erro",
						onClose: () => {
							reject();
						}
					});						
				}
			});			
		},
		verificar: function(oEvent) {
			var oDados = this.getView().getModel("viewModels").getData();
			this.getModel("viewModel").setProperty("/busy", true);
			this.getDados(oDados);
			this.getModel("viewModel").setProperty("/busy", false);
		},
		registrar: function(oEvent) {
			var oDados = this.getView().getModel("viewModels").getData();
			this.getModel("viewModel").setProperty("/busy", true);
			this.verificaDados(oDados);			
		},		
		registrarMigo: function(oItem) {
			var oModel = this.getView().getModel();
			oModel.invalidate();
			oModel.callFunction("/RegistraMigo", {
				method: "GET",
				urlParameters: {
					Matnr: oItem.MATNR,
					Umlgo: oItem.UMLGO,
					Werks: oItem.WERKS,
					Erfmg: oItem.ERFMG,
					Meins: oItem.MEINS,
					Lgort: oItem.LGORT,
					Charg: oItem.CHARG
				},
				success: (oData) => {
					this.getModel("viewModel").setProperty("/busy", false);
					if (oData.MSG) {
						MessageBox.error(oData.MSG, {
							title: "Erro",
							onClose: () => {
								reject();
							}
						});	
					} else {
						MessageBox.information("Criado documento de Material:"+oData.MBLNR);
						this.getView().getModel("viewModels").setProperty("/MATNR", "");
					    this.getView().getModel("viewModels").setProperty("/WERKS", "");
						this.getView().getModel("viewModels").setProperty("/LGORT", "");
						this.getView().getModel("viewModels").setProperty("/ERFMG", "");
					};
				},
				error: (error) => {
					// sap.m.MessageToast.show(JSON.parse(error.responseText).error.message.value);
					this.getModel("viewModel").setProperty("/busy", false);
					MessageBox.error(JSON.parse(error.responseText).error.message.value, {
						title: "Erro",
						onClose: () => {
							reject();
						}
					});					
				}
			});				
		},
		verificaDados: function(oItem) {
			var oModel = this.getView().getModel();
			oModel.invalidate();
			oModel.callFunction("/GetDados", {
				method: "GET",
				urlParameters: {
					Matnr: oItem.MATNR,
					Werks: oItem.WERKS,
					Lgort: oItem.LGORT,
					Umlgo: oItem.UMLGO,
					Charg: oItem.CHARG,
					Erfmg: oItem.ERFMG,
					Meins: oItem.MEINS
				},
				success: (oData) => {
					this.getView().getModel("viewModels").setProperty("/BTEXT", oData.BTEXT);
					this.getView().getModel("viewModels").setProperty("/MATNR", oData.MATNR);
					this.getView().getModel("viewModels").setProperty("/WERKS", oData.WERKS);
					this.getView().getModel("viewModels").setProperty("/LGORT", oData.LGORT);
					this.getView().getModel("viewModels").setProperty("/MAKTX", oData.MAKTX);
					this.getView().getModel("viewModels").setProperty("/LGOBR_R", oData.LGOBR_R);
					this.getView().getModel("viewModels").setProperty("/LGOBE", oData.LGOBE);
					this.getView().getModel("viewModels").setProperty("/CHARG", oData.CHARG);
					this.getView().getModel("viewModels").setProperty("/ERFMG", oData.ERFMG);
					this.getView().getModel("viewModels").setProperty("/MEINS", oData.MEINS);
					
					var erro = "";
					if (!oData.MATNR) {
						erro = "X";
						MessageBox.error("Material é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});				
					} else if (!oData.WERKS) {
						erro = "X";
						MessageBox.error("Centro é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});							
					} else if (!oData.LGORT) {
						erro = "X";
						MessageBox.error("Depósito é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});							
					} else if (!oData.ERFMG) {
						erro = "X";
						MessageBox.error("Quantidade é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});				
					};	
					this.getModel("viewModel").setProperty("/busy", false);
					if (erro === "") {
						this.registrarMigo(oData);	
					};					
				},
				error: (error) => {
					// sap.m.MessageToast.show(JSON.parse(error.responseText).error.message.value);
					this.getModel("viewModel").setProperty("/busy", false);
					MessageBox.error(JSON.parse(error.responseText).error.message.value, {
						title: "Erro",
						onClose: () => {
							reject();
						}
					});						
				}
			});	
		},		
		getDados: function(oItem) {
			var oModel = this.getView().getModel();
			oModel.invalidate();
			oModel.callFunction("/GetDados", {
				method: "GET",
				urlParameters: {
					Matnr: oItem.MATNR,
					Werks: oItem.WERKS,
					Lgort: oItem.LGORT,
					Umlgo: oItem.UMLGO,
					Charg: oItem.CHARG,
					Erfmg: oItem.ERFMG,
					Meins: oItem.MEINS
				},
				success: (oData) => {
					this.getView().getModel("viewModels").setProperty("/BTEXT", oData.BTEXT);
					this.getView().getModel("viewModels").setProperty("/MATNR", oData.MATNR);
					this.getView().getModel("viewModels").setProperty("/WERKS", oData.WERKS);
					this.getView().getModel("viewModels").setProperty("/LGORT", oData.LGORT);
					this.getView().getModel("viewModels").setProperty("/MAKTX", oData.MAKTX);
					this.getView().getModel("viewModels").setProperty("/LGOBR_R", oData.LGOBR_R);
					this.getView().getModel("viewModels").setProperty("/LGOBE", oData.LGOBE);
					this.getView().getModel("viewModels").setProperty("/CHARG", oData.CHARG);
					this.getView().getModel("viewModels").setProperty("/ERFMG", oData.ERFMG);
					this.getView().getModel("viewModels").setProperty("/MEINS", oData.MEINS);
					
					var erro = "";
					if (!oData.MATNR) {
						erro = "X";
						MessageBox.error("Material é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});				
					} else if (!oData.WERKS) {
						erro = "X";
						MessageBox.error("Centro é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});							
					} else if (!oData.LGORT) {
						erro = "X";
						MessageBox.error("Depósito é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});							
					} else if (!oData.ERFMG) {
						erro = "X";
						MessageBox.error("Quantidade é Obrigatório", {
							title: "Campo Obrigatório",
							onClose: () => {
								reject();
							}
						});				
					};	
					if (erro === "") {
						MessageBox.information("Dados verificados");	
					};					
				},
				error: (error) => {
					// sap.m.MessageToast.show(JSON.parse(error.responseText).error.message.value);
					MessageBox.error(JSON.parse(error.responseText).error.message.value, {
						title: "Erro",
						onClose: () => {
							reject();
						}
					});						
				}
			});	
		},
		LerCod: function() {
			const oModel = this.getModel();
			this.scanHU().then((scannedCod) => {
				this._lenum = scannedCod;
						
				this.getModel("viewModels").setProperty("/WERKS", scannedCod.substr(0, 4));
				this.getModel("viewModels").setProperty("/CHARG", scannedCod.substr(4, 10));
				this.getModel("viewModels").setProperty("/MATNR", scannedCod.substr(14, 10));
	
			});				
			
		},		
		confirmAction: function(sMessage, sTitle, fnCallback) {
			sap.m.MessageBox.confirm(sMessage, {
				title: sTitle,
				onClose: fnCallback,
				styleClass: "",
				actions: [sap.m.MessageBox.Action.YES,
					sap.m.MessageBox.Action.CANCEL
				],
				emphasizedAction: sap.m.MessageBox.Action.YES,
				initialFocus: sap.m.MessageBox.Action.CANCEL,
				textDirection: sap.ui.core.TextDirection.Inherit
			});
		},	

	});
});