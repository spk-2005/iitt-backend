const fs = require('fs');
let f = fs.readFileSync('index.html', 'utf8');

// Fix text
f = f.replace(/max-w-\[2[46]0px\] text-\[14px\] md:text-\[17px\] z-20/g, 'text-[15px] sm:text-[16px] md:text-[18px] z-20 w-[95%]');

// Fix image container height restrict
f = f.replace(/h-\[60%\] sm:h-\[65%\] w-full overflow-hidden/g, 'w-full pt-3 relative z-10 flex justify-end overflow-hidden');

// Fix image properties to allow natural aspect ratio and bigger width
f = f.replace(/h-full( w-\[[0-9]+%\]| md:w-\[[0-9]+%\])+ object-cover object-left-top rounded-tl-\[[0-9]+px\]/g, 'h-auto w-[92%] sm:w-[93%] lg:w-[88%] object-top');

fs.writeFileSync('index.html', f);
console.log("Replacements complete!");
