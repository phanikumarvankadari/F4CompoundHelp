sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.complihelp.f4help.controller.Main", {
		onInit: function () {

		},
		currentF4:"",
		f4MainCategory:function(){
			
				if (!this._oMainCatDialog) {
				this._oMainCatDialog = sap.ui.xmlfragment('searchDialogPopup',
					"com.complihelp.f4help.view.fragment.MainCatF4",
					this
				);
			}
				this.getView().addDependent(this._oMainCatDialog);
				
				var oTemplate = sap.ui.core.Fragment.byId("searchDialogPopup",'cliItem' );
			
				
			if(this.currentF4!==""){
				this._oMainCatDialog.unbindItems();
			
				this._oMainCatDialog.bindAggregation('items', {
				 			path: "/Categories/",
				 			template:  oTemplate,
				 			templateShareable: true
				 			});
			}else{
				this.getView().getModel('SEL').setProperty('/startContext',
							this._oMainCatDialog.getBindingContext);
			}
				this.currentF4="MAIN";	
				this._oMainCatDialog.open();
		},
		f4SubCategory:function(oEvent){
			this.currentF4="SUB";
				if (!this._oMainCatDialog) {
				this._oMainCatDialog = sap.ui.xmlfragment('searchDialogPopup',
					"com.complihelp.f4help.view.fragment.MainCatF4",
					this
				);
			
				
				}	
				var oContext= 	this.getView().getModel('SEL').getProperty('/selMainCatPath');
				//var oTemplate = sap.ui.core.Fragment.byId("searchDialogPopup",'cliItem' );//this._oMainCatDialog.getBindingInfo('items').template;
			
					this._oMainCatDialog.unbindItems();
					var oTemplate= new sap.m.ColumnListItem({
						cells:[
								new sap.m.Text({text:"{ProductID}"}),
								new sap.m.Text({text:"{ProductName}"})
								]
					});	
					
				this._oMainCatDialog.bindAggregation('items', {
							path: oContext.getPath().replace('/Products/')+"/Products/",
							template:  oTemplate,
							templateShareable: false
							});
				
				
					this.getView().addDependent(this._oMainCatDialog);
						this._oMainCatDialog.open();
				
				
		},
		
		onMainCatPress:function(e){
			var selData= e.getParameter('selectedItem').getBindingContext().getObject();
			selData.context= e.getParameter('selectedItem').getBindingContext();
		if(this.currentF4==="MAIN"){
			
					this.getView().getModel('SEL').setProperty('/selMainCatId',selData.CategoryID);
					this.getView().getModel('SEL').setProperty('/selMainCatName',selData.CategoryName);
					this.getView().getModel('SEL').setProperty('/selMainCatPath',selData.context);
			}else if(this.currentF4==="SUB"){
					this.getView().getModel('SEL').setProperty('/selSubCatId',selData.ProductID);
					this.getView().getModel('SEL').setProperty('/selSubCatName',selData.ProductName);
					this.getView().getModel('SEL').setProperty('/selSubCatPath',selData.context);
				
			}
			
		}
	});
});