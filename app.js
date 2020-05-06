$(document).ready(function(){
  $('.modal').modal();
  $('.modal-trigger').click(paintModal)
  paintStars();
  showCards();
  getMovies();
  
});

const paintStars = () => {
  for (let i = 0; i < 100; i++) {
    let star = document.createElement("div");  
    star.className = "star";
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.body.append(star);
  }
}



const getRandomPosition = () => {  
  var y = window.innerWidth;
  var x = window.innerHeight;
  var randomX = Math.floor(Math.random()*x);
  var randomY = Math.floor(Math.random()*y);
  return [randomX,randomY];
}

const showCards = () => {
  setTimeout(function(){
    const container = $('#container');
    container.addClass('block');
  }, 18000);
}

const getMovies = () => {
  $.post({
    url: 'https://swapi.apis.guru/',
    data: JSON.stringify({ "query": " { allPeople { people { mass eyeColor name height hairColor gender skinColor } } } " }),
    contentType: 'application/json'
  }).done(function(response) {
    let data = ('Fetched:', response.data);
    paintPeople(data['allPeople']['people']);
    
  });
}


const paintPeople = (peopleArray) => {
  peopleArray.forEach(function(element, index){
    if(index < 16){
      let movie = `
                  <div class="card-people col s3">
                    <a data-name=${element.name} data-gender=${element.gender} data-eyeColor=${element.eyeColor} data-mass=${element.mass} data-height=${element.height} data-hairColor=${element.hairColor} data-skinColor=${element.skinColor} class="black waves-effect waves-light btn modal-trigger" href="#modal1" onclick="paintModal()"><img class="character-pic" src="https://starwars-visualguide.com/assets/img/characters/${index+1}.jpg"></a>
                  </div>
      `
      let container = document.getElementById('row-container');
        container.innerHTML += movie;
    } else if(index > 16){
      let movie = `
                  <div class="card-people col s3">
                    <a data-name=${element.name} data-gender=${element.gender} data-eyeColor=${element.eyeColor} data-mass=${element.mass} data-height=${element.height} data-hairColor=${element.hairColor} data-skinColor=${element.skinColor} class="black waves-effect waves-light btn modal-trigger" href="#modal1" onclick="paintModal()"><img class="character-pic" src="https://starwars-visualguide.com/assets/img/characters/${index+2}.jpg"></a>
                  </div>
      `
      let container = document.getElementById('row-container');
        container.innerHTML += movie;


    }
  

  })
    
}


const paintModal = () => {
  $('#name').text(event.target.parentElement.dataset.name)
  $('#hair-color').text('Hair color: ' + event.target.parentElement.dataset.haircolor)
  $('#eye-color').text('Eye color: ' + event.target.parentElement.dataset.eyecolor)
  $('#skin-color').text('Skin color: ' + event.target.parentElement.dataset.skincolor)
  $('#mass').text('Mass: '+ event.target.parentElement.dataset.mass)
  $('#height').text('Height: ' + event.target.parentElement.dataset.height + 'cm')
  $('#gender').text('Gender: ' + event.target.parentElement.dataset.gender)
  $('#pic').attr('src', event.target.src)

}