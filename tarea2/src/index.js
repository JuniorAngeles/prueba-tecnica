async function fetchDogBreeds() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  return data.message;
}

async function fetchDogImage(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const data = await response.json();
  return data.message;
}

async function displayDogList() {
  const dogListContainer = document.getElementById('dog-list');
  const breeds = await fetchDogBreeds();
  for (const breed in breeds) {
    const dogCard = document.createElement('div');
    dogCard.classList.add('dog-card');

    const dogImage = document.createElement('img');
    dogImage.src = await fetchDogImage(breed);
    dogImage.alt = breed;

    const dogName = document.createElement('h3');
    dogName.innerText = breed;

    const breedOverlay = document.createElement('div');
    breedOverlay.classList.add('breed-overlay');

    const subBreedList = document.createElement('ul');
    if (breeds[breed].length > 0) {
      breeds[breed].forEach((subBreed) => {
        const listItem = document.createElement('li');
        listItem.textContent = subBreed;
        subBreedList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement('li');
      listItem.textContent = 'No sub-breeds';
      subBreedList.appendChild(listItem);
    }
    breedOverlay.appendChild(subBreedList);

    dogCard.appendChild(dogImage);
    dogCard.appendChild(dogName);
    dogCard.appendChild(breedOverlay);
    dogListContainer.appendChild(dogCard);
  }
}

document.addEventListener('DOMContentLoaded', displayDogList);
