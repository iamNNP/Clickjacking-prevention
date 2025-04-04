# Clickjacking and DoubleClickjacking Defender

### There are two ways to use it:
1. You are a simple user and want to secure yourself on any site
2. You are a developer and want to secure your users on your sites

### Instruction: 
1. A simple user
    1) Just add "Clickjacking and DoubleClickjacking Defender" in chrome use switchers to activate protection
    2) You may clone this repository ```git clone https://github.com/iamNNP/Clickjacking-prevention.git``` locally
        - Go to chrome://extensions in your google chrome
        - Click load unpacked
        - Select your dir with a cloned project and here you go!
2. A developer
    1) Clone this by ```git clone https://github.com/iamNNP/Clickjacking-prevention.git```
    2) ```cd Clickjacking-prevention && node build.js```
    3) The ```.min.js``` scripts should appear in dist folder, just add them on your site