var win = Ti.UI.createWindow({
	backgroundColor:'black'
});
// var menu = Ti.UI.createButton({
	// title:'MENU',
	// top:8,
	// left:8
// });
var back = Ti.UI.createButton({
	title:'< Back',
	top:8,
	left:8,
	font: {fontSize: 35,
		fontWeight: 'bold'}
});
// var back = Ti.UI.createImageView({
  // image:'/images/rename.gif',
	// top:15,
	// left:8
// });
var menu = Ti.UI.createImageView({
  image:'/images/settings.png',
  	top:8,
	left:8,
	height:50,
	width:50
});

var dbHandle = Ti.Database.install('news.db', 'version1');

add = 'Add to fav';
remove = 'Remove from fav';
fav = [];
writeData(add, remove);


function writeData(add, remove) {
		rowData = [];
	var resultSet = dbHandle.execute('SELECT * FROM sources');
	var resultSetCount = resultSet.getRowCount(); 

	while(resultSet.isValidRow()) {
		var row = Ti.UI.createTableViewRow({
			height:300
		});	
	
		var childViews = Ti.UI.createView({
			height:220,
			width:'95%'
		});
		var label = Ti.UI.createLabel({
			height:180,
			text:resultSet.fieldByName('news_text').toString(),
			is_fav:resultSet.fieldByName('is_fav')
		});
		var button = Ti.UI.createButton({
			backgroundColor:'Yellow',
			height:30,
			top:180,
			right:30,
			width:'auto',
			font: {
				fontSize:22
			},
			className:'favourite',
			id:resultSet.fieldByName('id')
		});
		
		var heading = Ti.UI.createLabel({
			text:'HEADING',
			top:10,
			left:20,
			font: {
				fontSize:25,
				fontWeight:'bold'
			}
		});
		
		childViews.add(heading);
		childViews.add(label);
		childViews.add(button);
		row.add(childViews);
		rowData.push(row);
		if(label.is_fav == 1) {		
			button.title = remove;
		}
		else {
			button.title = add;
		}	
		resultSet.next();
	}
	return rowData;
}

function favData() {
	fav = [];
	var favSet = dbHandle.execute('SELECT * FROM sources');
	while(favSet.isValidRow()) {
		if(favSet.fieldByName('is_fav') == 1) {
			var favRow = Ti.UI.createTableViewRow({
				height:300
			});
			var favView = Ti.UI.createView({
				height:250
			});
			var favLabel = Ti.UI.createLabel({
				height:180,
				text:favSet.fieldByName('news_text').toString(),
			});	
			favView.add(favLabel);
			favRow.add(favView);
			fav.push(favRow);			
		}
		favSet.next();
	}
	return fav;
}
	
var inner = [];
var settingsList = ['Options', 'Account', 'Payment', 'Settings', 'Whatever', 'moreWhatever', 'Home','Away', 'Goals','Favourites'];
for(var j = 0;j<10;j++) {
	var innerTableRow = Ti.UI.createTableViewRow({
		height:80
	});
	var innerTableView = Ti.UI.createView({
		height:80
	});
	var innerTableLabel = Ti.UI.createLabel({
		text:settingsList[j],
		id:j,
		height:78,
		width:'100%',
		textAlign:'center'
	});
	innerTableView.add(innerTableLabel);
	innerTableRow.add(innerTableView);
	inner.push(innerTableRow);
}

var view2 = Ti.UI.createTableView({
	width:'100%',
	height:'auto'
});

var view2one = Ti.UI.createTableView({
	width:'1%',
	backgroundColor:'#d3d3d3',
	left:0,
	data:inner,
	scrollable:false,
	height:'100%'
});

var view2two = Ti.UI.createTableView({
	backgroundColor:'white',
	width:'100%',
	height:'auto',
	right:0,
	data:rowData
});


view2.add(view2one);
view2.add(view2two);
view2two.add(menu);

// dbHandle.execute('UPDATE sources SET is_fav=? WHERE id=?',0,e.source.id);



var view3 = Ti.UI.createTableView({
	backgroundColor:'yellow',
	width:'100%',
	height:'100%'         
});

view3.add(back);

var scrollView = Ti.UI.createScrollableView({
	//top:50,
	views:[view2, view3],
	scrollingEnabled:false
});

var flag = 0;
menu.addEventListener('click', function(e) {
	if(flag == 0) {
var a = Ti.UI.createAnimation({
    duration : 1000,
    height:'auto',
    width:'40%'
  });
 var b = Ti.UI.createAnimation({
    duration : 1000,
    height:'auto',
    width:'60%'
  });

  view2one.animate(a);
    view2two.animate(b);
		// view2two.width = '60%';
		// view2one.width = '40%';		
		flag = 1;
	}
	else if(flag == 1) {
		var c = Ti.UI.createAnimation({
    duration : 300,
    height:'auto',
    width:'100%'
  });
 var d = Ti.UI.createAnimation({
    duration : 500,
    height:'auto',
    width:0.1
  });
  view2one.animate(d);
    view2two.animate(c);
		// view2two.width = '100%';
		// view2one.width = '0%';
		flag = 0;
	}	
});

back.addEventListener('click', function(e) {
	scrollView.scrollToView(0);
})

view2.addEventListener('click', function(e) {
	if(e.source.title == remove) {
		dbHandle.execute('UPDATE sources SET is_fav=? WHERE id=?',0,e.source.id);
		//e.source.title = add;
		view2two.data = writeData(add, remove);		
	}
	else if(e.source.title == add) {
		dbHandle.execute('UPDATE sources SET is_fav=? WHERE id=?',1,e.source.id);
		//e.source.title = remove;
		view2two.data = writeData(add, remove);
	}
});

view2one.addEventListener('click', function(e) {
	if(e.source.id == 9) {
		view3.data = favData();	
		view2two.width = '100%';
		view2one.width = 0.1;
		scrollView.scrollToView(1);				
	}
});

win.open();
win.add(scrollView);

