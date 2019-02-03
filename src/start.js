const {
  app,
  BrowserWindow,
  ipcMain,
  systemPreferences,
  Tray,
  nativeImage
} = require("electron");

const path = require("path");
const url = require("url");

let tray;
let window;
let isReadyToShow = false;

app.on("ready", () => {
  // Setup the menubar with an icon
  let icon = nativeImage.createFromDataURL(
    systemPreferences.isDarkMode() ? base64IconWhite : base64IconBlack
  );
  tray = new Tray(icon);

  // Add a click handler so that when the user clicks on the menubar icon, it shows
  // our popup window
  tray.on("click", function(event) {
    toggleWindow();

    // Show devtools when command clicked
    if (window.isVisible() && event.metaKey) {
      window.openDevTools({ mode: "detach" });
    }
  });

  window = new BrowserWindow({
    width: 240,
    height: 144,
    show: false,
    frame: false,
    resizable: false
  });

  window.once("ready-to-show", () => {
    isReadyToShow = true;
  });

  window.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "/../build/index.html"),
        protocol: "file:",
        slashes: true
      })
  );

  // Only close the window on blur if dev tools isn't opened
  window.on("blur", () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });

  // window.on("closed", () => {
  //   window = null;
  // });
});

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    if (isReadyToShow) showWindow();
  }
};

const showWindow = () => {
  const trayPos = tray.getBounds();
  const windowPos = window.getBounds();
  let x,
    y = 0;
  if (process.platform == "darwin") {
    x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
    y = Math.round(trayPos.y + trayPos.height);
  } else {
    x = Math.round(trayPos.x + trayPos.width / 2 - windowPos.width / 2);
    y = Math.round(trayPos.y + trayPos.height * 10);
  }

  window.setPosition(x, y, false);
  window.show();
  window.focus();
};

// ipcMain.on("show-window", () => {
//   showWindow();
// });

app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// app.on("activate", () => {
//   if (window === null) {
//     createWindow();
//   }
// });

// Tray Icon as Base64 so tutorial has less overhead
let base64IconBlack = `
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABemlDQ1BJQ0MgUHJvZmlsZQAAKJF9kLtKA1EQhj8TJeKFFFpYWCwoFpKEJIJopwbxQgqJCt6azeYmmGTZrKjYCBa2FjYqNgbRJ9BGxBcQBEEtxMbeQsFGwjonUeIFHJgz35kz83NmwOXTTXOpNgjZnG3FRoa0mdk5zfOECzettODRjYI5ODERRewr/rS3W2pUvPErrb/v/1pjIlkwoKZeeMAwLVt4VLhjxTYVK71WSz4lvKE4XeEdxfEKn5RrpmIR4XNhzcjoCeEHYZ+RsbLgUvqd8W816W+cXVo2Pv+jJmlK5qYnVb14OwVijDCExhjDROglRL+cvfgJE5AbdnLVVs2RvLlmLaYztjYom0hqYzkj4NPCwVA/qL3+3lc1l5d5+p7BvV3NxY/gbBvaHqu5zgPwbsLphalbejnlFnelUvByDM2z0HINDfOFVE+4MlHTONQ9Oc5rN3j2obTlOO+HjlMqSvM9XO5UdvSpRfEOptYhegW7e9Al2t6FD8yeZzlddgPBAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAACYElEQVQ4EZ2Uv2tUQRCA59078+OMRVCwsJEUommDmMLOdFqIhZ2EaCUqQv4OC8VWiFgo2IilcvFXYWNjQBELu2AlSCAavZg7v2/v7ctFTVAHvn2zOzuzs/PmvTIimtCFS3AGFsG1xg6U2ApQrsN+WAL9ammjfapnf6/8YOu9vL05EjFB2OHViB6LnT0RhzoRBznejdsKm8tdER/x+86mYixiEoe1Jo4LGxFHWbwCDRbvcJ9jRt9JrAd+L3jMs38d/Q2xnuU7j7YiLmLsEGgKrGmOmWvlXD2tMxhzGj+fY8y1lQbU2V1TPhEOq4M5TwFUkEHdfU0WjidLf+imDOtj+4u+wX+WKkbPgC1OWYY5cucdpSy0NxgsAbWvM9tgrceafjySNLjiV7QFaGkYwfL2W0Q7mf9zIBNfygEL2kMZruKYoRkpN+ELPAS6KckjxguV7t6UkPMqRteASk5ffR1OwinYDeNwDnxph8GrKVwq9SqdlsQYhQEJXksOTL+m0yd50rPJ+QZPP0+7Qp+cDOqmpCtvTlPLuPYcrsETuA9eeaWaz/H0EAP/HnQ04jXoqFgTZTBr5+/hLCzBO3gFua5D6EGMtrE84Vdn7V4de5JbjA9gAgx8BPhA4jQoW/p2sJ/65v7oQWvgi/CXtg+m4TLcBd/wU1D8YmrJNchZeoDk1tmLfhWs10uYhc9gdstgu22JobOb7TfFVlByKzzuT+txEU2y+OvKYoxxP+4h0jvBHc5zVG5wN1nHkqHA7gEFuvXyk/Sa4s0KMrI8M9g/FFR+nsksmKkbthNt+PxRXPfqt38CeO2O7ar5MfwAAAAASUVORK5CYII=
`;

let base64IconWhite = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABeWlDQ1BJQ0MgUHJvZmlsZQAAKJF9kE0rRGEUx39miLwksbCwuEUWGjJD09hhkpcsNChvmzt33tS83O5cIRtlYWthg2xIfAI2ki+glMJCNvYWlI2m6zwzoxmUU+c5v+c85/x7zgGXRzfNZGUvpNK2FRod1ubmF7TqF1y4aaKfgG5kzaGpqUnEvuNP+7inQsW7bqX19/1fq4tEswZU1AgPGqZlC48Jt6/apmKl12LJp4Q3FccLvKs4XOCzfM1MKCh8KawZCT0i/CTsMRJWClxKvyNcVhMv41RyxSj+R01SH03PTqt68TayhBhlGI1xRgjix8uAnH668dEjN+zomq2agxlz3VqOJ2xtSDYR1cbTRo9H8/V6B0Dt9fe+SrmMzBN4BfdOKRc+gYsdaH0u5ToOoXELzq9M3dLzKbe4KxaDt1NomIfmW6hdzMb6fIWJ6ieg6sVx3rug+gBy247zeeQ4uWNpfoTr3cKOilocP8DMBkzewN4+dIp249IXbapniCalZc8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAFZaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CkzCJ1kAAAItSURBVDgRlZQ9S1xBFIZn7q5mEaKiAfPRxDaFgqiFWKRUi+QPbIhglTatVQS7dIpWggh+tKLWolF/gPYGEkhIUqRI/P64Pu/snPXeRWE98Ox5Z+bMe+fOzF3n7og0Tf0d3bmubE1WhyI6EglyGXqjbkQX76Ex1owwPhx1QVkmwSzqY9qTYaCOH2p3YNtK0b7ovb9GvKKzBX5DifYA+TlcQm2kdDyCQ+rOnHcX5H7af/D6Gorp2IK/8B4moJ44p+gjfIjFszIrBkfn/pNbQa/bDBdwBV7LUeiUpONpSWruOKhWEd7GDCtdzr0wQW6Qzh53Vse6tpiVwrPNUJPPYQNKcVCnZh5arULt66Buf7TCtxC8zFAHssymjpIfHOzhLpMea6Jdmer2MNikAXI37MEUJJF58rM4rjuq086FrTDbaZs8R+c4jME7OIMO3uInRrpul2S6qpHbQ9srjZo+QneC9vcJvIEhUNie5hw1kH1ltRVmWE5dOkJ7FTpgE/SpfSJbWK3aQZuhFShfMYk38t8Tn2hV69AHugVleMkxT5MVle+3osNqzTD3JMzwTMM9pHYFPsNT+AKLTOoi10bwsEORu5kXMHOY6hvtYuA48X4DfUDNAuiARkFhc2QWVpg11Ocno1NlBXqfpNeW/kZ6LW1B34k0DztB5wx1nwYZ0F61Q+0pagW2Gk1UW1+M+v5xeD3kX1D9c1hC677NgIpFPSFz/t79D/JaPRMeVMMb+htAVzRN1vUlJgAAAABJRU5ErkJggg==`;
