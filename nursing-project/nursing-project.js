Notes = new Mongo.Collection("notes");

Router.map( function () {
	this.route('noteList',{
		path: '/notes'
	});
	this.route('home', {
		path: '/'
	});
	this.route('newNote');
});



if (Meteor.isClient) {
	Template.noteList.helpers({
		notes: function() {
			return Notes.find({}, {sort: {createdAt: -1}});
		}
	});

	Template.home.helpers({
		count: function(){
		return Notes.find({}).count();
	}
	});
	Template.newNote.events({
		"submit .new-note": function (event){
			alert("note submitted");
			var note = event.target.text.value;
			console.log("Entered value:"+note);
			Notes.insert({
				text: note,
				createdAt: new Date()
			});

			event.target.text.value="";

			return false;
		}
	});
}