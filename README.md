# How  to run

## Prerequisites:
### Android Studio (only developed/tested on Android)
### Node >=14.17.6 (this version was used for development)
### Yarn (1.22.5)


1. Clone the repo by using ```git clone https://github.com/caiorrs/IHC_TP2.git```

2. Go to project root folder

3. Change to desired branch (main branch has the base code only)

4. Run ```yarn``` to install all the dependencies. **IMPORTANT**: You need to run the yarn command every time you change the branch, branches have different packages. It is recommended to run ```rm -rf node_modules``` when changing braches, after that, run ```yarn```.

5. Open a terminal on the project folder and run ```yarn start```, in another terminal, on the project folder, run ```yarn android```. **IMPORTANT** you need to have an Android emulator configured or an Android phone connected to PC, with debugging enabled

6. Enjoy!