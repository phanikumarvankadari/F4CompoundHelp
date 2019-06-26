sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/complihelp/f4help/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("com.complihelp.f4help.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
		/*	var sUrl= "https://sapes5.sapdevcenter.com/sap/opu/odata/sap/EPM_REF_APPS_PROD_MAN_SRV/?sap-user=P1942248713&sap-password=India123";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl);
			this.setModel(oModel);*/   
			
			var surl = this.getModel().sServiceUrl;
			var jModel = new sap.ui.model.json.JSONModel();
			jModel.loadData(surl+"/MainCategories", "", false );
			this.setModel(jModel,"MC");
			// enable routing
			
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});