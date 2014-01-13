#MongoDB Stored Procedures

##Introduction
As all you guys know, MongoDB stored prods are written in JavaScript.
I felt little strange at first, but I made simple examples.

```javascript
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
```
