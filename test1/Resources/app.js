// author Sandeep
// important staus codes
// checkin_success => status => 1
// checkout_success =>status => 2
// checkBye => status => 12
// invalidPin => status => 99

var win = Ti.UI.createWindow({
	backgroundImage: '123.png'
});

var pinField = Ti.UI.createTextField({
	top:50,
	height:60,
	width:250,
	maxLength : 4,
	textAlign:'center',
	passwordMask:true,
	hintText: 'PIN',
	font : {
		fontSize:50
	},
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD
});

var submit = Ti.UI.createButton({
	top:150,
	height:45,
	width:200,
	title:'SUBMIT',
	borderRadius:10,
	backgroundColor: 'black'
});

var apiCall = Ti.Network.createHTTPClient();

submit.addEventListener('click', function(){	
	//Ti.API.info(typeof(parseInt(pinField.value)));
	if(pinField.value != "" && pinField.value != null) {
		data = {"pin" : parseInt(pinField.value)};
		apiCall.open('POST', 'http://192.168.0.22/office-solutions/checkins/check');		
		apiCall.setRequestHeader('content-type', 'application/json'); 
		apiCall.send(data);
		apiCall.onload = function() {
			json = JSON.parse(this.responseText);
			Ti.API.info(this.responseText);
			status = json.status;
			// if(status == 1) {
				// checkinTime = json.sendTimeToView;
				// alert('Checked in successfully at '+checkinTime);
			// }
			// else if(status == 2) {
				// checkoutTime = json.sendTimeToView;
				// alert('Checked out successfully at '+checkoutTime);
			// }
			// else if(status == 12) {
				// alert('Come again tomorrow child');
			// }
			// else if(status == 99) {
				// alert('Invalid pin mate');
			// }			
			switch (status) {
				case 1:
					checkinTime = json.sendTimeToView;
					alert('Checked in successfully at '+checkinTime);
					break;
				case 2:
					checkoutTime = json.sendTimeToView;
					alert('Checked out successfully at '+checkoutTime);
					break;
				case 12:
					alert('Come again tomorrow child');
					break;
				case 99:
					alert('Invalid pin mate');
					break;		
			}			
		pinField.value = '';
		};
	}	
	else {
		alert('Please enter your pin');
	}
});

win.open();
win.add(pinField);
win.add(submit);
