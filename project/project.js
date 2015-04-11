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
  Template.body.events({
    "click .button": function(event){
      alert("Boo! Jk I'm currently useless");
      var note_popup = window.prompt("Enter your note", "");
      Notes.insert({
        text: note_popup,
        createdAt: new Date()
      });
    }
  })
  Template.noteList.helpers({
    notes: function() {
      return Notes.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.noteList.events({
    "click .delete": function() {
      var delete_this = window.confirm("Are you sure you want to delete this note?");
      if(delete_this==true)
      Notes.remove(this._id);
    }
  });

  Template.home.helpers({
    count: function(){
    return Notes.find({}).count();
  }
  });
  Template.newNote.events({
    "submit .new-note": function (event){
      event.preventDefault();
      alert("note submitted");
      var note = event.target.note.value;
      alert("var note being assigned");
      Notes.insert({
        text: note,
        createdAt: new Date()
      });
      alert("note inserted");

      event.target.note.value="";

      return false;
    }
  });
}