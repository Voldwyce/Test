let dialogues = [
    { speaker: "Demonio", text: "¿Por qué me has invocado?" },
    { speaker: "David", text: "Te he invocado para hacerte una petición." },
    { speaker: "Demonio", text: "¿Cuál es tu petición?" },
    { speaker: "David", text: "Quiero conocer las canciones raras de Marina." },
    { speaker: "Demonio", text: "De acuerdo, pero deberás darme tu alma a cambio." }
];

let currentDialogue = 0;
let hasInvoked = false; 
let canClick = false; 

const message = document.getElementById("message");
const demonGif = document.getElementById("demonGif");
const demonImage = document.getElementById("demonImage");
const dialogueContainer = document.getElementById("dialogueContainer");
const dialogueText = document.getElementById("text");
const speakerElement = document.getElementById("speaker");
const triangleIndicator = document.getElementById("triangleIndicator");
const buttons = document.getElementById("buttons");
const finalMessage = document.getElementById("finalMessage");

// Sonidos desde URLs externas
const invokeSound = new Audio('https://freesound.org/data/previews/484/484467_10152441-lq.mp3');
const textSound = new Audio('https://freesound.org/data/previews/191/191100_239424-lq.mp3');
const buttonSound = new Audio('https://freesound.org/data/previews/477/477793_10273706-lq.mp3');

// Invocación del demonio
document.body.addEventListener("mousedown", startSequence);

function startSequence() {
    if (!hasInvoked) {
        hasInvoked = true;
        message.style.display = "none";
        demonGif.style.display = "block";
        invokeSound.play(); 

        setTimeout(() => {
            demonGif.style.display = "none";
            dialogueContainer.style.display = "flex";
            showDialogue();
        }, 5000);
    }
}

// Mostrar diálogos
function showDialogue() {
    if (currentDialogue < dialogues.length) {
        canClick = false; 
        const { speaker, text } = dialogues[currentDialogue];
        speakerElement.textContent = speaker; 
        dialogueText.textContent = ""; 
        triangleIndicator.style.display = "none";

        let i = 0;
        const interval = setInterval(() => {
            dialogueText.textContent += text[i];
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                triangleIndicator.style.display = "block"; 
                textSound.play(); 
                canClick = true; 
            }
        }, 50); 

        currentDialogue++;
    } else {
        triangleIndicator.style.display = "none";
        buttons.style.display = "flex";
        dialogueContainer.style.display = "none";
    }
}

// Avanzar entre diálogos
document.body.addEventListener("click", () => {
    if (hasInvoked && buttons.style.display === "none" && canClick) {
        showDialogue();
    }
});

// Botones de aceptación/rechazo
document.querySelector(".accept").addEventListener("click", () => {
    buttons.style.opacity = "0"; 
    buttons.style.pointerEvents = "none"; 
    buttons.style.height = "0"; 
    buttonSound.play(); 
    finalMessage.textContent = "El demonio ha tomado tu alma. ¡Gracias por el sacrificio!";
    finalMessage.style.display = "block";
});

document.querySelector(".reject").addEventListener("click", () => {
    buttons.style.opacity = "0";
    buttons.style.pointerEvents = "none"; 
    buttons.style.height = "0";
    buttonSound.play(); 
    finalMessage.textContent = "David está triste...";
    finalMessage.style.display = "block";
});
