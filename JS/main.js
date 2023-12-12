// Locomotive Task
function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function headerAnimation(){
    gsap.to(".logo a",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger: "#home",
            scroller: "#main",
            start:"top 0",
            end: "top -5%",
            scrub:true
        }
    })
        gsap.to(".nav-links a",{
            color: "#000",
            scrollTrigger:{
                trigger: "#home",
                scroller:"#main",
                start:"top 0",
                end: "top -5%",
                scrub:true,
                ease: 'power4.out'
            }
        })
        // gsap.to(".nav-links a:hover",{
        //     color: "#fff",
        //     scrollTrigger:{
        //         trigger: "#home",
        //         scroller:"#main",
        //         start:"top 0",
        //         end: "top -5%",
        //         scrub:true,
        //     }
        // })
        gsap.to("header",{
            backgroundColor: "#fff",
            paddingBottom: "10px",
            scrollTrigger:{
                trigger: "#home",
                scroller:"#main",
                start:"top 0",
                end: "top -5%",
                scrub:true,
                ease: 'bounce'  
            }
        })
        gsap.to(".icons",{
            color: "#000",
            scrollTrigger:{
                trigger: "#home",
                scroller:"#main",
                start:"top 0",
                end: "top -5%",
                scrub:true,
                ease: 'power4.out'
            }
        })
}
headerAnimation()
}
 


function Toggle(){
    const menu = document.querySelector(".ri-menu-line");
    const navres = document.querySelector(".nav-links-res");
    const icons = document.querySelector(".icons")
    menu.addEventListener("click",()=>{
        navres.classList.toggle("active")
        icons.classList.toggle("ri-menu-line")
        icons.classList.toggle("ri-close-line")
        
    })
}

function HeaderToggle(){
    const scrolltop = document.querySelector("header");
    window.addEventListener("scroll",()=>{
        scrolltop.classList.toggle("show",window.scrollY > 100);
        let logoswitch = document.querySelector(".logochange");
        let navlinks = document.querySelectorAll(".nav-links a");
        let icons = document.querySelectorAll(".icons");
        
        
        if(window.scrollY > 100){
            logoswitch.src = "../Img/Jevelin_logo_dark.png";
            navlinks.forEach((links)=>{
                links.classList.add("color")
            })
            icons.forEach((links)=>{
                links.classList.add("color")
            })
        }
        else{
            logoswitch.src = "../Img/Jevelin_logo.png";
            navlinks.forEach((links)=>{
                links.classList.remove("color")
            })
            icons.forEach((links)=>{
                links.classList.remove("color")
            })
        }
    });
}
function RemoveClassesLink(){
 let respnav = document.querySelectorAll(".nav-links-res a");
 let resp = document.querySelector(".nav-links-res")
 let icons = document.querySelector(".icons")
 respnav.forEach((res)=>{
    res.addEventListener("click",()=>{
        resp.classList.remove("active")
        icons.classList.toggle("ri-close-line")
        icons.classList.toggle("ri-menu-line")
    })  
 })
 console.log(respnav)
}
function TextAnimation(){
    gsap.from(".text h3",{
        y: "100px",
        duration: 0.9,
        stagger: 0.4,
        opacity:0,
        delay:0.4
    })
    gsap.from(".text h1",{
        y: "150px",
        duration: 1,
        stagger: 0.6,
        opacity:0,
        delay:1
    })
    gsap.from("#home",{
        scale:1,
        opacity:0,
        duration: 1
    })
}


locomotiveAnimation()
Toggle()
// HeaderToggle()
RemoveClassesLink()
TextAnimation()