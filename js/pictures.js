var generatePicturesJS = function (amountPictures) {
  var dataPictures = [];

  for (var i = 0; i < amountPictures; i++) {

    var picture = {
      url: '',
      likes: 0,
      comments: [],
      description: ''
    };

    var generateLikes = function randomNumber(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min))
    };

    var generateComments = function (amountComments) {

      var commentsData = [
        'Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
      ];

      var resultComments = [];

      for (var i = 0; i < amountComments; i++) {
        var wantedCommentIndex = Math.floor(Math.random() * commentsData.length);
        resultComments.push(commentsData[wantedCommentIndex]);
        commentsData.splice(wantedCommentIndex, 1); //Удаляем выбранный элемент
      }
      return resultComments;
    };

    var generateDescription = function () {

      var descriptionData = [
        'Тестим новую камеру!',
        'Затусили с друзьями на море',
        'Как же круто тут кормят',
        'Отдыхаем...',
        'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
        'Вот это тачка!'
      ];

      return descriptionData[Math.floor(Math.random() * descriptionData.length)];
      };

    picture.url = 'photos/' + (i + 1) + '.jpg';
    picture.likes = generateLikes(15, 200);
    picture.comments = generateComments(Math.floor(Math.random() * 2 + 1));
    picture.description = generateDescription();

    dataPictures.push(picture);
  }

  return dataPictures;
};


var generatePicturesDOM = function (picturesJS) {
  var generatePictureData = [];

  for (var i = 0; i < picturesJS.length; i++) {
    var pictureMarkup = document.querySelector('#picture')
      .content
      .querySelector('.picture__link');

    pictureMarkup.querySelector('.picture__img').src = picturesJS[i].url;
    pictureMarkup.querySelector('.picture__stat--likes').textContent = picturesJS[i].likes;
    pictureMarkup.querySelector('.picture__stat--comments').textContent = picturesJS[i].comments.length;

    var pictureElement = pictureMarkup.cloneNode(true);
    generatePictureData.push(pictureElement);
  }
  return generatePictureData;
};

var insertPictures = function (elementsDOM) {
  var picturesBlock = document.querySelector('.pictures');
  var picturesFragment = document.createDocumentFragment();

  for (var i = 0; i < elementsDOM.length; i++) {
    var generatePictureFragment = elementsDOM[i];
    picturesFragment.appendChild(generatePictureFragment);
  }
  picturesBlock.appendChild(picturesFragment);
};


var generateBigPicturesDOM =  function (picturesJS) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  var firstPictureJS = picturesJS[0];

  bigPicture.querySelector('.big-picture__img').firstElementChild.src = firstPictureJS.url;
  bigPicture.querySelector('.likes-count').textContent = firstPictureJS.likes;
  bigPicture.querySelector('.comments-count').textContent = firstPictureJS.comments.length;
  bigPicture.querySelector('.social__caption').textContent = firstPictureJS.description;

  var generateCommentsBlock = function(pictureJS) {

    var blockCommentsDOM = document.querySelector('.social__comments');
    var blockCommentsDOMElementProrotype = blockCommentsDOM.querySelector('.social__comment');

    while (blockCommentsDOM.firstChild) {
      blockCommentsDOM.removeChild(blockCommentsDOM.firstChild);
    }

    for(var i = 0; i < pictureJS.comments.length; i++) {

      var blockCommentsDOMElement = blockCommentsDOMElementProrotype.cloneNode(true);

      blockCommentsDOMElement.querySelector('.social__picture').src = 'img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg';
      blockCommentsDOMElement.querySelector('.social__text').textContent = pictureJS.comments[i];

      blockCommentsDOM.appendChild(blockCommentsDOMElement);

      };
    return blockCommentsDOM;
    };

  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');

  generateCommentsBlock(firstPictureJS);
};

var picturesJS = generatePicturesJS(25);
var picturesDOM = generatePicturesDOM(picturesJS);
insertPictures(picturesDOM);
generateBigPicturesDOM(picturesJS);


