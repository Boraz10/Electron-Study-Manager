// Global script

console.log("Script loaded.");

// set the font based on settings, defaulting to Pixelify Sans

const fontMap: Record<string, string> = {
  "Bebas Neue": "'Bebas Neue', sans-serif",
  "Pixelify Sans": "'Pixelify Sans', sans-serif",
  "Rubik": "'Rubik', sans-serif",
  "Jacquard 24": "'Jacquard 24', serif",
  "Jacquard 12": "'Jacquard 12', serif",
//   "Jacquarda Bastarda 9": "'Jacquarda Bastarda 9', serif",
  "Jersey 25": "'Jersey 25', sans-serif",
  "Tiny5": "'Tiny5', monospace",
  "Micro 5": "'Micro 5', monospace",
};

const currentFont = window.settingsAPI.getSettings('font') as string;

document.documentElement.style.setProperty(
  '--app-font',
  fontMap[currentFont] ?? "'Pixelify Sans', sans-serif"
);

// Handle sounds
const soundEnabled = window.settingsAPI.getSettings('soundEnabled') as boolean;
if (soundEnabled) playSound('button_up');

if (soundEnabled) {
    let buttons = document.querySelectorAll<HTMLElement>('.clickable');
    if (buttons) {
        for (const button of buttons) {
            button.addEventListener('mousedown', () => {
                playSound('button_down');
            });

            button.addEventListener('mouseup', () => {
                playSound('button_up');
            });
        }
    }
}

updateBackground();


// update bacxkground based on page
 //update bacground based on time of day
function updateBackground() {
    const now = new Date();
    const hour = now.getHours();

    // Determine asset path based on current document location
    const isInSubfolder = window.location.pathname.includes('/html/');
    const assetPath = isInSubfolder ? '../Assets' : './Assets';

        let bgImage : string = "";
        let bgColor : string = "";
        if          (hour < 9 && hour >= 5) {
            bgImage = `url('${assetPath}/bg_dawn.gif')`;
            bgColor = "#FFDAB9";
        } else if   (hour < 16) {
            bgImage = `url('${assetPath}/bg_day.gif')`;
            bgColor = "#87CEEB";
        } else if   (hour < 21 || hour < 5) {
            bgImage = `url('${assetPath}/bg_dusk.gif')`;
            bgColor = "#FFA07A";
        }  else {
            bgImage = `url('${assetPath}/bg_night.gif')`;
            bgColor = "#2F4F4F";
        }

        document.body.style.backgroundImage = bgImage;
        document.body.style.backgroundColor = bgColor;
}

export function playSound(sound: string) {
    const isInSubfolder = window.location.pathname.includes('/html/');
    const assetPath = isInSubfolder ? '../Assets' : './Assets';
    const audio = new Audio(`${assetPath}/Audio/${sound}.wav`);
    audio.play();
}

