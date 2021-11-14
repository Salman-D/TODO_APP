var unorder_item = document.getElementById('unorder')

firebase.database().ref('Todo').on('child_added',function(smit){
    var data = smit.val()
    console.log(data.key_ITEM)

    var lst_item = document.createElement('li')
    var list_text = document.createTextNode(data.todo_item)
    lst_item.appendChild(list_text)
    console.log(lst_item)
    unorder_item.appendChild(lst_item)

    var edit2 = document.createElement('button')
    edit2.setAttribute('onclick','edit(this)')
    edit2.setAttribute('class','edit_btn fas fa-edit')
    edit2.setAttribute('id',data.key_ITEM)

    var delete_2 = document.createElement('button')
    var delete_text_2 = document.createTextNode('Delete')
    delete_2.setAttribute('class','edit_btn fas fa-delete')
    delete_2.setAttribute('onclick','delete_todo(this)')
    delete_2.setAttribute('id',data.key_ITEM)
    // edit.appendChild(edit_text)
    delete_2.appendChild(delete_text_2)
    lst_item.appendChild(edit2)
    lst_item.appendChild(delete_2)


})


function add_todo(){
    var val = document.getElementById('inp')
    // console.log(val.value)

   var key =  firebase.database().ref('/Todo').push().getKey()
//    console.log(key)
    var obj  = {
        todo_item : val.value,
        key_ITEM : key
    }  

    // console.log(obj)
    firebase.database().ref('/Todo/'+key).set(obj)
}

function edit(e){
    var val = e.parentNode.childNodes[0].nodeValue
    var inp = prompt("Enter Value",val)
    e.parentNode.childNodes[0].nodeValue = inp

    firebase.database().ref('/Todo/').child(e.id).set({
        todo_item:inp,
        key_ITEM:e.id})
}

function delete_todo(e){

    console.log(e.parentNode)
    firebase.database().ref('/Todo/'+e.id).remove()
    e.parentNode.remove()

}

function delete_all_todo(){

    firebase.database().ref('/Todo/').remove()
    unorder_item.innerHTML=''
}