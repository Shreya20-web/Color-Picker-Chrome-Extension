// const btn = document.querySelector('.changeColorBtn');

// btn.addEventListener('click', async () => {
//       let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
//       chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             function: pickColor,
//       });
// });

// async function pickColor() {
//       try {
//           const eyeDropper = new EyeDropper();
//           const selectedColor = await eyeDropper.open();
  
//           if (selectedColor) {
//               console.log(selectedColor);
//           } else {
//               console.log('Color selection was canceled by the user.');
//           }
//       } catch (err) {
//           console.log(err);
//       }
//   }
  

document.getElementById("changeColorBtn").addEventListener("click", () => {
      const resultElement = document.getElementById("colorValue");
      const grid = document.getElementById("colorGrid");

      chrome.storage.sync.get('color', ({ color }) => {
            console.log("color: ", color);
      })
    
      if (!window.EyeDropper) {
        resultElement.textContent =
          "Your browser does not support the EyeDropper API";
        return;
      }
    
      const eyeDropper = new EyeDropper();
    
      eyeDropper
        .open()
        .then((result) => {
          resultElement.textContent = result.sRGBHex;
          grid.style.backgroundColor = result.sRGBHex;

            navigator.clipboard.writeText(result.sRGBHex);
        })
        .catch((e) => {
          resultElement.textContent = e;
        });
    });