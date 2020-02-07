
//профессии

var prof = [["водитель", "развозить"], ["архитектор", "архитектурить"], ["бухгалтер", "считать деньги"]];

var prof_count = prof.length;

for (k = 0; k < prof_count; k++) {
	let tr = document.createElement('tr'),
	td1 = document.createElement('td');
	td2 = document.createElement('td');
	td3 = document.createElement('td');

	td1.innerHTML = 'профессия: ' + prof[k][0] + '.';
	td2.innerHTML = 'обязаннсти: ' + prof[k][1] + '.';
	td3.innerHTML = '<a href="#" onclick="delete_prof(' + k + ');">удалить</a>';

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);


	document.getElementById('profs').appendChild(tr);
}


//поиск
function tableSearch() {
	var phrase = document.getElementById('search-text');
	var table = document.getElementById('authors');
	var regPhrase = new RegExp(phrase.value, 'i');
	var flag = false;

	for (var i = 0; i < table.rows.length; i++) {
		flag = false;
		for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
			flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
			if (flag) break;
		}
		if (flag) {
			table.rows[i].style.display = "";
		} else {
			table.rows[i].style.display = "none";
		}
	}
}

//Добавить пользователя
var button = document.getElementById("button");

var i = 0;

button.addEventListener("click",function() {
	function createNode(element) {
		return document.createElement(element);
	}
	function append(parent, element) {
		return parent.appendChild(element);
}
fetch('https://randomuser.me/api/?results=3').then((resp) => resp.json()).then(function(data) {

	let authors = data.results;
	return authors.map(function(authors) {
		let tr = createNode('tr'),
		img = createNode('img'),
		td1 = createNode('td');
		td2 = createNode('td');
		td3 = createNode('td');

		td4 = createNode('td');
		td5 = createNode('td');
		td6 = createNode('td');


		td6.id = 'prof_id_' + i;

		td7 = createNode('td');

		td8 = createNode('td');


		img.src = authors.picture.medium;
		td1.innerHTML = authors.name.first + " " + authors.name.last;
		td2.innerHTML = authors.dob.date;
		td3.innerHTML = '<td><button id="remove" class="button-remove">Удалить сотрудника</button></td>';

		td6.innerHTML = 'профессия не указана';

		var td7_str =  '<select class="p" onchange="changeJob(' + i + ')" id="set_p' + i + '">';

		td7_str = td7_str + '<option value="default">установить профессию</option>';

		var prof_count = prof.length;
		
		for (k = 0; k < prof_count; k++) {
			td7_str = td7_str + '<option value="' + k + '"">' + prof[k][0] + '</option>';
		}		

		td7_str = td7_str + '</select>';

		td7.innerHTML = td7_str;

		append(tr, img) ;
		append(tr, td1);
		append(tr, td2);
		append(tr, td3);

		append(tr, td4);
		append(tr, td5);
		append(tr, td6);
		append(tr, td7);



		append(document.getElementById('authors'), tr);


		i++;
	})

})
.catch(function(error) {
	console.log(error);
})
})

//Удаление строки
authors.addEventListener('click', function(evt){
	if(evt.target.closest('.button-remove')) {
	evt.target.closest('tr').remove()
	}
})


//редактирование
window.onload = function(){

var e = document.getElementById('Rock');

var arr = new Array(1,3,5,6);

for (var i = 0; i < arr.length; i++)
{
	var option = document.createElement('option');
	option.innerHTML = arr[i];
	e.appendChild(option);
}

}

function add_prof() {
	var prof_name = document.getElementById('prof_name').value, 
	prof_desc = document.getElementById('prof_desc').value;

	var curent_pos = prof.length + 1;

	prof.push([prof_name, prof_desc]);

	//alert(prof);

	let tr = document.createElement('tr'),
	td1 = document.createElement('td');
	td2 = document.createElement('td');
	td3 = document.createElement('td');

	td1.innerHTML = 'профессия: ' + prof_name + '.';
	td2.innerHTML = 'обязаннсти: ' + prof_desc + '.';
	td3.innerHTML = '<a href="#" onclick="delete_prof(' + (prof.length - 1) + ');">удалить</a>';

	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);

	document.getElementById('profs').appendChild(tr);

	var x = document.getElementsByClassName("p");
	var i;
	for (i = 0; i < x.length; i++) {
	    var opt = document.createElement('option');
	    opt.value = prof.length - 1;
	    opt.innerHTML = prof_name;
	    x[i].appendChild(opt);
	}	
}

function delete_prof(id) {

	prof.splice(id);

	var prof_count = prof.length;
	document.getElementById('profs').innerHTML = '';

	for (k = 0; k < prof_count; k++) {
		let tr = document.createElement('tr'),
		td1 = document.createElement('td');
		td2 = document.createElement('td');
		td3 = document.createElement('td');

		td1.innerHTML = 'профессия: ' + prof[k][0] + '.';
		td2.innerHTML = 'обязаннсти: ' + prof[k][1] + '.';
		td3.innerHTML = '<a href="#" onclick="delete_prof(' + k + ');">удалить</a>';

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);


		document.getElementById('profs').appendChild(tr);
	}	

	var x = document.getElementsByClassName("p");


	var i;
	for (i = 0; i < x.length; i++) {
	    x[i].innerHTML = '';
	}

	var prof_count = prof.length;
	
	for (k = 0; k < prof_count; k++) {
		for (i = 0; i < x.length; i++) {
			x[i].innerHTML = x[i].innerHTML + '<option value="' + k + '"">' + prof[k][0] + '</option>';
		}
	}		
}

function changeJob(id) {
	var id_value = document.getElementById('set_p' + id).value;

	if (id_value != 'default') {
		return document.getElementById('prof_id_' + id).innerHTML = 'профессия: ' + prof[id_value][0] + ', обязанности: ' + prof[id_value][1];
	} else {
		return document.getElementById('prof_id_' + id).innerHTML = 'профессия не указана';
	}
}
