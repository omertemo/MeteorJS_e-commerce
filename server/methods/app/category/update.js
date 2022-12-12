import SimpleSchema from "simpl-schema";


const newFunction = (c,newAncestorIds) => {
  newAncestorIds.push(c._id);
  Categories.update(
    { parentCategoryId: c._id },
    {
      $set: { ancestorIds: newAncestorIds },
    },
    {multi:true}
  );
  categories = Categories.find({ parentCategoryId: c._id });
  categories.forEach((category)=>{
    newFunction(category,newAncestorIds);
    newAncestorIds.pop()
  })

}
// multi kullan
new ValidatedMethod({
  name: "app.category.update",
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    category: CategorySchema.omit("ancestorIds"),
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, category } = data; // gereksiz işlemleri engellemek için kontrol et

    const currentCategory = Categories.findOne({ _id: _id }); // Güncellenecek Kategori
    const newParentsId = category.parentCategoryId; // Güncellenecek Kategorinin Eski Parent'ı
    const newParent = Categories.findOne({ _id: newParentsId }); // Güncellenecek Kategorinin Yeni Parent'ı
    const newAncestorIds = newParent.ancestorIds;
    newAncestorIds.push(newParent._id);
    category.ancestorIds = newAncestorIds;

    if (newParent.ancestorIds.includes(_id)) {
      throw new Meteor.Error("Alt kateogriye taşıma işlemi yapılamaz");
    }

    Categories.update(
      { _id: data._id },
      {
        $set: category,
      }
    );

    console.log("categories");
    // console.log(categories);
    
    if (currentCategory.parentCategoryId != newParentsId) {
      
      
      newFunction(currentCategory, newAncestorIds);
    }

    // Categori'leri arasında currentCategory._id var olan productlardan bu currentCategory._id'yi pull et

    // Products.update(
    //   { categories: currentCategory._id },
    //   {
    //     $pull: {
    //       categories: currentCategory._id,
    //     },
    //   }
    // );

    // ancestorIds'leri arasında currentCategory._id var olan category'lerden bu currentCategory._id'yi pull et
  },
});

//ancestorId durumunu kontrol et
//parent kategori değiştirilebilir olursa iyi olur

//Recursive componentleri araştır.(categorileri listelemek için tree yapısında)
