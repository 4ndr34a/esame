
document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger, SplitText);

const split1 = new SplitText("#section1 h1", {type: "lines, words, chars, letters"});
const split2 = new SplitText("#section1 h2", {type: "lines, words, chars, letters"});
const split3 = new SplitText("#section2 h1, #section2 h2, #section2 h3, #section2 h4", {type: "lines, words, chars, letters"});


gsap.from(split1.chars, {
    scrollTrigger : {       
        trigger: "#section1",
        markers: false,
        pin: true,
        scrub: true,
    }, 
    
    y: -400,
    opacity: 0,
    duration: 5,
    stagger : 0.1,
    ease: "back.out(1)", 
});


gsap.from(split2.chars, {
    scrollTrigger : {
        trigger: "#section1",
        scrub: true,
    },
    
    y: -10000,
    opacity: 0,
    duration: 5,
    stagger : 0.007,
    ease: "back.out(0.1)",  
});



gsap.from(split3.lines, {
    scrollTrigger : {       
        trigger: "#section2",
        markers: false,
        pin: true,
        scrub: true,
    }, 
    
    y: -800,
    opacity: 0,
    duration: 10,
    stagger : 1.5,
    ease: "back.out(0.8)",
})});