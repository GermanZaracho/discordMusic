navigator.serviceWorker.register('sw.js');

var app = new Vue({
    el: '#app',
    data: {
        shuffleArray: [],
        numbersArray: [],
        note: '',
        nombre:'',
        isCase: true,
        message: 'Hello Vue!',
        chosenOne: '',
        generateNumber: 0,
        songs: false,
    },

    // Lee el localStorage y guarda el array "shuffleArray" en una constante
    // luego lo pasa al array actual
    created: function () {

        const topList = JSON.parse(localStorage.getItem("shuffleArray"))
        this.shuffleArray = topList ? topList : [];

    },

    methods: {

        mySongs(){
            this.songs = true;
        },

        noMoreSongs(){
            this.songs = false;
        },

        // Reconoce lo ingresado, lo pushea dentro de un array y lo guarda en localStorage 
        guardarNotas: function () {

            const newLink = {
                note: this.note,
                check: false,
                show: true,
                nombre: this.nombre,
            };

            this.shuffleArray.push(newLink);
            this.note = "";
            localStorage.setItem("shuffleArray", JSON.stringify(this.shuffleArray))

        },

        // Recorre el array, verifica los check y borra la nota
        deleteNote: function () {
            for (let list in this.shuffleArray) {
                if (this.shuffleArray[list].check == true) {
                    this.shuffleArray.splice(list, 1);
                }
            }
            localStorage.setItem('shuffleArray', JSON.stringify(this.shuffleArray));
        },

        randomNumber: function () {

            generateNumber = Math.floor(Math.random() * this.shuffleArray.length) + 0;

            if (!(this.numbersArray.includes(generateNumber))) {

                this.numbersArray.push(generateNumber);

                for (let link in this.shuffleArray) {
                    if (link == generateNumber) {
                        this.chosenOne = this.shuffleArray[link].note;
                        console.log(this.chosenOne + ' es el link elegido');
                        console.log(link);
                        console.log(this.shuffleArray[link].note + ' esto se mostrara');
                        console.log(generateNumber + ' fue el numero que salio');
                    }
                }

                if (this.shuffleArray.length == this.numbersArray.length) {
                    this.numbersArray = [];
                }

                this.copyToClipBoard();

            } else {
                console.log('El número ya estaba repetido');
                this.randomNumber();
            }

        },

        copyToClipBoard: function () {

            document.getElementById("linkVideo").innerHTML = `${this.chosenOne}`;
            // Get the text field
            let copyText = document.getElementById('inicio');

            // Select the text field
            copyText.select();
            copyText.setSelectionRange(0, 99999); // For mobile devices

            // Copy the text inside the text field
            navigator.clipboard.writeText(copyText.value + ' ' + `${this.chosenOne}`);

            // Alert the copied text
            alert("Copied the text: " + copyText.value + ` ${this.chosenOne}`);

        },

    }
})
