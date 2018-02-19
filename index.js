state = 
{
	items: []
};

shoppingItemTemplate = 
	'<li>' + 
		'<span class="shopping-item js-shopping-item"></span>' + 
		'<span class="js-shopping-item-index"></span>' +
		'<div class="shopping-item-controls">' +
			'<button class="shopping-item-toggle js-shopping-item-toggle">' + 
				'<span class="button-label">check</span>' +
			'</button>' +
			'<button class="shopping-item-delete js-shopping-item-delete">' +
				'<span class="button-label">delete</span>' +
			'</button>' +
		'</div>'
	'</li>';

function initializeState(state)
{
	$('li').each(function(){
			var text = $(this).find('.shopping-item').text();
			var checkedOffValue = $(this).find('.shopping-item__checked').length;
			state.items.push({displayName: text, checkedOff: checkedOffValue});});
}

function addItem(item, state)
{
	state.items.push({displayName: item, checkedOff: false});
}

function updateItem(index, state)
{
	state.items[index].checkedOff = !state.items[index].checkedOff;
}

function deleteItem(index, state)
{	
	state.items.splice(index, 1);
}

function renderState(state, element, elementTemplate)
{
	var stateHtml = state.items.map(function(item, index){
		var element = $(elementTemplate);
		element.find('.js-shopping-item').text(item.displayName);
		element.find('.js-shopping-item-index').text(index).hide();
		if (item.checkedOff)
		{
			element.find('.js-shopping-item').addClass('shopping-item__checked');
		}
		return element;
	})

	element.html(stateHtml);
}

function handleAddItem(textAreaElement, state)
{	
	addItem(textAreaElement.val(), state);
	textAreaElement.val('');
}

function handleUpdateItem(currentElement, state)
{
	var liElement = currentElement.closest('li');
	var index = parseInt(liElement.find('.js-shopping-item-index').text());
	updateItem(index, state);
	liElement.find('.js-shopping-item').toggleClass('shopping-item__checked');
}

function handleDeleteItem(currentElement, state)
{
	var index = parseInt(currentElement.closest('li').find('.js-shopping-item-index').text());
	deleteItem(index, state);
}

function onLoad()
{
	var shoppingListFormElement = $('#js-shopping-list-form');
	var shoppingListElement = $('.shopping-list');
	var textAreaElement = $('input[type="text"]');

	initializeState(state);
	renderState(state, shoppingListElement, shoppingItemTemplate);

	shoppingListFormElement.submit(function(event){
		event.preventDefault();
		handleAddItem(textAreaElement, state);
		renderState(state, shoppingListElement, shoppingItemTemplate);
	});

	shoppingListElement.on('click', '.js-shopping-item-toggle', function(){
		handleUpdateItem($(this), state);
	});

	shoppingListElement.on('click', '.js-shopping-item-delete', function(){
		handleDeleteItem($(this), state);
		renderState(state, shoppingListElement, shoppingItemTemplate);
	});
}

$(onLoad);