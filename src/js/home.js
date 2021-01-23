

const getUser = new Promise(function(todoBien, todoMal){
	//aca se puede llamar a un api
	setTimeout(function(){
		todoMal('se acabo el tiempo');
	}, 3000)
})

getUser
	.then(function(){
		console.log('todo esta bien en la vida');
	})
	.catch(function(message){
		console.log(message);
	})

/*Promise.all([
	getUser,
	getUser,
	])
	.then()
	.catch(function(message){
		console.log(message)
	})
*/
fetch('https://randomuser.me/api/')
	.then(function(response){
		console.log(response)
		return response.json()
		
	})
	.then(function(user){
		console.log('user', user.results[0].name.first)
	});

(async function load(){
	//await

	async function getData(url){
		const response = await fetch(url);
		const data = await response.json()
		return data;

	}
	const $form = document.getElementById('form');
	const $home = document.getElementById('home');
	const $featuringContainer = document.getElementById('featuring');

	function setAttributes($element, attributes){
		for (const attribute in attributes){
			$element.setAttribute(attribute, attributes[attribute]);

		}
	}
	$form.addEventListener('submit', (event) => {
		event.preventDefault();
		$home.classList.add('search-active');
		const $loader = document.createElement('img');
		setAttributes($loader, {
			src: 'src/images/loader.gif',
			height: 50,
			width: 50
		})
		$featuringContainer.append($loader);
	})

	const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
	const terrorList = await getData('https://yts.mx/api/v2/list_movies.json?genre=terror');
	const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation');
	console.log(actionList, terrorList, animationList);
	
	function videoItemTemplate(movie){
		return(
			`<div class="primaryPlaylistItem">
    		  <div class="primaryPlaylistItem-image">
    		    <img src="${movie.medium_cover_image}">
    		  </div>
    		  <h4 class="primaryPlaylistItem-title">
    		    ${movie.title}
    		  </h4>
    		</div>`
			)
	}


	function createTemplate(HTMLString) {
   		const html = document.implementation.createHTMLDocument();
   		html.body.innerHTML = HTMLString;
   		return html.body.children[0];
  	}
  	function addEventClick($element){
  		$element.addEventListener('click', () =>{
  			showModal()
  		})
  	}
  	function renderMovieList(list, $container) {
  	  $container.children[0].remove();
  	  list.forEach((movie) => {
  	    const HTMLString = videoItemTemplate(movie);
  	    const movieElement = createTemplate(HTMLString);
  	    $container.append(movieElement);
  	    addEventClick(movieElement);
  	  });
  	}
  	
	//console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'Mi Bitcoin'));
	const $actionContainer = document.querySelector('#action');
	renderMovieList(actionList.data.movies, $actionContainer);


	const $terrorContainer = document.getElementById('drama');
	renderMovieList(terrorList.data.movies, $terrorContainer);

	const $animationContainer = document.getElementById('animation');
	renderMovieList(animationList.data.movies, $animationContainer);

	const $modal = document.getElementById('modal');
	const $overlay = document.getElementById('overlay');
	const $hideModal = document.getElementById('hide-modal');

	const $modalTitle = $modal.querySelector('h1');
	const $modalImage = $modal.querySelector('img');
	const $modalDescription = $modal.querySelector('p');

	function showModal(){
		$overlay.classList.add('active');
		$modal.style.animation = 'modalIn .8s forwards';
	}

	$hideModal.addEventListener('click', hideModal);
	function hideModal(){
		$overlay.classList.remove('active');
		$modal.style.animation = 'modalOut .8s forwards'
	}

})()