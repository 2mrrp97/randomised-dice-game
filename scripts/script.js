var play_audio = true;
var audio_state = document.querySelector('.audio_btn strong i');
document.querySelector('.audio_btn').addEventListener('click', () => {
    play_audio = play_audio == true ? false : true;

    if (play_audio) {
        audio_state.textContent = "AUDIO ON";
        audio_state.style.color = "green";
    }
    else {
        audio_state.textContent = "AUDIO OFF";
        audio_state.style.color = "red";
    }
    document.querySelector('.vlControlContainer').classList.toggle('hidden');
});

function play() {
    var player = Math.floor(Math.random() * 6) + 1;
    var computer = Math.floor(Math.random() * 6) + 1;

    document.querySelector('.img1').setAttribute('src', `./images/dice${player}.png`);
    document.querySelector('.img2').setAttribute('src', `./images/dice${computer}.png`);

    if (player == computer)
        return -1;

    return player < computer ? 0 : 1;
};

var vol = 100;
var volVal = document.getElementById('volVal');
var audio = new Audio("./audio/winner.mp3");

document.querySelectorAll(".vlControl").forEach(element => {

    element.addEventListener('click', () => {
        if (element.dataset.id == 'add') {
            vol = Math.min(100, vol + 1);
            audio.volume = vol / 100;
        }
        else {
            vol = Math.max(0, vol - 1);
            audio.volume = vol / 100;
        }

        volVal.value = vol;
    });
});

volVal.addEventListener('input', (event) => {
    console.log(volVal.value);
    audio.volume = volVal.value / 100;
});

var winnerText = document.querySelector('.winnerText')
document.getElementById('play').addEventListener('click', () => {
    var winner = play();

    if (winnerText.classList.contains('hidden'))
        winnerText.classList.remove('hidden');

    winnerText.textContent = `${winner == 1 ? "Player" : (winner == 0 ? "Computer" : "It's a draw , nobody")} wins !`;

    if (winner == 1 && play_audio) {
        audio.play();
    }
});