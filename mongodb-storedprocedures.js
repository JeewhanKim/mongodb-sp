/* ===================================================
 * mongodb-storedprocedures.js
 * Stored Javascript Sample for MongoDB
 * ===================================================
 * Copyright 2013 Jeewhan Kim, Inc.
 * Dec 19. 2013, Jeewhan Kim
 * =================================================== */

function (){
  //file name -> SP Name
 
var result = db.items_copy.group(
{
  keyf: function(doc)
  {
   return {
      month: doc.rdate.getMonth(),
      year: doc.rdate.getFullYear()
    };
  },
  initial: {count:0},
  reduce: function(doc, prev) { prev.count++ }
}); 

 return result;
}

db.coll.group(
{
    keyf: function(doc) {
        var date = new Date(doc.date);
        var dateKey = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()+'';
        return {'day':dateKey};
    },
    cond: {topic:"abc"},
    initial: {count:0},
    reduce: function(obj, prev) {prev.count++;}
});

db.coll.group(
{
   key:{'date':true},
   initial: {retVal: {}},
   reduce: function(doc, prev){
              var date = new Date(doc.date);
              var dateKey = date.getFullYear()+''+date.getMonth()+''+date.getDate();
              (typeof prev.retVal[dateKey] != 'undefined') ? prev.retVal[dateKey] += 1 : prev.retVal[dateKey] = 1;
            }, 
   cond: {topic:"abc"}
});

db.coll.group(
{
   $keyf : function(doc) {
       return { "date" : doc.date.getDate()+"/"+doc.date.getMonth()+"/"+doc.date.getFullYear(),
                "topic": doc.topic };
    },
    initial: {count:0},
    reduce: function(obj, prev) { prev.count++; }
});

