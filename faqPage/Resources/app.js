var win = Ti.UI.createWindow({
	backgroundColor:'black',
	height:'100%',
	width:'100%'
});
var data = [];
var questions = ['How are you?', 'What is your name?', 'How old are you?', 'Are you an alcoholic?', 'Are you a psychopath?'];
var answers = ['I am fine', 'My name is Sandeep Kumar', 'I am 21 years old', 'No, i am not an alcoholic', 'Yes. I am a psychopath'];
for(var i = 0; i < 5; i++){
	var tableRow = Ti.UI.createTableViewRow({
		backgroundColor:'yellow',
		title:questions[i],
		answer:answers[i],
		id:i
	});
	data.push(tableRow);
}


var view1 = Ti.UI.createTableView({
	backgroundColor:'#ffee7f',
	data:data
});

var sandeepView = Ti.UI.createView({
	height:'100%',
	backgroundColor:'white'
});

var backButton = Ti.UI.createButton({
	title:'Back',
	height:50,
	top:30
});
sandeepView.add(backButton);

var sandeepLabel = Ti.UI.createLabel({
	height:50
	});
sandeepView.add(sandeepLabel);

var scrollView = Ti.UI.createScrollableView({
	views:[view1, sandeepView],
	scrollingEnabled:false,
	left:250
});

var viewMeaning = function(e) {
	scrollView.scrollToView(1);
	sandeepLabel.text = e.source.answer;
};

var goBack = function(e) {
	scrollView.scrollToView(0);
};

view1.addEventListener('click', viewMeaning);
backButton.addEventListener('click', goBack);

win.add(scrollView);

win.open();

