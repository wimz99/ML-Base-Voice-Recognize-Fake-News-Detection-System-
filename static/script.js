let panels = document.querySelectorAll(".panel");
let fronts = document.querySelectorAll(".front");
let backs = document.querySelectorAll(".back");
let replay_btn = document.querySelector(".replay");

const mirrorTL = gsap.timeline();
const titleTL = gsap.timeline();

gsap.set(replay_btn, { opacity: 0 });
replay_btn.addEventListener("click", (e) => {
	mirrorTL.restart();
	titleTL.restart();
	gsap.to(e.target, 0.5, { opacity: 0 });
	console.log(e.target);
});

mirrorTL
	.to(fronts, 2.5, { backgroundPosition: "30px 0px", ease: "expo.inOut" })
	.to(panels, 2.5, { z: -300, rotationY: 180, ease: "expo.inOut" }, "-=2.3")
	.from(
		backs,
		2.5,
		{
			backgroundPosition: "-30px 0px",
			ease: "expo.inOut",
			onComplete: () => {
				gsap.to(replay_btn, 1, { opacity: 1 });
			}
		},
		"-=2.3"
	);

titleTL
	.to(".layer", 1, { clipPath: "polygon(3% 0, 100% 0%, 100% 100%, 0% 100%" })
	.to(".layer h1", 2, { x: 400, ease: "expo.inOut" }, "-=0.5")
	.to(".cta", 2, { x: 0, ease: "expo.inOut" }, "-=2");
		// Get required HTML elements
		const messageTextarea = document.getElementById('message');
		const recordButton = document.getElementById('recordButton');
	
		// Check if the Web Speech API is supported by the browser
		if ('webkitSpeechRecognition' in window) {
			// Create a new SpeechRecognition object
			const recognition = new webkitSpeechRecognition();
	
			// Set properties for the recognition
			recognition.continuous = false;
			recognition.interimResults = false;
			recognition.lang = 'en-US';
	
			// Handle the result event
			recognition.onresult = function(event) {
				const transcript = event.results[0][0].transcript;
				messageTextarea.value = transcript;
			};
	
			// Handle the error event
			recognition.onerror = function(event) {
				console.error('Speech recognition error: ', event.error);
			};
	
			// Add click event listener to the record button
			recordButton.addEventListener('click', function() {
				recognition.start();
			});
		} else {
			console.error('Web Speech API is not supported by this browser.');
			recordButton.disabled = true;
		}
	
		const insertHeading = document.getElementById("insert-heading");
			insertHeading.textContent = "Insert your news";