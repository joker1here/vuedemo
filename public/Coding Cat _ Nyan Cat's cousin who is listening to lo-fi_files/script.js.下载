"use strict";
// Inspired by https://codepen.io/abeatrize/pen/LJqYey

/* 
MIT license

Copyright (c) 2021 by Caroline Artz (https://codepen.io/carolineartz/pen/qBOEzQa)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var _a, _b;

// Bongo Cat originally created by @StrayRogue and @DitzyFlama

const ID = "bongo-cat";
const s = (selector) => `#${ID} ${selector}`;
const notes = document.querySelectorAll(".note");
const container = document.querySelector(".container");
const toggleButton = document.querySelector(".togg");
const toggleText = document.querySelector("#texty");
const keyboardAudio = new Audio("https://e8b8e3q2.ssl.hwcdn.net/sounds/hipster/keyboard+cat.mp3");
const musicAudio = new Audio("https://e8b8e3q2.ssl.hwcdn.net/sounds/music/kawaii-rosy-kitty.mp3");
const astonishment = document.querySelector(".astonishment");
const lEye = document.querySelector(".left-eye");
const rEye = document.querySelector(".right-eye");

for (let note of notes) {
    (_a = note === null || note === void 0 ? void 0 : note.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(note.cloneNode(true));
    (_b = note === null || note === void 0 ? void 0 : note.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(note.cloneNode(true));
}
const music = { note: s(".music .note") };
const cat = {
    pawRight: {
        up: s(".paw-right .up"),
        down: s(".paw-right .down"),
    },
    pawLeft: {
        up: s(".paw-left .up"),
        down: s(".paw-left .down"),
    },
};
const style = getComputedStyle(document.documentElement);
const green = style.getPropertyValue("--green");
const pink = style.getPropertyValue("--pink");
const blue = style.getPropertyValue("--blue");
const orange = style.getPropertyValue("--orange");
const cyan = style.getPropertyValue("--cyan");
gsap.set(music.note, { scale: 0, autoAlpha: 1 });
const animatePawState = (selector) => gsap.fromTo(selector, { autoAlpha: 0 }, {
    autoAlpha: 1,
    duration: 0.01,
    repeatDelay: 0.19,
    yoyo: true,
    repeat: -1,
});
const tl = gsap.timeline();
const tl2 = gsap.timeline();
const tl3 = gsap.timeline();
tl3.from(".terminal-code line", {
        drawSVG: "0%",
        duration: 0.1,
        stagger: 0.1,
        ease: "none",
        repeat: -1,
});
tl3.pause()
tl2.add(animatePawState(cat.pawLeft.up), "start")
    .add(animatePawState(cat.pawRight.down), "start")
    .add(animatePawState(cat.pawLeft.down), "start+=0.19")
    .add(animatePawState(cat.pawRight.up), "start+=0.19")
    .timeScale(1.6);
tl2.pause()
// typing for pipe function doesn't seem to be working for usage when partially applied?
const noteElFn = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
const noteEls = noteElFn(music.note);
const numNotes = noteEls.length / 3;
const notesG1 = noteEls.splice(0, numNotes);
const notesG2 = noteEls.splice(0, numNotes);
const notesG3 = noteEls;
const colorizer = gsap.utils.random([green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"], true);
const rotator = gsap.utils.random(-50, 50, 1, true);
const dir = (amt) => `${gsap.utils.random(["-", "+"])}=${amt}`;
const animateNotes = (els) => {
    els.forEach((el) => {
        gsap.set(el, {
            stroke: colorizer(),
            rotation: rotator(),
            x: gsap.utils.random(-25, 25, 1),
        });
    });
    return gsap.fromTo(els, {
        autoAlpha: 1,
        y: 0,
        scale: 0,
    }, {
        duration: 2,
        autoAlpha: 0,
        scale: 1,
        ease: "none",
        stagger: {
            from: "random",
            each: 0.5,
        },
        rotation: dir(gsap.utils.random(20, 30, 1)),
        x: dir(gsap.utils.random(40, 60, 1)),
        y: gsap.utils.random(-200, -220, 1),
        onComplete: () => animateNotes(els),
    });
};
tl.add(animateNotes(notesG1)).add(animateNotes(notesG2), ">0.05").add(animateNotes(notesG3), ">0.25");
function onEvent() {
    if (tl2.paused()) {
        setTimeout(function() {
            tl3.pause();
        }, 90);
        tl2.resume();
        tl3.resume();
        setTimeout(function() {
            tl2.pause();
            tl2.seek(1.5);
        }, 200);
    }
};
function musicAudioToggle(music, sound) {
    if (music.played.length < 1 && sound.paused) {
        soundAudioToggle(music);
    }
};
function soundAudioToggle(sound) {
    if (sound.paused) {
        sound.play();
    } else {
        sound.pause();
    }
};
function onEventToggle() {
    soundAudioToggle(keyboardAudio);
    if (tl2.paused()) {
        tl2.resume();
        tl3.resume();
        toggleText.style.display = "block";
    } else {
        tl2.pause();
        tl2.seek(1.5);
        tl3.pause();
        toggleText.style.display = "none";
    };
    if (musicAudio.played.length > 0) {
        soundAudioToggle(musicAudio);
    }
};
function eyesAnim() {
    lEye.classList.toggle('eyes-anim');
    rEye.classList.toggle('eyes-anim');
};
function astonish() {
    eyesAnim();
    setTimeout(eyesAnim, 700);
};
function eventHandler(el, event, func) {
    el.addEventListener(event, () => {
        func();
    });
};
eventHandler(keyboardAudio, "ended", () => {
    soundAudioToggle(keyboardAudio);
});
eventHandler(musicAudio, "ended", () => {
    soundAudioToggle(musicAudio);
});
eventHandler(toggleButton, "click", onEventToggle);
eventHandler(container, "click", () => {
    onEvent();
    musicAudioToggle(musicAudio, keyboardAudio);
});
eventHandler(container, "touchstart", () => {
    onEvent();
    musicAudioToggle(musicAudio, keyboardAudio);
});
eventHandler(document, "keydown", () => {
    onEvent();
    musicAudioToggle(musicAudio, keyboardAudio);
});
eventHandler(astonishment, "click", astonish);
