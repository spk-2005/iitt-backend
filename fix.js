const fs = require('fs');
let f = fs.readFileSync('index.html', 'utf8');

// Fix text
f = f.replace(/max-w-\[2[46]0px\] text-\[14px\] md:text-\[17px\] z-20/g, 'text-[15px] sm:text-[16px] md:text-[18px] z-20 w-[95%]');

// Fix image container height restrict
f = f.replace(/h-\[60%\] sm:h-\[65%\] w-full overflow-hidden/g, 'w-full pt-3');

// Fix image properties to allow natural aspect ratio and bigger width
f = f.replace(/h-full w-\[85%\] md:w-\[75%\] object-cover object-left-top/g, 'h-auto w-[92%] sm:w-[93%] lg:w-[88%] object-top');

fs.writeFileSync('index.html', f);
console.log("Replacements complete");
